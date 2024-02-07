import { ChangeEvent, FormEvent, useState } from "react";
import BookCard from "./Components/BookCard";
import Navbar from "./Components/Navbar/Navbar";
import { Formdata, RenderBookList } from "./data";
import Button from "./Components/UI_Shared/Button";
import Modal from "./Components/UI_Shared/Modal";
import Input from "./Components/UI_Shared/Input";
import Label from "./Components/UI_Shared/Label";
import { FaBook } from "react-icons/fa";
import Category from "./Components/UI_Shared/Category";
import { Ibooks } from "./Interfaces/index";
import { v4 as uuid } from "uuid";

function App() {
  //State
  const defaultProductObj = {
    id: "",
    author: "",
    country: "",
    imageLink: null,
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
  const [Bookcover, setBookcover] = useState<File | null>();

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
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function UploadImg(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setBookcover(file);
    }
  }

  function DeleteImg() {
    setBookcover(null);
  }
  // const RenderProduct = productList.map((products) => (
  //   <ProductCard key={products.id} product={products} />
  // ));
  //Render Date by Maping
  const RenderBookItems = ListBookItem.map((books) => (
    <BookCard key={books.id} books={books}  />
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

  // const remainingInputs = Formdata.slice(2, 4).map((input) => (
  //   <div className="flex flex-col my-2" key={input.id}>
  //     <label htmlFor="">{input.name}</label>
  //     <Input type="text" id={input.id} />
  //   </div>
  // ));
  // const LastInputs = Formdata.slice(4, 8).map((input) => (
  //   <div className="flex flex-col my-2" key={input.id}>
  //     <label htmlFor="">{input.name}</label>
  //     <Input type="text" id={input.id} />
  //   </div>
  // ));

  return (
    <>
      <Navbar />
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
        </div>
      </div>
    </>
  );
}

export default App;
