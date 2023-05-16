import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthProvider";
import {DataProvider} from "./context/DataProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        {/*<AuthProvider>*/}
            <DataProvider>
                <Routes>
                    <Route 
                        path="/*" 
                        element={<App/>}
                    />
                </Routes>
            </DataProvider>
        {/*</AuthProvider>*/}
    </BrowserRouter>
);
