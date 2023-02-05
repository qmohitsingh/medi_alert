import { NavLink, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useState } from "react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const logout = async () => {
    };

    if (localStorage.getItem("email") === null && isLoggedIn) {
        setIsLoggedIn(false);
    } else if (localStorage.getItem("email") !== null && !isLoggedIn) {
        setIsLoggedIn(true);
    }

    return (
        <>
            <nav className="w-full flex px-8 shadow-lg">
                <div className="pt-3 pb-2 border-b-4 border-transparent hover:border-black">
                    <NavLink className="text-3xl font-semibold" to="/">
                        <div className="flex items-center gap-4">
                            <img src="/logo.png" alt="logo" className=" max-h-10" />
                            PREDICT
                        </div>
                    </NavLink>
                </div>
                <div className="ml-auto mr-0 flex space-x-8 text-lg">
                    <ul className="flex space-x-8 self-center">
                        <li>
                            <NavLink
                                className="py-4 px-2 hover:border-b-[3px] hover:border-b-black"
                                to="/predict"
                            >
                                PREDICT
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className="py-4 px-2 hover:border-b-[3px] hover:border-b-black"
                                to="/news-updates"
                            >
                                News & Updates
                            </NavLink>
                        </li>
                    </ul>
                    {isLoggedIn ? (
                        <div
                            className="py-4 px-2 flex self-center items-center space-x-1 hover:cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <BsPersonCircle size={25} strokeWidth="0.01" />
                            {isOpen ? (
                                <AiFillCaretUp size={15} />
                            ) : (
                                <AiFillCaretDown size={15} />
                            )}
                        </div>
                    ) : (
                        <div className="self-center hover:cursor-pointer">
                            <NavLink
                                className="py-4 px-2 hover:border-b-[3px] hover:border-b-black"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        </div>
                    )}
                    {isOpen ? (
                        <div className="absolute right-2 top-[4.5rem] shadow-md rounded-lg text-sm bg-white">
                            <ul className="space-y-1 py-2 w-36">
                                <li className="flex px-4 py-1 hover:bg-gray-100 hover:cursor-pointer">
                                    <NavLink
                                        className="w-full"
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Profile
                                    </NavLink>
                                </li>
                                {localStorage.isAdmin !== "false" ? <li className="flex px-4 py-1 hover:bg-gray-100 hover:cursor-pointer">
                                    <NavLink
                                        className="w-full"
                                        to="/admin"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin
                                    </NavLink>
                                </li> : ''}
                                <li>
                                    <div
                                        className="px-4 py-1 hover:bg-gray-100 hover:cursor-pointer"
                                        onClick={() => {
                                            logout();
                                            setIsOpen(!isOpen);
                                        }}
                                    >
                                        Logout
                                    </div>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </nav>
        </>
    );
}
