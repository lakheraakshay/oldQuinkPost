import React, { useState } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import "../../style/Postdes.css";

function Comments(props) {
  const user = useSelector((state) => state.user);
  const [Comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: Comment,
      writer: user.userData._id,
      postId: props.postId,
    };

    Axios.post("/api/comment/saveComment", variables).then((response) => {
      if (response.data.success) {
        setComment("");
        props.refreshFunction(response.data.result);
      } else {
        alert("Failed to save Comment");
      }
    });
  };

  return (
    <>
      {props.CommentLists &&
        props.CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={index}>
                <SingleComment
                  comment={comment}
                  postId={props.postId}
                  refreshFunction={props.refreshFunction}
                />
                <ReplyComment
                  CommentLists={props.CommentLists}
                  postId={props.postId}
                  parentCommentId={comment._id}
                  refreshFunction={props.refreshFunction}
                />
              </React.Fragment>
            )
        )}

      <form onSubmit={onSubmit}>
        <div className="description-comments-2-2">
          <textarea
            id="comment-textarea"
            onChange={handleChange}
            value={Comment}
            placeholder="Comment your views...."
          ></textarea>
        </div>
        <div className="description-comments-2-3" onClick={onSubmit}>
          <AttachFileRoundedIcon />
        </div>
      </form>
    </>
  );
}

export default Comments;
