import React, { useState } from "react";
import "../style/Profile.css";
import Axios from "axios";
import EdiText from "react-editext";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { Link } from "react-router-dom";

function ProfilePageHeader() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [UserId, setUserId] = useState("");
  const [value, setValue] = useState("Bio - Dream big and dare to fail");

  let [profileImg, setProfileImg] = useState("");

  const handleSave = (val) => {
    console.log("Edited Value -> ", val);
    setValue(val);
    localStorage.setItem("Bio", val);
  };

  const onDelete = () => {
    profileImg = [];
    setProfileImg(profileImg);
    localStorage.removeItem("fileBase64");
  };

  async function getUserData() {
    let dets = await Axios.get("/api/users/auth");
    let data = dets.data;
    setUsername(data.name);
    setEmail(data.email);
    setUserId(data._id);
  }

  getUserData();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const imageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);

    const file = e.target.files[0];
    getBase64(file).then((base64) => {
      localStorage["fileBase64"] = base64;
      console.debug("file stored", base64);
    });
  };



  let dataImage = localStorage.getItem("fileBase64");

  return (
    <>
      <div className="profilepage">
        <div className="section-1">
          <div className="section-1-1">
            <Link to="/">
              <div className="profile-home">
                <HomeRoundedIcon />
              </div>
            </Link>

            <img src={dataImage} alt="" id="imgprofile" />
            <div className="section-1-1-1">
              <div>
                <DeleteRoundedIcon
                  onClick={() => onDelete()}
                  className="delete-image-icon"
                />{" "}
              </div>
              <div className="image-upload-div">
                <input
                  type="file"
                  name="image-upload"
                  id="img-input"
                  accept="image/*"
                  onChange={imageUpload}
                />
              </div>
            </div>
          </div>
          <div className="section-1-2">
            <div className="section-1-2-1">{username}</div>
            <div className="section-1-2-2">{email}</div>
          </div>
        </div>
        <div>
          <Link to="/user/savedContent">
            <div className="profile-bookmark">Check Saved Content</div>
          </Link>
        </div>
        <div className="section-2">
          <div className="section-2-1">Bio:</div>
          <div className="section-2-2">
            <EdiText
              type="text"
              value={localStorage.getItem("Bio")}
              onSave={handleSave}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePageHeader;
