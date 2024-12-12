import { ICategory } from "./category";
export interface IProduct{
_id?:string;
name:string;
description:string;
price:number;
quantity:number;
category:string | ICategory;
rating?:number;
availability:boolean;
imageUrl?:string;
}

export interface IAddProduct{
    message: string;
    statusCode: number;
    data:IProduct;
}
export interface IAllProduct {
    message: string,
    image:string;
    statusCode: number,
    data: IProduct[],
    pagination?: {
      currentPage: number,
      totalItems: number,
      totalPages: number
    }
}
export interface IGetProduct {
  message: string,
  image:string;
  statusCode: number,
  data: IProduct,
 }
 export interface CloudinaryResponse {
  image: string
}
// name: { type: String, required: true },
// description: { type: String },
// category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
// price: { type: Number, required: true },
// quantity: { type: Number, required: true },
// imageUrl: { type: String },
// availability: { type: Boolean, default: true },
// sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
// rating: { type: Number, default: 0 },
// totalReviews: { type: Number, default: 0 },