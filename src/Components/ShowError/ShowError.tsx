
interface Iprops {
  SaveError: string | undefined; 
}

function ShowError({ SaveError }: Iprops) {
  // Check if SaveError is defined
  if (SaveError !== undefined) {
    return <span className="text-red-500 font-bold ">{SaveError}</span>;
  }
  return null; // Return null if SaveError is undefined
}

export default ShowError;
