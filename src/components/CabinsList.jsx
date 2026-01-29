import React from "react";
import CabinItem from "./CabinItem";
import { useGetCabinsByOpt } from "@/query/cabins/useGet";
import Spinner from "./Spinner";
import { Menus } from "../compose/Menus";
const CabinsList = () => {
  const { data, isPending } = useGetCabinsByOpt();

  if (isPending) {
    return <Spinner />;
  }
  return (
    <Menus>
    <ul className="py-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((cabin) => (
        
        <CabinItem key={cabin.id} cabin={cabin} />
      ))}
    </ul>
    </Menus>
  );
};

export default CabinsList;
