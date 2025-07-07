import base64
import fitz
from flask import Flask, jsonify, request, abort
import io
from openai import OpenAI
import pickle
import redis
from sentence_transformers import SentenceTransformer
import torch
import uuid

from utils import document_parser, tokenize_text

app = Flask(__name__)

# POST endpoint to upload pdf
@app.route('/upload-pdf', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'error': 'Bad Request', 'message': 'pdf key not found in request.files'}), 400
    file = request.files['pdf']
    if not file:
        response = jsonify({'error': 'Bad Request', 'message': 'file not found in request'})
        response.status_code = 400
        return response
    # Generate unique key
    document_key = str(uuid.uuid4())
    # Store in Redis (base64 encoded)
    pdf_data = base64.b64encode(file.read()).decode('utf-8')
    redis_client.setex(document_key, 3600, pdf_data)  # 1 hour expiry
    return jsonify({"document_key": document_key})

# POST endpoint to build document model
@app.route('/encode-document', methods=['POST'])
def encode_document():
    data = request.json # Access JSON data from the request body
    if 'document_key' not in data:
        return jsonify({'error': 'Bad Request', 'message': 'document_key not found in request json'}), 400
    document_key = data.get('document_key')
    document = redis_client.get(document_key)
    if not document:
        return jsonify({'error': 'Not Found', 'message': 'document not found in memory storage'}), 404
    try:
        pdf_data = base64.b64decode(document)
        pdf_stream = io.BytesIO(pdf_data)
        doc = fitz.open(stream=pdf_stream, filetype="pdf")
        metadata = document_parser.GetDocumentMetadata(doc)
        apiSentences = document_parser.ExtractSentencesFromDocument(doc, metadata)
        apiSentencesProcessed = tokenize_text.parse_sentences(apiSentences)
        sentences_serialized = pickle.dumps(apiSentencesProcessed)
        redis_client.setex(f"{document_key}_sentences", 3600, sentences_serialized)
        doc.close()
    except Exception as e:
        return jsonify({'error': f'PDF processing error: {str(e)}'}), 500
    apiCorpusEmbeddings = apiModel.encode_document(apiSentencesProcessed)
    try:
        embeddings_bytes = pickle.dumps(apiCorpusEmbeddings)
        # Store in Redis with the same document_key
        redis_client.setex(f"{document_key}_embeddings", 3600, embeddings_bytes)
    except Exception as e:
        return jsonify({'error': f'Storage error: {str(e)}'}), 500
    return jsonify({"status": "success"})

# POST endpoint to query model
@app.route('/query', methods=['POST'])
def query():
    data = request.json
    if 'query' not in data or 'document_key' not in data:
        return jsonify({'error': 'Bad Request', 'message': 'query not found in request json'}), 400
    query = data.get('query')
    document_key = data.get('document_key')
    document_embeddings = redis_client.get(f"{document_key}_embeddings")
    document_sentences = redis_client.get(f"{document_key}_sentences")
    if not document_embeddings or not document_sentences:
        return jsonify({'error': 'Not Found', 'message': 'document embeddings not found in memory storage'}), 404
    apiCorpusEmbeddings = pickle.loads(document_embeddings)
    apiSentencesProcessed = pickle.loads(document_sentences)
    top_k = 5
    apiQueryEmbedding = apiModel.encode_query(query)
    # use cosine-similarity and torch.topk to find the highest 5 scores
    cosineSimilarities = apiModel.similarity(apiQueryEmbedding, apiCorpusEmbeddings)[0]
    topScores, topIndices = torch.topk(cosineSimilarities, k=top_k)
    # the semantic context will already likely provide the answer that the user needs, so this is good enough to return if they did not include an open_api_key:
    if 'open_api_key' not in data:
        outputString = ""
        for score, idx in zip(topScores, topIndices):
            if idx:
                # expand the context by providing sentences around the top search result
                context = apiSentencesProcessed[max(0, idx-2):min(len(apiSentencesProcessed), idx+3)]
                outputString = outputString + f"(Confidence: {score:.4f}) " + ' '.join(context)
        return jsonify({"status": "success", "output": outputString})
    # if they did include an open_api_key, utilize a generative LLM model API call to fine-tune the output
    open_api_key = data.get('open_api_key')
    client = OpenAI(api_key=open_api_key)
    outputContext = ""
    chunksPushedToContext = 0
    for score, idx in zip(topScores, topIndices):
        if idx and score > 0.5 and chunksPushedToContext < 3:
            # expand the context by providing sentences around the top search result
            context = apiSentencesProcessed[max(0, idx-1):min(len(apiSentencesProcessed), idx+2)]
            outputContext = outputContext + ' '.join(context)
            chunksPushedToContext += 1
    prompt = "I am going to supply you with a context which you should consider ground truth and the basis of your response. I will also supply you with a query, which you should answer without adding new information other than the given context. The query is: " + query + ". The context is: " + outputContext + "."
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": prompt}
            ]
        )
    except Exception as e:
        return jsonify({'error': f'Error getting AI output: {str(e)}'}), 500
    return jsonify({"status": "success", "output": response.choices[0].message.content})


if __name__ == '__main__':
    apiModel = SentenceTransformer("all-MiniLM-L6-v2")
    redis_client = redis.Redis(host='localhost', port=6379, db=0)
    app.run(debug=False, port=5000)
