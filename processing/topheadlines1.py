import functions_framework
import json
@functions_framework.http
def headlines(request):
   """HTTP Cloud Function.
   Args:
       request (flask.Reuest): The request object.
       <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
   Returns:
       The response text, or any set of values that can be turned into a
       Response object using `make_response`
       <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
   """
   import requests
   request_args = request.args
   apik = request_args["apik"]
   typ = request_args["type"]
   replacer = request_args["replacer"]
   country = request_args['country']
   frm = request_args['from']
   to = request_args['to']
   cat = request_args['category']
   headers = {'content-type': 'application/json'}
   if typ == "top-headlines":
       uri = "https://newsapi.org/v2/top-headlines?country=" + country+ "&from=" + frm+ "&to=" + to + "&category=" + cat + "&apiKey=" + apik
   elif typ == "everything":
       print("https://newsapi.org/v2/everything?q="+ replacer +"&searchIn=title,description&from=" + frm + "&to=" + to + "&sortBy=popularity&apiKey=" + apik)


       uri = "https://newsapi.org/v2/everything?q="+ replacer +"&searchIn=title,description&from=" + frm + "&to=" + to + "&sortBy=relevancy&apiKey=" + apik


   response = requests.get(uri, headers=headers)
   print(response)
   return json.dumps(response.json())
