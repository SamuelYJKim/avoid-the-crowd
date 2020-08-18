import React, { Component } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

class PlaceCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.placeData[2],
      address: this.props.placeData[3],
      busy: this.props.placeData[1],
      photoUrl: this.props.placeData[4],
    };
  }

  determineColor = () => {
    let status = this.state.busy;
    if (status === "Closed") {
      return "closedVersion";
    } else if (status === "Low") {
      return "lowVersion";
    } else if (status === "Below average") {
      return "belowAverageVersion";
    } else if (status === "Average") {
      return "averageVersion";
    } else if (status === "Above average") {
      return "aboveAverageVersion";
    } else {
      return "highVersion";
    }
  };

  render() {
    console.log("photoUrl", this.state.photoUrl);
    let str;
    if (this.state.busy === "Closed") {
      str = "";
    } else {
      str = "How Busy? ";
    }
    str += this.state.busy;
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h3" component="h2">
            {this.state.name}
          </Typography>
          <Typography variant="h5" color="textSecondary">
            {this.state.address}
          </Typography>
          <br></br>
          <Typography
            className={this.determineColor}
            variant="h4"
            component="h2"
          >
            {str}
          </Typography>
        </CardContent>
        <img src={this.state.photoUrl}></img>
      </Card>
    );
  }
}

export default PlaceCard;
