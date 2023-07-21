import { useEffect, useState } from "react";
import { Chart as Chartjs, PointElement } from "chart.js/auto";
import { Doughnut  } from "react-chartjs-2";

Chartjs.register(PointElement);

interface DataSets {
  data: number[];
  hoverOffset: number;
  backgroundColor: string[];
}

interface TypeChart {
  datasets: DataSets[];
}

const chartData: TypeChart = {
  datasets: [
    {
      data: [],
      hoverOffset: 0,
      backgroundColor: [],
    },
  ],
};

function ChartDoughnut() {
  const [chartDemo, setChartDemo] = useState<TypeChart>(chartData);

  useEffect(() => {
    const data = [120, 250];
    const backgroundColors = [
      'rgba(255, 138, 72, 1)', //Cam
      'rgba(79, 117, 255, 1)', // Blue 
    ];

    setChartDemo({
      datasets: [
        {
          data,
          hoverOffset: 4,
          backgroundColor: backgroundColors,
        },
      ],
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    height: 190,
    width: 190,
  };

  return <Doughnut data={chartDemo} options={options} />;
}

export default ChartDoughnut;
