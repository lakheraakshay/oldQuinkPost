import React, { Component, useState } from "react";
import { Avatar } from "@material-ui/core";
import "../style/Post.css";
import Profile from "../images/colour.jpg";

class Post1 extends Component {
  state ={
  post :[
    {
      displayname: "Lorem",
      username: "@lorem",
      header: "lorem ipsum Header",
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit Reprehenderit vitae, nihil sunt quibusdam dolores id non deseruntLabore, commodi maiores sunt explicabo similique laudantium illo,recusandae ea est velit unde Odio quae eaque autem voluptatibus doloribus",
      body:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit vitae, nihil sunt quibusdam dolores id non deserunt  Labore, commodi maiores sunt explicabo similique laudantium irecusandae, ea est velit unde. Odio quae eaque autem voluptatibus,doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit Maxime excepturi explicabo dolor a, optio aspernatur cum adipisci Reprehenderit vitae, nihil sunt quibusdam dolores id non deserunt  Labore, commodi maiores sunt explicabo similique laudantium irecusandae, ea est velit unde. Odio quae eaque autem voluptatibus,doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit Maxime excepturi explicabo dolor a, optio aspernatur cum adipisci",
      id: 27254243,
      detail: false,
    },
    {
      displayname: "Lorem",
      username: "@lorem",
      header: "lorem ipsum Header",
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit Reprehenderit vitae, nihil sunt quibusdam dolores id non deseruntLabore, commodi maiores sunt explicabo similique laudantium illo,recusandae ea est velit unde Odio quae eaque autem voluptatibus doloribus",
      body:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit vitae, nihil sunt quibusdam dolores id non deserunt  Labore, commodi maiores sunt explicabo similique laudantium irecusandae, ea est velit unde. Odio quae eaque autem voluptatibus,doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit Maxime excepturi explicabo dolor a, optio aspernatur cum adipisci Reprehenderit vitae, nihil sunt quibusdam dolores id non deserunt  Labore, commodi maiores sunt explicabo similique laudantium irecusandae, ea est velit unde. Odio quae eaque autem voluptatibus,doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit Maxime excepturi explicabo dolor a, optio aspernatur cum adipisci",
      id: 13243,
      detail: false,
    },
    {
      displayname: "Lorem",
      username: "@lorem",
      header: "lorem ipsum Header",
      caption:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit Reprehenderit vitae, nihil sunt quibusdam dolores id non deseruntLabore, commodi maiores sunt explicabo similique laudantium illo,recusandae ea est velit unde Odio quae eaque autem voluptatibus doloribus",
      body:
        " Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit vitae, nihil sunt quibusdam dolores id non deserunt  Labore, commodi maiores sunt explicabo similique laudantium irecusandae, ea est velit unde. Odio quae eaque autem voluptatibus,doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit Maxime excepturi explicabo dolor a, optio aspernatur cum adipisci Reprehenderit vitae, nihil sunt quibusdam dolores id non deserunt  Labore, commodi maiores sunt explicabo similique laudantium irecusandae, ea est velit unde. Odio quae eaque autem voluptatibus,doloribus? Lorem ipsum dolor sit amet consectetur adipisicing elit Maxime excepturi explicabo dolor a, optio aspernatur cum adipisci",
      id: 223434,
      detail: false,
    },
  ]
  }  
  
  handleReadMore=(id)=>{
    let newArr = [...this.state.post];
    if(newArr[id].detail === false){
      newArr[id].detail=true;
    } else{
      newArr[id].detail=false;
    }
    this.setState(newArr)
  }

  render() {
    let PostList = this.state.post.map((post,index) => {
     let extraContent = <div>{post.body}</div>;
     let linkName = !post.detail ? "read" : "done";
      return (
        <div className="container" key={post.id}>
          <div className="profile-1">
            <Avatar src={Profile} />
            <div className="user">
              <p className="displayname">{post.displayname}</p>
              <p className="username">{post.username}</p>
            </div>
          </div>
          <div className="image">
            <img src={Profile} alt="" />
          </div>
          <div className="post-info">
            <div className="header">{post.header}</div>
            <div className="caption">{!post.detail && post.caption}</div>
            <div className="caption">{post.detail && extraContent}</div>
          </div>
          <div
            className="readmore"
            onClick={()=>this.handleReadMore(index)}
          >
            {linkName}
          </div>
        </div>
      );
    });
    return <div>{PostList}</div>;
  }
}

export default Post1;