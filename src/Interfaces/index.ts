import { TbookName } from "../types";

export interface Ibooks  {
    id: string ;
    author: string,
    country: string,
    imageLink?: string | File 
    language: string,
    link: string,
    pages: string ,
    title: string,
    year: string,
    description: string,
    category:string 
}



export interface IForms {
  id: string;
  type: string;
  name: TbookName;
  placeholder: string;
}