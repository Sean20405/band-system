import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import { useState, useEffect } from "react";
import './profile.css'

const Profile = ({user,url}) => {
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
            fetchPhoto(info.photo);
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
        const response = await fetch(url + 'user?user_id=' + id, {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setInfo(data);
        console.log(info);

    }
    

    const fetchPhoto = async(filename) => {
        if(!filename)
        {
            console.log("no filename");
            return
        }
        
        const res = await fetch('http://127.0.0.1:5000/image/' + filename ,{
            // mode: "no-cors",
            method: 'GET',
        });
        const imageBlob = await res.blob();
        const photoURL = URL.createObjectURL(imageBlob);
        console.log(photoURL)
        await setPhoto(photoURL);
        console.log(photo)
    }



    return(

        <div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={photo} alt="profile"/>
                            {/* <!-- <div class="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div> --> */}
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h5>
                                        info.name
                                    </h5>
                                    <h6>
                                        {info.instrument}
                                    </h6>
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                {/* <!-- <li class="nav-item">
                                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li> --> */}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p>CONTACT</p>
                            <a href="">{info.ig}</a><br/>
                            <a href="">{info.fb}</a><br/>
                            <a href="">{info.email}</a>

                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{info.user_id}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Music Style</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{info.style}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Region</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{info.region}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Instrument</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{info.instrument}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Prefered Time</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>{info.prefered_time}</p>
                                            </div>
                                        </div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label>Your Bio</label><br/>
                                            <p>{info.bio}</p>
                                        </div>
                                    </div>
                            </div>
                            {/* <!-- <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Experience</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Hourly Rate</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>10$/hr</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Total Projects</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>230</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>English Level</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>Expert</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label>Availability</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p>6 months</p>
                                            </div>
                                        </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <label>Your Bio</label><br/>
                                        <p>Your detail description</p>
                                    </div>
                                </div>
                            </div> --> */}
                        </div>
                    </div>
                </div>
            </form>           
        </div>

    ); 
}
 
export default Profile;