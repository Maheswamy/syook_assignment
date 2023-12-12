import React, { useState, useEffect } from "react";
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
  const [value, setValue] = useState(selected ? selected : null);

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
          style={{
            backgroundColor: value === 30 ? "yellow" : "primary",
          }}
        >
          Rank 1
        </Button>
        <Button
          size="larger"
          variant="contained"
          onClick={() => handlePolling(20)}
          style={{
            backgroundColor: value === 20 ? "yellow" : "primary",
          }}
        >
          Rank 2
        </Button>
        <Button
          size="larger"
          variant="contained"
          onClick={() => handlePolling(10)}
          style={{
            backgroundColor: value === 10 ? "yellow" : "primary",
          }}
        >
          Rank 3
        </Button>
        {/* <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Ranking</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={null}
            name="radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            <FormControlLabel value={30} control={<Radio />} label="Rank 1" />
            <FormControlLabel value={20} control={<Radio />} label="Rank 2" />
            <FormControlLabel value={10} control={<Radio />} label="Rank 3" />
          </RadioGroup>
        </FormControl> */}
      </CardActions>
    </Card>
  );
};

export default Dishcard;
