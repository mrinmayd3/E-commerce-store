import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Base from '../core/Base';
import { signup } from '../auth/helper';


const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const { name, email, password, error, success } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    }

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password })
            .then(data => {
                if (data.err) {
                    return setValues({ ...values, error: data.err, success: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
            .catch(err => console.log(err))
    }


    const signUpForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text=left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Name</label>
                            <input className='form-control' type='text' onChange={handleChange('name')} value={name} />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input className='form-control' type='email' onChange={handleChange('email')} value={email} />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input className='form-control' type='password' onChange={handleChange('password')} value={password} />
                        </div>
                        <button className='btn btn-success btn-block' onClick={onSubmit} >Submit</button>
                    </form>
                </div>
            </div>
        )
    }


    const successMessage = () => {
        return (
            <div className='container'>
                <div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
                    New account was created successfully, please <Link to='/signin'>log in</Link>
                </div>
            </div>
        )
    }



    const errorMessage = () => {
        return (
            <div className='container'>
                <div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
                    {error}
                </div>
            </div>
        )
    }
    return (
        <Base title='Sign Up Page' description='Fill up the sign up details'>
            {errorMessage()}
            {successMessage()}
            {signUpForm()}
            {/* <p className='text-center'>{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signup;