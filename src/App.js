import React, { Component } from "react";
import "./App.css";
import ResultsList from "./components/ResultsList";
import SearchBar from "./components/SearchBar";
import { Box, CircularProgress, Typography } from "@material-ui/core";

class App extends Component {
  state = {
    isSearching: false,
    data: [
      [
        -2,
        "Low",
        "Budapest Bistro",
        "12926 Mukilteo Speedway, Lynnwood",
        "https://lh3.googleusercontent.com/p/AF1QipPXKzuSoloTnxluvTSppF1V5MS0vbn6krC2H9kj=s1600-w400",
      ],
      [
        -2,
        "Low",
        "Chiangmai Thai Restaurant",
        "12926 Mukilteo Speedway, Lynnwood",
        "https://lh3.googleusercontent.com/p/AF1QipMEYulgofzCJ-7uakzWBscl2Olo9QK6swOOjap1=s1600-w400",
      ],
      [
        -2,
        "Low",
        "Taqueria Guadalajara",
        "13303 Pacific Hwy, Everett",
        "https://lh3.googleusercontent.com/p/AF1QipMXnNk9i-1hVafpSE5stDAcC3ynvOuXIt_KaXU4=s1600-w400",
      ],
      [
        -1,
        "Below average",
        "Philly Ya Belly",
        "12432 Hwy 99 UNIT 65, Everett",
        "https://lh3.googleusercontent.com/p/AF1QipO9ca4jD-mMKTWJZbhUp1H9xEvojTPMGvvs6BkX=s1600-w400",
      ],
      [
        0,
        "Average",
        "Dairy Queen Grill & Chill",
        "3614 121st St SW, Lynnwood",
        "https://lh3.googleusercontent.com/p/AF1QipNxSfJ1fqqsN1sKCyBxo3aiZYvwaZmtsBtyuoww=s1600-w400",
      ],
      [
        0,
        "Average",
        "El Taco Maestro",
        "13526 Hwy 99, Everett",
        "https://lh3.googleusercontent.com/p/AF1QipP6VFAPc8fFkOlCM1tq2fskxYU4f8S-RspUKuj3=s1600-w400",
      ],
      [
        0,
        "Average",
        "Nori Teriyaki @Mukilteo",
        "12502 Mukilteo Speedway # 104, Mukilteo",
        "https://lh3.googleusercontent.com/p/AF1QipN6eIQYFucdIe0_pyswpg97voTzIUDJ9FfbhvGO=s1600-w400",
      ],
      [
        1,
        "Above average",
        "Taco Time NW",
        "12822 Mukilteo Speedway #27, Lynnwood",
        "https://lh3.googleusercontent.com/p/AF1QipMPrKSYKX1su9MJ-XmqfHH2yJKGVnzridUkQZM=s1600-w400",
      ],
    ],
  };

  switchSearchingStatus = (searching) => {
    this.setState({ isSearching: searching });
  };

  handleSearch = (data) => {
    this.setState({ data: data });
    if (data) {
      this.switchSearchingStatus(false);
    }
  };

  render() {
    return (
      <div className="App">
        <Typography variant="h1">
          Avoid The Crowd!{" "}
          <span role="img" aria-label="runner emoji">
            🏃
          </span>
        </Typography>
        <br />
        <SearchBar
          handleSearch={this.handleSearch}
          switchSearchingStatus={this.switchSearchingStatus}
        />
        {this.state.isSearching ? (
          <>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <CircularProgress size={200} />
          </>
        ) : (
          <Box width={1 / 2} mx="auto">
            <ResultsList locationData={this.state.data} />
          </Box>
        )}
        {/**
          <div class="footer">
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/smalllikeart"
            title="smalllikeart"
          >
            smalllikeart
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        */}
      </div>
    );
  }
}

export default App;
