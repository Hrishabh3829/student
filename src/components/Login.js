import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/dashboard'); // Navigate to the dashboard on form submission
    };

    const handleAdminRedirect = () => {
        navigate('/admin'); // Navigate to the admin page on button click
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        alert('New user registered successfully!'); // Display alert message
    };

    return (
        <StyledWrapper>
            <StyledButton onClick={handleAdminRedirect}>
                <span>Admin</span>
            </StyledButton>
            <div className="container">
                <input type="checkbox" id="register_toggle" />
                <div className="slider">
                    {/* Attach handleLogin to the form's onSubmit */}
                    <form className="form" onSubmit={handleLogin}>
                        <span className="title">Login</span>
                        <div className="form_control">
                            <input type="text" className="input" required />
                            <label className="label">Username</label>
                        </div>
                        <div className="form_control">
                            <input type="password" className="input" required />
                            <label className="label">Password</label>
                        </div>
                        <button type="submit">Login</button>
                        <span className="bottom_text">
                            Don't have an account?
                            <label htmlFor="register_toggle" className="switch">Sign Up</label>
                        </span>
                    </form>

                    {/* Sign-Up Form with Alert */}
                    <form className="form" onSubmit={handleSignUp}>
                        <span className="title">Sign Up</span>
                        <div className="form_control">
                            <input type="text" className="input" required />
                            <label className="label">Username</label>
                        </div>
                        <div className="form_control">
                            <input type="email" className="input" required />
                            <label className="label">Email</label>
                        </div>
                        <div className="form_control">
                            <input type="password" className="input" required />
                            <label className="label">Password</label>
                        </div>
                        <button type="submit">Sign Up</button>
                        <span className="bottom_text">
                            Already have an account?
                            <label htmlFor="register_toggle" className="switch">Sign In</label>
                        </span>
                    </form>
                </div>
            </div>
        </StyledWrapper>
    );
};

// Styling remains the same
const StyledButton = styled.button`
    position: absolute;
    top: 45px;
    right: 10px;
    padding: 0.1em 0.25em;
    width: 13em;
    height: 4.2em;
    background-color: #212121;
    border: 0.08em solid #fff;
    border-radius: 0.3em;
    font-size: 12px;
    cursor: pointer;
    z-index: 10;

    span {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        bottom: 0.4em;
        width: 8.25em;
        height: 2.5em;
        background-color: #212121;
        border-radius: 0.2em;
        font-size: 1.5em;
        color: #fff;
        border: 0.08em solid #fff;
        box-shadow: 0 0.4em 0.1em 0.019em #fff;
    }

    span:hover {
        transition: all 0.5s;
        transform: translate(0, 0.4em);
        box-shadow: 0 0 0 0 #fff;
    }

    span:not(:hover) {
        transition: all 1s;
    }
`;

const StyledWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #000;

    .container {
        width: 300px;
        position: relative;
        border-radius: 5px;
        overflow: hidden;
        color: white;
        box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
    }

    .container .slider {
        width: 200%;
        position: relative;
        transition: transform ease-out 0.3s;
        display: flex;
    }

    #register_toggle {
        display: none;
    }

    .container #register_toggle:checked + .slider {
        transform: translateX(-50%);
    }

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
        padding: 1.5em 3em;
        width: 50%;
    }

    .title {
        text-align: center;
        font-weight: 700;
        font-size: 2em;
    }

    .form_control {
        width: 100%;
        position: relative;
        overflow: hidden;
    }

    .form_control .label {
        position: absolute;
        top: 50%;
        left: 10px;
        transition: transform ease 0.2s;
        transform: translate(0%, -50%);
        font-size: 0.75em;
        user-select: none;
        pointer-events: none;
        color: #b0b0b0;
    }

    .form_control .input {
        width: 100%;
        background-color: transparent;
        border: none;
        outline: none;
        color: #fff;
        padding: 0.5rem;
        font-size: 0.75rem;
        border-radius: 5px;
        transition: box-shadow ease 0.2s;
        box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 1.5px 1.5px 3px #0e0e0e, inset -1.5px -1.5px 3px #5f5e5e;
    }

    .form_control .input:focus,
    .form_control .input:valid {
        box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 3px 3px 4px #0e0e0e, inset -3px -3px 4px #5f5e5e;
    }

    .form_control .input:focus + .label,
    .form_control .input:valid + .label {
        transform: translate(-150%, -50%);
    }

    form button {
        width: 100%;
        background-color: transparent;
        border: none;
        outline: none;
        color: #fff;
        padding: 0.5rem;
        font-size: 0.75rem;
        border-radius: 5px;
        transition: box-shadow ease 0.1s;
        box-shadow: 1.5px 1.5px 3px #0e0e0e, -1.5px -1.5px 3px rgb(95 94 94 / 25%), inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #5f5e5e;
    }

    form button:active {
        box-shadow: 0px 0px 0px #0e0e0e, 0px 0px 0px rgb(95 94 94 / 25%), inset 3px 3px 4px #0e0e0e, inset -3px -3px 4px #5f5e5e;
    }

    .bottom_text {
        font-size: 0.65em;
    }

    .bottom_text .switch {
        font-weight: 700;
        cursor: pointer;
    }
`;

export default Login;
