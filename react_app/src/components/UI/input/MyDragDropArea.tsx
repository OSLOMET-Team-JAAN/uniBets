import React, {FC, ReactNode} from 'react';
import styles from "../../../styles/pages/AdminPage.module.css";
import {
    ClearContext,
    getStoredData,
    getStoredHeaders,
    setDataToStore,
    setHeadersToStore
} from "../../../services/data.service";
import Papa from "papaparse";
import {getHeaders} from "../../../utils/assistFunctions";

interface DRAG_DROP{
    indicator: boolean,
    setIndicator: (b: boolean) => void,
    setIsLoading: (b: boolean) => void,
    setFile: (uploadedFile: File) => void,
    setMyError: (pleaseInputACsvFile: string) => void,
    setData: (storedData: any) => void,
    setHeaders: (storedHeaders: any) => void,
    setShowContent: (b: boolean) => void,
    setShowButton: (b: boolean) => void,
    setModalVisible: (b: boolean) => void,
    setInfoModalVisible: (b: boolean) => void,
    setInfoMessage: (csvFileWasUploadedSuccessfully: string) => void,
    children: ReactNode,
}

const allowedFileTypes: string = "text/csv";

const MyDragDropArea: FC<DRAG_DROP> = ({
                            indicator, 
                            setIndicator, 
                            setIsLoading, 
                            setFile, 
                            setMyError, 
                            setData, 
                            setHeaders, 
                            setShowButton, 
                            setShowContent, 
                            setInfoMessage, 
                            setInfoModalVisible, 
                            setModalVisible, 
                            children }) => {
    return (
            <div
                className={`${styles.dragAndDropArea} ${indicator ? styles.dragHover : styles.dragFree}`}
                //Used conditioning (ternary) expression for dragging styling
    
                onDragEnter={() => {
                    setIndicator(true)
                }}
                onDragLeave={() => {
                    setIndicator(true)
                }}
                onDragOver={(event) => {
                    event.preventDefault()
                }}
                onDrop={(event) => {
                    event.preventDefault();
                    setIndicator(true)
                    setIsLoading(false)
                    // Check if user has entered the file
                    if (event.dataTransfer.files.length) {
                        const uploadedFile = event.dataTransfer.files && event.dataTransfer.files[0];
                        setFile(uploadedFile)
                        // Checking file's extension and throwing error if incorrect
                        const extension = uploadedFile?.type.split("/")[1].toString();
                        if (!allowedFileTypes.includes(extension)) {
                            setMyError("Please input a csv file");
                            return;
                        }
                        setMyError("")
                        ClearContext();
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
                            //dynamicTyping: true, //numbers, boolean will not become strings
                            complete: function (csvData) {
                                setDataToStore('csv', csvData.data);
                                // Extracting headers from all objects in a List and
                                const headers = getHeaders(csvData.data);
                                setHeadersToStore('headers', headers);
                                setData(getStoredData('csv'));
                                setHeaders(getStoredHeaders('headers'));
                                setShowContent(false);
                                setShowButton(true);
                            }
                        });
                    })
                    setIsLoading(false);
                    setModalVisible(true);
                    setInfoModalVisible(true);
                    setInfoMessage("CSV file was uploaded successfully! Please, press 'Show file content' button!");
                    setIndicator(false);
                }}
            >
                {children}
            </div>
    );
};

export default MyDragDropArea;