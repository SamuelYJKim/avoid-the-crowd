import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export const SearchBar = (props) => {
  const [searchText, setSearchText] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const classes = useStyles();

  useEffect(() =>
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    })
  );

  const isInvalidLocation = () =>
    !latitude || !latitude || latitude === 0 || longitude === 0;

  const getPlaces = async (latitude, longitude, keyword) => {
    //const apiUrl = "https://avoid-the-crowd.wl.r.appspot.com/places/";
    const apiUrl = "http://localhost:5000/places/";
    const paramsURL = latitude + "/" + longitude + "/" + keyword;
    const requestUrl = apiUrl + paramsURL;
    try {
      fetch(requestUrl, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            props.handleSearch(data);
          });
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalidLocation()) {
      alert("Please enable location services and refresh");
    } else {
      props.switchSearchingStatus(true);
      getPlaces(latitude, longitude, searchText);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Where to?"
            inputProps={{ "aria-label": "search to avoid the crows" }}
            onChange={(event) => setSearchText(event.target.value)}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            color="primary"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </form>
    </div>
  );
};

export default SearchBar;
