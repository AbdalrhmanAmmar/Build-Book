import { Ibooks } from "../../Interfaces";
import { descrpSlicer } from "../../Lists";
import Button from "../UI_Shared/Button";

interface Iprops {
  books: Ibooks;
  onMoreInfo: (index: number) => void;
  OpenConfirmdeleteItem: (id: string) => void;
  index: number;
}
function BookCard({ books, OpenConfirmdeleteItem, index, onMoreInfo }: Iprops) {
  const {
    id,
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

  const words = category
    .split(", ")
    .map((word) => (
      <span className="bg-blue-300 rounded-md px-3 py-1 ">{word}</span>
    ));

  return (
    <>
      <div className=" w-full h-full ">
        <div className="p-2 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 gap-3 md:h-full ">
          {imageLink && typeof imageLink === "string" && (
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-full sm:h-full md:rounded-none md:rounded-s-lg"
              src={imageLink}
              alt={title}
            />
          )}

          {imageLink && typeof imageLink !== "string" && (
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-full sm:h-full md:rounded-none md:rounded-s-lg"
              src={URL.createObjectURL(imageLink)}
              alt={title}
            />
          )}

          <div className="flex flex-col items-start sm:h-full md:justify-between">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a className=" text-blue-800" href={link}>
                {title}
              </a>
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {descrpSlicer(description)}
            </p>
            <h2 className="justify-start items-start me-auto">
              Written by: <span className="font-semibold">{author}</span>
            </h2>
            <h2 className="justify-start items-start me-auto">
              published in: <span className="font-bold"> {year}</span>
            </h2>
            <div className="flex justify-between w-full my-2">
              <h3>Language: {language}</h3>
              <h3>Country: {country}</h3>
              <h3>Pages: {pages}</h3>
            </div>
            <h2 className="justify-start items-center me-auto flex flex-row gap-1  ">
              Category:
              <div className=" flex gap-1 ">
                {words}
              </div>
            </h2>
            <div className="flex my-3 w-full gap-1">
              <Button
                onClick={() => onMoreInfo(index)}
                Color="more"
                className=""
              >
                More Info
              </Button>
              <Button className="">Edit</Button>
              <Button Color="red" onClick={() => OpenConfirmdeleteItem(id??"")}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookCard;
