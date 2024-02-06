import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "../../Lists/Utlites";

interface Iprops extends VariantProps<typeof TextVariants> {
  children: ReactNode;
  className?: string;
}

//bg-[#c2344d] hover:bg-red-800 w-full rounded-lg text-white px-3 py-3 duration-200 font-medium

const TextVariants = cva([" font-medium p-2 rounded-md "], {
  variants: {
    Color: {
      red: "bg-[#c2344d] hover:bg-red-800",
      indigo: "bg-indigo-700 hover:bg-indigo-800",
    },
  },
  defaultVariants: {
    Color: "indigo",
  },
});

function Button({ children, Color }: Iprops) {
  return <button className={cn(TextVariants({ Color }))}>{children}</button>;
}

export default Button;
