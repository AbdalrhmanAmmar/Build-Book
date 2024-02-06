import { v4 as uuid } from "uuid";
import { BooksList } from "./BookList";


// export function AddUuidsToBooks(booksList: Ibooks[]): Ibooks[] {
//   return booksList.map((book) => ({
//     ...book,
//     id: uuid(),
//   }));
// }


export const RenderBookList = BooksList.map((book) => ({

...book,
    id: uuid(),
  

    
  }));


  
// const BokkLists = () => {
//   const [booklist, setBooklist] = useState(BooksList)
//   const renderbooklist = booklist.map((book) => {
//     return (
//       <BookCard booklist={booklist} />
//     )
//   })
//     return (
//       <div>
//       {renderbooklist}
//       </div>
//     )
//   }
  
//   export default BokkLists

