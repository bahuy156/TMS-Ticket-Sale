/* eslint-disable array-callback-return */
import { useEffect, useState } from "react";
import { Chart, LineElement } from "chart.js/auto";
import { Line } from "react-chartjs-2";

Chart.register(LineElement);

// interface DataMonth {
//   day: string;
//   amount: string;
// }

interface DataSets {
  label: string;
  data: string[];
  tension: number;
  borderColor: string;
  pointBorderColor: string;
  backgroundColor: CanvasGradient;
  fill: boolean;
  spanGaps: boolean;
}

interface ChartData {
  labels: string[];
  datasets: DataSets[];
}

interface DataProps {
  dataFamily: any;
  dataDayOfMonth: any;
}

// const dataList1: DataMonth[] = [
//   { day: "Thứ 4", amount: "186.0" },
//   { day: "Thứ 4", amount: "140.0" },
//   { day: "Thứ 4", amount: "248.0" },
//   { day: "Thứ 5", amount: "210.0" },
// ];

function LineChartComponent(props: DataProps) {
  const [dataList, setDataList] = useState<any[]>([]);

  const dataDayOfMonth = props.dataDayOfMonth;

  useEffect(() => {
    const valueSort = dataDayOfMonth.sort(
      (a: any, b: any) => parseFloat(a.usedate) - parseFloat(b.usedate)
    );
    console.log(valueSort);

    const arrayDay: any[] = [[], [], [], [], [], []];

    valueSort.map((item: any) => {
      const daySplit = item.usedate.split("/")[0];

      if (daySplit >= 1 && daySplit <= 5) {
        arrayDay[0].push(item);
      }
      if (daySplit >= 6 && daySplit <= 10) {
        arrayDay[1].push(item);
      }
      if (daySplit >= 11 && daySplit <= 15) {
        arrayDay[2].push(item);
      }
      if (daySplit >= 16 && daySplit <= 20) {
        arrayDay[3].push(item);
      }
      if (daySplit >= 21 && daySplit <= 25) {
        arrayDay[4].push(item);
      }
      if (daySplit >= 26 && daySplit <= 31) {
        arrayDay[5].push(item);
      }
    });

    console.log(arrayDay);

    setDataList(
      arrayDay.map((listday: any, index: any) => {
        return {
          day:
            index === 0
              ? "01 - 05"
              : index === 1
              ? "06 - 10"
              : index === 2
              ? "11 - 15"
              : index === 3
              ? "16 - 20"
              : index === 4
              ? "21 - 25"
              : "26 - 31",
          amount: listday.reduce(
            (prev: any, curr: any) => (prev += Number(curr.price)),
            0
          ),
        };
      })
    );
  }, [dataDayOfMonth]);

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        tension: 0.5,
        borderColor: "",
        pointBorderColor: "",
        backgroundColor: {} as CanvasGradient,
        fill: true,
        spanGaps: true,
      },
    ],
  });

  console.log(dataList);

  useEffect(() => {
    setChartData({
      labels: dataList.map((month) => month.day),
      datasets: [
        {
          label: "",
          data: dataList.map((month) => month.amount),
          tension: 0.5,
          borderColor: "#FF993C",
          pointBorderColor: "transparent",
          backgroundColor: createLinearGradient(),
          fill: true,
          spanGaps: true,
        },
      ],
    });
  }, [dataList]);

  const createLinearGradient = () => {
    const ctx = document.createElement("canvas").getContext("2d");
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 190);
      gradient.addColorStop(0, "#FAA05F");
      gradient.addColorStop(1, "#FFFFFF");
      return gradient;
    }
    return {} as CanvasGradient;
  };

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 40,
        },
      },
      x: {
        grid: {
          display: false,
          drawOnChartArea: false,
          drawTicks: false,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line width={400} data={chartData} height={70} options={options} />;
}

export default LineChartComponent;
