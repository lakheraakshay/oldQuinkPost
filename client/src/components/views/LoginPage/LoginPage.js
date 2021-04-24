import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import "../style/loginpage.css";

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const initialEmail =
    localStorage.getItem("rememberMe") !== "undefined"
      ? localStorage.getItem("rememberMe")
      : "";

  return (
    <>
      <Formik
        initialValues={{
          email: initialEmail,
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            let dataToSubmit = {
              email: values.email,
              password: values.password,
            };

            dispatch(loginUser(dataToSubmit))
              .then((response) => {
                if (response.payload.loginSuccess) {
                  window.localStorage.setItem(
                    "userId",
                    response.payload.userId
                  );
                  if (rememberMe === true) {
                    window.localStorage.setItem("rememberMe", values.id);
                  } else {
                    localStorage.removeItem("rememberMe");
                  }
                  props.history.push("/");
                } else {
                  setFormErrorMessage(
                    "Check out your Account or Password again"
                  );
                }
              })
              .catch((err) => {
                setFormErrorMessage("Check out your Account or Password again");
                setTimeout(() => {
                  setFormErrorMessage("");
                }, 3000);
              });
            setSubmitting(false);
          }, 500);
        }}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div className="app">
              <div className="loginpage">
                <div className="loginbox">
                  <h1>Quink-Post</h1>
                  <div className="info-box">
                    <form onSubmit={handleSubmit}>
                      <Form.Item required>
                        <label htmlFor="username">
                          <b>Email:</b>
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.email && touched.email
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.email && touched.email && (
                          <div className="input-feedback">{errors.email}</div>
                        )}
                      </Form.Item>

                      <Form.Item required>
                        <label htmlFor="password">
                          <b>Password:</b>
                        </label>
                        <Input
                          id="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password
                              ? "text-input error"
                              : "text-input"
                          }
                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">
                            {errors.password}
                          </div>
                        )}
                      </Form.Item>

                      {formErrorMessage && (
                        <label>
                          <p
                            style={{
                              color: "#ff0000bf",
                              fontSize: "0.7rem",
                              border: "1px solid",
                              padding: "1rem",
                              borderRadius: "10px",
                            }}
                          >
                            {formErrorMessage}
                          </p>
                        </label>
                      )}

                      <Form.Item>
                        <span>
                          <input
                            type="checkbox"
                            id="rememberMe"
                            onChange={handleRememberMe}
                            checked={rememberMe}
                          />
                          Remember me
                        </span>
                        <div>
                          <button
                            type="primary"
                            htmltype="submit"
                            className="button-login"
                            style={{ minWidth: "100%" }}
                            disabled={isSubmitting}
                            onSubmit={handleSubmit}
                          >
                            Log in
                          </button>
                        </div>
                        Or
                        <Link
                          to="/register"
                          style={{ textDecoration: "none", paddingLeft: '4px' }}
                        >
                          Register Now!
                        </Link>
                      </Form.Item>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
      <div className="login-background">
        <div>
          <h4 className="text-challenge-home">
            Accept the Challenge and win exciting prizes
            <span>
              <Link to="/challenges" style={{ paddingLeft: '7px', textDecoration: "none" }}>
                Participate Now
              </Link>
            </span>
          </h4>
        </div>
        <div>
          <h4 className="text-app-home">Download the App now</h4>
        </div>
        <h1 className="homepage-text" data-text="QuinkPost">
          QuinkPost
        </h1>
      </div>
    </>
  );
}

export default withRouter(LoginPage);
