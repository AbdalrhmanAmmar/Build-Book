import { IoSearch } from "react-icons/io5";
import Input from "../UI_Shared/Input";
import { FaTrash } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

function Navbar() {
  return (
    <nav className="  top-0 sticky ">
      <div className="flex items-center justify-around    py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white  rounded-md  w-full">
        
        <span>
          <FaTrash
            size={35}
            className="text-red-500 hover:text-red-600 cursor-pointer"
          />
        </span>
        <div className="w-[50%] relative  flex items-center">
          <Input Variant="Search" />
          <IoSearch
            size={25}
            className="absolute right-2 top-1.5 text-gray-400"
          />
        </div>

        <span>
          <MdDarkMode size={35} className="cursor-pointer" />
        </span>
        
      </div>
    </nav>
  );
}

export default Navbar;
