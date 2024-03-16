import React from "react";
import { useState } from "react";
import Register from "./Register";
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setRegistering] = useState(false);

    const style = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        justifyContent: 'flex-start',
        height: '100vh',
        backgroundColor: 'var(--main-bg-color)',
        padding: '2rem',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
        ul: {
            display: 'flex',
            flexDirection: 'column',
            listStyleType: 'none',
            rowGap: '1rem',
        },
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegistering = () => {
        setRegistering(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch('/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        })
            .then(response => response.json())
            .then(data => {
                console.log('Token:', data.access_token);
                localStorage.setItem('access_token', data.access_token)
            })
            .catch(error => console.error('Error:', error));
    };

    const LoginMarkup = (
            <>
                <h2>Sign up for Hydrosim</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={handleEmailChange} />
                        </div>
                        <div>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                        </div>
                        <button type="submit">Log in</button>
                    </form>
                <h2>Don&apost have an account?
                    <a onClick={handleRegistering}>Sign up here.</a>
                </h2>
            </>    )

    return (
        <div>
            { isRegistering ? <Register></Register> : LoginMarkup }
        </div>
    );
}

export { Login as default };
