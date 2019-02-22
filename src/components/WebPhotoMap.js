import React, { Component } from "react";
import regionsInfo from '../resources/regions_info';
import MapLegend from "./MapLegend";
import { Map } from "./Map";
import GalleryModal from "./GalleryModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
class WebPhotoMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mapInfo : regionsInfo,
            selected_value : "",
            display_gallery : false,
        };
    }

    componentWillMount() {
        this.generateMap(regionsInfo);
    }

    handleRegionClick = (selectedValue) => {
        if(typeof selectedValue === 'string' || selectedValue instanceof String){
            this.showGallery(selectedValue);
        } else {
            this.generateMap(selectedValue);
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
        this.generateMap(regionsInfo);
    }

    handleGalleryBack = () => {
        this.setState({display_gallery:false});
    };

    render() {
        return(
            <div className="text-center" style={{width: this.props.width, height: this.props.height}}>
                <GalleryModal width={this.props.width} height={this.props.height} album_id={this.state.album_id} show={this.state.display_gallery} closeHandler={this.handleGalleryBack} errorHandler={this.errorHandler} />
                <div>
                    <h1 className="text-center">{this.state.mapInfo.title}</h1>
                    { this.state.mapInfo.submap ?
                        <span onClick={this.handleMapBack} style={{cursor:"pointer"}}><FontAwesomeIcon icon="chevron-left" /> Back to previous map</span>
                        :
                        <span></span>
                    }
                    <div style={{width:this.props.width,height:this.props.height}}>
                        {this.state.map}
                    </div>
                </div>
                <MapLegend></MapLegend>
            </div>
        )
    }

    generateMap(regionInfo) {
        let map = <Map key={regionInfo.vectorMap} mapInfo={regionInfo} width={this.props.width} height={this.props.height} handleClick={this.handleRegionClick} handleBack={this.handleMapBack} parentMapTitle={regionInfo.title}/>;
        this.setState(
            {
                mapInfo: regionInfo,
                map: map
            }
        )
    }
};

export default WebPhotoMap;
