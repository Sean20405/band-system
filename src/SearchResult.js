import SearchCard from "./SearchCard";
export function SearchResultUser({ datas }) {
  return(
    <div className='search-result' style={{ textAlign: "left" }}>
      { datas.map(data => (
        <SearchCard id={data.user_id} name={data.name}/>
      )) }
    </div>
  );
}

export function SearchResultBand({ datas }) {
  return(
    <div className='search-result' style={{ textAlign: "left" }}>
      { datas.map(data => (
        <SearchCard id={data.band_id} name={data.name}/>
      )) }
    </div>
  );
}
