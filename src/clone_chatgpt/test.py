import json
from django.test import TestCase


class ChatGPTTest(TestCase):
    def test_get_and_return_chatgpt_response(self):
        # Préparation des données
        request_data = {
            'response': {
                'content': 'Hello, World!'
            }
        }
        request_body = json.dumps(request_data)

        # Exécution de la requête
        response = self.client.post('/get__and_return_chatgpt_response/', data=request_body, content_type='application/json')

        # Vérification de la réponse
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'chatgpt_response': 'Hello, World!'})


    def test_get_and_return_user_input(self):
        # Préparation des données
        request_data = {
            'response': 'Hello, World!'
            }

        request_body = json.dumps(request_data)

        # Exécution de la requête
        response = self.client.post('/get_and_return_user_input/', data=request_body, content_type='application/json')

        # Vérification de la réponse
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(response.content, {'user_input': 'Hello, World!'})
