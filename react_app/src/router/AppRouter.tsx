import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../components/layouts/Layout";
import Login from "../pages/Login";
import Unauthorized from "../pages/Unauthorized";
import RegistrationPage from "../pages/RegistrationPage";
import UserPage from "../pages/UserPage";
import AdminPage from "../pages/AdminPage";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/signup" element={<RegistrationPage/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>}/>

                {/*    Protected routes */}
                {/* Registered User */}

                <Route path="/user" element={<UserPage/>}/>
                <Route path="/profile" element={<Profile/>}/>


                {/* Administrator */}
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/profile" element={<Profile/>}/>
                {/* catch all */}
                <Route path="/*" element={<NotFound/>}/>
            </Route>
        </Routes>

    );
};

export default AppRouter;

// https://dev.to/madv/usecontext-with-typescript-23ln