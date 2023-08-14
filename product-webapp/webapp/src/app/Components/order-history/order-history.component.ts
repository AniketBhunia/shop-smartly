import { Component, OnInit } from '@angular/core';

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


  constructor() { }

  ngOnInit(): void {
  }

}