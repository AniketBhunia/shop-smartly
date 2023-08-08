import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListsComponent } from './Components/product-lists/product-lists.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './Components/cart-page/cart-page.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ProductDetailedComponent } from './Components/product-detailed/product-detailed.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListsComponent,
    CartComponent,
    ProductDetailedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
