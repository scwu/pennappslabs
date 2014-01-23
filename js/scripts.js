// Create an array of styles.
var styles = [
  {
    stylers: [
      { hue: "#2d3038" },
      { saturation: -70 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

var pinColor = "2d3038";
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(48, 84),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
        new google.maps.Size(40, 37),
        new google.maps.Point(0, 0),
        new google.maps.Point(12, 35));

var Latlng = new google.maps.LatLng(39.952092, -75.190271);
var myOptions = {
    zoom: 16,
    center: Latlng,
    mapTypeId: 'roadmap',
    scrollwheel: false,
    disableDefaultUI: true,
};
var marker = new google.maps.Marker({
    position: Latlng,
    title:"the University of Pennsylvania",
    icon: pinImage,
    shadow: pinShadow
});

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

map = new google.maps.Map($('#map-canvas')[0], myOptions);
map.mapTypes.set('map_style', styledMap);
map.setMapTypeId('map_style');
marker.setMap(map);

function chk_scroll(e)
{
  e.stopPropagation();
    var height = $('#banner').height();
    console.log(height);
    if ($(this).scrollTop() > height) {
      $('.navbar').addClass('navbar-fixed-top');

    }
    else if ($(this).scrollTop() < height) {
      $('.navbar').removeClass('navbar-fixed-top');
    }
}

$(document).ready(function(){

    $(window).bind('scroll',chk_scroll);
});
