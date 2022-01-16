import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { TweetDataService } from '../tweets/tweet-data.service';
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
    let localStore;
    beforeEach(() =>
    { TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,RouterTestingModule],
        providers: [
            HttpClient,{ provide: Router, useValue: mockRouter },
        ]
    });
    localStore = {};

    spyOn(window.localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(window.localStorage, 'clear').and.callFake(() => (localStore = {}));
    httpService = TestBed.inject(HttpTestingController);  
    service = TestBed.inject(AuthenticationService);
    });

  it('should user$ emit null when logout() method is called', () => {
   // let spy = spyOn(service, 'logout').and.callThrough();
    service.logout(); 
    service['user'].subscribe(value=>{
      expect(value).toBeNull();
    })
  }); 
  it('getUserByEmail',()=>{
    service.getUserByEmail('test@gmail.com').subscribe(data=>{
      expect(data).toBeDefined();
    });
  })
  it('test handleAuthentication method',()=>{
      service['handleAuthentication'](mockUsersData.id,mockUsersData.name,mockUsersData.email,mockUsersData.image,mockUsersData.token);
      service['user'].subscribe(value=>{
        expect(value).toBeDefined();
      })
    });
    it('should run autoLogin() method succesfully',()=>{
      window.localStorage.setItem('userData',JSON.stringify(mockUsersData));
      service.autoLogin();
     expect(JSON.parse(window.localStorage.getItem('userData'))).toBeDefined();
    });
});
