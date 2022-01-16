import { HttpClient } from '@angular/common/http';
import { Injectable,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { UserAccount } from './authentication/user-account.model';


const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};
const mockUsersData: UserAccount = 
  {
      "id": "8698585u98dcdd",
      "image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
      "name" : "Rahul Krishna",
      "email" : "test@gmail.com",
      "_token" : "9998881234",
      "_tokenExpirationDate":new Date(),
      "token" :  "_token" 
      
  }
describe('AppComponent', () => {

 let  authenticationService:AuthenticationService;
 let fixture;
 let app;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[HttpClient,{ provide: AuthenticationService },{ provide: Router, useValue: mockRouter }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
    authenticationService = TestBed.inject(AuthenticationService);
  });
  it('should create the app', () => {

    expect(app).toBeTruthy();
  });

  it(`should have as title 'tweet-angular-app'`, () => {

    expect(app.title).toEqual('tweet-angular-app');
  });
  it('should call autoLogin() method in the service', () => {
    let spy = spyOn(authenticationService, 'autoLogin').and.callThrough();
    app.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
