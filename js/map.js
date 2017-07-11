let map;
let markers = [];
let markerCluster;
let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let neighbourhoods = {
  arbutus : {lat: 49.256571, lng: -123.155374},
  downtown : {lat: 49.282560, lng: -123.118895},
  dunbarsouthlands : {lat: 49.2357, lng: -123.1888},
  fairview : {lat: 49.2660, lng: -123.1289},
  grandviewwoodland : {lat: 49.2697, lng: -123.0697},
  hastingssunrise : {lat: 49.2811, lng: -123.0441},
  kensingtoncedarcottage : {lat: 49.2484, lng: -123.0701},
  kerrisdale : {lat: 49.2341, lng: -123.1554},
  killarney : {lat: 49.2247, lng: -123.0411},
  kitsilano : {lat: 49.2709, lng: -123.1621},
  marpole : {lat: 49.210837, lng: -123.134088},
  mountpleasant : {lat: 49.258811, lng: -123.107480},
  musqueam : {lat: 49.2250, lng: -123.1922},
  oakridge : {lat: 49.2298, lng: -123.1162},
  renfrewcollingwood : {lat: 49.2411, lng: -123.0388},
  rileypark : {lat: 49.2433, lng: -123.1045},
  shaughnessy : {lat: 49.2453, lng: -123.1413},
  southcambie : {lat: 49.2452, lng: -123.1208},
  stanleypark : {lat: 49.3017, lng: -123.1417},
  strathcona : {lat: 49.2738, lng: -123.0885},
  sunset : {lat: 49.223181, lng: -123.100444},
  victoriafraserview : {lat: 49.2185, lng: -123.0659},
  westend : {lat: 49.2856, lng: -123.1306},
  westpointgrey : {lat: 49.2610, lng: -123.2001}
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: 49.2427, lng: -123.1207},
    zoom: 13
  });

  new AutocompleteDirectionsHandler(map);
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}

var opt = {
           "legend": {
              "Vehicle Collision" : "#d80019",
              "Theft from Vehicle" : "#4fcce2",
              "Theft of Vehicle" : "#000000"
             }
         };


function addMarker(props){
   var marker = new google.maps.Marker({
     position:props.coords,
     map:map,
     title: props['type_crime']
     // icon:props.iconImage
   });
   if(props.iconImage){
     marker.setIcon(props.iconImage);
   }

   //check content
   if(props.content){
     var infoWindow = new google.maps.InfoWindow({
       content:props.content
     });
     marker.addListener('click', function(){
       infoWindow.open(map, marker);
     })
   }
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
  deleteClusters();
  // opt = {};
  deleteLegend();
}

function deleteClusters(){
  if (typeof markerCluster !== 'undefined'){
    markerCluster.clearMarkers();
  }
}

function deleteLegend(){
  $("div[style='margin-right: 5px; background-color: rgba(255, 255, 255, 0.9); padding: 10px; width: 123px; z-index: 0; position: absolute; top: 0px; right: 0px;']").remove();
}
// AUTOCOMPLETE DIRECTIONS
function AutocompleteDirectionsHandler(map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'DRIVING';
  var originInput = document.getElementById('origin-input');
  var destinationInput = document.getElementById('destination-input');
  // var modeSelector = document.getElementById('mode-selector');
  this.directionsService = new google.maps.DirectionsService;
  this.directionsDisplay = new google.maps.DirectionsRenderer;
  this.directionsDisplay.setMap(map);

  var originAutocomplete = new google.maps.places.Autocomplete(
      originInput, {placeIdOnly: true});
  var destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput, {placeIdOnly: true});

  // this.setupClickListener('changemode-walking', 'WALKING');
  // this.setupClickListener('changemode-transit', 'TRANSIT');
  // this.setupClickListener('changemode-driving', 'DRIVING');

  this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
  this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
  this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
  // this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function(id, mode) {
  var radioButton = document.getElementById(id);
  var me = this;
  radioButton.addEventListener('click', function() {
    me.travelMode = mode;
    me.route();
  });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function(autocomplete, mode) {
  var me = this;
  autocomplete.bindTo('bounds', this.map);
  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.place_id) {
      window.alert("Please select an option from the dropdown list.");
      return;
    }
    if (mode === 'ORIG') {
      me.originPlaceId = place.place_id;
    } else {
      me.destinationPlaceId = place.place_id;
    }
    me.route();
  });

};

