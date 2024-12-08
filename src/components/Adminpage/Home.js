import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import "./Home.css";

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const [courseChartData, setCourseChartData] = useState(null);
    const [attendanceChartData, setAttendanceChartData] = useState(null);
    const [students, setStudents] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);

    // Fetch all students data
    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/student/getAll");
            console.log("Students Data:", response.data);
            setStudents(response.data);
            processCourseChartData(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Fetch attendance data
    const fetchAttendance = async () => {
        try {
            const response = await axios.get("http://localhost:8080/student/getAll");
            console.log("Attendance Data:", response.data);
            setAttendanceList(response.data);
            processAttendanceChartData(response.data);
        } catch (error) {
            console.error("Error fetching attendance data:", error);
        }
    };

    useEffect(() => {
        fetchStudents();
        fetchAttendance();
    }, []);

    // Process data for the course pie chart
    const processCourseChartData = (data) => {
        const groupedData = data.reduce((acc, student) => {
            if (!acc[student.name]) {
                acc[student.name] = { courses: new Set() };
            }
            acc[student.name].courses.add(student.studentcourse); // Ensure unique courses
            return acc;
        }, {});

        const labels = Object.keys(groupedData);
        const dataValues = Object.values(groupedData).map(
            (student) => student.courses.size
        );

        const colors = labels.map(
            () => `#${Math.floor(Math.random() * 16777215).toString(16)}`
        );

        setCourseChartData({
            labels,
            datasets: [
                {
                    label: "Number of Courses",
                    data: dataValues,
                    backgroundColor: colors,
                },
            ],
        });
    };

    // Process data for the attendance bar chart
    const processAttendanceChartData = (data) => {
        const attendanceStatusCounts = data.reduce((acc, student) => {
            acc[student.attendanceStatus] = acc[student.attendanceStatus] || [];
            acc[student.attendanceStatus].push(student.name); // Collect student names
            return acc;
        }, {});

        const labels = Object.keys(attendanceStatusCounts);
        const dataValues = Object.values(attendanceStatusCounts).map(
            (students) => students.length
        );

        setAttendanceChartData({
            labels,
            datasets: [
                {
                    label: "Attendance Status",
                    data: dataValues,
                    backgroundColor: ["#4CAF50", "#FF5722", "#2196F3"], // Customize colors
                },
            ],
        });
    };

    return (
        <div className="main-container">
            <h1 className="main-title">Student Analytical Performance</h1>

            <div className="chart-section">
                {/* Card for Courses Pie Chart */}
                <div className="chart-card">
                    <h2>Courses per Student</h2>
                    {courseChartData ? (
                        <div className="pie-chart-container">
                            <Pie
                                data={courseChartData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: { position: "top" },
                                        tooltip: {
                                            callbacks: {
                                                label: function (context) {
                                                    const studentName =
                                                        context.label;
                                                    const courses =
                                                        students
                                                            .filter(
                                                                (student) =>
                                                                    student.name ===
                                                                    studentName
                                                            )
                                                            .map((student) =>
                                                                student.studentcourse
                                                            )
                                                            .flat()
                                                            .join(", ");
                                                    return `${studentName}: ${courses}`;
                                                },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    ) : (
                        <p>Loading course data...</p>
                    )}
                </div>

                <div className="divider"></div>

                {/* Card for Attendance Bar Chart */}
                <div className="chart-card">
                    <h2>Attendance Status</h2>
                    {attendanceChartData ? (
                        <Bar
                            data={attendanceChartData}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                const status =
                                                    context.label;
                                                const studentsNames =
                                                    attendanceList
                                                        .filter(
                                                            (student) =>
                                                                student.attendanceStatus ===
                                                                status
                                                        )
                                                        .map((student) => student.name)
                                                        .join(", ");
                                                return `P: ${studentsNames}`;
                                            },
                                        },
                                    },
                                },
                                scales: {
                                    x: {
                                        title: { display: true, text: "Attendance Status" },
                                    },
                                    y: {
                                        title: { display: true, text: "Number of Students" },
                                        beginAtZero: true,
                                        stepSize: 1,
                                    },
                                },
                            }}
                        />
                    ) : (
                        <p>Loading attendance data...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
