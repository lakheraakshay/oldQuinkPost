import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import { continents, price } from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";
import Sidebar from "../Components/Sidebar";
import "../style/Post.css";
import "../style/Feed.css";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import { Avatar, Tooltip } from "@material-ui/core";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import PeopleOutlineRoundedIcon from "@material-ui/icons/PeopleOutlineRounded";
import SupervisedUserCircleRoundedIcon from "@material-ui/icons/SupervisedUserCircleRounded";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "react-modal";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import DevicesIcon from "@material-ui/icons/Devices";
import LocalActivityIcon from "@material-ui/icons/LocalActivity";
import NextWeekIcon from "@material-ui/icons/NextWeek";
import AssistantIcon from "@material-ui/icons/Assistant";
import RightMenu from "../NavBar/Sections/RightMenu";
import moment from "moment";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(100);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState("");
  const [details, setDetails] = useState(true);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [modalIsOpen1, setmodalIsOpen1] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  async function getUserData() {
    let dets = await Axios.get("/api/users/auth");
    let data = dets.data;
    console.log(data);
    setUsername(data.name);
    setEmail(data.email);
    localStorage.setItem('loggedInUserId', data._id)
  }

  useEffect(() => {
    window.location.href="https://www.quinkpost.com"
    const variables = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(variables);
  }, []);

  const getProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("Failed to fectch product datas");
      }
    });
  };

  const renderCards = Products.map((product, index) => {
    const handleclick = () => {
      if (details === false) {
        setDetails(true);
      } else {
        setDetails(false);
      }
    };
    if (details === true) {
      return (
        <div className="container" key={product._id}>
          <div className="profile-1">
            <Link to={`user/${product.writer._id}`}>
              <Avatar src={product.writer.image} />
            </Link>
            <div className="user">
              <p className="displayname">
                {product.writer.name}
                <Tooltip
                  arrow={true}
                  disableFocusListener={true}
                  TransitionProps={{ timeout: 600 }}
                  title={moment(product.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  <span className="producttimestamp">
                    {moment(product.createdAt).fromNow()}
                  </span>
                </Tooltip>
              </p>
              <p className="username">{product.writer.email}</p>
            </div>
          </div>
          <div className="image">
            <Link to={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </Link>
          </div>
          <div className="post-info">
            <div className="header">{product.title}</div>
            <div className="caption">{product.price}</div>
          </div>
          <div className="readmore" onClick={handleclick}>
            Read.
          </div>
        </div>
      );
    } else {
      return (
        <div className="container" key={product._id}>
          <div className="profile-1">
            <Link to={`user/${product.writer._id}`}>
              <Avatar src={product.writer.image} />
            </Link>
            <div className="user">
              <p className="displayname">
                {product.writer.name}
                <Tooltip arrow={true}
                  title={moment(product.createdAt).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                >
                  <span className="producttimestamp">
                    {moment(product.createdAt).fromNow()}
                  </span>
                </Tooltip>
              </p>
              <p className="username"> {product.writer.email} </p>
            </div>
          </div>
          <div className="image">
            <Link className="header" to={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </Link>
          </div>
          <div className="post-info">
            <div className="header">{product.title}</div>
            <div className="caption">{product.description}</div>
          </div>
          <div className="readmore" onClick={handleclick}>
            Done.
          </div>
        </div>
      );
    }
  });

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(variables);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = (newSearchTerm) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);

    getProducts(variables);
  };

  getUserData();

  let dataImage = localStorage.getItem("fileBase64");

  return (
    <>
      <div>
        <div className="navbar">
          <div className="hamburger">
            <label
              htmlFor="side"
              onClick={() => setmodalIsOpen(true)}
              className="label"
            >
              <MenuIcon />
            </label>
            <input type="checkbox" id="side" />
          </div>
          <Link to="/" className="homemainlink">
            <div className="brand">
              Quink <span className="brand-post">Post.</span>
            </div>
          </Link>

          <div className="search">
            <label htmlFor="search"></label>
            <SearchFeature
              refreshFunction={updateSearchTerms}
              type="text"
              className="mainLoginInput"
            />
          </div>

          <div className="profile">
            <Link to="/user/profile">
              <Avatar src={dataImage} />
            </Link>
          </div>
        </div>
        <Link to="/user/originals" className="homemainlink">
          <div className="originals">Originals</div>
        </Link>
        <div className="sidebar">
          <Link to="/" className="link">
            <div className="li-p">
              <HomeRoundedIcon className="icons home-icon" /> Home
            </div>
          </Link>

          <div className="li-p">
            <CheckBox
              list={continents}
              handleFilters={(filters) => handleFilters(filters, "continents")}
            />
          </div>

          <Link to="/interview" className="link">
            <div className="li-p">
              <PeopleOutlineRoundedIcon className="icons interview-icon" />
              Magazines
            </div>
          </Link>
          <Link to="/community" className="link">
            <div className="li-p">
              <SupervisedUserCircleRoundedIcon className="icons community-icon" />
              Community
            </div>
          </Link>
        </div>
        <div className="sideToggle" onClick={() => setmodalIsOpen1(true)}>
          <MoreVertIcon />
        </div>
        <div>
          <Modal ariaHideAp={false} isOpen={modalIsOpen1} className="modal1">
            <div className="sidebar-secondary-1">
              <Link to="/product/upload" className="link2">
                <div
                  className="post-new"
                  onClick={() => setmodalIsOpen1(false)}
                >
                  <AddCircleRoundedIcon
                    className="post-icon"
                    style={{ fontSize: 35, fontWeight: "bolder" }}
                  />
                  <div>Post</div>
                </div>
              </Link>
              <div className="trend">
                <Link to='/challenges' style={{ textDecoration: 'none', color: 'black' }}>
                  <div className="trend-1">
                    <TrendingUpIcon className="icons" />
                  challenges
                </div>
                </Link>
                <div className="trend-1">
                  <DevicesIcon className="icons" />
                  technology
                </div>
                <div className="trend-1">
                  <LocalActivityIcon className="icons" />
                  fashion
                </div>
                <div className="trend-1">
                  <NextWeekIcon className="icons" />
                  buisness
                </div>
                <div className="trend-1">
                  <AssistantIcon className="icons" />
                  entertainment
                </div>
              </div>
              <div className="noti">
                <div className="noti-item">Welcome {username}</div>
                <div className="noti-item">
                  <Link className="link2" to="/user/profile">
                    Update Profile
                  </Link>
                </div>
                <div className="noti-item logout">

                  <RightMenu />
                </div>
              </div>
              <div className="close" onClick={() => setmodalIsOpen1(false)}>
                <CancelPresentationIcon className="close-icon" />
              </div>
            </div>
          </Modal>
        </div>

        <div>
          <Modal ariaHideApp={false} isOpen={modalIsOpen} className="modal">
            <div className="modal-sidebar">
              <Link to="/user/originals" className="homemainlink">
                <div
                  className="originals-modal"
                  onClick={() => setmodalIsOpen(false)}
                >
                  Originals
                </div>
              </Link>
              <Link to="/" className="link">
                <div
                  className="li-p-modal"
                  onClick={() => setmodalIsOpen(false)}
                >
                  <HomeRoundedIcon className="icons home-icon" />
                  Home
                </div>
              </Link>
              <div className="li-p li-p-checkbox">
                <CheckBox
                  list={continents}
                  handleFilters={(filters) =>
                    handleFilters(filters, "continents")
                  }
                />
              </div>

              <Link to="/interview" className="link">
                <div
                  className="li-p-modal"
                  onClick={() => setmodalIsOpen(false)}
                >
                  <PeopleOutlineRoundedIcon className="icons interview-icon" />
                  Magazines
                </div>
              </Link>
              <Link to="/community" className="link">
                <div
                  className="li-p-modal"
                  onClick={() => setmodalIsOpen(false)}
                >
                  <SupervisedUserCircleRoundedIcon className="icons community-icon" />
                  Community
                </div>
              </Link>

              <div className="close" onClick={() => setmodalIsOpen(false)}>
                <CancelPresentationIcon className="close-icon" />
              </div>
            </div>
          </Modal>
        </div>
      </div>

      <Sidebar />

      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>No post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            <div className="feed">{renderCards}</div>
          </Row>
        </div>
      )}
      <br />
      <br />
    </>
  );
}

export default LandingPage;
