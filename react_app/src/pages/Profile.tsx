import React, {FC} from "react";
import {getCurrentUser} from "../services/auth.service";
import {Link} from "react-router-dom";
import * as st from '../styles/tailwind/ProfileUser.style';
import {Card, CardBody, CardFooter, CardHeader, Typography} from "@material-tailwind/react";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../errors/ErrorBoundary";
import MyFormButton from "../components/UI/buttons/MyFormButton";

const Profile: FC = () => {
    const currentUser = getCurrentUser();

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
                <Card className={st.Profile.card}>
                    <CardHeader floated={false} className={st.Profile.header}>
                        <img
                            src="../user.jpg"
                            alt="avatar"
                            className={st.Profile.imag}
                        />
    
                    </CardHeader>    
                    <CardBody>
                        <div className="mb-3">
                            <Typography variant="h3" color="blue-gray">
                                Welcome <strong>{currentUser.username}</strong>
                            </Typography>
    
                        </div>
                        <div color="gray">
                            <p>
                                <strong>Token:&nbsp;</strong> {JSON.stringify(currentUser.token).substring(16, 50)} ...
                            </p>
                            <p>
                                <strong>Email:&nbsp;</strong> {currentUser.email}
                            </p>
                            <strong>Authorities: &nbsp;</strong>{currentUser.role}
                        </div>
                    </CardBody>
    
                    <CardFooter className="pt-3">
                        <MyFormButton>
                            <Link to="/home" className="text-white">Back to Home Page</Link>
                        </MyFormButton>
                    </CardFooter>
                </Card>
            </ErrorBoundary>
        </>
    );
}

export default Profile;

