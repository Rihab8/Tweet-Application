import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserAccount } from '../user-account.model';

import { SignupComponent } from './signup.component';

@Injectable()
class MockAuthService extends AuthenticationService {
  user$ = of(new UserAccount());
  logOut() {}
}
describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let  authenticationService: AuthenticationService;  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule,ReactiveFormsModule],
      providers:[HttpClient,{ provide: AuthenticationService, useClass: MockAuthService }],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a form with  controls', () => {
    component.ngOnInit();
    expect(component.signUpForm.contains('firstName')).toBeTruthy();
    expect(component.signUpForm.contains('lastName')).toBeTruthy();
    expect(component.signUpForm.contains('contactNumber')).toBeTruthy();
    expect(component.signUpForm.contains('email')).toBeTruthy();
    expect(component.signUpForm.contains('password')).toBeTruthy();
    expect(component.signUpForm.contains('confirmPassword')).toBeTruthy();
    expect(component.signUpForm.contains('image')).toBeTruthy();
  });
  it('should check form is submitted correctly and called the method changePassword() in the service', () => {
    let spy = spyOn(authenticationService, 'signUp').and.callThrough();
    expect(component.signUpForm.invalid).toBeTruthy();
    let firstNameControl = component.signUpForm.get('firstName');
    let lastNameControl = component.signUpForm.get('lastName');
    let contactNumberControl = component.signUpForm.get('contactNumber');
    let passwordControl = component.signUpForm.get('password');
    let emailControl = component.signUpForm.get('email');
    let confirmPasswordControl = component.signUpForm.get('confirmPassword');

    emailControl.setValue('AlexJacob@gmail.com');
    firstNameControl.setValue('alex');
    lastNameControl.setValue('jacob');
    contactNumberControl.setValue('9995552451');
    passwordControl.setValue('pass1234');
    confirmPasswordControl.setValue('pass1234');

    component.onSubmit();
    expect(component.signUpForm.valid).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });
});
