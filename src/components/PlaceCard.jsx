import React, { useState } from "react";

import { ButtonBase, Paper, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  lowVersion: {
    background: "green",
  },
}));

export const PlaceCard = ({ placeData }) => {
  const classes = useStyles();
  const [name] = useState(placeData[2]);
  const [address] = useState(placeData[3]);
  const [busy] = useState(placeData[1]);
  const [photoUrl] = useState(placeData[4]);

  function determineColor(status) {
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
  }

  let str;
  if (busy === "Closed") {
    str = "";
  } else {
    str = "How Busy? ";
  }
  str += busy;
  const altText = "image for location " + name;
  console.log("determineColor", determineColor(busy));
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt={altText} src={photoUrl} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h5">
                  {name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {address}
                </Typography>
                <Typography variant="body2">{str}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default PlaceCard;
