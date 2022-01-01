import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../../authentication/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TweetDataSerice } from '../tweet-data-service';
import { Tweet } from '../tweet.model';
import { UserAccount } from 'src/app/authentication/user-account.model';

@Component({
  selector: 'user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.scss']
})
export class UserTweetsComponent implements OnInit {

  tweets : Tweet[] ;
  replyInput:FormGroup;
  currentUser: UserAccount;

  constructor(private tweetDataService: TweetDataSerice,private authenticationService:AuthenticationService, private router: Router) {
    this.currentUser = JSON.parse((localStorage.getItem('userData')));
  }

  ngOnInit(): void {

    this.replyInput = new FormGroup({
      reply : new FormControl(null)
    });


    this.authenticationService.user$.subscribe(user=>{
      this.currentUser = user;
      if(!!user){
        this.tweetDataService.getTweetsByUserId(user.id);
      }
      else{
        this.router.navigate['Auth/login'];
      }
    })
    this.tweetDataService.userTweets$.subscribe(data=>{
      this.tweets = data;
      console.log(this.tweets);
    })
    console.log(this.tweets);
  }

  replyData(id){
    const value = this.replyInput.value;
    const reply = new Tweet();
    reply.content = value.reply;
    reply.replies = [];
    this.tweetDataService.addReplyTweet(id,reply,true);

    this.replyInput.reset();
  }
  deleteTweet(id){

    this.tweetDataService.deletTweet(id);
  }
}
