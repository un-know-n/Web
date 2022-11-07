// Main variables and params
const mainFrame = document.querySelector('.introduction__frame');
const button = document.querySelector('.project-one__button');
const firstProperty = document.querySelector('.first-prop');
const secondProperty = document.querySelector('.second-prop');
const property = document.querySelector('.property');
let propertyValue = property.textContent;

/**
 * Creates and return pseudo-random hex value
 *
 * @return {string} hex-value Return the pseudo-random hex value
 */
function createHex() {
  const hexArr = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];

  let hexChoice = '';

  // Making the random hex value
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * hexArr.length);
    hexChoice += hexArr[random];
  }

  return hexChoice;
}

// Event listeners

// Listener to the main button item
button.addEventListener('click', () => {
  firstProperty.innerHTML = createHex();
  secondProperty.innerHTML = createHex();

  // Display the hex value on the screen
  propertyValue = property.textContent;

  // Assign the hex value to the css styles
  mainFrame.style.cssText = `${propertyValue}`;

  console.log(propertyValue);
});
