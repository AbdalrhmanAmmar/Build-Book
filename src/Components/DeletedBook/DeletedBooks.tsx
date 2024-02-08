import { Ibooks } from "../../Interfaces";
import Button from "../UI_Shared/Button";

interface Iprops {
  deletedBook: Ibooks;
  Retrieve_this_item: (id: string) => void;
}

function DeletedBooks({ deletedBook, Retrieve_this_item }: Iprops) {
  const { title, imageLink, id } = deletedBook;
  return (
    <div className="bg-red-500 w-full items-center container mx-auto ">
      <div className="">
        <h2 className="text-sm text-center font-bold my-2  max-fit">{title}</h2>
        {imageLink &&
          typeof imageLink === "string" && ( // Check if imageLink is a string
            <img
              className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-full sm:h-full md:rounded-none md:rounded-s-lg"
              src={imageLink}
              alt={title}
            />
          )}
      </div>
      <Button className="my-5" onClick={() => Retrieve_this_item(id)}>
        Retrieve this item
      </Button>
    </div>
  );
}

export default DeletedBooks;
