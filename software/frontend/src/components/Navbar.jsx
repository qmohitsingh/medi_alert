import { useState } from "react";

import { FaBeer } from 'react-icons/fa';
import {NavLink, useNavigate} from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const logout = async () => {
    };

    if (localStorage.getItem("email") === null && isLoggedIn) {
        setIsLoggedIn(false);
    } else if (localStorage.getItem("email") !== null && !isLoggedIn) {
        setIsLoggedIn(true);
    }

    const handleUpdateECsClick = () => {

    }

    const handleLogoutClick = async () => {

    }

    const handleLogoClick = () => {
        console.log("hads")
        navigate("/login");
    }

    return (
        <div className='w-1/6 bg-blue-900'>
            <div className=" text-white p-2 flex align-items-center justify-center" onClick={handleLogoClick}>
                {/*<img src="../logo.png" alt="logo" className=" max-h-12" onClick={handleLogoClick}/>*/}
                <div className='flex-col'>
                    <h1>MEDIalert</h1>
                </div>
            </div>
            <hr className="border-2 border-gray-300 my-8" />
            <div className="flex flex-col h-screen pl-2 shadow w-40`">
                <div className="space-y-3 co p-2 flex justify-center">
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className={`rounded-full text-white hover:bg-purple-700` + (1 == 1 ? '' : "")} onClick={handleUpdateECsClick}>
                                <a
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    {/*<svg*/}
                                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*    fill="none"*/}
                                    {/*    viewBox="0 0 24 24"*/}
                                    {/*    strokeWidth="1.5"*/}
                                    {/*    stroke="currentColor"*/}
                                    {/*    className="w-6 h-6">*/}
                                    {/*    <path*/}
                                    {/*        strokeLinecap="round"*/}
                                    {/*        strokeLinejoin="round"*/}
                                    {/*        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />*/}
                                    {/*</svg>*/}
                                    {/* Elastic Constants */}
                                    <div onClick={handleLogoutClick} className={`rounded-md text-white text-xl`}>
                                        <NavLink
                                            to="/home"
                                        >
                                            <div>Home</div>
                                        </NavLink>
                                    </div>
                                </a>
                            </li>
                            <li className={`rounded-full text-white hover:bg-purple-700` + (1 == 1 ? '' : "")} onClick={handleUpdateECsClick}>
                                <a
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    {/*<svg*/}
                                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*    fill="none"*/}
                                    {/*    viewBox="0 0 24 24"*/}
                                    {/*    strokeWidth="1.5"*/}
                                    {/*    stroke="currentColor"*/}
                                    {/*    className="w-6 h-6">*/}
                                    {/*    <path*/}
                                    {/*        strokeLinecap="round"*/}
                                    {/*        strokeLinejoin="round"*/}
                                    {/*        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />*/}
                                    {/*</svg>*/}
                                    {/* Elastic Constants */}
                                    <div onClick={handleLogoutClick} className={`rounded-md text-white text-xl`}>
                                        <NavLink
                                            to="/reminder"
                                        >
                                            <div>Reminder</div>
                                        </NavLink>
                                    </div>
                                </a>
                            </li>
                            <li className={`rounded-full text-white hover:bg-purple-700` + (1 == 1 ? '' : "")} onClick={handleUpdateECsClick}>
                                <a
                                    className="flex items-center p-2 space-x-3 rounded-md"
                                >
                                    {/*<svg*/}
                                    {/*    xmlns="http://www.w3.org/2000/svg"*/}
                                    {/*    fill="none"*/}
                                    {/*    viewBox="0 0 24 24"*/}
                                    {/*    strokeWidth="1.5"*/}
                                    {/*    stroke="currentColor"*/}
                                    {/*    className="w-6 h-6">*/}
                                    {/*    <path*/}
                                    {/*        strokeLinecap="round"*/}
                                    {/*        strokeLinejoin="round"*/}
                                    {/*        d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />*/}
                                    {/*</svg>*/}
                                    {/* Elastic Constants */}
                                    <div onClick={handleLogoutClick} className={`rounded-md text-white text-xl`}>
                                        <NavLink
                                            to="/login"
                                        >
                                            <div>login</div>
                                        </NavLink>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
