import { FormEvent, useState } from "react";
import {
  deployAgreementNFTDealClient,
  deployClientNFTDealClient,
  deployCommonNFTDealClient,
  deployProviderNFTDealClient,
} from "../../services/filecoin";

type ContractType = "Provider" | "Client" | "Common" | "Agreement";

const fnByContractType = {
  Provider: deployProviderNFTDealClient,
  Client: deployClientNFTDealClient,
  Common: deployCommonNFTDealClient,
  Agreement: deployAgreementNFTDealClient,
};

export default function ProviderClient() {
  const [nftAddress, setNftAddress] = useState("");
  const [contractType, setContractType] = useState<ContractType>("Provider");
  const [contractAddress, setContractAddress] = useState("");

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    setContractAddress(await fnByContractType[contractType](nftAddress));
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Contract Type
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Contract types change who is affected by NFT access control
                either providers, clients, or both must own an NFT to
                participate.
              </p>
              <p className="mt-4 text-sm text-gray-600">
                Additionally, the Agreement type enforces that clients and
                providers have a mutually signed legally binding agreement in
                place (see{" "}
                <a href="https://zksig.io" target="_blank" rel="noreferrer">
                  ZKsig
                </a>
                )
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      NFT Address
                    </label>
                    <select
                      name="contract-type"
                      id="contract-type"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={contractType}
                      onChange={({ target }) =>
                        setContractType(target.value as ContractType)
                      }
                    >
                      <option value="Provider">Provider NFT</option>
                      <option value="Client">Client NFT</option>
                      <option value="Common">Common NFT</option>
                      <option value="Agreement">Agreement NFT</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                NFT
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Select an NFT that every storage provider must own in order to
                participate in your marketplace.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form onSubmit={handleCreate}>
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      NFT Address
                    </label>
                    <input
                      type="text"
                      name="nft-address"
                      id="nft-address"
                      placeholder="0x..."
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={nftAddress}
                      onChange={({ target }) => setNftAddress(target.value)}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Create Contract
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Setup Marketplace
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use the contract address as the callee when publishing storage
                to with the MarketAPI (see code{" "}
                <a
                  href="https://github.com/filecoin-project/FEVM-Hardhat-Kit/blob/8cab69c1226d11c8054a1a1861f293ff2b6b4ac0/contracts/filecoinMockAPIs/MarketAPI.sol#L170"
                  target="_blank"
                  rel="noreferrer"
                >
                  here
                </a>
                ).
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contract Address
                </label>
                <input
                  type="text"
                  name="nft-address"
                  id="nft-address"
                  placeholder="0x..."
                  value={contractAddress}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
