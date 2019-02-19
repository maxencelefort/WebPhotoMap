import axios from 'axios'
import config from '../resources/flickr_config.json';

class FlickrService {
    static flickr_api_path = "https://api.flickr.com/services/rest/";
    static ALBUM_REQUEST = "flickr.photosets.getPhotos";
    static ALBUM_INFO_REQUEST = "flickr.photosets.getInfo";
    static PHOTO_INFO_REQUEST = "flickr.photos.getInfo";
    static PHOTO_LOCATION_REQUEST = "flickr.photos.geo.getLocation";


    static buildFlickrApiUrlGet(request_type, params){
        return this.flickr_api_path + "?method=" + request_type + this.paramsToUrl(params) + "&api_key="+config.api_key+"&format=json&nojsoncallback=1";
    }

    static paramsToUrl(params){
        let url_params = "";
        params.forEach(function (param) {
            url_params += "&"+param.name+"="+param.value;
        });
        return url_params;
    }

    static getGallery(galleryId ){
        const params = [{name : "photoset_id", value : galleryId},{name : "user_id", value : config.user_id}];
        return axios.get(this.buildFlickrApiUrlGet(this.ALBUM_REQUEST,params));
    }

    static getPictureUrl(picture){
        return "https://farm"+picture.farm+".staticflickr.com/"+picture.server+"/"+picture.id+"_"+picture.secret+"_b.jpg";
    }

    static getGalleryInfo(galleryId){
        const params = [{name : "photoset_id", value : galleryId},{name : "user_id", value : config.user_id}];
        return axios.get(this.buildFlickrApiUrlGet(this.ALBUM_INFO_REQUEST,params));
    }

    static getPictureInfo(photoId, secret){
        const params = [{name : "photo_id", value : photoId},{name : "secret", value : secret}];
        return axios.get(this.buildFlickrApiUrlGet(this.PHOTO_INFO_REQUEST,params));
    }

    static getPictureLocation(photoId, secret){
        const params = [{name : "photo_id", value : photoId},{name : "secret", value : secret}];
        return axios.get(this.buildFlickrApiUrlGet(this.PHOTO_LOCATION_REQUEST,params));
    }
}
export default FlickrService;
