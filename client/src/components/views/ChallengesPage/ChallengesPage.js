import React from "react";
import "../style/ChallengesPage.css";
import artice from "../images/articlechallenge.jpg";
import poem from "../images/poemchallenge.jpg";
import quote from "../images/quotechallenge.jpg";
import { Link } from "react-router-dom";

function ChallengesPage() {
  return (
    <>
      <h2
        style={{
          fontSize: "34px",
          fontFamily: "sans-serif",
          margin: "auto",
          textAlign: "center",
          padding: "5px",
        }}
      >
        On-Going Challenges
      </h2>
      <div className="body-challenge">
        <div className="container-challenge">
          <div className="card-challenge">
            <div className="imgBx">
              <img
                alt=""
                src={quote}
                style={{ height: "150px", width: "100%" }}
              />
            </div>
            <div className="content-challenge">
              <h2>Quote Challenge</h2>
              <p>
                Submit your Quotes and get a chance to win exciting cash prizes,
                gift rewards. The deadline to submit will be 1st February 2021.
                The result will be declared online on the site and the winners
                will be given a chance to meet with the panelists. Every
                participant will get certificate.
              </p>
              <Link to="/challenges/participate">
                <button>Participate</button>
              </Link>
            </div>
          </div>
          <div className="card-challenge">
            <div className="imgBx">
              <img
                alt=""
                src={artice}
                style={{ height: "150px", width: "100%" }}
              />
            </div>
            <div className="content-challenge">
              <h2>Article Challenge</h2>
              <p>
                Submit your Article and get a chance to win exciting cash
                prizes, gift rewards. The deadline to submit will be 1st
                February 2021. The result will be declared online on the site
                and the winners will be given a chance to meet with the
                panelists. Every participant will get certificate.
              </p>
              <Link to="/challenges/participate">
                <button>Participate</button>
              </Link>
            </div>
          </div>
          <div className="card-challenge">
            <div className="imgBx">
              <img
                alt=""
                src={poem}
                style={{ height: "150px", width: "100%" }}
              />
            </div>
            <div className="content-challenge">
              <h2>Poem Challenge</h2>
              <p>
                Submit your Poem and get a chance to win exciting cash prizes,
                gift rewards. The deadline to submit will be 1st February 2021.
                The result will be declared online on the site and the winners
                will be given a chance to meet with the panelists. Every
                participant will get certificate.
              </p>
              <Link to="/challenges/participate">
                <button>Participate</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChallengesPage;
