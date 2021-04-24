import React, { useEffect, useState } from "react";
import Axios from "axios";
import ProductImage from "./Sections/ProductImage";
import { addToCart } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import Comments from "./Sections/Comments";
import { Link } from "react-router-dom";
import "../style/Postdes.css";
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";
import ShareIcon from "@material-ui/icons/Share";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import ProductInfo from "./Sections/ProductInfo";
import LikeDislikes from "./Sections/LikeDislikes";

function DetailProductPage(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);
  const [commentsDescription, setCommentsDescription] = useState(false);

  const productVariable = {
    productId: productId
  }

  useEffect(() => {
    Axios.get(`/api/product/products_by_id?id=${productId}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      }
    );

    Axios.post("/api/comment/getComments", productVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.comments);
      } else {
        alert("Failed to load comments");
      }
    });
  }, []);

  if (Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)) {
    Product.views++
  }

  const shareUrl = `http://quink-post.herokuapp.com/product/${productId}`;

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const handleclick = () => {
    if (commentsDescription === false) {
      setCommentsDescription(true);
    } else {
      setCommentsDescription(false);
    }
  };
  let body;
  if (commentsDescription === false) {
    body = <div>{Product.description}</div>;
  } else {
    body = (
      <div className="description-comments">
        <div className="description-comments-header">
          <div className="description-comments-header-1"> Comments</div>
          <div onClick={handleclick} className="description-comments-header-2">
            <CancelRoundedIcon />
          </div>
        </div>
        <div className="description-comments-1">
          <Comments
            CommentLists={CommentLists}
            postId={Product._id}
            refreshFunction={updateComment}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="description-container">
        <div className="description-nav">
          <div className="description-nav-brand">Quink-Post</div>
          <div className="description-nav-back">
            <Link to="/" style={{color: 'black'}}>Back</Link>
          </div>
        </div>
        <div className="description-cover">
          <div className="description-cover-1">
            <ProductImage detail={Product} />
          </div>
          <div className="description-cover-2">
            {Product.price}
            <div className="description-cover-2-1">
              <div>
                <VisibilityOutlinedIcon style={{ fontSize: 23 }} /> {Product.views}
              </div>
              <div>
              <LikeDislikes video videoId={productId} userId={localStorage.getItem('userId')}  />
              </div>
              <div onClick={handleclick}>
                <ForumOutlinedIcon style={{ fontSize: 23 }} />
                {CommentLists.length}
              </div>
              <div>
                <ProductInfo addToCart={addToCartHandler} detail={Product} /> 
              </div>
              <div>
                <ShareIcon style={{ fontSize: 23 }} />
                <WhatsappShareButton url={shareUrl}>
                  <WhatsappIcon
                    size={30}
                    style={{ margin: "4px", marginTop: "10px" }}
                  />
                </WhatsappShareButton>
                <TwitterShareButton url={shareUrl}>
                  <TwitterIcon
                    size={30}
                    style={{ margin: "2px", marginTop: "10px" }}
                  />
                </TwitterShareButton>
                <TelegramShareButton url={shareUrl}>
                  <TelegramIcon
                    size={30}
                    style={{ margin: "2px", marginTop: "10px" }}
                  />
                </TelegramShareButton>
              </div>
            </div>
          </div>
        </div>
        <div className="description-article">{body}</div>
      </div>
    </>
  );
}

export default DetailProductPage;
