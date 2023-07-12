import {ProfileLink} from "../Profile/ProfileLink";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const Profile = () => {
    const navigate = useNavigate()
    const [links, setLinks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState('')
    let token = JSON.parse(localStorage.getItem('accessToken'))
    const config = {
        headers: {
            authorization: `Bearer ${token}`
        }
    }
    useEffect(() => {
        if (token) {
            axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/verify', {}, config)
            .then(response => {
                setUsername(response.data.username)
            })
            .catch(err => {
                localStorage.removeItem('accessToken')
                navigate('/')
            })
        } else navigate('/')
        axios.get(process.env.REACT_APP_BACKEND_URL + 'links/', config).then(response => {
            setIsLoading(false)
            setLinks(response.data.map(link => ({label: link.label, url: link.url, id: link._id})))
        }).catch(err => {})
    }, [])
    const handleLogout = e => {
        axios.post(process.env.REACT_APP_BACKEND_URL + 'auth/logout/', {}, config).then(response => {
            localStorage.removeItem('accessToken')
            navigate('/')
        }).catch(err => {})
    }
    return (
        <>
        <div className='border border-bottom d-flex align-items-center justify-content-end px-3' style={{height: '50px'}}>
            <div className='d-flex align-items-center gap-2 fw-bold' style={{}}>
                {username}
                <img src={require('../../assets/img/profile.avif')} className='rounded-circle' width={30} height={30} alt={''}/>
                <i className="bi bi-box-arrow-right" role='button' onClick={handleLogout}/>
            </div>
        </div>
        <div className='container-fluid pb-2' style={{}}>
            <h1 className='' style={{}}>
                    Your Links
                </h1>
            {isLoading ? <Spinner animation="border" /> : <div className='card p-3 d-flex flex-column gap-3' style={{}}>
                {links.map(link => <ProfileLink key={Math.random().toString().replace('.', '')} id={link.id} label={link.label} url={link.url} setLinks={setLinks}/>)}
                <ProfileLink label='' url='' setLinks={setLinks} id=''/>
            </div>}

        </div>
        </>

    )
}

export {Profile}