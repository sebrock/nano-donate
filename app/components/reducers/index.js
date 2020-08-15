//reducer will remain the state around all the paths in react!

export const initialState = {
  userPage: {
    bananoDonateEntries: [],
  },
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER_PAGE":
      return { ...state, userPage: action.payload };
    case "ACTIVE_USER":
      return {
        ...state,
        userPage: state.userPage.bananoDonateEntries.filter(
          (ctx, index) => index === action.payload
        ),
      };
  }
};
