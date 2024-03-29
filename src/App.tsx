import { ChangeEvent, FormEvent, ReactNode, useState } from "react";
import BookCard from "./Components/BookCard/BookCard";
import Navbar from "./Components/Navbar/Navbar";
import { Formdata, RenderBookList } from "./data";
import Button from "./Components/UI_Shared/Button";
import Modal from "./Components/Modal/Modal";
import Input from "./Components/UI_Shared/Input";
import Category from "./Components/UI_Shared/Category";
import { Ibooks } from "./Interfaces/index";
import { v4 as uuid } from "uuid";
import DeletedItemModal from "./Components/Modal/DeletedItemModal";
import DeletedBooks from "./Components/DeletedBook/DeletedBooks";
import OndeleteConfirm from "./Components/Modal/OndeleteConfirm";
import MoreInfodata from "./Components/Modal/MoreInfodata";
import MoreInfoData from "./Components/MoreInfo/MoreInfo";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { onValidation } from "./Validation";
import { TbookName } from "./types";
import ShowError from "./Components/ShowError/ShowError";
import toast, { Toaster } from "react-hot-toast";
import { Howl } from "howler";

function App() {
  //State
  const defaultProductObj = {
    id: "",
    author: "",
    country: "",
    imageLink: "",
    language: "",
    link: "",
    pages: "",
    title: "",
    year: "",
    description: "",
    category: "",
  };
  const [Book, setBook] = useState<Ibooks>(defaultProductObj);
  const [ListBookItem, setListBookItem] = useState<Ibooks[]>(RenderBookList);
  const [isOpen, setIsOpen] = useState(false);
  const [isdeletedItemopen, setIsdeletedItemopen] = useState(false);
  const [ConfirmdeleteItem, setConfirmdeleteItem] = useState(false);
  const [MoreInfo, setMoreInfo] = useState(false);
  const [Bookcover, setBookcover] = useState<File | undefined>();
  const [DeleteCounter, setDeleteCounter] = useState<number>(0);
  const [FaTrashItem, setFaTrashItem] = useState<Ibooks[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [idfordelete, setidfordelete] = useState<string>("");
  const [GetIndex, setGetIndex] = useState<number>(0);
  const [Pagination, setPagination] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [SaveError, setSaveError] =
    useState<Partial<Ibooks>>(defaultProductObj);
  const [BookToedit, setBookToedit] = useState<Ibooks>(defaultProductObj);
  const [BookToeditIndex, setBookToeditIndex] = useState<number>(0);
  const [isOpenEditModel, setisOpenEditModel] = useState(false);
  const [BookcoverURL, setBookcoverURL] = useState<string | undefined>(
    undefined
  );

  const onAddsound = new Howl({
    src: ["Add.mp3"], // Path to your sound file
    volume: 0.2,
  });
  const onEditsound = new Howl({
    src: ["Edit.mp3"], // Path to your sound file
    volume: 0.2,
  });
  const ondelete = new Howl({
    src: ["delete.mp3"], // Path to your sound file
    volume: 0.5,
  });

  //Function

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook({ ...Book, [name]: value });

    setSaveError({ ...SaveError, [name]: "" });
  };
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookToedit({ ...BookToedit, [name]: value });
    setSaveError({ ...SaveError, [name]: "" });
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = onValidation(Book as Ibooks, Bookcover);
    setSaveError(errors);
    console.log(SaveError);

    const hasErrorMsg = Object.values(errors).some(
      (value) => value === value && "Please Upload Image"
    );
    if (hasErrorMsg) {
      setSaveError(errors);
      return;
    }

    const newBook: Ibooks = {
      ...Book,
      id: uuid(),
      imageLink: Bookcover,
      category: selectedCategory,
    };

    if (Bookcover instanceof File) {
      newBook.imageLink = URL.createObjectURL(Bookcover);
    }

    setListBookItem((prev) => [newBook, ...prev]);
    setBook(defaultProductObj);
    setBookcover(undefined); // Reset Bookcover after submission
    setSelectedCategory("Fiction");
    closeModal();
    toast.success("Successfully Added!", {
      duration: 3000,
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    onAddsound.play();
  };
  const onSubmitEditHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = onValidation(BookToedit as Ibooks, BookcoverURL);
    setSaveError(errors);

    const hasErrorMsg = Object.values(errors).some(
      (value) => value === value && "Please Upload Image"
    );
    console.log(BookToedit);
    console.log(Bookcover);
    console.log(BookToedit.imageLink);
    if (hasErrorMsg) {
      setSaveError(errors);
      console.log(errors);
      console.log(hasErrorMsg);
      return;
    }

    const updatedBooks = [...ListBookItem];
    updatedBooks[BookToeditIndex] = {
      ...BookToedit,
      imageLink: BookcoverURL,
    };

    setListBookItem(updatedBooks);
    setBookToedit(defaultProductObj);
    closeModal();
    toast.success("Successfully edited!", {
      duration: 3000,
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    onEditsound.play();
  };

  const onDeleteHandler = (id: string) => {
    const filteredBook = ListBookItem.filter((book) => book.id !== id);
    setListBookItem(filteredBook);
    setDeleteCounter((prevCounter) => prevCounter + 1);
    ShowdeletedItem(id);
    closeModal();
    toast.success("Successfully deleted!", {
      duration: 3000,
      style: { borderRadius: "10px", background: "#333", color: "#fff" },
    });
    ondelete.play();
  };
  const ShowdeletedItem = (id: string) => {
    const filteredBook = ListBookItem.filter((book) => book.id === id);
    setFaTrashItem((prev) => prev.concat(filteredBook));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!value) {
      setSelectedCategory("Fiction");
    } else {
      setSelectedCategory(value);
    }

    setBookToedit({ ...BookToedit, category: value });
  };

  const Recover_deleted_books = () => {
    setDeleteCounter(0);
    setListBookItem((prev) => [...FaTrashItem, ...prev]);
    setFaTrashItem([]);
        toast.success("Successfully Recover All Item!", {
          duration: 3000,
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
    onAddsound.play()
  };
  const Retrieve_this_item = (id: string) => {
    const FilterFaTrashItem = FaTrashItem.filter((item) => item.id !== id);
    const FilterFaTrashItemBack = FaTrashItem.filter((item) => item.id === id);
    setFaTrashItem(FilterFaTrashItem);
    setListBookItem((prev) => [...FilterFaTrashItemBack, ...prev]);
    setDeleteCounter((prevCounter) => prevCounter - 1);

 toast.success(`Successfully Recover`, {
   duration: 3000,
   style: { borderRadius: "10px", background: "#333", color: "#fff" },
 });
 onAddsound.play();

  };

  const nextBookItem = () => {
    if (GetIndex >= ListBookItem.length - 1) {
      return;
    } else setGetIndex((previous) => previous + 1);
  };
  const PreviousBookItem = () => {
    if (GetIndex === 0) {
      setGetIndex(0);
    } else setGetIndex((previous) => previous - 1);
  };

  const onSearchsubmit = (query: string) => {
    if (query === "") {
      setListBookItem(RenderBookList);
    } else {
      const filterbysearch = RenderBookList.filter((bookItem) =>
        bookItem.title.toLowerCase().includes(query.toLowerCase())
      );

      setListBookItem(filterbysearch);
    }
  };

  const onFilterchange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (value === "All") {
      setListBookItem(RenderBookList); // Reset to the original list if "All" is selected
    } else {
      const filterbycategory = RenderBookList.filter((BookCategory) =>
        BookCategory.category.toLowerCase().includes(value.toLowerCase())
      );
      setListBookItem(filterbycategory);
    }
  };

  const onMoreInfo = (index: number) => {
    OpenMoreInfo();
    setGetIndex(index);
  };

  function closeModal() {
    setIsOpen(false);
    setIsdeletedItemopen(false);
    setConfirmdeleteItem(false);
    setMoreInfo(false);
    console.log("first");
    setBookToedit(defaultProductObj);
    setisOpenEditModel(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function openEditModal() {
    setisOpenEditModel(true);
  }
  function openDeletedModal() {
    setIsdeletedItemopen(true);
  }
  function OpenConfirmdeleteItem(id: string) {
    setConfirmdeleteItem(true);
    setidfordelete(id);
  }

  function OpenMoreInfo() {
    setMoreInfo(true);
  }

  function UploadImg(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setBookcover(file);
      setBookToedit({ ...BookToedit, imageLink: file });

      // Set the BookcoverURL state with the URL of the selected image file
      const imageURL = URL.createObjectURL(file);
      setBookcoverURL(imageURL);
    } else if (typeof BookToedit.imageLink === "string") {
      // If editing and there's an initial value for imageLink, use it
      setBookcoverURL(BookToedit.imageLink);
    } else {
      // If no file is selected and no initial value for imageLink, reset the BookcoverURL state
      setBookcoverURL("");
    }
  }

  function DeleteImg() {
    setBookcover(undefined);
    setBookcoverURL(undefined);
  }

  const NextPagination = Pagination + 8;
  const RenderBookItems = ListBookItem.slice(Pagination, NextPagination).map(
    (books, index) => (
      <>
        <BookCard
          setSaveError={setSaveError}
          setBookcoverURL={setBookcoverURL}
          setBookToeditIndex={setBookToeditIndex}
          openEditModal={openEditModal}
          setBookToedit={setBookToedit}
          key={books.id}
          books={books}
          OpenConfirmdeleteItem={OpenConfirmdeleteItem}
          onMoreInfo={onMoreInfo}
          index={index}
        />
      </>
    )
  );

  const previousPaginations = () => {
    if (Pagination === 0) {
      return; // Already at the first page
    }
    setPagination((previous) => previous - 1);
  };

  const nextPaginations = () => {
    const numPages = Math.ceil(ListBookItem.length / 8);
    if (Pagination >= numPages - 1) {
      return; // Already at the last page
    }
    setPagination((previous) => previous + 1);
  };

  const handleClick = (i: number) => {
    setPagination(i); // Set the pagination to the clicked page
  };

  const PaginationItem = [];
  const numPages = Math.ceil(ListBookItem.length / 8); // Calculate the number of pages

  for (let i = 0; i < numPages; i++) {
    PaginationItem.push(
      <button
        className={`py-3 px-3 rounded-md font-bold cursor-pointer ${
          Pagination === i ? "bg-blue-900 text-white" : "bg-blue-200 text-black"
        }`}
        key={i}
        onClick={() => handleClick(i)}
      >
        <div className="  rounded-md text-white font-bold" key={i}>
          {/* Display the page number */}
          {i + 1}
        </div>
      </button>
    );
  }

  let RenderMoreInfo;

  if (typeof GetIndex !== "undefined") {
    const newGetIndex = GetIndex + 1;
    RenderMoreInfo = ListBookItem.slice(GetIndex, newGetIndex).map(
      (bookInfo) => (
        <MoreInfoData
          nextBookItem={nextBookItem}
          PreviousBookItem={PreviousBookItem}
          key={bookInfo.id}
          bookInfo={bookInfo}
        />
      )
    );
  }

  //RenderForms
  const CategoryFilter = RenderBookList.map((categoryBook) => (
    <Category key={categoryBook.id} categoryBook={categoryBook} />
  ));
  const RenderError = (name: TbookName) => {
    return <ShowError SaveError={SaveError[name]} />;
  };

  const errorArray: ReactNode[] = [];

  const firstTwoInputs = Formdata.slice(0, 8).map((input) => {
    const formError = RenderError(input.name);
    errorArray.push(formError);

    return (
      <div key={input.id}>
        {input.name === "link" ? (
          <>
            <label className="flex gap-2" htmlFor="">
              Link of Book
              <span className="text-red-500 font-bold">(Optional)</span>
            </label>
          </>
        ) : (
          <>
            <div></div>

            <label className="block">{input.name}</label>
          </>
        )}

        <Input
          type={input.type}
          name={input.name}
          value={Book[input.name]}
          id={input.id}
          onChange={onChangeHandler}
        />
      </div>
    );
  });

  const renderBookToedit = (id: string, label: string, name: TbookName) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id}>{label}</label>
        <Input
          type="text"
          name={name}
          id={id}
          value={BookToedit[name]}
          onChange={onChangeEditHandler}
        />
      </div>
    );
  };

  const ImgLink = (
    <div className="">
      {!Bookcover ? (
        <label className="flex flex-cols items-center gap-3">
          Upload Your Img
          <input
            type="file"
            id="imageLink" // Assuming "imageLink" is the correct property name in the Book object
            onChange={UploadImg}
            accept=".jpg,.png,.jpeg"
            className="sr-only"
          />
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 py-2 px-3 rounded-md text-white block">
              Choose Img
            </span>
          </div>
          <ShowError SaveError={SaveError.imageLink} />
        </label>
      ) : (
        <div className="flex flex-rows items-center gap-3">
          <img
            src={URL.createObjectURL(Bookcover)}
            alt="Uploaded Cover"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
          <Button Color="red" onClick={DeleteImg}>
            Delete Image
          </Button>
        </div>
      )}
    </div>
  );

  const ImgLinkToedit = (
    <div className="">
      {!BookcoverURL ? (
        <label className="flex flex-cols items-center gap-3">
          Upload Your Img
          <input
            type="file"
            id="imageLink"
            onChange={UploadImg}
            accept=".jpg,.png,.jpeg"
            className="sr-only"
          />
          <div className="flex flex-col items-center">
            <span className="bg-blue-600 py-2 px-3 rounded-md text-white block">
              Choose Img
            </span>
          </div>
          <ShowError SaveError={SaveError.imageLink} />
        </label>
      ) : (
        <div className="flex flex-rows items-center gap-3">
          <img
            src={BookcoverURL}
            alt="Uploaded Cover"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />

          <label className="flex flex-cols items-center gap-3">
            <input
              type="file"
              id="imageLink"
              onChange={UploadImg}
              accept=".jpg,.png,.jpeg"
              className="sr-only"
            />
            <div className="flex flex-col items-center">
              <span className="bg-blue-600 py-2 px-3 rounded-md text-white block">
                Edit
              </span>
            </div>
          </label>
        </div>
      )}
    </div>
  );

  const deletedBookmark = FaTrashItem.map((deletedBook) => (
    <DeletedBooks
      key={deletedBook.id}
      deletedBook={deletedBook}
      Retrieve_this_item={Retrieve_this_item}
    />
  ));

  return (
    <>
      <Navbar
        DeleteCounter={DeleteCounter}
        openDeletedModal={openDeletedModal}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        onSearchsubmit={onSearchsubmit}
      />
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="w-[100%]">
        <div className="container mx-auto ">
          <div className="flex justify-between my-4 items-center gap-4 md:w-full ">
            <div className="py-2 px-3 bg-black rounded-md flex-1 text-center ">
              <label htmlFor="" className="flex justify-between">
                <span className="text-white font-semibold flex-1 w-[25%] ">
                  category:{" "}
                </span>
                <select
                  onChange={onFilterchange}
                  className="rounded-md text-black bg-indigo-300 border-none outline-none w-[60%]"
                  name=""
                  id=""
                >
                  <option value="All">All</option>
                  {CategoryFilter}
                </select>
              </label>
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

          <div className="flex justify-center items-center gap-4">
            <button onClick={previousPaginations}>
              <FaArrowAltCircleLeft size={35} />
            </button>

            <div className="flex justify-center gap-3 my-5">
              {PaginationItem}
            </div>
            <button onClick={nextPaginations}>
              <FaArrowAltCircleRight size={35} />
            </button>
          </div>

          {/* Add Module */}

          <Modal title="Add Product" isOpen={isOpen} closeModal={closeModal}>
            {/* <div className="flex gap-2 w-full justify-between">
              {firstTwoInputs}
            </div> */}

            <form onSubmit={onSubmitHandler}>
              {Object.values(SaveError).every(
                (error) => error === ""
              ) ? null : (
                <div className="flex flex-col justify-between">
                  {errorArray}
                </div>
              )}

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

              <div className="flex  gap-4 my-2 items-center">{ImgLink}</div>
              {/* <div>{firstTwoInputs[8]}</div> */}
              <div className="py-2 px-3 bg-gradient-to-br from-blue-500 to-blue-300 rounded-md flex-1 text-center text-white ">
                <label htmlFor="" className="flex gap-1  items-center ">
                  <span className="text-black font-semibold flex-1 w-[30%] ">
                    category:{" "}
                  </span>
                  <select
                    onChange={handleCategoryChange}
                    value={BookToedit.category}
                    className="font-medium rounded-md text-black bg-blue-100 border-none outline-none w-[80%] py-1.5"
                    name="category"
                    id=""
                  >
                    <option value="">Choose</option>
                    {CategoryFilter}
                  </select>
                </label>
              </div>

              <div className="mt-4 flex gap-3">
                <Button Color="Add">Add book</Button>
                <Button
                  type="button"
                  onClick={() => closeModal()}
                  Color="Cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>

          {/* Edit Module */}
          <Modal
            title="Edit Book Data"
            isOpen={isOpenEditModel}
            closeModal={closeModal}
          >
            {/* <div className="flex gap-2 w-full justify-between">
              {firstTwoInputs}
            </div> */}
            <form onSubmit={onSubmitEditHandler}>
              {Object.values(SaveError).every(
                (error) => error === ""
              ) ? null : (
                <div className="flex flex-col justify-between">
                  {errorArray}
                </div>
              )}

              <div className="flex gap-2 justify-between">
                {renderBookToedit("Title", "Title", "title")}
                {renderBookToedit("Author", "Author", "author")}
              </div>
              <div className="flex flex-col gap-2">
                {renderBookToedit("Link", "Link", "link")}
              </div>
              <div className="flex flex-col gap-2">
                {renderBookToedit("Description", "Description", "description")}
              </div>
              <div className="flex flex-row gap-2">
                {renderBookToedit("Country", "Country", "country")}
                {renderBookToedit("Pages", "Pages", "pages")}
                {renderBookToedit("Year", "Year", "year")}
                {renderBookToedit("Language", "Language", "language")}
              </div>

              <div className="flex  gap-4 my-2 items-center">
                {ImgLinkToedit}
              </div>

              <div className="py-2 px-3 bg-gradient-to-br from-blue-500 to-blue-300 rounded-md flex-1 text-center text-white ">
                <label htmlFor="" className="flex gap-1  items-center ">
                  <span className="text-black font-semibold flex-1 w-[30%] ">
                    category:{" "}
                  </span>
                  <select
                    onChange={handleCategoryChange}
                    value={BookToedit.category}
                    className="font-medium rounded-md text-black bg-blue-100 border-none outline-none w-[80%] py-1.5"
                    name=""
                    id=""
                  >
                    {CategoryFilter}
                  </select>
                </label>
              </div>

              <div className="mt-4 flex gap-3">
                <Button type="submit" Color="indigo">
                  Edit
                </Button>
                <Button
                  type="button"
                  onClick={() => closeModal()}
                  Color="Cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Modal>

          <DeletedItemModal
            isdeletedItemopen={isdeletedItemopen}
            closeModal={closeModal}
          >
            <div className="flex flex-col justify-between">
              {deletedBookmark.length === 0 ? (
                <h3 className="text-center text-2xl font-semibold bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-900 inline-block text-transparent bg-clip-text">
                  There Is no item
                </h3>
              ) : (
                <>
                  <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-3 my-3 sm:grid-cols-1 ">
                    {deletedBookmark}
                  </div>
                  <Button
                    Color="RecoveryItem"
                    onClick={() => Recover_deleted_books()}
                    className="w-[60%] justify-center m-auto"
                  >
                    Recover deleted books
                  </Button>
                </>
              )}
            </div>
          </DeletedItemModal>
          <OndeleteConfirm
            ConfirmdeleteItem={ConfirmdeleteItem}
            closeModal={closeModal}
          >
            <div className="flex gap-3">
              <Button onClick={closeModal} Color="indigo">
                Cancel
              </Button>
              <Button
                Color="RecoveryItem"
                onClick={() => {
                  onDeleteHandler(idfordelete);
                }}
              >
                Delete
              </Button>
            </div>
          </OndeleteConfirm>
          <MoreInfodata MoreInfo={MoreInfo} closeModal={closeModal}>
            {RenderMoreInfo}
          </MoreInfodata>
        </div>
      </div>
    </>
  );
}

export default App;
