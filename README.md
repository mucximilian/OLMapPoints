# OLMapPoints
A simple OpenLayers web mapping application that allows the user to add points which can then be shared via the URL. Currently only one point can be added by clicking on the map. The hash property with the anchor part of the URL updates itself dynamically to allow the sharing of a LatLon location. See [here](http://www.w3schools.com/jsref/obj_location.asp) for more information about the URL anchor/hash part.

The *index.html* file can be tested here:

    https://cdn.rawgit.com/mucximilian/OLMapPoints/master/index.html

An example for an added hash property at the URL anchor looks like this:

    https://cdn.rawgit.com/mucximilian/OLMapPoints/master/index.html#start=11.57557,48.13717

## TO DOs:
* Adding more points to the URL anchor (i.e. start point, end point and an arbitrary number of points in between)
* Implementing point dragging

* * *
License: GNU GENERAL PUBLIC LICENSE
