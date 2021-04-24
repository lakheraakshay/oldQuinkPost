import React, { useState } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import Axios from "axios";

function ParticipatePage(props) {
  const [NameValue, setNameValue] = useState("");
  const [MailValue, setMailValue] = useState("");
  const [ContentValue, setContentValue] = useState("");
  const [ChallengeValue, setChallengeValue] = useState(1);

  const challengeList = [
    { key: 1, value: "Quote Challenge" },
    { key: 2, value: "Article Challenge" },
    { key: 3, value: "Poem Challenge" },
  ];

  const onNameChange = (event) => {
    setNameValue(event.currentTarget.value);
  };

  const onMailChange = (event) => {
    setMailValue(event.currentTarget.value);
  };

  const onContentChange = (event) => {
    setContentValue(event.currentTarget.value);
  };

  const onChallengeSelectChange = (event) => {
    setChallengeValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!NameValue || !MailValue || !ContentValue || !ChallengeValue) {
      return alert("fill all the fields first!");
    }

    const variables = {
      name: NameValue,
      mail: MailValue,
      participationCategory: ChallengeValue,
      content: ContentValue,
    };

    Axios.post("/api/participate/participate", variables).then((response) => {
      if (response.data.success) {
        alert("Challenge Successfully Accepted");
        props.history.push("/challenges");
      } else {
        alert("Failed to accept Challenge");
      }
    }).catch((e) => {
      console.log(e);
      console.log('Axios Error')
    })
  };

  return (
    <>
      <div className="createpost">
        <div className="createpost-header">Accept the Challenge</div>
        <Link to="/">
          <div className="createpost-home">
            <HomeRoundedIcon />
          </div>
        </Link>
        <div className="createpost=form">
          <form method='POST' className="form-inner" onSubmit={onSubmit}>
            <br />

            <label htmlFor="header-newpost" className="label-newpost">
              Name
            </label>
            <Input
              className="textarea"
              onChange={onNameChange}
              value={NameValue}
            />

            <label htmlFor="caption-newpost" className="label-newpost">
              E-Mail
            </label>
            <Input
              className="textarea"
              onChange={onMailChange}
              value={MailValue}
            />
            <br />

            <label htmlFor="body-newpost" className="label-newpost">
              Content
            </label>
            <textarea
              name="body"
              id="body-newpost"
              cols="30"
              rows="10"
              className="textarea"
              onChange={onContentChange}
              value={ContentValue}
            ></textarea>

            <br />

            <select
              className="select-type"
              onChange={onChallengeSelectChange}
              value={ChallengeValue}
            >
              {challengeList.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            <button className="newpostbutton" onClick={onSubmit}>
              Post
            </button>
            <br />
          </form>
        </div>
      </div>
    </>
  );
}

export default ParticipatePage;
