import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./Home.css"; // Import the CSS file

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
        const labels = data.map((student) => student.name);
        const courses = data.map((student) => student.studentcourse);

        const uniqueCourses = [...new Set(courses)];
        const colors = uniqueCourses.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

        const courseColors = {};
        uniqueCourses.forEach((course, index) => {
            courseColors[course] = colors[index];
        });

        const datasets = uniqueCourses.map((course) => ({
            label: course,
            data: labels.map((_, index) => (courses[index] === course ? 1 : 0)),
            backgroundColor: courseColors[course],
        }));

        setChartData({
            labels,
            datasets,
        });
    };

    return (
        <div className="chart-container">
            <h1>Student Analytical Performance</h1>
            {chartData ? (
                <Bar
                    data={chartData}
                    options={{
                        plugins: {
                            legend: { position: "top" },
                        },
                        scales: {
                            x: {
                                title: { display: true, text: "Student Names" },
                                ticks: {
                                    align: 'center', // Ensure labels are centered
                                },
                            },
                            y: {
                                title: { display: true, text: "Courses" },
                                ticks: {
                                    stepSize: 1,
                                },
                            },
                        },
                    }}
                />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Home;
