import os
import ot
import gensim.downloader as api
from gensim.models import Word2Vec
from gensim.models import KeyedVectors
from flask import Response
import json


# Load the pre-trained word vectors (GloVe)
def load_embeddings():
   embedding_model_name = 'glove-wiki-gigaword-50'
   model = api.load(embedding_model_name)
   
   return model


# Calculate Word Movers Distance (WMD) between two lists of words
def calculate_wmd(model, input_text, doc1):
   try:
       wmd_distance = model.wmdistance(input_text, doc1)
       return wmd_distance
   except Exception as e:
       return str(e)


# HTTP Cloud Function entry point
def wmd_cloud_function(request):
   # Set CORS headers for the preflight request
   if request.method == "OPTIONS":
       # Allows GET requests from any origin with the Content-Type
       # header and caches preflight response for an 3600s
       headers = {
           "Access-Control-Allow-Origin": "*",
           "Access-Control-Allow-Methods": "GET",
           "Access-Control-Allow-Headers": "Content-Type",
           "Access-Control-Max-Age": "3600",
       }
       return ("", 204, headers)


  
   # Parse the request
   request_json = request.get_json()
   input_text = request_json.get('input_text', '')
   doc1 = request_json.get('doc1', '')


   # Load the word embeddings model
   model = load_embeddings()


   # Calculate WMD distance
   wmd_distance = calculate_wmd(model, input_text.split(" "), doc1.split(" "))


   # Prepare the response
   response_data = {
       'wmd_distance': wmd_distance
   }


   # Convert response to JSON and return
   #return json.dumps(response_data)
   resp = Response(json.dumps(response_data), mimetype='application/json')
   resp.headers['Access-Control-Allow-Origin'] = '*'
   return resp


