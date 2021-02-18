import React from 'react';
import { API } from '../../backend';


const ImageHelper = ({ product }) => {
    const imageURL = product ? `${API}/product/photo/${product._id}` : 'https://images.unsplash.com/photo-1596332517860-d4f9022a96f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'

    return (
        <img src={imageURL} className='card-img-top' alt='' />
    )
}

export default ImageHelper;