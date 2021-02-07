import { Component, OnInit } from '@angular/core';
import { ToolCategory } from 'src/app/modules/tool-category'
import { ToolService } from 'src/app/services/tool.service';

@Component({
  selector: 'app-tool-category-menu',
  templateUrl: './tool-category-menu.component.html',
  styleUrls: ['./tool-category-menu.component.css']
})
export class ToolCategoryMenuComponent implements OnInit {

  toolCategories : ToolCategory[];
  constructor(private toolService: ToolService) { }

  ngOnInit(): void {
    this.listtoolCategories()
  }

  listtoolCategories(){
    this.toolService.getToolCategories().subscribe(
      data => {
        this.toolCategories = data;
      }
    )
  }
}
