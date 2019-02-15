# WebPhotoMap
Webapp to add photos as pins to US States map. 

Live demo: https://web-photo-map.herokuapp.com

## Required files (to be added manually)

### Flickr configuration

Create a file *src/resources/flickr_config.json* and add your Flickr API_KEY as follows:

    {
     "api_key" : "YOUR_API_KEY"
    }

If you don't have a Flickr API key, you can ask one for free here: https://www.flickr.com/services/api/misc.api_keys.html

### States configuration

To display your own Flickr album from each states, you must create a file */resources/states_info.json* and add:
- a "visited" value that contains a key/valkue pair for each state, with the State abreviation as the key and the flickr album id as value,
- a "crossed" array that contains the list of State abreviations (those that you visited but don't have a gallery to display for).

This file content should look like this (with an entry for each state you want to diplay a gallery for or mark as crossed):

    {
       "visited" : {
          "AZ": "ARIZONA_ALBUM_ID",
          "CA": "CALIFORNIA_ALBUM_ID",
          "MD": "MARYLAND_ALBUM_ID"
       },
       "crossed" : ["ID","MI"]
    }


To find the album id, just open your album on Flickr and get the id that is at the end of the URL:

www.flickr.com/photos/your_username/albums/`ALBUM_ID`

## Run the app

To run the app locally, **after you added required files**, you need to have node and yarn installed, then you can run

    npm install
    yarn build
    serve -s build

You can also easily deploy to Heroku by hosting the app on a github repository and linking this repository on the Heroku interface, then simply deploy and you're good to go!

## Optional configuration

### State colors

You can edit the file *src/resources/app_config.json* and change the colors to your taste.

## Next development steps

- Add world map and an album for each country
- Integrate map into Wordpress