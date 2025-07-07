# RAG-Encoder

This project provides a backend infrastructure to offer an AI-enhanced semantic search tool. The user shall upload a PDF file and call an API to encode it into a vevctor database. Then, queries to the backend will perform semantic search over the uploaded document and optionally feed the results into an AI call to return the results in a more legible format. The intended usage is similar in function to Google's [NotebookLM](https://notebooklm.google.com/). A frontend for this work is not yet implemented, but could be done trivially with TypeScript/React or other alternatives; this backend has no dependency on the frontend. This framework could be generalized for scalability according to the following changes:

* Other implementations of a natural language processor and semantic encoding model should be investigated to replace Python's nltk and sentence_transformer libraries, or custom implementations could be written. Stress testing should be done to validate performance on very large files to determine if these services are sufficiently fast when serialized. The Python libraries also offer CUDA GPU parallelization which could be investigated.
* Documents, their text, and their encodings are currently stored in-memory using Redis. The document itself is only required while encoding is happening; so, the document should be moved to a cache on upload from which it is purged after encoding completes. The parsed sentences and their encodings can be stored in persistent storage for access from queries.
* After upload, the file's cache address is passed along a messaging queue to asynchronously perform the encoding and serialization done in the `encode-document` API call. This could be horizontally scaled to meet demand as more documents enter the service.

## Requirements:

* Python version 3.X - versions 3.12.3 and 3.13.1 have been tested

In a Python environment, verify that you have the following packages:

* flask
* nltk
* numpy
* PyMuPDF
* redis
* sentence_transformers
* torch

You will need the redis-server package to connect to the in-memory database used by the API calls in this backend. This is available on Ubuntu via as `redis-server` or `redis` on Mac. Redis does not have a distribution available on Windows. Once installed, start the redis-server instance (on Linux, `sudo service redis-server start`; on Mac, see [Mac OS Documentation](https://redis.io/docs/latest/operate/oss_and_stack/install/archive/install-redis/install-redis-on-mac-os/).

## Hosting the project

Once the Redis Server is started, host the backend endpoints by running host_endpoints.py. Then, the `experiments` files can be run and the endpoints can be written via curl.

## Experiments

A number of experiments are published in [experiments](./experiments)). To run them, the following packages are required on Linux: 

* curl
* jq

Once the steps in the above sections are complete, the `experiments/*.sh` files can be run. They contain sample interactions with the APIs demonstrating the protocol.
