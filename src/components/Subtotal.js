import React from 'react';
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../context/product/ProductState';
import { totalCartValue } from '../reducer/reducer';

export default function Subtotal() {
    const [state] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Subtotal ({state.basket.length} items): <strong>{value}</strong></p>
                        <small className="subtotal__gift">
                            <input type="checkbox" id='subtotal__gift' name='subtotal__gift' />
                            <label htmlFor='subtotal__gift'>This order contain gift</label>
                        </small>
                    </>
                )}
                decimalScale={2}
                value={totalCartValue(state.basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₹"}
            />
            <button>Proceed to Buy</button>
        </div>
    )
}