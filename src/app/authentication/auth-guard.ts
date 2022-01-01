import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

@Injectable({providedIn:'root'})
export class AuthGuard implements CanActivate{

    constructor(private authenticationService: AuthenticationService,private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree > | Promise<boolean | UrlTree >|UrlTree | boolean {
            return this.authenticationService.user$.pipe(
                take(1),
                map(user=>{
                const isAuth= !!user;

                if(isAuth) {
                    return true;
                }
                else{
                  this.authenticationService.logout();
                  this.router.createUrlTree(['/Auth/Login']);
                  return false;
              }
            }));
    }
}
