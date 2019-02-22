import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import FlickrService from "../services/FlickrService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class PictureCaption extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: {},
            moreInfoContent: ""
        }
    }

    render() {
        return(
            <>
                <h3>{this.props.item.title}<span onClick={this.handleInfoButton}>{" "}{this.props.show ? <FontAwesomeIcon icon="caret-up" /> : <FontAwesomeIcon icon="caret-down" /> }</span></h3>
                <div className={this.props.show ? '' : 'hidden'}>
                    {this.state.moreInfoContent}
                </div>
            </>
        );
    }

    handleInfoButton = () => {
        if(this.props.show){
            this.props.handleShowMore();
        } else {
            if(JSON.stringify(this.state.info) === "{}"){
                FlickrService.getPictureInfo(this.props.item.id,this.props.item.secret).then(result => {
                    this.setState({
                        info:result.data.photo
                    });
                    this.createMoreInfoContent();
                })
            } else {
                this.props.handleShowMore();
            }
        }
    };

    createMoreInfoContent() {
        if(JSON.stringify(this.state.info) !== "{}") {
            this.props.handleShowMore();
            this.setState({
                moreInfoContent:
                    <Card.Text>
                        <i>{this.state.info.description._content}</i>
                        <div>Date captured: {this.state.info.dates.taken}</div>
                        <div>{this.createTagsContent()}</div>
                    </Card.Text>
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

export default PictureCaption;
