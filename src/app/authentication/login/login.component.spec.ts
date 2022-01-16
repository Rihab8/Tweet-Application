import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserAccount } from '../user-account.model';

import { LoginComponent } from './login.component';


const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let  authenticationService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
      providers:[HttpClient,{ provide: AuthenticationService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a form with  controls', () => {
    component.ngOnInit();
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });
  it('should check form is submitted correctly and called the method changePassword() in the service', () => {
    let spy = spyOn(authenticationService, 'login').and.callThrough();
    expect(component.loginForm.invalid).toBeTruthy();
    let emailControl = component.loginForm.get('email');
    let newPasswordControl = component.loginForm.get('password');

    emailControl.setValue('AlexJacob@gmail.com');
    newPasswordControl.setValue('pass1234');

    component.onSubmit();
    expect(component.loginForm.valid).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
