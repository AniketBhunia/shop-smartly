// product.model.ts

export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
  }
  
  export interface ShoppingCartItem {
    product: Product;
    unitPrice: number;
    quantity: number;
  }