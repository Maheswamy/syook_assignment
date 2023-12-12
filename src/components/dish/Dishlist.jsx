import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import Dishcard from "./Dishcard";
import { DishContext } from "../../Contexts/Context";

const Dishlist = () => {
  const [voted, setVoted] = useState([]);
  const { dishState } = useContext(DishContext);

  const polledDishHandler = (value) => {
    if (voted.length === 3) {
      setVoted((prev) =>
        prev.map((ele) =>
          ele.id === value.id || ele.rank === value.rank
            ? { ...value }
            : { ...ele }
        )
      );
    } else if (voted.length > 0 && voted.length < 3) {
      if (voted.find((ele) => ele.id === value.id || ele.rank === value.rank)) {
        
        setVoted((prev) =>
          prev.map((ele) =>
            ele.id === value.id || ele.rank === value.rank
              ? { ...value }
              : { ...ele }
          )
        );
      } else {
        setVoted((prev) => [...prev, value]);
      }
    } else {
      setVoted((prev) => [...prev, value]);
    }
  };

  useEffect(() => {
    console.log(voted);
  }, [voted]);

  return (
    <>
      {!dishState ? (
        <CircularProgress />
      ) : (
        <Grid container gap={3}>
          {dishState?.map((ele) => (
            <Grid item key={ele.id}>
              <Dishcard {...ele} polledDishHandler={polledDishHandler} />
            </Grid>
          ))}
          <Grid item>
            <Button variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dishlist;
