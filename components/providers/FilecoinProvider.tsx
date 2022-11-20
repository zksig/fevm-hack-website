import React, { createContext, useContext, useEffect, useState } from "react";
import { connect, getAddress } from "../../services/filecoin";

const FilecoinContext = createContext({
  address: "",
  isConnected: false,
  connect: () => {},
});

export const FilecoinProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [address, setAddress] = useState("");

  const connectAndSetAddress = async () => {
    setAddress(await connect());
  };

  useEffect(() => {
    (async () => {
      setAddress(await getAddress());
    })();
  }, []);

  return (
    <FilecoinContext.Provider
      value={{ address, isConnected: !!address, connect: connectAndSetAddress }}
    >
      {children}
    </FilecoinContext.Provider>
  );
};

export const useFilecoin = () => {
  return useContext(FilecoinContext);
};

export const useAddress = () => {
  const { address } = useContext(FilecoinContext);
  return address;
};

export const useConnect = () => {
  const { connect } = useContext(FilecoinContext);
  return connect;
};
