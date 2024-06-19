import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { IoLogInOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useState } from "react";

const DashLayout = () => {
    const adminLinks = <>
        <li><Link to='/dashboard/profile'>My Profile</Link></li>
        <li><Link to='/dashboard/all-users'>All Users</Link></li>
        <li><Link to='/dashboard/add-test'>Add a Test</Link></li>
        <li><Link to='/dashboard/all-test-list'>All Tests</Link></li>
        <li><Link to='/dashboard/add-banner'>Add Banner</Link></li>
        <li><Link to='/dashboard/banners'>All Banners</Link></li>
        <li><Link to='/dashboard/statistics'>Statistics</Link></li>
    </>

    const userLinks = <>
        <li><Link to='/dashboard/profile'>My Profile</Link></li>
        <li><Link to='/dashboard/appointment'>My Cart</Link></li>
        <li><Link to='/dashboard/test-result'>Purchase History</Link></li>
    </>

    const commonLinks = <>
        <li><Link to='/'>Home Page</Link></li>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/all-products'>All Products</Link></li>        
        <li><Link to='/blog'>Blogs</Link></li>
    </>

    const { logOut } = useAuth();
    const [show, setShow] = useState(false);
    const isAdmin = false;

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Logged Out")
            })
    }

    const handleCollaspe = () => {
        setShow(!show)
    }
    return (
        <div className="flex flex-row gap-5 relative">
            <div className="fixed md:hidden text-2xl pl-4 pt-5" onClick={handleCollaspe}>
                {
                    show ? <IoIosCloseCircleOutline /> :
                        <IoMdMenu />
                }

            </div>
            <div className={show ?
                'min-w-44 fixed md:hidden translate-y-12 bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4 transition-all duration-200 z-10'
                : 'fixed translate-y-12 md:hidden bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4 -translate-x-72 transition-all duration-200'}>
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                        <hr />
                        {
                            isAdmin ? <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                {adminLinks}
                            </ul> :
                                <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                    {userLinks}
                                </ul>
                        }
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu mt-4">
                            {commonLinks}
                        </ul>
                    </div>
                    <div>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><button className="flex flex-row items-center justify-center gap-2"
                                onClick={handleLogOut}>LogOut <IoLogInOutline className="text-xl" /></button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="min-w-56 hidden md:flex min-h-screen bg-[#47CCC8] text-[#2D3663] pt-4 pb-6 px-4">
                <div className="flex flex-col justify-between h-full w-full">
                    <div>
                        <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                        <hr />
                        {
                            isAdmin ? <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                {adminLinks}
                            </ul> :
                                <ul className="font-semibold space-y-2 font-ubuntu my-4">
                                    {userLinks}
                                </ul>
                        }
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu mt-4">
                            {commonLinks}
                        </ul>
                    </div>
                    <div>
                        <hr />
                        <ul className="font-semibold space-y-2 font-ubuntu my-4">
                            <li><button className="flex flex-row items-center justify-center gap-2"
                                onClick={handleLogOut}>LogOut <IoLogInOutline className="text-xl" /></button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashLayout;