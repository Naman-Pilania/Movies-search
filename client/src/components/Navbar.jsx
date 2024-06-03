import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import Gla from '../images/Gla.jpeg';
import { useAuth } from '../../store/auth';
import readme from '../images/readme.pdf';

function Navbar() {
    const { isLoggedIn, logoutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <>
            <header>
                <div className='container'>
                    <div className='logo'>
                        <img src={Gla} alt="ecf" width={150} height={80} />
                        <a href="/">FasCal's Movie Search</a>
                    </div>
                    <ul className='nav-items'>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {isLoggedIn ? (
                            <li>
                                <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <NavLink to="/register">Register</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                            </>
                        )}
                        <li>
                            <a href={readme} target="_blank" rel="noopener noreferrer">ReadMe</a>
                        </li>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default Navbar;
