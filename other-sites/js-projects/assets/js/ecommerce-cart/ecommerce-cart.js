//Main variables

const cartButton = document.querySelector('.cart-btn');
const closeCartBtn = document.querySelector('.close-cart');
const clearCartBtn = document.querySelector('.clear-cart');
const cartDOM = document.querySelector('.cart');
const cartOverlay = document.querySelector('.cart-overlay');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartContent = document.querySelector('.cart-content');
const productsDOM = document.querySelector('.products-center');

//General cart array
let cart = [];

//Buttons
let buttonsDOM = [];

//Getting the products
class Products {
  async getProducts() {
    try {
      let result = await fetch('assets/css/ecommerce-cart/products.json');
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image };
      });
      return products;
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
}

//Display products
class UI {
  displayProducts(products) {
    // console.log(products);
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
    productsDOM.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll('.bag-btn')];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      }
      button.addEventListener('click', (event) => {
        // console.log(event);
        event.target.innerText = 'In Cart';
        event.target.disabled = true;

        //Get product from localStorage
        let cartItem = { ...Storage.getProduct(id), amount: 1 };

        //Put product to the cart
        cart.push(cartItem);
        // cart = [...cart, cartItem];
        // console.log(cart);

        //Save cart in localStorage
        Storage.saveCart(cart);

        //Set cart values
        this.setCartValues(cart);

        //Display cart item
        this.addCartItem(cartItem);

        //Show the cart
        // this.showCart();
      });
    });
    // console.log(buttons);
  }
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
  showCart() {
    cartOverlay.classList.add('transparentBcg');
    cartDOM.classList.add('showCart');
  }
  closeCart() {
    cartOverlay.classList.remove('transparentBcg');
    cartDOM.classList.remove('showCart');
  }
  setupApp() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
    cartButton.addEventListener('click', this.showCart);
    closeCartBtn.addEventListener('click', this.closeCart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  cartLogic() {
    //Clear cart button
    clearCartBtn.addEventListener('click', () => {
      this.clearCart();
    });

    //Functionality of the cart
    cartContent.addEventListener('click', (event) => {
      // console.log(event.target);
      if (event.target.classList.contains('remove-item')) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        this.removeItem(id);
        // console.log(removeItem.parentElement.parentElement);
        cartContent.removeChild(removeItem.parentElement.parentElement);
      } else if (event.target.classList.contains('fa-chevron-up')) {
        let addAmount = event.target;
        let id = addAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount = tempItem.amount + 1;
        Storage.saveCart(cart);
        this.setCartValues(cart);
        addAmount.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains('fa-chevron-down')) {
        let lessAmount = event.target;
        let id = lessAmount.dataset.id;
        let tempItem = cart.find((item) => item.id === id);
        tempItem.amount - 1 > 0
          ? (tempItem.amount = tempItem.amount - 1)
          : (tempItem.amount = 1);
        Storage.saveCart(cart);
        this.setCartValues(cart);
        lessAmount.previousElementSibling.innerText = tempItem.amount;
      }
    });
  }
  clearCart() {
    // console.log(this);
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));
    // cartContent.innerHTML = '';
    while (cartContent.children.length > 0) {
      cartContent.removeChild(cartContent.children[0]);
    }
    this.closeCart();
  }
  removeItem(id) {
    // console.log(cart.filter((item) => item.id !== id));
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = `<i class="fa-solid fa-cart-shopping"></i>
    add to cart`;
  }
  getSingleButton(id) {
    return buttonsDOM.find((button) => button.dataset.id === id);
  }
}

//Local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }
  static saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem('products'));
    return products.find((item) => item.id === id);
  }
  static getCart() {
    return localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
  }
}

//Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  //Application setup
  ui.setupApp();

  //Get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});
