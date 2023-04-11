import React, {useRef, useState} from 'react';
import Papa from "papaparse";
import MyInput from "../components/UI/input/MyInput";
import ErrorModal from "../components/UI/modals/ErrorModal";
import MyTable from "../components/table/MyTable";
import MyButton from "../components/UI/buttons/MyButton";
import Loader from "../components/UI/loader/Loader";
import styles from "../styles/pages/AdminPage.module.css";
import DangerButton from "../components/UI/buttons/DangerButton";
import {
    ClearContext,
    getStoredData,
    getStoredHeaders,
    setDataToStore,
    setHeadersToStore,
    upload,
} from "../services/data.service";
import {ICSVdata} from "../models/ICSVdata";
import {getHeaders} from "../utils/assistFunctions";
import useCSV from "../hooks/useCSV";
import InfoModal from "../components/UI/modals/InfoModal";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from '../errors/ErrorBoundary';
import MyFileUpload from "../components/UI/input/MyFileUpload";
import MyDragDropArea from "../components/UI/input/MyDragDropArea";


const AdminPage = () => {

        //----------------------LIST OF STATES ----------------------------------
        //State 1_ This state to represent style change of drag area
        const [indicator, setIndicator] = useState(false);
        //State 2_ Used context to store the parsed data.
        const {data, setData, headers, setHeaders}: any = useCSV();
        //State 3_ This state will store error messages
        const [myError, setMyError] = useState("");
        //State 4_ This state will store the file uploaded by the user
        const [file, setFile] = useState<File | string>("");
        // //State _ This state will store file names to represent the list of uploaded files
        // const [fileName, setFileName] = useState([]);
        //State 5_ This state will show / hide results
        const [showContent, setShowContent] = useState(false);
        //State 6_ To avoid typescript complains about ref usage in <input> we'll create our own which will return a reference.
        const aRef = useRef<HTMLInputElement>(null);
        //State 7_ The state below will control modal windows
        const [modalVisible, setModalVisible] = useState(true);
        // State 8_ For showing and hiding buttons
        const [showButton, setShowButton] = useState(false);
        //State 9_ to show fetching data process
        const [isLoading, setIsLoading] = useState(false);
        //State 10_ activates / deactivates info Modal window
        const [isInfoModalVisible, setInfoModalVisible] = useState(false);
        //State 11_ stores messages for Info modal window
        const [infoMessage, setInfoMessage] = useState('');
        
        //-------------------------------------------------------------------------
        //This function below will reset all functions and states to their defaults
        const resetAll = () => {
            ClearContext();
            setFile("")
            setShowContent(false)
            setShowButton(false)
            setMyError("No data found. Please upload the file or fetch data from database.")
            setModalVisible(true)
            setInfoModalVisible(false);
            setInfoMessage('');
        }


//-------------------------------------------------------------------------

        const handleUploadedFile = () => {
            ClearContext()
            setIsLoading(true);
            //Show error if buttons "Show content" pressed without file been uploaded
            if (!file) {
                setMyError("No data found. Please upload the file or fetch data from database.")
                setModalVisible(true)
                return
            }
            Papa.parse(file, {
                delimiter: ',',
                header: true,
                //dynamicTyping: true, //numbers, boolean will not become strings
                complete: function (results: any) {
                    setDataToStore('csv', results.data)
                    setData(getStoredData('csv'))
                    const headers = getHeaders(results.data)
                    setHeadersToStore('headers', headers)
                    setHeaders(getStoredHeaders('headers'))
                    setShowContent(true)
                    setMyError("");
                }
            });
            setIsLoading(false)
        };

        const handleUpload = async () => {
            try {
                setIsLoading(true)
                if (data.length !== 0) {
                    const promises = data.map(async (obj: ICSVdata) => {
                        const array: Array<ICSVdata> = [];
                        array.push(obj)
                        return await upload(array).then()
                    });
                    Promise.allSettled(promises)
                        .then((response) => {
                            console.log(JSON.stringify(response))
                        })
                        .catch((error) => setMyError(error))
                        .finally(() =>
                            <InfoModal visible={isInfoModalVisible} setVisible={setInfoModalVisible} >
                                <div style={{color: "red"}}>
                                    <p>Data is saved successfully to database!</p>
                                </div>
                                <MyButton onClick={() => {
                                    setInfoModalVisible(false);
                                }}>Close</MyButton>
                            </InfoModal>
                        )
                }
                setIsLoading(false)
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


//-------------------------------------------------------------------------

        return (
            <>
                <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
                    <div className={styles.cont}>
                        <h2 className={styles.csvImport}> Import of CSV file</h2>
                        <MyDragDropArea 
                            indicator={indicator} 
                            setIndicator={setIndicator} 
                            setIsLoading={setIsLoading} 
                            setFile={setFile} 
                            setMyError={setMyError} 
                            setData={setData} 
                            setHeaders={setHeaders} 
                            setShowContent={setShowContent} 
                            setShowButton={setShowButton} 
                            setModalVisible={setModalVisible} 
                            setInfoModalVisible={setInfoModalVisible} 
                            setInfoMessage={setInfoMessage} 
                        >
                            DRAG FILES HERE
                        </MyDragDropArea>
                        <div>
                            <MyFileUpload 
                                setIsLoading={setIsLoading} 
                                setMyError={setMyError} 
                                setData={setData} 
                                setHeaders={setHeaders} 
                                setModalVisible={setModalVisible} 
                                setInfoModalVisible={setInfoModalVisible} 
                                setInfoMessage={setInfoMessage} 
                                setShowContent={setShowContent} 
                                setShowButton={setShowButton} 
                                setFile={setFile} 
                                aRef={aRef}
                            > Fetch from DB                                
                            </MyFileUpload>
                        </div>
                        {showButton &&
                            <DangerButton 
                                onClick={() => {
                                aRef.current!.value = '';
                                resetAll()
                            }}
                            >Reset
                            </DangerButton>
                        }
                        {file &&
                            <div>
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
                            </ErrorModal>
                        }
                        
                    </div>
                    <div>
                        {isLoading && !myError && !isInfoModalVisible
                            ? <Loader><h2 style={{color: "red"}}>o</h2></Loader>
                            : 
                            <>{isInfoModalVisible &&
                                    <InfoModal
                                        visible={isInfoModalVisible}
                                        setVisible={setInfoModalVisible} >
                                        <div style={{color: "red"}}>
                                            <p>{infoMessage}</p>
                                        </div>
                                        <MyButton onClick={() => {
                                            setInfoModalVisible(false);
                                            setIsLoading(false);
                                        }}>Close</MyButton>
                                    </InfoModal>
                                }</> 
                        }
                        {!isInfoModalVisible && !myError && showContent
                            ?
                            <div>
                                <MyTable
                                    columns={headers}
                                    rows={data}
                                />
                            </div>
                            :
                            <div>
                                <h1 style={{textAlign: "center", color: "#686767"}}>
                                    No data!
                                </h1>
                            </div>
                        }
                    </div>
                </ErrorBoundary>
            </>
        );

    }
;

export default AdminPage;

// References
// https://react-papaparse.js.org/
// https://www.techiediaries.com/reset-file-input-react/