import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import FlickrService from "../services/FlickrService";
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class Picture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMore:false,
            info: {},
            moreInfoContent: ""
        }
    }

    render() {
        return(
            <Carousel.Item className={this.props.index==0 ? "active" : ""}>
                <img
                    className="d-block h-100"
                    src={FlickrService.getPictureUrl(this.props.item)}
                    alt={this.props.item.title}
                />
                <Carousel.Caption>
                    <h3>{this.props.item.title}<span onClick={this.handleInfoButton}>{" "}{this.state.showMore ? <FontAwesomeIcon icon="caret-up" /> : <FontAwesomeIcon icon="caret-down" /> }</span></h3>
                    <div className={this.state.showMore ? '' : 'hidden'}>
                        {this.state.moreInfoContent}
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
        );
    }

    handleInfoButton = () => {
        if(this.state.showMore){
            this.setState({showMore:false});
        } else {
            if(JSON.stringify(this.state.info) == "{}"){
                FlickrService.getPictureInfo(this.props.item.id,this.props.item.secret).then(result => {
                    this.setState({
                        info:result.data.photo
                    });
                    this.createMoreInfoContent();
                })
            } else {
                this.setState({showMore:true});
            }
        }
    };

    createMoreInfoContent() {
        if(JSON.stringify(this.state.info) != "{}") {
            this.setState({
                showMore:true,
                moreInfoContent:
                    <>
                        <Card.Text>
                            <i>{this.state.info.description._content}</i>
                            <div>Captured {this.state.info.dates.taken}</div>
                            <div>Tags: {this.createTagsContent()}</div>
                        </Card.Text>
                    </>
            });
        }
    }

    createTagsContent = () => {
        let tagsContent = "";
        for (let tag of this.state.info.tags.tag) {
            tagsContent += "#"+tag.raw+" ";
        }
        return tagsContent;
    }
};

export default Picture;
