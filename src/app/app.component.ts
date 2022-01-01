import { AuthenticationService } from './authentication/authentication.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tweet-angular-app';

  constructor(private authenticationService:AuthenticationService){}

  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }

}
