import states from "../../resources/us_states_info.json";
import appconfig from "../../resources/app_config.json";
import USAMap from "react-usa-map";

import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class UnitedStatesMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            album_id : "",
            display_gallery : false
        };
    }

    mapHandler = (event) => {
        if(Object.keys(states.visited).indexOf(event.target.dataset.name) > -1) {
            this.props.handleClick(states.visited[event.target.dataset.name]);
            //setState({display_gallery : true,album_id:})
        }
    };

    statesCustomConfig = () => {
        let config = [];
        let visitedStates = Object.keys(states.visited);
        for(let visitedState of visitedStates){
            config[visitedState] =  {fill : appconfig.visited_color};
        }
        for(let crossedState of states.crossed){
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