import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./LogData.css";

/**************************LOG DATA FUNCTION************************************************ */
/*this function fetches the user log data (username, searchterm and date) that was logged to the mongo database,
sets it as ListofLogData then maps array for display*/
export default function LogData() {
  const [listOfLogData, setListOfLogData] = useState([{}]);
  useEffect(() => {
    Axios.get("http://localhost:3001/getLogData").then((response) => {
      setListOfLogData(response.data);
    });
  }, []);
  return (
    <div>
      {listOfLogData.map((log) => {
        return (
          <div className="logList" log={log}>
            <p>Username: {log.username}</p>
            <p>Search term: {log.searchTerm}</p>
            <p>Date: {log.create_at}</p>
          </div>
        );
      })}
    </div>
  );
}
