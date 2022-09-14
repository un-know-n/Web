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

export function authWithEmailAndPassword(email, password) {
  const apk = 'AIzaSyBq8Ixgo7APATgapYHHZOFnvvhKONdV8bQ';
  return fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apk}`,
    {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.idToken);
}
