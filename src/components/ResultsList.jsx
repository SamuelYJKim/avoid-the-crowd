import React, { Component } from "react";
import { Button, Box } from "@material-ui/core";
import PlaceCard from "./PlaceCard.jsx";
class ResultsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    for (let i = 0; i < 5; i++) {
      this.state.list.push(<PlaceCard />);
    }
  }
  render() {
    // const elements = this.state.list.map((element) => (
    //   <Button color="primary">element</Button>
    // ));
    return (
      // <Button color="primary">Hello World</Button>
      <Box component="span" m={1}>
        {this.state.list}
      </Box>
    );
  }
}

export default ResultsList;
