export interface ILoginResponse{
    message:string;
    role_id:string;
    statusCode:number;
    success:true;
    token:string;
    refreshToken:string,
    _id:string;
}
export interface ILogin{
    email:string;
    password:string;
}
export interface IRoleDetails {
gst_no:string
}
export interface IToken {
    token: string;
    message: string;
    statuscode: number;
    success: boolean;
    _id: string;
    role: string;
    refreshToken:string | ""
  }
  

export interface ISeller{
  username: string;
  password: string;
  email: string;
  contact_number: string;
  address: string;
  role_id?: string;
  role:string;
  role_specific_details: IRoleDetails[];
  _id: string;

}
export interface ISellerRegister{
    message: string;
    statusCode: number;
    _id: string;
    token: string;
}

