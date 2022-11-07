/* eslint-disable no-return-assign */
/* eslint-disable import/extensions */
// Modules import
import { authWithEmailAndPassword, getAuthForm } from './auth.js';
import './css/style.css';
import Question from './question.js';
import { isValid, createModal } from './utils.js';

// Main variables and params
const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submitBtn = form.querySelector('#submit');
const modalBtn = document.getElementById('modal-btn');

/**
 * Submit the question creation
 *
 * @param {event} event The event from eventHandler
 */
function submitFormHandler(event) {
  event.preventDefault();

  // Check if the data is valid
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    // Disable the button
    submitBtn.disabled = true;

    // Async request to server to save question
    Question.create(question).then(() => {
      input.value = '';
      input.className = '';

      submitBtn.disabled = false;
    });
  }
}

/**
 * Translate data from inputs to the authWithEmailAndPassword
 * function and render the modal after authorization
 *
 * @param {event} event The event from eventHandler
 */
function authFormHandler(event) {
  event.preventDefault();
  const button = event.target.querySelector('button');
  button.disabled = true;
  const email = event.target.querySelector('#email').value;
  const password = event.target.querySelector('#password').value;
  authWithEmailAndPassword(email, password)
    .then((token) => Question.fetch(token))
    .then(renderModalAfterAuth)
    .then(() => (button.disabled = false));
}

/**
 * Create modal window with questions list
 *
 * @param {Question} content The data from the server
 */
function renderModalAfterAuth(content) {
  if (typeof content === 'string') {
    createModal('Error', content);
  } else {
    createModal('Questions list', Question.listToHTML(content));
  }
}

/**
 * Create the modal and add listener to 'submit' event
 *
 */
function openModal() {
  createModal('Authorization', getAuthForm());
  document
    .getElementById('auth-form')
    .addEventListener('submit', authFormHandler, { once: true });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', Question.renderList);

form.addEventListener('submit', submitFormHandler);

input.addEventListener('input', () => {
  // Check if data is valid in the input -> toggle the button
  if (isValid(input.value)) submitBtn.disabled = false;
  else submitBtn.disabled = true;
});

modalBtn.addEventListener('click', openModal);
