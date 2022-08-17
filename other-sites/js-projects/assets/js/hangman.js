const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.querySelector('.play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const wordsArr = [
  'programming',
  'javascript',
  'react',
  'application',
  'hangman',
  'hidden',
  'working',
];

let selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

const correctLetters = [];
const wrongLetters = [];

//Show the hidden word
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class=letter>${
          correctLetters.includes(letter) ? letter : ''
        }</span>`
    )
    .join('')}
  `;
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congrats';
    popup.style.display = 'flex';
  }
}

//Update wrong letters array and display them
function updateWrongLetterEl() {
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong:</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Sorry, u lost';
    popup.style.display = 'flex';
  }
}

//Show notification
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', (e) => {
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    // console.log('yup');
    const letter = e.key.toLowerCase();
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLetterEl();
      } else showNotification();
    }
  }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
  displayWord();
  updateWrongLetterEl();
  popup.style.display = 'none';
});

displayWord();
