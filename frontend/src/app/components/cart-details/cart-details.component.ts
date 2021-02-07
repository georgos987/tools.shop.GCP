import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/modules/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  oneDollar: number= 2500;
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.listCartDetails();
  }


  listCartDetails() {
    
    // get a handele to cart items
    this.cartItems = this.cartService.cartItems;

    // subscribe to cart totalPrice
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data)

    // subscribe to cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    // compute cart total pricd and quantity

    this.cartService.computeCartToatals();
    

  }

  incrementQuantity(theCartItem: CartItem){

    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem){
    this.cartService.decrementQunatity(theCartItem);
  }

  remove(theCartItem: CartItem){
    this.cartService.remove(theCartItem)
  }

  

}
