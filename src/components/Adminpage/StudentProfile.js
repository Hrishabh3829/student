import React, {useEffect, useState} from 'react';
import StudentProfiles from "../StudentCard/StudentProfiles";
import axios from "axios";

const StudentProfile = () => {

    const [stud,setStud] = useState([])

    useEffect(()=>{
        const getAllData = async () => {
            const res = (await axios.get("http://localhost:8080/student/getAll")).data;
            setStud(res)
        };
        getAllData()
    },[])



    return (
        <>
            <StudentProfiles students={stud} />
        </>
    );
};

export default StudentProfile;
