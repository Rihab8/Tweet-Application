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
  currentId = '';
  isShow = false;
  message: string = "";
  modalMessage: string = "";

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
      newTweet.tweetDate = this.getdateTime();
      newTweet.replies = [];
      newTweet.likes = [];
      newTweet.user = new UserAccount();
      newTweet.user.id = this.currentUser.id;
      newTweet.user.image = this.currentUser.image;
      newTweet.user.email = this.currentUser.email;
      newTweet.user.name = this.currentUser.name;
      this.tweetDataService.addNewTweet(this.currentUser.id,newTweet);
      this.isShow = true;
      this.message = "Tweet Added";
      this.tweetForm.reset();
    }
    else{
      this.router.navigate(['Auth/login']);
    }
  }

  toggleReply(id) {
    this.isShow = !this.isShow;
    this.currentId = id;
  }

  like(tweetId){

    if(!!this.currentUser){
      this.tweetDataService.likeTweet(this.currentUser.id,tweetId);
    }
    else{
      this.router.navigate(['Auth/login']);
    }
  }

  replyData(id){

    if(!!this.currentUser){
      const value = this.replyInput.value;
      const reply = new Tweet();
      reply.id = this.randHex(24);
      reply.tweetDate = this.getdateTime();;
      reply.user = new UserAccount();
      reply.content = value.reply;
      reply.replies = [];
      reply.likes = [];
      reply.user.id = this.currentUser.id;
      reply.user.image = this.currentUser.image;
      reply.user.email = this.currentUser.email;
      reply.user.name = this.currentUser.name;
      this.tweetDataService.addReplyTweet(id,reply);
      this.replyInput.reset();
    }
    else{
      this.router.navigate(['Auth/login']);
    }

  }

  getdateTime(){
    const today = new Date();
    return `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`;
  }

  isUserLiked(likes: string[]){
    if(!!this.currentUser){
      return likes.includes(this.currentUser.id);
    }
    return false;
  }  
  randHex = function(len) {
    var maxlen = 8,
        min = Math.pow(16,Math.min(len,maxlen)-1)
        let max = Math.pow(16,Math.min(len,maxlen)) - 1,
        n   = Math.floor( Math.random() * (max-min+1) ) + min,
        r   = n.toString(16);
    while ( r.length < len ) {
       r = r + this.randHex( len - maxlen );
    }
    return r;

}
}
