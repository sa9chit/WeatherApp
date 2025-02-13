import { Contextt } from "../contextContainer/context";
import { useState } from "react";
export const ContextProvider = (props) => {
  let [value, setValue] = useState(null);
  return (
    <Contextt.Provider value={{ value, setValue }}>
      {props.children}
    </Contextt.Provider>
  );
};
