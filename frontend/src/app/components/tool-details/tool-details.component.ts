import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/modules/cart-item';

import { Tool } from 'src/app/modules/tool';
import { CartService } from 'src/app/services/cart.service';
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-tool-details',
  templateUrl: './tool-details.component.html',
  styleUrls: ['./tool-details.component.css']
})
export class ToolDetailsComponent implements OnInit {


  tool: Tool = new Tool();
  constructor(private toolService: ToolService,
    private route: ActivatedRoute,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handelToolDetails();
    });
  }


  handelToolDetails() {
    // get the id param string. convert string to a number using the "+" symbol

    const thetoolId: number = +this.route.snapshot.paramMap.get('id');

    this.toolService.getToolById(thetoolId).subscribe(
      data => {
        this.tool = data;
      }
    )
  }

  addToCart() {
    const theCartItem = new CartItem(this.tool);
    this.cartService.addToCart(theCartItem);
  }

}
