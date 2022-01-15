import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, MinLengthValidator, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { image } from 'src/app/constants/constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isLoginMode = false;
  url: any;
  error: string;

  constructor(
    private authenticationService: AuthenticationService,private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      contactNumber: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
      ]),
      image: new FormControl(null)
   },{ validators:[ passwordMatchingValidatior.bind(this)] });
  }



selectFile(event: any) {

  var reader = new FileReader();
  reader.readAsDataURL(event.target.files[0]);

  reader.onload = (_event) => {
    this.url = reader.result;
  }
}
  onSubmit() {
    const value = this.signUpForm.value;
    const imageUrl = value.image === null ? image : value.image
    const newUser= new User("",imageUrl, value.firstName,value.lastName,
    value.password,value.confirmPassword,value.contactNumber,value.email);
    this.authenticationService.signUp(newUser).subscribe(
      (data) => {
        this.router.navigate(['/Auth/login']);
      },
      (error) => {
        this.signUpForm.reset();
        this.error = error;
      }
    );

  }
}

//password validation
export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};