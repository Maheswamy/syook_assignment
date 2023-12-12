import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import Dishcard from "./Dishcard";
import { DishContext, UserContext } from "../../Contexts/Context";
import { useNavigate } from "react-router-dom";

const Dishlist = () => {
  const [voted, setVoted] = useState([]);
  const { dishState } = useContext(DishContext);
  const { userState } = useContext(UserContext);
  const navigate = useNavigate();

  const polledDishHandler = (value) => {
    const isVoteLimitReached = voted.length === 3;

    if (isVoteLimitReached) {
      setVoted((prev) =>
        prev.map((ele) =>
          ele.id === value.id || ele.rank === value.rank
            ? { ...value }
            : { ...ele }
        )
      );
    } else {
      const hasDuplicateVote = voted.some(
        (ele) => ele.id === value.id || ele.rank === value.rank
      );

      setVoted((prev) =>
        hasDuplicateVote
          ? prev.map((ele) =>
              ele.id === value.id || ele.rank === value.rank
                ? { ...value }
                : { ...ele }
            )
          : [...prev, value]
      );
    }
  };

  useEffect(() => {
    console.log(voted);
  }, [voted]);

  const handlePollSubmit = () => {
    console.log(userState);
    localStorage.setItem(`${userState?.username}`, JSON.stringify(voted));

    const allVotes = JSON.parse(localStorage.getItem("allVotes")) || [];

    const calculateTotalRank = () => {
      return allVotes.reduce((pv, cv) => {
        pv[cv.id] = (pv[cv.id] || 0) + cv.rank;
        return pv;
      }, {});
    };

    const totalRank = calculateTotalRank();

    const result = dishState
      .map((ele) => ({
        ...ele,
        points: totalRank[ele.id] || 0,
      }))
      .sort((a, b) => b.points - a.points);

    localStorage.setItem("result", JSON.stringify([...result]));

    navigate("/result");
  };

  return (
    <>
      {!dishState ? (
        <CircularProgress />
      ) : (
        <Grid container gap={3}>
          {dishState.map((ele) => (
            <Grid item key={ele.id}>
              <Dishcard {...ele} polledDishHandler={polledDishHandler} />
            </Grid>
          ))}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePollSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dishlist;
