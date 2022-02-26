import React, {useEffect, useState} from 'react';
import Product from './Product';
import './Home.css'
import {db} from '../firebase'

export default function Home() {
    const [product, setProduct] = useState();
    
    useEffect(()=>{
        db.collection('product').onSnapshot(snapShot =>{
            setProduct(snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })))
        })
    }, [])
    
    return (
        <div className="home">
            <div className="home__container">
                <img className='home__img' src='https://m.media-amazon.com/images/I/61DUO0NqyyL._SX3000_.jpg' alt='img' />
            </div>
            <div className="home__row">
                <Product id={1234} title='Apple iPhone 13 (128GB) - Midnight' price={74900} rating={4} img='https://m.media-amazon.com/images/I/61VuVU94RnL._AC_UY218_.jpg' />
                <Product id={12345} title='Samsung Galaxy S21 FE 5G (Lavender, 8GB, 128GB Storage)' rating={4} price={54999} img='https://m.media-amazon.com/images/I/8131pwAojZL._AC_UY218_.jpg' />
            
                <Product id={23432} title='2021 Apple iMac with 4.5K Retina Display (24-inch/60.96 cm, Apple M1 chip with 8‑core CPU and 8‑core GPU, 8GB RAM, 512GB) - Silver' price={149990} rating={4} img='https://m.media-amazon.com/images/I/61LNnZPoKPS._AC_UY218_.jpg' />
                <Product id={2141} title='AmazonBasics Pinch Pleat Comforter Bedding Set, Full / Queen, Navy Blue' rating={5} price={2489} img='https://m.media-amazon.com/images/I/81xGpR6n5BL._AC_UL320_.jpg' />
                <Product id={325432} title='AmazonBasics 670 L French Door Frost Free Refrigerator (Silver, Triple cooling zone, Convertible)' rating={3} img='https://images-eu.ssl-images-amazon.com/images/I/21wfgAPOWKL._SX342_SY445_QL70_FMwebp_.jpg' price={71999} />
            
                <Product id={43643} title='LG Curved UltraWide 87 cm (34 Inches) QHD (3440 x 1440) IPS Display - HDR 10, sRGB 99%, 1.07 Billion Colors, USB C with 60W Power Delivery, Display Port, HDMI, 34WN80C' rating={5} price={55999} img='https://m.media-amazon.com/images/I/71Jg-6AQfaL._SL1500_.jpg' />
                {product && product.map(item => 
                <Product id={item.id} title={item.data.product_title} img={item.data.product_img} price={parseInt(item.data.product_price)} rating={4}/>)}
            </div>
        </div>
    )
}