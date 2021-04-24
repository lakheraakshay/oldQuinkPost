import React from "react";
import adtiya from "../views/images/Quinkpost.jpg";

function ImageSlider(props) {
    let body;
    if (props.images.length > 0) {
       body = props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "250px" }}
              src={`http://quink-post.herokuapp.com/${image}`}
              alt="contentImage"
            />
          </div>
        ));
      
    } else {
      body = (
        <img
          style={{ width: "100%", maxHeight: "250px" }}
          src={adtiya}
          alt="contentImage"
        />
      );
    }

return <div>{body}</div>;
}

export default ImageSlider;
