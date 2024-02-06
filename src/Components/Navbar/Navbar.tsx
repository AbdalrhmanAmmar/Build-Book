import { IoSearch } from "react-icons/io5";
import Input from "../UI_Shared/Input";
import { FaTrash } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

function Navbar() {
  return (
    <div className="flex items-center justify-around my-5 py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white rounded-md">
      <span>
        <FaTrash
          size={35}
          className="text-red-500 hover:text-red-600 cursor-pointer"
        />
      </span>
      <div className="w-[50%] relative">
        <Input Variant='Search' />

        <IoSearch size={30} className="absolute right-2 top-2.5 text-gray-400" />
      </div>
      <span>
        <MdDarkMode size={35} className="cursor-pointer" />
      </span>
    </div>
  );
}

export default Navbar;
