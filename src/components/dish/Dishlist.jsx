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

  console.log(dishState);

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

    const allVotes = JSON.parse(localStorage.getItem("result")) || dishState;

    const calculateTotalRank = () => {
      return voted.reduce((pv, cv) => {
        if (!pv[cv.id]) {
          pv[cv.id] = cv.rank;
        }
        return pv;
      }, {});
    };

    const totalRank = calculateTotalRank();

    const result = allVotes.map((ele) => {
      if (voted[ele.id]) {
        console.log(ele.points);
        return {
          ...ele,
          points: ele.points
            ? ele.points + totalRank[ele.id]
            : totalRank[ele.id],
        };
      } else {
        return { ...ele, points: 0 };
      }
    });

    console.log(result, totalRank);
    localStorage.setItem("result", JSON.stringify([...result]));

    navigate("/result");
  };

  return (
    <>
      {dishState.length === 0 ? (
        <CircularProgress />
      ) : (
        <Grid container gap={3}>
          {dishState?.map((ele) => (
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
