import React from 'react';
import { useStateValue } from '../context/product/ProductState';
import './Cart.css';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

export default function Cart() {
    const [{ basket, user }] = useStateValue();
    return (
        <div className="cart">
            <div className="cart__left">
                <img src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/AmazonPay/PrimeRewards/LP_Revamp/PC_Header_Banner._CB468631809_.jpg" alt="ad" className="cart__ad" />

                <div>
                    <h3>Hello, {user?.email}</h3>
                    <h2 className="cart__title">Your Shopping Basket</h2>
                    {basket.map(item => (
                        <CheckoutProduct id={item.id}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            title={item.title} />
                    ))}
                </div>
            </div>
            <div className="cart__right">
                <Subtotal />
            </div>
        </div>
    )
}