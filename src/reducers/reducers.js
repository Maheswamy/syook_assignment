export const dishReducer = (state, action) => {
  switch (action.type) {
    case "GET_DISHES": {
      return [...action.payload];
    }
    
  }
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {...action.payload};
    }
  }
};
