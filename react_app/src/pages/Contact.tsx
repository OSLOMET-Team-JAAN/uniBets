import React, {FC, useEffect, useRef, useState} from "react";
import styles from "../styles/pages/Contact.module.css";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import MyFormButton from "../components/UI/buttons/MyFormButton";
import {submit} from "../services/data.service";
import InfoModal from "../components/UI/modals/InfoModal";
import MyButton from "../components/UI/buttons/MyButton";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";
import {ErrorBoundary} from "../errors/ErrorBoundary";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,4}$/i;

//Contact page component
const Contact: FC = () => {
    // Mutable ref objects that can be used to reference an HTML elements
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);
    
    //States for the form
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
    //State for error and successful submit
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

    // Testing values with REGEX
    const verified = EMAIL_REGEX.test(email);
    
    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setValidEmail(verified);
    }, [verified])
    
    useEffect(() => {
        setErrorMessage('');
    }, [email]);

    //Handling submit function
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // validation
        if (!verified) {
            setErrorMessage("Invalid Entry");
            return;
        }
        try {
            await submit(email, subject, message).then(
                () => {
                    setSuccess(true);
                    //clear state and controlled inputs
                    setEmail('');
                    setSubject('');
                    setMessage('');
                }
            )
        } catch (err: any) {
            if (!err?.response) {
                setErrorMessage('No Server Response');
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrorMessage('Unauthorized');
            } else {
                setErrorMessage('Submitting Failed');
            }
            errRef.current?.focus();
        }
    }

    return (
        <div data-testid="contactPage">
            <ErrorBoundary 
                ResponseComponent={ErrorBoundaryResponse}>
                {success ? (
                    <InfoModal
                        visible={success}
                        setVisible={setSuccess} >
                        <div style={{color: "red"}}>
                            <p>Your message was sent successfully!</p>
                        </div>
                        <MyButton 
                            onClick={() => {
                            setSuccess(false);
                        }}>Close</MyButton>
                    </InfoModal>
                ) : (
                <section className={styles.section}>
                    <div className={styles.container}>
                        <p ref={errRef}
                           className={errorMessage ? styles.errorMessage : styles.srOnly}
                           aria-live="assertive">{errorMessage}</p>
                        <h2 className={styles.title}>Contact Us</h2>
                        <p className={styles.subtitle}>
                            Got a question? Want to send feedback about game-fixing? Let us know.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Your email:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={validEmail ? styles.validInput : styles.hidden}/>
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={validEmail || !email ? styles.hidden : styles.invalidInput}/>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className={styles.input}
                                    placeholder="name@example.com"
                                    ref={userRef}
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                />                                
                            </div>
                            <div className={styles.formGroup}>
                                <label 
                                    htmlFor="subject" 
                                    className={styles.label}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className={styles.input}
                                    placeholder="How we can help you?"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    required
                                />
                            </div>
                            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                <label htmlFor="message" className={styles.label}>
                                    Your message
                                </label>
                                <textarea
                                    id="message"
                                    rows={6}
                                    className={styles.textarea}
                                    placeholder="Leave a comment..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </div>
                            <br/>
                            <div>
                                <MyFormButton>
                                    Send Message 
                                </MyFormButton>
                            </div>
                        </form>
                    </div>
                </section>
                )}
            </ ErrorBoundary>
        </div>
    );
}


export default Contact;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required