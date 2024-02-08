import { Ibooks } from "../../Interfaces";

interface Iprops {
  deletedBook: Ibooks;
}

function DeletedBooks({ deletedBook }: Iprops) {
  return <div>{deletedBook.title} hello</div>;
}

export default DeletedBooks;
