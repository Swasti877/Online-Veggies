import React, { useState } from 'react';
import { useStateValue } from '../context/product/ProductState';
import { db, storage } from '../firebase';
import './AddProduct.css';
import Product from './Product';

export default function AddProduct() {
    const [itemDetials, setItemDetials] = useState({ title: '', price: ''});
    const[img, setImg] = useState();
    const [state, dispatch] = useStateValue();

    const onChange = (e) => {
        setItemDetials({ ...itemDetials, [e.target.name]: e.target.value })
    }

    //Add Product to database
    const handleAddProduct = async(e) => {
        e.preventDefault();
        //Upload image
        const uploadTask = storage.ref(`product-img/${img.name}`).put(img);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, error => {
            console.log(error.message);
        }, () => {
            storage.ref('product-img').child(img.name).getDownloadURL().then(url =>{
                //Upload in database
                db.collection('product').add({
                    product_title: itemDetials.title,
                    product_price: itemDetials.price,
                    product_img: url,
                    user_id: state.user.uid,
                }).then(()=>{
                    //resetting the values
                    setItemDetials({ title: '', price: ''});
                    setImg(null);
                })
            })
        }
        
        )
    }

    const handleSubmitImage = (e) =>{
        if (/(\.png|\.jpg|\.jpeg)$/i.exec(e.target.files[0].name) && state.user){
            setImg(e.target.files[0])
        }else {
            alert('Invalid Img Format');
        }
    }

    return (
        <div className="add__product">
            <div className="addProduct__container">
                <div className="addProduct__form">
                    <h1>Add a Product</h1>
                    <form>
                        <label htmlFor='title'>Title <strong>*</strong></label>
                        <input onChange={onChange} id='title' type='text' name='title' value={itemDetials.title} required />
                        <label htmlFor='price' >Price <strong>*</strong></label>
                        <input onChange={onChange} id='price' type='number' name='price' value={itemDetials.price} required />
                        <label htmlFor='img'>Upload a Image <strong>*</strong></label>
                        <input onChange={handleSubmitImage} id='img' type='file' name='img' accept='image/*' required />
                        <button type='submit' onClick={handleAddProduct}>Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    )
}