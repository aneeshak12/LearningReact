import React, { Component, Fragment } from "react";
import "./navbar.css";
export default class Navbar extends Component {
  handleToggle = () => {
    this.props.isOpen();
  };
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            <button
              onClick={this.handleToggle}
              className="btn btn-primary btn-toggle"
            >
              <i className="fa fa-bars"></i>
            </button>
            <img
              className="youtube-logo"
              src="https://www.freepnglogos.com/uploads/youtube-logo-hd-8.png"
            />
            <span className="youtube-name">YouTube</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <form className="form-inline my-4 my-lg-0">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </form>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto font-right">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <i className="fa fa-video-camera px-2" aria-hidden="true"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa fa-th px-2" aria-hidden="true"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa fa-bell px-2 " aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}