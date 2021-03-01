
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

  if (local()) {
    initChat();
  }

  document.addEventListener('login', () => initChat());

  // Hide the alert when clicked
  q('.alert').addEventListener('click', () => {
    q('.alert').classList.add('d-none')
  });

  q('#logout').addEventListener('click', () => {
    localStorage.removeItem('mohole-chat');
    q('.login').classList.remove('hide');
    q('.chat').classList.add('hide');
  });
});

const initChat = () => {
  q('.login').classList.add('hide');
  q('.chat').classList.remove('hide');

  q('.alert.alert-danger').classList.add('d-none');

  // Get data from server - first load
  getRemoteData();

  // get new data from server every 0.5 seconds
  // setInterval(() => getRemoteData(), 500);
  // changed to 2 sec for dev env
  setInterval(() => getRemoteData(), 2000);
}