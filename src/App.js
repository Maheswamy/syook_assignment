import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import Dishlist from "./components/dish/Dishlist";
import { useEffect, useReducer } from "react";
import { DishContext, UserContext } from "./Contexts/Context";
import { dishReducer, userReducer } from "./reducers/reducers";

function App() {
  const [dishState, dishDispatch] = useReducer(dishReducer, {});
  const [userState, userDispatch] = useReducer(userReducer, {});

  useEffect(() => {
    console.log(localStorage.getItem("dishes"))
    if (localStorage.getItem("dishes")) {
      dishDispatch({
        type: "GET_DISHES",
        payload: localStorage.getItem("dishes"),
      });
    }
    if (localStorage.getItem("user")) {
      dishDispatch({ type: "GET_USER", payload: localStorage.getItem("user") });
    }
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ userState, userDispatch }}>
        <DishContext.Provider value={{ dishState, dishDispatch }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dishs" element={<Dishlist />} />
          </Routes>
        </DishContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
