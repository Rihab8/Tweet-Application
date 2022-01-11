import { UserAccount } from 'src/app/authentication/user-account.model';
import { User } from "../authentication/user.model";

export class Tweet{
         id: string;
         content: string;
         tweetDate: string;
         user: UserAccount;
         replies: Tweet[];
         likes: string[];
}
