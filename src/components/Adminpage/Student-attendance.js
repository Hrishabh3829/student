import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Studentattendance.css";


const StudentAttendance = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [attendanceStatus, setAttendanceStatus] = useState("");
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [stud, setStud] = useState([])

    const fetchData = async () => {
        try {
            const res = (await axios.get("http://localhost:8080/student/getAll")).data;
            console.log(res)
            setStud(res.data)

            const attandanceList = document.getElementById("attandanceList")
            attandanceList.innerHTML = ''
            res.forEach(data=>{
                const li = document.createElement("ul")
                li.innerHTML = `NAME: ${data.name}       ATTENDANCE: ${data.attendanceStatus
                }`

                attandanceList.appendChild(li)
            })

        } catch (error) {
            alert("Failed to fetch students data.");
            console.error(error);
        }
    }

        useEffect(() => {
            axios.get("http://localhost:8080/student/getAll")
                .then((response) => setStudents(response.data))
                .catch((error) => console.error("Error fetching students:", error));
        }, []);

        const markAttendance = () => {
            if (!selectedStudent || !attendanceStatus) {
                alert("Please select a student and attendance status!");
                return;
            }

            axios.put(`http://localhost:8080/student/markAttendance/${selectedStudent}?status=${attendanceStatus}`)
                .then(() => {
                    alert("Attendance marked successfully!");
                    fetchAttendanceRecords(selectedStudent);
                })
                .catch((error) => console.error("Error marking attendance:", error));
        };

        const fetchAttendanceRecords = (studentId) => {
            axios.get(`http://localhost:8080/student/getAttendance/${studentId}`)
                .then((response) => setAttendanceRecords(response.data))
                .catch((error) => console.error("Error fetching attendance:", error));
        };

        return (
            <div>
                <h1>Student Attendance</h1>
                <div>
                    <label>Select Student: </label>
                    <select onChange={(e) => setSelectedStudent(e.target.value)}>
                        <option value="">--Select--</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name} ({student.studentcourse})
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Attendance Status: </label>
                    <select onChange={(e) => setAttendanceStatus(e.target.value)}>
                        <option value="">--Select--</option>
                        <option value="P">Present</option>
                        <option value="A">Absent</option>
                    </select>
                    <button onClick={markAttendance}>Mark Attendance</button>
                </div>

                <div>
                    <h2>Attendance Records</h2>
                    <button onClick={async ()=>{
                        await fetchData()

                    }}>View Attendance</button>
                    <ul id={"attandanceList"}>
                        <li key={attendanceRecords.index}>{attendanceRecords.record}</li>


                    </ul>
                </div>
            </div>
        );

}

export default StudentAttendance;
