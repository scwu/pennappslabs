
function getRepositories(){

	$.getJSON("https://api.github.com/orgs/pennappslabs/repos", function(data){
		var items = [];

		//Constants
		var blacklist = ['website'];
		var imageSource = "../img/labs2.png";

		$.each( data, function( key, val ) {
			var o = new Object;
			o.create = true;

			$.each( val, function( key1, val1 ) {
				if(key1 == "name" ){
					$.each( blacklist, function(index, value){
						if(val1 == value){
							o.create = false;
						};
					});
					o.n = val1;
				}	
				if(key1 == "html_url" ){
					o.u = val1;
				}
				if(key1 == "description" ){
					o.d = val1;
				}
			});
			if(o.create){
				$( ".projects" ).append("<div class='item'><a href=" + o.u + "><div class='image'><img class='projects-image' src=" + imageSource + "></div><h3>" + o.n + "</a></h3><p class='fixed-height'>" + o.d + "</p></div>" );
			}
		});
 
});

}

function chk_scroll(e)
{
  console.log("scrolled");

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

$( document ).ready(function() {
    console.log( "ready!" );

	getRepositories();
	$(window).bind('scroll',chk_scroll);

	$("#backButton").click(function(){
		window.location = "..";
	});

});

