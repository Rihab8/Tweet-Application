import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserAccount } from '../user-account.model';
import { User } from '../user.model';

import { UsersComponent } from './users.component';

const mockUsersData: User[] = [
    {
        "id" : "61e2b1b75c36f225e15ef6e3",
        "image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
        "firstName" : "Rahul",
        "lastName" : "Krishna",
        "password" : "12345678",
        "confirmPassword" : "12345678",
        "email" : "test@gmail.com",
        "contactNumber" : "9998881234"
    }
];
describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let  authenticationService: AuthenticationService;  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
      providers:[HttpClient,{ provide: AuthenticationService}],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call method getAllUser()',()=>{
    let spy = spyOn(authenticationService, 'getAllUser').and.callThrough();
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
  });
  it('should call method getAllUser() and populate data',()=>{
    let spy = spyOn(authenticationService, 'getAllUser').and.returnValue(of(mockUsersData));
    component.ngOnInit();
    expect(component.users).toBeDefined();
});
});
