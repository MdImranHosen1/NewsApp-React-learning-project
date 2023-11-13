import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


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

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0,

        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async Update() {
        this.setState({ loading: true })
        this.props.setProgress(10);
        
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        this.props.setProgress(60);
        let data = await fetch(url);
        let parseData = await data.json();
        this.props.setProgress(100);
        this.setState({ articles: parseData.articles, totalResults: parseData.totalResults, loading: false, })

    }
    async componentDidMount() {
        this.Update();
    }

    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1, totalResults: this.state.totalResults - this.props.pageSize })
        console.log(this.state.totalResults);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles)
        })
    };

    // async handleClick(val) {
    //     this.setState({ loading: true })
    //     this.Update();
    //     this.setState({ page: this.state.page + val })

    // }

    render() {
        return (
            <>

                <h3 style={{ textAlign: "center", marginBottom: "15px" }}>{this.capitalizeFirstLetter(this.props.category)} news today</h3>
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={true}
                    loader={this.state.totalResults > 0 && <Spinner></Spinner>}
                >
                    {this.state.loading && <Spinner></Spinner>}
                    <div className='container' >
                        <div className='row mt-2'>
                            {!this.state.loading && this.state.articles.map((element) => {

                                return <div className='col-md-auto' key={element.url}>
                                    <NewsItem props={element} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll>


                {/* Pagination */}
                {/* <nav aria-label="...">
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
                </nav> */}

            </>
        )
    }
}