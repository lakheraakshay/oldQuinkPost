import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, afterPostMessage } from "../../../_actions/chat_actions";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../style/CommunityDes.css";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import { Avatar, Tooltip } from "@material-ui/core";
import ArrowUpwardRoundedIcon from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRoundedIcon from "@material-ui/icons/ArrowDownwardRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";
import AttachmentIcon from "@material-ui/icons/Attachment";
import "../style/Post.css";

export class ChatPage extends Component {
  state = {
    chatMessage: "",
    post: false
  };

  componentDidMount() {
    let server = "http://quink-post.herokuapp.com";

    this.props.dispatch(getChats());

    this.socket = io(server);

    this.socket.on("Output Chat Message", (messageFromBackEnd) => {
      this.props.dispatch(afterPostMessage(messageFromBackEnd));
    });
  }

  hanleSearchChange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };

  onDrop = (files) => {
    console.log(files);

    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      return alert("Please Log in first");
    }

    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    Axios.post("api/chat/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let chatMessage = response.data.url;
        let userId = this.props.user.userData._id;
        let userName = this.props.user.userData.name;
        let userImage = this.props.user.userData.image;
        let nowTime = moment();
        let type = "VideoOrImage";

        this.socket.emit("Input Chat Message", {
          chatMessage,
          userId,
          userName,
          userImage,
          nowTime,
          type,
        });
      }
    });
  };

  handleCreatePost = ()=> {
    this.setState({
      post:true
    })
  }
  handleCreatePost2 = ()=> {
    this.setState({
      post:false
    })
  }

  submitChatMessage = (e) => {
    e.preventDefault();

    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      return alert("Please Log in first");
    }

    let chatMessage = this.state.chatMessage;
    let userId = this.props.user.userData._id;
    let userName = this.props.user.userData.name;
    let userImage = this.props.user.userData.image;
    let nowTime = moment();
    let type = "Text";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      userImage,
      nowTime,
      type,
    });
    this.setState({ chatMessage: "" });
    this.setState({
      post:false
    })
  };

  render() {

    let comlist;
    if (this.state.post === true) {
      comlist = (
        <>
        <div className="create-community-post-container">
          <div className="create-community-post">
            <div>Post to Community : </div>
            <div>
              <ClearRoundedIcon onClick={this.handleCreatePost2} />
            </div>
          </div>
          <div className="create-post-select">
            <label for="post-type">Choose a Post-Type:</label>
            <select name="post-type" id="cars">
              <option value="Post">Post</option>
              <option value="Question">Question</option>
            </select>
          </div>
          <div className="create-community-post-textarea">
            <label htmlFor="body">Content </label>
            <textarea value={this.state.chatMessage} onChange={this.hanleSearchChange} name="body" id="community-createpost-textarea"></textarea>
          </div>
          <div className="create-community-post-attach">
            Attach Image(s) :
            <AttachmentIcon className="create-community-post-attach-icon" />
          </div>
          <div className="create-community-post-post">
            <button onClick={this.submitChatMessage}>Post To Community</button>
          </div>
          </div>
        </>
      );
    } else {
      comlist = this.props.chats.chats && this.props.chats.chats.map((chat) => {
          return (
            <>
            <div className="container" key={chat._id}>
              <div className="profile-1">
                <Avatar />
                <div className="user">
                  <p className="displayname">{chat.sender.name}</p>
                  <p className="username">{chat.sender.email}</p>
                </div>
                <Tooltip className='communitytimestamp' TransitionProps={{ timeout: 600 }} title={moment(chat.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(chat.createdAt).fromNow()}</span>
                </Tooltip>
              </div>
              <div className="post-info">
                <div className="caption">{chat.message}</div>
              </div>
              <div className="join-community">
                <div className="members">
                  <ArrowUpwardRoundedIcon />
                  <div className="members-no">431</div>
                  <ArrowDownwardRoundedIcon />
                  <div className="members-no">31</div>
                </div>
              </div>
            </div>
            <div ref={(el) => { this.messagesEnd = el; }} style={{ clear: "both" }} />
            </>
          );
      });
    }

    return (
      <>
       <div className="communitydes-container">
        <div className="community-navbar">
          <div>Quink-Post | Communities</div>
          <Link to='/community'>
            <CloseRoundedIcon />
          </Link>
        </div>
        <div className="community-name">
          <div className="community-des-name">Entrepreneurship Community</div>
          <div className="community-des-post" onClick={this.handleCreatePost}>
            <div>
              <AddRoundedIcon />
            </div>
            <div className="community-des-post-2">Post</div>
          </div>
        </div>
        <div className="communitydes-feed">{comlist}</div>
      </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chats: state.chat,
  };
};

export default connect(mapStateToProps)(ChatPage);
