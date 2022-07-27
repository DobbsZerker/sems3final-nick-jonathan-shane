//Author: Nicholas Dobbin. april 13th start. Added comments to the code (April 15th) ND

import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

/*********************************************LOGIN***********************************************************/
//this function allows the user to login in to existing users
export default function Login() {
  const [username, setUserName] = useState(""); //This sets the username and password
  const [password, setPassword] = useState("");
  const [ListOfUsers, setListOfUsers] = useState(""); // this sets the users from the database
  const google = () => {
    window.open("http://localhost:3001/auth/google", "_self"); // allows users to log in with google
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      // this gets the users from the database
      setListOfUsers(response.data);
    });
  }, []);
  /*********************************************SUBMIT HANDLERS***********************************************************/
  //These handle setting all passed information from the user and handles subbmitted information to control what the program will do on correct or incorrect passed information.
  const [submitted, setSubmitted] = useState(false); // This sets the response state for if the user logs in or information is incorrect such as wrong info, or empty fields
  const [error, setError] = useState(false);
  const [loginerror, setloginError] = useState(false);

  const handleUserName = (e) => {
    // this sets the user's submits for their username and password
    setUserName(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const onSubmit = (e) => {
    // this handles all passed information for the login to compare if the user exists and then allows a log in or lets the user know the information is incorrect.
    e.preventDefault();
    if (username === "" || password === "") {
      setError(true);
    } else {
      setError(false);
      var userinfo = ListOfUsers.find((users) => {
        // this pulls the the user from the database and sets it in a variable.
        return users.username === username;
      });

      if (
        username === userinfo.username && // checks to make sure both username and password match.
        password === userinfo.password
      ) {
        userinfo.loggedin = true; // sets the login state.
      } else {
        userinfo.loggedin = false;
      }
      if (userinfo.loggedin === true) {
        var profile = [
          { username: userinfo.username, loggedin: userinfo.loggedin },
        ];
        sessionStorage.setItem("userProfile", JSON.stringify(profile));

      
        setSubmitted(true); // sets the state if there is to be a error message or success message
        setloginError(false);
      } else {
        setloginError(true);
      }
    }
  };
  /*********************************************MESSAGES***********************************************************/
  // The messages displays depending on the passed information. correct login, incorrect login or empty fields
  const successMessage = () => {
    // this displays a success message if the name is correctly submitted
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>Your account has been successfully logged in</h1>
        <Link to="/Songs"> Search database </Link>
      </div>
    );
  };

  const errorMessage = () => {
    // this displays if the fields are empty
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Information incorrect Please enter all the fields</h1>
      </div>
    );
  };

  const loginerrorMessage = () => {
    // this displays if there is a log in error
    return (
      <div
        className="error"
        style={{
          display: loginerror ? "" : "none",
        }}
      >
        <h1>incorrect log-in</h1>
      </div>
    );
  };

  return (
    /*********************************************LOGIN FORM***********************************************************/
    // this section is the built form to handle the information that the user passes to log in to the account and displays the success or error messages
    <div className="form">
      <div>
        <h1>User Login</h1>
        <h3>Log in with google</h3>
        <button className="btn" onClick={google}>
          Google
        </button>
        <h3>Not signed up yet? </h3>
        <button className="btn" type="login">
          <Link to="/registration"> sign up</Link>
        </button>
      </div>

      <div className="messages">
        {errorMessage()}
        {successMessage()}
        {loginerrorMessage()}
      </div>

      <form onSubmit={onSubmit}>
        <label className="label">Name</label>
        <input
          onChange={handleUserName}
          className="input"
          value={username}
          placeholder="User"
          type="text"
        />

        {/* <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          placeholder="email"
          type="text"
        /> */}

        <label className="label">Password</label>
        <input
          onChange={handlePassword}
          className="input"
          value={password}
          placeholder="Password"
          type="password"
        />

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
