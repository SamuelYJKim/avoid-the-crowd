import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

export const Search = (props) => {
  const [searchText, setSearchText] = useState("");
  const [latitude, setLat] = useState(0);
  const [longitude, setLong] = useState(0);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      alert("Please enable location services in your browser");
    }
  };

  getLocation();

  const getPlaces = async (latitude, longitude, keyword) => {
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

  return (
    <form>
      <TextField
        id="location-search"
        label="Where to?"
        onChange={(event) => setSearchText(event.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        disableElevation
        onClick={() => getPlaces(latitude, longitude, searchText)}
      >
        search
      </Button>
    </form>
  );
};

export default Search;
