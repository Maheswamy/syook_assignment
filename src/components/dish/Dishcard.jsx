import React, { useState,useEffect } from "react";
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

const Dishcard = ({ id, dishName, description, image, polledDishHandler,slected }) => {
  const { userState } = useContext(UserContext);
  const handlePolling = (rank) => {
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
          style={{ backgroundColor: slected === 30 ? "yellow" : "primary" }}
        >
          Rank 1
        </Button>
        <Button
          size="larger"
          variant="contained"
          onClick={() => handlePolling(20)}
          style={{ backgroundColor: slected === 20 ? "yellow" : "primary" }}
        >
          Rank 2
        </Button>
        <Button
          size="larger"
          variant="contained"
          onClick={() => handlePolling(10)}
          style={{ backgroundColor: slected === 10 ? "yellow" : "primary" }}
        >
          Rank 3
        </Button>
      </CardActions>
    </Card>
  );
};

export default Dishcard;
