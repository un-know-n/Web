export default class Question {
  static create(question) {
    return fetch(
      'https://auth-app-f34b3-default-rtdb.firebaseio.com/questions.json',
      {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name;
        return question;
      })
      .then(Question.renewQuestions(question))
      .then(Question.renderList());
  }

  static fetch(token) {
    if (!token)
      return Promise.resolve('<p class="error">The toke is incorrect</p>');
    return fetch(
      `https://auth-app-f34b3-default-rtdb.firebaseio.com/questions.json?auth=${token}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<p class="error">${questions.error}</p>`;
        }
        return response
          ? Object.keys(response).map((key) => {
              return { ...response[key], id: key };
            })
          : [];
      });
  }

  static listToHTML(questions) {
    return questions.length > 0
      ? `<ol>${questions
          .map(
            (item) => `
      <li>${item.text}</li><br>
    `
          )
          .join('')}</ol>`
      : '<h2>There are no questions yet...</h2>';
  }

  static renderList() {
    const questions = Question.getQuestions();
    // console.log(questions);
    const html = questions.length
      ? questions
          .map(
            (item) => `
    <div class="mui--text-black-54">
      ${new Date(item.date).toLocaleDateString()}
      ${new Date(item.date).toLocaleTimeString()}
    </div>
    <div>
      ${item.text}
    </div>
    <br>
    `
          )
          .join('')
      : '<div class="mui--text-headline">There is no questions yet...</div>';
    const list = (document.getElementById('list').innerHTML = html);
  }

  static getQuestions() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
  }

  static renewQuestions(question) {
    let result = Question.getQuestions();
    result.push(question);
    localStorage.setItem('questions', JSON.stringify(result));
  }
}
