import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { UserAccount } from 'src/app/authentication/user-account.model';
import { TweetDataSerice } from '../tweet-data-service';

import { UserTweetsComponent } from './user-tweets.component';

const mockTweetData = {
	"_id" : "61e2e03d87286f4b7c1df495",
	"Content" : " Another Tweet",
	"TweetDate" : "1/15/2022 8:24:53 PM",
	"User" : {
		"_id" : "61e2b1b75c36f225e15ef6e3",
		"Image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
		"Name" : "Rahul Krishna",
		"Email" : "test@gmail.com"
	},
	"Replies" : [
		{
			"_id" : "dac6fbd46fa1d672eaef53a4",
			"Content" : "Reply",
			"TweetDate" : "1/15/2022 8:25:22 PM",
			"User" : {
				"_id" : "61e2b1b75c36f225e15ef6e3",
				"Image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
				"Name" : "Rahul Krishna",
				"Email" : "test@gmail.com"
			},
			"Replies" : [ ],
			"Likes" : [ ]
		},
		{
			"_id" : "4cb51e84439426687a646eec",
			"Content" : "Reply",
			"TweetDate" : "1/15/2022 8:26:30 PM",
			"User" : {
				"_id" :"61e2b1b75c36f225e15ef6e3",
				"Image" : "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=20&m=1214428300&s=170667a&w=0&h=NPyJe8rXdOnLZDSSCdLvLWOtIeC9HjbWFIx8wg5nIks=",
				"Name" : "Rahul Krishna",
				"Email" : "test@gmail.com"
			},
			"Replies" : [ ],
			"Likes" : [ ]
		}
	],
	"Likes" : [ ]
}
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
describe('UserTweetsComponent', () => {
  let component: UserTweetsComponent;
  let fixture: ComponentFixture<UserTweetsComponent>;
  let tweetDataService: TweetDataSerice;
  let authenticationService:AuthenticationService
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTweetsComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [
        HttpClient,{ provide: AuthenticationService },{ provide: TweetDataSerice }]
      })   
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTweetsComponent);
    component = fixture.componentInstance;
    authenticationService = TestBed.inject(AuthenticationService);
    tweetDataService = TestBed.inject(TweetDataSerice);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a replyform with  controls',()=>{
    component.ngOnInit();
    expect(component.replyInput.contains('reply')).toBeTruthy();
  });
  it('should call replyData when replied',()=>{
    let spy = spyOn(tweetDataService, 'addReplyTweet').and.callThrough();
    component.currentUser = mockUsersData;
    let replyControl = component.replyInput.get('reply');
    replyControl.setValue('replied');
    component.replyData('61e2e03d87286f4b7c1df495');
    
    expect(spy).toHaveBeenCalled();
    });

    it('should call likeTweet() when liked',()=>{
        component.currentUser = mockUsersData;
        let spy = spyOn(tweetDataService, 'likeTweet').and.callThrough();
        component.like('iur7945989854');
        expect(spy).toHaveBeenCalled();
    });
    it('should call deleteTweet() when delete',()=>{
        let spy = spyOn(tweetDataService, 'deleteTweet').and.callThrough();
        component.deleteTweet('iur7945989854');
        expect(spy).toHaveBeenCalled();
    });

});
