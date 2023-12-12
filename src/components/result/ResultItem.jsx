import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

const ResultItem = ({ id, dishName, points ,selected}) => {
  return (
    <Paper>
      <Stack direction={'row'} justifyContent={'space-between'} p={3} bgcolor={selected&&'green'}>
        <Typography variant="body1" color="initial">
          {id}
        </Typography>
        <Typography variant="body1" color="initial">
          {dishName}
        </Typography>
        <Typography variant="body1" color="initial">
          {points}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default ResultItem;
