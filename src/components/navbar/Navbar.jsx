import { Stack, Paper, Button, Typography, Box } from "@mui/material";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../../Contexts/Context";

const Navbar = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const navigation = useNavigate();

  console.log(userState)

  const handleLogout = () => {
    localStorage.removeItem("user");
    console.log("jkjk");
    userDispatch({ type: "USER_LOGOUT" });
    navigation("/");
  };
  return (
    <Paper
      sx={{
        height: "10vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
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
        {Object.values(userState).length > 0 && (
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
