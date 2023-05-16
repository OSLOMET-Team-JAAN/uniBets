
import Fraud from "../styles/images/image1.jpg"
import What from "../styles/images/what.jpg";
import {Link} from "react-router-dom";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import { FC } from "react";
import st from "../styles/pages/Home.module.css";
import MyFormButton from "../components/UI/buttons/MyFormButton";
import {ErrorBoundary} from "../errors/ErrorBoundary";

const Home: FC = () => {

    return (
        <div data-testid="homePage">
            <ErrorBoundary 
                ResponseComponent={ErrorBoundaryResponse}>
                <br />
                <div>
                    <div 
                        className={st.cont}>
                        <h1> 
                            Welcome to Game-Fixing Website 
                        </h1>
                        <br />
                        <p 
                            >
                            Here you can upload your CSV file to analyse the data and catch every suspicious transaction
                            that could be due to fraud. 
                        </p>
                    </div>
                    <br />
                    <div className={st.d1 }> 
                        <div 
                         className={st.cont}>
                            <h2  >
                            
                           What is Match Fixing ? 
                        </h2>
                        <br />
                        <img 
                            src={Fraud} 
                            alt="fraud image" 
                        />
                        <br />
                           <br/>

                        <p 
                           >
                            In structured athletic competitions, match fixing refers to the deliberate manipulation of game outcomes,
                            a practice that typically contravenes the regulations of the sport and often legal statutes as well.
                            There can be various motivations behind match fixing, such as the acceptance of illicit payments
                            from betting agencies or individuals wagering on the outcome, or even succumbing to blackmail.
                            Athletes might also deliberately underperform to secure future benefits, like obtaining
                            a more favorable position in a player draft or ensuring an easier adversary in subsequent rounds of the tournament.
                            Furthermore, a competitor could intentionally perform poorly to manipulate a handicap system.
                        </p>
                        <span 
                           >
                            If you are interest in learnning more about this subject please visit 
                         </span> <br/> 
                           <a 

                                style={{ color: '#1e3a8a', fontSize: 'x-large', fontStyle:'italic' }}
                            href="https://en.wikipedia.org/wiki/Match_fixing">
                             This Link
                           </a>

                    </div>
                    <br />
                    <div className={st.cont } 
                       >
                        <h2 
                            >
                            What can you do in this website ?
                        </h2>
                            <br />
                          
                            <img
                                src={What}
                                alt="What can i do !!"
                            />
                            <br />
                            <br />
                        <p 
                           >
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
                    </div>
                    <br />
                    <div 
                        className="flex justify-center">
                        <MyFormButton
                            data-testid="letsGetStartedButton"
                        >
                            <Link
                                data-testid="link-LetsStarted"
                                to="/login"
                                className={st.font }
                                > Let's Get Started</Link>
                        </MyFormButton>
                    </div>
                </div>
            </ErrorBoundary>
        </div>
    )
}
export default Home;