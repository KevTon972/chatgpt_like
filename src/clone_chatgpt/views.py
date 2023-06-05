from django.http import JsonResponse
from django.shortcuts import render
import json

def index(request):
    return render(request, "index.html")

# display chatgpt response
def get_chatgpt_response(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        chatgpt_response = data.get('response')
        return JsonResponse({'chatgpt_response': chatgpt_response['content']})

# display user questions
