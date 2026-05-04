import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const ReportProblemButton = () => {
  return (
    <section className="w-full">
      <Button className="cursor-pointer hover:bg-gray-100 hover:text-[#2a2a2a] transition-all w-full border-2 border-cyan-700 p-6 text-center ">
        Faced an issue? Report it to us
        <Image
          color="black"
          src={"/icons/flag.svg"}
          alt="flag svg"
          width={16}
          height={16}
        />
      </Button>
    </section>
  );
};

export default ReportProblemButton;
