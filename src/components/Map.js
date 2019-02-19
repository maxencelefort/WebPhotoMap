import USAMap from "react-usa-map";
import StatesLegend from './StatesLegend';
import appconfig from '../resources/app_config.json';

import React, { Component } from "react";

import states from '../resources/states_info.json';
import GalleryModal from "./GalleryModal";

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            album_id : "",
            display_gallery : false
        };
    }

    displayGalleryHandler = () => {
        this.setState({display_gallery:false});
    };

    mapHandler = (event) => {
        if(Object.keys(states.visited).indexOf(event.target.dataset.name) > -1) {
            this.setState({display_gallery : true,album_id:states.visited[event.target.dataset.name]})
        }
    };

    statesCustomConfig = () => {
        let config = [];
        let visitedStates = Object.keys(states.visited);
        for(let visitedState of visitedStates){
            config[visitedState] =  {fill : appconfig.visited_state_color};
        }
        for(let crossedState of states.crossed){
            config[crossedState] = {fill : appconfig.crossed_state_color};
        }
        return config;
    };

    render() {
        return(
            <>
                <GalleryModal width={this.props.width} height={this.props.height} album_id={this.state.album_id} show={this.state.display_gallery} closeHandler={this.displayGalleryHandler} />
                <h1 className="text-center">USA Photo Map</h1>
                <USAMap title="" width={this.props.width} height={this.props.height*0.7} defaultFill={appconfig.empty_state_color} customize={this.statesCustomConfig()} onClick={this.mapHandler} />
                <StatesLegend></StatesLegend>
            </>
        )
    }
};

export default Map;
