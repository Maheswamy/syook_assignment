import Login from "./components/login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import Dishlist from "./components/dish/Dishlist";
import { useEffect, useReducer } from "react";
import { DishContext, UserContext } from "./Contexts/Context";
import { dishReducer, userReducer } from "./reducers/reducers";
import { Container } from "@mui/material";
import { fetchDish } from "./utli/fetchDishes";

function App() {
  const [dishState, dishDispatch] = useReducer(dishReducer, []);
  const [userState, userDispatch] = useReducer(userReducer, {});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("dishes")) {
      dishDispatch({
        type: "GET_DISHES",
        payload: localStorage.getItem("dishes"),
      });
    } else {
      fetchDish(dishDispatch);
    }

    if (localStorage.getItem("user")) {
      dishDispatch({ type: "GET_USER", payload: localStorage.getItem("user") });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ userState, userDispatch }}>
        <DishContext.Provider value={{ dishState, dishDispatch }}>
          <Container maxWidth={"lg"}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dishes" element={<Dishlist />} />
            </Routes>
          </Container>
        </DishContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
