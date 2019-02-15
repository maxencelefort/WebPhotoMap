import React, { Component } from "react";
import config from '../resources/app_config.json';

class StatesLegend extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div class="card">

                <div className='my-legend'>
                    <div className='legend-title'>States Color Legend</div>
                    <div className='legend-scale'>
                        <ul className='legend-labels'>
                            <li><span style={{background:config.visited_state_color}}></span>Visited (Click on the State to see the gallery)</li>
                            <li><span style={{background:config.crossed_state_color}}></span>Crossed (Camera stayed in the bag, I have to go back!)</li>
                            <li><span style={{background:config.empty_state_color}}></span>Soon to be visited, hopefully</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

};

export default StatesLegend;
