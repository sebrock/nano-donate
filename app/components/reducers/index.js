//reducer will remain the state around all the paths in react!

export const initialState = {
  userPage: JSON.parse(localStorage.getItem("userTabPage")) || {
    bananoDonateEntries: [],
  },
  qrBan: "",
};

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER_PAGE":
      return { ...state, userPage: action.payload };
  }
};
