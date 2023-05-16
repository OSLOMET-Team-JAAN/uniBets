import React, {useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HamburgerBar from "./components/layouts/HamburgerBar";
import AppRouter from "./router/AppRouter";
import Footer from "./components/layouts/Footer";
import './App.css';
import eventBus from "./common/EventBus";
import Navbar from "./components/layouts/Navbar";


function App() {
    const [screenSize, setScreenSize] = useState(window.innerWidth);
       
     useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        eventBus.win.on('resize', handleResize);
        return () => {
            eventBus.win.off('resize', handleResize)
        };
    }, []);

    return (
        <div>
            {screenSize > 768 
                ? <Navbar />
                : <HamburgerBar /> 
            }
            <br />
            <AppRouter/>
            <Footer/>
        </div>
    )
}

export default App;
