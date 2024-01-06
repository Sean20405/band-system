import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";

const Profile = ({user}) => {
    const id = user.user;
    const role = user.role;
    const [info, setInfo] = useState({});
    const [errMsg, setErrMsg] = useState('1234');
    const [name, setName] = useState(null);
    const [prefered_time, setPrefered_time] = useState(null);
    const [instrument, setInstrument] = useState(null);
    const [style, setStyle] = useState(null);
    const [region, setRegion] = useState(null);
    const [ig, setIg] = useState(null);
    const [fb, setFb] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [email, setEmail] = useState(null);
    const [bio, setBio] = useState(null);

    let formData = new FormData(); 
    formData.append('name', "Sheng_Shun_Chang");
    formData.append('prefered_time', "midnight");
    formData.append('bio', "love Amazing Show");
    formData.append('photo', "Some random URL");
    formData.append('ig', "vitolin_yucheng");
    formData.append('fb', 'Kent_l');
    formData.append('email', 'vitolin0416@gmail.com');
    formData.append('instrument', 'violin');
    formData.append('region', 'Taipei');
    formData.append('style', 'rock paper scissor');

    useEffect(()=>{
        if(info){
            console.log(info);
        }
        else {
            console.log("cannot fetch info");
        }
    },[info])

    useEffect(() => {
        loadInitialPage();
    },[]);

    const loadInitialPage = async () => {
        console.log("init");
        const response = await fetch('http://54.160.85.246:5000/user?user_id=' + id, {
            method: 'GET',
            headers:{
                "ngrok-skip-browser-warning": "69420",
            }
        });
        const data = await response.json();
        console.log(data);
        setInfo(data);
    }
    
    

    return(
        <div className="profile" >
            <h1>{ formData.get("name") }'s Public profile</h1>
            <br></br>
            <div className="blog-preview" >
                <h2>ID:</h2>
                <p>{ id }</p><br></br>
                <h2>Name:</h2>
                <p>{ info.name }</p><br></br>
                <h2>Prefered_time:</h2>
                <p>{ info.prefered_time }</p><br></br>
                <h2>Instument: </h2>
                <p>{ info.instrument }</p> <br></br>
                <h2>Style: </h2>
                <p>{ info.style }</p> <br></br>
                <h2>Region: </h2> 
                <p>{ info.region }</p> <br></br>
                <h2>Instagram: </h2> 
                <p>@{ formData.get("ig")}</p> <br></br>
                <h2>Facebook: </h2> 
                <p>{ formData.get("fb")}</p> <br></br>
                <h2>Email: </h2> 
                <p>{ formData.get("email")}</p> <br></br>
                <h2>Profile Picture: </h2> 
                <p>{ formData.get("photo")}</p> <br></br>
                <h2>Bio: </h2> 
                <p>{ formData.get("bio")}</p> <br></br>
            </div>
        </div>

    ); 
}
 
export default Profile;