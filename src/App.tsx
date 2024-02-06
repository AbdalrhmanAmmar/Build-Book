import BookCard from "./Components/BookCard";
import Navbar from "./Components/Navbar/Navbar";
import { RenderBookList } from "./data";

function App() {
  // const RenderProduct = productList.map((products) => (
  //   <ProductCard key={products.id} product={products} />
  // ));

  const RenderBookItems = RenderBookList.map((books) => (
    <BookCard key={books.id} books={books} />
  ));
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-1 ">
          {RenderBookItems}
        </div>
      </div>
    </div>
  );
}

export default App;
