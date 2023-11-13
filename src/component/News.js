import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

    const [articles, setarticles] = useState([])
    const [page, setpage] = useState(1)
    const [loading, setloading] = useState(false)
    const [totalResults, settotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const Update = async () => {
        setloading(true);

        props.setProgress(10);

        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
        props.setProgress(60);
        let data = await fetch(url);
        let parseData = await data.json();
        props.setProgress(100);
        setarticles(parseData.articles);
        settotalResults(parseData.totalResults);
        setloading(false);


    }

    useEffect(() => {
        Update();
    }, [])


    const fetchMoreData = async () => {



        settotalResults(totalResults - props.pageSize);

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setpage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json()
        setarticles(articles.concat(parsedData.articles));
    };

    // async handleClick(val) {
    //     this.setState({ loading: true })
    //     this.Update();
    //     this.setState({ page: this.state.page + val })

    // }


    return (
        <>

            <h3 style={{ textAlign: "center", marginBottom: "15px", marginTop: "100px" }}>{capitalizeFirstLetter(props.category)} news today</h3>
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={true}
                loader={totalResults > 0 && <Spinner></Spinner>}
            >
                {loading && <Spinner></Spinner>}
                <div className='container' >
                    <div className='row mt-2'>
                        {!loading && articles.map((element) => {

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

News.defaultProps = {
    country: 'in',
    pageSize: 20,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News;