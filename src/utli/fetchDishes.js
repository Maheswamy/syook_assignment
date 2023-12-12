import axios from "axios";

export const fetchDish = async () => {
    
  try {
    const dishesListResponse = await axios.get(
      "https://raw.githubusercontent.com/syook/react-dishpoll/main/db.json"
    );
    localStorage.setItem("dishes", JSON.stringify(dishesListResponse.data));
  } catch (e) {
    console.log(e);
  }
};
