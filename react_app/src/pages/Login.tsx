import {useRef, useState, useEffect, FormEvent} from 'react';
import useAuth from '../hooks/useAuth';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import st from '../styles/Login.module.css';
import {login} from "../services/auth.service";
import {NavigateFunction} from "react-router";

const Login = () => {
    const {setAuth}: any = useAuth();

    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(username, password).then((response) => {
                const _accessToken = response?.data?.accessToken;
                const _email = response?.data?.email;
                const _roles = response?.data?.roles;
                if (_accessToken) {
                    setAuth({username, _email, password, _roles, _accessToken});
                    setUsername('');
                    setPassword('');
                    navigate(from, {replace: true});
                }
            }).then(
                () => {
                    navigate("/profile");
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setErrMsg(resMessage)
                }
            );
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
                navigate("/unauthorized");
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    }

    return (

        <section>
            <p
                ref={errRef}
                className={errMsg ? st.errmsg : st.offscreen}
                aria-live="assertive">{errMsg}</p>
            <h1>Please Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button
                    className={st.button}>
                    <span>Sign In</span>
                </button>
            </form>
            <p>
                Need an Account?<br/>
                <span className={st.line}>
                    <Link to="/signup"> <span>Sign Up</span> </Link>
                </span>
            </p>
        </section>

    )
}

export default Login;