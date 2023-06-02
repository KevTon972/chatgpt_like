from django.http import JsonResponse
from django.shortcuts import render
import openai

def index(request):
    return render(request, "index.html")

def completion(request):
    if request.method == 'POST':
        print("ok")
        input_text = request.POST.get('input')
        response = openai.Completion.create(
            engine='text-davinci-003',
            prompt=input_text,
            max_tokens=100
        )
        reponse = response.choices[0].text.strip()

        print(JsonResponse({"reponse": reponse}))

    print(JsonResponse({"message": "Erreur"}))