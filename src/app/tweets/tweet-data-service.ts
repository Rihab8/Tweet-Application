import { AuthenticationService } from './../authentication/authentication.service';
import { UserAccount } from 'src/app/authentication/user-account.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Tweet } from "./tweet.model";

@Injectable({providedIn:'root'})
export class TweetDataSerice{

    private allTweets = new BehaviorSubject<Tweet[]>(null);
    public allTweets$:Observable<Tweet[]>
    private userTweets = new BehaviorSubject<Tweet[]>(null);
    public userTweets$:Observable<Tweet[]>
    private currentUser: UserAccount;
    tweetArray: Tweet[];
    constructor(private httpService: HttpClient , private authenticationService: AuthenticationService){
      this.allTweets$  = this.allTweets.asObservable();
      this.userTweets$  = this.userTweets.asObservable();
      this.currentUser = JSON.parse(localStorage.getItem('userData'));
      this.authenticationService.user$.subscribe(user=>{
        this.currentUser = user;
      })
    }
    getTweetsByUserId(id: number){
      const url=`https://localhost:49153/api/tweet/user?id=${id}`;
       this.httpService.get<Tweet[]>(url).subscribe(data=>{
        this.userTweets.next(data);
      });

  }
    getTweets(){
        const url=`https://localhost:49153/api/tweet`;
        let filteredTweets =[];
         this.httpService.get<Tweet[]>(url).subscribe(tweets=>{
          if(!!tweets){

            if(!!this.currentUser ){
              filteredTweets = tweets.filter(tweet=> {return tweet.user.id !== this.currentUser .id});
            }
            else{
              filteredTweets = tweets;
            }
          }
          this.allTweets.next(filteredTweets);
        })
    }
    addNewTweet(id,tweet: Tweet){
      const url=`https://localhost:49153/api/tweet`;
      this.httpService.post(url,tweet).subscribe(data=>{
        this.getTweetsByUserId(id);
      })
    }

  addReplyTweet(id: string,reply: Tweet,isSame = false){
    const url=`https://localhost:49153/api/tweet/reply/${id}`;
    this.httpService.put(url,reply).subscribe(data=>{
      if(isSame){
        this.getTweetsByUserId(this.currentUser.id);
      }
      else{
        this.getTweets();
      }

    })
  }
  deletTweet(id: number){
    const url=`https://localhost:49153/api/tweet/${id}`;
    this.httpService.delete(url).subscribe(data=>{
      this.getTweetsByUserId(this.currentUser.id);
    })
  }

}

