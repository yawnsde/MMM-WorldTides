WORK IN PROGRESS!

# MMM-Tides

This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror).

It presents low and high water time predictions for given tide stations. Data is pulled from [WorldTides](https://www.worldtides.info/). A valid user account is required to pull data. 1000 request per month are free, more requests would require a monthly fee.

## Using the module
````javascript
modules: [
{
  module: 'MMM-Tides',
  position: 'top-right',
  config: {
    longitude: '', //longitude and latitude need to be written with . instead of ,
    latitude: '',
    appid: '' //appid needs to be requested from worldtides.info
  }
}
````

## Configuration options

The following properties can be configured:

<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
	
		<tr>
			<td><code>longitude</code></td>
			<td>The simplest way to get longitude and latitude is to visit http://www.worldtides.info, enter the city you want to add and the website will return the nearest station to your request. Please write down longitude and latitude with . instead of ,<br>
				<br> This value is <b>REQUIRED</b></code>
			</td>
		</tr>
		<tr>
			<td><code>latitude</code></td>
			<td>see above<br>
				<br> This value is <b>REQUIRED</b></code>
			</td>
		</tr>
		<tr>
			<td><code>appid</code></td>
			<td>The <a href="https://www.worldtides.info/developer" target="_blank">Worldtides</a> API key, which can be obtained by creating an account.<br>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>displayName</code></td>
			<td>If you want to display a name for your tidal station instead of longitude and latitude. This field is optional.
			</td>
		</tr>
		<tr>
			<td><code>length</code></td>
			<td>The amount of days to be retrieved, provided in seconds.<br>
				<br><b>Maximum value:</b> <code>604800</code> (7 days)
				<br><b>Default value:</b>  <code>172800</code>(2 days)
			</td>
		</tr>
	</tbody>
</table>
