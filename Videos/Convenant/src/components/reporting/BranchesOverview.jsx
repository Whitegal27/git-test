import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BranchesOverview = ({ totalAmount, percentageChange, branchData }) => {
  const chartData = {
    labels: branchData.map(branch => branch.name),
    datasets: [
      {
        data: branchData.map(branch => branch.value),
        backgroundColor: [
          '#10B981', // Green
          '#3B82F6', // Blue
          '#8B5CF6', // Purple
          '#F59E0B', // Yellow
          '#EF4444', // Red
          '#06B6D4', // Cyan
          '#84CC16', // Lime
          '#F97316', // Orange
          '#EC4899', // Pink
          '#6B7280', // Gray
          '#14B8A6', // Teal
          '#A855F7'  // Violet
        ],
        borderWidth: 0,
        cutout: '60%'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const percentage = ((value / branchData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
            return `${label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">All Branches</h3>
          <select className="text-sm border border-gray-300 rounded px-3 py-1">
            <option>All Branches</option>
          </select>
        </div>

        <div className="mb-6">
          <p className="text-2xl font-bold text-gray-900">₦{totalAmount}</p>
          <p className="text-sm text-green-600">↗ {percentageChange}</p>
        </div>

        <div className="flex gap-6">
          <div className="w-64 h-64">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
          
          <div className="flex-1 space-y-3">
            {branchData.map((branch, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                  ></div>
                  <span className="text-gray-700">{branch.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-medium text-gray-900">{branch.value.toLocaleString()}</span>
                  <span className="ml-2 text-gray-500">{branch.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BranchesOverview;