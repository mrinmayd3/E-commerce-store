import React, { useState } from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const { user, token } = isAuthenticated();

    const goBack = () => (
        <div className='mt-5'>
            <Link className='btn btn-sm btn-dark mb-3' to='/admin/dashboard'>Admin Dashboard</Link>
        </div>
    )

    const handleChange = event => {
        setError('');
        setName(event.target.value);
    }

    const onSubmit = event => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        // backend request fired
        createCategory(user._id, token, { name })
            .then(data => {
                if (data.error) {
                    setError(true);
                } else {
                    setError('');
                    setSuccess(true);
                    setName('');
                }
            })

    }

    const successMessage = () => {
        if (success) {
            return <h4 className='text-white mt-3'>category is successfullt added! :)</h4>
        }
    }

    const errorMessage = () => {
        if (error) {
            return <h4 className='text-danger mt-3'>Something went wrong :(</h4>
        }
    }

    const myCategoryForm = () => {
        return (
            <form>
                <div className='from-group'>
                    <p className='header mt-3 display-1 text-warning'>Enter the category</p>
                    <input
                        type='text'
                        className='form-control my-3'
                        onChange={handleChange}
                        value={name}
                        required
                        autoFocus
                        placeholder='For Ex. Summer'
                    />
                    <button onClick={onSubmit} className='btn btn-outline-warning'>Create category</button>
                </div>
            </form>
        )
    }

    return (
        <Base title='Create a category' description='Add new categories of Tshirt collections' className='container p-4'>
            <div className='row bg-info rounded'>
                <div className='col-md-8 offset-md-2'>
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;