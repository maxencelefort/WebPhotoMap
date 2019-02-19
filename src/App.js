import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './components/Map';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
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
        <Map style={{overflowX: 'hidden'}} width={this.state.width} height={this.state.height}/>
    );
  }
}

export default App;
