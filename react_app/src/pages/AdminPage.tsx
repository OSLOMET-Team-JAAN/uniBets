import React, {useRef, useState} from 'react';
import Papa from "papaparse";
import MyInput from "../components/UI/input/MyInput";
import ErrorModal from "../components/UI/modals/ErrorModal";
import MyTable from "../components/table/MyTable";
import MyButton from "../components/UI/buttons/MyButton";
import Loader from "../components/UI/loader/Loader";
import styles from "../styles/AdminPage.module.css";
import DangerButton from "../components/UI/buttons/DangerButton";
import useCSVHeaders from "../hooks/useCSVHeaders";
import {getAll, upload} from "../services/data.service";
import {ICSVdata} from "../models/ICSVdata";
import {AxiosResponse} from "axios";
import {getHeaders} from "../utils/assistFunctions";
import useCSV from "../hooks/useCSV";
import {log} from "util";
import IPlayer from "../models/IPlayer";

const allowedFileTypes: string = "text/csv";
const AdminPage = () => {


        //----------------------LIST OF STATES ----------------------------------
        //State 1_ This state to represent style change of drag area
        const [indicator, setIndicator] = useState(false);
        //State 2_ Used context to store the parsed data.
        const {data, setData}: any = useCSV();
        // const [data, setData] = useState<Array<ICSVdata>>([])
        //State 4_ Used context to hold headers (keys) from data (objects) received from csv files.
        const {csvHeaders, setCsvHeaders}: any = useCSVHeaders();
        //This state will control errors
        const [myError, setMyError] = useState("");
        //State 5_ This state will store the file uploaded by the user
        const [file, setFile] = useState<File | string>("");
        // //State _ This state will store file names to represent the list of uploaded files
        // const [fileName, setFileName] = useState([]);
        //State 6_ This state will show / hide results
        const [showContent, setShowContent] = useState(false);
        //State 7_ To avoid typescript complains about ref usage in <input> we'll create our own which will return a reference.
        const aRef = useRef<HTMLInputElement>(null);
        //State 8_ The state below will control modal windows
        const [modalVisible, setModalVisible] = useState(true);
        // State 9_ For showing and hiding buttons
        const [showButton, setShowButton] = useState(false);
        //State 10_ to show fetching data process
        const [isFetchingData, setIsFetchingData] = useState(false);
        //-------------------------------------------------------------------------
        //This function below will reset all functions and states to their defaults
        const resetAll = () => {
            setData([])
            setCsvHeaders([])
            setFile("")
            setShowContent(false)
            setShowButton(false)
            setMyError("No data found. Please upload the file or fetch data from database.")
            setModalVisible(true)
        }


//-------------------------------------------------------------------------
//This function will be called when file will be uploaded by input from user
        const handleFiles = (e: any) => {
            try {
                setIsFetchingData(true)
                setMyError("");
                // Check if user has entered the file
                if (e.target.files.length) {
                    let uploadedFiles = e.target.files[0];

                    // Checking file's extension and throwing error if incorrect
                    const extension: string = uploadedFiles?.type.split("/")[1].toString();

                    if (!allowedFileTypes.includes(extension)) {
                        setMyError("Uploading Error! File type is not CSV! Please choose CSV file!");
                        aRef.current!.value = '';
                        setModalVisible(true);
                        return false;
                    }
                    // If input type is correct set the state
                    setFile(uploadedFiles);
                    setShowButton(true)
                    setIsFetchingData(false)
                }
            } catch (error: any) {
                throw new Error(error)
            }
        };


//-------------------------------------------------------------------------
//This function helps to store file names
// const getFileName = (array: string[]): void => {
//     setFileName((existing) => [...existing, ...array])
// }

//-------------------------------------------------------------------------
        const handleUploadedFile = () => {
            setIsFetchingData(true)
            //Show error if buttons "Show content" pressed without file been uploaded
            if (!file || !data) {
                setMyError("No data found. Please upload the file or fetch data from database.")
                setModalVisible(true)
                return
            }
            Papa.parse(file, {
                delimiter: ',',
                header: true,
                dynamicTyping: true, //numbers, boolean will not become strings
                complete: function (results: any) {
                    setData(results.data)                    
                    const headers = getHeaders(results.data)
                    setCsvHeaders(headers)
                    setShowContent(true)
                    setMyError("");
                }
            });
            setIsFetchingData(false)
        };       
        

        const handleUpload = async () => {
            try {
                if(data.length !== 0){
                    const promises = data.map(async (obj: ICSVdata) => {
                        const array: Array<ICSVdata> = [];
                        array.push(obj)
                        return await upload(array).then((response) => {
                            console.log(response.data)
                            }
                        )
                    });
                    Promise.allSettled(promises)
                        .then((response) => {
                            console.log("Here is POST response " + JSON.stringify(response))})
                        .catch((error) => setMyError(error)).finally(() =>
                        alert("Data is saved successfully to database!")
                    )
                    
                }                
            } catch (err: any) {
                if (!err?.response) {
                    setMyError(err?.response);
                } else if (err.response?.status === 401) {
                    setMyError('Unauthorized');
                } else {
                    setMyError('Upload data Failed');
                }
            }
        }
        

        const handleGetData = async () => {
            try {
                setMyError('')
                await getAll().then(
                    (response: AxiosResponse<Array<ICSVdata>>) => {
                        setData(response?.data)
                        console.log(typeof data)
                        const headers = getHeaders(response?.data).filter((item) => item !== 'Id')
                        setCsvHeaders(headers)
                        alert("Data fetched Successfully");
                        setShowContent(true)
                        setShowButton(true)
                    }
                );
            } catch (err: any) {
                if (!err.response) {
                    setMyError(err.response);
                } else if (err.response?.status === 401) {
                    setMyError('Unauthorized');
                } else {
                    setMyError('Data Fetching is Failed');
                }
            }
        }


//-------------------------------------------------------------------------

        return (
            <div>
                <h2 className={styles.csvImport}> Import of CSV file</h2>
                <div
                    className={`${styles.dragAndDropArea} ${indicator ? styles.dragHover : styles.dragFree}`}
                    //Used conditioning (ternary) expression for dragging styling

                    onDragEnter={() => {
                        setIndicator(true)
                    }}
                    onDragLeave={() => {
                        setIndicator(false)
                    }}
                    onDragOver={(event) => {
                        event.preventDefault()
                    }}
                    onDrop={(event) => {
                        event.preventDefault();
                        setIndicator(false)
                        console.log("dataTransfer file" + event.dataTransfer.files)
                        setIsFetchingData(true)
                        // Check if user has entered the file
                        if (event.dataTransfer.files.length) {
                            const uploadedFile = event.dataTransfer.files && event.dataTransfer.files[0];
                            setFile(uploadedFile)
                            // Checking file's extension and throwing error if incorrect
                            const extension = uploadedFile?.type.split("/")[1].toString();
                            console.log(extension)
                            if (!allowedFileTypes.includes(extension)) {
                                setMyError("Please input a csv file");
                                return;
                            }
                            setMyError("")
                        }

                        //Creating an array of files which will hold all csv files uploaded
                        //It was an idea to upload several files. But later it was dropped.
                        //We are keeping array anyway for future, in case if it will require to implement it later
                        Array.from(event.dataTransfer.files)
                            .filter((file) => file.type === allowedFileTypes).forEach(async (file) => {
                            // we need to make async for promise resolving
                            const text = await file.text();
                            Papa.parse(text, {
                                delimiter: ',',
                                header: true,
                                dynamicTyping: true, //numbers, boolean will not become strings
                                complete: function (csvData) {
                                    setData(csvData.data)
                                    // Extracting headers from all objects in a List and
                                    const headers = getHeaders(csvData.data)
                                    setCsvHeaders(headers as [])
                                    setShowContent(false)
                                    setShowButton(true)
                                }
                            });
                        })
                        setIsFetchingData(false)
                        setModalVisible(true)
                        window.alert("CSV file was uploaded successfully!")
                    }}
                >
                    DRAG FILES HERE
                </div>
                <div>
                    <label htmlFor="fileUpload" style={{display: "block"}} title="Import CSV file">
                    </label>
                    <input
                        //We cannot use <MyInput /> - Function components cannot be given refs.
                        //Possible to use React.forwardRef with useImperativeHandle hook to expose some functions or states
                        // from component to the parent component,
                        // but...
                        className={styles.buttons}
                        key="fileUploadKey"
                        onChange={handleFiles}
                        id="fileUpload"
                        name="file"
                        type="File"
                        ref={aRef} //for ref was a trouble to use <MyInput/>
                    />
                    <MyButton
                        onClick={handleGetData}
                    >
                        Fetch from DB
                    </MyButton>
                    {showButton &&
                        <DangerButton onClick={() => {
                            aRef.current!.value = '';
                            resetAll()
                        }}
                        >Reset
                        </DangerButton>
                    }
                    {file && 
                        <div style={{display: "block"}}>
                            <MyInput
                                type="submit"
                                value="Show file content"
                                onClick={() => {
                                    handleUploadedFile()
                                }}
                            />
                            <MyButton
                                onClick={handleUpload}
                            >Save to database
                            </MyButton>
                        </div>
                    }                    
                    {myError &&
                        <ErrorModal
                            visible={modalVisible}
                            setVisible={setModalVisible}
                        >
                            <div style={{color: "red"}}>
                                {myError}
                            </div>
                            <MyButton onClick={() => {
                                setModalVisible(false)
                            }}>Close</MyButton>
                        </ErrorModal>}
                </div>
                <div>
                    {isFetchingData && !myError
                        ? <div><Loader/></div>
                        : <>
                            {showContent
                                ? <MyTable
                                    columns={csvHeaders}
                                    rows={data}
                                />
                                : <h1 style={{textAlign: "center", color: "teal"}}
                                >No data!
                                </h1>
                            }
                        </>
                    }
                </div>
            </div>
        );

    }
;

export default AdminPage;

// References
// https://react-papaparse.js.org/
// https://www.techiediaries.com/reset-file-input-react/