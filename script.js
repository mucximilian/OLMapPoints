// Projections
var proj_wgs84 = new OpenLayers.Projection("EPSG:4326");
var proj_sphmer = new OpenLayers.Projection("EPSG:900913");

// Stores the anchor part of the URL as a custom object
var hash_object = {
  start: null,
  end: null,
  setStart: function(lon, lat) {
    this.start = lon + "," + lat
  },
  setEnd: function(lon, lat) {
    this.end = lon + "," + lat
  },
  getURLHash: function() {
    this.start = this.getHashValue("start");
    this.end = this.getHashValue("end");
  },
  setURLHash: function() {
    values = []
    sep1 = ";"
    sep2 = "="

    if (this.start != null)  {
      values.push(["start", this.start].join(sep2))
    }
    if (this.end != null)  {
      values.push(["end", this.end])
    }

    hash = values.join(sep1)
    document.location.hash = hash
  },
  getHashValue: function(key) {
    var matches = location.hash.match(new RegExp(key+"=([^;]*)"));
    return matches ? matches[1] : null;
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
      
      lonlat.transform(proj_sphmer, proj_wgs84);

      start_lon = Number((lonlat.lon).toFixed(5))
      start_lat = Number((lonlat.lat).toFixed(5))

      hash_object.setStart(start_lon, start_lat)
      hash_object.setURLHash()

      hash_object.logPoints()
  }

});

////////////////////////////////////////////////////////////////////////////////
// Script starts here

function init_map() {

  // Check URL anchor for input points
  init_points();

  // Set up map
  map = new OpenLayers.Map("basicMap");
  var mapnik = new OpenLayers.Layer.OSM();
  var position = new OpenLayers.LonLat(11.51,48.12).transform(proj_wgs84, 
    proj_sphmer);
  var zoom = 13; 

  map.addLayer(mapnik);
  map.setCenter(position, zoom );

  var click = new OpenLayers.Control.Click();
  map.addControl(click);
  click.activate();
}

function init_points() {
  hash_object.getURLHash()
  hash_object.logPoints()
}

function foo() {
  console.log("Foo")
}