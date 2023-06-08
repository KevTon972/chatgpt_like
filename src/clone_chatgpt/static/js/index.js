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

async function sendResquestToOpenaiApi(){
    var api_key = key()
    var userInput = document.getElementById('user-input').value

    try {
      const response = await $.ajax({
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
      });

      var reply = response.choices[0].message;
      return reply;
    }
      catch (error) {
        console.error("Erreur :", error);
      }
    };


async function sendReplyToMyView(){
    var reply = sendResquestToOpenaiApi();
    var csrftoken = getCookie('csrftoken');

    $.ajax({
      url: "get__and_return_chatgpt_response/",
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
  }


const btn = document.querySelector('#submit')
btn.addEventListener('click', sendReplyToMyView)
