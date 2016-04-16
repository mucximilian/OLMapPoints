var map = new ol.Map({
  target: 'map',
  layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })],
  view: new ol.View({
    center: ol.proj.fromLonLat([11.52, 48.08]),
    zoom: 14
  })
});