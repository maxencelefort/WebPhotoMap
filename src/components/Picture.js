import React, { Component } from "react";
import FlickrService from "../services/FlickrService";
import PictureCaption from "./PictureCaption";
import CarouselCaption from "react-bootstrap/CarouselCaption";

class Picture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMore: false,
        }
    }

    handleClick  = () => {
        this.setState(this.setState({ showMore: !this.state.showMore }));
    };

    render() {
        return(
            <>
                <img
                    className="d-block h-100"
                    src={FlickrService.getPictureUrl(this.props.item)}
                    alt={this.props.item.title}
                    style={{
                        maxHeight:(this.state.showMore ? this.props.height*0.55 : this.props.height*0.65),
                        maxWidth:this.props.width*0.9,
                        width: "auto",
                        height: "auto",
                        display: "block"
                    }}
                />
                <CarouselCaption>
                    <PictureCaption item={this.props.item} show={this.state.showMore} handleShowMore={this.handleClick}/>
                </CarouselCaption>
            </>
        );
    }

};

export default Picture;
