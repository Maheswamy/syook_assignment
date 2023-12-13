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

  const polledDishHandler = (value) => {
    if (voted.length < 3) {
      const idPresentInVote = voted.find((ele) => ele.id === value.id);
      const rankPresentInVote = voted.find((ele) => ele.rank === value.rank);

      if (idPresentInVote) {
        return setVoted([
          ...voted.filter((ele) => ele.id !== idPresentInVote.id),
          value,
        ]);
      }

      if (rankPresentInVote) {
        console.log(value, "rank matchs");
        return setVoted([
          ...voted.filter((ele) => ele.rank !== rankPresentInVote.rank),
          value,
        ]);
      }

      setVoted([...voted, value]);
    } else if (voted.length === 3) {
      const idPresentInVote = voted.some((ele) => ele.id === value.id);
      const rankPresentInVote = voted.some((ele) => ele.rank === value.rank);

      if (idPresentInVote) {
        console.log(value, "id matchs");
        return setVoted([
          ...voted.filter(
            (ele) => ele.id !== value.id && ele.rank !== value.rank
          ),
          value,
        ]);
      }

      if (rankPresentInVote) {
        console.log(value, "rank matchs");
        return setVoted([
          ...voted.filter(
            (ele) => ele.rank !== value.rank && ele.id !== value.id
          ),
          value,
        ]);
      }
    }
  };

  const handlePollSubmit = () => {
    const calculateTotalRank = () => {
      return voted.reduce((pv, cv) => {
        if (!pv[cv.id]) {
          pv[cv.id] = cv.rank;
        }
        return pv;
      }, {});
    };
    const totalRank = calculateTotalRank();
    console.log(totalRank);

    const result = dishState.map((ele) => {
      const oldRanksList = JSON.parse(
        localStorage.getItem(`${userState.user.username}`)
      );
      const oldPoints = oldRanksList?.find((e) => e.id === ele.id);
      if (totalRank[ele.id]) {
        return {
          ...ele,
          points: ele.points
            ? ele.points + totalRank[ele.id] - (oldPoints ? oldPoints.rank : 0)
            : totalRank[ele.id] - (oldPoints ? oldPoints.rank : 0),
        };
      } else {
        return {
          ...ele,
          points:
            ele.points > 0 ? ele.points - (oldPoints ? oldPoints.rank : 0) : 0,
        };
      }
    });
    console.log(result);
    localStorage.setItem(`${userState.user.username}`, JSON.stringify(voted));
    localStorage.setItem("dishes", JSON.stringify(result));
    userDispatch({ type: "SET_LOGGEDIN_VOTES", payload: voted });
    dishDispatch({ type: "GET_DISHES", payload: result });
    navigate("/result");
  };

  useEffect(() => {
    if (userState.loggedInUserVotes.length > 0) {
      setVoted([...userState.loggedInUserVotes]);
    }
  }, []);

  return (
    <>
      {dishState.length === 0 ? (
        <CircularProgress />
      ) : (
        <Stack container gap={3} direction={"column"} marginTop={3}>
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
          <Grid container gap={7}>
            {dishState?.map((ele) => {
              return (
                <Grid item key={ele.id}>
                  <Dishcard
                    {...ele}
                    polledDishHandler={polledDishHandler}
                    selected={voted.find((e) => e.id === ele.id)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default Dishlist;
