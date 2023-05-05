import * as st from "../styles/tailwind/HomePage.style";
import Fraud from "../styles/images/image1.jpg"
import {Link} from "react-router-dom";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../errors/ErrorBoundary";
import {FC} from "react";
import MyFormButton from "../components/UI/buttons/MyFormButton";

const Home: FC = () => {

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
                <br />
                <div>
                    <div 
                        className={st.Home.typo}>
                        <h1 
                            className={st.Home.h1}>Welcome to Game-Fixing Website 
                        </h1>
                        <br />
                        <p 
                            className={st.Home.p}>
                            Here you can upload your CSV file to analyse the data and catch every suspicious transaction
                            that could be due to fraud. 
                        </p>
                    </div>
                    <br />
                    <div 
                        className={st.Home.typo}>
                        <h2 
                            className={st.Home.h2}
                        >What is Match Fixing ? 
                        </h2>
                        <br />
                        <img 
                            src={Fraud} 
                            alt="fraud image" 
                            className={st.Home.img} />
                        <p 
                            className={st.Home.p}>
                            In organized sports, match fixing in the act of playing or officiating a match with the
                            intention of achieving a pre-determined result,
                            violating the rules of the game and often the law.
                            There are many reasons why match fixing might take place,
                            including receiving bribes from bookmakers or sports bettors,
                            and blackmail. Competitors may also intentionally perform poorly to gain a future advantage,
                            such as a better draft pick or to face an easier opponent in a later round of competition. A
                            player might also play poorly to rig a handicap system. 
                        </p>
                        <span 
                            className={st.Home.span}>
                            If you are interest to learn more about this subject please visit
                        </span>
                        <a 
                            className={st.Home.ln} 
                            style={{ color: '#1e3a8a' }}
                            href="https://en.wikipedia.org/wiki/Match_fixing">
                            This Link
                        </a>

                    </div>
                    <br />
                    <div 
                        className={st.Home.typo}>
                        <h2 
                            className={st.Home.h2}>
                            What can you do in this website ?
                        </h2>
                        <br />
                        <p 
                            className={st.Home.p}>
                            Here, you have the ability to analyse CSv file that include data about players
                            who placed bets and the games results.
                            Note that this is a private website which mean you have to login to be able to use i
                            it.
                            If you are an Admin you will be able to upload CSV files, store it and even recover files from
                            database.
                            The application will show you the data in the files in form of tables and charts
                            Pay attention that you must have Admin privilege to be able to upload such files,
                            otherwise you will be considered a normal user and you will be directed to the user dashboard.
                            Their you can see the Top result and read some data that only Admin can control.
                        </p>
                    </div>
                    <br />
                    <div 
                        className="flex justify-center">
                        <MyFormButton>
                            <Link 
                                to="/login" 
                                className={st.Home.font}> Let's Get Started</Link>
                        </MyFormButton>
                    </div>
                </div>
            </ErrorBoundary>
        </>
    )
}
export default Home;