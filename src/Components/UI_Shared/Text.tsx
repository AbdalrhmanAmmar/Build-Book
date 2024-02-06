import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "../../Lists/Utlites";

interface Iprops extends VariantProps<typeof TextVariants> {
  children: ReactNode;
  className?: string;
  as: "h3" | "p" | "span";
}

const TextVariants = cva(["my-1"], {
  variants: {
    ColorText: {
      black: "Text-black",
      gray: "text-gray-500 ",
      indigo: "text-indigo-600",
    },
    Size: {
      lg: "text-lg font-semibold",
      sm: "text-sm  break-words",
      xs: "text-xs font-semibold",
    },
  },
  defaultVariants: {
    ColorText: "black",
    Size: "lg",
  },
});

function Text({ children, ColorText, Size, as: Components }: Iprops) {
  return (
    <Components className={cn(TextVariants({ ColorText, Size }))}>
      {children}
    </Components>
  );
}

export default Text;
