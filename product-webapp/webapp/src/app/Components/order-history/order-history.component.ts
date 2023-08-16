import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from 'src/app/Services/order-history.service';
import { ShoppingCartItem } from 'src/app/cartModel';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
onFileSelected($event: Event) {
throw new Error('Method not implemented.');
}

orders: any[] = [
  { id: 1, product: 'iPhone', image: '../assets/iphone_image.jpeg', quantity: 1, price: 1000 },
  { id: 2, product: 'Shoes', image: '../assets/shoes.jpg', quantity: 1, price: 30 },
  { id: 3, product: 'Headphone', image: '../assets/images.jpeg', quantity: 1, price: 15 }
  // Add more orders as needed
];


constructor(private OrderHistoryService: OrderHistoryService) { }

ngOnInit(): void {
  // Example usage of the OrderService methods
  this.createOrder();
  this.getOrderById(123); // Replace with an actual order ID
  this.deleteOrderById(123); // Replace with an actual order ID

  // const cartData: ShoppingCartItem[] = [
  //   {
  //     cartId: 1,
  //     userId: 1,
  //     productId: 'prod123',
  //     productName: 'Product 1',
  //     cartTotalPrice: 100,
  //     productImage: '../assets/iphone_image.jpeg',
  //     productPrice: 50,
  //     productQuantity: 2
  //   },
  //   {
  //     cartId: 2,
  //     userId: 1,
  //     productId: 'prod456',
  //     productName: 'Product 2',
  //     cartTotalPrice: 150,
  //     productImage: 'image-url-2',
  //     productPrice: 75,
  //     productQuantity: 2
  //   }
  //   // Add more cart items as needed
  // ];
  this.getOrderHistoryByCart(this.orders);
}

createOrder(): void {
  const order = {/* your order data here */};
  this.OrderHistoryService.createOrder(order)
    .subscribe(response => {
      console.log('Order created:', response);
    }, error => {
      console.error('Error creating order:', error);
    });
}

getOrderById(orderId: number): void {
  this.OrderHistoryService.getOrderById(orderId)
    .subscribe(response => {
      console.log('Order details:', response);
    }, error => {
      console.error('Error fetching order details:', error);
    });
}

deleteOrderById(orderId: number): void {
  this.OrderHistoryService.deleteOrderById(orderId)
    .subscribe(response => {
      console.log('Order deleted:', response);
    }, error => {
      console.error('Error deleting order:', error);
    });
}

getOrderHistoryByCart(cartData: any): void {
  this.OrderHistoryService.getOrderHistoryByCart(cartData)
    .subscribe(response => {
      console.log('Order history:', response);
    }, error => {
      console.error('Error fetching order history:', error);
    });
}
}