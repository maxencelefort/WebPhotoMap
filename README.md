# WebPhotoMap
Webapp to display photos galleries on map regions. Based on [react-jvectormap](https://github.com/kadoshms/react-jvectormap).

Live demo: https://web-photo-map.herokuapp.com

## Required files (to be added manually)

### Flickr configuration

Create a file *src/resources/flickr_config.json* and add your Flickr API_KEY and USER_ID as follows:

    {
      "api_key" : "YOUR_API_KEY",
      "user_id" : "YOUR_USER_ID"
    }

If you don't have a Flickr API key, you can ask one for free here: https://www.flickr.com/services/api/misc.api_keys.html

### Regions configuration

To display your own Flickr album from each region, you must create a file */resources/countries_info.json* and add:
- a "visited" value that contains a key/value pair for each region, with the country code as the key and the flickr album id as value,
- a "crossed" array that contains the list of country codes (those that you visited but don't have a gallery to display for).

This file content should look like this (with an entry for each region you want to diplay a gallery for or mark as crossed):

    {
      "title" : "Main map",
      "vectorMap" : "[MAP]",
      "submap" : false,
      "regions": {
        "visited": {
          "REGION_CODE": "ALBUM_ID",
          "REGION_CODE": "ALBUM_ID",
          "REGION_CODE": "ALBUM_ID",
          "REGION_CODE": {
            "title": "Sub Map",
            "vectorMap": "[MAP]",
            "submap": true,
            "regions": {
              "prefix": "[PREFIX - OPTIONAL]",
              "visited": {
                "REGION_CODE": "ALBUM_ID",
                "REGION_CODE": "ALBUM_ID"
              },
              "crossed": [
                "REGION_CODE",
                "REGION_CODE",
                "REGION_CODE"
              ]
            }
          }
        },
        "crossed": [
          "REGION_CODE",
          "REGION_CODE"
        ]
      }
    }


To find the album id, just open your album on Flickr and get the id that is at the end of the URL:

www.flickr.com/photos/your_username/albums/`ALBUM_ID`

At this time, here is the list of vectorMaps that are supported by [react-jvectormap](https://github.com/kadoshms/react-jvectormap) (check this link for updates to the list or to ask for a new map)

* world_mill
* us_aea
* europe_mill
* continents_mill
* ch_mill
* oceania_mill
* africa_mill
* asia_mill
* north_america_mill
* south_america_mill
* ca_lcc
* brazil

#### Sub Maps

If you have visited many parts of a specific country, you can display a sub-map for this specific country. 
To display a sub map for a specific country, simply replace the album id in your */resources/regions_info.json* file and put another regions object (see previous example), for example if you want a World map and an USA sub map:

    {
      "title" : "World Photo Map",
      "vectorMap" : "world_mill",
      "submap" : false,
      "regions": {
        "visited": {
          "CA": "CANADA_ALBUM_ID",
          "FR": "FRANCE_ALBUM_ID",
          "US": {
            "title": "United States Photo Map",
            "vectorMap": "us_aea",
            "submap": true,
            "regions": {
              "prefix": "US-",
              "visited": {
                "CO": "COLORADO_ALBUM_ID",
                "MD": "MARYLAND_ALBUM_ID",
                "UT": "UTAH_ALBUM_ID"
              },
              "crossed": [
                "DC",
                "WY"
              ]
            }
          }
        },
        "crossed": [
          "TR",
          "IT"
        ]
      }
    }

That's it! When you click the USA region, a sub map will appear instead of a gallery!

Note: the "prefix" attribute is used to match the region code in your JSON with the one returned from the map data. For example the "us_aea" map adds the "US-" prefix before States code ("UT" becomes "US-UT"). You could also remove the prefix attribute and edit your *regions-info.json* file to add the prefix to each state.

## Run the app

To run the app locally, **after you added required files**, you need to have node and yarn installed, then you can run

    npm install
    yarn build
    serve -s build

You can also easily deploy to Heroku by hosting the app on a github repository and linking this repository on the Heroku interface, then simply deploy and you're good to go!

## Integrate into your website

Once it's hosted (on heroku for example) you can easily integrate the map to your website using and *iframe*  :
    
    <iframe src="[LINK_TO_YOUR_MAP]" frameborder="0" scrolling="no"></iframe> 

This is the iframe tag I used to integrate into my personal Wordpress blog:

    <iframe style="width: 100%; min-height: 600px !important;" src="https://web-photo-map.herokuapp.com" frameborder="0" scrolling="no"></iframe>

## Optional configuration

### Region colors

You can edit the file *src/resources/app_config.json* and change the colors to your taste.

## Next development steps

- Add unit testing