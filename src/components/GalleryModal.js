import Modal from 'react-bootstrap/Modal';
import Gallery from './Gallery';
import React, { Component } from "react";

class GalleryModal extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Modal
                show={this.props.display_gallery}
                onHide={this.props.closeHandler}
                dialogClassName="modal-90w"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Gallery album_id={this.props.album_id} closeHandler={this.closeHandler}/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default GalleryModal;