import React, { useState, useEffect } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card"
import { loadCart } from './helper/CartHelper'
import StripeCheckout from "./StripeCheckout";
import PaymentBraintree from "./PaymentBraintree";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);


    useEffect(() => {
        setProducts(loadCart())
    }, [reload])

    const loadCartProducts = products => {
        return (
            <div>
                <h2 className='mb-3'>Cart product section</h2>
                {products.map((product, index) => (
                    <Card key={index} product={product} addToCart={false} removeCart={true} reload={reload} setReload={setReload} />
                ))}
            </div>
        )
    }

    // const loadCheckout = () => {
    //     return (
    //         <div>
    //             <h2>Checkout section</h2>
    //         </div>
    //     )
    // }

    return (
        <Base title="Cart page" description='Checkout for your product :)'>
            <div className="row container text-center">
                <div className='col-4'>{products && products.length > 0 ? loadCartProducts(products) : <h2>No product in cart</h2>}</div>
                <div className='col-8'>
                    {isAuthenticated() ? products && products.length > 0 ? (
                        <div>
                            <StripeCheckout products={products} setReload={setReload} reload={reload} />
                            <h1 className='mt-2'>OR</h1>
                            <PaymentBraintree products={products} setReload={setReload} reload={reload} />
                        </div>) : (<h2>Please add your products in cart</h2>)
                        : (
                            <div>
                                <h2>Please sign in for check out</h2>
                                <Link to='/signin' className='btn btn-warning btn-lg mt-4'>
                                    Sign in
                            </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </Base>
    );
};

export default Cart;
