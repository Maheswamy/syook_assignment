import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, CircularProgress } from "@mui/material";
import Dishcard from "./Dishcard";
import { DishContext, UserContext } from "../../Contexts/Context";
import { useNavigate } from "react-router-dom";

const Dishlist = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const [voted, setVoted] = useState([]);
  const { dishState, dishDispatch } = useContext(DishContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(userState.myVotes, "indiess");
    if (userState.myVotes.lenght > 0) {
      setVoted(userState.myVotes);
    }
  }, []);

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

  const handlePollSubmit = () => {
    console.log(voted);

    const calculateTotalRank = () => {
      return voted.reduce((pv, cv) => {
        if (!pv[cv.id]) {
          pv[cv.id] = cv.rank;
        }
        return pv;
      }, {});
    };
    const totalRank = calculateTotalRank();

    const result = dishState.map((ele) => {
      if (totalRank[ele.id]) {
        console.log(ele.points);
        return {
          ...ele,
          points: ele.points
            ? ele.points + totalRank[ele.id]
            : totalRank[ele.id],
        };
      } else {
        return { ...ele, points: ele.points > 0 ? ele.points : 0 };
      }
    });
    localStorage.setItem(`${userState.user.username}`, JSON.stringify(voted));
    localStorage.setItem("dishes", JSON.stringify(result));
    userDispatch({ type: "SET_MYVOTES", payload: voted });
    dishDispatch({ type: "GET_DISHES", payload: result });
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
              <Dishcard
                {...ele}
                polledDishHandler={polledDishHandler}
                slected={voted.find((e) => e.id === ele.id)?.rank}
              />
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
