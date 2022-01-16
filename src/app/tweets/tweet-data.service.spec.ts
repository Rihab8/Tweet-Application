import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAccount } from 'src/app/authentication/user-account.model';
import { TweetDataService } from './tweet-data.service';
import { Tweet } from './tweet.model';



const mockTweetData:Tweet[] = [{
	"id" : "61e2e03d87286f4b7c1df495",
	"content" : " Another Tweet",
	"tweetDate" : "1/15/2022 8:24:53 PM",
	"user" :  {
        "id": "8698585u98dcdd",
        "image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
        "name" : "Rahul Krishna",
        "email" : "test@gmail.com",
        "_token" : "9998881234",
        "_tokenExpirationDate":new Date(),
        "token" :  "_token" 
        
    },
	"replies" : [
		{
			"id" : "dac6fbd46fa1d672eaef53a4",
			"content" : "Reply",
			"tweetDate" : "1/15/2022 8:25:22 PM",
			"user" :   {
                "id": "8698585u98dcdd",
                "image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
                "name" : "Rahul Krishna",
                "email" : "test@gmail.com",
                "_token" : "9998881234",
                "_tokenExpirationDate":new Date(),
                "token" :  "_token" 
                
            },
			"replies" : [ ],
			"likes" : [ ]
		},
	],
	"likes" : [ ]
}]
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
const allTweets$ = of(mockTweetData);
const userTweets$ = of(mockTweetData);
describe('TweetDataService', () => {
    let service: TweetDataService;
    let httpService: HttpTestingController;
    let router: Router;
    let authenticationService: AuthenticationService;
    const authenticationServiceSpy =
    jasmine.createSpyObj('AuthenticationService', ['user$']);
    authenticationServiceSpy.user$.and.returnValue(mockUsersData);
    beforeEach(() =>
    { TestBed.configureTestingModule({
        imports: [HttpClientTestingModule,RouterTestingModule],
        providers: [
            AuthenticationService,
            HttpClient
        ]
    });
    service = TestBed.inject(TweetDataService);
    httpService = TestBed.inject(HttpTestingController);  
    });

  it('should return tweets by user id', () => {
    let spy = spyOn(service, 'getTweetsByUserId').and.callThrough();
    service.getTweetsByUserId("usjjnj"); 
    expect(service.userTweets$).toBeDefined();
  }); 
  it('should return tweets by user id', () => {
    let spy = spyOn(service, 'getTweets').and.callThrough();
    service.getTweets(); 
    expect(service.allTweets$).toBeDefined();
  });
});
