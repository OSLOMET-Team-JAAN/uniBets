import React, {FC, useEffect, useRef, useState} from "react";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import style from '../styles/pages/RegistrationPage.module.css';
import {register} from "../services/auth.service";
import {NavigateFunction} from "react-router";
import MyDangerButton from "../components/UI/buttons/DangerButton";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../errors/ErrorBoundary";

const usernameREGEX = /^[A-z][A-z0-9-_]{4,20}$/;
const emailREGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const passwordREGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/;

const RegistrationPage: FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [username, setUsername] = useState('');
    const [isValidUsername, setIsValidUsername] = useState(false);
    const [focusUserName, setFocusUserName] = useState(false);

    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [focusEmail, setFocusEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [focusPassword, setFocusPassword] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [isValidMatchPassword, setIsValidMatchPassword] = useState(false);
    const [focusMatchPassword, setFocusMatchPassword] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [accessGranted, setAccessGranted] = useState(false);

    const navigate: NavigateFunction = useNavigate()

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setIsValidUsername(usernameREGEX.test(username));
    }, [username])

    useEffect(() => {
        setIsValidEmail(emailREGEX.test(email));
    }, [email])

    useEffect(() => {
        setIsValidPassword(passwordREGEX.test(password));
        setIsValidMatchPassword(password === matchPassword);
    }, [password, matchPassword])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, matchPassword])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // validation
        if (!isValidUsername || !isValidEmail || !isValidPassword) {
            setErrorMessage("Invalid input. Please check the provided information.");
            return;
        }

        try {
            await register(username, email, password);
            setAccessGranted(true);
            //clear state and controlled inputs
            setUsername('');
            setPassword('');
            setMatchPassword('');
        } catch (err: any) {
            if (!err?.response) {
                setErrorMessage('No server response. Please try again later.');
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing username or password. Please provide all required information.');
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized access. Please check your credentials.');
            } else {
                setErrorMessage('Registration failed. Please try again later.');
            }
            errRef.current?.focus();
        }
    }


    function redirect() {
        navigate("/login");
    }

    return (
        <div data-testid="registrationPage">
            <ErrorBoundary 
                ResponseComponent={ErrorBoundaryResponse}>
            {accessGranted ? (
                <section className={style.section}>
                    <h1>Registration completed successfully!</h1>
                    <p>
                        <img
                            className={style.accessGranted}
                            alt="accessGranted"
                            src={require('../../src/styles/images/_success.jpg')}/>
                        <MyDangerButton
                            onClick={redirect}
                        >Login
                        </MyDangerButton>
                    </p>
                </section>
            ) : (
                <section>
                    {/* -- ALERT paragraph with "assertive" ARIA - Indicates that updates to the region have the 
                    highest priority and should be presented to the user immediately. ----*/}
                    <p ref={errRef} 
                       className={errorMessage ? style.errorMessage : style.srOnly} 
                       aria-live="assertive">{errorMessage}</p>
                    <h2>Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        {/* -- USERNAME FORM FILED ----------------------------------*/}
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidUsername ? style.validInput : style.hidden}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidUsername || !username ? style.hidden : style.invalidInput}/>
                        </label>
                        <input
                            type="text"
                            placeholder="Required .. "
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            aria-invalid={isValidUsername ? "false" : "true"}
                            aria-describedby="username_label"
                            onFocus={() => setFocusUserName(true)}
                            onBlur={() => setFocusUserName(false)}
                        />
                        <div id="username_label"
                           className={focusUserName && username && !isValidUsername ? style.validationMessage : style.srOnly}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            <span style={{fontWeight: "bolder"}}>Username requirements:</span> <br/>
                            <p style={{textAlign: "left"}}>
                                - Begin with a letter.<br/>
                                - Use from 4 upto 20 characters.<br/>
                                - Allowed: letters, numbers, underscores and hyphens.<br/>
                            </p>
                            
                        </div>
                        {/* -- EMAIL FORM FILED ----------------------------------------*/}
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidEmail ? style.validInput : style.hidden}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidEmail || !email ? style.hidden : style.invalidInput}/>
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Required .. "
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={isValidEmail ? "false" : "true"}
                            aria-describedby="email_label"
                            onFocus={() => setFocusEmail(true)}
                            onBlur={() => setFocusEmail(false)}
                        />
                        <div id="email_label" 
                           className={focusEmail && email && !isValidEmail ? style.validationMessage : style.srOnly}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            <span style={{fontWeight: "bolder"}}> Email requirements: <br /></span>
                           <p style={{textAlign: "left"}}>
                               - The email address "{email}" is not valid.<br />
                               - To ensure successful registration, please make sure your email address follows the correct format: "username@gmail.com". </p>
                            
                        </div>
                        
                        {/* -- PASSWORD FORM FILED ---------------------------------*/}
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidPassword ? style.validInput : style.hidden}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidPassword || !password ? style.hidden : style.invalidInput}/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="8 to 16 Characters, include Upper and Low letters. "
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={isValidPassword ? "false" : "true"}
                            aria-describedby="password_label"
                            onFocus={() => setFocusPassword(true)}
                            onBlur={() => setFocusPassword(false)}
                        />
                        <div id="password_label" 
                           className={focusPassword && !isValidPassword ? style.validationMessage : style.srOnly}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            <span style={{fontWeight: "bolder"}}>Password requirements:</span> <br/>                           
                                <p style={{textAlign: "left"}}>
                                    - Use 8 to 16 characters in length<br/>
                                    - Must include both uppercase and lowercase letters<br/>
                                    - Must contain at least one number<br/>
                                    - Must contain at least one special character<br/>
                                    - Allowed special characters: !, @, #, $, %<br/>
                                </p>
                        </div>

                        <label htmlFor="confirm_password">
                            Confirm Password:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidMatchPassword && matchPassword ? style.validInput : style.hidden}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidMatchPassword || !matchPassword ? style.hidden : style.invalidInput}/>
                        </label>
                        <input
                            type="password"
                            id="confirm_password"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={isValidMatchPassword ? "false" : "true"}
                            aria-describedby="confirm_password_label"
                            onFocus={() => setFocusMatchPassword(true)}
                            onBlur={() => setFocusMatchPassword(false)}
                        />
                        <div id="confirm_password_label" 
                           className={focusMatchPassword && !isValidMatchPassword ? style.validationMessage : style.srOnly}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            <span style={{fontWeight: "bolder"}}>Password confirmation requirements:</span> <br/>
                            <p style={{textAlign: "left"}}>
                                - Please ensure that this field matches the password entered in the first input field.<br/>
                            </p>
                            
                        </div>
                        <br/>

                        <button
                            className={style.regButton}
                            disabled={!isValidUsername || !isValidPassword || !isValidMatchPassword}>
                            <span>Register</span>
                        </button>
                    </form>
                    <div>
                        Already registered?<br/>
                        <span className={style.loginLink}>
                            <Link to="/login">Sign In</Link>
                        </span>
                    </div>
                </section>
            )}
            </ErrorBoundary>
        </div>
    )
}

export default RegistrationPage;

//https://github.com/gitdagray/react_protected_routes/blob/main/src/components/Register.js
//https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions (aria-live="assertive")
//https://developer-mozilla-org.translate.goog/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby?_x_tr_sl=auto&_x_tr_tl=en-US&_x_tr_hl=en-US
//https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
//https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
//https://react.dev/reference/react
