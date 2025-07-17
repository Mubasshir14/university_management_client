/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  TooltipItem,
  Chart as ChartJSOrUndefined, // Import ChartJS as ChartJSOrUndefined for the ref type
} from "chart.js";
import { useEffect, useRef } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";

// Register Chart.js components and plugins
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

// Define the structure for your statistics data
interface Stat {
  label: string;
  value: number;
  suffix: string;
}

// Your statistics data
const stats: Stat[] = [
  { label: "Students", value: 25000, suffix: "+" },
  { label: "Faculty", value: 500, suffix: "+" },
  { label: "Courses", value: 300, suffix: "+" },
  { label: "Graduates", value: 10000, suffix: "+" },
  { label: "Research Projects", value: 150, suffix: "+" },
];

// Define chart data using the stats array
const chartData: ChartData<"bar"> = {
  labels: stats.map((stat) => stat.label),
  datasets: [
    {
      label: "University Stats",
      data: stats.map((stat) => stat.value),
      backgroundColor: (ctx) => {
        // Default gradient for initial render if useEffect hasn't run yet
        const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)"); // blue-500
        gradient.addColorStop(1, "rgba(147, 51, 234, 0.8)"); // purple-500
        return gradient;
      },
      borderColor: "rgba(59, 130, 246, 1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(236, 72, 153, 0.9)", // pink-500
    },
  ],
};

// Define chart options
const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) =>
          `${context.dataset.label}: ${context.raw}${stats[context.dataIndex].suffix}`,
      },
    },
    datalabels: {
      display: true,
      color: "#4B5563", // gray-600
      anchor: "end",
      align: "top",
      formatter: (value: number, context: any) =>
        `${value.toLocaleString()}${stats[context.dataIndex].suffix}`,
      font: { size: 12, weight: "bold" },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: { color: "#4B5563" }, // gray-600
      grid: { color: "rgba(209, 213, 219, 0.2)" }, // gray-200
    },
    x: {
      ticks: { color: "#4B5563" }, // gray-600
      grid: { display: false },
    },
  },
  animation: {
    duration: 1500,
    easing: "easeOutQuart",
    delay: (context: any) => context.dataIndex * 150,
  },
};

export const StatisticsView = () => {
  // CORRECTED REF TYPE:
  const chartRef = useRef<ChartJSOrUndefined<"bar", (number | [number, number] | null)[], unknown>>(null);

  // Effect to apply gradient after chart is mounted (for correct rendering)
  useEffect(() => {
    // Access the Chart.js instance via chartRef.current
    const chart = chartRef.current;

    if (chart) {
      const ctx = chart.ctx; // Get the context from the chart instance
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)"); // blue-500
      gradient.addColorStop(1, "rgba(147, 51, 234, 0.8)"); // purple-500

      // Update the dataset's background color
      if (chart.data.datasets[0]) {
        chart.data.datasets[0].backgroundColor = gradient;
      }
      chart.update(); // Important: Call update to re-render the chart with the new gradient
    }
  }, []); // Empty dependency array means this runs once after initial render

  return (
    <section className="py-20 bg-gradient-to-b from-blue-600/10 to-purple-600/10 relative overflow-hidden">
      {/* Background SVG for subtle animation and texture */}
      <div className="absolute inset-0 opacity-10 animate-pulse-slow">
        <svg className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="10%" cy="10%" r="100" fill="url(#pattern1)" />
          <circle cx="90%" cy="90%" r="150" fill="url(#pattern2)" />
          <circle cx="50%" cy="0%" r="80" fill="url(#pattern3)" />
          <circle cx="0%" cy="50%" r="120" fill="url(#pattern4)" />
          <defs>
            <radialGradient id="pattern1" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="pattern2" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
             <radialGradient id="pattern3" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="pattern4" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4 drop-shadow-lg relative"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 80 }}
        >
          Our Impact
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-500 to-teal-500 rounded-full" />
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 text-lg sm:text-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          Key Metrics Driving Our University’s Success
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut", type: "spring", stiffness: 100 }}
          whileHover={{ scale: 1.02 }}
          className="group"
        >
          <Card className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-2xl group-hover:shadow-3xl max-w-5xl mx-auto group-hover:ring-2 group-hover:ring-blue-500/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="h-80 sm:h-96 lg:h-[450px]">
                {/* Use the corrected chartRef here */}
                <Bar data={chartData} options={chartOptions} ref={chartRef} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-8 text-center"
        >
          <Button
            variant="outline"
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600 transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl"
            asChild
          >
            <a href="/programs">Explore Our Programs</a>
          </Button>
        </motion.div>
      </div>
      {/* Custom Tailwind CSS for pulse animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0% {
            transform: scale(1);
            opacity: 0.1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.15;
          }
          100% {
            transform: scale(1);
            opacity: 0.1;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default StatisticsView;