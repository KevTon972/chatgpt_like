import key from './creds.js'

function submitFunction() {
    const userInput = document.getElementById('user-input').value
    const API_KEY = key()

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        type: "POST",
        header: {
            "Autorization": "Bearer " + API_KEY,
            "Content-Type": 'application/json',
        },
        data: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userInput}],
            max_tokens: 100,
        }),
        dataType: "json",
        success: function(response) {
          var reponse = response.reponse;
          $("#chat-messages").text(reponse);
        },
        error: function(error) {
          console.error("Erreur :", error);
        }})
};

const btn = document.querySelector('#submit')
btn.addEventListener('click', submitFunction)
