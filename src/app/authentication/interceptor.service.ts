import { Injectable } from "@angular/core";
import { HttpInterceptor,HttpRequest ,HttpHandler} from '@angular/common/http';
import { take, exhaustMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthenticationService } from "./authentication.service";

@Injectable()
export class InterceptorService implements  HttpInterceptor{

    constructor(private authenticationService:AuthenticationService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
       return this.authenticationService.user$.pipe(take(1),exhaustMap(user =>{
           if(!user)
           {
            return next.handle(req);
           }
           const modifiedReq=req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + user.token) });
           return next.handle(modifiedReq).pipe(catchError((error)=>{
                console.log(error);
                return throwError(error);
           }));
        }));

    }

}
