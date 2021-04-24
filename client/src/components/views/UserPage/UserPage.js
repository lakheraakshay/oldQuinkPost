import React, { useState } from "react";
import Axios from "axios";
import Follow from "./Follow/Follow.js";
import '../style/UserPage.css';
import '../style/Navbar.css';
import { Link } from "react-router-dom";

function UserPage(props) {
  const userId = props.match.params.userId;
  const [User, setUser] = useState([]);

  async function getUserData() {
    let dets = await Axios.get(`/api/users/${userId}`);
    let data = dets.data;
    setUser(data);
  }

  getUserData();

  let loggedInUser = localStorage.getItem("loggedInUserId");

  return (
    <>
       <div className="navbar-community">
            <div className="brand-community">
            Quink-<span className="brand-post-community">Post.</span>
          </div>
              <div className="community-back-button"> <button><Link to='/' style={{ textDecoration: 'none'}}> Back </Link></button></div>
        </div>
       <div className="description-cover">
          <div className="description-cover-1">
            <img className='image-gallery-image' alt='' style={{width: '100%', borderRadius: '50%'}} src={User.image} />
          </div>
          <div className="description-cover-2">
              <div>
                {User.name}
              </div>
            <div className="description-cover-2-1">
              <div>
                {User.email}
              </div>
            </div>
              <Follow userTo={userId} userFrom={loggedInUser} />
              <br />
              <div style={{fontSize: '38px', fontFamily: 'Cabin, sans-serif', justifyContent: 'center', display: 'flex'}}>
                {User.bio}
              </div>
          </div>
          </div>
    </>
  );
}

export default UserPage;