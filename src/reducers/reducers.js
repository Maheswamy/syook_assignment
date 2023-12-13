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
      return { ...state, user: action.payload };
    }
    case "SET_LOGGEDIN_VOTES": {
      return { ...state, loggedInUserVotes: [...action.payload] };
    }

    case "USER_LOGOUT": {
      return { user: {}, loggedInUserVotes: [] };
    }
    default: {
      return { ...state };
    }
  }
};
