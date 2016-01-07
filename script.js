var map;

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

// Projections
var proj_wgs84 = new OpenLayers.Projection("EPSG:4326");
var proj_sphmer = new OpenLayers.Projection("EPSG:900913");

// Stores the anchor part of the URL as a custom object
var hash_object = {
  start: null,
  end: null,
  getURLHash: function() {
    start = this.getHashValue("start");
    end = this.getHashValue("end");

    if (start != null) {
      this.start = this.getLatLonFromStrings(start);
    }
    if (end != null) {
      this.end = this.getLatLonFromStrings(end);
    }
  },
  setURLHash: function() {
    values = []
    sep1 = ";"
    sep2 = "="

    if (this.start != null)  {
      start = hash_object.getLatLonString(this.start)
      values.push(["start", start].join(sep2))
    }

    if (this.end != null)  {
      end = getLatLonString(this.end)
      values.push(["end", end].join(sep2))
    }

    hash = values.join(sep1)
    document.location.hash = hash
  },
  getHashValue: function(key) {
    var matches = location.hash.match(new RegExp(key+"=([^;]*)"));

    return matches ? matches[1] : null;
  },
  getLatLonFromStrings: function(coords) {
    coords = coords.split(",");
    lonlat = new OpenLayers.LonLat(
        parseFloat(coords[0]),
        parseFloat(coords[1])
      )

    return lonlat.transform(proj_wgs84, proj_sphmer);
  },
  getLatLonString: function(point) {

    lonlat = point.clone();
    lonlat.transform(proj_sphmer, proj_wgs84);

    lon = Number((lonlat.lon).toFixed(5));
    lat = Number((lonlat.lat).toFixed(5));

    point_string = [lon, lat].join(",");

    return point_string;
  },
  logPoints: function() {
    console.log(this.start);
    console.log(this.end);
  }
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

  initialize: function(options) {
      this.handlerOptions = OpenLayers.Util.extend({}, 
        this.defaultHandlerOptions
      );
      OpenLayers.Control.prototype.initialize.apply(this, arguments); 
      this.handler = new OpenLayers.Handler.Click(
        this, 
        {'click': this.trigger}, 
        this.handlerOptions
      );
  }, 

  trigger: function(e) {
      
      var lonlat = map.getLonLatFromPixel(e.xy);

      hash_object.start = lonlat;
      hash_object.setURLHash();
  }

});

////////////////////////////////////////////////////////////////////////////////
// Script starts here

var point_start
var point_end

function init_map() {

  // Set up map
  map = new OpenLayers.Map("basicMap");

  var position = new OpenLayers.LonLat(11.51,48.12).transform(proj_wgs84, 
    proj_sphmer);
  var zoom = 13; 
  
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

  map.setCenter(position, zoom);

  // Check URL anchor for input points
  init_points();

  //map.addControl(new OpenLayers.Control.LayerSwitcher());

  var click = new OpenLayers.Control.Click();
  map.addControl(click);
  click.activate();
}

function init_points() {

  console.log("init points")

  hash_object.getURLHash()
  //hash_object.logPoints()

  // TO DO:
  // Create function for true cases
  // Check if possible to update feature instead of creating and deleting it
  if (hash_object.start != null) { 

    point = new OpenLayers.Geometry.Point(
      hash_object.start.lon, hash_object.start.lat)

    var attributes = {name: "my name", bar: "foo"};
    geom = new OpenLayers.Feature.Vector(point, attributes);

    point_start.removeAllFeatures();
    point_start.addFeatures([geom]);
  }
  if (hash_object.end != null) {
    point_end.addFeatures([hash_object.end]);
  }  
}

function foo() {
  console.log("Foo")
}