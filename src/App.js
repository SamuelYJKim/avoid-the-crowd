import React, { Component } from "react";
import "./App.css";
import ResultsList from "./components/ResultsList";
import Search from "./components/Search";
import { Box, Typography } from "@material-ui/core";
import { positions } from "@material-ui/system";

class App extends Component {
  state = {
    data: null,
  };

  handleSearch = (data) => {
    this.setState({ data: data });
  };

  render() {
    return (
      <div className="App">
        <Typography variant="h1">Avoid The Crowd!</Typography>
        <Search className="searchbar" handleSearch={this.handleSearch} />
        <Box m={10} top={20}>
          <ResultsList locationData={this.state.data} />
        </Box>
      </div>
    );
  }
}

export default App;
