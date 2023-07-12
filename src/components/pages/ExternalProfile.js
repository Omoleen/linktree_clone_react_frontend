import {SingleLink} from "../ExternalProfile/SingleLink";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";

const ExternalProfile = () => {
    const {username} = useParams()
    const [links, setLinks] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}links/${username}`)
            .then(response => {
                setIsLoading(false)
                setLinks(response.data.map(link => ({label: link.label, url: link.url})))
            })
            .catch(err => {

            })
    }, [])
    return (
        <div className='w-100 vh-100 overflow-y-scroll d-flex align-items-center justify-content-center' style={{}}>
            <div className='overflow-y-scroll card d-flex flex-column align-items-center justify-content-center p-3 gap-3' style={{maxWidth: '100%', width: '480px'}}>
                <h1>{username.charAt(0).toUpperCase() + username.slice(1)}'s Links</h1>
                {isLoading ? <Spinner animation="border" /> :
                links.length ? links.map(link => <SingleLink key={Math.random().toString().replace('.', '')} url={link.url} label={link.label}/> ) :
                    <div className=''>No links found</div> }


            </div>
        </div>
    )
}

export {ExternalProfile}