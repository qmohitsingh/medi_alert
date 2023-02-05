import { useState } from "react";

import { FaBeer } from 'react-icons/fa';
import {NavLink, useNavigate} from "react-router-dom";

export default function Navbar() {

    const [pageId, setPageId] = useState(1);

    const handleUpdateECsClick = () => {

    }

    const handleLogoutClick = async () => {

    }

    const handleHomeClick = () => {
        setPageId(1);
    }

    const handleReminderClick = () => {
        setPageId(2);
    }

    const handleLoginClick = () => {
        setPageId(3);
    }

    return (
        <div className='max-w-80 bg-blue-900'>
            <div className=" text-white p-2 flex align-items-center justify-center" onClick={handleHomeClick}>
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
                            <li className={`rounded-full text-white hover:text-purple-700` + (pageId == 1 ? ' text-purple-900 ' : "")} onClick={handleHomeClick}>
                                <div onClick={handleLogoutClick} className={`rounded-md text-white text-xl`}>
                                    <NavLink
                                        to="/home"
                                    >
                                        <div>Home</div>
                                    </NavLink>
                                </div>
                            </li>
                            <li className={`m-5 rounded-full text-white hover:text-purple-700 m-2` + (pageId == 2 ? ' text-purple-900 ' : "")} onClick={handleReminderClick}>
                                <div onClick={handleLogoutClick} className={`rounded-md text-white text-xl`}>
                                    <NavLink
                                        to="/medicationform"
                                    >
                                        <div>Medication</div>
                                    </NavLink>
                                </div>
                            </li>
                            <li className={`rounded-full text-white hover:bg-purple-700` + (1 == 1 ? '' : "")} onClick={handleUpdateECsClick}>
                                <div onClick={handleLogoutClick} className={`rounded-md text-white text-xl`}>
                                    <NavLink
                                        to="/login"
                                    >
                                        <div>login</div>
                                    </NavLink>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
