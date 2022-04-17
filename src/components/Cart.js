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
                <img src="https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2Fbanner-lising.jpg?alt=media&token=507e1dc2-30f3-4415-a8de-d922fc25494d" alt="ad" className="cart__ad" />

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