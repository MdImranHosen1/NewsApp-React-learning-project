import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
        }
    }
    async componentDidMount() {
        let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=c131529cd8bd46eab40332fe916be834&pageSize=20&page=${this.state.page}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, page: 1 })
    }


    async handleClick(val) {
        let url = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=c131529cd8bd46eab40332fe916be834&pageSize=20&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, page: this.state.page + val })
    }

    render() {
        return (
            <div className='container' >
                <h1>Top news today</h1>
                <div className='row'>
                    {this.state.articles.map((element) => {

                        return <div className='col-md-auto' key={element.url}>
                            <NewsItem props={element} />
                        </div>
                    })}

                </div>
                <nav aria-label="...">
                    <ul className="pagination mt-5" style={{ alignItems: "center", justifyContent: "center" }}>
                        <li className={`page-item ${this.state.page == 1 ? "disabled" : ""}`}>
                            <a className="page-link" onClick={() => this.handleClick(-1)}>Previous</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">{this.state.page - 1}</a></li>
                        <li className="page-item active" aria-current="page">
                            <a className="page-link" href="#">{this.state.page}</a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">{this.state.page + 1}</a></li>
                        <li className="page-item" >
                            <a className="page-link" href="#" onClick={() => this.handleClick(1)}>Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}