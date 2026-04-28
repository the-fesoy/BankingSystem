"use client";
import React from "react";
import CountUp from "react-countup";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div className="w-full">
      <CountUp
        decimal=","
        decimals={2}
        duration={2.75}
        end={amount}
        prefix="$"
      />
    </div>
  );
};

export default AnimatedCounter;
