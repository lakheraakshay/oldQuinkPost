import React, { useState } from "react";
import { Form, Input } from "antd";
import "../style/loginpage.css";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../_actions/user_actions";
import Axios from "axios";

function ResetPassword(props) {

    const [Email, setEmail] = useState('')
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const dataToSubmit = {
            Email
        }
        // dispatch(resetPassword(dataToSubmit)).then(response => {
        //   if (response.payload.resetPassword) {
        //     props.history.push("/newPassword");
        //   } else {
        //     alert(response.payload.err.errmsg)
        //   }
        // })
    
        Axios.post('http://localhost:5000/api/users/resetPassword', dataToSubmit).then(response => {
          if(response.data.success) {
            console.log(response.data);
          } 
        }) .catch(error => {
          console.log(error);
        })
      }

        return (
          <div className="app">
            <div className="loginpage">
              <div className="loginbox">
                <h1>Quink-Post</h1>
                <div className="info-box">
                  <form onSubmit={handleSubmit} >
                    <Form.Item required>
                      <label htmlFor="username"><b>Email:</b></label>
                      <Input
                        id="email"
                        type="email"
                        value={Email}
                        onChange={handleChange}
                      />
                      
                    </Form.Item>
                    <Form.Item>
                      <div>
                        <button
                          type="primary"
                          htmlType="submit"
                          className="button-login"
                          style={{ minWidth: "100%" }}
                          onSubmit={handleSubmit}
                        >
                            Send Email
                        </button>
                      </div>
                     
                    </Form.Item>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
    }
export default ResetPassword;
