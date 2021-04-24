import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Original.css";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
import ArticleFeed from './ArticleFeed';
import InterviewFeed from './InterviewFeed';
import MenuIcon from "@material-ui/icons/Menu";
import { Avatar } from "@material-ui/core";
import Modal from "react-modal";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";

const OriginalPage = () => {
  const [modalIsOpen2, setmodalIsOpen2] = useState(false);
  const [section, setsection] = useState(false);

  let FeedProfile = localStorage.getItem('fileBase64');

  let OriginalSection ;
  if(section === false){
    OriginalSection = (
      <ArticleFeed />
    )
  }
    else {
      OriginalSection = (
        <InterviewFeed />
      )
    }
    let handleClick1 =()=>{
      if (section === true) {
        setsection(false);
        setmodalIsOpen2(false);
      }
    
    }
    let handleClick2 =()=>{
      if (section === false) {
        setsection(true);
        setmodalIsOpen2(false);
      }
     
    }
  
    return ( 
      <>
     <div className="navbar">
        <div className="hamburger">
          <label
            htmlFor="side"
            onClick={() => setmodalIsOpen2(true)}
            className="label"
          >
            <MenuIcon />
          </label>
          <input type="checkbox" id="side" />
        </div>
        <Modal isOpen={modalIsOpen2} className="Originals-Modal1">
        <div className="originals-menu-modal">
    <div className="menu-1">
    <Link to="/" className="homemainlink">
    <div className="originals-menu-btn home-original-button" onClick={() => setmodalIsOpen2(false)}>Home</div>
    </Link>
    
    <div className="originals-menu-btn" onClick={handleClick1} >Articles</div>
    <div className="originals-menu-btn" onClick={handleClick2}>Interviews</div>
    </div>
    <div className="menu-2">
    <div className="trend-1-original" onClick={() => setmodalIsOpen2(false)}>
<TrendingUpIcon className="icons" />
trending
</div>
<div className="trend-1-original" onClick={() => setmodalIsOpen2(false)}>
<DevicesIcon className="icons" />
technology
</div>
<div className="trend-1-original" onClick={() => setmodalIsOpen2(false)}>
<LocalActivityIcon className="icons" />
fashion
</div>
<div className="trend-1-original" onClick={() => setmodalIsOpen2(false)}>
<NextWeekIcon className="icons" />
buisness
</div>
<div className="trend-1-original" onClick={() => setmodalIsOpen2(false)}>
<AssistantIcon className="icons" />
entertainment
</div>
</div>
<div className="close" onClick={() => setmodalIsOpen2(false)}>
              <CancelPresentationIcon className="close-icon" />
            </div>
    </div>
        </Modal>
        <Link to="/" className="homemainlink">
          <div className="brand">
            Quink-<span className="brand-post">Post.</span>
          </div>
        </Link>

        <div className="search">
          <label htmlFor="search"></label>
          <input
            type="text"
            className="mainLoginInput"
            placeholder=" &#61442; Search Originals"
          />
        </div>
        <div className="profile">
          <Link to="/user/profile">
            <Avatar src={FeedProfile}  />
          </Link>
        </div>
      </div>
      <div className="originals-page">

<div className="originals-menu">
    <div className="menu-1">
    <Link to="/" className="homemainlink">
    <div className="originals-menu-btn home-original-button">Home</div>
    </Link>
    
    <div className="originals-menu-btn" onClick={handleClick1}>Articles</div>
    <div className="originals-menu-btn" onClick={handleClick2}>Interviews</div>
    </div>
    <div className="menu-2">
    <div className="trend-1-original">
<TrendingUpIcon className="icons" />
trending
</div>
<div className="trend-1-original">
<DevicesIcon className="icons" />
technology
</div>
<div className="trend-1-original">
<LocalActivityIcon className="icons" />
fashion
</div>
<div className="trend-1-original">
<NextWeekIcon className="icons" />
buisness
</div>
<div className="trend-1-original">
<AssistantIcon className="icons" />
entertainment
</div>
</div>
    </div>
<div className="Originals-feed">
{OriginalSection}
</div>
</div> </>
        
     );
}
 
export default OriginalPage;