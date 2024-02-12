
interface Iprops {
  SaveError: string;
}
function ShowError( {SaveError} : Iprops) {
    return <span className="text-red-500 font-bold ">{SaveError}</span>;
}

export default ShowError