import { cva, type VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../Lists/Utlites";

interface Iprops
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof TextVariants> {
  children: ReactNode;
  className?: string;
}

//bg-[#c2344d] hover:bg-red-800 w-full rounded-lg text-white px-3 py-3 duration-200 font-medium

const TextVariants = cva(["w-full py-2 rounded-md font-medium text-white"], {
  variants: {
    Color: {
      Close:
        "text-red-500 w-fit py-0 hover:bg-red-500   hover:text-white  rounded-full",
      red: "bg-gradient-to-r from-red-500  to-red-800",
      indigo: "bg-gradient-to-r from-cyan-500 to-blue-500",
      more: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      Cancel: "bg-gradient-to-r from-red-500 to-yellow-500 hover:bg-red-800 ",
      Add: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500",
      RecoveryItem:
        "bg-gradient-to-r from-gray-700 via-gray-900 to-gray-700 hover:from-gray-blue hover:via-gray-700 hover:to-gray-800 text-white py-3 px-6  transition duration-500 ease-in-out transform hover:translate-x-1 rounded-md shadow-lg",
      RecoveryAll:
        "bg-gradient-to-r from-blue-600 to-indigo-900 py-4 font-bold tracking-widest hover:bg-gradient-to-r hover:from-indigo-900 hover:to-blue-600 transition duration-500 ease-in-out",
    },
  },
  defaultVariants: {
    Color: "indigo",
  },
});

function Button({ children, Color, className, ...rest }: Iprops) {
  return (
    <button className={cn(TextVariants({ Color }), className)} {...rest}>
      {children}
    </button>
  );
}

export default Button;
