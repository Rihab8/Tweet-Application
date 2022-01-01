import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  isLoginMode = false;
  error: string;
  constructor(
    private authenticationService: AuthenticationService,private router: Router
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    const value = this.changePasswordForm.value;
    this.authenticationService.changePassword(value.email, value.newPassword).subscribe(
      (data) => {
        this.router.navigate(['Auth/login']);
      },
      (error) => {
        this.changePasswordForm.reset();
        this.error = 'Email doest not exist';
      }
    );
  }

}
