import React, { Component } from 'react'

export default class NewsItem extends Component {

  render() {
    let props = this.props;
    return (

      <div className="card" style={{ width: "18rem" }}>
        <img src={props.props.urlToImage != null ? props.props.urlToImage : "https://techcrunch.com/wp-content/uploads/2023/11/GettyImages-1497020096.jpg?resize=1200,741"} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.props.title}</h5>
          <p className="card-text">{props.props.description}</p>
          <a href={props.props.url} rel="noreferrer" target="_blank" className="btn btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}
