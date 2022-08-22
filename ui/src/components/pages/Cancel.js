import React from 'react'
import { Link } from "react-router-dom";

const Cancel = () => {
    return (
        <div>
            <div className='success-text'>
                <p><span>Cancelled!</span> Your transaction was dismissed. Thanks.</p>
                <Link to={'/'}>
                    <span className='font-weight-light h6'>Back to Home</span>
                </Link>
            </div>
        </div>
    )
}

export default Cancel