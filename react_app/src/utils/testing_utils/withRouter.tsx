/*   FUNCTION FOR ROUTER TESTING    */
import {MemoryRouter} from "react-router-dom";
import {ReactElement} from "react";

export const withRouter = (
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

// https://testing-library.com/docs/example-react-router/