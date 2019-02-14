import Gallery from './Gallery';
import USAMap from "react-usa-map";
import Modal from 'react-responsive-modal';


import React, { Component } from "react";

import visitedStates from '../../resources/visited_states.json';

class Map extends Component {



  state = {
    album_id : "",
    display_gallery : false
  };

  mapHandler = (event) => {
    if(Object.keys(visitedStates).indexOf(event.target.dataset.name) > -1) {
      this.setState({display_gallery : true,album_id:visitedStates[event.target.dataset.name]})
    }
  };

  statesCustomConfig = () => {
    let config = [];
    let states = Object.keys(visitedStates);
    for(let visitedState of states){
      config[visitedState] =  {fill : "green"};
    }
    return config;
  };

  closeHandler = () => {
    this.setState({display_gallery:false});
  };

  render() {
    return(
    <div>
      <Modal open={this.state.display_gallery} onClose={this.closeHandler} center>
          <Gallery album_id={this.state.album_id} closeHandler={this.closeHandler}/>
      </Modal>
      <USAMap title="" customize={this.statesCustomConfig()} onClick={this.mapHandler} />
    </div>
    )
  }
};

export default Map;
