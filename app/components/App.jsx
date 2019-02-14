import React from 'react';
import Map from "./Map";

require('./App.css');


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map/>
    );
  }
}
