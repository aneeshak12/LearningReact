import React, { Component } from "react";
import "./sidebar.css";
class SidebarResponsive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channel: [
        "Aneesha Khadka",
        "Saphal Ghimire",
        "Sisan Baniya",
        "Wah Banana",
        "Chetan Vlogs",
        "Aneesha Khadka",
        "Saphal Ghimire",
        "Sisan Baniya",
      ],
      part: ["Library", "History", "Watch Later", "Liked Vidoes"],
    };
  }
  render() {
    return (
      <div className="sidebar-responsive">
        <ul>
          <li>
            <i className="fa fa-home px-3" aria-hidden="true"></i> Home
          </li>
          <li>
            <i className="fa fa-home px-3" aria-hidden="true"></i> Trending{" "}
          </li>
          <li>
            <i className="fa fa-home px-3" aria-hidden="true"></i> Subscription
          </li>
        </ul>
      </div>
    );
  }
}

export default SidebarResponsive;