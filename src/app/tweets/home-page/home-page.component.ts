import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../../authentication/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TweetDataSerice } from '../tweet-data-service';
import { Tweet } from '../tweet.model';
import { User } from 'src/app/authentication/user.model';
import { UserAccount } from 'src/app/authentication/user-account.model';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  tweets : Tweet[] = [];
  replyInput:FormGroup;
  tweetForm: FormGroup;
  currentUser: UserAccount;
  constructor(private tweetDataService: TweetDataSerice,private authenticationService:AuthenticationService, private router: Router) {
    this.currentUser = JSON.parse((localStorage.getItem('userData')));
  }

  ngOnInit(): void {

    this.replyInput = new FormGroup({
      reply : new FormControl(null)
    });
    this.tweetForm = new FormGroup({
      tweet: new FormControl(null)
    });

    this.authenticationService.user$.subscribe(user=>{
      this.currentUser = user;
    })
    this.tweetDataService.getTweets();

    this.tweetDataService.allTweets$.subscribe(data=>{
          this.tweets = data;
    })
  }

  newTweet(){
    if(!!this.currentUser){
      const tweetContent = this.tweetForm.value;
      const newTweet = new Tweet();
      newTweet.content = tweetContent.tweet;
      newTweet.id = 10;
      newTweet.replies = [];
      newTweet.user = new User(this.currentUser.id,null,null,null,null,null,null,null);
      this.tweetDataService.addNewTweet(this.currentUser.id,newTweet);
      this.tweetForm.reset();
    }
    else{
      this.router.navigate(['Auth/login']);
    }
  }
  replyData(id){

    if(!!this.currentUser){
      const value = this.replyInput.value;
      const reply = new Tweet();
      reply.content = value.reply;
      reply.replies = [];
      this.tweetDataService.addReplyTweet(id,reply);
      this.replyInput.reset();
    }
    else{
      this.router.navigate(['Auth/login']);
    }

  }

}
