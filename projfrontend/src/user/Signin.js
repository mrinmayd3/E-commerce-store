import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Base from '../core/Base';
import { signin, authenticate, isAuthenticated } from '../auth/helper';


const Signin = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        didRedirect: false
    })

    const { email, password, error, loading, didRedirect } = values;
    const { user } = isAuthenticated();


    const handleChange = email => event => {
        setValues({ ...values, error: false, [email]: event.target.value })
    }


    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password })
            .then(data => {
                if (data.error) {
                    return setValues({ ...values, error: data.error, loading: false })
                } else {
                    authenticate(data, () => {
                        return setValues({
                            ...values,
                            didRedirect: true
                        })
                    })
                }
            })
            .catch(err => console.log(err))
    }


    const performRedirect = () => {
        // TODO -done
        if (didRedirect) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />;
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />
        }
    }


    const loadingMessage = () => {
        return (
            loading && (
                <div className='alert alert-info'>
                    <h2>Loading...</h2>
                </div>
            )
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

    const signInForm = () => {
        return (
            <div className='row'>
                <div className='col-md-6 offset-sm-3 text=left'>
                    <form>
                        <div className='form-group'>
                            <label className='text-light'>Email</label>
                            <input className='form-control' type='email' onChange={handleChange('email')} value={email} />
                        </div>
                        <div className='form-group'>
                            <label className='text-light'>Password</label>
                            <input className='form-control' type='password' onChange={handleChange('password')} value={password} />
                        </div>
                        <button onClick={onSubmit} className='btn btn-success btn-block'>Sign In</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title='Sign In Page' description='Fill up the sign in details'>
            {errorMessage()}
            {loadingMessage()}
            {signInForm()}
            {performRedirect()}
            {/* <p className='text-center'>{JSON.stringify(values)}</p> */}
        </Base>
    )
}

export default Signin;