import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import './App.css';

function App() {

    return (
        <div>
            <Navbar/>
            <AppRouter />
            <br/>
            <Footer />
        </div>
    )
}

export default App;
