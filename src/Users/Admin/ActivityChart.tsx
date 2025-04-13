// // import React, { useEffect, useRef, useState } from "react";
// // import * as echarts from "echarts";

// // const ActivityChart: React.FC = () => {
// //   const chartRef = useRef<HTMLDivElement>(null);
// //   const [selectedPeriod, setSelectedPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");

// //   const data: Record<"This Week" | "This Month" | "This Year", { pending: number[]; validated: number[]; rejected: number[] }> = {
// //     "This Week": {
// //       pending: [12, 18, 15, 20, 25, 22, 30],
// //       validated: [30, 40, 50, 55, 65, 70, 80],
// //       rejected: [5, 6, 7, 10, 9, 12, 14],
// //     },
// //     "This Month": {
// //       pending: [60, 80, 90, 100, 110, 120],
// //       validated: [150, 180, 200, 230, 250, 280],
// //       rejected: [15, 20, 25, 30, 35, 40],
// //     },
// //     "This Year": {
// //       pending: [400, 450, 500, 550, 600, 650],
// //       validated: [1000, 1200, 1400, 1600, 1800, 2000],
// //       rejected: [100, 120, 140, 160, 180, 200],
// //     },
// //   };

// //   useEffect(() => {
// //     if (!chartRef.current) return;
// //     const myChart = echarts.init(chartRef.current, undefined, { width: "auto", height: "auto" });

// //     const option = {
// //       tooltip: { trigger: "axis" },
// //       grid: { left: "3%", right: "3%", bottom: "3%", containLabel: true },
// //       xAxis: {
// //         type: "category",
// //         data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
// //         axisLine: { lineStyle: { color: "#ccc" } },
// //         axisLabel: { color: "#666" },
// //       },
// //       yAxis: {
// //         type: "value",
// //         axisLine: { lineStyle: { color: "#ccc" } },
// //         axisLabel: { color: "#666" },
// //         splitLine: { lineStyle: { color: "#eee" } },
// //       },
// //       series: [
// //         {
// //           name: "Pending",
// //           type: "line",
// //           data: data[selectedPeriod].pending,
// //           smooth: true,
// //           symbol: "circle",
// //           symbolSize: 8,
// //           lineStyle: { color: "#FFA500", width: 3 },
// //           itemStyle: { color: "#FFA500" },
// //           areaStyle: {
// //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //               { offset: 0, color: "rgba(255, 165, 0, 0.3)" },
// //               { offset: 1, color: "rgba(255, 165, 0, 0.1)" },
// //             ]),
// //           },
// //         },
// //         {
// //           name: "Validated",
// //           type: "line",
// //           data: data[selectedPeriod].validated,
// //           smooth: true,
// //           symbol: "circle",
// //           symbolSize: 8,
// //           lineStyle: { color: "#10B981", width: 3 },
// //           itemStyle: { color: "#10B981" },
// //           areaStyle: {
// //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //               { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
// //               { offset: 1, color: "rgba(16, 185, 129, 0.1)" },
// //             ]),
// //           },
// //         },
// //         {
// //           name: "Rejected",
// //           type: "line",
// //           data: data[selectedPeriod].rejected,
// //           smooth: true,
// //           symbol: "circle",
// //           symbolSize: 8,
// //           lineStyle: { color: "#FF4D4D", width: 3 },
// //           itemStyle: { color: "#FF4D4D" },
// //           areaStyle: {
// //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
// //               { offset: 0, color: "rgba(255, 77, 77, 0.3)" },
// //               { offset: 1, color: "rgba(255, 77, 77, 0.1)" },
// //             ]),
// //           },
// //         },
// //       ],
// //     };

// //     myChart.setOption(option);

// //     const handleResize = () => myChart.resize();
// //     window.addEventListener("resize", handleResize);

// //     return () => {
// //       window.removeEventListener("resize", handleResize);
// //       myChart.dispose();
// //     };
// //   }, [selectedPeriod]);

