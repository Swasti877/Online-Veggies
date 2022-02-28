import React from 'react';
import './SellerEarning.css';
import CurrencyFormat from 'react-currency-format';

export default function SellerEarning(){
    return(
        <div className="seller__earning">
            <h3>Your Earning</h3>
            <div className="seller__info">
            <CurrencyFormat
                    renderText={(value) => (
                        <>
                            <strong>{value}</strong>
                        </>
                    )}
                    decimalScale={2}
                    value={10000}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                />
            </div>
        </div>
    )
}