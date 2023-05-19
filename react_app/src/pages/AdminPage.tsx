import React, {FC, useRef, useState} from 'react';
import Papa from "papaparse";
import MyInput from "../components/UI/input/MyInput";
import ErrorModal from "../components/UI/modals/ErrorModal";
import MyTable from "../components/table/MyTable";
import MyButton from "../components/UI/buttons/MyButton";
import Loader from "../components/UI/loader/Loader";
import styles from "../styles/pages/AdminPage.module.css";
import DangerButton from "../components/UI/buttons/DangerButton";
import {
    clearStorage,
    getStoredData,
    getStoredHeaders,
    setDataToStore,
    setHeadersToStore,
    upload,
} from "../services/data.service";
import {ICSVdata} from "../models/ICSVdata";
import {getHeaders} from "../utils/assistFunctions";
import useData from "../hooks/useData";
import InfoModal from "../components/UI/modals/InfoModal";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import MyFileUpload from "../components/UI/input/MyFileUpload";
import MyDragDropArea from "../components/UI/input/MyDragDropArea";
import {ErrorBoundary} from "../errors/ErrorBoundary";


const AdminPage: FC = () => {

    //----------------------LIST OF STATES ----------------------------------
    //State 1_ This state to represent style change of drag area
    const [indicator, setIndicator] = useState(false);
    //State 2_ Used context to store the parsed data.
    const {data, setData, headers, setHeaders, setDataSource}: any = useData();
    //State 3_ This state will store error messages
    const [myError, setMyError] = useState("");
    //State 4_ This state will store the file uploaded by the user
    const [file, setFile] = useState<File | null>(null);
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

    //-----------------------------------------------------------------
    //This function below will reset all functions and states to their defaults
    const resetAll = () => {
        clearStorage();
        setFile(null)
        setShowContent(false)
        setShowButton(false)
        setMyError("No data found. Please upload the file or fetch data from database.")
        setModalVisible(true)
        setInfoModalVisible(false);
        setInfoMessage('');
    }

    // Handle uploaded file by store data in localStorage and allowed to be visible if needed
    const handleUploadedFile = () => {
        clearStorage()
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
                // Remove the last object if any of its properties are empty
                const filteredData = results.data.filter((obj: { [key: string]: any }) =>
                    Object.values(obj).every(value => value !== '')
                );
                setDataToStore('csv', filteredData)
                setData(getStoredData('csv'))
                const headers = getHeaders(filteredData)
                setHeadersToStore('headers', headers)
                setHeaders(getStoredHeaders('headers'))
                setShowContent(true)
                setMyError("");
                setDataToStore('source', `Data was used from uploaded CSV file ${file.name}`);
                setDataSource(`Data was used from uploaded CSV file ${file.name}`)
            }
        });
        setIsLoading(false);
    }; // End of handleUploadedFile

    // Handling saving to dataBase
    const handleUpload = async () => {
        try {
            setIsLoading(true);
            if (data.length !== 0) {
                const promises = data.map(async (obj: ICSVdata) => {
                    return await upload([obj]);
                });
                Promise.allSettled(promises)
                    .then((results) => {
                        const failedUploads: Array<any> = [];
                        const successfulUploads: Array<any> = [];

                        results.forEach((result, index) => {
                            if (result.status === 'fulfilled') {
                                successfulUploads.push(data[index]);
                            } else {
                                failedUploads.push(data[index]);
                            }
                        });

                        if (failedUploads.length === 0) {
                            setInfoModalVisible(true);
                            setInfoMessage('Data saved to the database successfully!');
                            // To catch successful uploads
                            // console.log('Successful Uploads:', successfulUploads);
                        } else {
                            setMyError('Some data failed to upload');
                            //To catch failed uploads
                            // console.log('Failed Uploads:', failedUploads);
                            setModalVisible(true);
                        }
                    })
                    .catch((error) => {
                        setMyError(`An error occurred while uploading data: ${error}`);
                        setModalVisible(true);
                    });
            }
        } catch (err: any) {
            if (!err?.response) {
                setMyError(err?.response);
                setModalVisible(true);
            } else if (err.response?.status === 401) {
                setMyError('No authorization found. Please login');
                setModalVisible(true);
            } else {
                setMyError('Upload data Failed');
                setModalVisible(true);
            }
        }
    }; // End of handleUpload function
    



    //----------------------------------------------------------

        return (
            <div data-testid="adminPage">
                <ErrorBoundary 
                    ResponseComponent={ErrorBoundaryResponse}>
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
                                isInfoModalVisible={isInfoModalVisible}
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
                                    value="Explore"
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
                                <div 
                                    style={{color: "red"}}>
                                    {myError}
                                </div>
                                <MyButton 
                                    onClick={() => {
                                    setModalVisible(false)
                                }}>Close</MyButton>
                            </ErrorModal>
                        }
                        
                    </div>
                    <div>
                        {isLoading && !myError && !isInfoModalVisible
                            ? <Loader />
                            :
                                (
                                    <div>{isInfoModalVisible &&
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
                                    }
                                    </div>
                                )
                        }
                        {!isInfoModalVisible && !myError && showContent
                            ?
                            (
                                <div>
                                    <MyTable
                                        columns={headers}
                                        rows={data}
                                    />
                                </div>
                            )
                            :
                            (
                                <div>
                                    <h1 style={{textAlign: "center", color: "#686767"}}>
                                        No data!
                                    </h1>
                                </div>
                            )
                        }
                    </div>
                </ErrorBoundary>
            </div>
        );

    }
;

export default AdminPage;

// References
// https://react-papaparse.js.org/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
// https://www.techiediaries.com/reset-file-input-react/