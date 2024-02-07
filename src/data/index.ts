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
    name: "title",
    placeholder: "Title",
    type: "text",
  },
  {
    id: "Author",
    name: "author",
    placeholder: "Author",
    type: "text",
  },
    {
    id: "Link",
    name: "link",
    placeholder: "Link",
    type: "text",
  },
    {
    id: "Description",
    name: "description",
    placeholder: "Description",
    type: "textarea",
  },
  {
    id: "Country",
    name: "country",
    placeholder: "Country",
    type: "text",
  },



  {
    id: "Pages",
    name: "pages",
    placeholder: "Pages",
    type: "number",
  },
  {
    id: "Year",
    name: "year",
    placeholder: "Year",
    type: "number",
  },
    {
    id: "Language",
    name: "language",
    placeholder: "Language",
    type: "text",
  },

  {
    id: "Category",
    name: "category",
    placeholder: "Category",
    type: "text",
  },
  {
    id: "imageLink",
    name: "imageLink",
    placeholder: "imageLink",
    type: "file",
  },
];


