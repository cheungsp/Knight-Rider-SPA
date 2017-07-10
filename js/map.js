// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];
var markerCluster;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: 49.2427, lng: -123.1207},
    zoom: 12
  });

  // This event listener will call addMarker() when the map is clicked.
  // map.addListener('click', function(event) {
  //   addMarker(event.latLng);
  // });

  new AutocompleteDirectionsHandler(map);
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
}


// Adds a marker to the map and push to the array.
function addMarker(props){
   var marker = new google.maps.Marker({
     position:props.coords,
     map:map,
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

  // var markerCluster = new MarkerClusterer(map, markers,
  //             {imagePath: 'images/m'});
  // markerCluster.addMarkers(markers, true);
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
}

function deleteClusters(){
  if (typeof markerCluster !== 'undefined'){
    markerCluster.clearMarkers();
  }
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

let zoom = {
    coords:{lat: 49.2317,lng: -123.0927},
    iconImage:'images/cam.png',
    content:'<h4>Red Light Camera</h4>'
  }

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
    //  markerCluster = new MarkerClusterer(map, markers,
              //  {imagePath: 'images/m'});
   });

   // Accident show button
   $('#accident-button').click(function(){
     deleteMarkers();
    //  let hold = window.testList;
    // console.log(window.accidentList[0]);
    let hold = window.accidentList;
    for(var x = 0; x < hold.length; x++){
      let single = hold[x]
      single['iconImage'] = 'images/accident.png';
      single['coords'] = {'lat': `${single["latitude"]}`,'lng': `${single["longitude"]}`}
      single['coords']['lat'] = parseFloat(single['coords']['lat']);
      single['coords']['lng'] = parseFloat(single['coords']['lng']);
      single['content'] = `Crash Count: ${single.crash_count} | Type:${single.crash_type}`;
      addMarker(single);
    }
    markerCluster = new MarkerClusterer(map, markers,
              {imagePath: 'images/m'});
   });

   // Crime show button
   $('#crime-button').click(function(){
    deleteMarkers();

    let hold = [];
    let area;
    if ($("input:checkbox[name='Tov']").is(':checked') && $("input:checkbox[name='Tfv']").is(':checked')){
      hold = window.crimeList;
    }
    else if ($("input:checkbox[name='Tov']").is(':checked')) {
      hold = window.crimeList.filter(function (el) {
        return el.type_crime === "Theft of Vehicle"
      });
    }
    else if ($("input:checkbox[name='Tfv']").is(':checked')) {
      hold = window.crimeList.filter(function (el) {
        return el.type_crime === "Theft from Vehicle"
      });
    }
    else {
      hold = window.crimeList;
    }

    area = $('#neighbourhood')[0];
    area = area.options[area.selectedIndex].text;

    if (neighbourhood != 'All'){
      hold = hold.filter(function (el) {
        return el.neighbourhood === area;
      });
    }



    for(var x = 0; x < hold.length; x++){
      let single = hold[x]
      single['iconImage'] = 'images/thief.png';
      single['coords'] = {'lat': `${single["latitude"]}`,'lng': `${single["longitude"]}`}
      single['coords']['lat'] = parseFloat(single['coords']['lat']);
      single['coords']['lng'] = parseFloat(single['coords']['lng']);
      addMarker(single);
    }
    markerCluster = new MarkerClusterer(map, markers,
              {imagePath: 'images/m'});
   });
 });




// selecting dropdown menu neghiborhood
// e = $('#neighbourhood')[0]
// strUser = e.options[e.selectedIndex].text;





















//
