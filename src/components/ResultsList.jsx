import React, { Component } from "react";
import { Box } from "@material-ui/core";
import PlaceCard from "./PlaceCard.jsx";

class ResultsList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let max;
    if (this.props.locationData) {
      max = this.props.locationData.length;
    } else {
      max = 0;
    }

    let places = [];
    for (let i = 0; i < max; i++) {
      places.push(<PlaceCard placeData={this.props.locationData[i]} />);
    }

    return (
      <Box component="span" m={1}>
        {places}
      </Box>
    );
  }
}

export default ResultsList;
