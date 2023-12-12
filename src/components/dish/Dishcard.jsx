import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

const Dishcard = ({ id, dishName, description, image }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
        <Button size="small">Rank 1</Button>
        <Button size="small">Rank 2</Button>
        <Button size="small">Rank 3</Button>
      </CardActions>
    </Card>
  );
};

export default Dishcard;
