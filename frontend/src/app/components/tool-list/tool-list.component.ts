import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool } from 'src/app/modules/tool';
import { CartItem } from 'src/app/modules/cart-item';
import { ToolService } from 'src/app/services/tool.service';
import { CartService } from 'src/app/services/cart.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.css']
})
export class ToolListComponent implements OnInit {



  
  currentCategoryName: string;
  tools: Tool[] = [];
  searchMode: boolean = false;
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;

  //new properties for pagination

  thePageNumber: number = 1;
  thePageSize: number = 8;
  theTotaElements: number = 0;



  constructor(private toolService: ToolService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listTools();
    });
  }

  listTools() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handeleSearchTools();
    } else {
      this.handelListTools()
    }

  }

  handeleSearchTools() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // now search for the Tools using keyword, page, pageSize
    this.toolService.searchToolListPaginate(this.thePageNumber-1,this.thePageSize,theKeyword)
    .subscribe(this.processResult());

  }

  handelListTools() {

    // check if "id" parameter is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol  
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')

      // get the "name" parm string.
      this.currentCategoryName = this.route.snapshot.paramMap.get('name');
    }
    else {
      // not category id avalible.. default to category 1
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books"
    }

    // if we have a different category id then previous
    // than set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    // now get the Tools for the given category id
    this.toolService
    .getToolListPaginate(this.thePageNumber - 1,
                            this.thePageSize,
                            this.currentCategoryId)
                            .subscribe(this.processResult())
  }

  

  processResult() {
    return data => {
      this.tools = data._embedded.tools;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotaElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listTools();
  }

  addToCart(tool: Tool){
    const theCartItem = new CartItem(tool);
    this.cartService.addToCart(theCartItem);
  }
}
