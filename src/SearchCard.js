import tmpphoto from "./img/logo192.png";
import { Link } from "react-router-dom";
const SearchCard = ({id, name, filename}) => {
  const pathname = "http://54.160.85.246:5000/img/" + filename;
  return (
      <div className="search-card">
        <div className="photo">
          <img src={tmpphoto} alt="profile"/>
        </div>
        <div className="name-id">
          <h3>{name}</h3>
          <p>{id}</p>
        </div>
      </div>
  );
}
 
export default SearchCard;