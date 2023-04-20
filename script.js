// script.js
const messages = JSON.parse(localStorage.getItem('messages')) || [];

function renderMessages() {
  const messagesDiv = document.querySelector('#messages');
  messagesDiv.innerHTML = '';

  messages.forEach((message) => {
    const p = document.createElement('p');
    p.textContent = message;
    messagesDiv.appendChild(p);
  });
}

function sendMessage() {
  const messageInput = document.querySelector('#message-input');
  const message = messageInput.value.trim();

  if (message === '') {
    return;
  }

  messages.push(message);
  localStorage.setItem('messages', JSON.stringify(messages));
  renderMessages();
  messageInput.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  renderMessages();

  const sendButton = document.querySelector('#send-button');
  sendButton.addEventListener('click', sendMessage);

  const messageInput = document.querySelector('#message-input');
  messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  });
});
