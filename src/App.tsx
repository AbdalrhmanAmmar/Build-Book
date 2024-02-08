import { ChangeEvent, FormEvent, useState } from "react";
import BookCard from "./Components/BookCard";
import Navbar from "./Components/Navbar/Navbar";
import { Formdata, RenderBookList } from "./data";
import Button from "./Components/UI_Shared/Button";
import Modal from "./Components/UI_Shared/Modal";
import Input from "./Components/UI_Shared/Input";
import Label from "./Components/UI_Shared/Label";
import Category from "./Components/UI_Shared/Category";
import { Ibooks } from "./Interfaces/index";
import { v4 as uuid } from "uuid";
import toast, { Toaster } from "react-hot-toast";
import DeletedItemModal from "./Components/UI_Shared/DeletedItemModal";
import DeletedBooks from "./Components/DeletedBook/deletedBooks";

function App() {
  //State
  const defaultProductObj = {
    id: "",
    author: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: 0,
    title: "",
    year: 0,
    description: "",
    category: "",
  };
  const [Book, setBook] = useState<Ibooks>(defaultProductObj);
  const [ListBookItem, setListBookItem] = useState<Ibooks[]>(RenderBookList);
  const [isOpen, setIsOpen] = useState(false);
  const [isdeletedItemopen, setIsdeletedItemopen] = useState(false);
  const [Bookcover, setBookcover] = useState<File | undefined>();
  const [DeleteCounter, setDeleteCounter] = useState<number>(0);
  const [FaTrashItem, setFaTrashItem] = useState<Ibooks[]>([]);

  //Function
  console.log(Book);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...Book, [name]: value });
    console.log(Book);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setListBookItem((prev) => [
      { ...Book, id: uuid(), imageLink: Bookcover },
      ...prev,
    ]);
    setBook(defaultProductObj);
    closeModal();
    console.log(Book);

    toast.success("Successfully toasted!");
  };

  const onDeleteHandler = (id: string) => {
    const filteredBook = ListBookItem.filter((book) => book.id !== id);
    setListBookItem(filteredBook);
    setDeleteCounter((prevCounter) => prevCounter + 1);
    ShowdeletedItem(id);
  };

  const ShowdeletedItem = (id: string) => {
    const filteredBook = ListBookItem.filter((book) => book.id === id);
    setFaTrashItem((prev) => prev.concat(filteredBook));
  };

  const Recover_deleted_books = () => {
    setDeleteCounter(0);
    setListBookItem((prev) => [...FaTrashItem, ...prev]);
    setFaTrashItem([]);
  };

  const Retrieve_this_item = (id: string) => {
    const FilterFaTrashItem = FaTrashItem.filter((item) => item.id !== id);
    const FilterFaTrashItemBack = FaTrashItem.filter((item) => item.id === id);
    setFaTrashItem(FilterFaTrashItem);
    setListBookItem((prev) => [...FilterFaTrashItemBack, ...prev]);
    setDeleteCounter((prevCounter) => prevCounter - 1);
  };

  function closeModal() {
    setIsOpen(false);
    setIsdeletedItemopen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function openDeletedModal() {
    setIsdeletedItemopen(true);
  }

  function UploadImg(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setBookcover(file);
    }
  }

  function DeleteImg() {
    setBookcover(undefined);
  }
  // const RenderProduct = productList.map((products) => (
  //   <ProductCard key={products.id} product={products} />
  // ));
  //Render Date by Maping
  const RenderBookItems = ListBookItem.map((books) => (
    <BookCard key={books.id} books={books} onDeleteHandler={onDeleteHandler} />
  ));

  //RenderForms

  const firstTwoInputs = Formdata.map((input) => (
    <div key={input.id}>
      <label htmlFor={input.id}>{input.name}</label>
      {input.type === "file" ? ( // Check if input type is file
        <div>
          <input
            type="file"
            id={input.id}
            onChange={UploadImg}
            accept=".jpg,.png,.jpeg"
          />
          {Bookcover && (
            <div>
              <img
                src={URL.createObjectURL(Bookcover)}
                alt="Uploaded Cover"
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
              <button onClick={DeleteImg}>Delete Image</button>
            </div>
          )}
        </div>
      ) : (
        <Input
          type={input.type}
          name={input.name}
          value={Book[input.name]}
          id={input.id}
          onChange={onChangeHandler}
        />
      )}
    </div>
  ));

  const deletedBookmark = FaTrashItem.map((deletedBook) => (
    <DeletedBooks
      key={deletedBook.id}
      deletedBook={deletedBook}
      Retrieve_this_item={Retrieve_this_item}
    />
  ));

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar
        DeleteCounter={DeleteCounter}
        openDeletedModal={openDeletedModal}
      />

      <div className="w-[100%]">
        <div className="container mx-auto ">
          <div className="flex justify-between my-4 items-center gap-4 md:w-full ">
            <div className="py-2 px-3 bg-gray-900 text-white rounded-md gap flex-1 text-center">
              <Category />
            </div>

            <Button
              className="flex-1 w-[75%] h-full"
              onClick={() => openModal()}
            >
              Add Book
            </Button>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-2   gap-4 ">
            {RenderBookItems}
          </div>
          <Modal isOpen={isOpen} closeModal={closeModal}>
            {/* <div className="flex gap-2 w-full justify-between">
              {firstTwoInputs}
            </div> */}
            <form onSubmit={onSubmitHandler}>
              <div className="flex gap-2 justify-between">
                {firstTwoInputs[0]}
                {firstTwoInputs[1]}
              </div>
              <div className="flex flex-col gap-2">
                {firstTwoInputs.slice(2, 4)}
              </div>
              <div className="flex flex-row gap-2">
                {firstTwoInputs.slice(4, 8)}
              </div>
              <div className="flex flex-row gap-2">
                {firstTwoInputs.slice(9)}
              </div>

              {/* {remainingInputs}
            <div className="flex justify-between gap-1">{LastInputs}</div> */}

              {/* <div className="mt-2 flex  items-center  w-full ">
                <span className="block h-80 w-80 rounded-md  items-center">
                  {Bookcover ? (
                    <img
                      src={URL.createObjectURL(Bookcover)}
                      alt="Avatar"
                      className="h-full w-full rounded-md object-cover"
                    />
                  ) : (
                    <span className="items-center">
                      <FaBook className="h-full w-full rounded-md object-cover text-gray-700" />
                    </span>
                  )}
                </span>
                <Label htmlFor="File-input">
                  {!Bookcover ? (
                    <span className="text-black bg-blue-300 py-4 px-4 rounded-md">
                      Upload a File
                    </span>
                  ) : (
                    <Button
                      onClick={DeleteImg}
                      className="text-black bg-red-500 py-4 px-4 rounded-md"
                    >
                      Delete Image
                    </Button>
                  )}

                  <Input
                    type="file"
                    name="Avatar"
                    id="File-input"
                    accept=".jpg,.png,.jpeg"
                    onChange={UploadImg}
                    className="sr-only"
                  />
                </Label>
              </div> */}

              <Label>
                <span className="tetx">Upload Book Image</span>
                <Input className="sr-only" type="file" />
              </Label>
              <div className="mt-4 flex gap-3">
                <Button Color="Add">Add book</Button>
                <Button Color="Cancel">Cancel</Button>
              </div>
            </form>
          </Modal>
          <DeletedItemModal
            isdeletedItemopen={isdeletedItemopen}
            closeModal={closeModal}
          >
            <div className="flex flex-col justify-between">
              <div className="grid grid-cols-4 gap-3 my-3 ">
                {deletedBookmark}
              </div>
              <Button
                Color='red'
                onClick={() => Recover_deleted_books()}
                className="w-[60%] justify-center m-auto"
              >
                Recover deleted books
              </Button>
            </div>
          </DeletedItemModal>
        </div>
      </div>
    </>
  );
}

export default App;
