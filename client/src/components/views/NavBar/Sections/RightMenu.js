import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <div mode={props.mode}>
        <div key='mail'>
          <a href='/login' style={{textDecoration: 'none', color: 'black'}}>Sign In</a>
        </div>
      </div>
    )
  } else {
    return (
      <div mode={props.mode}>
        <div key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </div>
      </div>
    )
  }
}

export default withRouter(RightMenu);

