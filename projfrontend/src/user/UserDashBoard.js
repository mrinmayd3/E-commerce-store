import React, { useState, useEffect } from 'react';
import Base from '../core/Base'
import { isAuthenticated } from '../auth/helper';
import { purchaseList } from './helper/userapicalls';

const UserDashboard = () => {

    const [userInfo, setUserinfo] = useState([]);


    const { user: { name, email, _id }, token } = isAuthenticated();

    const preload = (_id, token) => {
        purchaseList(_id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                // console.log('data:', data);
                setUserinfo(data);
            }
        })
    }

    useEffect(() => {
        preload(_id, token);
    }, [_id, token])

    const userDashUI = () => {
        return (
            <div className='card'>
                <h4 className='card-header'>User Information</h4>
                <ul className='card-group'>
                    <li className='card-group-item mt-3'>
                        <span className='badge badge-success'>Name:</span>
                        <span className='m-3'>{name}</span>
                        <span className='badge badge-success'>Email:</span>
                        <span className='m-3'>{email}</span>
                    </li>
                </ul>
            </div>
        )
    }

    const parchasesListUI = () => {
        return (
            <div className='card'>
                <h4 className='card-header'>User purchase list</h4>
                {/* {console.log(userInfo)} */}
                {userInfo.length > 0 && userInfo.map((e, index) => (
                    <div key={index}>
                        {e.purchases.map((order, index) => (
                            <div key={index} className='ml-4 mt-3'>
                                <p>Item name: {order.name}</p>
                                <p>Category: {order.category.name}</p>
                                <p>Transaction Id: {order.transaction_id}</p>
                                <h5>Total price: {order.amount}</h5>
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        )
    }

    return (
        <Base title='UserDashboard' description='User profile details' className='container'>
            {userDashUI()}
            {parchasesListUI()}
        </Base>
    )
}

export default UserDashboard;