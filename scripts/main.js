import { items } from './items.js';
import { cart, addToCart, increaseItem, decreaseItem } from './cart.js';

//render items data and generate items html

let itemsHTML = '';
items.forEach((item) => {
  itemsHTML += `
    <div class="item-container">
      <image src="${item.image}" class="thumbnail-img">
      <button class="add-btn js-add-btn"  data-item-id="${item.id}">
        <image src="assets/images/icon-add-to-cart.svg" class="btn-img"></image>Add to Cart
      </button>

      <p class="item-name-short">${item.shortName}</p>
      <p class="item-name">${item.name}</p>
      <p class="price">$${(item.price / 100).toFixed(2)}</p>
    </div>
  `
})

document.querySelector('.js-grid').innerHTML = itemsHTML;

//make interactive add buttons
document.querySelectorAll('.js-add-btn').forEach((addBtn) => {
  addBtn.addEventListener('click', () => {
    let itemId = addBtn.dataset.itemId;
    addToCart(itemId);
  })
})

export function createItemCountSelectors(itemId) {
  //find the right item from the cart with the mathcing id. We need it to access it's quantity property that we fill into the item count html
  let cartItem;
  cart.forEach((item) => {
    if (item.id == itemId) {
      cartItem = item;
    }
  });

  //creating the item count element
  let itemCountSelectorElement = document.createElement('div');
  itemCountSelectorElement.classList.add('item-count-selector');
  itemCountSelectorElement.classList.add('js-item-count-selector');
  itemCountSelectorElement.dataset.itemId = `${itemId}`;
  itemCountSelectorElement.innerHTML = `
    <button class="decrement-btn js-decrement-btn" data-item-id="${itemId}">
      <img src="assets/images/icon-decrement-quantity.svg" class="decrement-img">
    </button>
    <p class="item-cart-count">${cartItem.quantity}</p>
    <button class="increment-btn js-increment-btn" data-item-id="${itemId}">
      <img src="assets/images/icon-increment-quantity.svg" class="increment-img">
    </button>
  `
  //activate incr and decr buttons for each of the created itemcount selector
  itemCountSelectorElement.querySelector('.js-increment-btn').addEventListener('click', () => {
    increaseItem(itemId);
    
    //update cart count html par
    itemCountSelectorElement.querySelector('.item-cart-count').innerHTML = cartItem.quantity;
  })

  itemCountSelectorElement.querySelector('.js-decrement-btn').addEventListener('click', () => {
    decreaseItem(itemId);

    //update cart count html par
    itemCountSelectorElement.querySelector('.item-cart-count').innerHTML = cartItem.quantity
  })

  document.querySelector(`.js-add-btn[data-item-id='${itemId}']`).replaceWith(itemCountSelectorElement);
}

export function deleteItemCountSelectors(itemId) {
  let addBtn = document.createElement('btn');
  addBtn.classList.add('add-btn');
  addBtn.classList.add('js-add-btn');
  addBtn.dataset.itemId = `${itemId}`;
  addBtn.innerHTML = `
    <image src="assets/images/icon-add-to-cart.svg" class="btn-img"></image>Add to Cart
  `
  addBtn.addEventListener('click', () => {
    let itemId = addBtn.dataset.itemId;
    addToCart(itemId);
  });

  document.querySelector(`.js-item-count-selector[data-item-id='${itemId}']`).replaceWith(addBtn)
}




