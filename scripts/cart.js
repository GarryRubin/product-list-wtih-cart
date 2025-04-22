import { createItemCountSelectors, deleteItemCountSelectors } from './main.js'
import { renderCartSummaryHTML } from './cartHTML.js'
import { items } from './items.js'
export let cart = [
 
]

export function addToCart(itemId) {
  cart.push({
    id: itemId,
    quantity: 1
  });

  createItemCountSelectors(itemId)
  calculateCartQuantity();
}

export function removeFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);

  deleteItemCountSelectors(itemId);
  calculateCartQuantity()
}

export function increaseItem(itemId) {
  cart.forEach((item) => {
    if ((itemId == item.id) && (item.quantity > 0)) {
      item.quantity++
    }
  });
  calculateCartQuantity();
}

export function decreaseItem(itemId) {
  cart.forEach((item) => {
    if ((itemId == item.id) && (item.quantity > 1)) {
      item.quantity--;
    } else if ((itemId == item.id) && (item.quantity == 1)) {
      removeFromCart(itemId);
    }
  })
  calculateCartQuantity();
}
//commit 2

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(item => {
    cartQuantity += item.quantity;
  })
  // render cart summary html
  renderCartSummaryHTML(cartQuantity)
  return cartQuantity 
}

export function calculateOrderPrice() {
  let orderPrice = 0;
  cart.forEach(cartItem => {
    // find item id of each cart item to acccess its price from items[]
      let cartItemId = cartItem.id;
      items.forEach(item =>{
        if (cartItemId == item.id){
          orderPrice += cartItem.quantity * (item.price/100)
        }
      })
  })
  return (orderPrice).toFixed(2) 
}


