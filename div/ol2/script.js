/*
 * OLMapPoints, an OpenLayers tool to share points on a map using the URL hash
 * 
 * TO DOs:
 * 
 * - see Readme.md
 */

// Some global variables
var map;
var click;
var point_type;
var zoom;
var center;

// Used projections
var proj_wgs84 = new OpenLayers.Projection("EPSG:4326");
var proj_sphmer = new OpenLayers.Projection("EPSG:900913");

// Buttons
var btnAddStart = new OpenLayers.Control.Button({
    displayClass: "olControlBtn olControlBtnAddStart",
    title: "Add a start point",
    eventListeners: {
        'activate': add_start_act,
        'deactivate': add_start_deact
    },
    type: OpenLayers.Control.TYPE_TOGGLE
});

var btnAddEnd = new OpenLayers.Control.Button({
    displayClass: "olControlBtn olControlBtnAddEnd",
    title: "Add an end point",
    eventListeners: {
        'activate': add_end_act,
        'deactivate': add_end_deact
    },
    type: OpenLayers.Control.TYPE_TOGGLE
});

var btnCenter = new OpenLayers.Control.Button({
    displayClass: "olControlBtn olControlBtnCenter",
    trigger: center_map_on_btn_click,
    title: "Center map"
})

var btnReset = new OpenLayers.Control.Button({
    displayClass: "olControlBtn olControlBtnReset",
    trigger: reset_points,
    title: "Reset points"
})

var btnOpenOSM = new OpenLayers.Control.Button({
    displayClass: "olControlBtn olControlBtnOpenOSM",
    trigger: open_osm,
    title: "Open OSM"
})

// Point style definitions
var point_style_start = {
    externalGraphic: 'img/arrow.png',
    graphicHeight: 32,
    graphicWidth: 32,
    graphicYOffset: -32
};
var point_style_end = {
    externalGraphic: 'img/cross.png',
    graphicHeight: 32,
    graphicWidth: 32
};
var style_point_start = new OpenLayers.StyleMap({
    "default": point_style_start,
    "select": point_style_start,
    "temporary": point_style_start
}, {
    extendDefault: false
});
var style_point_end = new OpenLayers.StyleMap({
    "default": point_style_end,
    "select": point_style_end,
    "temporary": point_style_end
}, {
    extendDefault: false
});

// Manage the anchor part of the URL with a custom object as a global variable
var hash_object = {
    start: null,
    end: null,
    sep1: "&", // separator between point objects
    sep2: "=", // separator between point name and coordinates

    // Get the start and end hash values from the anchor string as transformed
    // LonLat coordinates
    getURLHash: function() {
        start = this.getHashValue("start");
        end = this.getHashValue("end");

        if (start !== null) {
            this.start = this.getLatLonFromStrings(start);
        }
        if (end !== null) {
            this.end = this.getLatLonFromStrings(end);
        }
    },
    // Get the desired hash value by its key as a simple string
    getHashValue: function(key) {
        var matches = location.hash.match(new RegExp(key + "=([^" + this.sep1 + "]*)"));
        return matches ? matches[1] : null;
    },
    // Splits a string with a coordinate pair and returns it as LonLat
    getLatLonFromStrings: function (coords) {
        coords = coords.split(",");
        lonlat = new OpenLayers.LonLat(
                parseFloat(coords[0]),
                parseFloat(coords[1])
                );

        return lonlat.transform(proj_wgs84, proj_sphmer);
    },
    // Set the start and end hash values in the anchor string from transformed
    // LonLat coordinates
    setURLHash: function() {
        values = [];

        if (this.start !== null) {
            start = this.getLatLonString(this.start);
            values.push(["start", start].join(this.sep2));
        }

        if (this.end !== null) {
            end = this.getLatLonString(this.end);
            values.push(["end", end].join(this.sep2));
        }

        hash = values.join(this.sep1);
        document.location.hash = hash;
        document.URL.replace(/#.*$/, "")
    },
    // Transforms and combines the coordinates of a LatLon in a truncated string
    getLatLonString: function(point) {

        point_string = get_lonlat_string(point)

        return point_string;
    },
    logPoints: function () {
        console.log("start = " + this.start + "; end = " + this.end);
    },
    reset: function() {
        this.start = null;
        this.end = null;
        
        this.setURLHash(); // Resets but # anchor of the URL is kept
              
        // Reset and reload entire page
        //document.location = document.location.host;
    }
};

function get_lonlat(point) {
	lonlat = point.clone();
    lonlat.transform(proj_sphmer, proj_wgs84);

    return lonlat;
}

function get_lonlat_string(point, sep=",", length=5) {

	point = get_lonlat(point);

    lon = Number((lonlat.lon).toFixed(length));
    lat = Number((lonlat.lat).toFixed(length));

    point_string = [lon, lat].join(sep);

    return point_string;
}

///////////////////////////////////////
// Control functions

// Click control
OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {
    defaultHandlerOptions: {
        'single': true,
        'double': false,
        'pixelTolerance': 0,
        'stopSingle': false,
        'stopDouble': false
    },
    initialize: function (options) {
        this.handlerOptions = OpenLayers.Util.extend(
                {},
                this.defaultHandlerOptions
                );

        OpenLayers.Control.prototype.initialize.apply(this, arguments);

        this.handler = new OpenLayers.Handler.Click(
                this,
                {'click': this.trigger},
        this.handlerOptions
                );
    },
    trigger: function (e) {

        var lonlat = map.getLonLatFromPixel(e.xy);

        if (point_type === "start") {
            hash_object.start = lonlat;
        } else if (point_type === "end") {
            hash_object.end = lonlat;
        }
        hash_object.setURLHash();
    }
});

