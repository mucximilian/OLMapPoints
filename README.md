# OLMapPoints

A simple OpenLayers web mapping application that allows the user to add points which can then be shared via the URL. Currently only one point can be added by clicking on the map. The hash property with the anchor part of the URL updates itself dynamically to allow the sharing of a LatLon location. See [here](http://www.w3schools.com/jsref/obj_location.asp) for more information about the URL anchor/hash part.

## How it works

The application page **index.html** can be accessed via a web browser. 

    <URL>/index.html

An [OpenStreetMap](http://www.penstreetmap.org) map is displyed and the user can click on the map. The user can select if he wants to add a start or an end point. When the toggle button for the type is activated, the user can click on the map. This adds the Lat/Lon coordinates as hash property to the URL anchor and looks like this:

    <URL>/index.html#start=11.57557,48.13717

Or

    <URL>/index.html#end=11.58675,48.19876

Or
    <URL>/index.html#start=11.57557,48.13717;end=11.58675,48.19876
    
If the site is already accessed with a hash property, the point is automatically displayed on the map already. Clicking anywhere changes the location and updates the hash value again.

## TO DOs
* Add an arbitrary number of points in between to the URL anchor
* Add user interactivity to select which point to add
* Point dragging functionality
* Update to OpenLayers3 which would solve some interactivity issues (dragging)

* * *
License: GNU GENERAL PUBLIC LICENSE
