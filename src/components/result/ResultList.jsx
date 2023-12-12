import React, { useContext, useEffect, useState } from "react";
import { Stack, Typography, Paper } from "@mui/material";
import ResultItem from "./ResultItem";
import { UserContext, DishContext } from "../../Contexts/Context";

const ResultList = () => {
  const { dishState } = useContext(DishContext);
  const {userState}=useContext(UserContext)

  console.log(userState);

  return (
    <Stack container spacing={3}>
      <Typography variant="h4" color="initial" align="center">
        Result
      </Typography>
      <Paper
        sx={{
          position: "sticky",
          top: 0,
        }}
      >
        <Stack direction={"row"} justifyContent={"space-between"} p={3}>
          <Typography variant="body1" color="error">
            id
          </Typography>
          <Typography variant="body1" color="error">
            Dish name
          </Typography>
          <Typography variant="body1" color="error">
            Points
          </Typography>
        </Stack>
      </Paper>
      {dishState
        .sort((a, b) => b.points - a.points)
        .map((ele) => {
          const selected = userState.myVotes.find((e) => e.id === ele.id);
          return (
            <ResultItem
              key={ele.id}
              {...ele}
              selected={selected ? selected : null}
            />
          );
        })}
    </Stack>
  );
};

export default ResultList;
