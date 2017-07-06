// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: 49.2427, lng: -123.1207},
    zoom: 12
  });

  // This event listener will call addMarker() when the map is clicked.
  map.addListener('click', function(event) {
    addMarker(event.latLng);
  });

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
}

let zoom = {
    coords:{lat: 49.2317,lng: -123.0927},
    iconImage:'images/cam.png',
    content:'<h4>Red Light Camera</h4>'
  }

$(document).ready(function(){
   $('#clickMe').click(function(){
     let hold = window.testList;
     for(var x = 0; x < hold.length; x++){
       let single = hold[x]
       single['iconImage'] = 'images/cam.png';
       single['coords'] = {'lat': `${single["latitude"]}`,'lng': `${single["longitude"]}`}
       single['coords']['lat'] = parseFloat(single['coords']['lat']);
       single['coords']['lng'] = parseFloat(single['coords']['lng']);
       addMarker(single);
     }
   });
 });
