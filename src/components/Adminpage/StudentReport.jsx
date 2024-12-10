import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import "./StudentReport.css";

// Import required Chart.js modules
import {
    Chart as ChartJS,
    RadarController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement, // Import PointElement for radar chart points
    LineElement, // Import LineElement for line chart functionality
} from "chart.js";

// Register all necessary components for the radar chart and line charts
ChartJS.register(
    RadarController,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement, // Register PointElement for radar chart points
    LineElement // Register LineElement for line charts
);

const StudentReport = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get("https://student-backend-production-96c4.up.railway.app/student/getAll");
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, []);

    // Prepare data for Radar Chart
    const chartData = {
        labels: students.map((student) => `${student.name} - ${student.studentcourse}`), // Student Name and Course
        datasets: [
            {
                label: "Marks",
                data: students.map((student) => student.studentmarks),
                backgroundColor: "rgba(66, 165, 245, 0.4)", // Semi-transparent blue for background
                borderColor: "#42A5F5",
                borderWidth: 1,
                pointBackgroundColor: "#1E88E5", // Color of the points
                pointBorderColor: "#fff", // Border color of the points
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    font: {
                        size: 14,
                    },
                },
            },
            title: {
                display: true,
                text: "Student Performance Radar Chart",
                font: {
                    size: 20,
                    weight: 'bold',
                },
                color: "#333",
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.raw !== null) {
                            label += context.raw + ' Marks';
                        }
                        return label;
                    },
                },
            },
        },
        scales: {
            r: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10,
                    max: 100, // Maximum value to be capped at 100
                },
            },
        },
    };

    return (
        <div className="student-report-container">
            <h1 className="report-title">Student Performance Analysis</h1>
            <div className="chart-container">
                {students.length > 0 ? (
                    <Radar
                        data={chartData}
                        options={chartOptions}
                        width={600} // Fixed width for the chart
                        height={400} // Fixed height for the chart
                    />
                ) : (
                    <p className="loading-text">Loading data...</p>
                )}
            </div>
        </div>
    );
};

export default StudentReport;
