import React from "react";
import { useState } from "react";
import Register from "./Register";
import Hoverable from "./Hoverable";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";

function Login({ isRegistering, handleNotRegistering, handleRegistering }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [hasRegistered, setHasRegistered] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [emailMatch, setEmailMatch] = useState(true);
    const [emailPass, setEmailPass] = useState(null);
    const [passwordPasses, setPasswordPass] = useState(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(null);
    const [loginSuccess, setLoginSuccess] = useState(null);
    const [errorRegister, setErrorRegister] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();


    const primaryStatic = theme.palette.primary.main;
    const secondaryStatic = theme.palette.secondary.main;

    const loginStyle = {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        rowGap: "3rem",
        padding: "1rem",
        zIndex: "12",
        alignItems: "center",
        height: "100%",
        overflow: "auto",
    };

    const alertStyle = {
        position: "absolute",
    };

    const buttonStyle = {
        padding: "0.5rem",
        fontSize: "1rem",
        width: "100%",
        border: "0.25rem solid lightskyblue",
        borderRadius: "0.5rem",
        backgroundColor: "lightskyblue",
    };

    const formStyle = {
        bgcolor: "primary.main",
        display: "flex",
        borderRadius: "0.5rem",
        alignItems: "center",
        flexDirection: "column",
        width: "30%",
        rowGap: "2rem",
        justifyContent: "center",
        padding: "2rem",
        boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
    };

    const headerStyle = {
        padding: "0.25rem",
        textAlign: "center",
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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

    const handleConfirmEmailCheck = (e) => {
        if (email === confirmEmail) {
            setEmailMatch(true);
        } else {
            setEmailMatch(false);
        }
    };

    const handleConfirmPasswordCheck = () => {
        console.log(password === confirmPassword);
        if (password === confirmPassword) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    };

    const handlePasswordRequirements = () => {
        let passwordRegExp = new RegExp("(?=.*[^a-zA-Z0-9])(?=.*[A-Z]).+");

        if (passwordRegExp.test(password)) {
            setPasswordPass(true);
        } else {
            setPasswordPass(false);
        }
    };

    const handleEmailRequirements = () => {
        let passwordRegExp = new RegExp("@");

        if (passwordRegExp.test(password)) {
            setEmailPass(true);
        } else {
            setEmailPass(false);
        }
    };

    function refreshPage() {
        window.location.reload();
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        fetch("/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=password&username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Token:", data.access_token);
                console.log(data);
                console.log(email, password);
                localStorage.setItem("access_token", data.access_token);
                setLoginSuccess(true);
                refreshPage();
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoginSuccess(false);
            });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(passwordMatch);
        if (confirmEmail === email) {
            setEmailMatch(true);
        } else {
            setEmailMatch(false);
        }

        if (confirmPassword === password) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }

        if (
            passwordPasses === true &&
            emailMatch === true &&
            passwordMatch === true
        ) {
            try {
                let response = await fetch("/api/Account/Register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        Email: email,
                        Password: password,
                        ConfirmPassword: confirmPassword,
                    }),
                });

                if (response.status === 200) {
                    setHasRegistered(true);
                    setRegistrationSuccess(true);
                    handleNotRegistering();
                } else if (response.status === 400) {
                    let serverResponse = await response.json();
                    setHasRegistered(false);
                    setRegistrationSuccess(false);
                    setErrorRegister(serverResponse.ModelState[""][1]);
                } else {
                }
            } catch (error) {
                throw new Error(error);
            }
        } else {
            setRegistrationSuccess(false);
        }
    };

    const LoginMarkup = (
        <Box style={loginStyle}>
            <h2 style={headerStyle}>Sign in to your account</h2>
            <Box component="form" autoComplete="off" noValidate sx={formStyle}>
                <FormControl
                    fullWidth={true}
                    sx={{ m: 1 }}
                    variant="outlined"
                    color="secondary"
                    value={email}
                    onChange={handleEmailChange}
                >
                    <InputLabel color="secondary" htmlFor="email">
                        Email
                    </InputLabel>
                    <OutlinedInput
                        id="email"
                        type="email"
                        label="Email"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                            },
                            "&:hover > .MuiOutlinedInput-notchedOutline": {
                                borderColor: secondaryStatic,
                            },
                        }}
                    />
                </FormControl>

                <FormControl
                    fullWidth={true}
                    sx={{ m: 1 }}
                    variant="outlined"
                    color="secondary"
                    value={password}
                    onChange={handlePasswordChange}
                >
                    <InputLabel color="secondary" htmlFor="password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        color="secondary"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="secondary"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                            },
                            "&:hover > .MuiOutlinedInput-notchedOutline": {
                                borderColor: secondaryStatic,
                            },
                        }}
                    />
                </FormControl>
                <Button
                    fullWidth={true}
                    color="secondary"
                    variant="contained"
                    onClick={handleLogin}
                    type="submit"
                >
                    Sign in
                </Button>
            </Box>

            <h2 style={headerStyle}>
                {`Don't have an account? `}
                <Link
                    color="secondary"
                    onClick={handleRegistering}
                    href="#"
                    underline="hover"
                >
                    Sign up here.
                </Link>
            </h2>
        </Box>
    );

    let registerMarkup = (
        <Box style={loginStyle}>
            <h2 style={headerStyle}>Sign up for SWMShare</h2>
            <Box component="form" autoComplete="off" noValidate sx={formStyle}>
                <FormControl
                    fullWidth={true}
                    sx={{ m: 1 }}
                    variant="outlined"
                    required
                    color="secondary"
                >
                    <InputLabel color="secondary" htmlFor="email">
                        User Name
                    </InputLabel>
                    <OutlinedInput
                        id="firstName"
                        type="text"
                        label="First Name"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                            },
                            "&:hover > .MuiOutlinedInput-notchedOutline": {
                                borderColor: secondaryStatic,
                            },
                        }}
                    />
                </FormControl>

                <FormControl
                    fullWidth={true}
                    sx={{ m: 1 }}
                    variant="outlined"
                    required
                    color="secondary"
                    value={email}
                    onChange={handleEmailChange}
                >
                    <InputLabel color="secondary" htmlFor="email">
                        Email
                    </InputLabel>
                    <OutlinedInput
                        id="email"
                        type="email"
                        label="Email"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                            },
                            "&:hover > .MuiOutlinedInput-notchedOutline": {
                                borderColor: secondaryStatic,
                            },
                        }}
                    />
                </FormControl>

                <FormControl
                    fullWidth={true}
                    sx={{ m: 1 }}
                    variant="outlined"
                    required
                    color="secondary"
                    value={confirmEmail}
                    onChange={handleConfirmEmailChange}
                >
                    <InputLabel color="secondary" htmlFor="confirmEmail">
                        Confirm Email
                    </InputLabel>
                    <OutlinedInput
                        inputProps={{ onBlur: handleConfirmEmailCheck }}
                        id="confirmEmail"
                        type="email"
                        label="Confirm Email"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                            },
                            "&:hover > .MuiOutlinedInput-notchedOutline": {
                                borderColor: secondaryStatic,
                            },
                        }}
                    />
                    <FormHelperText color="secondary">
                        {" "}
                        {emailMatch ? null : "Emails do not match."}{" "}
                    </FormHelperText>
                </FormControl>

                <FormControl
                    fullWidth={true}
                    sx={{ m: 1 }}
                    variant="outlined"
                    required
                    color="secondary"
                    value={password}
                    onChange={handlePasswordChange}
                >
                    <InputLabel color="secondary" htmlFor="password">
                        Password
                    </InputLabel>
                    <OutlinedInput
                        color="secondary"
                        inputProps={{ onBlur: handlePasswordRequirements }}
                        id="password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="secondary"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                            },
                            "&:hover > .MuiOutlinedInput-notchedOutline": {
                                borderColor: secondaryStatic,
                            },
                        }}
                    />
                    <FormHelperText color="secondary">
                        {" "}
                        {passwordPasses
                            ? null
                            : passwordPasses === null
                              ? null
                              : "Please enter a minimum 6-character password with at least one non-alphanumeric character and one uppercase character."}{" "}
                    </FormHelperText>
                </FormControl>
                <FormControl
                    fullWidth={true}
                    sx={{ m: 1 }}
                    variant="outlined"
                    required
                    color="secondary"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                >
                    <InputLabel color="secondary" htmlFor="confirmPassword">
                        Confirm Password
                    </InputLabel>
                    <OutlinedInput
                        color="secondary"
                        inputProps={{ onBlur: handleConfirmPasswordCheck }}
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    color="secondary"
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Confirm Password"
                        sx={{
                            "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "black",
                            },
                            "&:hover > .MuiOutlinedInput-notchedOutline": {
                                borderColor: secondaryStatic,
                            },
                        }}
                    />
                    <FormHelperText>
                        {" "}
                        {passwordMatch ? null : "Passwords do not match."}{" "}
                    </FormHelperText>
                </FormControl>

                <Button
                    fullWidth={true}
                    color="secondary"
                    onClick={handleRegister}
                    variant="contained"
                    type="submit"
                >
                    REGISTER
                </Button>
                {registrationSuccess === null ? (
                    <p></p>
                ) : registrationSuccess ? (
                    <p></p>
                ) : (
                    <Alert severity="error">
                        Registration failed.{" "}
                        {errorRegister === null ? null : errorRegister}
                    </Alert>
                )}
            </Box>

            <h2 style={headerStyle}>
                {"Have an account already? "}
                <Link
                    color="secondary"
                    onClick={handleNotRegistering}
                    href="#"
                    underline="hover"
                >
                    {"Click here to sign in."}
                </Link>{" "}
            </h2>
        </Box>
    );

    return (
        <div style={loginStyle}>
            {isRegistering ? registerMarkup : LoginMarkup}
        </div>
    );
}

export { Login as default };
