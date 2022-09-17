/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/**
 * Connected with all operations over the questions, like:
 * taking questions from server, rendering them into the DOM,
 * making requests to server and listing them
 *
 * @export
 * @class Question
 */
export default class Question {
  /**
   * Request to server to create a question and return back a
   * rendered list of them
   *
   * @static
   * @param {Object} question
   * @return {Promise} The rendered list of questions
   * @memberof Question
   */
  static create(question) {
    return fetch(
      'https://auth-app-f34b3-default-rtdb.firebaseio.com/questions.json',
      {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((response) => {
        question.id = response.name;
        return question;
      })
      .then(Question.renewQuestions(question))
      .then(Question.renderList());
  }

  /**
   * Request to server with token and return the question with id
   *
   * @static
   * @param {string} token
   * @return {Promise} The array of objects with question and id
   * @memberof Question
   */
  static fetch(token) {
    if (!token)
      return Promise.resolve('<p class="error">The toke is incorrect</p>');
    return fetch(
      `https://auth-app-f34b3-default-rtdb.firebaseio.com/questions.json?auth=${token}`,
    )
      .then((response) => response.json())
      .then((response) => {
        if (response && response.error) {
          return `<p class="error">${response.error}</p>`;
        }
        return response
          ? Object.keys(response).map((key) => ({ ...response[key], id: key }))
          : [];
      });
  }

  /**
   * Renders the list of question in the DOM
   *
   * @static
   * @param {Array} questions
   * @return {string} The string of DOM elements
   * @memberof Question
   */
  static listToHTML(questions) {
    return questions.length > 0
      ? `<ol>${questions
          .map(
            (item) => `
      <li>${item.text}</li><br>
    `,
          )
          .join('')}</ol>`
      : '<h2>There are no questions yet...</h2>';
  }

  /**
   * Render the list of questions on the main page
   *
   * @static
   * @memberof Question
   */
  static renderList() {
    const questions = Question.getQuestions();
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
    `,
          )
          .join('')
      : '<div class="mui--text-headline">There is no questions yet...</div>';
    const list = (document.getElementById('list').innerHTML = html);
  }

  /**
   * Take questions from localStorage
   *
   * @static
   * @return {Array}
   * @memberof Question
   */
  static getQuestions() {
    return JSON.parse(localStorage.getItem('questions') || '[]');
  }

  /**
   * Renew questions in the localStorage
   *
   * @static
   * @param {Array} question
   * @memberof Question
   */
  static renewQuestions(question) {
    const result = Question.getQuestions();
    result.push(question);
    localStorage.setItem('questions', JSON.stringify(result));
  }
}
