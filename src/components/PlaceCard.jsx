import React, { Component } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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
    const classes = useStyles();
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="h2">
            {this.state.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {this.state.address}
          </Typography>
          <Typography variant="body2" component="p">
            {this.state.busy}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
  }
}

export default PlaceCard;
