import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Dishcard = ({
  id,
  dishName,
  description,
  image,
  polledDishHandler,
  selected,
}) => {
  const [rank1Selected, setRank1Selected] = useState(
    selected?.rank === 30 ? true : false
  );
  const [rank2Selected, setRank2Selected] = useState(
    selected?.rank === 20 ? true : false
  );
  const [rank3Selected, setRank3Selected] = useState(
    selected?.rank === 10 ? true : false
  );

  const handlePolling = (rank) => {
    if (rank === 30) {
      setRank1Selected(!rank1Selected);
      setRank2Selected(false);
      setRank3Selected(false);
    } else if (rank === 20) {
      setRank1Selected(false);
      setRank2Selected(!rank2Selected);
      setRank3Selected(false);
    } else if (rank === 10) {
      setRank1Selected(false);
      setRank2Selected(false);
      setRank3Selected(!rank3Selected);
    }

    polledDishHandler({ id, rank });
  };

  return (
    <Card sx={{ maxWidth: 345, height: "100%" }}>
      <CardMedia sx={{ height: 140 }} image={image} title={description} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {dishName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="larger"
          variant="contained"
          onClick={() => handlePolling(30)}
          sx={{ bgcolor: rank1Selected ? "yellow" : "primary" }}
        >
          Rank 1
        </Button>
        <Button
          size="larger"
          variant="contained"
          onClick={() => handlePolling(20)}
          sx={{ bgcolor: rank2Selected ? "yellow" : "primary" }}
        >
          Rank 2
        </Button>
        <Button
          size="larger"
          variant="contained"
          onClick={() => handlePolling(10)}
          sx={{ bgcolor: rank3Selected ? "yellow" : "primary" }}
        >
          Rank 3
        </Button>
      </CardActions>
    </Card>
  );
};

export default Dishcard;
