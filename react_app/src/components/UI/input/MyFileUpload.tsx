import React, {ReactNode} from 'react';
import styles from "../../../styles/pages/AdminPage.module.css";
import MyButton from "../buttons/MyButton";
import {ClearContext, getAll} from "../../../services/data.service";
import {AxiosResponse} from "axios";
import {ICSVdata} from "../../../models/ICSVdata";
import {getHeaders} from "../../../utils/assistFunctions";
import ErrorBoundaryResponse from "../../../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../../../errors/ErrorBoundary";

interface GET_DATA{
    setIsLoading: (b: boolean) => void,
    setMyError: (s: string) => void,
    setData: (data: Array<ICSVdata> | undefined) => void,
    setHeaders: (headers: string[]) => void,
    setModalVisible: (b: boolean) => void,
    setInfoModalVisible: (b: boolean) => void,
    setInfoMessage: (dataFetchedFromDatabaseSuccessfully: string) => void,
    setShowContent: (b: boolean) => void,
    setShowButton: (b: boolean) => void,
    setFile: (uploadedFiles: any) => void,
    children?: ReactNode,
    aRef: any,    
}

const MyFileUpload = ({setIsLoading, setMyError, setData, setHeaders, setModalVisible, setInfoModalVisible, setInfoMessage, setShowContent, setFile, setShowButton, children, aRef }: GET_DATA) => {
    const allowedFileTypes: string = "text/csv";

    //This function will be called when file will be uploaded by input from user
    const handleFiles = (e: any) => {
        try {
            setIsLoading(true)
            setMyError("");
            // Check if user has entered the file
            if (e.target.files.length) {
                let uploadedFiles = e.target.files[0];
                // Checking file's extension and throwing error if incorrect
                const extension: string = uploadedFiles?.type.split("/")[1].toString();

                if (!allowedFileTypes.includes(extension)) {
                    setMyError("");
                    aRef.current!.value = '';
                    setModalVisible(true);
                    return false;
                }
                // If input type is correct set the state
                setFile(uploadedFiles);
                setShowButton(true)
                setIsLoading(true)
            }
        } catch (error: any) {
            throw new Error(error)
        }
    };
    
    const handleGetData = async () => {
        try {
            ClearContext();
            setIsLoading(true)
            setMyError("")
            await getAll().then(
                (response: AxiosResponse<Array<ICSVdata>>) => {
                    setData(response?.data);
                    const headers = getHeaders(response?.data).filter((item) => item !== 'Id');
                    setHeaders(headers)
                    setInfoModalVisible(true);
                    setInfoMessage('Data fetched from database successfully!')
                    setShowContent(true)
                    setShowButton(true)
                }
            );
            setIsLoading(true)
        } catch (err: any) {
            if (!err.response) {
                setMyError("");
            } else if (err.response?.status === 401) {
                setMyError("");
            } else {
                setMyError("");
            }
        }
    }
    
    
    return (
        <div>
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
                <label 
                    htmlFor="fileUpload" 
                    style={{display: "block"}} 
                    title="Import CSV file">
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
                    {children}
                </MyButton>
            </ErrorBoundary>
        </div>
    );
};

export default MyFileUpload;