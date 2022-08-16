//FlashCards-------------------------------------------------

const createCardBlock = document.getElementById('create_card');
const flashcardsContainer = document.getElementById('flashcards');
const answerTextArea = document.getElementById('answer');
const questionTextArea = document.getElementById('question');

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

function deleteCards() {
  localStorage.clear();
  flashcardsContainer.innerHTML = '';
  contentArray = [];
}

function addFlashCard() {
  let flashcardInfo = {
    my_question: questionTextArea.value,
    my_answer: answerTextArea.value,
  };

  contentArray.push(flashcardInfo);
  localStorage.setItem('items', JSON.stringify(contentArray));

  cardMaker(contentArray[contentArray.length - 1], contentArray.length - 1);
  questionTextArea.value = '';
  answerTextArea.value = '';
}

function cardMaker(card, currentIndex) {
  let flashcardDiv = document.createElement('div');
  let answer = document.createElement('h2');
  let question = document.createElement('h2');
  let flashcardDelete = document.createElement('i');

  flashcardDiv.className = 'flashcard';
  flashcardDelete.className = 'fa-solid fa-minus';

  question.setAttribute(
    'style',
    'border-top:1px solid red; padding: 15px; margin-top:30px'
  );
  question.innerHTML = card.my_question;

  answer.setAttribute(
    'style',
    'text-align:center; display:none; color:red; position:absolute; top:100px; left: 40%'
  );
  answer.innerHTML = card.my_answer;

  flashcardDiv.append(answer);
  flashcardDiv.append(question);
  flashcardDiv.append(flashcardDelete);

  flashcardDiv.addEventListener('click', function () {
    if (answer.style.display == 'none') {
      answer.style.display = 'block';
    } else {
      answer.style.display = 'none';
    }
  });

  flashcardDelete.addEventListener('click', function () {
    contentArray.splice(currentIndex, 1);
    localStorage.setItem('items', JSON.stringify(contentArray));
    flashcardDiv.remove();
  });

  flashcardsContainer.prepend(flashcardDiv);
}

//-----------------------------------------------------------
