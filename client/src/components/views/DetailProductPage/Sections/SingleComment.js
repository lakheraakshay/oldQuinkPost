import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux'; 
import Axios from 'axios';
import AttachFileRoundedIcon from "@material-ui/icons/AttachFileRounded";
import "../../style/Postdes.css";
import LikeDislikes from './LikeDislikes';

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [CommentValue, setCommentValue] = useState('')
    const [OpenReply, setOpenReply] = useState(false)
    
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue
        }

        Axios.post('/api/comment/saveComment', variables) 
            .then(response => {
                if(response.data.success) {
                    setCommentValue('')
                    setOpenReply(OpenReply)
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Failed to save comment')
                }
            })
    }

    return(
        <>
        <div className="description-comments-single">
            <Avatar
            
              src={props.comment.writer.image}
              className="description-comments-single-avatar"
            />
            <div className="description-comments-single-1">
              <div className="description-comments-single-1-username">
               {props.comment.writer.name}
              </div>
              {props.comment.content}
            </div>
          </div>
            <div style={{paddingLeft: '130px'}}>
              <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />
            </div>

            {OpenReply &&
            <form onSubmit={onSubmit}>
               
                <div className="description-comments-2-2">
            <textarea
              id="comment-textarea"
              onChange={handleChange}
              value={CommentValue}
              cols="163"
              rows="10"
              placeholder=" Reply to a Comment "
            ></textarea>
          </div>
          <div className="description-comments-2-3" onClick={onSubmit}>
            <AttachFileRoundedIcon />
          </div>
            </form>
            }
        </>
    )
}

export default SingleComment;