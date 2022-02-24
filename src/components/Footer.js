import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className="footer">
            {/* back-to-top */}
            <div className="footer__backToTopButton">
                Back to top
            </div>
            {/* info */}
            <div className="footer__info">
                <div className="footer__col">
                    <div className="footer_colTitle">
                        Get to Know Us
                    </div>
                    <p>About Online Veggies</p>
                </div>
                <div className="footer__col">
                    <div className="footer_colTitle">
                        Make Money with Us
                    </div>
                    <p><Link to='/sellerpage'>Sell products on Online Veggies</Link></p>
                    <p>Sell on Online Veggies Auction</p>
                </div>
                <div className="footer__col">
                    <div className="footer_colTitle">
                        Let Us Help You
                    </div>
                    <p>Your Orders</p>
                    <p>Report</p>
                </div>
            </div>
            {/* copyright */}
            <div className="footer__copyright">
                © 1996-2022, Online Veggies.com, Inc.
            </div>
        </div>
    )
}