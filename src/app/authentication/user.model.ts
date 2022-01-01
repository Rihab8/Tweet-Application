export class User{
    constructor( public id: number,
    public image:string,
    public firstName:string,
    public lastName:string,
    public password:string,
    public confirmPassword:string,
    public contactNumber:string,
    public email:string,
    ){}
}