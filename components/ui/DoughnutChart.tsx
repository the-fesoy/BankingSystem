"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountsName = accounts.map((account) => {
    return account.name;
  });
  const balances = accounts.map((account) => {
    return account.currentBalance;
  });

  const data = {
    datasets: [
      {
        label: "Banks",
        data: balances, // Example data for the doughnut chart bro these are money charts why s 91k here xdd fx it
        backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
      },
    ],
    labels: accountsName,
  };
  return (
    <Doughnut
      data={data}
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
