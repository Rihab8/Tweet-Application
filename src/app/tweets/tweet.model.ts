import { User } from "../authentication/user.model";

export class Tweet{
        id: number;
         content:string;
         tweetDate:Date;
         user:User;
         replies: Tweet[];
}
