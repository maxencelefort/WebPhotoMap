import Picture from './Picture';
import React, {Component} from "react";
import FlickrService from "../services/FlickrService";
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from "react-bootstrap/CarouselItem";
import PictureCaption from "./PictureCaption";
import CarouselCaption from "react-bootstrap/CarouselCaption";

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            ready: false,
            pictureItems: [],
            title: "",
            description: "",
            index: 0,
            direction: null
        }
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction,
        });
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
        Promise.all(result.map((item) => {
            pictures.push(item);
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
                            {this.state.pictureItems.map((item, index) =>
                                <CarouselItem key={index}>
                                    <Picture key={index} item={item} />
                                    <CarouselCaption>
                                        <PictureCaption key={index} item={item} />
                                    </CarouselCaption>
                                </CarouselItem>
                            )}
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
