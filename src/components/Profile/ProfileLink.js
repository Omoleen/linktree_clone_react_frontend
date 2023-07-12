import {useEffect, useState} from "react";
import axios from "axios";

const ProfileLink = ({label, url, setLinks, id}) => {
    const [link, setLink] = useState({label, url, id})
    const token = JSON.parse(localStorage.getItem('accessToken'))
    const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    const handleSave = e => {
        if (id.length) {
            axios.patch(`${process.env.REACT_APP_BACKEND_URL}links/${id}`, link, config).then(response => {
                console.log(response.data)
            }).catch(err => {

            })

        } else {
            axios.post(process.env.REACT_APP_BACKEND_URL + 'links', link, config).then(response => {
                console.log(response.data)
                setLinks(data => [...data, link])
                setLink({label: '', url: '', id: ''})
            }).catch(err => {

            })
        }
    }
    const handleDelete = e => {
        if (id.length) {
            axios.delete(`${process.env.REACT_APP_BACKEND_URL}links/${id}`, config).then(response => {
                console.log(response.data)
                setLinks(links => {
                    let tempLinks = [...links]
                    console.log(tempLinks)
                    tempLinks = tempLinks.filter(tempLink => tempLink.label !== link.label)
                    console.log(tempLinks, link)
                    return tempLinks
                })
            }).catch(err => {})
        }
    }
    const handleChange = e => {
        setLink(data => ({...data, [e.target.name]: e.target.value}))
    }
    return (
        <form className='row justify-content-between px-2 gap-2' onSubmit={e => e.preventDefault()}>
            <div className="form-floating col col-lg-3">
                <input type="text" className="form-control" value={link.label} name='label' onChange={handleChange} id="floatingInput" />
                <label htmlFor="floatingInput px-5">Label</label>
            </div>
            <div className="form-floating col col-lg-3">
                <input type="text" className="form-control" value={link.url} name='url' onChange={handleChange} id="floatingInput"/>
                <label htmlFor="floatingInput px-5">Url</label>
            </div>
            <div className='row d-lg-inline-flex d-block col-lg-4 gap-2'>
                <button className='btn btn-outline-dark col-5' onClick={handleSave}>Save</button>
                <button className='btn btn-outline-dark col-5' onClick={handleDelete}>Delete</button>
            </div>

        </form>
    )
}

export {ProfileLink}