import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./user.model";
import {catchError, map, tap} from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { TweetDataSerice } from "../tweets/tweet-data-service";
import { UserAccount } from "./user-account.model";
@Injectable({providedIn:'root'})
export class AuthenticationService{

  private user = new BehaviorSubject<UserAccount>(null);
  private tokenExpirationTimer: any;
  public user$: Observable<UserAccount>;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.user$ = this.user.asObservable();
  }

  getAllUser(){
    return this.httpClient.get<User[]>('https://localhost:49155/api/authenticate/users')
    .pipe(map(data=>{
      return data;
    }))
  }

  getUserByEmail(email: string){
     return this.httpClient.get<User>(`https://localhost:49155/api/authenticate?email=${email}`);
  }
  signUp(newUserData: User) {
     this.httpClient
      .post<User>('https://localhost:49155/api/authenticate/signup', newUserData).subscribe(data=>{
        console.log(data);
      })
  }

  login(email: string , password: string){
    return this.httpClient
    .get(`https://localhost:49155/api/authenticate/login?email=${email}&password=${password}`,{responseType:'text'})
      .pipe(
        catchError(this.handleError),
        tap((token) => {
          this.getUserByEmail(email).subscribe((user) => {
            this.handleAuthentication(
              user.id,
              `${user.firstName} ${user.lastName}`,
              email,
              user.image,
              token
            );
          });
        })
      );

  }
  changePassword(email: string, newPassword: string){
    return this.httpClient.put(`https://localhost:49155/api/authenticate/changepassword?email=${email}&password=${newPassword}`, null)
    .pipe(map(data=>{
      return data;
    }))
  }
  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
   // this.tweetDataService.getTweets();
    this.router.navigate(['/Auth/login']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  autoLogin() {
    const userData: UserAccount = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    const loadedUser = new UserAccount();
    loadedUser.id = userData.id;
    loadedUser.name = userData.name;
    loadedUser.image = userData.image;
    loadedUser._token = userData._token;
    loadedUser.email = userData.email;
    loadedUser._tokenExpirationDate = userData._tokenExpirationDate;
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }
  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  private handleAuthentication(
    id: number,
    name: string,
    email: string,
    image: string,
    token: string
  ) {
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    const user = new UserAccount();
    user.id = id;
    user.name = name;
    user.image = image,
    user._token = token;
    user.email = email;
    user._tokenExpirationDate = expirationDate;
    // console.log(user.token);
    this.user.next(user);
   // this.autoLogout(3600 * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  private handleError(errorRes: HttpErrorResponse) {
    return throwError(errorRes.error);
  }
}
