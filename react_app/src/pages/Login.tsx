import {FC, FormEvent, useEffect, useRef, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import st from '../styles/pages/Login.module.css';
import {login} from "../services/auth.service";
import {NavigateFunction} from "react-router";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import MyFormButton from "../components/UI/buttons/MyFormButton";
import {ErrorBoundary} from "../errors/ErrorBoundary";

const Login: FC = () => {
    //const {setAuth}: any = useAuth();
    
    //Redirection and navigation
    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    //Reference objects (accessing and manipulating DOM elements)
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    //States for the form
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //Focus username field after mounting
    useEffect(() => {
        userRef.current?.focus();
    }, [])

    //Setting errorMessage to default value after username or password changes
    useEffect(() => {
        setErrorMessage('');
    }, [username, password])

    //Form submission handling
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password).then((response) => {
                const _token = response?.token;
                // const _email = response?.token;
                // const _role = response?.role;
                // commented due to useAuth usage been suspended
                if (_token) {
                    // setAuth({username, _role, _email, password, _token});
                    // setUsername('');
                    // setPassword('');
                    navigate(from, {replace: true});
                }
            }).then(() => navigate("/profile"));
        } catch (err: any) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMessage('Invalid username or password');
            } else if (err.response?.status === 401) {
                setErrorMessage('No authorization found');
                navigate("/unauthorized");
            } else {
                setErrorMessage('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    return (
        <div data-testid="loginPage">
            <ErrorBoundary 
                ResponseComponent={ErrorBoundaryResponse}>
                <br/>
                <section className={st.section}>
                    <p
                        ref={errRef}
                        className={errorMessage ? st.errorMessage : st.srOnly}
                        aria-live="assertive">{errorMessage}</p>
                    <h2>Please Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            placeholder="Enter username here.."
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                        />
        
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter password here.."
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <br/>
                        <MyFormButton>
                            Sign In
                        </MyFormButton>
                    </form>
                    <p>
                        New User ? Need to Sign Up
                        <br/>
                        <span className={st.line}>
                            <Link 
                                to="/register"> 
                                <span>Sign Up</span> 
                            </Link>
                        </span>
                    </p>
                </section>
            </ErrorBoundary>
            </div>
    )
}

export default Login;

// https://github.com/gitdagray/react_protected_routes/blob/main/src/components/Login.js