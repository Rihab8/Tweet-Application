import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from './../../authentication/authentication.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TweetDataService } from '../tweet-data.service';
import { Tweet } from '../tweet.model';
import { UserAccount } from 'src/app/authentication/user-account.model';
import { Modal } from "bootstrap";

@Component({
  selector: 'user-tweets',
  templateUrl: './user-tweets.component.html',
  styleUrls: ['./user-tweets.component.scss']
})
export class UserTweetsComponent implements OnInit {

  tweets : Tweet[] ;
  replyInput:FormGroup;
  currentUser: UserAccount;
  currentId: string = '';
  isShow = false;
  message: string = "";
  modalMessage: string = "";
  testModal: Modal | undefined;
  characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  constructor(private tweetDataService: TweetDataService,private authenticationService:AuthenticationService, private router: Router) {
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
    reply.id = this.randHex(24);
    reply.tweetDate = this.getdateTime();
    reply.user = new UserAccount();
    reply.content = value.reply;
    reply.replies = [];
    reply.likes = [];
    reply.user.id = this.currentUser.id;
    reply.user.image = this.currentUser.image;
    reply.user.email = this.currentUser.email;
    reply.user.name = this.currentUser.name;
    reply.content = value.reply;
    reply.replies = [];
    reply.likes = [];
    this.tweetDataService.addReplyTweet(id,reply,true);

    this.replyInput.reset();
  }
  toggleReply(id) {
    this.isShow = !this.isShow;
    this.currentId = id;
  }
  like(tweetId){
    this.tweetDataService.likeTweet(this.currentUser.id,tweetId,true);
  }
  deleteModal(id: string) {
    this.modalMessage = "Are you sure you want to delete?"
    this.open();

  }
  open() {
    this.testModal = new Modal(document.getElementById('testModal'), {
      keyboard: false
    })
    this.testModal?.show();
  }

  proceed(value: boolean, id: string) {
    this.testModal?.toggle();
    this.deleteTweet(id);
  }
  deleteTweet(id){
    this.tweetDataService.deleteTweet(id);
  }

  isUserLiked(likes: string[]){

    return likes.includes(this.currentUser.id);
  }

getdateTime(){
  const today = new Date();
  return `${today.toLocaleDateString()} ${today.toLocaleTimeString()}`;
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
