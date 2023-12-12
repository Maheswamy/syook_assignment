import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const ResultItem = ({ id, dishName, points }) => {
  return (
    <Paper>
      <Stack direction={'row'} justifyContent={'space-between'} p={3}>
        <Typography variant="body1" color="initial">
          id:{id}
        </Typography>
        <Typography variant="body1" color="initial">
          Dish name:{dishName}
        </Typography>
        <Typography variant="body1" color="initial">
          Points:{points}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ResultItem;
