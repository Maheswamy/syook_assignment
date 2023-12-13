import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import React, { useState, useEffect } from "react";

const Dishcard = ({
  id,
  dishName,
  description,
  image,
  polledDishHandler,
  selected,
}) => {
  const [selectedRank, setSelectedRank] = useState(selected ? +selected : 0);

  const handleSelectedRank = (e) => {
    polledDishHandler({ id, rank: +e.target.value });
  };

  useEffect(() => {
    if (selected?.id === id) {
      setSelectedRank(selected.rank);
    } else {
      setSelectedRank(0);
    }
  }, [selected]);

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

      <label htmlFor={`${id}_RANK1`}>RANK 1 </label>
      <input
        type="radio"
        name={id}
        id={`${id}_RANK1`}
        value={30}
        checked={selectedRank === 30}
        onChange={handleSelectedRank}
      />
      <label htmlFor={`${id}_RANK2`}>RANK 2 </label>
      <input
        type="radio"
        name={id}
        id={`${id}_RANK2`}
        value={20}
        checked={selectedRank === 20}
        onChange={handleSelectedRank}
      />
      <label htmlFor={`${id}_RANK3`}>RANK 3 </label>
      <input
        type="radio"
        name={id}
        id={`${id}_RANK3`}
        value={10}
        checked={selectedRank === 10}
        onChange={handleSelectedRank}
      />
    </Card>
  );
};

export default Dishcard;
