import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/product/ProductState';
import { db } from '../firebase';
import './DisplayAddedProduct.css';
import CheckoutProduct from './CheckoutProduct';

export default function DisplayAddedProduct() {
    const [addedProduct, setAddedProduct] = useState([]);
    const [state] = useStateValue();

    useEffect(() => {
        db.collection('users').doc(state.user?.uid).collection('addedProducts').onSnapshot(snapshot =>{
            snapshot.docs.map(doc => {
                db.collection('product').doc(doc.id).onSnapshot(snapshot => {
                     setAddedProduct(addedProduct => [...addedProduct, {
                                id: snapshot.id,
                                data: snapshot.data(),
                            }])
                })
            })
        })
    }, [])

    return (
        <div className="displayAddedProduct">
            <h3>Your Added Products</h3>
            {addedProduct.map(item => 
                <CheckoutProduct id={item.id} image={item.data.product_img} price={item.data.product_price} title={item.data.product_title} hidebutton hidestar/>
            )}
        </div>
    )
}