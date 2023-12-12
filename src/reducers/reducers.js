export const dishReducer = (state, action) => {
  switch (action.type) {
    case "GET_DISHES": {
      return [...action.payload];
    }
    case "USER_LOGOUT": {
      return [];
    }
    default: {
      return [...state];
    }
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      console.log(action.payload);
      return { ...state, user: action.payload };
    }
    case "SET_MYVOTES": {
      return { ...state, myVotes: [...action.payload] };
    }
    case "USER_LOGOUT": {
      return { user: {}, myVotes: [] };
    }
    default: {
      return { ...state };
    }
  }
};
