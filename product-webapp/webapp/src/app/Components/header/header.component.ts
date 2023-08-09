import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // eslint-disable-next-line @typescript-eslint/ban-types
  search : String ="";
}
