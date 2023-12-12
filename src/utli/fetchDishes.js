import axios from "axios";

export const fetchDish = async (dishDispatch, navigate) => {
  try {
    const dishesListResponse = await axios.get(
      "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
    );
    console.log(dishesListResponse.data);
    localStorage.setItem("dishes", JSON.stringify(dishesListResponse.data));
    dishDispatch({ type: "GET_DISHES", payload: dishesListResponse.data });
    navigate("/dishes");
  } catch (e) {
    console.log(e);
  }
};
