import { useRef , useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SearchCard from "./SearchCard";
import { click } from '@testing-library/user-event/dist/click';
const BandRequest = ({user,url}) => {
    const [isPending, setIsPending] = useState(true);
    const [datas, setSearchData] = useState([]);
    fetch( url + '' +user.user, {
        method: 'POST',
        headers: { 'ngrok-skip-browser-warning': 'true' },
    }).then(
        res => res.json()
    ).then((data) => {
        console.log(data);
        setSearchData(data);
        setIsPending(false);
    })
    const click = (e) => {
        let formData = new FormData();
        
    }
    if(isPending) return "loading";
    else return(
        <div className='search-result'>
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet" />
          
          <div className="search-detail">
            { datas.map(data => (
                <><Link to={`/ProfilePublic/${data.user_id}`}>
                    <SearchCard id={data.user_id} name={data.name} filename={data.photo}/>
                </Link>
                <button onClick={click}>Accept</button></>  
            )) }
          </div>
          
          
        </div>
    );
}
 
export default BandRequest;