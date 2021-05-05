import React, { useContext, useEffect, useState } from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import AdminPanel from "./AdminPanel";
import PetList from "./PetList";

const Home = () => {
  const [chainId, setChainId] = useState("");
  const [dataKey, setDataKey] = useState(null);

  const useDrizzle = useContext(DrizzleContext.Context);
  const { drizzle, drizzleState, initialized } = useDrizzle;

  console.log("useDrizzle >>> ", useDrizzle);

  useEffect(() => {
    async function getNetworkId() {
      setChainId(initialized && (await drizzle.web3.eth.getChainId()));
    }

    getNetworkId();
  }, [initialized, drizzle]);

  useEffect(() => {
    const contract = drizzle.contracts.Petshop;
    const dataKey = contract.methods["owner"].cacheCall();

    setDataKey(dataKey);
  }, []);

   const account = drizzleState.accounts[0];

  console.log("account >>> ", account);

  const { Petshop } = drizzleState.contracts;
  console.log("dataKey >>> ", dataKey);

  const owner = Petshop.owner[dataKey];
  console.log("owner >>> ", owner);

  return (
    <>
      <div className="container my-2">
        <div className="text-center">
          <h1>PETSHOP DAPP WITH IPFS ASSIGNMENT #03</h1>
          <div className="alert alert-success" role="alert">
            Your Network connected: {chainId}
          </div>
          {chainId && chainId != "1337" ? (
            <div className="alert alert-danger" role="alert">
              Please connect to Your local testnet
            </div>
          ) : null}
        </div>
        <div className="row">
          <div className="col-12 col-md-10 mx-auto">
            {account === owner?.value ? <AdminPanel /> : null}
          </div>
          <div className="col-12">
            <PetList />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
