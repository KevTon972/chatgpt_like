from django.http import JsonResponse
from django.shortcuts import render
import openai

def index(request):
    return render(request, "index.html")

def get_api_response(request):
    pass

