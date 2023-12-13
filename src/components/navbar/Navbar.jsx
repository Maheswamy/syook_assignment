import { Stack, Paper, Button, Typography, Box } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DishContext, UserContext } from "./../../Contexts/Context";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const { dishDispatch } = useContext(DishContext);
  const navigation = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    userDispatch({ type: "USER_LOGOUT" });
    dishDispatch({ type: "USER_LOGOUT" });
    navigation("/");
  };
  return (
    <Paper
      sx={{
        height: "10vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        zIndex: 1000,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        padding={2}
      >
        <Box>
          <Typography variant="h3" color="initial">
            DISH POLL
          </Typography>
        </Box>
        {Object.values(userState.user).length > 0 && (
          <Box>
            <Link to="/result">
              <Button variant="h6" color="initial">
                Result
              </Button>
            </Link>
            <Link to="/dishes">
              <Button variant="h6" color="initial">
                Dishes
              </Button>
            </Link>
            <Link to={"/"}>
              <Button variant="h6" color="initial" onClick={handleLogout}>
                Logout
              </Button>
            </Link>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default Navbar;
