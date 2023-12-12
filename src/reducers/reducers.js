export const dishReducer = (state, action) => {
  switch (action.payload) {
    case "GET_DISHES": {
      return action.payload;
    }
  }
};

export const userReducer = (state, action) => {
  switch (action.payload) {
    case "SET_USER": {
      return action.payload;
    }
  }
};
