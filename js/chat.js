
import { q, renderMessages, CHAT_API, local } from './utils.js';
import { Login } from './login.js';
import { Messages } from './messages.js';

// Get data from server
const getRemoteData = () => {
  fetch(`${CHAT_API}/messages`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderMessages(data, q('.messages'));
    });
}

// Wait for page to be ready
window.addEventListener('DOMContentLoaded', () => {

  // Init UI
  Login();
  Messages();

  if (local) {
    initChat();
  }

  document.addEventListener('login', () => initChat());

  // Hide the alert when clicked
  q('.alert').addEventListener('click', () => {
    q('.alert').classList.add('d-none')
  });
});

const initChat = () => {
  q('.login').classList.add('hide');
  q('.chat').classList.remove('hide');

  // Get data from server - first load
  getRemoteData();

  // get new data from server every 0.5 seconds
  setInterval(() => getRemoteData(), 500);
}