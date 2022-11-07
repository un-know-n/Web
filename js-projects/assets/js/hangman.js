// Main variables and params
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

/**
 * Display the letter of the hidden word in the DOM
 * and check if the user has already spelt the right word
 *
 */
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(
      (letter) =>
        `<span class=letter>${
          correctLetters.includes(letter) ? letter : ''
        }</span>`,
    )
    .join('')}
  `;

  // Take the whole entered word
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  // If user has entered word correctly
  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
}

/**
 * Update wrong letters array, display the wrong letters and
 * check if the user has already made the max. number of mistakes
 *
 */
function updateWrongLetterEl() {
  // Change block, depending on its state
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong:</p>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // Display the part of the figure on the page
  figureParts.forEach((part, index) => {
    // Number of errors in the word
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  // If the figure is whole, then the game is lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Sorry, you lost';
    popup.style.display = 'flex';
  }
}

/**
 * Show notification if the key was already typed
 *
 */
function showNotification() {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

// Event Listeners

// Keydown letter press
window.addEventListener('keydown', (e) => {
  // If the key is a letter
  if (e.code >= 'KeyA' && e.code <= 'KeyZ') {
    // Transfer it to lower case
    const letter = e.key.toLowerCase();
    // If we have that letter in the word
    if (selectedWord.includes(letter)) {
      // If it hadn't already been typed
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
      // If we dont have that wrong letter
    } else if (!wrongLetters.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongLetterEl();
    } else showNotification();
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // Clear the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Take the selected word
  selectedWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];

  // Display it
  displayWord();
  updateWrongLetterEl();
  popup.style.display = 'none';
});

displayWord();
