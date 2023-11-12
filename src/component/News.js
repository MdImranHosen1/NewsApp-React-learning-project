import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 20,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: false,
        }
    }
    async componentDidMount() {

        this.setState({ loading: true })
        // let url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=c131529cd8bd46eab40332fe916be834&pageSize=20&page=${this.state.page}`;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c131529cd8bd46eab40332fe916be834&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, page: 1, loading: false, })
    }


    async handleClick(val) {
        this.setState({ loading: true })
        // let url = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=c131529cd8bd46eab40332fe916be834&pageSize=20&page=${this.state.page + val}`;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c131529cd8bd46eab40332fe916be834&pageSize=${this.props.pageSize}&page=${this.state.page + val}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({ articles: parseData.articles, page: this.state.page + val, loading: false, })

    }

    render() {
        return (
            <div className='container' >
                <h3>{this.props.category} news today</h3>

                <div className='d-flex align-items-center justify-content-center'>{this.state.loading && <Spinner></Spinner>}</div>
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {

                        return <div className='col-md-auto' key={element.url}>
                            <NewsItem props={element} />
                        </div>
                    })}

                </div>
                <nav aria-label="...">
                    <ul className="pagination mt-5" style={{ alignItems: "center", justifyContent: "center" }}>
                        <li className={`page-item ${this.state.page === 1 ? "disabled" : ""}`}>
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