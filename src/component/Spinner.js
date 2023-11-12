import React, { Component } from 'react'
import loding from './loding.gif'

export default class Spinner extends Component {
    render() {
        return (

            <div className='d-flex align-items-center justify-content-center'>
                <img src={loding} alt='loading'></img>
            </div>
        )
    }
}
