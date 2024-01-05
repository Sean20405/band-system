import BlogList from "./bloglist";
import useFetch from "./useFetch";
import background from "./img/home_background.jpg"
import { Link } from 'react-router-dom'

const Home = () => { 
  return (
    <div className="homepage">
      <img alt="thumb" src={background} width="100%" height="100%" sizes="70%"/>
      <Link to="/search">
        <button className="button-89">Search&emsp;Musician</button>
      </Link>
      

    </div>
    
  );
}
 
export default Home;