import React, {FC, useEffect, useRef, useState} from "react";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import st from '../styles/pages/RegistrationPage.module.css';
import {register} from "../services/auth.service";
import {NavigateFunction} from "react-router";
import MyDangerButton from "../components/UI/buttons/DangerButton";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import { ErrorBoundary } from "../errors/ErrorBoundary";

const usernameREGEX = /^[A-z][A-z0-9-_]{4,20}$/;
const emailREGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i;
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

    // Testing values with REGEX
    const username_Valid = usernameREGEX.test(username);
    const email_Valid = emailREGEX.test(email);
    const password_Valid = passwordREGEX.test(password);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setIsValidUsername(username_Valid);
    }, [username_Valid])

    useEffect(() => {
        setIsValidEmail(email_Valid);
    }, [email_Valid])

    useEffect(() => {
        setIsValidPassword(password_Valid);
        setIsValidMatchPassword(password === matchPassword);
    }, [password_Valid, password, matchPassword])

    useEffect(() => {
        setErrorMessage('');
    }, [username, password, matchPassword])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // validation
        if (!username_Valid || !email_Valid || !password_Valid) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            await register(username, email, password).then(
                () => {
                    setAccessGranted(true);
                    //clear state and controlled inputs
                    setUsername('');
                    setPassword('');
                    setMatchPassword('');
                }
            );

        } catch (err: any) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    function redirect() {
        navigate("/login");
    }

    return (
        <div data-testid="registrationPage">
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
            {accessGranted ? (
                <section className={st.section}>
                    <h1>Registered successfully!</h1>
                    <p>
                        <img
                            className={st.success}
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
                       className={errorMessage ? st.errMsg : st.offscreen} 
                       aria-live="assertive">{errorMessage}</p>
                    <h2>Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        {/* -- USERNAME FORM FILED ----------------------------------*/}
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidUsername ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidUsername || !username ? st.hide : st.invalid}/>
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
                        <p id="username_label"
                           className={focusUserName && username && !isValidUsername ? st.instructions : st.offscreen}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            4 to 20 characters.<br/>
                            Must begin with a letter.<br/>
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                        {/* -- EMAIL FORM FILED ----------------------------------------*/}
                        <label htmlFor="email">
                            Email:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidEmail ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidEmail || !email ? st.hide : st.invalid}/>
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
                        <p id="email_label" 
                           className={focusEmail && email && !isValidEmail ? st.instructions : st.offscreen}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            Please enter valid email.<br/>.
                        </p>
                        
                        {/* -- PASSWORD FORM FILED ---------------------------------*/}
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidPassword ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidPassword || !password ? st.hide : st.invalid}/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="8 to 16 Characters, include Upper and Low letters. "
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={isValidPassword ? "false" : "true"}
                            aria-describedby="pwd_label"
                            onFocus={() => setFocusPassword(true)}
                            onBlur={() => setFocusPassword(false)}
                        />
                        <p id="pwd_label" 
                           className={focusPassword && !isValidPassword ? st.instructions : st.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 16 characters.<br/>
                            Must include uppercase and lowercase letters, a number and a special character.<br/>
                            Allowed special characters: 
                            <span aria-label="exclamation mark">!</span> 
                            <span aria-label="at symbol">@</span> 
                            <span aria-label="hashtag">#</span> 
                            <span aria-label="dollar sign">$</span> 
                            <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={isValidMatchPassword && matchPassword ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={isValidMatchPassword || !matchPassword ? st.hide : st.invalid}/>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPassword(e.target.value)}
                            value={matchPassword}
                            required
                            aria-invalid={isValidMatchPassword ? "false" : "true"}
                            aria-describedby="confirm_pwd_label"
                            onFocus={() => setFocusMatchPassword(true)}
                            onBlur={() => setFocusMatchPassword(false)}
                        />
                        <p id="confirm_pwd_label" 
                           className={focusMatchPassword && !isValidMatchPassword ? st.instructions : st.offscreen}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            Must match the first password input field.
                        </p>
                        <br/>

                        <button
                            className={st.buttonReg}
                            disabled={!isValidUsername || !isValidPassword || !isValidMatchPassword}>
                            <span>Register</span>
                        </button>
                    </form>
                    <p>
                        Already registered?<br/>
                        <span className={st.line}>
                            <Link to="/login">Sign In</Link>
                        </span>
                    </p>
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
