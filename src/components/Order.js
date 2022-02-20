import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/product/ProductState';
import './Order.css';
import { db } from '../firebase.js'
import OrderProduct from './OrderProduct.js'

export default function Order() {
    const [order, setOrder] = useState([]);
    const [state, dispatch] = useStateValue();

    useEffect(() => {
        if (state.user) {
            db.collection('users').doc(state.user?.uid).collection('orders').orderBy('created', 'desc').onSnapshot(snapShot => {
                setOrder(snapShot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data(),
                })))
            })
        } else {
            setOrder([])
        }
    }, [state.user])
    console.log("Order >>>", order.data)
    return (
        <div className="order">
            <h1>Your Orders</h1>
            <div className="order__detials">
                {order.map(item => (
                    <OrderProduct item={item} />
                ))}
            </div>
        </div>
    )
}