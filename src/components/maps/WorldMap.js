import appconfig from '../../resources/app_config.json';
import React, { Component } from "react";
import CountryInfoService from "../../services/CountryInfoService";

import { VectorMap } from "react-jvectormap";

class WorldMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapData : {}
        };
    }

    componentWillMount() {
        this.initializeMapData();
    }

    initializeMapData() {
        let data = {};
        for(let country of CountryInfoService.getVisitedCountries()){
            data[country] = 1
        }
        for(let country of CountryInfoService.getCrossedCountries()){
            data[country] = 0
        }
        console.log("country data",data);
        this.setState({mapData: data});
    }

    handleCountryClick = (event,data) => {
        this.props.handleClick(data);
    }

    render() {
        return(
            <>
                <h1 className="text-center">World Photo Map</h1>
                <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent"
                    hoverOpacity="0.7"
                    containerStyle={{
                        width: '100%',
                        height: '80%'
                    }}
                    regionStyle={{
                        initial: {
                            fill: appconfig.empty_color
                        }
                    }}
                    onRegionClick={this.handleCountryClick}
                    containerClassName="world-map"
                    series={{
                        regions: [
                            {
                                values: this.state.mapData,  //this is your data
                                scale: [appconfig.crossed_color, appconfig.visited_color],  //your color game's here
                                normalizeFunction: "polynomial"
                            }
                        ]
                    }}
                />
            </>
        )
    }
};

export default WorldMap;
