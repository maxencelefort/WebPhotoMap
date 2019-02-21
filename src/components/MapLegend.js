import React, { Component } from "react";
import config from '../resources/app_config.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MapLegend extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className='my-legend'>
                <div className='legend-title'><FontAwesomeIcon icon="info-circle" /> Map Color Legend</div>
                <div className='legend-scale'>
                    <ul className='legend-labels'>
                        <li><span style={{background:config.visited_color}}></span>Visited (Click on the region to see the gallery)</li>
                        <li><span style={{background:config.crossed_color}}></span>Crossed (Camera stayed in the bag, I have to go back!)</li>
                        <li><span style={{background:config.empty_color}}></span>Soon to be visited, hopefully</li>
                    </ul>
                </div>
            </div>
        );
    }

};

export default MapLegend;
