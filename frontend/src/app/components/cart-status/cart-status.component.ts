import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartService } from 'src/app/services/cart.service';
import { LoginComponent } from '../login/login.component';
import { MatDialog } from '@angular/material/dialog'
import { RegisterService } from 'src/app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {


  totalParice: number;
  totalQuantity: number;
  login: boolean = false;


  constructor(private cartService: CartService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private registerService: RegisterService
  ) { }


  ngOnInit(): void {
    if(localStorage.getItem("token")){
      this.registerService.login();

    }
    this.updateCartStaus();
    this.cartService.computeCartToatals();
    this.registerService.loggedIn.subscribe(data => {
      this.login = data;
    })
  }

  updateCartStaus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalParice = data
    )

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

  }

  loginDialog() {
    let dialogRef = this.dialog.open(LoginComponent, {
      disableClose: false,
    });
  }

  logout() {
    this.registerService.logout();
    localStorage.removeItem("token");
    this.registerService.loggedIn.subscribe(data => {
      this.login = data;
      this.snackBar.open("successfully logout", "", { duration: 3000 });
    })
  }
}
