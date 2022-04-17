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
        return () => {setProduct()}
    }, [])
    
    return (
        <div className="home">
            <div className="home__container">
                <img className='home__img' src="https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2Fbanner-lising.jpg?alt=media&token=507e1dc2-30f3-4415-a8de-d922fc25494d" alt='img' />
            </div>
            <div className="home__row">
                <Product key={1234} id={1234} title='Fresho Potato, 1 kg' price={25} rating={4} img='https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2Fpotato_testing_image.webp?alt=media&token=9329d9f6-5949-43ce-ae16-c871ed06d239' />
                <Product key={12345} id={12345} title='BROCCOLI (350G-400G)' rating={4} price={180} img='https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2FBROCCOLI_testing_image.jpg?alt=media&token=21b85291-42e1-44d1-9ffc-337884ab5c02' />
            
                <Product key={23432} id={23432} title='Tomato Desi Local 1 kg' price={33} rating={4} img='https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2Ftomato_testing_image.webp?alt=media&token=2f203218-280d-4aae-975a-fbef2bbb336d' />
                <Product key={2141} id={2141} title='Fresho Kiwi - Green, Small, 3 pcs 60 to 89 g, per piece' rating={5} price={97.92} img='https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2F40114877_1-fresho-kiwi-green-small_testing_image.webp?alt=media&token=82757aad-be4f-4108-8478-1367d20c9ece' />
                <Product key={325432} id={325432} title='Fresho Apple - Shimla, 4 pcs (Approx. 500g- 650g)' rating={3} img='https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2F40033819_27-fresho-apple-shimla.webp?alt=media&token=026cf15c-104b-4cad-beb7-d8fdee3b0d90' price={139} />
            
                <Product key={43643} id={43643} title='Fresho Blueberry, 125 g' rating={5} price={353.13} img='https://firebasestorage.googleapis.com/v0/b/online-veggies-2bac6.appspot.com/o/resources%2F30009286_7-fresho-blueberry.webp?alt=media&token=44ad30c3-0265-4925-932a-4fd083b24c98' />
                {product && product.map(item => 
                <Product key={item.id} id={item.id} title={item.data.product_title} img={item.data.product_img} price={parseInt(item.data.product_price)} rating={4}/>)}
            </div>
        </div>
    )
}