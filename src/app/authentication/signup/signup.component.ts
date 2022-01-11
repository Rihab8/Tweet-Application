import { AuthenticationService } from './../authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, MinLengthValidator, ValidationErrors, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Router } from '@angular/router';

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
      lastName: new FormControl(null, [Validators.required,Validators.minLength(3)]),
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
        Validators.minLength(8),
      ]),
      image: new FormControl(null)
    },{
      validators: this.validateConfirmPassword.bind(this)
   });
  }

  //confirm password validation
  validateConfirmPassword(
    control: AbstractControl
 ): ValidationErrors | null {
    if (control && control.get("password") && control.get("newPassword")) {
       const password = control.get("password").value;
       const newPassword = control.get("newPassword").value;
       return (password === newPassword) ? {
          passwordSame: true
       } : null
    }
    return null;
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

    const newUser= new User("",value.image, value.firstName,value.lastName,
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
