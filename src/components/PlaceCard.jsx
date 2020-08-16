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
    };
  }

  render() {
    return (
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.state.name}
          </Typography>
          <Typography color="textSecondary">{this.state.address}</Typography>
          <br></br>
          <Typography variant="h5" component="h2">
            {this.state.busy}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default PlaceCard;
