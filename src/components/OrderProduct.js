import React from 'react';
import './OrderProduct.css';
import moment from 'moment';
import CheckoutProduct from './CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

export default function OrderProduct({ item }) {
    return (
        <div className="orderproduct">
            <h2>Order</h2>
            <p>{moment(item.data.created).format("MMMM Do, h:mma")}</p>
            <p className="orderproduct__id"><small>{item.id}</small></p>
            {item.data.basket?.map(e => (
                <CheckoutProduct
                    id={e.id}
                    title={e.title}
                    image={e.image}
                    price={e.price}
                    rating={e.rating}
                    hidebutton
                />
            ))}
            <div className="orderproduct__total">
                <CurrencyFormat
                    renderText={(value) => (
                        <>
                            <p>Order Total: <strong>{value}</strong></p>
                        </>
                    )}
                    decimalScale={2}
                    value={item.data.amount / 100}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₹"}
                />
            </div>
        </div>
    )
}