
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  // Sample data for the chart (You can pass this as props or fetch from an API)
  const data = {
    labels: ['Math', 'English', 'Science', 'History', 'Geography'],  // Subjects or categories
    datasets: [
      {
        label: 'Student A Performance',
        data: [85, 90, 78, 92, 80],  // Scores of Student A in each subject
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Student B Performance',
        data: [75, 85, 88, 80, 70],  // Scores of Student B in each subject
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position of the legend
      },
      title: {
        display: true,
        text: 'Student Performance in Different Subjects', // Chart title
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10, // Customize Y-axis interval
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
