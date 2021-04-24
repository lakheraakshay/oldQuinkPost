import React from 'react';
import "./ArticlePost.css";

const ArticlePost = ({articles}) => {
    let articleList = articles.map(post =>{
        return ( 
            <div className="articlepost">
                <div className="articlepost-img">
                   <img src={post.image} alt=""/>
                </div>
                <div className="articlepost-info">
                    <div className="articlepost-header">
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
         <>{articleList} </>
     );
}
 
export default ArticlePost;