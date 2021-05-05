import React, { useContext } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import Loading from "./components/Loader";
import Home from "./components/Home";

import "./App.css";

const App = () => {
  const useDrizzle = useContext(DrizzleContext.Context);
  console.log("useDrizzle >>> ", useDrizzle);
  const { initialized } = useDrizzle;

  window.ethereum.on("accountsChanged", (accounts) => {
    window.location.reload();
  });

  window.ethereum.on("chainChanged", (chainId) => {
    window.location.reload();
  });

  
  if (!initialized) return <Loading />;

  return (
    <>
      <Home />
    </>
  );
};

export default App;
