import Picture from './Picture';
import React, {Component} from "react";
import FlickrService from "../services/FlickrService";
import Carousel from 'react-bootstrap/Carousel';
import USAMap from "./Map";

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            pictureItems: [],
            title: "",
            description: ""
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.album_id !== this.props.album_id) {
            this.setState({ready: false, pictureItems: []});
            this.updatePictureList();
            this.updateGalleryInfo();
        }
    }

    componentWillMount() {
        this.updatePictureList();
        this.updateGalleryInfo();
    }

    parseList(result) {
        const pictures = [];
        Promise.all(result.map((item, index) => {
            pictures.push(<Picture index={index} key={item.id} item={item}/>);
        })).then(result => {
            this.setState({
                ready: true,
                pictureItems: pictures
            })
        });
    }

    updatePictureList() {
        FlickrService.getGallery(this.props.album_id).then(response => {
            this.parseList(response.data.photoset.photo);
        })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    updateGalleryInfo() {
        FlickrService.getGalleryInfo(this.props.album_id).then(response => {
            const photoset = response.data.photoset;
            if (photoset != undefined) {
                this.setState({title: photoset.title._content, description: photoset.description._content});
            }
        })
            .catch(error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.ready ? (
                    <div>
                        {this.state.title != "" ?
                            <h1>{this.state.title}</h1> : ""}
                        {this.state.description != "" ?
                            <h2>{this.state.description}</h2> : ""}
                        <Carousel interval={null} >
                            {
                                this.state.pictureItems
                            }
                        </Carousel>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        );
    }

};

export default Gallery;
