import appconfig from "../../resources/app_config.json";
import USAMap from "react-usa-map";

import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import USStateInfoService from "../../services/USStateInfoService";


class UnitedStatesMap extends Component {
    constructor(props) {
        super(props);
        this.usStateInfoService = new USStateInfoService();
        this.state = {
            album_id : "",
            display_gallery : false
        };
    }

    mapHandler = (event) => {
        if(this.usStateInfoService.isVisited(event.target.dataset.name)) {
            this.props.handleClick(this.usStateInfoService.getAlbum(event.target.dataset.name));
        }
    };

    statesCustomConfig = () => {
        let config = [];
        for(let visitedState of this.usStateInfoService.getVisited()){
            config[visitedState] =  {fill : appconfig.visited_color};
        }
        for(let crossedState of this.usStateInfoService.getCrossed()){
            config[crossedState] = {fill : appconfig.crossed_color};
        }
        return config;
    };

    render() {
        return(
            <>
                <h1 className="text-center">USA Photo Map</h1>
                <span onClick={this.props.handleBack} style={{cursor:"pointer"}}><FontAwesomeIcon icon="chevron-left" /> Back to the World Map</span>
                <USAMap title="" width={this.props.width} height={this.props.height*0.7} defaultFill={appconfig.empty_color} customize={this.statesCustomConfig()} onClick={this.mapHandler} />
            </>
        )
    }
}

export default UnitedStatesMap;