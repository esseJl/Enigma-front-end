import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = '';

  constructor(private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd)
          switch (event.url) {
            case '/home':
            case '/':
              this.title = 'Home'
              break;
            case '/reportage' :
              this.title = 'Reportage'
              break;
            case '/orders' :
              this.title = 'Orders'
              break;
            case '/dxy-week' :
              this.title = 'DXY week'
              break;
            case '/dxy-day' :
              this.title = 'DXY day'
              break;
            case '/hour':
              this.title = 'XAUUSD Hour'
              break;
            case '/day':
              this.title = 'XAUUSD Day'
              break;
            case '/week':
              this.title = 'XAUUSD Week'
              break;
            case '/upload-order-daily':
              this.title = 'upload order daily'
              break;
            case '/upload-hour':
              this.title = 'upload xauusd hour'
              break;
            case '/upload-hour-real':
              this.title = 'upload xauusd hour real'
              break;
            case '/upload-hour-predict':
              this.title = 'upload xauusd hour predict'
              break;
            case '/upload-day-pre':
              this.title = 'upload xauusd day pre'
              break;
            case '/upload-day-real':
                            this.title = 'upload xauusd day real'
                            break;
                        case '/upload-week-pre':
                            this.title = 'upload xauusd week pre'
                            break;
                        case '/upload-week-real':
                            this.title = 'upload xauusd week real'
                            break;
                        case '/upload-min-real':
                            this.title = 'upload xauusd min real'
                            break;
                        case '/upload-dxy':
                            this.title = 'upload DXY'
                            break;
                        default:
                            this.title = '';
                    }
            });
    }
}
