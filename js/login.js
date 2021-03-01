
import { q, CHAT_API } from './utils.js';

/**
 * "Login" form interaction
 */
const Login = () => {
  q('.login form').addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
      user: q('.login .user').value,
      pswd: q('.login .pswd').value
    }

    fetch(`${CHAT_API}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((user) => {
        // Remove alert if visible 
        q('.alert.alert-danger').classList.add('d-none');

        // Empty login form
        q('.login form').reset();
        
        // Notify chat.js of succesful login
        const event = new CustomEvent('login');
        document.dispatchEvent(event);

        // Locally save user data
        localStorage.setItem('mohole-chat', JSON.stringify(user));
      })
      // Handle failure case
      .catch((error) => {
        q('.alert.alert-danger').classList.remove('d-none');
        console.error(error);
      });

  });
}

export {
  Login
}