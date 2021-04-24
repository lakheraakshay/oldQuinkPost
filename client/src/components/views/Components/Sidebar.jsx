import React, {useState} from "react";
import "../style/Sidebar.css";
import { Link } from "react-router-dom";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
import RightMenu from "../NavBar/Sections/RightMenu";
import Axios from 'axios';

const Sidebar = () => {

  const [username, setUsername] = useState("");
  async function getUserData() {
    let dets = await Axios.get("/api/users/auth");
    let data = dets.data;
    console.log(data);
    setUsername(data.name);
  }

  getUserData()
  return (
    <div className="sidebar-secondary">
      <Link to="/product/upload" className="link2">
        <div className="post-new">
          <AddCircleRoundedIcon
            className="post-icon"
            style={{ fontSize: 35, fontWeight: "bolder" }}
          />
          <div>Post</div>
        </div>
      </Link>

      <div className="trend">
        <Link to='/challenges' style={{textDecoration: 'none', color: 'black'}}>
        <div className="trend-1">
          <TrendingUpIcon className="icons" />
          challenges
        </div>
        </Link>
        <div className="trend-1">
          <DevicesIcon className="icons" />
          technology
        </div>
        <div className="trend-1">
          <LocalActivityIcon className="icons" />
          fashion
        </div>
        <div className="trend-1">
          <NextWeekIcon className="icons" />
          buisness
        </div>
        <div className="trend-1">
          <AssistantIcon className="icons" />
          entertainment
        </div>
      </div>
      <div className="noti">
      <div className="noti-item">Welcome <b>{username}</b></div>
        <div className="noti-item"><Link className='link' to='/user/profile'>Update Profile</Link></div>
        <div className="noti-item logout"><RightMenu /></div>
      </div>
    </div>
  );
};

export default Sidebar;
