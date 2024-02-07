import { cva, type VariantProps } from "class-variance-authority";
import notFound from "/Image_notfoud.png";
import { cn } from "../../Lists/Utlites";

interface Iprops extends VariantProps<typeof ImageVariants> {
  src?: string | typeof notFound;
  alt: string;
}

const ImageVariants = cva(["w-fill my-2 Object-cover"], {
  variants: {
    size: {
      default: "rounded-md h-52",
      sm: "w-10 h-10 rounded-full ",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function Img({ src = notFound, alt, size }: Iprops) {
  return <img className={cn(ImageVariants({ size }))} src={src} alt={alt} />;
}

export default Img;
