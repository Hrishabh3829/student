import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./Home.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllData();
            processChartData(res);
        };

        fetchData();
    }, []);

    const getAllData = async () => {
        const res = (await axios.get("http://localhost:8080/student/getAll")).data;
        return res;
    };

    const processChartData = (data) => {
        const groupedData = data.reduce((acc, student) => {
            if (!acc[student.name]) {
                acc[student.name] = { courses: new Set() };
            }
            acc[student.name].courses.add(student.studentcourse); // Ensure unique courses
            return acc;
        }, {});

        const labels = Object.keys(groupedData); // X-axis: Student Names
        const courses = Object.values(groupedData).map(
            (student) => [...student.courses].join(", ")
        );

        const colors = labels.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

        const datasets = [
            {
                label: "Number of Courses",
                data: Object.values(groupedData).map((student) => student.courses.size),
                backgroundColor: colors,
            },
        ];

        setChartData({
            labels,
            datasets,
            courses,
        });
    };

    return (
        <div className="main-container">
            <h1 className="main-title">Student Analytical Performance</h1>
            {chartData ? (
                <div className="chart-wrapper">
                    <Bar
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            plugins: {
                                legend: { position: "top" },
                                tooltip: {
                                    callbacks: {
                                        label: function (context) {
                                            const index = context.dataIndex;
                                            const courseList = chartData.courses[index];
                                            return `Courses: ${courseList}`;
                                        },
                                    },
                                },
                            },
                            scales: {
                                x: {
                                    title: { display: true, text: "Student Names" },
                                    ticks: {
                                        autoSkip: false,
                                        maxRotation: 0,
                                        minRotation: 0,
                                    },
                                },
                                y: {
                                    title: { display: true, text: "Number of Courses" },
                                    ticks: {
                                        stepSize: 1,
                                        beginAtZero: true,
                                    },
                                },
                            },
                        }}
                    />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Home;
