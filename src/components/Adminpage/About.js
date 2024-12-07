import React from 'react';
import styled from 'styled-components';

const About = () => {
    return (
        <StyledAboutWrapper>
            <div className="about-container">
                <h1>About the Project</h1>
                <p>
                    Welcome to the <strong>Student Analytical Performance</strong> project! This project
                    aims to provide an innovative platform for tracking and analyzing the performance of students
                    in various subjects and courses. With the help of data analytics, educators and administrators
                    can gain insights into student progress and identify areas that need improvement.
                </p>
                <h2>Project Overview</h2>
                <p>
                    This project is developed as part of the JFSD (Java Full Stack Development) program, using
                    Spring Boot for the backend, React for the frontend, and various other modern technologies.
                    The platform allows users to add and manage student data, track performance, and generate insightful reports.
                </p>
                <h2>Team Members</h2>
                <div className="team-info">
                    <div className="team-member">
                        <h3>Hrishabh (Team Lead)</h3>
                        <p>
                            As the team lead, Hrishabh is responsible for overseeing the overall development and
                            coordination of the project. He works on the frontend, ensuring smooth user interaction
                            and a responsive design.
                        </p>
                    </div>
                    <div className="team-member">
                        <h3>Summit Kumar Gupta</h3>
                        <p>
                            Summit Kumar Gupta is a key member of the team, contributing to both the backend and
                            frontend, working on the implementation of student performance tracking and data analysis.
                        </p>
                    </div>
                </div>
            </div>
        </StyledAboutWrapper>
    );
};

const StyledAboutWrapper = styled.div`
    padding: 50px;
    background-color: #f9f9f9;
    color: #333;
    font-family: 'Arial', sans-serif;

    .about-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    h1 {
        font-size: 2.5rem;
        text-align: center;
        color: #17abf8;
    }

    h2 {
        font-size: 1.8rem;
        margin-top: 20px;
        color: #333;
    }

    p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin: 10px 0;
    }

    .team-info {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .team-member {
        width: 45%;
        background-color: #e6f7ff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .team-member h3 {
        color: #17abf8;
        font-size: 1.3rem;
    }

    .team-member p {
        font-size: 1rem;
    }

    @media (max-width: 768px) {
        .team-info {
            flex-direction: column;
        }

        .team-member {
            width: 100%;
            margin-bottom: 20px;
        }
    }
`;

export default About;
