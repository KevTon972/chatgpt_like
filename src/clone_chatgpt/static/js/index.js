import key from './creds.js'

async function submitFunction() {
    var api_key = key()
    const userInput = document.getElementById('user-input').value

    $.ajax({
        url: "https://api.openai.com/v1/chat/completions",
        type: "POST",
        headers: {
            "Authorization": `Bearer ${api_key}`,
            "Content-Type": "application/json",
        },
        data: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userInput}],
            max_tokens: 100,
        }),
        dataType: "json",
        success: function(response) {
          var reponse = response.choices[0].text;
          console.log(response)
          $("#chat-messages").text(reponse);
        },
        error: function(error) {
          console.error("Erreur :", error);
        }})
};

const btn = document.querySelector('#submit')
btn.addEventListener('click', submitFunction)
