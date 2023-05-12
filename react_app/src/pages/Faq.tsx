import {Fragment, useState} from "react";
import {Accordion, AccordionBody, AccordionHeader,} from "@material-tailwind/react";
import styles from "../styles/pages/Faq.module.css";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {CustomErrorBoundary} from "../errors/CustomErrorBoundary";

export default function Faq() {
    
    const [open, setOpen] = useState<number>(0);
    
    const handleOpen = (value: number) => {
        setOpen(value === open ? 0 : value);
    };
    
    const customAnimation = {
        mount: {scale: 1},
        unmount: {scale: 0.9},
    };

    return (
        <div data-testid="faqPage">
            <CustomErrorBoundary 
                ResponseComponent={ErrorBoundaryResponse}>
            <section 
                className={styles.section}>
            <div 
                className={styles["container"]}>
                <div>
                    <h2>
                        Frequently Asked Questions
                    </h2>
                </div>
                <br/>
                <Fragment>
                    <Accordion 
                        open={open === 1}
                        data-testid="acc-1"
                        animate={customAnimation}>
                        <div 
                            className={styles["accordion-wrapper"]}>
                            <AccordionHeader 
                                role="button"
                                data-testid="accHeader-1"
                                onClick={() => handleOpen(1)} 
                                className={styles["accordion-header"]}>
                                What is Game fixing?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-1"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                    Game-fixing (known also as Match-fixing) is when someone directly
                                    involved in a sporting contest is able to change the results in
                                    order for a certain bet to win. That can involve asking a player to
                                    purposefully miss a shot, telling a referee to call more fouls
                                    against a certain team, or asking a coach to bench a specific
                                    player.
                                    <br/>
                                    <br/>
                                    Read more about Game-fixing in{" "}
                                    <a
                                        href="#"
                                        className={styles["accordion-body-link"]}
                                    >
                                        https://www.olbg.com/us/blogs/match-fixing-scandals
                                    </a>
                                </p>
                            </AccordionBody>
                        </div>
                    </Accordion>

                    <Accordion 
                        open={open === 2}
                        data-testid="acc-2"
                        animate={customAnimation}>
                        <div 
                            className={styles["accordion-wrapper"]}>
                            <AccordionHeader 
                                role="button"
                                data-testid="accHeader-2"
                                onClick={() => handleOpen(2)} 
                                className={styles["accordion-header"]}>
                                What is the point of game fixing?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-2"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                    The main reason people get involved in
                                    game-fixing "match-fixing" and manipulating games is for personal or financial gain.
                                    It generally involves contacts between gamblers, players, team officials,
                                    and/or referees, and has serious implications for sport at all levels.
                                    <br/>
                                    <br/>
                                    Read more about Game-fixing in{" "}
                                    <a
                                        href="#"
                                        className={styles["accordion-body-link"]}
                                    >
                                        https://sportnz.org.nz/resources/match-fixing-and-gambling-in-sport/
                                    </a>
                                </p>
                            </AccordionBody>
                        </div>
                    </Accordion>


                    <Accordion 
                        open={open === 3}
                        data-testid="acc-3"
                        animate={customAnimation}>
                        <div 
                            className={styles["accordion-wrapper"]}>
                            <AccordionHeader 
                                role="button"
                                data-testid="accHeader-3"
                                onClick={() => handleOpen(3)} 
                                className={styles["accordion-header"]}>
                                Is game-fixing cheating?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-3"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                    Match-fixing in esports is the deliberate alteration
                                    of the outcome of a match by one or more players.It is considered a form of
                                    cheating,
                                    and is often punishable by disqualification from the event.
                                    <br/>
                                    <br/>
                                    Read more at{" "}
                                    <a
                                        href="#"
                                        className={styles["accordion-body-link"]}
                                    >
                                        https://liquidsky.com/match-fixing-in-csgo-cheating-for-gambling-or-personal-gain/
                                    </a>
                                </p>
                            </AccordionBody>
                        </div>
                    </Accordion>


                    <Accordion 
                        open={open === 4}
                        data-testid="acc-4"
                        animate={customAnimation}>
                        <div 
                            className={styles["accordion-wrapper"]}>
                            <AccordionHeader
                                role="button"
                                data-testid="accHeader-4"
                                onClick={() => handleOpen(4)} 
                                className={styles["accordion-header"]}>
                                What is the most famous game-fixing?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-4"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                    The most famous incident involved three Sheffield
                                    Wednesday players, including two England international players, who were
                                    subsequently banned from football for life and imprisoned after it was
                                    discovered they had bet on their team losing a match against Ipswich Town.
                                    <br/>
                                    <br/>
                                    Read more at{" "}
                                    <a
                                        href="#"
                                        className={styles["accordion-body-link"]}
                                    >
                                        https://en.wikipedia.org/wiki/List_of_match-fixing_incidents
                                    </a>
                                </p>
                            </AccordionBody>
                        </div>
                    </Accordion>

                    <Accordion 
                        open={open === 5}
                        data-testid="acc-4"
                        animate={customAnimation}>
                        <div 
                            className={styles["accordion-wrapper"]}>
                            <AccordionHeader
                                role="button"
                                data-testid="accHeader-5"
                                onClick={() => handleOpen(5)} className={styles["accordion-header"]}>
                                Who started game-fixing?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-5"
                                className={styles["accordion-body"]}>
                                <p className="break-words">
                                    Azharuddin reportedly
                                    confessed that he had fixed three one-day matches; the first against South Africa
                                    at Rajkot in 1996,
                                    then Pepsi Cup matches in Sri Lanka in 1997 and Pakistan in 1999.
                                    <br/>
                                    <br/>
                                    Read more at{" "}
                                    <a
                                        href="#"
                                        className={styles["accordion-body-link"]}
                                    >
                                        https://www.espncricinfo.com/ci/content/story/144219.html
                                    </a>
                                </p>
                            </AccordionBody>
                        </div>
                    </Accordion>

                    <Accordion 
                        open={open === 6}
                        data-testid="acc-6"
                        animate={customAnimation}>
                        <div 
                            className={styles["accordion-wrapper"]}>
                            <AccordionHeader
                                role="button"
                                data-testid="accHeader-6"
                                onClick={() => handleOpen(6)} 
                                className={styles["accordion-header"]}>
                                How is game-fixing unethical?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-6"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                    This type of game-fixing is considered a sub-dimension
                                    of corruption in sports, which is "any illegal, immoral, or unethical activity that
                                    attempts
                                    to deliberately distort the result of a sporting contest for the
                                    personal material gain of one or more parties involved in that activity"
                                    <br/>
                                    <br/>
                                    Read more at{" "}
                                    <a
                                        href="#"
                                        className={styles["accordion-body-link"]}
                                    >
                                        https://core.ac.uk/download/pdf/237010431.pdf
                                    </a>
                                </p>
                            </AccordionBody>
                        </div>
                    </Accordion>
                </Fragment>
            </div>
        </section>
            </CustomErrorBoundary>
        </div>
    );

}