import { Ibooks } from "../../Interfaces"

interface Iprops {
  categoryBook: Ibooks
  
}
function Category({ categoryBook }: Iprops) {
  const { category } = categoryBook;
  return <option className="bg-white text-black" value={category}>{category}</option>;
}

export default Category