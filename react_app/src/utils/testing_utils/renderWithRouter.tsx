/*   FUNCTION FOR ROUTER TESTING    */
import {MemoryRouter} from "react-router-dom";
import {ReactElement} from "react";

export const renderWithRouter = (
    component: ReactElement<any, any> | null, 
    initialRoute="/"
    
) => {
    return (
        <MemoryRouter 
            initialEntries={[initialRoute]}>
            {component}
        </MemoryRouter>
    )
}