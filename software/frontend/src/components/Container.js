import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Container = () => {
    return (
        <div className="relative">
            <Navbar />
            <main className="min-h-screen">
                <Outlet />
            </main>
        </div>
    );
}


export default Container;