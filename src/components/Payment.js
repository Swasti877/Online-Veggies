import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/product/ProductState';
import './Payment.css';
import CheckoutProduct from './CheckoutProduct';
import { totalCartValue } from '../reducer/reducer';
import { Link, useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';
import { db } from '../firebase.js';

export default function Payment() {
    const host = 'http://localhost:5001/online-veggies-2bac6/us-central1/api'

    const [state, dispatch] = useStateValue();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [processing, setProcessing] = useState('');
    const [succeeded, setSucceeded] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const handleChange = e => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymnetIntent = payment Confirmation
            db.collection('users').doc(state.user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: state.basket,
                created: paymentIntent.created,
                amount: paymentIntent.amount
            })

            setSucceeded(true)
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET',
            })

            navigate('/orders', { replace: true })
        })
    }

    useEffect(() => {
        const getClientSecret = async () => {
            const respone = await axios({
                method: 'post',
                url: `${host}/payment/create?total=${totalCartValue(state.basket) * 100}`
            })
            setClientSecret(respone.data.clientSecret)
        }
        getClientSecret();
    }, [state.basket])
    return (
        <div className="payment">
            <h1><Link to='/cart'>Checkout ({state.basket?.length} items)</Link></h1>
            <div className="payment__container">
                {/* payment-section address */}
                <div className="paymnent__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment__address">
                        <p>{state.user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angles, CA.</p>
                    </div>
                </div>

                {/* payment-section Checkout-items */}
                <div className="paymnent__section">
                    <div className="payment__title">
                        <h3>Review Items and Delivery</h3>
                    </div>
                    <div className="payment__items">
                        {state.basket.map(items => (
                            <CheckoutProduct
                                id={items.id}
                                image={items.image}
                                rating={items.rating}
                                title={items.title}
                                price={items.price} />
                        ))}
                    </div>
                </div>
                {/* payment-section payment */}
                <div className="paymnent__section">
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment__TotalPrice">
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total: {value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={totalCartValue(state.basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"₹"}
                                />
                                <button disabled={processing || succeeded || disabled}>{processing ? <p>Processing</p> : 'Buy Now'}</button>

                                {/* errors */}
                                {error && <div>error</div>}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}