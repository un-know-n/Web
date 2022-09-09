const searchBtn = document.querySelector('#search-button');

class Validator {
  constructor(string) {
    this.string = string;
    this.result = '';
  }

  isEmail(string) {
    if (string) this.result = string.match(/^\D\w*@\w+\.\w+$/) || '';
    if (this.result === '')
      return 'Current string is not a valid email address';
    else return 'Email address is correct';
  }
}

const validString = new Validator();

searchBtn.addEventListener('click', () => {
  const fieldValue = document.querySelector('.search__input').value;
  console.log(validString.isEmail(fieldValue));
  return validString.isEmail();
});
