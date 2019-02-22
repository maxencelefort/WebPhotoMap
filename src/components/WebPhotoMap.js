import React, { Component } from "react";
import MapLegend from "./MapLegend";
import { Map } from "./Map";
import GalleryModal from "./GalleryModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
class WebPhotoMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapInfo : this.props.regions,
            selected_value : "",
            display_gallery : false,
        };
    }

    componentWillMount() {
        this.generateMap(this.state.mapInfo,false);
    }

    handleRegionClick = (selectedValue) => {
        if(typeof selectedValue === 'string' || selectedValue instanceof String){
            this.showGallery(selectedValue);
        } else {
            this.generateMap(selectedValue,true);
        }
    }

    errorHandler = (error) => {
        this.displayGalleryHandler();
        //TODO display error banner
    }

    showGallery = (album_id) => {
        if(album_id != "" && album_id != undefined) {
            this.setState({
                album_id: album_id,
                display_gallery: true,
            });
        }
    }

    handleMapBack = () => {
        this.generateMap(this.state.previousMapInfo, false);
    }

    handleGalleryBack = () => {
        this.setState({display_gallery:false});
    };

    render() {
        return(
            <div className="text-center" style={{width: this.props.width*0.99, height: this.props.height}}>
                <GalleryModal width={this.props.width} height={this.props.height} album_id={this.state.album_id} show={this.state.display_gallery} closeHandler={this.handleGalleryBack} errorHandler={this.errorHandler} />
                <div>
                    <h1 className="text-center">{this.state.mapInfo.title}</h1>
                    { this.state.mapInfo.submap ?
                        <span onClick={this.handleMapBack} style={{cursor:"pointer"}}><FontAwesomeIcon icon="chevron-left" /> Back to {this.state.previousMapInfo != undefined && this.state.previousMapInfo.title != "" ? this.state.previousMapInfo.title : "previous map"}</span>
                        :
                        <span></span>
                    }
                    <div style={{width:this.props.width,height:this.props.height*0.75}}>
                        <Map key={this.state.mapInfo.vectorMap} mapInfo={this.state.mapInfo} width={this.props.width} height={this.props.height} handleClick={this.handleRegionClick} handleBack={this.handleMapBack} />
                    </div>
                </div>
                <MapLegend></MapLegend>
            </div>
        )
    }

    generateMap(regionInfo,setPrevious) {
        if(setPrevious){
            this.setState({
                previousMapInfo: this.state.mapInfo
            });
        }
        this.setState(
            {
                mapInfo: regionInfo,
            }
        )
    }
};

export default WebPhotoMap;
