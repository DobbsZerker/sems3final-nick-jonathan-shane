import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import "./main.css";
import { Link } from "react-router-dom";

/*************************************** MAIN FUNCTION **************************************************/
/*the Main function is called when the user logs in through google and differs slightly from the songs function. 
It sets all the states for consts (react), it fetches all the song data from both databases for
rendering. Once the user selects the desired database (mongo, postgres or both) the list of songs in the database is 
mapped then displayed, the user can then filter through the data to retreive the matching song. 
 */
export default function Main() {
  const [searchTerm, setSearchTerm] = useState("");
  const [listOfSongs, setListOfSongs] = useState([{}]);

  const [listOfSongsPg, setListOfSongsPg] = useState([{}]);
  const [listOfData, setListOfData] = useState([{}]);
  const [choice, setChoice] = useState("");
  const create_at = Date.now();
  const [username, setUser] = useState(null);
  const [Auth, setAuth] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  /*************************************** GETTING USER DATA **************************************************/
  useEffect(() => {
    const getUser = () => {
      const fetch_config = {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      };
      fetch("http://localhost:3001/auth/login/success", fetch_config)
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          console.log("RES OBJECT:");
          console.log(resObject);
          setUser(resObject.user.displayName);
          setAuth(resObject.success);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  /*************************************** WRITING EVENTS TO LOG**************************************************/
  const handleSearchInputChange = (event) => {
    Axios.post("http://localhost:3001/logData", {
      username,
      searchTerm: event.target.value,
      create_at,
    }).then((response) => {
      setListOfData([
        ...listOfData,
        { username, searchTerm: event.target.value, create_at },
      ]);
    });
  };
  /**************************************GETTING SONG DATA **************************************************/
  let listOfSongsOutputHTML = [];
  useEffect(() => {
    Axios.get("http://localhost:3001/getSongs").then((response) => {
      setListOfSongs(response.data);
    });
  }, []);

  useEffect(() => {
    getSongsPg();
  }, []);
  /*************************************** GET SONGS(POSTGRES) FUNCTION **************************************************/
  /*the GET songs for postgres function fetches the songs that were rendered on the backend and sets the list of songs from 
postgres for further processing. 
 */
  function getSongsPg() {
    fetch("http://localhost:3001/getSongsPg")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListOfSongsPg(data);
      });
  }
  /*************************************** SETTING DATABASE **************************************************/
  if (choice === "postgres") {
    listOfSongsOutputHTML = listOfSongsPg;
  } else if (choice === "mongodb") {
    listOfSongsOutputHTML = listOfSongs;
  } else if (choice === "both") {
    listOfSongsOutputHTML = listOfSongsPg.concat(listOfSongs);
  }
  if (Auth === true) {
    return (
      <div>
        <button>
          <a href="http://localhost:3001/auth/logout">log out </a>
        </button>
        <div className="main">
          <div className="searchContainer">
            <h1 className="title">Sprinty's Song Database</h1>
            <div>
              <select
                className="dbSelect"
                onChange={(event) => {
                  const select = event.target;
                  setChoice(select.options[select.selectedIndex].value);
                }}
              >
                <option selected="selected" value="DEFAULT" disabled>
                  Choose a database...
                </option>
                <option value="mongodb">Mongo</option>
                <option value="postgres">PostGres</option>
                <option value="both">Both</option>
              </select>
            </div>
            <form onSubmit={handleSubmit} className="searchBar">
              <label>
                Search Song Database:
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    handleSearchInputChange(event);
                  }}
                />
              </label>
              <input type="submit" className="button" />
            </form>
            <div>
              <Link to="/logdata">Log Data</Link>
            </div>
          </div>
          <div>
            {listOfSongsOutputHTML
              .filter((song) => {
                if (
                  song.song_name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  song.artist
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  song.album.toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                  return song;
                }
              })
              .map((song) => {
                return (
                  <div className="songList" song={song}>
                    <p>Song Name: {song.song_name}</p>
                    <p>Artist: {song.artist}</p>
                    <p>Album: {song.album}</p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  } else {
    <h1>Not authorized</h1>;
  }
}
