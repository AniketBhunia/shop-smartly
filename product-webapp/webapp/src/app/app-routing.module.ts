import { SignUpUserComponent } from './Components/sign-up-user/sign-up-user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListsComponent } from './Components/product-lists/product-lists.component';
import { CartComponent } from './Components/cart-page/cart-page.component';
import { ProductDetailedComponent } from './Components/product-detailed/product-detailed.component';
import { LoginComponent } from './Components/login/login.component';
import { SignUpSellerComponent } from './Components/sign-up-seller/sign-up-seller.component';
import { HomeComponent } from './Components/home/home.component';
import { ViewbycategoryComponent } from './Components/viewbycategory/viewbycategory.component';
import { ViewbybrandComponent } from './Components/viewbybrand/viewbybrand.component';
import { OrderHistoryComponent } from './Components/order-history/order-history.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
// import { ViewbycategoryComponent } from './Components/viewbycategory/viewbycategory.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "view_products",
    component: ProductListsComponent
  },
  {
    path: "view_products/:category",
    component: ViewbycategoryComponent
  },
  {
    path: "view_productsbybrand/:brand",
    component: ViewbybrandComponent
  },
  {
    path: "mycart",
    component: CartComponent
  },
  {
    path: "details/:productId",
    component: ProductDetailedComponent
  },
  {
<<<<<<< HEAD
    component:LoginComponent,
    path:"login"
  },{
    component:SignUpSellerComponent,
    path:"signUpSeller"
  },{
    component:SignUpUserComponent,
    path:"signUpUser"
  },{
    component:OrderHistoryComponent,
    path:"orderhistory"
}
=======
    component: LoginComponent,
    path: "login"
  }, {
    component: SignUpSellerComponent,
    path: "signUpSeller"
  }, {
    component: SignUpUserComponent,
    path: "signUpUser"
  }, {
    component: OrderHistoryComponent,
    path: "orderhistory"
  }, {
    component: WishlistComponent,
    path: "mywishlist"
  }
>>>>>>> c1dd016f17ed3465ccbf708a284693d3c1e4e8e5
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
