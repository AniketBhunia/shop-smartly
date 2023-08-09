import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { ProductListsComponent } from './Components/product-lists/product-lists.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './Components/cart-page/cart-page.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ProductDetailedComponent } from './Components/product-detailed/product-detailed.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingInComponent,
    ProductListsComponent,
    CartComponent,
    ProductDetailedComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule,
    NgbCarouselModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
