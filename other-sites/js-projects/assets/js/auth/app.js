import { authWithEmailAndPassword, getAuthForm } from './auth.js';
import './css/style.css';
import Question from './question.js';
import { isValid, createModal } from './utils.js';

const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

form.addEventListener('submit', submitFormHandler);

input.addEventListener('input', () => {
  if (isValid(input.value)) submitBtn.disabled = false;
  else submitBtn.disabled = true;
});

modalBtn.addEventListener('click', openModal);

function submitFormHandler(event) {
  event.preventDefault();
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;
    //Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';

      submitBtn.disabled = false;
    });
  }
}

function authFormHandler(event) {
  event.preventDefault();
  let button = event.target.querySelector('button');
  button.disabled = true;
  let email = event.target.querySelector('#email').value;
  let password = event.target.querySelector('#password').value;
  authWithEmailAndPassword(email, password)
    .then((token) => Question.fetch(token))
    .then(renderModalAfterAuth)
    .then(() => (button.disabled = false));
}

function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Error', content);
  } else {
    createModal('Questions list', Question.listToHTML(content));
  }
}

function openModal() {
  createModal('Authorization', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true });
}

document.addEventListener('DOMContentLoaded', Question.renderList);
