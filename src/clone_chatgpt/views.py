from django.http import JsonResponse
from django.shortcuts import render
import json


def index(request):
    return render(request, "index.html")


def get__and_return_chatgpt_response(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            chatgpt_response = data.get('response')
            return JsonResponse({'chatgpt_response': chatgpt_response['content']})
    except Exception as err:
        print(f'Error: {err}')


def get_and_return_user_input(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            user_input = data['response']
            return JsonResponse({'user_input': user_input})
    except Exception as err:
        print(f'Error: {err}')
