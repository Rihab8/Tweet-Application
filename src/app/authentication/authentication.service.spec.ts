import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UserAccount } from './user-account.model';





const mockUsersData: UserAccount = 
  {
      "id": "8698585u98dcdd",
      "image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
      "name" : "Rahul Krishna",
      "email" : "test@gmail.com",
      "_token" : "9998881234",
      "_tokenExpirationDate":new Date(),
      "token" :  "_token" 
      
  }
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };
describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let httpService: HttpTestingController;
    let router: Router;
    beforeEach(() =>
    { TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,RouterTestingModule],
        providers: [
            HttpClient,{ provide: Router, useValue: mockRouter },
        ]
    });
    httpService = TestBed.inject(HttpTestingController);  
    });

  xit('should logout when logout() method is called', () => {
   // let spy = spyOn(service, 'logout').and.callThrough();
    service.logout(); 
    expect(service.user$).toBeNull();
  }); 

    xit('test handleAuthentication',()=>{
        service['handleAuthentication'](mockUsersData.id,mockUsersData.name,mockUsersData.email,mockUsersData.image,mockUsersData.token);
        
    });
});
