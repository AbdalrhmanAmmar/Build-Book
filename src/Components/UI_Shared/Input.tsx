import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../Lists/Utlites";

interface Iprops extends VariantProps<typeof InputVariant> {
  className?: string;
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

function Input({ Variant }: Iprops) {
  return <input className={cn(InputVariant({ Variant }))} />;
}

export default Input;
