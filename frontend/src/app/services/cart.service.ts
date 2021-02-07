import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../modules/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[];

  totalPrice: Subject<number> = new Subject<number>();

  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {
    this.cartItems= JSON.parse(sessionStorage.getItem('cartItems')) ? JSON.parse(sessionStorage.getItem('cartItems')) : [];
   }


  addToCart(theCartItem: CartItem) {

    // check if we already have the item in our cart

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      // find the item in card based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }
    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(theCartItem);
    }
    // compute cart total price and total quntity
    this.computeCartToatals();
  }

  computeCartToatals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentItemCart of this.cartItems) {
      totalPriceValue += currentItemCart.quantity * currentItemCart.unitPrice;
      totalQuantityValue += currentItemCart.quantity;
    }

    // publish the new values ... all subsecribers will recive the new data

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.persistCartItems();

    //console.log(totalPriceValue);
  }

  decrementQunatity(theCartItem: CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity==0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartToatals()
    }
  }

  remove(theCartItem: CartItem){
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id == theCartItem.id);

    if(itemIndex> -1){
      this.cartItems.splice(itemIndex,1)
      this.computeCartToatals();
    }

  }

  persistCartItems(){
    sessionStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


}
