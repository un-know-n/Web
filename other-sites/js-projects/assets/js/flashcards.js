/* eslint-disable no-unused-vars */
// Main variables and params
const createCardBlock = document.getElementById('create_card');
const flashcardsContainer = document.getElementById('flashcards');
const answerTextArea = document.getElementById('answer');
const questionTextArea = document.getElementById('question');

// Take the elements from localStorage
let contentArray = localStorage.getItem('items')
  ? JSON.parse(localStorage.getItem('items'))
  : [];

contentArray.forEach(cardMaker);

function hideFlashBox() {
  createCardBlock.className = 'hide';
}

function showFlashBox() {
  createCardBlock.className = 'show';
}

// Delete card from localSt and DOM
function deleteCards() {
  localStorage.clear();
  flashcardsContainer.innerHTML = '';
  contentArray = [];
}

/**
 * Init all the fields of a new card, push it to localStorage and
 * transfer its creation to the cardMaker() function
 *
 */
function addFlashCard() {
  // Take the input values
  const flashcardInfo = {
    my_question: questionTextArea.value,
    my_answer: answerTextArea.value,
  };

  // Push card into main array
  contentArray.push(flashcardInfo);

  // Set item to localStorage
  localStorage.setItem('items', JSON.stringify(contentArray));

  // Make new card
  cardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);

  // Clear the input fields
  questionTextArea.value = '';
  answerTextArea.value = '';
}

/**
 * Create a new card in the DOM and attach event listeners to it
 *
 * @param {element} card Main card values from the fields
 * @param {number} currentIndex Card index in the array
 */
function cardMaker(card, currentIndex) {
  // Take all the needed values
  const flashcardDiv = document.createElement('div');
  const answer = document.createElement('h2');
  const question = document.createElement('h2');
  const flashcardDelete = document.createElement('i');

  // Assign the classes
  flashcardDiv.className = 'flashcard';
  flashcardDelete.className = 'fa-solid fa-minus';

  // Set main attributes
  question.setAttribute(
    'style',
    'border-top:1px solid red; padding: 15px; margin-top:30px',
  );
  question.innerHTML = card.my_question;

  answer.setAttribute(
    'style',
    'text-align:center; display:none; color:red; position:absolute; top:100px; left: 40%',
  );
  answer.innerHTML = card.my_answer;

  // Assign the parts to one div element
  flashcardDiv.append(answer);
  flashcardDiv.append(question);
  flashcardDiv.append(flashcardDelete);

  // Create listener to show the answer when clicked
  flashcardDiv.addEventListener('click', () => {
    if (answer.style.display === 'none') {
      answer.style.display = 'block';
    } else {
      answer.style.display = 'none';
    }
  });

  // Delete card from the DOM and localStorage
  flashcardDelete.addEventListener('click', () => {
    contentArray.splice(currentIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    flashcardDiv.remove();
  });

  // Add the card to the main container
  flashcardsContainer.prepend(flashcardDiv);
}