// //   return (
// //     <div className="bg-white rounded-xl p-6 shadow-lg w-full mb-10">
// //       <div className="flex justify-between items-center mb-6">
// //         <h2 className="text-xl font-semibold">Verification Activity</h2>
// //         <div className="flex gap-2">
// //           {(["This Week", "This Month", "This Year"] as const).map((period) => (
// //             <button
// //               key={period}
// //               onClick={() => setSelectedPeriod(period)}
// //               className={`px-4 py-2 text-sm rounded-lg transition-all ${
// //                 selectedPeriod === period
// //                   ? "bg-blue-600 text-white"
// //                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //               }`}
// //             >
// //               {period}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //       <div ref={chartRef} className="w-full h-96"></div>
// //     </div>
// //   );
// // };

// // export default ActivityChart;
// import React, { useEffect, useRef, useState } from "react";
// import * as echarts from "echarts";
// import { backend_url } from "../../backend_route"; // Assuming this is the correct import

// const ActivityChart: React.FC = () => {
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [selectedPeriod, setSelectedPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");
//   const [chartData, setChartData] = useState<{ pending: number[]; validated: number[]; rejected: number[] }>({
//     pending: [],
//     validated: [],
//     rejected: [],
//   });

//   useEffect(() => {
//     const fetchActivityStats = async () => {
//       try {
//         const response = await fetch(`${backend_url}/admin/activity-stats?period=${selectedPeriod.toLowerCase().replace(" ", "_")}`);
//         const data = await response.json();

//         if (response.ok) {
//           setChartData({
//             pending: [data.pending],
//             validated: [data.approved],
//             rejected: [data.rejected],
//           });
          
//         } else {
//           console.error("Error fetching activity stats:", data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching activity stats:", error);
//       }
//     };

//     fetchActivityStats();
//   }, [selectedPeriod]);

//   useEffect(() => {
//     if (!chartRef.current) return;
//     const myChart = echarts.init(chartRef.current, undefined, { width: "auto", height: "auto" });

//     const option = {
//       tooltip: { trigger: "axis" },
//       grid: { left: "3%", right: "3%", bottom: "3%", containLabel: true },
//       xAxis: {
//         type: "category",
//         data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//         axisLine: { lineStyle: { color: "#ccc" } },
//         axisLabel: { color: "#666" },
//       },
//       yAxis: {
//         type: "value",
//         axisLine: { lineStyle: { color: "#ccc" } },
//         axisLabel: { color: "#666" },
//         splitLine: { lineStyle: { color: "#eee" } },
//       },
//       series: [
//         {
//           name: "Pending",
//           type: "line",
//           data: chartData.pending,
//           smooth: true,
//           symbol: "circle",
//           symbolSize: 8,
//           lineStyle: { color: "#FFA500", width: 3 },
//           itemStyle: { color: "#FFA500" },
//           areaStyle: {
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               { offset: 0, color: "rgba(255, 165, 0, 0.3)" },
//               { offset: 1, color: "rgba(255, 165, 0, 0.1)" },
//             ]),
//           },
//         },
//         {
//           name: "Validated",
//           type: "line",
//           data: chartData.validated,
//           smooth: true,
//           symbol: "circle",
//           symbolSize: 8,
//           lineStyle: { color: "#10B981", width: 3 },
//           itemStyle: { color: "#10B981" },
//           areaStyle: {
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
//               { offset: 1, color: "rgba(16, 185, 129, 0.1)" },
//             ]),
//           },
//         },
//         {
//           name: "Rejected",
//           type: "line",
//           data: chartData.rejected,
//           smooth: true,
//           symbol: "circle",
//           symbolSize: 8,
//           lineStyle: { color: "#FF4D4D", width: 3 },
//           itemStyle: { color: "#FF4D4D" },
//           areaStyle: {
//             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//               { offset: 0, color: "rgba(255, 77, 77, 0.3)" },
//               { offset: 1, color: "rgba(255, 77, 77, 0.1)" },
//             ]),
//           },
//         },
//       ],
//     };

//     myChart.setOption(option);

//     const handleResize = () => myChart.resize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       myChart.dispose();
//     };
//   }, [chartData]);

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-lg w-full mb-10">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Verification Activity</h2>
//         <div className="flex gap-2">
//           {(["This Week", "This Month", "This Year"] as const).map((period) => (
//             <button
//               key={period}
//               onClick={() => setSelectedPeriod(period)}
//               className={`px-4 py-2 text-sm rounded-lg transition-all ${
//                 selectedPeriod === period
//                   ? "bg-blue-600 text-white"
//                   : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//               }`}
//             >
//               {period}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div ref={chartRef} className="w-full h-96"></div>
//     </div>
//   );
// };

// export default ActivityChart;

import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { backend_url } from "../../backend_route"; // Assuming this is the correct import

const ActivityChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<"This Week" | "This Month" | "This Year">("This Month");
  const [chartData, setChartData] = useState<{ pending: number[]; validated: number[]; rejected: number[] }>({
    pending: [],
    validated: [],
    rejected: [],
  });
  const [xAxisLabels, setXAxisLabels] = useState<string[]>([]); // To handle dynamic x-axis labels (days, weeks, months)

  useEffect(() => {
    const fetchActivityStats = async () => {
      try {
        const response = await fetch(`${backend_url}/admin/activity-stats?period=${selectedPeriod.toLowerCase().replace(" ", "_")}`);
        const data = await response.json();

        if (response.ok) {
          setChartData({
            pending: data.pending, // Assume the data is returned as an array of numbers
            validated: data.approved,
            rejected: data.rejected,
          });
          setXAxisLabels(data.xAxisLabels); // Dynamically setting the x-axis labels
        } else {
          console.error("Error fetching activity stats:", data.message);
        }
      } catch (error) {
        console.error("Error fetching activity stats:", error);
      }
    };

    fetchActivityStats();
  }, [selectedPeriod]);

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current, undefined, { width: "auto", height: "auto" });

    const option = {
      tooltip: { trigger: "axis" },
      grid: { left: "3%", right: "3%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: xAxisLabels, // Dynamic x-axis based on the period
        axisLine: { lineStyle: { color: "#ccc" } },
        axisLabel: { color: "#666" },
      },
      yAxis: {
        type: "value",
        axisLine: { lineStyle: { color: "#ccc" } },
        axisLabel: { color: "#666" },
        splitLine: { lineStyle: { color: "#eee" } },
      },
      series: [
        {
          name: "Pending",
          type: "line",
          data: chartData.pending,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { color: "#FFA500", width: 3 },
          itemStyle: { color: "#FFA500" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255, 165, 0, 0.3)" },
              { offset: 1, color: "rgba(255, 165, 0, 0.1)" },
            ]),
          },
        },
        {
          name: "Validated",
          type: "line",
          data: chartData.validated,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { color: "#10B981", width: 3 },
          itemStyle: { color: "#10B981" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(16, 185, 129, 0.3)" },
              { offset: 1, color: "rgba(16, 185, 129, 0.1)" },
            ]),
          },
        },
        {
          name: "Rejected",
          type: "line",
          data: chartData.rejected,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { color: "#FF4D4D", width: 3 },
          itemStyle: { color: "#FF4D4D" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255, 77, 77, 0.3)" },
              { offset: 1, color: "rgba(255, 77, 77, 0.1)" },
            ]),
          },
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [chartData, xAxisLabels]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg w-full mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Verification Activity</h2>
        <div className="flex gap-2">
          {(["This Week", "This Month", "This Year"] as const).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                selectedPeriod === period
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div ref={chartRef} className="w-full h-96"></div>
    </div>
  );
};

export default ActivityChart;
