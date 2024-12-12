export interface ICategory {
    _id: string;
    name?:string;
    description?:string
  }
  

  export interface IAllCategory {
    message: string,
    image:string;
    statusCode: number,
    data: ICategory[],
    // pagination: {
    //   currentPage: number,
    //   totalItems: number,
    //   totalPages: number
    // }

  
  }
  export interface IAddCategory{
    message: string;
    statusCode: number;
    data:ICategory;
}