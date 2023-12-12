import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";
import { DishContext, UserContext } from "./Contexts/Context";
import { dishReducer, userReducer } from "./reducers/reducers";
import { Container } from "@mui/material";
import { fetchDish } from "./utli/fetchDishes";
import Dishlist from "./components/dish/Dishlist";
import ResultList from "./components/result/ResultList";
import Navbar from "./components/navbar/Navbar";
import LoginContainer from "./components/login/LoginContainer";

function App() {
  const [dishState, dishDispatch] = useReducer(dishReducer, []);
  const [userState, userDispatch] = useReducer(userReducer, {user:{},myVotes:[]});
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
      userDispatch({
        type: "SET_USER",
        payload: JSON.parse(localStorage.getItem("user")),
        x:'mahendra'
      });
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ userState, userDispatch }}>
        <DishContext.Provider value={{ dishState, dishDispatch }}>
          <Navbar />
          <Container maxWidth={"lg"}>
            <Routes>
              <Route path="/" element={<LoginContainer />} />
              <Route path="/dishes" element={<Dishlist />} />
              <Route path="/result" element={<ResultList />} />
            </Routes>
          </Container>
        </DishContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
