import nltk

def parse_sentences(text_list):
    nltk.download('punkt_tab')
    full_text = ' '.join(text_list)
    sentences = nltk.tokenize.sent_tokenize(full_text)
    return [sent.strip() for sent in sentences if len(sent.strip()) > 10]