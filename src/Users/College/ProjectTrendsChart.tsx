import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const ProjectTrendsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");

  useEffect(() => {
    if (!chartRef.current) return;
    const myChart = echarts.init(chartRef.current, undefined, { width: "auto", height: "auto" });

    const data = {
      "This Week": [30, 50, 40, 60, 70, 90, 80],
      "This Month": [120, 180, 150, 220, 260, 290],
      "This Year": [900, 1100, 1500, 1700, 1900, 2100],
    };

    const option = {
      tooltip: { trigger: "axis" },
      grid: { left: "3%", right: "3%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
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
          name: "Carbon Credits",
          type: "line",
          data: data[selectedPeriod as keyof typeof data],
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { color: "#34C759", width: 3 },
          itemStyle: { color: "#34C759" },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(52, 199, 89, 0.3)" },
              { offset: 1, color: "rgba(52, 199, 89, 0.1)" },
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
  }, [selectedPeriod]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg w-full mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Project Trends</h2>
        <div className="flex gap-2">
          {["This Week", "This Month", "This Year"].map((period) => (
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

export default ProjectTrendsChart;
