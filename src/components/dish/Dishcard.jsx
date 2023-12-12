import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useContext } from "react";
import { UserContext } from "./../../Contexts/Context";

const Dishcard = ({ id, dishName, description, image, polledDishHandler }) => {
  const { userState } = useContext(UserContext);
  const handlePolling = (rank) => {
    console.log(userState);
    polledDishHandler({ id, rank });
  };

  return (
    <Card sx={{ maxWidth: 345,height: '100%' }}>
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
          value={30}
          onClick={() => handlePolling(30)}
        >
          Rank 1
        </Button>
        <Button
          size="larger"
          variant="contained"
          value={20}
          onClick={() => handlePolling(20)}
        >
          Rank 2
        </Button>
        <Button
          size="larger"
          variant="contained"
          value={10}
          onClick={() => handlePolling(10)}
        >
          Rank 3
        </Button>
      </CardActions>
    </Card>
  );
};

export default Dishcard;
