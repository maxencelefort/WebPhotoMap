import appconfig from "../resources/app_config";
import {VectorMap} from "react-jvectormap";
import React, { Component } from "react";
import RegionInfoService from "../services/RegionInfoService";

export class Map extends Component {

    constructor(props) {
        super(props);
        this.regionInfoService = new RegionInfoService(props.mapInfo.regions);
        this.state = {
            mapData : {}
        };
    }

    componentWillMount() {
        this.initializeMapData();
    }

    initializeMapData() {
        let data = {};
        for(let country of this.regionInfoService.getVisited()){
            data[country] = 1
        }
        for(let country of this.regionInfoService.getCrossed()){
            data[country] = 0
        }
        this.setState({mapData: data});
    }

    handleRegionClick = (event,data) => {
        this.refs.map.$mapObject.tip.hide();
        this.props.handleClick(this.regionInfoService.getRegionContent(data));
    }


    render () {
        return (
            <VectorMap
                map={this.props.mapInfo.vectorMap}
                backgroundColor="transparent"
                ref={"map"}
                hoverOpacity="0.7"
                zoomOnScroll = "false"
                containerStyle={{
                    width: '100%',
                    height: '80%'
                }}
                regionStyle={{
                    initial: {
                        fill: appconfig.empty_color
                    }
                }}
                onRegionClick={this.handleRegionClick}
                containerClassName="map"
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
        );
    }
}