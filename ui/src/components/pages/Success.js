import React from 'react'
import { Link } from "react-router-dom";

const Success = () => {
    return (
        <div>
            <div className='success-text'>
                <p><span>Congratulations!</span> You successfully checkout one of our product. Hope you buy again.</p>
                <Link to={'/'}>
                    <span className='font-weight-light h6'>Back to Home</span>
                </Link>
            </div>
        </div>
    )
}

export default Success