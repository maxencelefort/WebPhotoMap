import React, { Component } from 'react';
import './App.css';
import WebPhotoMap from './components/WebPhotoMap';
import regionsInfo from './resources/regions_info';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    return (
        <WebPhotoMap style={{overflowX: 'hidden'}} width={this.state.width} height={this.state.height} regions={regionsInfo}/>
    );
  }
}

export default App;
