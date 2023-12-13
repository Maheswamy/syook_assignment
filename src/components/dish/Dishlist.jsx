import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, CircularProgress, Stack, Box } from "@mui/material";
import Dishcard from "./Dishcard";
import { DishContext, UserContext } from "../../Contexts/Context";
import { useNavigate } from "react-router-dom";

const Dishlist = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { dishState, dishDispatch } = useContext(DishContext);
  console.log(userState);
  const [votes, setVotes] = useState(
    userState.loggedInUserVotes.lenght > 0 ? userState.loggedInUserVotes : []
  );
  const navigate = useNavigate();

  // const handleNewVote = (value) => {
  //   const isVoteLimitReached = votes.length === 3;
  //   console.log(value, votes);
  //   if (isVoteLimitReached) {
  //     setVotes((prev) =>
  //       prev.map((ele) =>
  //         ele.id === value.id || ele.rank === value.rank
  //           ? { ...value }
  //           : { ...ele }
  //       )
  //     );
  //   } else {
  //     const hasDuplicateVote = votes.some(
  //       (ele) => ele.id === value.id || ele.rank === value.rank
  //     );

  //     setVotes((prev) =>
  //       hasDuplicateVote
  //         ? prev.map((ele) =>
  //             ele.id === value.id || ele.rank === value.rank
  //               ? { ...value }
  //               : { ...ele }
  //           )
  //         : [...prev, value]
  //     );
  //   }
  // };
  const handleNewVote = (value) => {
    const voteLimit = votes.length === 3;

    if (voteLimit) {
      setVotes((prev) =>
        prev.map((ele) =>
          ele.id === value.id ? { ...ele, rank: value.rank } : ele
        )
      );
    } else {
      const VotedForDish = votes.some((ele) => ele.id === value.id);

      setVotes((prev) =>
        VotedForDish
          ? prev.map((ele) =>
              ele.id === value.id ? { ...ele, rank: value.rank } : ele
            )
          : [...prev, value]
      );
    }
  };

  const calculatePoints = (rank) => {
    switch (rank) {
      case 30:
        return 30;
      case 20:
        return 20;
      case 10:
        return 10;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const updatedVotes = votes.map((vote) => ({
      ...vote,
      points: calculatePoints(vote.rank),
    }));
    setVotes(updatedVotes);
  }, [votes]);

  const polledDishHandler = (value) => {
    return handleNewVote(value);
  };

  const handlePollSubmit = () => {
    let newDishes = dishState;
    if (userState.loggedInUserVotes.length > 0) {
      newDishes = dishState.map((ele) => {
        const oldVote = userState.loggedInUserVotes.find(
          (e) => e.id === ele.id
        );
        if (oldVote) {
          return { ...ele, points: ele.points - oldVote.rank };
        } else {
          return { ...ele };
        }
      });
    }
    const calculateTotalRank = () => {
      return votes.reduce((pv, cv) => {
        if (!pv[cv.id]) {
          pv[cv.id] = cv.rank;
        }
        return pv;
      }, {});
    };
    const totalRank = calculateTotalRank();

    const result = newDishes.map((ele) => {
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
    localStorage.setItem(`${userState.user.username}`, JSON.stringify(votes));
    localStorage.setItem("dishes", JSON.stringify(result));
    userDispatch({ type: "SET_LOGGEDIN_VOTES", payload: votes });
    dishDispatch({ type: "GET_DISHES", payload: result });
    navigate("/result");
  };

  const renderDishCards = () => {
    return dishState?.map((ele) => {
      const selected = userState.loggedInUserVotes.find((e) => e.id === ele.id);

      return (
        <Grid item key={ele.id}>
          <Dishcard
            {...ele}
            polledDishHandler={polledDishHandler}
            selected={
              selected
                ? selected
                : votes
                ? votes.find((e) => e.id === ele.id)
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
        <Stack container gap={4} direction={"column"}>
          <Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePollSubmit}
              sx={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </Box>
          <Grid container gap={7}>
            {renderDishCards()}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default Dishlist;
