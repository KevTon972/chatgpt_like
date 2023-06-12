import key from './creds.js'

const btn = document.querySelector('#submit')
let userInput = document.querySelector('#user-input')

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


const csrftoken = getCookie('csrftoken');

async function sendResquestToOpenaiApi(){
    var api_key = key()

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
            messages: [{role: "user", content: userInput.value}],
            max_tokens: 100,
        }),
        dataType: "json",
      });

      clearInput()
      var reply = response.choices[0].message;
      return reply;
    }
      catch (error) {
        console.error("Erreur :", error);
      }
    };


async function sendReplyToMyView(){
    var apiReply = await sendResquestToOpenaiApi();

    $.ajax({
      url: "get__and_return_chatgpt_response/",
      type: "POST",
      headers: {
        'X-CSRFToken': csrftoken,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        response: apiReply
      }),
      dataType: "json",
      success: function(response) {
        const pElement = document.createElement("p");
        const chatResponse = response.chatgpt_response;
        pElement.innerText = chatResponse
        document.getElementById('chat-messages').appendChild(pElement)
        console.log('Réponse envoyée au backend avec succès');
      },
      error: function(error) {
        console.error("Erreur lors de l'envoi de la réponse au backend :", error);
      }
    });
  }


async function sendUserInput(){
    try {
      const response = await $.ajax({
        url: "get_and_return_user_input/",
        type: "POST",
        headers: {
          'X-CSRFToken': csrftoken,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          response: userInput.value
        }),
        dataType: "json",
        success: function(response) {
          clearExampleContainer()
          const pElement = document.createElement("p");
          const user_response = response.user_input;
          pElement.innerText = user_response
          document.getElementById('user-chat').appendChild(pElement)
          console.log('Réponse envoyée au backend avec succès');
        },
      });
    }
      catch (error) {
        console.error("Erreur :", error);
      }
  };


async function clearInput(){
    userInput.value = ''
  }


async function clearExampleContainer(){
    const exampleContainer = document.querySelector('.example-container')
    exampleContainer.style.display='none'
}

async function chatDisplay(){
  await sendUserInput()
  await sendReplyToMyView()
}


btn.addEventListener('click', chatDisplay,)
