/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-syntax */
// General object for the keyboard
const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    oninput: null,
    onclose: null,
  },

  properties: {
    value: '',
    capsLock: false,
  },

  /**
   * Initialize the keyboard
   *
   */
  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Add the classes
    this.elements.main.classList.add('keyboard', 'keyboard--hidden');
    this.elements.keysContainer.classList.add('keyboard__keys');

    // Append the dynamically created keys
    this.elements.keysContainer.append(this._createKeys());

    this.elements.keys =
      this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Append the container to the main block
    this.elements.main.append(this.elements.keysContainer);
    document.querySelector('.introduction').append(this.elements.main);

    // For each element on the page that uses the 'use-keyboard-input' class open the keyboard on focus event
    document.querySelectorAll('.use-keyboard-input').forEach((item) => {
      item.addEventListener('focus', () => {
        this.open(item.value, (currentValue) => {
          item.value = currentValue;
        });
      });
    });
  },

  /**
   * Dynamical rendering of the keyboard keys
   *
   * @return {fragment}
   */
  _createKeys() {
    const fragment = document.createDocumentFragment();
    // General array with keys
    const keyLayout = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'backspace',
      'q',
      'w',
      'e',
      'r',
      't',
      'y',
      'u',
      'i',
      'o',
      'p',
      'caps',
      'a',
      's',
      'd',
      'f',
      'g',
      'h',
      'j',
      'k',
      'l',
      'enter',
      'done',
      'z',
      'x',
      'c',
      'v',
      'b',
      'n',
      'm',
      ',',
      '.',
      '?',
      'space',
    ];

    // Return the generated DOM for icon with specific name
    const createIconHTML = (iconName) =>
      `<i class="material-icons">${iconName}</i>`;

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      // See if we need to make a linebreak
      const insertLineBreak =
        ['backspace', 'enter', 'p', '?'].indexOf(key) !== -1;

      // Set the attributes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      // Make the key, depending on its parameters
      switch (key) {
        case 'backspace':
          // Attributes
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            // Delete the last symbol
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1,
            );

            // Handle the input event
            this._triggerEvent('oninput');
          });
          break;

        case 'enter':
          // Attributes
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            // Add the linebreak symbol
            this.properties.value += '\n';

            // Handle the input event
            this._triggerEvent('oninput');
          });

          break;

        case 'caps':
          // Attributes
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
          );
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            // Toggle the capsLock, depending on its state
            this._toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.properties.capsLock,
            );
          });

          break;

        case 'done':
          // Attributes
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--dark',
          );
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            // Close the keyboard
            this.close();

            // Handle the close event
            this._triggerEvent('onclose');
          });

          break;

        case 'space':
          // Attributes
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            // Add the space symbol
            this.properties.value += ' ';
            this._triggerEvent('oninput');
          });

          break;

        default:
          // Attributes
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            // Write the button, depending on capsLock button
            this.properties.value += this.properties.capsLock
              ? key.toUpperCase()
              : key.toLowerCase();

            // Handle the input event
            this._triggerEvent('oninput');
          });
      }
      // Append the current key to the fragment
      fragment.append(keyElement);

      // If we need to insert linebreak symbol after the button, then append it to the DOM
      if (insertLineBreak) fragment.append(document.createElement('br'));
    });

    return fragment;
  },

  /**
   * Execute the custom function from eventHandlers parameter
   *
   * @param {*} handlerName
   */
  _triggerEvent(handlerName) {
    // Check if the handler is a function
    if (typeof this.eventHandlers[handlerName] == 'function') {
      // function-name(value)
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  /**
   * Handle the toggle of the capsLock key on keyboard, put all keys
   * to the upper or lower case
   *
   */
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  /**
   * Open the keyboard and translate all values
   *
   * @param {string} initValue Initial value of the input field
   * @param {function} oninput Custom function on input event
   * @param {function} onclose Custom function on close event
   */
  open(initValue, oninput, onclose) {
    this.properties.value = initValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove('keyboard--hidden');
  },

  /**
   * Close the keyboard
   *
   */
  close() {
    this.properties.value = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add('keyboard--hidden');
  },
};

// Event Listeners

// When all is loaded, then initalize the keyboard
window.addEventListener('DOMContentLoaded', () => {
  Keyboard.init();
});

// document.querySelector('.introduction').addEventListener('click', () => {
//   if (event.target.closest('textarea') || event.target.closest('.keyboard')) {
//     Keyboard.open(
//       document.querySelector('#mainTextarea').textContent,
//       function (currentValue) {
//         console.clear();
//         console.log('Value changed: ' + currentValue);
//       },
//       function (currentValue) {
//         console.log('Keyboard has been closed! Last value: ' + currentValue);
//       }
//     );
//   } else Keyboard.close();
// });
