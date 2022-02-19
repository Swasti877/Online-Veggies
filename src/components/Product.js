import React from 'react';
import { useStateValue } from '../context/product/ProductState';
import './Product.css';

export default function Product(props) {
    const [state, dispatch] = useStateValue();
    const addToBasket = () => {
        dispatch({
            type: 'ADD_TO_BASKET',
            item: {
                id: props.id,
                title: props.title,
                price: props.price,
                rating: props.rating,
                image: props.img
            }
        })
    }
    return (
        <div className="product">
            <div className="product__info">
                <p className="product__title">{props.title}</p>
                <p><small>₹</small><strong>{props.price}</strong></p>
                <div className="product__rating">
                    {Array(props.rating).fill().map((_, i) => {
                        return <p>⭐</p>
                    })}
                </div>
            </div>
            <img src={props.img} alt='product_img' />
            <button type='button' onClick={addToBasket}>Add to Basket</button>
        </div>
    )
}