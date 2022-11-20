import { Contract, ContractFactory, providers } from "ethers";
import ProviderNFTDealClient from "./contracts/ProviderNFTDealClient.json";
import ClientNFTDealClient from "./contracts/ClientNFTDealClient.json";
import CommonNFTDealClient from "./contracts/CommonNFTDealClient.json";
import AgreementNFTDealClient from "./contracts/AgreementNFTDealClient.json";

export const getProvider = () => {
  const provider = new providers.Web3Provider(
    typeof window !== "undefined"
      ? window.ethereum
      : new providers.JsonRpcProvider("https://wallaby.node.glif.io/rpc/v0")
  );

  return provider;
};

// export const getContract = () => {
//   const provider = getProvider();
//   const contract = new Contract(
//     process.env.NEXT_PUBLIC_FILECOIN_CONTRACT ||
//       "0x397E961510dEc9b5De4ADeC9371A493C125aE702",
//     ProvideNFTDealClient.abi,
//     provider
//   );

//   return contract.connect(provider.getSigner());
// };

export const connect = async () => {
  const provider = await getProvider();
  const [account] = await provider.send("eth_requestAccounts", []);

  return account;
};

export const getAddress = async () => {
  return (await getProvider().send("eth_accounts", []))[0];
};

const deployContract = async ({
  nftAddress,
  abi,
  bytecode,
}: {
  nftAddress: string;
  abi: any;
  bytecode: string;
}) => {
  const provider = getProvider();

  const factory = new ContractFactory(abi, bytecode, provider.getSigner());
  const contract = await factory.deploy(nftAddress);

  return contract.address;
};

export const deployProviderNFTDealClient = async (nftAddress: string) => {
  return deployContract({
    nftAddress,
    ...ProviderNFTDealClient,
  });
};

export const deployClientNFTDealClient = async (nftAddress: string) => {
  return deployContract({
    nftAddress,
    ...ClientNFTDealClient,
  });
};

export const deployCommonNFTDealClient = async (nftAddress: string) => {
  return deployContract({
    nftAddress,
    ...CommonNFTDealClient,
  });
};

export const deployAgreementNFTDealClient = async (nftAddress: string) => {
  return deployContract({
    nftAddress,
    ...AgreementNFTDealClient,
  });
};
