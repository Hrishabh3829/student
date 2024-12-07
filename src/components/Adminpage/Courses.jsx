import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Courses.css"; // Import CSS for styling

const Courses = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:8080/student/getAll");
            setStudents(res.data);
        };

        fetchData();
    }, []);

    const handleMarkChange = (index, marks) => {
        // Update marks for the student
        const updatedStudents = [...students];
        updatedStudents[index].studentmarks = marks;
        setStudents(updatedStudents);
    };

    const handleSubmit = async (student) => {
        // You can send updated data to the backend here
        const res = await axios.post("http://localhost:8080/student/add",student)
        // console.log("Updated Student Data:", res);
    };

    return (
        <div className="courses-container">
            <h1>Registered Courses and Marks</h1>
            <table className="courses-table">
                <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Marks</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student, index) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.studentcourse}</td>
                        <td>
                            <input
                                type="number"
                                value={student.studentmarks || ""}
                                onChange={(e) => handleMarkChange(index, e.target.value)}
                                className="marks-input"
                            />
                        </td>
                        <td>
                            <button
                                onClick={() => handleSubmit(student)}
                                className="submit-button"
                            >
                                Submit
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Courses;
