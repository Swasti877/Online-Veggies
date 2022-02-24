import React from 'react';
import AddProduct from './AddProduct';
import './HeaderOptional.css';

export default function HeaderOptional() {
    return (
        <div className="headeroptional">
            <div className="headeroptional__options">
                <p>Inventory</p>
                <p>Add a Product</p>
            </div>

            <AddProduct />
        </div>
    )
}