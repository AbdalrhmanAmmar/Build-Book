import { Ibooks } from "../Interfaces";
import { descrpSlicer } from "../Lists";
import Button from "./UI_Shared/Button";
import Img from "./UI_Shared/Img";

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
  return (
    <>
      <div className=" w-full h-full ">
        <div className="p-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 gap-3 h-full ">
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
            src={imageLink}
            alt={title}
          />

          <div className="flex flex-col items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {descrpSlicer(description)}
            </p>
            <h2 className="justify-start items-start me-auto">Written by</h2>
            <h2 className="justify-start items-start me-auto">published</h2>
            <h2 className="justify-start items-start me-auto">Written by</h2>
            <h2 className="justify-start items-start me-auto ">
              Category:
              <span className="bg-blue-300 rounded-md px-4 py-1">
                #{category}
              </span>
            </h2>
            <div className="flex my-3 w-full gap-1">
              <Button Color="more" className="">
                More Info
              </Button>
              <Button className="">Edit</Button>
              <Button Color="red">Delete</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
