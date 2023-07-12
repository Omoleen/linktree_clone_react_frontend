import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner";

const Login = ({setLogin}) => {
    // useEffect(()=> {
    //     // console.log(process.env.REACT_APP_BACKEND_URL)
    // }, [])
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
    const handleSignUpClick = e => {
        e.preventDefault()
        setLogin(false)
    }
    const handleChange = e => {
        setLoginForm(data => ({...data, [e.target.name]: e.target.value}))
    }
    const handleSubmit = e => {
        e.preventDefault()
        setIsLoading(true)
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/login', loginForm).then(response => {
            // console.log(response)
            if (response.status === 200) {
                // console.log(response.data.accessToken)
                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
                // console.log(JSON.parse(localStorage.getItem('accessToken')))
                return navigate('profile')
            }
        }).catch(err => {
            // console.log(err.response)
            if (err.response.status === 401) return setErrors([err.response.data])
            const tempErrors = err.response.data.error.map(error => error.msg)
            setErrors(tempErrors)
            // console.log(tempErrors)
        })
        setIsLoading(false)
    }
    return (
        <div className='card border-dark-subtle pt-3' style={{maxWidth: '100%', width: '480px'}}>
            <div className='card-title d-flex align-items-center justify-content-center fw-bolder' style={{fontSize: '24px'}}>
                Welcome Back!
            </div>
            <div className='card-body'>
                {errors.length ? <div className='alert alert-danger'>
                    {errors.map((error, id) => <div key={id}> {error}</div>)}
                </div>: null}

                <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
                    <label>Email</label>
                    <input className='input-group-text w-100 text-start' onChange={handleChange} value={loginForm.email} name='email' type='text' id=''/>
                    <label>Password</label>
                    <input className='input-group-text w-100 text-start' onChange={handleChange} value={loginForm.password} name='password' type='password' id=''/>

                    {isLoading ? <button className='btn btn-outline-dark' disabled><Spinner animation="border" /></button> : <button className='btn btn-outline-dark '>Login</button> }
                </form>
            </div>
            <div className='card-footer bg-white text-center'>
                Create an Account? <a href='' onClick={handleSignUpClick} className='text-decoration-none'>Sign Up</a>
            </div>
        </div>
    )
}

export {Login}