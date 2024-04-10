import React from "react";
import { useState } from "react";
import SchematicView from "./SchematicView";
import Login from "./Login";

function Register({ totals, firstChild, secondChild }) {

    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [hasRegistered, setHasRegistered] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [emailMatch, setEmailMatch] = useState(false);

    const style = {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '1rem',
        justifyContent: 'flex-start',
        height: '100vh',
        backgroundColor: 'var(--main-bg-color)',
        padding: '2rem',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
        zIndex: '12',
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

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
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
        // {"Message":"The request is invalid.","ModelState":{"":["Passwords must have at least one non letter or digit character. Passwords must have at least one uppercase ('A'-'Z')."]}}
        
    };




    return (
        <>
          {hasRegistered ? <Login></Login> : registerMarkup}
        </>    
    );
}

export { Register as default };
