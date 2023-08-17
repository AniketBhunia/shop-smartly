export interface ShoppingCartItem {
    cartId:number;
    userId:string | null;
    productId:number;
    productName:string
    cartTotalPrice:number;
    productImage:string;
    productPrice:number;
    productQuantity:number;
    expanded: boolean;
    showReviewForm: boolean;
    canAddReview:boolean
  }