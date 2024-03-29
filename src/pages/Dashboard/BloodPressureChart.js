import React from "react";

import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
const BloodChart = ({
  data,
  filterStartDay,
  filterEndDay,
  selectedShowChatMetric,
}) => {
  const metric = useSelector((state) => state.metrics.metrics).filter(
    (metric) => metric._id === selectedShowChatMetric
  )[0];
  const ignore = metric.ignore;
  const sortedData = data.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  const dateArray = [];
  const hP = [];
  const lP = [];
  const hR = [];

  for (
    let currentDate = filterStartDay.clone();
    currentDate <= filterEndDay;
    currentDate.add(1, "days")
  ) {
    dateArray.push(currentDate.format("DD/MMMM"));

    const mm = sortedData.filter(
      (d) =>
        moment(d.createdAt).local().format("YYYY-MM-DD") ===
        currentDate.local().format("YYYY-MM-DD")
    );
    const total = mm[0]?.wage?.split(",");


    if (currentDate.format("DD/MMMM") === filterStartDay.format("DD/MMMM")) {
      mm[0]
        ? hP.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[0]),
        })
        : hP.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
      mm[0]
        ? lP.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[1]),
        })
        : lP.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
      mm[0]
        ? hR.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[2]),
        })
        : hR.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
    } else if (
      currentDate.format("DD/MMMM") === filterEndDay.format("DD/MMMM")
    ) {
      mm[0]
        ? hP.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[0]),
        })
        : hP.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
      mm[0]
        ? lP.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[1]),
        })
        : lP.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
      mm[0]
        ? hR.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[2]),
        })
        : hR.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
    } else {
      mm[0]
        ? hP.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[0]),
        })
        : !ignore &&
        hP.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
      mm[0]
        ? lP.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[1]),
        })
        : !ignore &&
        lP.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
      mm[0]
        ? hR.push({
          x: currentDate.format("DD/MMMM"),
          y: parseInt(total[2]),
        })
        : !ignore &&
        hR.push({
          x: currentDate.format("DD/MMMM"),
          y: 0,
        });
    }
  }
  console.log(hP, lP, hR);
  const state = {
    options: {
      colors: ["#008FFB", "#00E396", "#F04438", "#FF4560"],
      chart: {
        id: "basic-line",
        dropShadow: {
          enabled: true,
          top: 4,
          left: 4,
          blur: 3,
          opacity: 0.2,
        },
        background: "#ffffff",
      },
      xaxis: {
        categories: dateArray,
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        text: metric.name,
      },
      markers: {
        size: 6,
        strokeWidth: 0,
        colors: ["#FFA41B"],
        hover: {
          size: 8,
        },
      },

      tooltip: {
        theme: "dark",
        x: {
          show: true,
          format: "MMM",
        },
        y: [
          {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
          {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
        ],
      },
    },
    series: [
      {
        name: "Systolic pressure",
        data: hP,
      },
      {
        name: "Diastolic pressure ",
        data: lP,
      },
      {
        name: "Heart Rate",
        data: hR,
      },
    ],
  };

  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="line"
      height={350}
    />
  );
};

export default BloodChart;
