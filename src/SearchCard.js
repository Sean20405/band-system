const SearchCard = ({id, name}) => {
  return (
    <div className="search-card">
      <h4>{name}</h4>
      <p>{id}</p>
    </div>
  );
}
 
export default SearchCard;