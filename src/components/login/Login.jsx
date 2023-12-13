import React, { useState, useContext } from "react";
import { TextField, Stack, Paper, Button, Typography } from "@mui/material";
import { runValidation } from "./loginValidation";
import users from "../../userdata/users.json";
import { useNavigate } from "react-router-dom";
import { fetchDish } from "../../utli/fetchDishes";
import { DishContext } from "../../Contexts/Context";
import { UserContext } from "./../../Contexts/Context";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const { dishDispatch } = useContext(DishContext);
  const { userDispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const setFormErrorHandler = (errors) => {
    setFormErrors(errors);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validationResult = runValidation(
      username,
      password,
      setFormErrorHandler
    );

    if (validationResult) {
      const authenicationResult = users.find((ele) => {
        return ele.username === username && ele.password === password;
      });

      if (authenicationResult) {
        userDispatch({ type: "SET_USER", payload: authenicationResult });
        userDispatch({type:'SET_LOGGEDIN_VOTES',payload:JSON.parse(localStorage.getItem(`${authenicationResult.username}`))})
        localStorage.setItem("user", JSON.stringify(authenicationResult));
        if (localStorage.getItem("dishes")) {
          dishDispatch({
            type: "GET_DISHES",
            payload: JSON.parse(localStorage.getItem("dishes")),
          });
          navigate("/dishes");
        } else {
          fetchDish(dishDispatch, navigate);
        }
      } else {
        setFormErrorHandler({
          username: "invalid username or password",
          password: "invalid username or password",
        });
      }
    }
  };

  return (
    <Paper
      component={"form"}
      onSubmit={handleLogin}
      sx={{ width: "345px", padding: "10px" }}
    >
      <Stack spacing={2}>
        <Typography variant="h3" color="initial">Login</Typography>
        <TextField
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={formErrors?.username && true}
          helperText={formErrors?.username}
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={formErrors?.password && true}
          helperText={formErrors?.password}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Log in
        </Button>
      </Stack>
    </Paper>
  );
};

export default Login;
