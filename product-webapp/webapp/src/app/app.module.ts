import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProductListsComponent } from './Components/product-lists/product-lists.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartComponent } from './Components/cart-page/cart-page.component';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ProductDetailedComponent } from './Components/product-detailed/product-detailed.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatMenuModule} from '@angular/material/menu';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './Components/login/login.component';
import { SignUpSellerComponent } from './Components/sign-up-seller/sign-up-seller.component';
import { SignUpUserComponent } from './Components/sign-up-user/sign-up-user.component';
import { LoginService } from './Services/login.service';
import { ViewbycategoryComponent } from './Components/viewbycategory/viewbycategory.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { ViewbybrandComponent } from './Components/viewbybrand/viewbybrand.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { AlertService } from './Services/alert-service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    ProductListsComponent,
    CartComponent,
    ProductDetailedComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignUpSellerComponent,
    SignUpUserComponent,
    ViewbycategoryComponent,
    OrderHistoryComponent,
    ViewbybrandComponent,
    WishlistComponent,
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
    MatMenuModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
