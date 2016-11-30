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
  }
}
````

## Configuration options

The following properties can be configured:

| **Option** | **Values** | **Description** |
| --- | --- | --- |
| longitude | This value is <b>REQUIRED</b> | The simplest way to get longitude and latitude is to visit http://www.worldtides.info, enter the city you want to add and the website will return the nearest station to your request. Please write down longitude and latitude with . instead of , |
| latitude | This value is <b>REQUIRED</b> | see above |
| appid | This value is <b>REQUIRED</b> | The <a href="https://www.worldtides.info/developer" target="_blank">Worldtides</a> API key, which can be obtained by creating an account. |
| length | Default: <code>172800</code> (2 days)<br>Maximum: <code>604800</code> (7 days) | The amount of days to be retrieved, provided in seconds. |
| hightideSymbol | Default: <code>'fa fa-upload'</code> | A custom css value to change the symbol for flood. You can use symbols like <code>'wi weathericon wi-flood'</code> (from https://erikflowers.github.io/weather-icons/), <code>'fa fa-level-up'</code> (from http://fontawesome.io/icons/) |
| lowtideSymbol | Default: <code>'fa fa-download'</code> | A custom css value to change the symbol for ebb. |
