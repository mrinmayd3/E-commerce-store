import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { getAllCategories, createProduct } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AddProduct = () => {

    const [values, setValues] = useState({
        photo: '',
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        stock: '',
        error: '',
        loading: false,
        getRedirect: false,
        createdProduct: '',
        formData: ''
    })

    const { name, description, price, category, categories, stock, error, getRedirect, createdProduct, formData } = values;

    const { user, token } = isAuthenticated();

    const preLoad = () => {
        getAllCategories().then(data => {
            console.log(data)
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, categories: data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
        preLoad()
    })

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setValues({ ...values, error: false, [name]: value })
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        photo: '',
                        name: '',
                        description: '',
                        price: '',
                        category: '',
                        stock: '',
                        error: '',
                        loading: false,
                        createdProduct: data.name,
                        getRedirect: true
                    })
                }
            })
    }

    const goBack = () => (
        <div className='mt-5'>
            <Link className='btn btn-sm btn-dark mb-3' to='/admin/dashboard'>Admin Dashboard</Link>
        </div>
    )

    const successMessage = () => {
        return (
            <div className='alert alert-success mt-3' style={{ display: createdProduct ? '' : 'none' }}>
                {createdProduct} created successfully
            </div>
        )
    }


    const errorMessage = () => {
        return (
            <div className='alert alert-danger mt-3' style={{ display: error ? '' : 'none' }}>
                {error}
            </div>
        )
    }

    const performRedirect = () => {
        if (getRedirect) {
            window.setTimeout(() => {
                window.location.href = '/admin/dashboard'
            }, 2000)
        }
    }

    const createProductForm = () => (
        <form className='mt-3'>
            <span className='text-warning'><h5>Upload a product photo</h5></span>
            <div className='form-group'>
                <label className='btn btn-block btn-warning'>
                    <input onChange={handleChange('photo')} type='file' className='form-control' accept='image' />
                </label>
            </div>
            <div className='form-group'>
                <input onChange={handleChange('name')} type='text' placeholder='Name' className='form-control' value={name} />
            </div>
            <div className='form-group'>
                <textarea onChange={handleChange('description')} type='text' placeholder='Description' className='form-control' value={description} />
            </div>
            <div className='form-group'>
                <input onChange={handleChange('price')} type='number' placeholder='Price' className='form-control' value={price} />
            </div>
            <div className='form-group'>
                <select onChange={handleChange('category')} placeholder='Category' className='form-control' value={category} >
                    <option>Select</option>
                    {categories && categories.map((cate, index) => (
                        <option key={index} value={cate._id}>{cate.name}</option>
                    ))
                    }
                </select>
            </div>
            <div className='form-group'>
                <input onChange={handleChange('stock')} type='number' placeholder='stock' className='form-control' value={stock} />
            </div>
            <button onClick={onSubmit} type='submit' className='btn btn-outline-warning mb-3'>Create product</button>
        </form>
    )

    return (
        <Base title='Add product' description='You can add your product(s) from here :)' className='container p-4'>
            <div className='row bg-info rounded'>
                <div className='col-md-8 offset-md-2'>
                    {goBack()}
                    {errorMessage()}
                    {successMessage()}
                    {createProductForm()}
                    {performRedirect()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct;