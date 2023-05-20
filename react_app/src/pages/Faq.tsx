import {Fragment, useState} from "react";
import {Accordion, AccordionBody, AccordionHeader,} from "@material-tailwind/react";
import styles from "../styles/pages/Faq.module.css";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../errors/ErrorBoundary";

export default function Faq() {
    //Store accordion's number opening/closing condition
    const [open, setOpen] = useState<number>(0);
    
    //Handle opening / closing
    const handleOpen = (value: number) => {
        setOpen(value === open ? 0 : value);
    };
    
    const customAnimation = {
        mount: {scale: 1},
        unmount: {scale: 0.9},
    };

    return (
        <div data-testid="faqPage">
            <ErrorBoundary 
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
                                How can i upload a CSV file?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-1"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                            First you need to login as Administrator to have this type of privilage.
                                            then you can go to Admin Page, there you can either drop the file from you file location
                                            into the block, or you can click on Choose file and from there you can redirect to your file source
                                    on your desktop and then click ok and the file will be uploaded.
                                    <br/>
                                    <br/>
                                           
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
                                How can i see the file content ? 
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-2"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                            After uploading the file you can click on Explore button in blue and then a 
                                            table with the file content will appear on the same page. 
                                            the table have filter ability, which mean you can manipulate the data in the file 
                                    before heading to Dashboard page if you want.
                                    <br/>
                                    <br/>
                                           
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
                            What are those data that are in the Dashboard ?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-3"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                            If you did not upload any file, you will still see information in the Dashboard page. 
                                            This information is fetched from data base, and it's about the last uploaded file and fetched to database.
                                            this wil happen automatically if you loged in as an Admin.
                                   
                                    <br/>
                                    <br/>
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
                                Can i get info about exact player?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-4"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                            Yes, this you can do. after uploading the file you can head to Dashoard page. 
                                            in the top you can see two oinput feild, there you can type in the plyaer number and choose the
                                            top  customization as well. Pay intention that the player number should be known from the uploaded file.
                                    <br/>
                                    <br/>
                                 
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
                                What i can do in Dashboard page ?
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-5"
                                className={styles["accordion-body"]}>
                                <p className="break-words">
                                            In Dashboard page, you can see analysation about uploaded file data.
                                            This analysation will be in form of tables an charts, in some of the charts you can manipulate the
                                            results. For eksample you can choose the Top 10 winners By total bets and win rates.
                                            You can also analyse the data about exact player by typing his number in the input feild at the top.
                                            There is several gadget that show the date, win and Bets rate.
                                            You will have table in the bottom that contain informaton about the uploaded file, this table has filter which allow you to
                                            filter the data to get the best wanted result. 
                                            

                                    <br/>
                                    <br/>
                                          
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
                                Can i upload pdf file instead ? 
                            </AccordionHeader>
                            <AccordionBody
                                role="region"
                                data-testid="accBody-6"
                                className={styles["accordion-body"]}>
                                <p 
                                    className="break-words">
                                            Unfortunally No, this you cannot do cause this web application is designed to
                                            read data from file with CSV format only.

                                    <br/>
                                    <br/>
                                </p>
                            </AccordionBody>
                        </div>
                    </Accordion>
                </Fragment>
            </div>
        </section>
            </ErrorBoundary>
        </div>
    );

}