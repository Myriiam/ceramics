import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { MdPersonOutline } from "react-icons/md"
import { IoSearchSharp } from "react-icons/io5"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuShoppingBasket } from "react-icons/lu"
import { GiHamburgerMenu } from "react-icons/gi"
import SideMenu from "./SideMenu";
import '../sass/navbar.scss'
import { useClickAway } from "@uidotdev/usehooks";
import { useAuth } from '../context/authContext.jsx';
import { VscAccount } from "react-icons/vsc";
import { TbLogout } from "react-icons/tb";
import Basket from '../components/Basket.jsx';
import { ItemsContext } from '../context/itemsContext';
import SearchBar from './SearchBar.jsx';

function Navbar() {
    const { authState, logout } = useAuth();
    const { cartItems } = useContext(ItemsContext);
    const [isToggled, setToggled] = useState(false);
    const handleToggle = () => {
        setToggled(!isToggled);
    }

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const openSideMenu = () => {
        setIsSideMenuOpen(!isSideMenuOpen);
    }

    const [isBasketOpen, setBasketOpen] = useState(false);
    const handleBasketToggle = () => {
        setBasketOpen(!isBasketOpen);
    };

    const location = useLocation();
    // const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
    const isAuthPage = location.pathname !== '/' && location.pathname !== '/my-account';


    const [isScrolled, setScrolled] = useState(false);

    const ref = useClickAway(() => {
        setToggled(false);
    });

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        /* return () => {
            window.removeEventListener('scroll', handleScroll);
        };  */
    }, []);

    useEffect(() => {
        document.body.style.overflow = isBasketOpen || isToggled ? 'hidden' : 'auto';
    }, [isBasketOpen, isToggled]);

    let totalQuantity = 0;
    cartItems.forEach(item => {
        totalQuantity += item.quantity;
    });

    //console.log(authState.is_admin)

    return (
        <>
            <div className={`navbar ${isToggled || isAuthPage || isScrolled ? 'active' : ''}`}>
                <div className='hamburger-menu'>
                    <button className='hamburger-button' onClick={openSideMenu}><GiHamburgerMenu className='hamburger-btn' /></button>
                </div>
                <div className='title'>
                    <Link to="/">Ceramiks.</Link>
                </div>
                <div className='right-menu'>
             {/*        {console.log(authState.token)} */}
                    {authState.token ? (
                        <>
                            <Link to="/" className='account' onClick={logout}>
                                <TbLogout />
                            </Link>
                            {authState.is_admin === true ? (
                                <Link to="/admin" className='account'>
                                    <MdOutlineAdminPanelSettings />
                                </Link>
                            ) : (
                                <Link to="/my-account" className='account'>
                                    <VscAccount />
                                </Link>
                            )
                            }
                        </>
                    ) : (
                        <Link to="/login" className='account'>
                            <MdPersonOutline />
                        </Link>
                    )}
                    <Link to="#" className='search' onClick={handleToggle}>
                        <IoSearchSharp className='nav-icon' />
                    </Link>
                    <Link to="#" className='basket' onClick={handleBasketToggle}>
                        <LuShoppingBasket className='nav-icon basket-icon' />
                        {totalQuantity > 0 && <span className='basket-count'>{totalQuantity}</span>}
                    </Link>
                </div>
            </div>
            {isToggled ?
                <SearchBar ref={ref} handleToggle={handleToggle} />
                : ''}
            <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
            {isBasketOpen ?
                <div className='overlay'>
                    <Basket isBasketOpen={isBasketOpen} setIsBasketOpen={setBasketOpen} onClick={handleBasketToggle} />
                </div>
                : ''}
        </>
    )
}

export default Navbar;