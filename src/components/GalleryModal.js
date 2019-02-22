import Gallery from './Gallery';
import React, { Component } from "react";
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class GalleryModal extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ReactModal isOpen={this.props.show} onRequestClose={this.props.closeHandler}
                        style={{
                            overlay: {
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                            },
                            content: {
                                backgroundColor: 'black',
                                overflow: 'auto',
                                textAlign: 'center',
                                color: 'white'
                            }
                        }}>
                <FontAwesomeIcon onClick={this.props.closeHandler} className={"windowCloseButton"} icon="window-close" />
                <Gallery album_id={this.props.album_id} width={this.props.width} height={this.props.height} errorHandler={this.props.errorHandler}/>
            </ReactModal>
        )
    }
}

export default GalleryModal;