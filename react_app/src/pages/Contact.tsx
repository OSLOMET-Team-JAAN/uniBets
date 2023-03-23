/*
import { FC } from "react";

const Contact: FC = () => (
    <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
                Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                Got a question? Want to send feedback about game-fixing? Let us know.
            </p>
            <form action="#" className="space-y-8">
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="name@example.com"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                        placeholder="Let us know how we can help you"
                        required
                    />
                </div>
                <div className="sm:col-span-2">
                    <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                        Your message
                    </label>
                    <textarea
                        id="message"
                        rows={6}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Leave a comment..."
                    />
                </div>
                <button>Send Message</button>
            </form>
        </div>
    </section>
);

export default Contact;


*/


import { FC } from "react";
import { Button } from "@material-tailwind/react";
import styles from "../styles/Contact.module.css";

const Contact: FC = () => (
    <>
    <br />
    <section className={styles.section}>
        <div className={styles.container}>
            <h2 className={styles.title}>Contact Us</h2>
            <p className={styles.subtitle}>
                Got a question? Want to send feedback about game-fixing? Let us know.
                </p>
                <form action="#" >
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Your email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={styles.input}
                        placeholder="name@example.com"
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
                    />
                    </div>
                    <br /> 
                    <div>
                        <Button className="hover:scale-125">Send Message</Button>
                    </div>
                   
            </form>
        </div>
        </section>
    </>
);

export default Contact;
