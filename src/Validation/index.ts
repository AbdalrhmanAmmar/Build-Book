import { Ibooks } from "../Interfaces";

export const onValidation = (Books: Ibooks, imageBook: string |File | undefined) => {
  // Destructure Book object properties
  const {
    author = "",
    title = "",
    country = "",
    language = "",

    pages = "",

    year = "",
    description = "",
  } = Books;

  const imageLink = imageBook;

  // Initialize errors object
  const errors: Partial<Ibooks> = {};

  if (!author.trim() || author.length < 5 || author.length > 20) {
    errors.author = "Author must be between 5 and 20 characters!";
  }

  if (!title.trim() || title.length < 3 || title.length > 15) {
    errors.title = "Title must be between 3 and 15 characters!";
  }
  if (!description.trim() || description.length < 50) {
    errors.description = "description must be 50 characters ";
  }

  if (imageLink === undefined || (imageLink instanceof File)) {
    errors.imageLink = "Please Upload Image";
  }

  if (!country.trim() || country.length < 3 || country.length > 15) {
    errors.country = "Country must be between 3 and 15 characters";
  }

  if (!pages.trim() || isNaN(Number(pages.trim()))) {
    errors.pages = "Valid Page is Required";
  }
  if (!year.trim() || isNaN(Number(year.trim()))) {
    errors.year = "Valid year is Required";
  }
  if (!language.trim() || language.length < 3 || language.length > 15) {
    errors.language = "language must be between 3 and 15 characters";
  }
  // if (category) {
  //   errors.category = "You Should Use Category";
  //   console.log(errors.category);
  // }

  return errors;
};
