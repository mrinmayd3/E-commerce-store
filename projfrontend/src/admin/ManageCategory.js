import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getAllCategories, deleteCategory } from './helper/adminapicall';

const ManageCategory = () => {

    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();

    const preload = () => {
        getAllCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setCategories(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const deleteThisCategory = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                preload();
            }
        })
    }

    return (
        <Base title='Manage category' description='You can manage your category from here'>
            <div className='row'>
                <div className='col-12'>
                    <h4>All categories</h4>
                    <Link className='btn btn-info' to='/admin/dashboard' >Admin dashboard</Link>
                    <h5 className='text-center'>Total categories</h5>

                    {categories.map((cate, index) => {
                        return (
                            <div key={index} className='row text-center my-3'>
                                <div className='col-4 text-left'>
                                    <h5>{cate.name}</h5>
                                </div>
                                <div className='col-4'>
                                    <Link className='btn btn-success' to={`/admin/category/update/${cate._id}`}>Update</Link>
                                </div>
                                <div className='col-4'>
                                    <button onClick={() => {
                                        deleteThisCategory(cate._id)
                                    }}
                                        className='btn btn-danger'>
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

export default ManageCategory;