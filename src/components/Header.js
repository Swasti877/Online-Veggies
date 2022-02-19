import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    Link
} from "react-router-dom";
import { useStateValue } from '../context/product/ProductState';
import { auth } from '../firebase';

export default function Header() {
    const [state] = useStateValue();
    const handleAuthentication = () => {
        if (state.user) {
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to='/' className="header__title">
                Online Veggies
            </Link>

            <div className="header__nav-search-field">
                <input type='text' className='header__nav-search-field-input'></input>
                <SearchIcon className='header__nav-search-icon' />
            </div>

            <div className="header__right">
                <Link to={!state.user && '/login'}>
                    <div onClick={handleAuthentication} className="header__option">
                        <span className='header__first-line'>Hello, {state.user ? state.user.email : 'Guest'}</span>
                        <span className='header__second-line'>{state.user ? 'Sign Out' : 'Sign In'}</span>
                    </div>
                </Link>
                <div className="header__option">
                    <span className='header__first-line'>Returns</span>
                    <span className='header__second-line'>& Orders</span>
                </div>
            </div>
            <div className="header_shopping-cart">
                <Link to='/cart'><span className='header_shopping-cart-icon'><ShoppingCartIcon /></span></Link>
                <span className='header__second-line header__shopping-cart-no'>{state.basket?.length}</span>
            </div>
        </div>
    )
}