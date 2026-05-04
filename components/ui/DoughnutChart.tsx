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
        data: balances, // i had an example of 91k dollars now real data shows only 100$ ;-; SHI-
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
