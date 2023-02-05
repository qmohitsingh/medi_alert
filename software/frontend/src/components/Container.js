import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Container = () => {
    return (
        <div className="w-full flex items-center overflow-hidden">
            <Navbar className="h-screen sticky top-0 w-60" />
            <main className="min-h-screen ml-5">
                <Outlet />
            </main>
        </div>
    );
}


export default Container;