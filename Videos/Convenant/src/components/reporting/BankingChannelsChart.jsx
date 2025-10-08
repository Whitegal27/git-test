import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BankingChannelsChart = ({ approvedAccounts, flaggedAccounts }) => {
  const chartData = {
    labels: ['Internet', 'Mobile', 'Branch'],
    datasets: [
      {
        label: 'Approved Accounts',
        data: approvedAccounts,
        backgroundColor: '#10B981',
        borderRadius: 4,
        maxBarThickness: 40,
      },
      {
        label: 'Flagged Accounts',
        data: flaggedAccounts,
        backgroundColor: '#EF4444',
        borderRadius: 4,
        maxBarThickness: 40,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 50000,
        ticks: {
          stepSize: 10000,
          callback: function(value) {
            return value / 1000 + 'k';
          },
          font: {
            size: 12
          }
        },
        grid: {
          color: '#E5E7EB',
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <Card className="bg-white">
      <CardContent className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Banking Channels</h3>
        
        <div className="h-80">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BankingChannelsChart;