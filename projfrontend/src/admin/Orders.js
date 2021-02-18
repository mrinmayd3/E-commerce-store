import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { getAllOrders } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';



const Order = () => {
    const [orders, setOrders] = useState([]);

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const preload = (userId, token) => {
        getAllOrders(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        })
    }

    useEffect(() => {
        preload(userId, token)
    }, [userId, token])


    return (
        <Base title='Manage product section' description='Update the user for the current status for the products' className='container'>
            <div className='row'>
                <div className='col-12'>
                    {orders.map((order, index) => {
                        return (
                            <div key={index} className='card m-5'>
                                {order.products.map((product, index) => {
                                    return (
                                        <h4 key={index} className='card-header'>
                                            <span className='badge badge-info m-2'>Product name:</span>
                                            {product.name}
                                            {/* <span className='badge badge-info m-2'>Purchase by:</span>
                                            {order.user} */}
                                            <span className='badge badge-info m-2'>Price:</span>
                                            ${product.price}
                                        </h4>
                                    )
                                })}
                                {console.log(order.user)}
                                <h5 className='ml-4'>Purchase by: {order.user.name}</h5>
                                {order.address}
                                <h5 className='m-4'>Total price: ${order.amount}
                                    <span className='badge badge-success m-2'>{order.status}</span>
                                </h5>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    )
}

export default Order;