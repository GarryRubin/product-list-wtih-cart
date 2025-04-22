import { items } from './items.js';
import { cart, removeFromCart, calculateOrderPrice } from "./cart.js";


export function renderCartSummaryHTML(cartQuantity) {
  //update cart title html
  let cartSummaryHTML = `
    <h3 class="cart-title js-cart-title">Your cart (${cartQuantity})</h3>
  `;

  if (cartQuantity == 0) {
    cartSummaryHTML += `
      <img src="assets/images/illustration-empty-cart.svg" class="empty-cart-img">
      <p class="empty-par">Your added items will appear here</p>
    `
    document.querySelector('.js-cart').innerHTML = cartSummaryHTML
  } else {
    cart.forEach(cartItem => {
      let itemId = cartItem.id;

      items.forEach(item => {
        if (itemId == item.id) {
          cartSummaryHTML += `
          <div class="cart-item js-cart-item-${item.id}">
  
            <div class="cart-item-left">
              <p class="cart-item-name">${item.name}</p>
  
              <div class="cart-item-details">
                <p class="cart-item-quantity">${cartItem.quantity}x</p>
                <p class="cart-item-price">@$${(item.price / 100).toFixed(2)}</p>
                <p class="cart-item-total-price">$${(item.price / 100 * cartItem.quantity).toFixed(2)}</p>
              </div>
            </div>
  
            <div class="cart-item-right">
              <button class="remove-item-btn js-remove-item-btn">
                <img src="assets/images/icon-remove-item.svg" class="remove-item-img">
              </button> 
            </div>
          </div>
          <hr class="js-hr-${item.id}">
          `;
        }
      })
    });

    cartSummaryHTML += `
      <div class="order-total js-order-total">
        <p class="order-total-text">Order Total</p>
        <p class="order-price">$${calculateOrderPrice()}</p>
      </div>
  
      <div class="carbon js-carbon">
        <img src="assets/images/icon-carbon-neutral.svg" class="carbon-icon">
        <p class="carbon-text">This is a <strong>carbon-neutral</strong> delivery</p>
      </div>
      <button class="confirm-order-btn js-confirm-order-btn">Confirm Order</button>
    `
    document.querySelector('.js-cart').innerHTML = cartSummaryHTML;

    //add event listener to remove btn(small cross on the right)
    deleteCartItemHTML();
    //add event listener to confirm order btn
    confirmOrder()
  }
}

function deleteCartItemHTML() {
  cart.forEach(cartItem => {
    let itemId = cartItem.id;

    document.querySelector(`.js-cart-item-${itemId}`).querySelector('.js-remove-item-btn').addEventListener('click', () => {
      removeFromCart(itemId);
    });
  })
}

function confirmOrder() {
  document.querySelector('.js-confirm-order-btn').addEventListener('click', () => {
    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay)

    let orderConfirmedDiv = document.createElement('div');
    orderConfirmedDiv.classList.add('order-confirmed-container');

    let orderListHTML = '';
    cart.forEach(cartItem => {
      let itemId = cartItem.id;

      items.forEach(item => {
        if (itemId == item.id) {
          orderListHTML += `
          <div class="order-item">
            <img src="${item.image}" class="order-item-img">
            <div class="order-item-details">
              <p class="order-item-name">${item.name}</p>
              <p class="order-item-quantity">${cartItem.quantity}x</p>
              <p class="order-item-price">@$${(item.price / 100).toFixed(2)}</p>
            </div>
            <p class="order-item-total-price">$${(item.price / 100 * cartItem.quantity).toFixed(2)}</p>
          </div>
          <hr>
          `
        }
      })
    });

    orderConfirmedDiv.innerHTML = `
    <img class="order-confrirmed-img" src="assets/images/icon-order-confirmed.svg">
    <h1 class="order-title">Order confirmed</h1>
    <p class="title-par">We hope you enjoy your food</p>

    <div class="order-list js-order-list">
      ${orderListHTML}
      <div class="order-total-2">
        <p class="order-total-par">Order Total</p>
        <p class="order-total-price">$${calculateOrderPrice()}</p>
      </div>

    </div>

    <button class="new-order-btn js-new-order-btn">Start new order</button>
    `
    document.body.appendChild(orderConfirmedDiv);

    //add event listener to start new order btn
    document.querySelector('.js-new-order-btn').addEventListener('click', () => {
      window.location.href = 'index.html'
    })
  })
}