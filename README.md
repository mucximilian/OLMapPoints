# OLMapPoints

A simple OpenLayers web mapping application that allows the user to add points which can then be shared via the hash property of the page URL.

Currently two points named *Start* and *End* can be added by clicking on the map. The hash property with the anchor part of the URL updates itself dynamically to allow the sharing of the location's latitude/longitude coordinates. 

See [here](http://www.w3schools.com/jsref/obj_location.asp) for more information about the URL anchor/hash part.

## How it works

The application page **index.html** can be accessed via a web browser. 

    <URL>/index.html

An [OpenStreetMap](http://www.penstreetmap.org) map is displyed and the user can click on the map. The user can select if he wants to add a point of the type *Start* or *End*. When the toggle button for the point type is activated, the user can click on the map. This adds the Lat/Lon coordinates as hash property to the URL anchor and looks like this:

    <URL>/index.html#start=11.57557,48.13717

Or

    <URL>/index.html#end=11.58675,48.19876

Or

    <URL>/index.html#start=11.57557,48.13717&end=11.58675,48.19876
    
If the site is already accessed with a hash property defined in the URL, the points are automatically displayed on the map already. Clicking anywhere changes the location and updates the hash value again.

## TO DOs
* Functionality to add:
  * Adding a third point type that supports the adding of an arbitrary number of points to the URL anchor
  * Point dragging functionality
  * Export option (e.g. to GeoJSON)
* Update to OpenLayers3
  * Solve interactivity issues (dragging)
    Examples: [Draw and Modify Features](http://openlayers.org/en/v3.12.1/examples/draw-and-modify-features.html), [Custom controls](http://openlayers.org/en/v3.5.0/examples/custom-controls.html)
  * Add location search
    Examples: [Nominatim search](http://jsfiddle.net/TimLucas/vbaupe30/5/), [Nominatim](http://wiki.openstreetmap.org/wiki/Nominatim)

* * *
License: GNU GENERAL PUBLIC LICENSE
