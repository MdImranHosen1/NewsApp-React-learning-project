import React from 'react'
import loding from './loding.gif'

export default function Spinner() {

    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img src={loding} alt='loading'></img>
        </div>
    )

}



