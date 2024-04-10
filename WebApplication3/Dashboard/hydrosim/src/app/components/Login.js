import React from "react";
import { useState } from "react";
import Register from "./Register";
import Hoverable from "./Hoverable";
function Login({ isRegistering, handleNotRegistering, handleRegistering }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [hasRegistered, setHasRegistered] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [emailMatch, setEmailMatch] = useState(false);

    const loginStyle = {
        position: 'fixed',
        left: '50%',
        bottom: '50%',
        transform: 'translate(-50%, 0%)',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        zIndex: '12'
    }

    const buttonStyle = {
        padding: '0.5rem',
        fontSize: '1rem',
        width: '100%',
        border: '0.25rem solid lightskyblue',
        borderRadius: '0.5rem',
        backgroundColor: 'lightskyblue'
    }

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '2rem',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
    }

    const headerStyle = {
        padding: '0.25rem'
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleConfirmEmailChange = (e) => {
        setConfirmEmail(e.target.value);
    };


    function refreshPage() {
        window.location.reload();
    }

    const handleLogin = async (e) => {
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
                refreshPage();
            })
            .catch(error => console.error('Error:', error));
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        if (confirmEmail === email) {
            setEmailMatch(true);
        }

        if (confirmPassword === password) {
            setPasswordMatch(true);
        }

        let passwordRegExp = new RegExp('(?=.*[^a-zA-Z0-9])(?=.*[A-Z]).+')

        if (passwordRegExp.test(password) && emailMatch === true && passwordMatch === true) {

            try {
                let response = await fetch('/api/Account/Register',
                    {
                        method: 'POST',
                        headers: { "Content-Type": 'application/json' }, body: JSON.stringify({ Email: email, Password: password, ConfirmPassword: confirmPassword }),
                    })

                let textResponse = await response.text();
                console.log(textResponse);

                if (textResponse.status === 200) {
                    setHasRegistered(true);
                }
            } catch {
                throw new Error('Problem with request')
            }
        }
    };

    const LoginMarkup = (
            <>
            <h2 style={headerStyle}>Sign in to your account</h2>
            <form onSubmit={handleLogin} style={formStyle}>
                        <div>
                    <label style={{fontStyle:'italic'}} htmlFor="email">Email:</label>
                    <input style={{ width: '100%' }} type="email" id="email" value={email} onChange={handleEmailChange} />
                        </div>
                        <div>
                    <label style={{ fontStyle: 'italic' }} htmlFor="password">Password:</label>
                    <input style={{ width: '100%' }} type="password" id="password" value={password} onChange={handlePasswordChange} />
                        </div>
                <Hoverable style={{zIndex: '5'} }>
                    <button style={buttonStyle} type="submit">Log in</button>
                </Hoverable>
                    </form>
            <h2>Don&apos;t have an account?
                <a style={{ color: "blue", textDecoration:'underline'}} onClick={handleRegistering}> Sign up here.</a>
                </h2>
        </>)


    let registerMarkup = (
        <div>
            <h2 style={headerStyle} >Sign up for Hydrosim</h2>
            <form style={formStyle} onSubmit={handleRegister}>
                <div>
                    <label style={{ fontStyle: 'italic' }} htmlFor="email">Email:</label>
                    <input style={{ width: '100%' }} type="email" id="email" value={email} onChange={handleEmailChange} />
                </div>
                <div>
                    <label style={{ fontStyle: 'italic' }} htmlFor="confirmEmail">Confirm Email:</label>
                    <input style={{ width: '100%' }} type="email" id="confirmEmail" value={confirmEmail} onChange={handleConfirmEmailChange} />
                </div>
                <div>
                    <label style={{ fontStyle: 'italic' }} htmlFor="password">Password:</label>
                    <input style={{ width: '100%' }} type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label style={{ fontStyle: 'italic' }} htmlFor="confirmPassword">Confirm Password:</label>
                    <input style={{ width: '100%' }} type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                <button style={buttonStyle} type="submit">Register Account</button>
                <span onClick={handleNotRegistering }>Have an account already?
                    <a style={{ color: "blue", textDecoration: 'underline' }}> Click here to sign in. </a></span>
            </form>
        </div>)

    return (
        <div style={loginStyle}>
            {isRegistering ? registerMarkup : LoginMarkup }
        </div>
    );
}

export { Login as default };
