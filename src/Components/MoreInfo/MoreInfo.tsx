import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Ibooks } from "../../Interfaces";

interface Iprops {
  bookInfo: Ibooks;
  nextBookItem: () => void;
  PreviousBookItem: () => void;
}
function MoreInfoData({ bookInfo, nextBookItem, PreviousBookItem }: Iprops) {
  const {
    author,
    country,
    imageLink,
    language,
    link,
    pages,
    title,
    year,
    description,
    category,
  } = bookInfo;

  const words = category
    .split(", ")
    .map((word) => (
      <span className="bg-blue-300 rounded-md px-3 py-1 ">#{word}</span>
    ));
  return (
    <div className="flex justify-center items-center  ">
      <div className="flex justify-between w-full ">
        <button onClick={PreviousBookItem}>
          <FaArrowAltCircleLeft size={40} />
        </button>

        <div className=" w-[90%] h-full  ">
          <div className="p-2 flex flex-col   justify-between bg-white border border-gray-200 rounded-lg shadow md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 gap-3 h-full ">
            {imageLink && typeof imageLink === "string" && (
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-[full] md:w-[60%]  md:rounded-none md:rounded-s-lg"
                src={imageLink}
                alt={title}
              />
            )}

            {imageLink && typeof imageLink !== "string" && (
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-full md:w-[35%]  md:rounded-none md:rounded-s-lg"
                src={URL.createObjectURL(imageLink)}
                alt={title}
              />
            )}

            <div className="flex flex-col items-center h-[full ] justify-around mx-4 ">
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a
                  target="_blank"
                  className=" text-blue-800 underline"
                  href={link}
                >
                  {title}
                </a>
              </h1>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {description}
              </p>
              <h2 className="justify-start items-start me-auto">
                Written by: <span className="font-semibold">{author}</span>
              </h2>
              <h2 className="justify-start items-start me-auto">
                published in: <span className="font-bold"> {year}</span>
              </h2>
              <div className="flex justify-between w-full my-2">
                <h3 className="bg-blue-800 py-2 px-1 rounded-md text-white font-semibold">
                  Language: {language}
                </h3>
                <h3 className="bg-blue-800 py-2 px-1 rounded-md text-white font-semibold">
                  Country: {country}
                </h3>
                <h3 className="w-fit bg-red-800  px-1 rounded-md text-white font-semibold">
                  Pages: {pages}
                </h3>
              </div>
              <h2 className="justify-start items-start me-auto flex flex-row gap-3  ">
                Category:
                <div className="flex gap-1">{words}</div>
              </h2>
            </div>
          </div>
        </div>

        <button onClick={nextBookItem}>
          <FaArrowAltCircleRight size={40} />
        </button>
      </div>
    </div>
  );
}

export default MoreInfoData;
