// Main variables and params
const searchBtn = document.querySelector('#search-button');

/**
 * Has different methods to valid strings
 *
 * @class Validator
 */
class Validator {
  constructor(string) {
    this.string = string;
    this.result = '';
  }

  /**
   * Check whether the entered email is correct and returns a
   * string, which says if it is correct or not
   *
   * @param {string} text Inputed string
   * @return {string}
   * @memberof Validator
   */
  isEmail(text) {
    if (text) this.result = text.match(/^\D\w*@\w+\.\w+$/) || '';
    if (this.result === '')
      return 'Current string is not a valid email address';
    return 'Email address is correct';
  }
}

// Creation an instance of validator class
const validString = new Validator();

// Event listeners

// Added event to the main search button
searchBtn.addEventListener('click', () => {
  const fieldValue = document.querySelector('.search__input').value;
  console.log(validString.isEmail(fieldValue));
  return validString.isEmail();
});
