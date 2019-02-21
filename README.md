# WebPhotoMap
Webapp to add photos as pins to a World map. 

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

This file content should look like this (with an entry for each state you want to diplay a gallery for or mark as crossed):

    {
      "visited" : {
        "FR": "FRANCE_ALBUM_ID",
        "CA": "CANADA_ALBUM_ID",
        "US": "[OPTIONAL_US_ALBUM_ID]"
      },
      "crossed" : ["TR","IT"]
    }


To find the album id, just open your album on Flickr and get the id that is at the end of the URL:

www.flickr.com/photos/your_username/albums/`ALBUM_ID`

#### Sub Maps

If you have visited many parts of a specific country, you can display a sub-map for this specific country. For now, it only works for the USA, but the idea is to make it available for any country in the futur. 

To display a sub map for a specific country, simply remove the album id in your */resources/countries_info.json* file and leave an empty string, for example if you want to display an USA sub map:

    {
          "visited" : {
            "FR": "FRANCE_ALBUM_ID",
            "CA": "CANADA_ALBUM_ID",
            "US": ""
          },
          "crossed" : ["TR","IT"]
    }

Then you need to configure this specific sub map. Note that this procedure is going to evolve when multiple sub maps will be implemented.

Create a */resources/us_states_info.json* file and populate it with the states visited/crossed, the format is the same as for the country configuration file:

    {
        "visited" : {
            "AZ": "ARIZONA_ALBUM_ID",
            "CA": "CALIFORNIA_ALBUM_ID",
            "MD": "MARYLAND_ALBUM_ID"
        },
        "crossed" : ["ID","MI"]
    }
    
That's it! When you click the USA region, a sub map will appear instead of a gallery!

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

- Add more country possibilities for the sub map
- Integrate map into Wordpress