import React from "react";
import "./StudentProfiles.css";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";

const StudentProfiles = ({ students }) => {
    return (
        <div className="student-cards-container">
            {students.map((student) => (
                <div key={student.id} className="student-card">
                    <div className="profile-photo">
                        {/* Profile picture or icon */}
                        <InsertEmoticonIcon />
                    </div>
                    <div className="student-info">
                        <h3>{student.name}</h3>
                        <p>
                            <strong>ID:</strong> {student.id}
                        </p>
                        <p>
                            <strong>Total Marks:</strong> {student.studentmarks}
                        </p>
                        <p>
                            <strong>Course:</strong> {student.studentcourse}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StudentProfiles;
