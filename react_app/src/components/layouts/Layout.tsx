import {Outlet} from "react-router-dom"
import {FC} from "react";

//This component can be used as a wrapper or parent component for other components 
// that define specific routes in your application. 
// The child routes will be rendered within the Layout component, providing a consistent 
// layout structure across different routes.
const Layout: FC = () => {
    return (
        <main className="App">
            <Outlet/>
        </main>
    )
}

export default Layout;