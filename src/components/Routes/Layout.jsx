import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AppContext } from '../../services/context/AppContext';
import { Navbar, SideBar } from '..';
import './style.css';

const Layout = () => {
    const { isLoggedIn, isAppReady } = useContext(AppContext);
    if (!isAppReady) {
        return null
    }

    return isLoggedIn ? (
        <div className='d-flex'>
            <SideBar />
            <div className="flex-1 bg-light">
                <Navbar />
                <div className='bg-light p-3'>
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        <Navigate to="/" />
    );
};

export default Layout;