AutocompleteDirectionsHandler.prototype.route = function() {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route({
    origin: {'placeId': this.originPlaceId},
    destination: {'placeId': this.destinationPlaceId},
    travelMode: this.travelMode
  }, function(response, status) {
    if (status === 'OK') {
      me.directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
};

$(document).ready(function(){
    // Red light camera show button
   $('#red-light-camera-button').click(function(){
     deleteMarkers();
     let hold = window.testList;
     for(var x = 0; x < hold.length; x++){
       let single = hold[x]
       single['iconImage'] = 'images/cam.png';
       single['coords'] = {'lat': `${single["latitude"]}`,'lng': `${single["longitude"]}`}
       single['coords']['lat'] = parseFloat(single['coords']['lat']);
       single['coords']['lng'] = parseFloat(single['coords']['lng']);
       single['content'] = '<h4>Red Light Camera</h4>';
       addMarker(single);
     }
   });

   // Accident show button
  //  $('#accident-button').click(function(){
  //    deleteMarkers();
  //   //  let hold = window.testList;
  //   // console.log(window.accidentList[0]);
  //   let hold = window.accidentList;
  //   for(var x = 0; x < hold.length; x++){
  //     let single = hold[x]
  //     single['iconImage'] = 'images/accident.png';
  //     single['coords'] = {'lat': `${single["latitude"]}`,'lng': `${single["longitude"]}`}
  //     single['coords']['lat'] = parseFloat(single['coords']['lat']);
  //     single['coords']['lng'] = parseFloat(single['coords']['lng']);
  //     single['content'] = `Crash Count: ${single.crash_count} | Type:${single.crash_type}`;
  //     addMarker(single);
  //   }
  //   markerCluster = new MarkerClusterer(map, markers, opt);
  //  });
  //   markerCluster = new MarkerClusterer(map, markers,
  //             {imagePath: 'images/m'});
  //  });
   $('#crime-button').click(function(){
    deleteMarkers();
    let area;
    let tempFilter;
    let hold = [];
    // if ($("input:checkbox[name='Tov']").is(':checked') && $("input:checkbox[name='Tfv']").is(':checked')){
    //   tempFilter = window.crimeList;
    // }

    if ($("input:checkbox[name='Tov']").is(':checked')) {
      tempFilter = window.crimeList.filter(function (el) {
        return el.type_crime === "Theft of Vehicle"
      });
    }
    if (typeof tempFilter !== 'undefined'){
      for (let i = 0; i<tempFilter.length; i++){
        hold.push(tempFilter[i]);
      }
    }

    if ($("input:checkbox[name='Tfv']").is(':checked')) {
      tempFilter = window.crimeList.filter(function (el) {
        return el.type_crime === "Theft from Vehicle"
      });
    }
    if (typeof tempFilter !== 'undefined'){
      for (let i = 0; i<tempFilter.length; i++){
        hold.push(tempFilter[i]);
      }
    }
    if ($("input:checkbox[name='Dov']").is(':checked')) {
      tempFilter = window.crimeList.filter(function (el) {
        return el.type_crime === "Vehicle Collision"
      });
    }
    if (typeof tempFilter !== 'undefined'){
      for (let i = 0; i<tempFilter.length; i++){
        hold.push(tempFilter[i]);
      }
    }

    area = $('#neighbourhood')[0];
    area = area.options[area.selectedIndex].value;

    if (area != 'All'){
        hold = hold.filter(function (el) {
        return el.neighbourhood === area;
      });
    }

    let basicValues = $("#slider").rangeSlider("values");

    let minMonth = basicValues['min'];
    let maxMonth = basicValues['max'];
    let monthHolder = [];

    for (i = minMonth; i <= maxMonth; i++){
     for(let x = 0; x < hold.length; x++){
       if (hold[x]['month'] === i){
         monthHolder.push(hold[x])}
         }
       }


    hold = monthHolder;
    console.log(hold);

    window.crimeEnd = hold;

    for(var x = 0; x < hold.length; x++){
      let single = hold[x]
      single['iconImage'] = 'images/thief.png';
      single['coords'] = {'lat': `${single["latitude"]}`,'lng': `${single["longitude"]}`}
      single['coords']['lat'] = parseFloat(single['coords']['lat']);
      single['coords']['lng'] = parseFloat(single['coords']['lng']);
      addMarker(single);
    }
    map.setCenter(neighbourhoods[area]);
    console.log(neighbourhoods[area]);

    markerCluster = new MarkerClusterer(map, markers, opt);
              // {imagePath: 'images/m'});
   });



   let months = $("#slider").rangeSlider({
    defaultValues: {min: 1, max: 2},
    bounds: {min: 1, max: 12},
    range: {min: 1},
    step: 1,
    formatter: function(val) {
        // var m = months.rangeSlider("values").min;
        return (monthList[val-1]);
      }
    })


 });




// selecting dropdown menu neghiborhood
// e = $('#neighbourhood')[0]
// strUser = e.options[e.selectedIndex].text;




















//
