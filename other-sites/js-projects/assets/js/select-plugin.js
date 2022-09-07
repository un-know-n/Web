const getTemplate = (
  placeholder = 'Define your choice',
  data = [],
  selectedId
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

class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;
    this.#render();
    this.#setup();
  }

  #render() {
    const { placeholder, data } = this.options;
    this.$el.classList.add('select');
    this.$el.innerHTML = getTemplate(placeholder, data, this.selectedId);
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$el.addEventListener('click', this.clickHandler);
    this.$arrow = this.$el.querySelector('[data-type="arrow"]');
    this.$value = this.$el.querySelector('[data-type="value"]');
  }

  get current() {
    return this.options.data.find(
      (item) => item.id.toString() === this.selectedId
    );
  }

  clickHandler(event) {
    const { type } = event.target.dataset;
    if (type === 'input') this.toggle();
    if (type === 'item') {
      const id = event.target.dataset.id;
      // console.log('id ', id);
      this.select(id);
    }
  }

  select(id) {
    this.selectedId = id;
    this.$value.innerHTML = this.current.value;

    this.$el.querySelectorAll(`[data-type="item"]`).forEach((element) => {
      element.classList.remove('selected');
    });
    this.$el
      .querySelector(`[data-id="${this.selectedId}"]`)
      .classList.add('selected');

    this.close();
  }

  toggle() {
    this.$el.classList.contains('open') ? this.close() : this.open();
  }

  open() {
    this.$el.classList.add('open');
    this.$arrow.style.cssText = 'transform: rotate(180deg);';
  }

  close() {
    this.$el.classList.remove('open');
    this.$arrow.style.cssText = 'transform: rotate(360deg);';
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler);
    this.$el.remove();
  }
}

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
window.testSel = select;
