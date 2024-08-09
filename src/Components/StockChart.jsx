import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StockChart = ({ stock }) => {
  const aggregatedStock = stock.reduce((acc, item) => {
    if (acc[item.nom]) {
      acc[item.nom] += item.quantite;
    } else {
      acc[item.nom] = item.quantite;
    }
    return acc;
  }, {});

  const labels = Object.keys(aggregatedStock);
  const dataValues = Object.values(aggregatedStock);

  const data = {
    labels: labels, 
    datasets: [
      {
        label: 'Quantité en Stock',
        data: dataValues, 
        backgroundColor: 'rgba(0, 100, 0, 0.6)', 
        borderColor: 'rgba(0, 100, 0, 1)',
        borderWidth: 4,
        barThickness: 25, 
        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `Quantité: ${tooltipItem.raw}`; 
          },
        },
      },
    },
    scales: {
      x: {
        barPercentage: 0.2,
        categoryPercentage: 0.2,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', 
        },
        ticks: {
          color: 'rgba(0, 0, 0, 1)', 
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)', 
        },
        ticks: {
          color: 'rgba(0, 0, 0, 1)', 
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StockChart;
