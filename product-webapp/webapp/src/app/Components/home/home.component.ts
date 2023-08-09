import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})

export class HomeComponent  {

  // eslint-disable-next-line @typescript-eslint/ban-types
  search : String ="";
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  

}

