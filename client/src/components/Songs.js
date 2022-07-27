import { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

/*************************************** SONGS FUNCTION **************************************************/
/*the songs function sets all the states for consts (react), it fetches all the song data from both databases for
rendering. Once the user selects the desired database (mongo, postgres or both) the list of songs in the database is 
mapped then displayed, the user can then filter through the data to retreive the matching song. 
 */
export default function Songs() {
  let userProfile = JSON.parse(sessionStorage.getItem("userProfile"));
  const [searchTerm, setSearchTerm] = useState("");
  const [listOfSongs, setListOfSongs] = useState([{}]);
  const [listOfSongsPg, setListOfSongsPg] = useState([{}]);
  const [listOfData, setListOfData] = useState([{}]);
  const [choice, setChoice] = useState("");
  const create_at = Date.now();
  const username = userProfile[0].username;

  const log_out = () => {
    (userProfile[0].loggedin = false),
      sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  let listOfSongsOutputHTML = [];
  useEffect(() => {
    Axios.get("http://localhost:3001/getSongs").then((response) => {
      setListOfSongs(response.data);
    });
  }, []);

  useEffect(() => {
    getSongsPg();
  }, []);

  function getSongsPg() {
    fetch("http://localhost:3001/getSongsPg")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setListOfSongsPg(data);
      });
  }
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

  if (choice === "postgres") {
    listOfSongsOutputHTML = listOfSongsPg;
  } else if (choice === "mongodb") {
    listOfSongsOutputHTML = listOfSongs;
  } else if (choice === "both") {
    listOfSongsOutputHTML = listOfSongsPg.concat(listOfSongs);
  }
  if (userProfile[0].loggedin === true) {
    return (
      <div>
        <button onClick={log_out}>
          <Link to="/"> log out </Link>{" "}
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
          {listOfSongsOutputHTML
            .filter((song) => {
              if (
                song.song_name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          ;
        </div>
      </div>
    );
  } else if (
    userProfile[0].loggedin === false ||
    userProfile === null ||
    userProfile === undefined
  )
    return;
  {
    <h1>Not authorized</h1>;
  }
}
