interface Iprops {
  SaveError: string | File | undefined;
}

function ShowError({ SaveError }: Iprops) {
  // Check if SaveError is defined and is a string
  if (typeof SaveError === "string") {
    return <span className="text-red-500 text-sm ">{SaveError}</span>;
  }

  if (SaveError instanceof File) {
    return <span className="text-blue-500 font-bold ">Invalid file type</span>;
  }
  return null;
}

export default ShowError;
