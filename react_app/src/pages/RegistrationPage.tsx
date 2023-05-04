import {FC, useEffect, useRef, useState} from "react";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useNavigate} from "react-router-dom";
import st from '../styles/pages/RegistrationPage.module.css';
import {register} from "../services/auth.service";
import {NavigateFunction} from "react-router";
import MyDangerButton from "../components/UI/buttons/DangerButton";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import { ErrorBoundary } from "../errors/ErrorBoundary";

const USER_REGEX = /^[A-z][A-z0-9-_]{4,20}$/;
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,16}$/;

const RegistrationPage: FC = () => {
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [username, setUsername] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate: NavigateFunction = useNavigate()

    // Testing values with REGEX
    const v1 = USER_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setValidName(v1);
    }, [v1])

    useEffect(() => {
        setValidEmail(v2);
    }, [v2])

    useEffect(() => {
        setValidPwd(v3);
        setValidMatch(password === matchPwd);
    }, [v3, password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // validation
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            await register(username, email, password).then(
                () => {
                    setSuccess(true);
                    //clear state and controlled inputs
                    setUsername('');
                    setPassword('');
                    setMatchPwd('');
                }
            );

        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    function redirect() {
        navigate("/login");
    }

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
            {success ? (
                <section>
                    <h1>Registered successfully!</h1>
                    <p>
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
                       className={errMsg ? st.errMsg : st.offscreen} 
                       aria-live="assertive">{errMsg}</p>
                    <h2>Create an Account</h2>
                    <form onSubmit={handleSubmit}>
                        {/* -- USERNAME FORM FILED ----------------------------------*/}
                        <label htmlFor="username">
                            Username:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={validName ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={validName || !username ? st.hide : st.invalid}/>
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
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="username_label"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="username_label"
                           className={userFocus && username && !validName ? st.instructions : st.offscreen}>
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
                                className={validEmail ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={validEmail || !email ? st.hide : st.invalid}/>
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Required .. "
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="email_label"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="email_label" 
                           className={emailFocus && email && !validEmail ? st.instructions : st.offscreen}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            Please enter valid email.<br/>.
                        </p>
                        
                        {/* -- PASSWORD FORM FILED ---------------------------------*/}
                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={validPwd ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={validPwd || !password ? st.hide : st.invalid}/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="8 to 16 Characters, include Upper and Low letters. "
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwd_label"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwd_label" 
                           className={pwdFocus && !validPwd ? st.instructions : st.offscreen}>
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
                                className={validMatch && matchPwd ? st.valid : st.hide}/>
                            <FontAwesomeIcon 
                                icon={faTimes} 
                                className={validMatch || !matchPwd ? st.hide : st.invalid}/>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirm_pwd_label"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirm_pwd_label" 
                           className={matchFocus && !validMatch ? st.instructions : st.offscreen}>
                            <FontAwesomeIcon 
                                icon={faInfoCircle}/>
                            Must match the first password input field.
                        </p>
                        <br/>

                        <button
                            className={st.buttonReg}
                            disabled={!validName || !validPwd || !validMatch}>
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
        </>
    )
}

export default RegistrationPage;

//https://github.com/gitdagray/react_protected_routes/blob/main/src/components/Register.js
//https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions (aria-live="assertive")
//https://developer-mozilla-org.translate.goog/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby?_x_tr_sl=auto&_x_tr_tl=en-US&_x_tr_hl=en-US
//https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-invalid
//https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
//https://react.dev/reference/react
