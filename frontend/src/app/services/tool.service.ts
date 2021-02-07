import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tool } from '../modules/tool';
import { map } from 'rxjs/operators';
import { ToolCategory } from '../modules/tool-category';
import { Ip } from '../modules/ip';


@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private ip = Ip.IP;
  private baseUrl = `${this.ip}/tools`;
  private categoryUrl = `${this.ip}/tool-category`;


  constructor(private httpCients: HttpClient) { }

  getToolList(theCategoryId: number): Observable<Tool[]> {
    
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
    return this.getTool(searchUrl);

  }


  searchToolListPaginate(thePage: number,
                            thePageSize: number,
                            theKeyword: string): Observable<GetResponseTools> {

    // need to build URL on keyword , page and size
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
      + `&page=${thePage}&size=${thePageSize}`
    return this.httpCients.get<GetResponseTools>(searchUrl);
  }

  getToolCategories(): Observable<ToolCategory[]> {
    return this.httpCients.get<GetResponseToolCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.toolCategories)
    );
  }

  getTool(searchUrl: string): Observable<Tool[]> {
    return this.httpCients.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.tools));
  }

  getToolById(toolId: number) {

    const toolUrl: string = `${this.baseUrl}/${toolId}`;
    return this.httpCients.get<Tool>(toolUrl);
  }

  getToolListPaginate(thePage: number,
    thePageSize: number,
    theCategoryId: number): Observable<GetResponseTools> {
    // need to build URL on category id, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
      + `&page=${thePage}&size=${thePageSize}`
    return this.httpCients.get<GetResponseTools>(searchUrl);
  }



}



interface GetResponse {
  _embedded: {
    tools: Tool[];
  }
}

interface GetResponseToolCategory {
  _embedded: {
    toolCategories: ToolCategory[];
  }
}

interface GetResponseTools {
  _embedded: {
    tools: Tool[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPage: number,
    number: number,
  }

}