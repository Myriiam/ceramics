import { useState } from "react"
import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io";
import '../sass/side-menu.scss'
import { useClickAway } from "@uidotdev/usehooks";
import { useAuth } from '../context/authContext.jsx';

const SideMenu = ({ isOpen, setIsOpen }) => {
    const { authState, logout } = useAuth();
    const [isOpenBtn, setIsOpenBtn] = useState(false)

    const ref = useClickAway(() => {
        setIsOpen(false);
      });

    const toggleSideMenu = () => {
        setIsOpen(!isOpen)
    }

    const toggleMoreBtn = () => {
        setIsOpenBtn(!isOpenBtn)
    }

    return (
        <>
            {/* {isOpen ? */}
            <div ref={ref} className={`container-side-menu ${isOpen ? 'open' : 'closed'}`}>
                <div className="header-side-menu">
                    <span onClick={toggleSideMenu} >{isOpen ? <IoMdClose className="closeBtn" /> : ''}</span>
                </div>
                <nav id="nav-side-menu">
                    <ul className="menu-list">
                        <li><Link to='/' className='links'>Home</Link></li>
                        <li><Link to='#' className='links'>New collection</Link></li>
                        <div className="container-products-more">
                            <li>Products
                            </li>
                            <button
                                onClick={toggleMoreBtn}
                                className={`more-btn ${isOpenBtn ? 'rotate open' : 'rotate'}`}
                            >
                                {isOpenBtn ? '-' : '+'}
                            </button>
                        </div>
                        {isOpenBtn && <ul className="all-products">
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#' className='links'>All products</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#' className='links'>Plates</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#' className='links'>Bowls</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#' className='links'>Candles-Candlesticks</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#' className='links'>Mugs and cups</Link></li>
                            <li className={`product-item ${isOpenBtn ? 'show' : ''}`}><Link to='#' className='links'>Vases</Link></li>
                        </ul>
                        }
                        {!authState.token ?
                            <>
                                <li><Link to='/login' className='links'>Account</Link></li>
                            </>
                            : <li><Link to='/' className='links' onClick={logout}>LOGOUT</Link></li> 
                        }
                    </ul>
                </nav>
            </div>
            {/* : ''} */}
        </>
    )
}

export default SideMenu;