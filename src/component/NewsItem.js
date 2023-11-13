import React from 'react'
import DefaultImage from './defaultImage.jpg'

export default function NewsItem(props) {


    return (


        <div className="card" style={{ width: "18rem", marginBottom: "15px" }}>
            {/* Badge start */}

            <div style={{
                display: "flex",
                justifyContent: "flex-end",
                position: "absolute",
                right: "0"
            }}>
                <span className=" badge rounded-pill bg-danger" >
                    {props.props.source.name}
                    <span className="visually-hidden">unread messages</span>
                </span>
            </div>
            {/* Badge end */}

            <img style={{ maxHeight: "200px" }} src={props.props.urlToImage != null ? props.props.urlToImage : DefaultImage} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{props.props.title}</h5>
                <p className="card-text">{props.props.description}</p>
                <p className="card-text"><small className="text-muted">By {props.props.author != null ? props.props.author : "unknown"}<br></br> On {new Date(props.props.publishedAt).toGMTString()}</small></p>

                <a href={props.props.url} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
            </div>
        </div>
    )

}

