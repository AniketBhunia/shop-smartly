import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListsComponent } from './Components/product-lists/product-lists.component';
import { CartComponent } from './Components/cart-page/cart-page.component';

const routes: Routes = [
  {
    path:"view_products",
    component:ProductListsComponent
  },
  {
    path:"mycart",
    component:CartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
