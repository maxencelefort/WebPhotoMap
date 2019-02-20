import appconfig from '../resources/app_config.json';
import React, { Component } from "react";

import MapLegend from "./MapLegend";
import UnitedStatesMap from "./maps/UnitedStatesMap";
import WorldMap from "./maps/WorldMap";
import GalleryModal from "./GalleryModal";
import CountryInfoService from "../services/CountryInfoService";
class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected_country : "",
            album_id : "",
            display_gallery : false,
        };
    }

    handleCountryClick = (countryCode) => {
        this.setState({
            selected_country:countryCode
        });
        if(CountryInfoService.isVisited(countryCode)) {
            this.showGallery(CountryInfoService.getAlbum(countryCode));
        }
    }

    showGallery = (album_id) => {
        if(album_id != "") {
            this.setState({
                album_id: album_id,
                display_gallery: true
            });
        }
    }

    handleBackUsMapClick = () => {
        this.setState({selected_country:""});
    }

    displayGalleryHandler = () => {
        this.setState({display_gallery:false});
    };

    render() {
        return(
            <div className="text-center" style={{width: this.props.width * 0.9, height: this.props.height * 0.9}}>
                <GalleryModal width={this.props.width} height={this.props.height} album_id={this.state.album_id} show={this.state.display_gallery} closeHandler={this.displayGalleryHandler} />
                {
                    this.state.selected_country == "US" && CountryInfoService.isVisited("US") && CountryInfoService.getAlbum("US") == "" ?
                        <UnitedStatesMap handleClick={this.showGallery} handleBack={this.handleBackUsMapClick} width={this.props.width}
                                         height={this.props.height}/>
                        :
                        <WorldMap handleClick={this.handleCountryClick} width={this.props.width}
                                  height={this.props.height}/>
                }
                <MapLegend></MapLegend>
            </div>
        )
    }

};

export default Map;
