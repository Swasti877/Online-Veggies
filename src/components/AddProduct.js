import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '../context/product/ProductState';
import { db, storage } from '../firebase';
import './AddProduct.css';
import DisplayAddedProduct from './DisplayAddedProduct';
import LoadingBar from 'react-top-loading-bar';
import SellerEarning from './SellerEarning';

export default function AddProduct() {
    const [itemDetials, setItemDetials] = useState({ title: '', price: '' });
    const [img, setImg] = useState();
    const [progress, setProgress] = useState();
    const [state, dispatch] = useStateValue();
    const navigate = useNavigate();

    const onChange = (e) => {
        setItemDetials({ ...itemDetials, [e.target.name]: e.target.value })
    }

    //Add Product to database
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setProgress(20);
        //Upload image
        const uploadTask = storage.ref(`product-img/${img.name}`).put(img);
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress)
            console.log('Upload is ' + progress + '% done');
        }, error => {
            console.log(error.message);
        }, () => {
            storage.ref('product-img').child(img.name).getDownloadURL().then(url => {
                //Upload in database
                db.collection('product').add({
                    product_title: itemDetials.title,
                    product_price: itemDetials.price,
                    product_img: url,
                    user_id: state.user.uid,
                }).then((res) => {
                    db.collection('users').doc(state.user?.uid).collection('addedProducts').doc(res.id).set({
                        product_id: res.id,
                    }).then(() => {
                        //resetting the values
                        setItemDetials({ title: '', price: '' });
                        setImg(null);
                        navigate('/')
                    })

                })
            })
        },

        )
    }

    const handleSubmitImage = (e) => {
        if (/(\.png|\.jpg|\.jpeg)$/i.exec(e.target.files[0].name) && state.user) {
            setImg(e.target.files[0])
        } else {
            alert('Invalid Img Format');
        }
    }

    return (
        <>
            <LoadingBar color='red' progress={progress} onLoaderFinished={() => { setProgress(0) }} />
            <div className='sellerPage'>
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
                <div className='child'>
                    <DisplayAddedProduct />
                </div>
                <div className="seller__earning">
                    <SellerEarning />
                </div>
            </div>
        </>
    )
}