import key from './creds.js'

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

async function submitFunction() {
    var api_key = key()
    const userInput = document.getElementById('user-input').value
    const csrftoken = getCookie('csrftoken');

    // envoie l'input du user a l'api
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
          var reply = response.choices[0].message;

          // Envoie la réponse au backend Django
          $.ajax({
            url: "get_chatgpt_response/",
            type: "POST",
            headers: {
              'X-CSRFToken': csrftoken
            },
            data: JSON.stringify({
              response: reply
            }),
            dataType: "json",
            success: function(response) {
              var chatResponse = response.chatgpt_response;
              $("#chat-messages").text(chatResponse);
              console.log('Réponse envoyée au backend avec succès');
            },
            error: function(error) {
              console.error("Erreur lors de l'envoi de la réponse au backend :", error);
            }
          });
        },
        error: function(error) {
          console.error("Erreur :", error);
        }})
};

const btn = document.querySelector('#submit')
btn.addEventListener('click', submitFunction)
