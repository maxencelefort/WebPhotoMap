import Gallery from './Gallery';
import React, { Component } from "react";
import ReactModal from 'react-modal';

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
                <Gallery album_id={this.props.album_id} />
            </ReactModal>
        )
    }
}

export default GalleryModal;