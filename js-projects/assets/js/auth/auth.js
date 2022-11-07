/**
 * Create the authorization form and return it
 *
 * @export
 * @return {string} The DOM carcas of the auth form
 */
export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
      <div class="mui-textfield mui-textfield--float-label">
        <input
          type="email"
          id="email"
          required
          minlength="5"
          maxlength="100"
        />
        <label for="email">Email</label>
      </div>
      <div class="mui-textfield mui-textfield--float-label">
        <input
          type="password"
          id="password"
          required
          minlength="5"
          maxlength="100"
        />
        <label for="password">Password</label>
      </div>
      <button
        type="submit"
        class="mui-btn mui-btn--raised"
      >
        Login
      </button>
    </form>
  `;
}

/**
 * Request to server with data from inputs and response with idToken
 *
 * @export
 * @param {string} email
 * @param {string} password
 * @return {string} The idToken from the response
 */
export function authWithEmailAndPassword(email, password) {
  const apk = 'AIzaSyBq8Ixgo7APATgapYHHZOFnvvhKONdV8bQ';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apk}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((response) => response.json())
    .then((data) => data.idToken);
}
