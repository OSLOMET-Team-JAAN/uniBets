import React from 'react';
import {Route, Routes} from "react-router-dom";
import Layout from "../components/layouts/Layout";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import RegistrationPage from "../pages/RegistrationPage";
import Unauthorized from "../pages/Unauthorized";
import UserPage from "../pages/UserPage";
import Profile from "../pages/Profile";
import AdminPage from "../pages/AdminPage";
import Dashboard from "../pages/Dashboard";
import AuthIsRequire from "../services/AuthIsRequire";
import Contact from "../pages/Contact";
import Faq from "../pages/Faq";

const ROLES = {
    'User': 'USER',
    'Admin': 'ADMIN'
}

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/* public routes */}
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/register" element={<RegistrationPage/>}/>
                <Route path="/unauthorized" element={<Unauthorized/>}/>

                {/*    Protected routes */}
                {/* Registered User */}

                <Route element={<AuthIsRequire allowedRoles={[ROLES.User, ROLES.Admin]}/>}>
                    <Route path="/user" element={<UserPage/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>


                {/* Administrator */}
                <Route element={<AuthIsRequire allowedRoles={[ROLES.Admin]}/>}>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path="/user" element={<UserPage/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Route>

                {/* catch all routes */}
                <Route path="/*" element={<NotFound/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;

// https://dev.to/madv/usecontext-with-typescript-23ln
