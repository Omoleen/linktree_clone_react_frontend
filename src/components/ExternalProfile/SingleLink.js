const SingleLink = ({label, url}) => {
    const handleClick = e => {
        e.preventDefault()
        window.open(url, '_blank', 'noopener,noreferrer')
    }
    return (
        <>
            <div className='d-flex align-items-center justify-content-center border-dark-subtle card w-100 py-2' style={{}}>
                <a href='' onClick={handleClick}  className='text-decoration-none'>{label}</a>
            </div>
        </>
    )
}

export {SingleLink}