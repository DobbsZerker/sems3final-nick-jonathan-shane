//Author: Nicholas Dobbin. april 11th start.  revisions: added check for existing users (april 15th) ND, Added comments to the code (april 15th)

import { useState, useEffect } from "react";
import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

/*********************************************REGISTRATION***********************************************************/
//Funtion enables the ability for users to create a new account.
export default function Registration() {
  const [username, setUserName] = useState(""); //This sets the username, email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ListOfUsers, setListOfUsers] = useState(""); //this sets the list of users from the data base
  const loggedin = false;
  useEffect(() => {
    // this gets the users from the database
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);
  /*********************************************SUBMIT HANDLERS***********************************************************/
  //These handle setting all passed information from the user and handles subbmitted information to control what the program will do on correct or incorrect passed information.
  const [submitted, setSubmitted] = useState(false); // this will set the message that needs to be displayed on what the user does, either blank fields or attempting to create an already existing user
  const [error, setError] = useState(false);
  const [registerError, setregisterError] = useState(false);

  const handleUserName = (e) => {
    //handle username , email and password handles the data submitted by the user and sets it so we can create a account for them.
    setUserName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  const onSubmit = (e) => {
    // this handles the submit by the user, checks for emtpy fields, existing users and then will make an option for either making the account telling the user that account already exists or if the fields are empty
    e.preventDefault();
    if (username === "" || password === "" || email === "") {
      setError(true); // displays error message for empty fields
    } else {
      setSubmitted(true); //this displays that the information is correct and account was registered
      setError(false);
      Axios.post("http://localhost:3001/addUser", {
        // this adds the user to the database
        username,
        email,
        password,
        loggedin,
      });
    }
  };

  /*********************************************MESSAGES***********************************************************/
  // The messages displays depending on the passed information. succesful registration, existing user or empty fields
  const successMessage = () => {
    // this displays a success message if the name is correctly submitted
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>Your account has been successfully registered</h1>
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
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    /*********************************************REGISTER FORM***********************************************************/
    // this section is the built form to handle the information that the user passes to create a new account and displays the success or error messages
    <div className="form">
      <div>
        <h1>User Registration</h1>
        <h3>
          <button className="btn" type="login">
            <Link to="/">Already have an account?</Link>
          </button>
        </h3>
      </div>

      <div className="messages">
        {errorMessage()}
        {successMessage()}
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

        <label className="label">Email</label>
        <input
          onChange={handleEmail}
          className="input"
          value={email}
          placeholder="email"
          type="text"
        />

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
