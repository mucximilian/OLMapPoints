var map;

// Used projections
var proj_wgs84 = new OpenLayers.Projection("EPSG:4326");
var proj_sphmer = new OpenLayers.Projection("EPSG:900913");

function init() {
    map = new OpenLayers.Map('map_element', {});
    //Create a base layer

    var mapnik = new OpenLayers.Layer.OSM();
    map.addLayer(mapnik);

    // var wms_base = new OpenLayers.Layer.WMS(
    //     'OpenLayers WMS',
    //     'http://vmap0.tiles.osgeo.org/wms/vmap0',
    //     {layers: 'basic'},
    //     {}
    // );
    // map.addLayer(wms_base);

    // SET UP FUNCTIONS
    //
    //Function that the map will call when the map is clicked (only when
    //  the toggle button is active though)
    var map_event_function = function () {
        map.layers[0].setOpacity(Math.random());
        console.log("map event")
    }
    //Create a function for the toggle button
    var toggle_button_activate_func = function () {
        //Attach the map_event_function to the map
        map.events.register('click', map, map_event_function);
    }
    var toggle_button_deactivate_func = function () {
        //Remove the map_event_function from the map
        map.events.unregister('click', map, map_event_function);
        //Restore the layer's opacity
        map.layers[0].setOpacity(1);
    }
    var custom_button_func = function () {
        //Get a random coordinate from -90 to 90
        var random_lon = Math.random() * 180 - 90;
        var random_lat = Math.random() * 180 - 90;

        console.log(random_lon + "," + random_lat)

        var position = new OpenLayers.LonLat(random_lon, random_lat).transform(proj_wgs84, proj_sphmer);

        console.log(position)

        map.setCenter(position, 4);

        console.log(map.getCenter());
    };

    //CREATE CUSTOM BUTTON OBJECT
    var custom_button = new OpenLayers.Control.Button({
        displayClass: 'olControlCustomButton',
        trigger: custom_button_func,
        title: "Blabla"
    })

    //CREATE TOGGLE BUTTON OBJECT
    //
    //Create the toggle button object
    var custom_toggle_button = new OpenLayers.Control.Button({
        displayClass: 'olControlCustomButtonToggle',
        eventListeners: {
            'activate': toggle_button_activate_func,
            'deactivate': toggle_button_deactivate_func
        },
        type: OpenLayers.Control.TYPE_TOGGLE
    })

    // CREATE PANEL
    var control_panel = new OpenLayers.Control.Panel({});

    // Adding buttons to panel
    control_panel.addControls([custom_button])
    control_panel.addControls([custom_toggle_button]);

    //Add the Panel to the map
    map.addControl(control_panel);
    //control_panel.moveTo(new OpenLayers.Pixel(750, 5));

    // Setting panel size
    var panel_css = document.getElementsByClassName('olControlPanel');
    panel_css[0].style.width = "100px";

    // Setting buttton label. Has to be done after adding the button to the panel!
    var custom_button_div = document.getElementsByClassName("olControlCustomButtonItemInactive")[0];
    custom_button_div.innerHTML = "Bla";

    console.log(map.getCenter());

    if (!map.getCenter()) {
        map.zoomToMaxExtent();
        console.log("max")
    }
}