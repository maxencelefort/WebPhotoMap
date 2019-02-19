import React, { Component } from "react";
import FlickrService from "../services/FlickrService";


class Picture extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <img
                className="d-block h-100"
                src={FlickrService.getPictureUrl(this.props.item)}
                alt={this.props.item.title}
            />
        );
    }

};

export default Picture;
