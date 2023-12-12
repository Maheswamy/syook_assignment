export const dishReducer = (state, action) => {
  switch (action.type) {
    case "GET_DISHES": {
      return [...action.payload];
    }
    default: {
      return { ...state };
    }
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      console.log(action.payload);
      return { ...action.payload };
    }
    case "USER_LOGOUT": {
      return {};
    }
    default: {
      return { ...state };
    }
  }
};
