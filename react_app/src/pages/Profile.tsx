/*
import React from "react";
import {getCurrentUser} from "../services/auth.service";
import { Link } from "react-router-dom";
import * as st from '../styles/tailwind/ProfileUser.style';
/* import st from '../styles/Profile.module.css'; */
/*} 

const Profile: React.FC = () => {
    const currentUser = getCurrentUser();
    return (
        <div className={st.Profile.box}>

            <header>

                <h1> Welcome <strong>{currentUser.username}</strong></h1>

                <img className={st.Profile.imag} alt="avatar" src={require('../../src/styles/images/user.jpg')} />

            </header>
            <p>
                <strong>Token:&nbsp;</strong> {JSON.stringify(currentUser.token).substring(16, 50)} ...
            </p>
            <p>
                <strong>Email:&nbsp;</strong> {currentUser.email}
            </p>
            <strong>Authorities: &nbsp;</strong>{currentUser.role}
            <div className="flexGrow">
                <Link to="/home">Back to Home Page</Link>
            </div>
        </div>

    );
}; 

export default Profile; 

 */
import React from "react";
import { getCurrentUser } from "../services/auth.service";
import { Link } from "react-router-dom";
import * as st from '../styles/tailwind/ProfileUser.style';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button 
} from "@material-tailwind/react";

const Profile: React.FC = () => {
    const currentUser = getCurrentUser();

    return (
        < >
            <Card className="container shadow-lg p-32" >
                <CardHeader floated={false} className="flex justify-center" color="transparent" >
                <img
                        src="../user.jpg"
                        alt="avatar"
                        className={st.Profile.imag}
                />
           
                </CardHeader>

            <CardBody>
                <div className="mb-3 flexjustif y-between ">
                    <Typography variant="h3" color="blue-gray"  >
                        Welcome <strong >{currentUser.username}</strong>
                    </Typography>
                   
                </div>
                <Typography color="gray">
                    <p>
                        <strong>Token:&nbsp;</strong> {JSON.stringify(currentUser.token).substring(16, 50)} ...
                    </p>
                    <p>
                        <strong>Email:&nbsp;</strong> {currentUser.email}
                    </p>
                    <strong>Authorities: &nbsp;</strong>{currentUser.role}
                </Typography>
                </CardBody>

                <CardFooter className="pt-3">
                    <Button className="hover:scale-125" >
                    <Link to="/home" className="text-white">Back to Home Page</Link>
                </Button>
            </CardFooter>
             </Card>
        </>
   );
 }

export default Profile;