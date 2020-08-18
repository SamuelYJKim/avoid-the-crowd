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
    const apiUrl = "https://avoid-the-crowd.wl.r.appspot.com/places/";
    const paramsURL = latitude + "/" + longitude + "/" + keyword;
	const requestUrl = apiUrl + paramsURL;
	console.log("requestUrl", requestUrl)
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
        placeholder="Where to?"
        onChange={(event) => setSearchText(event.target.value)}
        size={"large"}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          props.switchSearchingStatus(true);
          getPlaces(latitude, longitude, searchText);
        }}
      >
        search
      </Button>
    </form>
  );
};

export default Search;
