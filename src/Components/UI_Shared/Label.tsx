import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../Lists/Utlites";
import { LabelHTMLAttributes, ReactNode } from "react";

interface Iprops
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof InputVariant> {
  className?: string;
  children: ReactNode;
}

//bg-[#c2344d] hover:bg-red-800 w-full rounded-lg text-white px-3 py-3 duration-200 font-medium

const InputVariant = cva(
  ["w-full rounded-lg text-white px-3 py-3 duration-200 font-medium"],
  {
    variants: {
      Variant: {
        default: "Text-black",
        Search: "w-full border border-blue text-black",
      },
    },
    defaultVariants: {
      Variant: "default",
    },
  }
);

function Label({ Variant, children, ...rest }: Iprops) {
  return (
    <label className={cn(InputVariant({ Variant }))} {...rest}>
      {children}
    </label>
  );
}

export default Label;
