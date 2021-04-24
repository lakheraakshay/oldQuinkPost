import React from 'react';
import "./ArticlePost.css";
import "./InterviewPost.css";

const InterviewPost = ({interviews}) => {
     let interviewList = interviews.map(post =>{
        return ( 
            <div className="interviewpost">
                <div className="interviewpost-img">
                   <img src={post.image} alt=""/>
                </div>
                <div className="articlepost-info">
                    <div className="interviewpost-header">
                     {post.name}
                    </div>
                    <div className="articlepost-caption">
                        {post.caption}
                    </div>
   
                </div>
            </div>
        );
     })
    return ( 
        <> {interviewList} </>
       
       
     );
}
 
export default InterviewPost;