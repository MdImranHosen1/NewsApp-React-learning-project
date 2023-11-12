import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {
        let props = this.props;
        return (

            <div className="card" style={{ width: "18rem", marginBottom: "15px" }}>
                {/* Badge start */}
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ zIndex: 1, left: 85 }}>
                    {this.props.props.source.name}
                    <span className="visually-hidden">unread messages</span>
                </span>
                {/* Badge end */}

                <img style={{ maxHeight: "200px" }} src={props.props.urlToImage != null ? props.props.urlToImage : "https://techcrunch.com/wp-content/uploads/2023/11/GettyImages-1497020096.jpg?resize=1200,741"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.props.title}</h5>
                    <p className="card-text">{props.props.description}</p>
                    <p className="card-text"><small className="text-muted">By {this.props.props.author != null ? this.props.props.author : "unknown"}<br></br> On {new Date(this.props.props.publishedAt).toGMTString()}</small></p>

                    <a href={props.props.url} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
                </div>
            </div>
        )
    }
}

