import { createContext, useState, useReducer } from "react";

export const AppContext = createContext();

const initialState = null;

const reducer = (state, action) => {
  if (action.type === "USER") {
    return (state = action.payload);
  } else if (action.type === "CLEAR") {
    return (state = null);
  }
};

export const AppProvider = ({ children }) => {
  const [Id, setId] = useState(399566);
  const [type, setType] = useState("tv");
  const [isNavToggled, setIsNavToggled] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        Id,
        setId,
        type,
        setType,
        isNavToggled,
        setIsNavToggled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
