import React, { Component } from "react";
import { Avatar } from "@material-ui/core";
import "../style/Post.css";
import "../style/CommunityPost.css";
import Profile from "../images/colour.jpg";
import { Link } from "react-router-dom";
import '../style/Navbar.css';

class Communitypost extends Component {
  state = {
    post: [
      {
        header: "Entreprenuership Community",
        caption:
          "A Community for entrepreneur where aspiring entrepreneur can learn from others. The users can share their ideas, can collaborate with others of same mindset. Your doubts can be solved here. You can create your community as well and share it with others to join it. ",
        body:
          "A Community for entrepreneur where aspiring entrepreneur can learn from others. The users can share their ideas, can collaborate with others of same mindset. Your doubts can be solved here. You can create your community as well and share it with others to join it. ",
        id: 27254243,
        detail: false,
        members: 46,
      },
    ],
  };

  render() {
    let PostList = this.state.post.map((post, index) => {
      return (
        <>
          <div className="container" key={post.id}>
            <Link to='/community/description' style={{textDecoration: 'none', color: 'black'}}>
            <div className="post-info">
              <div className="community-header">
                <div className="community-header-1">
                  <Avatar src={Profile} />
                </div>
                <div className="community-header-2">{post.header}</div>
              </div>
              <div className="community-caption">
                {!post.detail && post.caption}
              </div>
            </div>
            </Link>
            <div className="join-community">
              <div className="community-readmore"><Link to='/community/description'>Join</Link></div>
            </div>
          </div>
        </>
      );
    });
    return (
      <>
          <div className="navbar-community">
            <div className="brand-community">
            Quink-<span className="brand-post-community">Post.</span>
          </div>
              <div className="community-back-button"> <button><Link to='/'> Back </Link></button></div>
        </div>

        <div>{PostList}</div>
      </>
    );
  }
}

export default Communitypost;
