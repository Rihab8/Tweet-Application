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
import { ChangePasswordComponent } from './change-password.component';


const mockRouter = {
  navigate: jasmine.createSpy('navigate'),
};

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let  authenticationService: AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
      providers:[HttpClient,{ provide: AuthenticationService },{ provide: Router, useValue: mockRouter }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a form with  controls', () => {
    component.ngOnInit();
    expect(component.changePasswordForm.contains('email')).toBeTruthy();
    expect(component.changePasswordForm.contains('newPassword')).toBeTruthy();
    expect(component.changePasswordForm.contains('confirmPassword')).toBeTruthy();
  });
  it('should check form is submitted correctly and called the method changePassword() in the service', () => {
    let spy = spyOn(authenticationService, 'changePassword').and.callThrough();
    expect(component.changePasswordForm.invalid).toBeTruthy();
    let emailControl = component.changePasswordForm.get('email');
    let newPasswordControl = component.changePasswordForm.get('newPassword');
    let confirmPasswordControl = component.changePasswordForm.get('confirmPassword');

    emailControl.setValue('AlexJacob@gmail.com');
    newPasswordControl.setValue('pass1234');
    confirmPasswordControl.setValue('pass1234');

    component.onSubmit();
    expect(component.changePasswordForm.valid).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
