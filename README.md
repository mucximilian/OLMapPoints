# OLMapPoints

A simple OpenLayers web mapping application that allows the user to add points which can then be shared via the URL. Currently only one point can be added by clicking on the map. The hash property with the anchor part of the URL updates itself dynamically to allow the sharing of a LatLon location. See [here](http://www.w3schools.com/jsref/obj_location.asp) for more information about the URL anchor/hash part.

## Function

The application page **index.html** can be accessed via a web browser. 

    https://...<url>.../index.html

An [OpenStreetMap](http://www.penstreetmap.org) map is displyed and the user can click on the map. This adds the Lat/Lon coordinates as hash property to the URL anchor and looks like this:

    https://...<url>.../index.html#start=11.57557,48.13717
    
If the site is already accessed with a hash property, the point is automatically displayed on the map already. Clicking anywhere changes the location and updates the hash value again.

## TO DOs:
* Adding more points to the URL anchor (i.e. start point, end point and an arbitrary number of points in between)
* Implementing point dragging

* * *
License: GNU GENERAL PUBLIC LICENSE
