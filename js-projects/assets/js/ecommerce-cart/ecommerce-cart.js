/* eslint-disable array-callback-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
// Main variables and params
const cartButton = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

// General cart array
let cart = [];

// Buttons
let buttonsDOM = [];

/**
 * Handles operations with getting the products
 *
 * @class Products
 */
class Products {
  /**
   * Take all the products from the json file and translate them
   * to object in comfortable format
   *
   * @return {Object} All the products
   * @memberof Products
   */
  async getProducts() {
    try {
      const result = await fetch('assets/css/ecommerce-cart/products.json');
      const data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return {
          title,
          price,
          id,
          image,
        };
      });
      return products;
    } catch (error) {
      return error;
    }
  }
}

/**
 * Handles all the operations for displaying info on the screen
 *
 * @class UI
 */
class UI {
  /**
   * Generate the DOM structure of the products
   *
   * @param {Object} products
   * @memberof UI
   */
  displayProducts(products) {
    let result = '';
    products.forEach((product) => {
      result += `
      <article class="product">
          <div class="img-container">
            <img
              class="product-img"
              src="${product.image}"
              alt="product"
            />
            <button class="bag-btn" data-id="${product.id}">
              <i class="fa-solid fa-cart-shopping"></i>
              add to cart
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
        `;
    });
    // Append the products to the DOM
    productsDOM.innerHTML = result;
  }

  /**
   * Take all the products buttons and initialize operations with
   * them
   *
   * @memberof UI
   */
  getBagButtons() {
    // Take all the buttons
    const buttons = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      // Take their id's
      const { id } = button.dataset;
      const inCart = cart.find((item) => item.id === id);

      // Change their DOM if products already in cart
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }
      button.addEventListener('click', (event) => {
        // Change their DOM if click happened
        event.target.innerText = 'In Cart';
        event.target.disabled = true;

        // Get product from localStorage + plus amount of 1
        const cartItem = { ...Storage.getProduct(id), amount: 1 };

        // Put product to the cart
        cart.push(cartItem);

        // Save cart in the localStorage
        Storage.saveCart(cart);

        // Set cart values
        this.setCartValues(cart);

        // Display cart item
        this.addCartItem(cartItem);

        // Show the cart(optional)
        // this.showCart();
      });
    });
  }

  /**
   * Set the cart values on its page(total price and items)
   *
   * @param {Array} cart
   * @memberof UI
   */
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }

  /**
   * Generate the DOM structure of the cart item
   *
   * @param {Object} item
   * @memberof UI
   */
  addCartItem(item) {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img
      src="${item.image}"
      alt="product"/>
    <div>
      <h4>${item.title}</h4>
      <h5>$${item.price}</h5>
      <span class="remove-item" data-id="${item.id}">remove</span>
    </div>
    <div>
      <i class="fa-solid fa-chevron-up" data-id="${item.id}"></i>
      <p class="item-amout">${item.amount}</p>
      <i class="fa-solid fa-chevron-down" data-id="${item.id}"></i>
    </div>
    `;
    cartContent.append(div);
    // console.log(cartContent);
  }

  /**
   * Display the cart
   *
   * @memberof UI
   */
  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }

  /**
   * Close the cart
   *
   * @memberof UI
   */
  closeCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }

  /**
   * Initialize the cart
   *
   * @memberof UI
   */
  setupApp() {
    // Take all the cart items from localStorage
    cart = Storage.getCart();
    // Set the cart values
    this.setCartValues(cart);
    // Create DOM structure for every element
    this.populateCart(cart);
    cartButton.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.closeCart);
  }

  /**
   * Generate the DOM for all the elements in the cart
   *
   * @param {*} cart
   * @memberof UI
   */
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  /**
   * Stands for inner logic of every element in the cart
   *
   * @memberof UI
   */
  cartLogic() {
    // Listener for the clear cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });

    // Functionality of the cart
    cartContent.addEventListener('click', (event) => {
      // console.log(event.target);

      // If click happened on the remove button
      if (event.target.classList.contains('remove-item')) {
        // Take the remove-element id
        const removeItem = event.target;
        const { id } = removeItem.dataset;

        // Delete that element from localStorage
        this.removeItem(id);
        // console.log(removeItem.parentElement.parentElement);

        // Remove it from the DOM
        cartContent.removeChild(removeItem.parentElement.parentElement);

        // If click happened on the upper chevron
      } else if (event.target.classList.contains('fa-chevron-up')) {
        // Take the element id
        const addAmount = event.target;
        const { id } = addAmount.dataset;

        // Find the element
        const tempItem = cart.find((item) => item.id === id);

        // Set new value and write it
        tempItem.amount += 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;

        // If click happened on the lower chevron
      } else if (event.target.classList.contains('fa-chevron-down')) {
        // Take the element id
        const lessAmount = event.target;
        const { id } = lessAmount.dataset;

        // Find the element
        const tempItem = cart.find((item) => item.id === id);

        // Set new value and write it
        tempItem.amount - 1 > 0
          ? (tempItem.amount -= 1)
          : (tempItem.amount = 1);
        Storage.saveCart(cart);
        this.setCartValues(cart);
        lessAmount.previousElementSibling.innerText = tempItem.amount;
      }
    });
  }

  /**
   * Clear the cart from items(Array, DOM and localStorage elements)
   *
   * @memberof UI
   */
  clearCart() {
    // Take all the cart items id
    const cartItems = cart.map((item) => item.id);
    // Remove every item by it's id
    cartItems.forEach((id) => this.removeItem(id));
    // While we have subelements -> remove them
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    // Close the cart
    this.closeCart();
  }

  /**
   * Remove item from localStorage and set new values
   *
   * @param {*} id
   * @memberof UI
   */
  removeItem(id) {
    // Select the items without current item
    cart = cart.filter((item) => item.id !== id);
    // Renew the cart values
    this.setCartValues(cart);
    // Save new cart to the localStorage
    Storage.saveCart(cart);
    // Unlock the button on the main page
    const button = this.getSingleButton(id);
    button.disabled = false;
    // Renew button's DOM structure
    button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>
    add to cart`;
  }

  /**
   * Get button by id
   *
   * @param {*} id
   * @return {Object}
   * @memberof UI
   */
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

/**
 * Handles all the operations with localStorage
 *
 * @class Storage
 */
class Storage {
  /**
   * Save the products in the localStorage
   *
   * @static
   * @param {Array} products
   * @memberof Storage
   */
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  /**
   * Save the cart items in the localStorage
   *
   * @static
   * @param {Array} cart
   * @memberof Storage
   */
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /**
   * Get the product by id from the localStorage
   *
   * @static
   * @param {*} id
   * @return {Object}
   * @memberof Storage
   */
  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem('products'));
    return products.find((item) => item.id === id);
  }

  /**
   * Get items from the cart in localStorage
   *
   * @static
   * @return {Array}
   * @memberof Storage
   */
  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Taking the instances of the main classes
  const ui = new UI();
  const products = new Products();

  // Application setup
  ui.setupApp();

  // Get all products and display them
  products
    .getProducts()
    .then((products) => {
      // Display all the products to the user
      ui.displayProducts(products);
      // Save all products in localStorage
      Storage.saveProducts(products);
    })
    .then(() => {
      // Get all the products buttons
      ui.getBagButtons();
      // Initiate the cart logic
      ui.cartLogic();
    });
});
