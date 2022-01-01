import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  collapsed = true;
  userSub:Subscription;
  isAuthenticated = false;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.userSub = this.authenticationService.user$.subscribe(data=>{
      this.isAuthenticated = !!data;
    })
  }

  logoutUser(){
    this.authenticationService.logout();
  }
}

