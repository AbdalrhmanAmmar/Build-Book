import { IoSearch } from "react-icons/io5";
import Input from "../UI_Shared/Input";
import { FaTrash } from "react-icons/fa";
import { MdDarkMode } from "react-icons/md";

interface Iprops {
  DeleteCounter: number;
  openDeletedModal:()=>void;
}

function Navbar({ DeleteCounter, openDeletedModal }: Iprops) {
  return (
    <nav className="  top-0 sticky ">
      <div className="flex items-center justify-around    py-3 bg-gradient-to-r from-blue-400 to-purple-600 text-white  rounded-md  w-full">
        {DeleteCounter === 0 ? (
          <span>
            <FaTrash
              size={35}
              className="text-red-500 hover:text-red-600 cursor-pointer"
            />
          </span>
        ) : (
          <span className="relative">
            <span className="absolute w-5 h-5 rounded-full bg-yellow-500 top-0 right-0 flex items-center justify-center text-black font-bold text-xs ">
              {DeleteCounter}
            </span>
            <button onClick={openDeletedModal}>
              <FaTrash
                size={45}
                className="text-red-500 hover:text-red-600 cursor-pointer"
              />
            </button>
          </span>
        )}

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
