import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import FlickrService from "../services/FlickrService";
class Picture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showMore:false,
            info: {}
        }
    }



    render() {
        return(
            <Card className="text-center">
                <Card.Img variant="top" src={FlickrService.getPictureUrl(this.props.item)} style={{maxHeight:'90%'}} />
                <Card.Body>
                    <Card.Title>{this.props.item.title}</Card.Title>
                    <button onClick={this.handleInfoButton}>{this.state.showMore ? "Less info..." : "More info..." }</button>
                    <Card className={this.state.showMore ? 'hidden' : ''}>
                        <Card.Text>
                            {JSON.stringify(this.state.info)}
                            {this.state.info.description}
                        </Card.Text>
                    </Card>
                </Card.Body>
            </Card>
        );
    }

    handleInfoButton = () => {
        if(this.state.showMore){
            this.setState({showMore:false});
        } else {
            if(this.state.info == {}){
                FlickrService.getPictureInfo().then(result => {
                    console.log(JSON.stringify(result.data))
                    this.setState({
                        showMore:true,
                        info:result.data
                    });
                })
            } else {
                this.setState({showMore:true});
            }
        }
    };
};

export default Picture;
