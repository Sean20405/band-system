import SearchCard from "./SearchCard";
const SearchResult = ({ datas }) => {
  return(
    <div className='search-result' style={{ textAlign: "left" }}>
      { datas.map(data => (
        <SearchCard id={data.user_id} name={data.name}/>
      )) }
    </div>
  );
}

export default SearchResult;