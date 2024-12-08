import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Studentattendance.css";

const StudentAttendance = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [fetchedAttendanceList, setFetchedAttendanceList] = useState([]);

    // Fetch all students
    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:8080/student/getAll");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
            alert("Failed to fetch students data.");
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Mark attendance for a student
    const markAttendance = async () => {
        if (!selectedStudent || !attendanceStatus) {
            alert("Please select a student and attendance status!");
            return;
        }
        try {
            await axios.put(
                `http://localhost:8080/student/markAttendance/${selectedStudent}?status=${attendanceStatus}`
            );
            alert("Attendance marked successfully!");
            await fetchAttendanceRecords(selectedStudent);
        } catch (error) {
            console.error("Error marking attendance:", error);
        }
    };

    // Fetch attendance records for a student
    const fetchAttendanceRecords = async (studentId) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/student/getAttendance/${studentId}`
            );
            const data = Array.isArray(response.data) ? response.data : []; // Ensure it's an array
            setAttendanceRecords(data);
        } catch (error) {
            console.error("Error fetching attendance records:", error);
        }
    };

    // Fetch data for the full attendance list (including course)
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8080/student/getAll");
            const data = response.data || [];
            setFetchedAttendanceList(data);
        } catch (error) {
            alert("Failed to fetch students data.");
            console.error(error);
        }
    };

    return (
        <div className="student-attendance">
            <h1>Student Attendance</h1>
            <div className="form-section">
                <label>Select Student:</label>
                <select
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    value={selectedStudent || ""}
                >
                    <option value="">--Select--</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name} ({student.studentcourse})
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-section">
                <label>Attendance Status:</label>
                <select
                    onChange={(e) => setAttendanceStatus(e.target.value)}
                    value={attendanceStatus}
                >
                    <option value="">--Select--</option>
                    <option value="P">Present</option>
                    <option value="A">Absent</option>
                </select>
                <button onClick={markAttendance}>Mark Attendance</button>
            </div>

            <div>
                <h2>All Students Attendance List</h2>
                <button
                    onClick={async () => {
                        await fetchData();
                    }}
                >
                    View Attendance
                </button>
                <table className="attendance-table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Course</th> {/* Added course column */}
                        <th>Attendance Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {fetchedAttendanceList.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.studentcourse}</td> {/* Display course */}
                            <td>{student.attendanceStatus}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentAttendance;
