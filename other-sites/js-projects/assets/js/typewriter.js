// Main variables and params

const quoteArray = [];
const index = 0;
let textPosition = 0;
let flag = true;
const destination = document.getElementById('typedtext');

/**
 * Request to the API to get one random quote
 *
 */
function loadQuote() {
  const url = 'https://api.quotable.io/random';

  fetch(url)
    .then((response) => {
      if (response.ok) return response.json();
      throw new Error(response.status);
    })
    .then((data) => {
      // Write the quote to the array
      quoteArray[index] = data.content;
    });
}

function typeWriter() {
  if (flag) {
    loadQuote();
    quoteArray[index] += ' ';
    flag = false;
  }

  // Assign the quote to the DOM
  destination.innerHTML = `${quoteArray[index].substring(
    0,
    textPosition,
  )}<span>&#9646;</span>`;

  // Move the position cursor to the next letter
  if (textPosition++ !== quoteArray[index].length) {
    setTimeout('typeWriter()', 100);
  } else {
    // Create a new quote
    quoteArray[index] = ' ';
    setTimeout('typeWriter()', 3000);
    textPosition = 0;
    flag = true;
  }
}

typeWriter();
