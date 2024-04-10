import { createContext, useContext, useState } from "react";

const AccContext = createContext();

export const AccProvider = ({ children }) => {
  const [account, setAccount] = useState({username: "", id: null});
  const [chats, setChats] = useState([]);

  function colorHash(inputString) {
    var sum = 0;

    for (var i in inputString) {
      sum += inputString.charCodeAt(i);
    }

    r = ~~(
      ("0." +
        Math.sin(sum + 1)
          .toString()
          .substr(6)) *
      256
    );
    g = ~~(
      ("0." +
        Math.sin(sum + 2)
          .toString()
          .substr(6)) *
      256
    );
    b = ~~(
      ("0." +
        Math.sin(sum + 3)
          .toString()
          .substr(6)) *
      256
    );

    var rgb = "rgb(" + r + ", " + g + ", " + b + ")";

    var hex = "#";

    hex += ("00" + r.toString(16)).substr(-2, 2).toUpperCase();
    hex += ("00" + g.toString(18)).substr(-2, 2).toUpperCase();
    hex += ("00" + b.toString(20)).substr(-2, 2).toUpperCase();

    return {
      r: r,
      g: g,
      b: b,
      rgb: rgb,
      hex: hex,
    };
  };

  return (
    <AccContext.Provider value={{ account, setAccount, colorHash, chats, setChats }}>
      {children}
    </AccContext.Provider>
  );
};

export const useAccContext = () => {
  return useContext(AccContext);
};
