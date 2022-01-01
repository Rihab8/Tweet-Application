export  class UserAccount{

  id: number;
  email: string;
  name: string;
  image: string;
  _token: string;
  _tokenExpirationDate: Date

get token(){
  if(!this._tokenExpirationDate || new Date > this._tokenExpirationDate)
         return null;
  return this._token;

 }
}
