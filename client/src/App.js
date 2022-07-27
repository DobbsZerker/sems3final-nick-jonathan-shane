/*************************
TITLE: FINAL SPRINT
DATE: 2022-04-21
Authors: TEAM #5
File Name: app.js

SCOPE: this React APP allows the user to register as new a new user to the song database. once registered, this login info
is saved to allow the user access. The user will then be requested to enter their new login credentials to proceed to the
search function. Once authenticated the user has the ability to search their desired database for songs via song name, artist or 
album. all seach queries and written to the database and can be accessed by the user for review. 

 * Features:
- Login Authentication
- MongoDB for songs, userinfo, and loginfo
- Postgres Db for song info
- Ability to toggle databases or seach both
- all search queries written to db 

Updates/patches:
- Version 1.0 released(2022-04-21)
-
-
 *************************/
import React from "react";
import Registration from "./components/registration";
import Songs from "./components/Songs";
import Login from "./components/Login";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Main from "./components/main";
import LogData from "./components/LogData";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/main" element={<Main />} />
          <Route exact path="/songs" element={<Songs />} />
          <Route exact path="/logdata" element={<LogData />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
