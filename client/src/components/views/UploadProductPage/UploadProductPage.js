import React, { useState } from "react";
import { Input} from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import "../style/CreatePost.css";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import { Link } from "react-router-dom";

const Continents = [
  { key: 1, value: "Shorts" },
  { key: 2, value: "Quinks" }
];

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState("");
  const [ContinentValue, setContinentValue] = useState(1);

  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onContinentsSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !Images
    ) {
      return alert("fill all the fields first!");
    }

    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      continents: ContinentValue,
    };

    Axios.post("/api/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded");
        props.history.push("/");
      } else {
        alert("Failed to upload Product");
      }
    });
  };

  return (
    <div className="createpost">
      <div className="createpost-header">Create Post</div>
      <Link to="/">
        <div className="createpost-home">
          <HomeRoundedIcon />
        </div>
      </Link>
      <div className="createpost=form">
        <form className="form-inner" onSubmit={onSubmit}>
          <div className="add-post-dropzone">
            <FileUpload name='file' refreshFunction={updateImages} /> 
            </div>
          

          <br />

          <label htmlFor="header-newpost" className="label-newpost">
            Header:
          </label>
          <Input
            className="textarea"
            onChange={onTitleChange}
            value={TitleValue}
          />

          <label htmlFor="caption-newpost" className="label-newpost">
            Caption
          </label>
          <Input
            onChange={onPriceChange}
            value={PriceValue}
            className="textarea"
          />
          <br />

          <label htmlFor="body-newpost" className="label-newpost">
            Body:
          </label>
          <textarea
            name="body"
            id="body-newpost"
            cols="30"
            rows="10"
            className="textarea"
            onChange={onDescriptionChange}
            value={DescriptionValue}
          ></textarea>

          <br />

          <select onChange={onContinentsSelectChange} value={ContinentValue} className="select-type">
            {Continents.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}{" "}
              </option>
            ))}
          </select>
          <button className="newpostbutton" onClick={onSubmit}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default UploadProductPage;
