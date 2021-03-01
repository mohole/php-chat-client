
import { q, CHAT_API, local } from './utils.js';

/**
 * New message interaction
 */
const Messages = () => {
  // Send the message on form submit (enter key or button click)
  q('.chat form').addEventListener('submit', (event) => {
    event.preventDefault();

    const input = q('.chat form input');

    const message = {
      text: input.value,
      // Create a new Date object and convert it to ISO specification format
      timestamp: new Date().toISOString(),
      // Read user ID from localStorage
      owner: JSON.parse(local()).userID
    };

    fetch(`${CHAT_API}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        input.value = null;
      })
      // Handle failure case
      .catch((error) => {
        console.error(error);
        q('.alert').classList.remove('d-none');
      });
  });
}

export {
  Messages
}