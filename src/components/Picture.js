import React, { Component } from "react";
import FlickrService from "../services/FlickrService";
class Picture extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="card">
                <img src={FlickrService.getPictureUrl(this.props.item)} class="card-img-top" alt="alt" />
                <div class="card-body">
                    <h5 class="card-title">{this.props.item.title}</h5>
                </div>
            </div>
        );
    }

};

export default Picture;
