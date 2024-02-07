import { ChangeEvent, useState } from "react";
import BookCard from "./Components/BookCard";
import Navbar from "./Components/Navbar/Navbar";
import { Formdata, RenderBookList } from "./data";
import Button from "./Components/UI_Shared/Button";
import Modal from "./Components/UI_Shared/Modal";
import Input from "./Components/UI_Shared/Input";
import Label from "./Components/UI_Shared/Label";
import { FaBook } from "react-icons/fa";

function App() {
  //State
  const [isOpen, setIsOpen] = useState(false);
  const [Bookcover, setBookcover] = useState<File | null>(null);

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
  const RenderBookItems = RenderBookList.map((books) => (
    <BookCard key={books.id} books={books} />
  ));

  //RenderForms

  const firstTwoInputs = Formdata.slice(0, 2).map((input) => (
    <div className="flex flex-col my-2" key={input.id}>
      <label htmlFor="">{input.name}</label>
      <Input type="text" id={input.id} />
    </div>
  ));

  const remainingInputs = Formdata.slice(2, 4).map((input) => (
    <div className="flex flex-col my-2" key={input.id}>
      <label htmlFor="">{input.name}</label>
      <Input type="text" id={input.id} />
    </div>
  ));
  const LastInputs = Formdata.slice(4, 8).map((input) => (
    <div className="flex flex-col my-2" key={input.id}>
      <label htmlFor="">{input.name}</label>
      <Input type="text" id={input.id} />
    </div>
  ));

  // const RenderForm = Formdata.map((input) => {
  //   return (
  //     <div className="flex flex-col my-2">
  //       <label htmlFor="">{input.name}</label>
  //       <Input type="text" id="hello" />
  //     </div>
  //   );
  // });
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex justify-between my-4">
          <h2 className="flex-1">Filter</h2>
          <Button className="flex-1 w-[75%]" onClick={() => openModal()}>
            Add Book
          </Button>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-2   gap-4 ">
          {RenderBookItems}
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal}>
          <div className="flex gap-2 w-full justify-between">
            {firstTwoInputs}
          </div>

          {remainingInputs}
          <div className="flex justify-between gap-1">{LastInputs}</div>

          <div className="mt-2 flex  items-center  w-full ">
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
          </div>

          <Label>
            <span className="tetx">Upload Book Image</span>
            <Input className="sr-only" type="file" />
          </Label>
          <div className="mt-4 flex gap-3">
            <Button Color="Add">Add book</Button>
            <Button Color="Cancel">Cancel</Button>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;
