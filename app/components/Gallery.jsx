import Picture from './Picture';
import React, { Component } from "react";
import FlickrService from "./FlickrService";

class Gallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ready : false,
      pictureItems : [],
    }
  }
  
  render() {
    return (
      <div>
        {this.state.ready ? (
            this.state.pictureItems
        ) : (
            <h1>Loading...</h1>
        )}
      </div>
    );
  }

  closeModal = () => {
    this.props.closeHandler();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.album_id!==this.props.album_id){
      this.setState({ready:false, pictureItems : []});
      this.updatePictureList();
    }
  }
  componentWillMount() {
    this.updatePictureList();
  }
  
  parseList(result){
    const pictures = [];
    Promise.all(result.map((item) => {
      pictures.push(<Picture key={item.id} item={item} />);
    })).then(result => {
      this.setState({
        ready : true,
        pictureItems: pictures
      })
    });
  }

  updatePictureList() {
    FlickrService.getGallery(this.props.album_id).then(response => {
      this.parseList(response.data.photoset.photo.slice(0,10));
    })
    .catch(error => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }
};

export default Gallery;
