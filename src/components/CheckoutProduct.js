import React, { useState } from 'react';
import { useStateValue } from '../context/product/ProductState';
import './CheckoutProduct.css';

export default function CheckoutProduct(props) {
    const [state, dispatch] = useStateValue();

    const removeBasketItem = () => {
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: props.id
        })
    }

    return (
        <div className="checkout__product">
            <img className='checkout__productImage' src={props.image} alt='product_img' />
            <div className="checkout__productInfo">
                <p className='checkout_productTitle'>{props.title}</p>
                <p><small>₹</small>{props.price}</p>
                <div className="checkout__productRating">
                    {!props.hidestar && Array(props.rating).fill().map((_, i) => {
                        return <p>⭐</p>
                    })}
                </div>
                {!props.hidebutton && <button onClick={removeBasketItem}>Remove from Basket</button>}
                {props.showDelete && <span onClick={()=>{props.handleDelete(props.id)}} className="material-icons iconDelete">delete</span>}
                {props.showEdit && <span onClick={()=>{props.handleEdit(props.id)}} className="material-icons iconEdit">edit</span>}
            </div>
        </div>
    )
}