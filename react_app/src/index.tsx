import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";
import {DataProvider} from "./context/CSVdataProvider";
import {CSVHeadersProvider} from "./context/CSVHeadersProvider";
import {ErrorBoundary} from "./errors/ErrorBoundary";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <DataProvider>
                    <CSVHeadersProvider>
                        <Routes>
                            <Route path="/*" element={<App/>}/>
                        </Routes>
                    </CSVHeadersProvider>
                </DataProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
