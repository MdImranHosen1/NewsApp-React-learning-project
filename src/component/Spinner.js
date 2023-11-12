import React, { Component } from 'react'
import loding from './loding.gif'

export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img src={loding} alt='loading'></img>
            </div>
        )
    }
}
