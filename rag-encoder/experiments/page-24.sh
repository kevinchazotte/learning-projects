#!/bin/bash
document_key=$(curl -X POST -F "pdf=@./../data/page-24.pdf" http://127.0.0.1:5000/upload-pdf | jq -r '.document_key')
if [ -z "$document_key" ]; then echo "document_key is empty" && exit; else echo "var is set to '${document_key}'"; fi
curl -X POST http://127.0.0.1:5000/encode-document -H "Content-Type: application/json" -d "{\"document_key\": \"${document_key}\"}"
curl -X POST http://127.0.0.1:5000/query -H "Content-Type: application/json" -d "{\"document_key\": \"${document_key}\", \"query\": \"What are the eligibility requirements for Medicare home health services?\"}"

