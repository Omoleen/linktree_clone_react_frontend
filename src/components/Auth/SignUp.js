import {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import Spinner from "react-bootstrap/Spinner";

const SignUp = ({setLogin}) => {
    const navigate = useNavigate()
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const handleLoginClick = e => {
        e.preventDefault()
        setLogin(true)
    }
    const [signupForm, setSignUpForm] = useState({
        email: '',
        username: '',
        password: ''
    })
    const handleChange = e => {
        setSignUpForm(data => ({...data, [e.target.name]: e.target.value}))
        // console.log(signupForm)
        // console.log(process.env.REACT_APP_BACKEND_URL)
    }
    const handleSubmit = e => {
        e.preventDefault()
        setIsLoading(true)
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/register', signupForm).then(response => {
            // console.log(response.status)
            if (response.status === 200) {
                // console.log(response.data.accessToken)
                localStorage.setItem('accessToken', JSON.stringify(response.data.accessToken))
                // console.log(JSON.parse(localStorage.getItem('accessToken')))
                return navigate('profile')
            }
        }).catch(err => {
            // console.log(err.response.status)
            const tempErrors = err.response.data.error.map(error => error.msg)
            setErrors(tempErrors)
            // console.log(tempErrors)
        })
        setIsLoading(false)
    }
    return (
        <div className='card border-dark-subtle pt-3' style={{maxWidth: '100%', width: '480px'}}>
            <div className='card-title d-flex align-items-center justify-content-center fw-bolder' style={{fontSize: '24px'}}>
                Create an Account
            </div>
            <div className='card-body'>
                {errors.length ? <div className='alert alert-danger'>
                    {errors.map((error, id) => <div key={id}> {error}</div>)}
                </div>: null}
                <form onSubmit={handleSubmit} className='d-flex flex-column gap-2'>
                    <label>Email</label>
                    <input className='input-group-text w-100 text-start' onChange={handleChange} value={signupForm.email} name='email' type='text' id=''/>
                    <label>Username</label>
                    <input className='input-group-text w-100 text-start' onChange={handleChange} value={signupForm.username} name='username' type='text' id=''/>
                    <label>Password</label>
                    <input className='input-group-text w-100 text-start' onChange={handleChange} value={signupForm.password} name='password' type='password' id=''/>
                    {isLoading ? <button className='btn btn-outline-dark' disabled><Spinner animation="border" /></button> : <button className='btn btn-outline-dark '>Sign Up</button> }
                </form>
            </div>
            <div className='card-footer bg-white text-center'>
                Already have an account? <a href='' onClick={handleLoginClick} className='text-decoration-none'>Login</a>
            </div>
        </div>
    )
}

export {SignUp}