import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.js";
const SharedLayout = () => {
    return (
        <>
            <Navbar />
            <div className="content">
                <Outlet />
            </div>
        </>
    );
};

export default SharedLayout;