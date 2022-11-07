/* eslint-disable no-undef */
/**
 * Check whether inputed string is valid or not
 *
 * @export
 * @param {string} value The inputed string
 * @return {boolean}
 */
export function isValid(value) {
  return value.length >= 10 && value.length <= 100;
}

/**
 * Create the modal DOM element
 *
 * @export
 * @param {string} title
 * @param {string} content
 */
export function createModal(title, content) {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  modal.innerHTML = `
    <h1>${title}</h1>
    <div class="modal-content">${content}</div>
  `;

  mui.overlay('on', modal);
}
