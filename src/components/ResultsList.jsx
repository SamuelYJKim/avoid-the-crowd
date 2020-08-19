import React, { Component } from "react";
import { Box } from "@material-ui/core";
import PlaceCard from "./PlaceCard.jsx";

class ResultsList extends Component {
  render() {
    const placeCards = this.props.locationData?.map((placeData) => {
      return <PlaceCard placeData={placeData} />;
    });

    return (
      <Box component="span" m={1}>
        {placeCards}
      </Box>
    );
  }
}

export default ResultsList;
