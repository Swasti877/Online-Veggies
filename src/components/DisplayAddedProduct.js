import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/product/ProductState';
import { db } from '../firebase';
import './DisplayAddedProduct.css';
import CheckoutProduct from './CheckoutProduct';

export default function DisplayAddedProduct() {
    const [addedProduct, setAddedProduct] = useState([]);
    const [editProduct, setEditProduct]= useState();
    const [state] = useStateValue();

    const fetchData = () => {
        db.collection('users').doc(state.user?.uid).collection('addedProducts').get().then((snapshot => {
            snapshot.docs.map(doc => {
                db.collection('product').doc(doc.id).onSnapshot(snapshot => {
                    setAddedProduct(addedProduct => [...addedProduct, {
                        id: snapshot.id,
                        data: snapshot.data(),
                    }])
                })
            })
        }))
    }

    useEffect(() => {
        fetchData();
    }, [])

    const handleEdit = (product_id) => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        })
        //search for that product in addedProduct Array
        const product = addedProduct.find((element)=>{
            return product_id == element.id
        })
        setEditProduct({
            product_id: product.id,
            product_title: product.data.product_title,
            product_price: product.data.product_price,
        });
        document.getElementById('modalEdit').style.display = 'block';

    }

    const handleDelete = (product_id) => {
        const id = product_id;
        //Check if user is logged in
        state.user && db.collection('users').doc(state.user.uid).collection('addedProducts').doc(id).delete().then(() => {
            db.collection('product').doc(id).delete().then(() => {
                console.log('Deleted your extra bucks')
            })
        })

        //If user is logged out
        !state.user && console.log("Logged out user")

        // FrontEnd login for delete Product
        const newList = addedProduct.filter((element) => {
            return element.id !== id;
        })
        setAddedProduct(newList);
    }

    //user click outside the modal close the modal
    window.onclick = (e) => {
        if (e.target == document.getElementById('modalEdit')) {
            document.getElementById('modalEdit').style.display = 'none';
        }
    }

    const handleModalClose = (e) => {
        e.preventDefault();
        document.getElementById('modalEdit').style.display = 'none';
    }

    const handleModalSave = (e) => {
        e.preventDefault();
        //Front End update logic
        for(let i=0; i<addedProduct.length; i++) {
            if(addedProduct[i].id == editProduct.product_id){
                addedProduct[i].data.product_title = editProduct.product_title;
                addedProduct[i].data.product_price = editProduct.product_price;
            }
        }
        //firebase update
        db.collection('product').doc(editProduct.product_id).update({
            product_price: editProduct.product_price,
            product_title: editProduct.product_title,
        }).then(()=>{"Update data Successfully"}).catch(err => {console.log(err)})
        document.getElementById('modalEdit').style.display = 'none';
    }

    const onChange = (e) => {
        setEditProduct({...editProduct, [e.target.name]: e.target.value});
    }

    return (
        <>
            <div className="modalEdit" id='modalEdit'>
                <div className="modal__container">
                    <h3>Edit Product</h3>
                    <form>
                        <label htmlFor='modal_title'>Title</label>
                        <input type='text' name='product_title' id='modal_title' onChange={onChange} value={editProduct?.product_title}/>
                        <label htmlFor='modal_price'>Price</label>
                        <input type='number' name='product_price' id='modal_price' onChange={onChange} value={editProduct?.product_price}/>
                    </form>
                    <button onClick={handleModalClose}>Close</button>
                    <button onClick={handleModalSave}>Save</button>
                </div>
            </div>
            <div className="displayAddedProduct">
                <h3>Your Added Products</h3>
                {addedProduct && addedProduct.map(item =>
                    <CheckoutProduct handleEdit={handleEdit} handleDelete={handleDelete} key={item.id} id={item.id} image={item.data?.product_img} price={item.data?.product_price} title={item.data?.product_title} hidebutton hidestar showEdit showDelete />
                )}
            </div>
        </>
    )
}