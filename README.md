# MMM-WorldTides

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror).

It presents low and high water time predictions for given tide stations. Data is pulled from [WorldTides](https://www.worldtides.info/). A valid user account is required to pull data. 1000 request per month are free, more requests would require a monthly fee.

## Installation
Open a terminal session, navigate to your MagicMirror's `modules` folder and execute `git clone https://github.com/yawnsde/MMM-WorldTides.git`, a new folder called MMM-WorldTides will be created.

Activate the module by adding it to the config.js file as shown below.

## Using the module
````javascript
modules: [
{
  module: 'MMM-WorldTides',
  position: 'top_right',
  config: {
    longitude: '', //longitude and latitude need to be written with . instead of ,
    latitude: '',
    appid: '' //appid needs to be requested from worldtides.info
  },
}
````

## Configuration options

The following properties can be configured:

| **Option** | **Values** | **Description** |
| --- | --- | --- |
| `longitude` | <b>REQUIRED</b> | The simplest way to get longitude and latitude is to visit [WorldTides](http://www.worldtides.info), enter the city you want to add and the website will return the nearest station to your request. Please write down longitude and latitude with . instead of , |
| `latitude` | <b>REQUIRED</b> | see above |
| `appid` | <b>REQUIRED</b> | The [WorldTides API Key](https://www.worldtides.info/developer), which can be obtained by creating an account. |
| `length` | Default: `172800` (2 days)<br>Maximum: `604800` (7 days) | The amount of days to be retrieved, provided in seconds. |
| `hightideSymbol` | Default: `'fa fa-upload'` | A custom css value to change the symbol for flood. You can use symbols like `'wi weathericon wi-flood'` [WeatherIcons](https://erikflowers.github.io/weather-icons/), `'fa fa-level-up'` [fontawesome](http://fontawesome.io/icons/) |
| `lowtideSymbol` | Default: `'fa fa-download'` | A custom css value to change the symbol for ebb. |
