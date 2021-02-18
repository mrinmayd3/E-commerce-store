import React, { useState } from 'react';
import ImageHelper from './helper/ImageHelper';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';
import { Redirect } from 'react-router-dom';

const Card = ({ product, addToCart = true, removeCart = false, reload, setReload }) => {

    const [redirect, setRedirect] = useState(false);
    // const [count, setCount] = useState(product.count);

    const addCart = () => {
        addItemToCart(product, () => setRedirect(true));
    }


    const getARedirect = redirect => {
        if (redirect) {
            return <Redirect to='/cart' />
        }
    }

    const showAddToCart = addToCart => {
        return (
            addToCart && <button onClick={addCart} className='btn btn-outline-success btn-block'>add to cart</button>
        )
    }

    const showRemoveCart = removeCart => {
        return (
            removeCart && <button onClick={() => {
                removeItemFromCart(product._id);
                setReload(!reload);
            }}
                className='btn btn-outline-danger btn-block'>
                remove from cart
            </button>
        )
    }

    return (
        <div className='card bg-dark border border-info mt-5' style={{ maxWidth: '100%', maxHeight: '100%' }}>
            {getARedirect(redirect)}
            <div className='card-body'>
                <ImageHelper product={product} />
                <h5 className='card-title mt-2'>{product.name}</h5>
                <h5 className='card-price'>${product.price}</h5>
                <p className='card-text'>{product.description}</p>

                {showAddToCart(addToCart)}
                {showRemoveCart(removeCart)}
            </div>
        </div>
    )
}

export default Card;