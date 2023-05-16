import React, {FC, ReactNode} from 'react';
import styles from "../../../styles/pages/AdminPage.module.css";
import MyButton from "../buttons/MyButton";
import {ClearContext, getAll} from "../../../services/data.service";
import {AxiosResponse} from "axios";
import {ICSVdata} from "../../../models/ICSVdata";
import {getHeaders} from "../../../utils/assistFunctions";
import ErrorBoundaryResponse from "../../../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../../../errors/ErrorBoundary";
import InfoModal from "../modals/InfoModal";
import useData from "../../../hooks/useData";

interface GET_DATA{
    setIsLoading: (b: boolean) => void,
    setMyError: (s: string) => void,
    setData: (data: Array<ICSVdata> | undefined) => void,
    setHeaders: (headers: string[]) => void,
    setModalVisible: (b: boolean) => void,
    setInfoModalVisible: (b: boolean) => void,
    isInfoModalVisible: boolean,
    setInfoMessage: (dataFetchedFromDatabaseSuccessfully: string) => void,
    setShowContent: (b: boolean) => void,
    setShowButton: (b: boolean) => void,
    setFile: (uploadedFiles: any) => void,
    children?: ReactNode,
    aRef: any,    
}

const MyFileUpload: FC<GET_DATA> = ({
                                        setIsLoading, 
                                        setMyError, 
                                        setData, 
                                        setHeaders, 
                                        setModalVisible, 
                                        setInfoModalVisible,
                                        isInfoModalVisible,
                                        setInfoMessage, 
                                        setShowContent, 
                                        setFile, 
                                        setShowButton, 
                                        children, 
                                        aRef }) => {
    const allowedFileTypes: string = "text/csv";
    const {setDataSource}: any = useData();

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
                setShowButton(true);
                setIsLoading(true);
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
                    setHeaders(headers);
                    setIsLoading(true)
                    setInfoModalVisible(true);
                    setDataSource('Data was fetched from data base.')
                    setInfoMessage('Data fetched from database successfully!');
                    setShowContent(true);
                    setShowButton(true);
                }
            ).finally(() => 
                <InfoModal
                visible={isInfoModalVisible}
                setVisible={setInfoModalVisible} >
                <div style={{color: "red"}}>
                    <p>{isInfoModalVisible}</p>
                </div>
                <MyButton onClick={() => {
                    setInfoModalVisible(false);
                }}>Close</MyButton>
            </InfoModal>);
            setIsLoading(true)
        } catch (err: any) {
            if (!err.response) {
                setMyError(err.response);
                setModalVisible(true);
            } else if (err.response?.status === 401) {
                setMyError('Unauthorized');
                setModalVisible(true);
            } else {
                setMyError('Fetching of data from database failed');
                setModalVisible(true);
            }
        }
    }
    
    
    return (
        <div>
            <ErrorBoundary ResponseComponent={ErrorBoundaryResponse}>
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