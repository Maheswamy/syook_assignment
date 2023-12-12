import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, CircularProgress, Stack, Box } from "@mui/material";
import Dishcard from "./Dishcard";
import { DishContext, UserContext } from "../../Contexts/Context";
import { useNavigate } from "react-router-dom";

const Dishlist = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const [voted, setVoted] = useState([]);
  const { dishState, dishDispatch } = useContext(DishContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.myVotes.lenght > 0) {
      setVoted([...userState.myVotes]);
    }
  }, []);

  const handleNewVote = (value) => {
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

  const polledDishHandler = (value) => {
    return handleNewVote(value);
  };

  const handlePollSubmit = () => {
    let newDishes = dishState;
    if (userState.myVotes.length > 0) {
      console.log(voted);
      newDishes = dishState.map((ele) => {
        const oldVote = userState.myVotes.find((e) => e.id === ele.id);
        if (oldVote) {
          return { ...ele, points: ele.points - oldVote.rank };
        } else {
          return { ...ele };
        }
      });
    }
    console.log(newDishes);
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

  const renderDishCards = () => {
    return dishState?.map((ele) => {
      const selected = userState.myVotes.find((e) => e.id === ele.id)?.rank;

      return (
        <Grid item key={ele.id}>
          <Dishcard
            {...ele}
            polledDishHandler={polledDishHandler}
            selected={
              selected
                ? selected
                : voted.find((e) => e.id === ele.id)
                ? voted.find((e) => e.id === ele.id).rank
                : null
            }
          />
        </Grid>
      );
    });
  };

  return (
    <>
      {dishState.length === 0 ? (
        <CircularProgress />
      ) : (
        <Stack container gap={3} direction={"column"}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePollSubmit}
            >
              Submit
            </Button>
          </Box>
          <Grid container gap={3}>
            {renderDishCards()}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default Dishlist;
