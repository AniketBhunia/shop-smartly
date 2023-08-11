import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})

export class HomeComponent{

  // eslint-disable-next-line @typescript-eslint/ban-types
  search : String ="";
  
  data1 = [
    {
      image: '../../assets/headphones.png',
      name: 'Boat Headphones',
      price: '₹ 1,299'
    },
    {
      image: '../../assets/speaker.jpg',
      name: 'JBL Speaker',
      price: '₹ 2,249'
    },
    {
      image: '../../assets/iPhone.jpg',
      name: 'Iphone 14, 256GB',
      price: '₹ 83,999'
    },
    {
      image: '../../assets/toaster.jpg',
      name: 'Prestige Toaster',
      price: '₹ 799'
    }
  ]

  data2 = [
    {
      image: '../../assets/sunglasses.jpg',
      name: 'Rayban Sunglasses',
      price: '₹ 2,999'
    },
    {
      image: '../../assets/wallet.jpeg',
      name: 'Raymond Mens Wallet',
      price: '₹ 1,999'
    },
    {
      image: '../../assets/laptop.png',
      name: 'HP Probook X100',
      price: '₹ 49,999'
    }
  ]

  // ngOnInit(): void {
  //   // Add any initialization logic here if needed.
  // }

}

