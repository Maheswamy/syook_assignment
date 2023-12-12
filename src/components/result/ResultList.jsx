import React, { useEffect, useState } from "react";
import { Stack, Typography, Paper } from "@mui/material";
import ResultItem from "./ResultItem";

const ResultList = () => {
  const [allVotes, setAllVotes] = useState([]);

  useEffect(() => {
    const storedAllVotes = JSON.parse(localStorage.getItem("result")) || [];
    setAllVotes(storedAllVotes);
  }, []);

  console.log(allVotes);

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
      {allVotes.map((ele) => (
        <ResultItem key={ele.id} {...ele} />
      ))}
    </Stack>
  );
};

export default ResultList;
