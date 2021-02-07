import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToolService } from './services/tool.service'
import { ToolListComponent } from './components/tool-list/tool-list.component';
import { ToolDetailsComponent } from './components/tool-details/tool-details.component';
import { RouterModule, Routes } from '@angular/router';
import { ToolCategoryMenuComponent } from './components/tool-category-menu/tool-category-menu.component';
import { SearchComponent } from './components/search/search.component';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { BearerAuthInterceptorService } from './services/bearer-auth-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './components/login/login.component';
import {MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'tools/:id', component: ToolDetailsComponent },
  { path: 'search/:keyword', component: ToolListComponent },
  { path: 'category/:id/:name', component: ToolListComponent },
  { path: 'category', component: ToolListComponent },
  { path: 'tools', component: ToolListComponent },
  { path: '', redirectTo: '/tools', pathMatch: 'full' },
  { path: '**', redirectTo: '/tools', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolListComponent,
    ToolCategoryMenuComponent,
    SearchComponent,
    ToolDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    RegisterComponent,
    LoginComponent,
    
  ],
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
   // FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [ToolService, {
    provide: HTTP_INTERCEPTORS,
    useClass: BearerAuthInterceptorService,
    multi: true
  },
],
  bootstrap: [AppComponent],
 
  exports: [MatSnackBarModule],
  entryComponents:[LoginComponent]
})
export class AppModule { }
