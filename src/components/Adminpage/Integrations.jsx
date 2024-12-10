import React, { useState } from "react";
import styled from "styled-components";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import backgroundImage from "file:///C:/Users/hrish/Downloads/How-to-prototype-dashboard-1.png.webp";
import {Box} from "@mui/material";

const Integrations = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [studentName, setStudentName] = useState("");
    const [studentCourse, setStudentCourse] = useState("");

    const toggleDarkMode = () => setDarkMode(!darkMode);

    const handleNameChange = (e) => setStudentName(e.target.value);
    const handleCourseChange = (e) => setStudentCourse(e.target.value);

    const handleClick = async () => {
        if (!studentName.trim() || !studentCourse.trim()) {
            alert("Please enter both student name and course.");
            return;
        }

        const student = {
            name: studentName.toUpperCase(),
            studentcourse: studentCourse.toUpperCase(),
        };

        try {
            const response = await fetch("https://student-backend-production-96c4.up.railway.app/student/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            });

            if (response.ok) {
                const text = await response.text();
                alert(text); // Show the server's success message
                setStudentName(""); // Clear the input fields
                setStudentCourse("");
            } else {
                alert(`Failed to add student: ${response.statusText}`);
            }
        } catch (error) {
            alert(`Error occurred: ${error.message}`);
        }
    };

    return (
        <StyledWrapper darkMode={darkMode}>
            <nav className="navbar">
                <div className="navbar-title">Add Student Data</div>
                <div className="toggle-container">
                    <button className="toggle-theme" onClick={toggleDarkMode}>
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </button>
                </div>
            </nav>
            <div className="form-container">
                <div className="wave-group">
                    <input
                        required
                        type="text"
                        className="input"
                        value={studentName}
                        onChange={handleNameChange}
                    />
                    <span className="bar" />
                    <label className="label">
                        {[..."Student Name"].map((char, index) => (
                            <span
                                key={index}
                                className="label-char"
                                style={{ "--index": index }}
                            >
                                {char}
                            </span>
                        ))}
                    </label>
                </div>
                <div className="wave-group">
                    <input
                        required
                        type="text"
                        className="input"
                        value={studentCourse}
                        onChange={handleCourseChange}
                    />
                    <span className="bar" />
                    <label className="label">
                        {[..."Student Course"].map((char, index) => (
                            <span
                                key={index}
                                className="label-char"
                                style={{ "--index": index }}
                            >
                                {char}
                            </span>
                        ))}
                    </label>
                </div>
            </div>
            <div className="button-container">
                <button className="add-student-button" onClick={handleClick}>
                    Add Student
                </button>
            </div>
            <div className="output-container">
                <h3>Entered Data:</h3>
                <p>Student Name: {studentName}</p>
                <p>Student Course: {studentCourse}</p>
            </div>

            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    zIndex: -1, // Ensure the background is behind other elements
                }}
            />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => (props.darkMode ? "#000" : "#fff")};
    color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    padding: 0 20px;

    .navbar {
        width: 100%;
        background-color: ${(props) =>
                props.darkMode ? "#1a1a1a" : "rgba(17,139,237,0.9)"};
        color: #fff;
        padding: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .navbar-title {
        font-size: 24px;
        font-weight: bold;
    }

    .toggle-container {
        display: flex;
        justify-content: flex-end;
    }

    .toggle-theme {
        background: none;
        border: none;
        color: #fff;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 20px;
    }

    .form-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 30px;
        margin-top: 20px;
    }

    .wave-group {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .wave-group .input {
        font-size: 16px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 250px;
        border: none;
        border-bottom: 1px solid
        ${(props) => (props.darkMode ? "#999" : "#515151")};
        background: transparent;
        color: inherit;
    }

    .wave-group .input:focus {
        outline: none;
    }

    .wave-group .label {
        color: ${(props) => (props.darkMode ? "#777" : "#999")};
        font-size: 18px;
        font-weight: normal;
        position: absolute;
        pointer-events: none;
        left: 5px;
        top: 10px;
        display: flex;
    }

    .wave-group .label-char {
        transition: 0.2s ease all;
        transition-delay: calc(var(--index) * 0.05s);
    }

    .wave-group .input:focus ~ label .label-char,
    .wave-group .input:valid ~ label .label-char {
        transform: translateY(-20px);
        font-size: 14px;
        color: ${(props) =>
                props.darkMode ? "rgba(17,139,237,0.9)" : "rgba(17,139,237,0.9)"};
    }

    .wave-group .bar {
        position: relative;
        display: block;
        width: 250px;
    }

    .wave-group .bar:before,
    .wave-group .bar:after {
        content: "";
        height: 2px;
        width: 0;
        bottom: 1px;
        position: absolute;
        background: ${(props) =>
                props.darkMode ? "rgba(17,139,237,0.9)" : "rgba(17,139,237,0.9)"};
        transition: 0.2s ease all;
    }

    .wave-group .bar:before {
        left: 50%;
    }

    .wave-group .bar:after {
        right: 50%;
    }

    .wave-group .input:focus ~ .bar:before,
    .wave-group .input:focus ~ .bar:after {
        width: 50%;
    }

    .button-container {
        display: flex;
        justify-content: center;
        margin-top: 30px;
    }

    .add-student-button {
        background-color: ${(props) =>
                props.darkMode ? "rgba(17,139,237,0.9)" : "rgba(17,139,237,0.9)"};
        color: #fff;
        border: none;
        padding: 10px 20px;
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .add-student-button:hover {
        background-color: ${(props) =>
                props.darkMode ? "rgba(17,139,237,0.9)" : "rgba(17,139,237,0.9)"};
    }

    .output-container {
        margin-top: 30px;
        font-size: 18px;
        color: ${(props) => (props.darkMode ? "#fff" : "#000")};
    }

    @media (max-width: 768px) {
        .form-container {
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }

        .wave-group .input {
            width: 80%;
        }

        .add-student-button {
            width: 80%;
        }

        .navbar-title {
            font-size: 18px;
        }

        .toggle-theme {
            font-size: 18px;
        }
    }
`;

export default Integrations;
