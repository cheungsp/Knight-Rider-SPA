function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    center: {lat: 49.2427, lng: -123.1207},
    zoom: 12
  });
  console.log(window);
  console.log(window.testList);
  console.log('this is hold');
  let hold = window.testList;
  console.log(hold);
  // Array of markers

  // let a = $('.camera-link');
  // console.log(a);

  var markers = [
    {
      coords:{lat: 49.2507,lng: -123.1107},
      iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
      content:'<h1>Lynn MA</h1>'
    },
    {
      coords:{lat: 49.2517,lng: -123.1027},
      iconImage:'images/cam.png',
      content:'<h4>Red Light Camera</h4>'
    },
    {
      coords:{lat: 49.2217,lng: -123.1027},
      iconImage:'images/cam.png',
      content:'<h4>Red Light Camera</h4>'
    }
  ];

  // Loop through markers
  // for(var i = 0;i < markers.length;i++){
  //   // Add marker
  //   addMarker(markers[i]);
  // }

  // for(var x=0; x < 2; i++){
  //   addMarker(testList[x])
  // }

  // Add Maker function
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

}
