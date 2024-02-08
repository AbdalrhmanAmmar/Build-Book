export interface Ibooks  {
    id: string;
    author: string,
    country: string,
    imageLink?: string | File 
    language: string,
    link: string,
    pages: number,
    title: string,
    year: number,
    description: string,
    category:string,
}



export interface IForms{
    id: string,
    type: string,
    name: "author"|"country"|"imageLink"|"language"|"link"|"pages"|"title"|"year"|"description"|"category"
    placeholder: string,
}