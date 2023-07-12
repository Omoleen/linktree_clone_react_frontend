import {Login} from "../Auth/Login";
import {useEffect, useState} from "react";
import {SignUp} from "../Auth/SignUp";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate()
    const [login, setLogin] = useState(true)
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('accessToken'))
        const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        if (token) {
            axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/verify', {}, config)
            .then(response => {navigate('/profile')})
            .catch(err => {localStorage.removeItem('accessToken')})
        }
    }, [])
    return (
        <div className='d-flex align-items-center justify-content-center vh-100 w-100'>
            {login ? <Login setLogin={setLogin} /> : <SignUp setLogin={setLogin} />}
        </div>
    )
}

export {Auth}