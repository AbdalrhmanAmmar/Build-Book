import { Ibooks } from "../../Interfaces";
import Button from "../UI_Shared/Button";

interface Iprops {
  deletedBook: Ibooks;
  Retrieve_this_item: (id: string) => void;
}

function DeletedBooks({ deletedBook, Retrieve_this_item }: Iprops) {
  const { title, imageLink, id } = deletedBook;
  return (
    <div className="flex flex-col p-3 ">
      <div className=" items-center bg-white border border-gray-200 rounded-lg shadow   hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 gap-3 ">
        <h2 className="text-sm text-center font-bold my-2  max-fit">{title}</h2>
        {imageLink && typeof imageLink === "string" && (
          <img
            className="object-cover w-full items-center rounded-t-lg h-96  md:rounded-none md:rounded-s-lg"
            src={imageLink}
            alt={title}
          />
        )}

        {imageLink && typeof imageLink !== "string" && (
          <img
            className="object-cover w-full items-center rounded-t-lg h-96  md:rounded-none md:rounded-s-lg"
            src={URL.createObjectURL(imageLink)}
            alt={title}
          />
        )}
      </div>
      <Button
        Color="RecoveryAll"
        className="my-5"
        onClick={() => Retrieve_this_item(id)}
      >
        Retrieve this item
      </Button>
    </div>
  );
}

export default DeletedBooks;
