import React, { useState } from 'react';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from '../backend';
import { cartEmpty } from './helper/CartHelper';


const StripeCheckout = ({ products, setReload, reload }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: '',
        address: ''
    })

    // const { user, token } = isAuthenticated();

    const totalAmount = () => {
        let total = 0;
        products.map(product => {
            return total += product.price;
        })
        return total;
    }

    const onToken = token => {
        const body = {
            token, products
        }
        return fetch(`${API}/stripepayment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response);
            // not yet complete futher mathod will be added like clear cart and create order
            cartEmpty();
            setReload(!reload);

        }).catch(err => console.log(err))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton stripeKey={process.env.REACT_APP_KEY} token={onToken} name='Buy Tshirt' amount={totalAmount() * 100} shippingAddress billingAddress >
                <button className='btn btn-info btn-lg mt-4'>Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
                <Link to='/signin' className='btn btn-warning btn-lg mt-4'>
                    Sign in
                </Link>
            )
    }

    return (
        <>
            <h2>Stripe checkout $ {totalAmount()}</h2>
            {showStripeButton()}
        </>
    )
}

export default StripeCheckout;