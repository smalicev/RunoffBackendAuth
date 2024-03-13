import React from "react";
import { useState } from "react";

function Register({ totals, firstChild, secondChild }) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('/api/Account/Register',
                {
                    method: 'POST',
                    headers: { "Content-Type": 'application/json' }, body: JSON.stringify({ UserName: username, Email: email, Password: password, ConfirmPassword: password })
                }).then(response => {
                    if (response.ok) {

                    } else {
                        alert(response.text())
                    }
                })
            let textResponse = await response.text();
            console.log(textResponse);
        } catch {
            throw new Error('Problem with POST request')
        }
    };

    return (
        <div>
            <h2>Sign up for Hydrosim</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label htmlFor="confirmEmail">Confirm Email:</label>
                    <input type="email" id="confirmEmail" value={confirmEmail} onChange={handleConfirmEmailChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Register Account</button>
            </form>
        </div>
    );
}

export { Register as default };
