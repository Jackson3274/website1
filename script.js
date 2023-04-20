// app.js
const form = document.querySelector('form');
const messageInput = document.querySelector('#message-input');
const messagesList = document.querySelector('#messages');

const socket = io();

function displayMessage(message) {
  const messageElement = document.createElement('li');
  messageElement.classList.add('message');
  messageElement.innerHTML = `
    <p>${message.text}</p>
    <div class="meta">
      <span>${message.user}</span>
      <span class="time">${new Date(message.timestamp).toLocaleTimeString()}</span>
    </div>
  `;
  messagesList.appendChild(messageElement);
}

// Get the current messages from the server
socket.on('messages', function(messages) {
  messages.forEach(displayMessage);
});

// Send a message to the server
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const message = {
    user: 'You',
    text: messageInput.value.trim(),
    timestamp: Date.now()
  };

  socket.emit('send', message);

  displayMessage(message);
  messageInput.value = '';
});

// Receive new messages from the server
socket.on('message', function(message) {
  displayMessage(message);
});
