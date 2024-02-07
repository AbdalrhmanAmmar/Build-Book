import { useState } from "react";
import BookCard from "./Components/BookCard";
import Navbar from "./Components/Navbar/Navbar";
import { Formdata, RenderBookList } from "./data";
import Button from "./Components/UI_Shared/Button";
import Modal from "./Components/UI_Shared/Modal";

function App() {
  //State
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  // const RenderProduct = productList.map((products) => (
  //   <ProductCard key={products.id} product={products} />
  // ));
  //Render Date by Maping
  const RenderBookItems = RenderBookList.map((books) => (
    <BookCard key={books.id} books={books} />
  ));

  const RenderForm = Formdata.map((input) => {
   
    return (
      <div className="flex flex-col">
        <label htmlFor="">{input.name}</label>
        <input type="text" id="hello" />
      </div>
    );
  });
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
          {RenderForm}
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
