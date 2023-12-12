import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Dishcard from "./Dishcard";

const Dishlist = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    setDishes(JSON.parse(localStorage.getItem("dishes")));
  }, []);
  return (
    <Grid container>
      {dishes.map((ele) => (
        <Grid item>
          <Dishcard {...ele} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Dishlist;
