var map;
// Create a new blank array for all the listing markers.
var markers = [];
function initMap() {
  // Create a styles array to use with map
    var styles = [
        {
            featureType: 'water',
            stylers: [
                {   color: '#19a0d8' }
            ]
        },
        {
            featureType: 'adminstrative',
            elementType: 'labels.text.stroke',
            stylers: [
                { color: '#ffffff'},
                { weight: 6}
            ]
        }
    ]
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 45.523062, lng: -122.676482},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });
  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  var locations = [
    {title: 'Pok Pok', location: {lat: 45.5045786, lng: -122.6321513}},
    {title: 'Screen Door', location: {lat: 45.522988, lng: -122.6416469}},
    {title: 'OMSI', location: {lat: 45.5087417, lng: -122.6662964}},
    {title: 'Portland Art Museum', location: {lat: 45.5161509, lng: -122.6833552}},
    {title: 'Portland Saturday Market', location: {lat: 45.5226309, lng: -122.6700246}},
  ];
  // InfoWindow code
  var largeInfowindow = new google.maps.InfoWindow();
  // style the markers - listing marker icon
  var defaultIcon = makeMarkerIcon('0091ff');
    
  // Create a 'highlighted location' market color for when the user
  // mouses over the marker
    
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
     var marker = new google.maps.Marker({
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }
  document.getElementById('show-listings').addEventListener('click', showListings);
  document.getElementById('hide-listings').addEventListener('click', hideListings);
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>' +
                          '<p>' + 'This is one of the most popular place in Portland' + '</p>'
                         );
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
    var streetViewService = new google.maps.streetViewService();
    var radius = 50;

  }
}
// This function will loop through the markers array and display them all.
function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hideListings() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
