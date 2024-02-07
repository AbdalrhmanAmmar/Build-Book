import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../Lists/Utlites";
import { InputHTMLAttributes } from "react";

interface Iprops
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof InputVariant> {
  className?: string;
}

//bg-[#c2344d] hover:bg-red-800 w-full rounded-lg text-white px-3 py-3 duration-200 font-medium

const InputVariant = cva(["w-full rounded-md border-2 border-gray-400 py-1"], {
  variants: {
    Variant: {
      default: "Text-black",
      Search: "w-full border border-blue text-black",
    },
  },
  defaultVariants: {
    Variant: "default",
  },
});

function Input({ Variant, ...rest }: Iprops) {
  return <input className={cn(InputVariant({ Variant }))} {...rest} />;
}

export default Input;
