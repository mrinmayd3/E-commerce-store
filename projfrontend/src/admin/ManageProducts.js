import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getAllProducts, deleteProduct } from './helper/adminapicall';


const ManageProducts = () => {

    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        getAllProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    const deleteThisProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
        <Base title='Products management section :)' description='You can manage all your products here'>
            <h3>All products</h3>
            <Link className='btn btn-info' to='/admin/dashboard'>Admin dashboard</Link>
            <div className='row'>
                <div className='col-12'>
                    <h4 className='text-center my-3'>Total products</h4>
                    {products.map((product, index) => {
                        return (
                            <div key={index} className='row mb-2 text-center'>
                                <div className='col-4'>
                                    <h5 className='text-left'>{product.name}</h5>
                                </div>
                                <div className='col-4'>
                                    <Link className='btn btn-success' to={`/admin/product/update/${product._id}`}>Update</Link>
                                </div>
                                <div className='col-4'>
                                    <button onClick={() => {
                                        deleteThisProduct(product._id)
                                    }} className='btn btn-danger'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}

export default ManageProducts;