//Create a function for the toggle button
function add_start_act() {
    btnAddEnd.deactivate();
    point_type = "start";
    toogle_act();
}
function add_start_deact() {
    toogle_deact();
}

function add_end_act() {
    btnAddStart.deactivate();
    point_type = "end";
    toogle_act();
}
function add_end_deact() {
    toogle_deact();
}

function toogle_act() {
    //Attach the map_event_function to the map
    map.events.register('click', map);
    click.activate();

    console.log("Activate toggle");
}

function toogle_deact() {
    //Remove the map_event_function from the map
    map.events.unregister('click', map);
    click.deactivate();

    console.log("Deactivate toggle");
}

function center_map_on_btn_click() {
    points = init_points();
    
    if (points.length > 0) {
        center_map_to_points(points);
    } else {
        alert("Please add some points to the map!");
    }
}

function reset_points() {
    points = init_points();
    
    if (points.length > 0) {
        hash_object.reset();
    } else {
        alert("Please add some points to the map!");
    }
}

function open_osm() {

	var center_lonlat = get_lonlat(center)

	var zoomlonlat = [zoom, center_lonlat.lat, center_lonlat.lon]

	window.open("http://www.openstreetmap.org/#map=" + zoomlonlat.join("/"));
}

////////////////////////////////////////////////////////////////////////////////
// Script starts here

var point_start;
var point_end;

function init_map() {

    console.log("Setting up map application");

    // Set up map
    map = new OpenLayers.Map("map");

    var position = new OpenLayers.LonLat(11.51000, 48.12000).transform(proj_wgs84,
            proj_sphmer);
    zoom = 13;

    // Adding map layers for OSM background and vector geometry (points)
    var mapnik = new OpenLayers.Layer.OSM();
    point_start = new OpenLayers.Layer.Vector(
            "point start",
            {styleMap: style_point_start}
    );
    point_end = new OpenLayers.Layer.Vector(
            "point end",
            {styleMap: style_point_end}
    );

    map.addLayer(mapnik);
    map.addLayer(point_start);
    map.addLayer(point_end);

    // Setting up the toolbar
    panel = new OpenLayers.Control.Panel({});
    panel.addControls([
        btnAddStart,
        btnAddEnd,
        btnCenter,
        btnReset,
        btnOpenOSM
    ]);
    map.addControl(panel);

    //map.addControl(new OpenLayers.Control.LayerSwitcher());

    click = new OpenLayers.Control.Click();
    map.addControl(click);

    var start_btn_div = document.getElementsByClassName("olControlBtn olControlBtnAddStartItemInactive")[0];
    start_btn_div.innerHTML = "Start";
    var end_btn_div = document.getElementsByClassName("olControlBtn olControlBtnAddEndItemInactive")[0];
    end_btn_div.innerHTML = "End";
    var center_btn_div = document.getElementsByClassName("olControlBtn olControlBtnCenterItemInactive")[0];
    center_btn_div.innerHTML = "Center";
    var reset_btn_div = document.getElementsByClassName("olControlBtn olControlBtnResetItemInactive")[0];
    reset_btn_div.innerHTML = "Reset";
    var openosm_btn_div = document.getElementsByClassName("olControlBtn olControlBtnOpenOSMItemInactive")[0];
    openosm_btn_div.innerHTML = "Open OSM";

    // Check URL anchor for input points
    points = init_points();

    if (points.length > 0) {
        center = center_map_to_points(points);
        console.log("Map center calculated from points");
    } else {
        map.setCenter(position, zoom);
        center = position;
        console.log("No points available, map centered at " + position);
    }
}

// Point initialization is called everytime the URL hash has been updated as
// defined in index.html
function init_points() {

    points = [];

    console.log("init points");

    hash_object.getURLHash();
    hash_object.logPoints();

    // TO DO:
    // Check if possible to update feature instead of creating and deleting it
    if (hash_object.start !== null) {
        points.push(hash_object.start);
        add_point_to_layer(hash_object.start, point_start, "Start");
    } else {
        point_start.removeAllFeatures();
    }
    if (hash_object.end !== null) {
        points.push(hash_object.end);
        add_point_to_layer(hash_object.end, point_end, "End");
    } else {
        point_end.removeAllFeatures();
    }

    return points;
}

function add_point_to_layer(point, layer, name) {

    point_new = new OpenLayers.Geometry.Point(point.lon, point.lat);

    var attributes = {name: name};
    geom = new OpenLayers.Feature.Vector(point_new, attributes);

    layer.removeAllFeatures();
    layer.addFeatures([geom]);
}

function center_map_to_points(points) {

    console.log(points);

    bounds = new OpenLayers.Bounds();

    for (var i = 0; i < points.length; i++) {
        console.log(points[i])
        bounds.extend(points[i]);
    }

    center = bounds.getCenterLonLat();

    console.log("Centering map at " + center)

    zoom = map.getZoomForExtent(bounds, true) - 1

    map.setCenter(center, zoom);

    return center;
}

function foo() {
    console.log("Foo");
}