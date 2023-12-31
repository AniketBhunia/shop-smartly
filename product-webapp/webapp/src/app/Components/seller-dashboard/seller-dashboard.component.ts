import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './seller-dashboard.component.html',
  styleUrls: ['./seller-dashboard.component.css']
})
export class SellerDashboardComponent implements OnInit {

  greetingMessage !: string;
  ngOnInit(): void {
    this.greetingMessage = `Hello, ${localStorage.getItem('name')}!`;
}
}
