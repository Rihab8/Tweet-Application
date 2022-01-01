import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  isLoginMode = false;
  error: string;
  constructor(
    private authenticationService: AuthenticationService,private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    const value = this.loginForm.value;
    this.authenticationService.login(value.email, value.password).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.loginForm.reset();
        this.error = 'Wrong email or password';
      }
    );
  }

}
