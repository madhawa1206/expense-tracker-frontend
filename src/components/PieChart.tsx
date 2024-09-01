import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Expense } from '../types/expense';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: Expense[];
  width?: number;
  height?: number;
}

const PieChart = ({ data, width = 400, height = 400 }: PieChartProps) => {
  const groupByType = (expenses: Expense[]) => {
    const grouped: { [key: string]: number } = {};
    expenses.forEach((expense) => {
      const type = expense.type.toLowerCase();
      if (grouped[type]) {
        grouped[type] += expense.amount;
      } else {
        grouped[type] = expense.amount;
      }
    });
    return grouped;
  };

  const groupedData = groupByType(data);

  const chartData: ChartData<'pie'> = {
    labels: Object.keys(groupedData),
    datasets: [
      {
        data: Object.values(groupedData),
        backgroundColor: Object.keys(groupedData).length
          ? ['#FF6384', '#36A2EB', '#FFCE56', '#E2E2E2']
          : ['#E2E2E2'],
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.chart.data.datasets[0].data.reduce(
              (a: number, b: number) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return `${label}: LKR ${value} (${percentage})`;
          },
        },
      },
    },
  };

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width, height }}
    >
      <Pie data={chartData} width={width} height={height} options={options} />
      {Object.keys(groupedData).length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-white bg-opacity-75 rounded-lg">
          No data available
        </div>
      )}
    </div>
  );
};

export default PieChart;
