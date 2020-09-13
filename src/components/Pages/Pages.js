import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import Axios from "axios";
import "./pages.css";
import { Link } from "react-router-dom";
import Moment from 'moment';
export default class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    Axios.get(
      "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics,player&id=Ks-_Mh1QhMc%2Cc0KYU2j0TM4%2CeIho2S0ZahI&key=AIzaSyAOJj_IHEdUyR5_FaxHqaUu9iJdTQhpwuk"
    )
      .then((response) => {
        this.setState({
          data: response.data.items,
        });
      })
      .catch((error) => console.log(error));
  }
   formatCash = n => {
    if (n < 1e3) return n;
    if (n >= 1e3 || n<1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6) return +(n / 1e6).toFixed(1) + "M";
  };
  render() {
    const videoCard = this.state.data.map((item) => {
      console.log(item);
      return (
        <div className="col-md-3 col-sm-6">
          <div className="card mt-5" style={{ width: "100%" }}>
         <img
              className="card-img-top"
              src={item.snippet.thumbnails.standard.url}
              alt="Card image cap"
            />
            <div className="card-body">
            <Link to={"/watch?v="+item.id}><h5 className="card-title">{item.snippet.title}</h5></Link>
              <p className="card-text">{item.snippet.channelTitle}</p>
              <small>
                {this.formatCash(item.statistics.viewCount) + " views"}{" "}
                <i
                  className="fa fa-circle px-2"
                  style={{ fontSize: "4px" }}
                ></i>
                {Moment(item.snippet.publishedAt).fromNow()}
              </small>
            </div>
          </div>
        </div>
      );
    });
    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row ">{videoCard}</div>
        </div>
      </Fragment>
    );
  }
}