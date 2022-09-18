/* eslint-disable no-unused-expressions */
/**
 * Return the select DOM element
 *
 * @param {string} [placeholder='Define your choice'] Placeholder
 * for the select element
 * @param {Array} [data=[]] Items of the select element
 * @param {string} selectedId Id of the selected element
 * @return {string}
 */
const getTemplate = (
  placeholder = 'Define your choice',
  data = [],
  selectedId,
) => {
  const dataItems = data
    .map((item) => {
      let currClass = '';
      if (item.id === selectedId) {
        placeholder = item.value;
        currClass = 'selected';
      }
      return `<li class="select__item ${currClass}" data-type="item" data-id="${item.id}">${item.value}</li>`;
    })
    .join('');
  return `<div class="select__input" data-type="input">
  <span data-type="value">${placeholder}</span>
  <i class="fa-solid fa-chevron-down" data-type='arrow'></i>
</div>
<div class="select__dropdown">
  <ul class="select__list">
    ${dataItems}
  </ul>
</div>`;
};

/**
 * Stands for all operations with the select element
 *
 * @class Select
 */
class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.#render();
    this.#setup();
  }

  /**
   * Render the select element on the page
   *
   * @memberof Select
   */
  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(placeholder, data, this.selectedId);
  }

  /**
   * Take the items from current select element and subscribe
   * for event listening
   *
   * @memberof Select
   */
  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  /**
   * Take the selected item
   *
   * @readonly
   * @memberof Select
   */
  get current() {
    return this.options.data.find(
      (item) => item.id.toString() === this.selectedId,
    );
  }

  /**
   * Handle the click event on the select element
   *
   * @param {*} event
   * @memberof Select
   */
  clickHandler(event) {
    const { type } = event.target.dataset;
    // If clicked on select, then toggle it
    if (type === 'input') this.toggle();
    // If clicked on inner item, then select this item
    if (type === 'item') {
      const { id } = event.target.dataset;
      // console.log('id ', id);
      this.select(id);
    }
  }

  /**
   * Set the selected item
   *
   * @param {*} id
   * @memberof Select
   */
  select(id) {
    this.selectedId = id;
    this.$value.innerHTML = this.current.value;

    // Remove class 'selected' from all the items
    this.$el.querySelectorAll('[data-type="item"]').forEach((element) => {
      element.classList.remove('selected');
    });

    // Add the class to the chosen element
    this.$el
      .querySelector(`[data-id="${this.selectedId}"]`)
      .classList.add('selected');

    // Close the select element
    this.close();
  }

  /**
   * Toggle the select element
   *
   * @memberof Select
   */
  toggle() {
    this.$el.classList.contains('open') ? this.close() : this.open();
  }

  /**
   * Open the select element
   *
   * @memberof Select
   */
  open() {
    this.$el.classList.add('open');
    this.$arrow.style.cssText = 'transform: rotate(180deg);';
  }

  /**
   * Close the select element
   *
   * @memberof Select
   */
  close() {
    this.$el.classList.remove('open');
    this.$arrow.style.cssText = 'transform: rotate(360deg);';
  }

  /**
   * Remove the select element from the page
   *
   * @memberof Select
   */
  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.remove();
  }
}

// Create an instance of the select element
const select = new Select('#select', {
  placeholder: 'Define your choice',
  selectedId: 1,
  data: [
    { id: 1, value: 'React' },
    { id: 2, value: 'Vue' },
    { id: 3, value: 'Angular' },
    { id: 4, value: 'React Native' },
    { id: 5, value: 'Next' },
    { id: 6, value: 'Nest' },
  ],
});

// Assign a test parameter to the window object
window.testSel = select;
