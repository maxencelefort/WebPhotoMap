# WebPhotoMap
Webapp to add photos as pins to maps

## Files to add:

### Flickr configuration

Create a file */resources/flickr_config.json* and add your Flickr API_KEY as follows:

  `{
     "api_key" : "YOUR_API_KEY"
  }`

### States configuration

To display your own Flickr album from each states, you must create a file */resources/visited_states.json* and add a key/valkue pair for each state, with the State abreviation as the key and the flickr album id as value. This file content should look like this (with an entry for each state you want to diplay a gallery for):

`{
  "AZ": "ARIZONA_ALBUM_ID",
  "CA": "CALIFORNIA_ALBUM_ID",
  "MD": "MARYLAND_ALBUM_ID"
}
`

To find the album id, just open your album on Flickr and get the id that is at the end of the URL:

www.flickr.com/photos/your_username/albums/`ALBUM_ID`

## Run the app

To run the app, you need to have node installed, then you can run

`npm start`
