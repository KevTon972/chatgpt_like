import key from './creds.js'

const btn = document.querySelector('#submit')
const bottomDiv = document.querySelector('.bottom-page')
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
        const user_response = response.user_input;
        clearExampleContainer()
        clearChatHeader()
        displayUserInput(user_response)

        const historyPElement = document.createElement("p");
        historyPElement.innerText = userInput.value;
        document.querySelector('.history').appendChild(historyPElement);
        console.log('Réponse envoyée au backend avec succès');
      },
    });
  }
    catch (error) {
      console.error("Erreur :", error);
    }
};


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
        const chatResponse = response.chatgpt_response;

        displayChatResponse(chatResponse)
        console.log('Réponse envoyée au backend avec succès');
      },
      error: function(error) {
        console.error("Erreur lors de l'envoi de la réponse au backend :", error);
      }
    });
  }


async function clearInput(){
    userInput.value = ''
  }


async function clearExampleContainer(){
    const exampleContainer = document.querySelector('.example-container')
    exampleContainer.style.display='none'
}


async function clearChatHeader(){
    const chatHeader = document.querySelector('#chat-header')
    chatHeader.style.display='none'
}


async function displayUserInput(response){
    const chat = document.getElementById("chat");
      if (chat){
          createUserChatDiv(response, chat)
      } else {
          createChatAndUserChatDiv(response)
      }
}


async function createUserChatDiv(response, divWhithChatId){
    const divChat = divWhithChatId;
    const divUserChat = document.createElement("div");
    const pElement = document.createElement("p");
    const userInput = response;
    pElement.innerText = userInput;
    divUserChat.id = 'user-chat';

    divUserChat.appendChild(pElement);
    divChat.appendChild(divUserChat);
}


async function createChatAndUserChatDiv(response){
    const chatContainer = document.querySelector('#chat-container');
    const divChat = document.createElement("div");
    const userChat = document.createElement("div");
    const pElement = document.createElement("p");
    const userInput = response;
    pElement.innerText = userInput;
    divChat.id = 'chat';
    userChat.id = 'user-chat';

    userChat.appendChild(pElement);
    divChat.appendChild(userChat);
    chatContainer.prepend(divChat);
}


async function displayChatResponse(response){
    const chat = document.getElementById("chat");
    if (chat){
      console.log('il y a')
        createChatMessageDiv(response, chat)
    }
}


async function createChatMessageDiv(response, chatElement){
    const divChat = chatElement;
    const divChatMessages = document.createElement("div");
    const pElement = document.createElement("p");
    const chatResponse = response;
    pElement.innerText = chatResponse;
    divChatMessages.id = 'chat-messages';

    divChatMessages.appendChild(pElement);
    divChat.appendChild(divChatMessages);
}


async function createChatandCHatMessagesDiv(string){
    const chatContainer = document.querySelector('#chat-container');
    const divChat = document.createElement("div");
    const divChatMessages = document.createElement("div");
    const pElement = document.createElement("p");
    const chatResponse = string;
    pElement.innerText = chatResponse;
    divChat.id = 'chat';
    divChatMessages.id = 'chat-messages';

    divChatMessages.appendChild(pElement);
    divChat.appendChild(divChatMessages);
    chatContainer.prepend(divChat);
}


async function chatDisplay(){
  await sendUserInput()
  await sendReplyToMyView()
}


btn.addEventListener('click', chatDisplay,)
