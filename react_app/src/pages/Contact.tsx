import { FC, useEffect, useRef, useState } from "react";
import { Button } from "@material-tailwind/react";
import styles from "../styles/pages/Contact.module.css";
import EventBus from "../common/DocEventBus";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import { ErrorBoundary } from "../errors/ErrorBoundary";
import MyFormButton from "../components/UI/buttons/MyFormButton";

const Contact: FC = () => {
    const userRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        userRef.current?.focus();
    }, [])

    function handleSubmit() {
        alert(`Your message was sent successfully. Thank you!\n
            Email: ${email},\n
            Subject: ${subject},\n
            Message: ${message}
        `);
        setEmail('');
        setSubject('');
        setMessage('');
    }

    EventBus.dispatch('submit', handleSubmit);

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
                <br/>
                <section className={styles.section}>
                    <div className={styles.container}>
                        <h2 className={styles.title}>Contact Us</h2>
                        <p className={styles.subtitle}>
                            Got a question? Want to send feedback about game-fixing? Let us know.
                        </p>
                        <form
                            onSubmit={handleSubmit}
                        >
                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.label}>
                                    Your email
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
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="subject" className={styles.label}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className={styles.input}
                                    placeholder="Let us know how we can help you"
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
            </ ErrorBoundary>
        </>
    );
}


export default Contact;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required