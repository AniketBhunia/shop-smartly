import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListsComponent } from './Components/product-lists/product-lists.component';
import { CartComponent } from './Components/cart-page/cart-page.component';
import { ProductDetailedComponent } from './Components/product-detailed/product-detailed.component';

const routes: Routes = [
  {
    path:"view_products",
    component:ProductListsComponent
  },
  {
    path:"mycart",
    component:CartComponent
  },
  {
    path:"details/:productId",
    component:ProductDetailedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
