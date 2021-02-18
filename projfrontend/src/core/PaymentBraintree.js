import React, { useState, useEffect } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import { loadCart, cartEmpty } from './helper/CartHelper';
import { isAuthenticated } from '../auth/helper';
import { getMeToken, processPayment } from './helper/paymentBHelper'
import { createOrder } from './helper/orderHelper';


const PaymentBraintree = ({ products, setReload, reload }) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getMeToken(userId, token).then(data => {
            console.log('info', data);
            if (data.err) {
                console.log(data.err);
                setInfo({ ...info, error: data.err })
            } else {
                const clientToken = data.clientToken;
                setInfo({ clientToken });
            }
        })
    }

    useEffect(() => getToken(userId, token), [userId, token]);

    const totalAmount = () => {
        let total = 0;
        products.map(p => {
            return total += p.price;
        })
        return total;
    }


    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        const getNonce = info.instance.requestPaymentMethod().then(data => {
            nonce = data.nonce;
            const paymentData = {
                amount: totalAmount(),
                paymentMethodNonce: nonce
            }

            processPayment(userId, token, paymentData).then(response => {
                console.log('response', response.transaction);
                setInfo({ ...info, loading: false, success: response.success });
                // TODO: empty cart, place order and force reload

                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }
                createOrder(userId, token, orderData)
                cartEmpty(() => {
                    console.log('what happend')
                })
                setReload(!reload);

            }).catch(err => {
                setInfo({ loading: false, error: err, success: false });
                console.log('payment failed:', err);
            })
        });
    }

    const showDropInBtn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={instance => (info.instance = instance)}
                        />
                        <button className='btn btn-info btn-block' onClick={onPurchase}>Buy</button>
                    </div>
                ) : (<h3>Please add your products in cart</h3>)}
            </div>
        )
    }


    return (
        <div>
            {showDropInBtn()}
        </div>
    )
}

export default PaymentBraintree;