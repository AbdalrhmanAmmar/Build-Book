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
      red: "bg-gradient-to-r from-red-500  to-red-800",
      indigo: "bg-gradient-to-r from-cyan-500 to-blue-500",
      more: "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
      Cancel: "bg-gradient-to-r from-red-500 to-yellow-500 hover:bg-red-800 ",
      Add: "bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500",
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
