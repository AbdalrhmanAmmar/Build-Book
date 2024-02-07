import { v4 as uuid } from "uuid";
import { BooksList } from "./BookList";
import { IForms, Ibooks } from "../Interfaces";


// export function AddUuidsToBooks(booksList: Ibooks[]): Ibooks[] {
//   return booksList.map((book) => ({
//     ...book,
//     id: uuid(),
//   }));
// }


export const RenderBookList:Ibooks[] = BooksList.map((book) => ({

...book,
    id: uuid(),
  

    
  }));


  
export const Formdata:IForms[] = [
  {
    id: "Title",
    name: "Title",
    placeholder: "Title",
    type: "text",
  },
  {
    id: "Author",
    name: "Author",
    placeholder: "Author",
    type: "text",
  },
    {
    id: "Link",
    name: "Link",
    placeholder: "Link",
    type: "text",
  },
    {
    id: "Description",
    name: "Description",
    placeholder: "Description",
    type: "textarea",
  },
  {
    id: "Country",
    name: "Country",
    placeholder: "Country",
    type: "text",
  },



  {
    id: "Pages",
    name: "Pages",
    placeholder: "Pages",
    type: "number",
  },
  {
    id: "Year",
    name: "Year",
    placeholder: "Year",
    type: "number",
  },
    {
    id: "Language",
    name: "Language",
    placeholder: "Language",
    type: "text",
  },

  {
    id: "Category",
    name: "Category",
    placeholder: "Category",
    type: "text",
  },
];


