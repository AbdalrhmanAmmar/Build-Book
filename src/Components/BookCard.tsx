import { Ibooks } from "../Interfaces";
import Button from "./UI_Shared/Button";

interface Iprops {
  books: Ibooks;
}
function BookCard({ books }: Iprops) {
  const {
    author,
    country,
    imageLink,
    language,
    link,
    pages,
    title,
    year,
    description,
    category,
  } = books;
  return <></>;
}

export default BookCard;
