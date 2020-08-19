import React, { Component } from "react";
import "./App.css";
import ResultsList from "./components/ResultsList";
import SearchBar from "./components/SearchBar";
import { Box, CircularProgress, Typography } from "@material-ui/core";

class App extends Component {
  state = {
    isSearching: false,
    data: null,
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
        <Typography variant="h1">Avoid The Crowd! 🏃</Typography>
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
      </div>
    );
  }
}

export default App;
