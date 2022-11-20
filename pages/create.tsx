import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ContractCreator from "../components/forms/ContractCreator";

export default function CreatePage() {
  return (
    <section className="container m-auto">
      <Link className="mt-4 inline-block" href="/">
        <div className="flex items-center gap-2 hover:text-gray-500">
          <ArrowLongLeftIcon className="w-6" />
          <span>back</span>
        </div>
      </Link>
      <h1 className="text-4xl mt-6">Create an NFT Deal Client Contract</h1>
      <h2 className="text-xl mb-6 text-gray-500">
        Control access to your marketplace with NFTs
      </h2>
      <ContractCreator />
    </section>
  );
}
