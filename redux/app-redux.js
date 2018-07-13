import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import thunk from "redux-thunk";
import * as firebase from "firebase";

// Initial state component
const initialState = {
  displayName: "Usergit",
  userData: {}
};

// Reducer component
// - changes state based on an action
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setDisplayName":
      return { ...state, displayName: action.value };

    case "setUserData":
      return { ...state, userData: action.value };

    default:
      return state;
  }
};

// Store component
const store = createStore(reducer, applyMiddleware(thunkMiddleware));

// Action Creator components
// - functions that create actions
const setDisplayName = name => {
  return {
    type: "setDisplayName",
    value: name
  };
};

const setUserData = userData => {
  return {
    type: "setUserData",
    value: userData
  };
};

const watchUserData = () => {
  // - thunkMiddleware allows us to create an action creator
  //   that's a function and not just an object
  return function(dispatch) {
    firebase
      .database()
      .ref("person")
      .on(
        "value",
        function(snapshot) {
          let userData = snapshot.val();
          dispatch(setUserData(userData));
        },
        function(error) {}
      );
  };
};

// Exports
export { store };
export { setDisplayName, setUserData, watchUserData };
