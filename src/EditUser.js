import { faRoadCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditUser = ({user,url}) => {

    const [errMsg, setErrMsg] = useState('');

    const [name, setName] = useState('');
    const [prefered_time, setPrefered_time] = useState("null");
    const [instrument, setInstrument] = useState('violin');
    const [style, setStyle] = useState("Lofi");
    const [region, setRegion] = useState("null");
    const [ig, setIg] = useState("null");
    const [fb, setFb] = useState("null");
    const [photo, setPhoto] = useState("null");
    const [email, setEmail] = useState("null");
    const [bio, setBio] = useState("null");

    const id = user.user;

    useEffect (() => {
        setName('VitoHardCode');
    }, [])

    const history=useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(); 
        formData.append('name', name);
        formData.append('prefered_time', prefered_time);
        formData.append('bio', bio);
        formData.append('ig', ig);
        formData.append('fb', fb);
        formData.append('email', email);
        formData.append('instrument', 1);
        formData.append('region', 1);
        formData.append('style', 1);

        formData.append('photo', "IMG_4363");

        console.log(formData.get("name"));

        fetch(url + 'user-edit?user_id=' + id, {
            method: 'PUT',
            body: formData
        }).then((response) => {
            console.log(response.text);
            return response.text(); 
        }).then((data) => {
            if(data == 'id not found'){
                setErrMsg("id not found");
            }
            else{
                history.push('/edituser');
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        })

    }

    return (
        <div>
        <div calss = "edit-profile-container">
        <h2 class="profile-edit-heading">Edit Profile</h2>
            <form class = "profile-edit-from" onSubmit={handleSubmit}>
                <label htmlFor="username" class = "profile-edit-lable">
                    Name:
                </label>
                <input
                    class = "profile-edit-input"
                    type="text"
                    name="instrument"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <label htmlFor="instrument" class = "profile-edit-lable">
                    Instrument:
                </label>
                <select
                    class="profile-edit-input"
                    type="text"
                    id="instrument"
                    autoComplete="off"
                    onChange={(e) => setInstrument(e.target.value)}
                    value={instrument}
                    required
                >
                    <option value = "1">violin</option>
                    <option value = "2">drum</option>
                </select>

                <label htmlFor="style" class = "profile-edit-lable">
                    Style:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="style"
                    autoComplete="off"
                    onChange={(e) => setStyle(e.target.value)}
                    value={style}
                    required
                />

                <label htmlFor="region" class = "profile-edit-lable">
                    Region:
                </label>
                <select
                    class="profile-edit-input"
                    type="text"
                    id="region"
                    autoComplete="off"
                    onChange={(e) => setRegion(e.target.value)}
                    value={region}
                    required
                >
                    <option value = "1">Taipei</option>
                    <option value = "2">Hisnchu</option>
                </select>
                
                <label htmlFor="prefered_time" class = "profile-edit-lable">
                    Prefered_time:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="prefered_time"
                    autoComplete="off"
                    onChange={(e) => setPrefered_time(e.target.value)}
                    value={prefered_time}
                    required
                />
                <label htmlFor="ig" class = "profile-edit-lable">
                    Instagram:
                </label>
                <input  
                    class="profile-edit-input"
                    type="text"
                    id="ig"
                    autoComplete="off"
                    onChange={(e) => setIg(e.target.value)}
                    value={ig}
                    required
                />
                <label htmlFor="fb" class = "profile-edit-lable">
                    Facebook:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="fb"
                    autoComplete="off"
                    onChange={(e) => setFb(e.target.value)}
                    value={fb}
                    required
                />
                <label htmlFor="email" class = "profile-edit-lable">
                    Email:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                <label htmlFor="bio" class = "profile-edit-lable">
                    Bio:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="bio"
                    autoComplete="off"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    required
                />
                <button type = "submit" class="profile-edit-button" >Save</button>
            </form>
        </div>
        </div>
    )


}
 
export default EditUser;