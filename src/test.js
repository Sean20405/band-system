//import CheckBox from "./CheckBox";
const test = () => {
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

  return(
    <body class="profile-main">
    
      <div class="profile-container">
        <div class="profile-header">
          {/* <img src="profile-picture.jpg" alt="Profile Picture" class="profile-picture"> */}
          <h1 class="user-name">John Doe</h1>
          <p class="user-id">ID: JD123</p>
          <p class="user-bio">Web Developer and Music Enthusiast</p>
        </div>
        <div class="profile-details">
          <div class="detail">
            <strong>Preferred Practice Time:</strong> Evening
          </div>
          <div class="detail">
            <strong>Instrument Played:</strong> Guitar
          </div>
          <div class="detail">
            <strong>Music Style Liked:</strong> Rock, Jazz
          </div>
          <div class="detail">
            <strong>Region:</strong> City, Country
          </div>
          <div class="detail">
            <strong>Instagram:</strong> <a href="https://www.instagram.com/johndoe/" target="_blank">johndoe</a>
          </div>
          <div class="detail">
            <strong>Facebook:</strong> <a href="https://www.facebook.com/johndoe/" target="_blank">johndoe</a>
          </div>
          <div class="detail">
            <strong>Email:</strong> johndoe@example.com
          </div>
        </div>
      </div>
    </body>

  /*   
    // <div>
    // <div class="profileTitle">
      
    //         <h1>{ formData.get("name") }'s Public profile</h1>
    //         <br></br>
    //         <br></br>
    //         <br></br>
            
    // </div> 
    // <div class="grid-container">           
    //             <div class="grid-item">
    //                 <h4></h4>
    //                 <p>ID : vitolin</p>
    //                 <br></br>
    //             </div>
                
    //             <div class="grid-item">
    //                 <h2>Name:</h2>
    //                 <p>{  formData.get("name") }</p>
    //                 <br></br>
    //             </div>
                 
    //             <div class="grid-item">
    //                 <h2>Bio: </h2> 
    //                 <p>{ formData.get("bio")}</p> <br></br>
    //             </div>
               
    //   </div>      
    //   </div>    
     */
  )
}
export default test;