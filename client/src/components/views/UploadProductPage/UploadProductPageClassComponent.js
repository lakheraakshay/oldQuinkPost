import React, { Component } from "react";
import { Typography, Button, Form, Input } from "antd";
import axios from "axios";
import FileUpload from "../../utils/FileUpload";
import "../style/CreatePost.css";

const { Title } = Typography;

const Continents = [
  { key: 1, value: "Blog" },
  { key: 2, value: "Article" },
  { key: 3, value: "Meme" },
  { key: 4, value: "Poem" },
  { key: 5, value: "Quote" },
  { key: 6, value: "Story" },
  { key: 7, value: "Shayari" },
];

export class UploadProductPage extends Component {
  state = {
    title: "",
    description: "",
    continents: 1,
    images: [],
    price: 0,
  };

  handleChangeTitle = (event) => {
    this.setState({ title: event.currentTarget.value });
  };

  handleChangePrice = (event) => {
    this.setState({ price: parseInt(event.currentTarget.value, 10) });
  };

  handleChangeDecsription = (event) => {
    // console.log(event.currentTarget.value)
    this.setState({ description: event.currentTarget.value });
  };

  handleChangeContinents = (event) => {
    this.setState({ continents: event.currentTarget.value });
  };

  onSubmit = (event) => {
    event.preventDefault();

    if (this.props.user.userData && !this.props.user.userData.isAuth) {
      return alert("Please Log in First");
    }

    if (
      !this.state.title ||
      !this.state.description ||
      !this.state.continents ||
      !this.state.images ||
      !this.state.price
    ) {
      return alert("Please first fill all the fields");
    }

    const variables = {
      writer: this.props.user.userData._id,
      title: this.state.title,
      description: this.state.description,
      images: this.state.images,
      continents: this.state.continents,
      price: this.state.price,
    };

    axios.post("/api/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("video Uploaded Successfully");
        setTimeout(() => {
          this.props.history.push("/");
        }, 1000);
      } else {
        alert("Failed to upload video");
      }
    });
  };

  updateFiles = (newImages) => {
    this.setState({ images: newImages });
  };

  render() {
    return (
      <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title level={2}> Upload Travel Product</Title>
        </div>

        <Form onSubmit={this.onSubmit}>
          <FileUpload refreshFunction={this.updateFiles} />

          <br />
          <br />
          <label>Title</label>
          <Input onChange={this.handleChangeTitle} value={this.state.title} />
          <br />
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
            onChange={this.handleChangeDecsription}
            value={this.state.description}
          ></textarea>

          <br />
          <br />
          <label>Price($)</label>
          <Input
            type="number"
            onChange={this.handleChangePrice}
            value={this.state.price}
          />
          <br />
          <br />
          <select onChange={this.handleChangeContinents}>
            {Continents.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
          <br />
          <br />

          <Button type="primary" size="large" onClick={this.onSubmit}>
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default UploadProductPage;
