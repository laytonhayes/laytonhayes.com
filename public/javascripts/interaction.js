$(document).ready(function() {
  
  var homeAnimate = false;
  var first = true;
  
  function themeChange() {
    var c = $('#page').data('theme');
    $('.themeColor').css('color', c);
    $('.themeBackground').css('background-color', c);
  }
  
  /* PAGE LOAD AND NAVIGATION */
  function navigation() {
    $('a.nav').unbind('click').click(function(event){
      event.preventDefault();
      var link = $(this).attr('href');
      ajaxLoad(link);
      window.history.pushState('', '', link);
      _gaq.push(['_trackPageview', link]);
    });
  }
  function ajaxLoad(url) {
    $('body').removeClass('home');
    $('#content').fadeOut(200, function() {
      $.ajax({
        type:    'GET',
        url:     url,
        timeout: 5000,
        success: function(d){
          $('#content').html(d).fadeIn(200);
          title = $('header h1').html();
          if (typeof title != 'undefined') {
            title = title+' : Layton Hayes';
          } else {
            title = 'Layton Hayes : Experience + Product Design';
          }
          document.title = title;
          homeAnimate = false;
          $(window).unbind('scroll');
          themeChange();
          navigation();
          homePage();
          // test if all images have been loaded, then run scroller
          var imgCount = 0;
          var imgNumber = $('#content').find('img').length;
          $('img').on( 'load', function() {
            imgCount++;
            if (imgNumber === imgCount) {
              scroller();
            }
          })
        }
      });
    });
  }
  
  /*  HOME PAGE ANIMATION  */
  function rubix(){
  	var blue = new THREE.Color(0x0000ff);
  	var pink = new THREE.Color(0xfca4c5);
  	var canvas = $('#header')[0];
  
  	var scene = new THREE.Scene();
  	var camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, 100 );
  
  	var renderer = new THREE.WebGLRenderer({ alpha: true });
  	renderer.setPixelRatio( window.devicePixelRatio );
  	renderer.setSize( window.innerWidth, window.innerHeight );
  	canvas.appendChild( renderer.domElement );
  
  	//THREEx.WindowResize(renderer, camera);
  	var shape = [];
  	geometry = new THREE.IcosahedronGeometry(4,0);
  	material = new THREE.MeshNormalMaterial({ wireframe: true });
  	shape[0] = new THREE.Mesh( geometry, material );
  
  	shape[0].position.set(5,0,0);
  
  	scene.add(shape[0]);
  
  	var light = new THREE.PointLight(0xfca4c5);
  	light.position.set(0,250,0);
  	scene.add(light);
  
  	camera.position.set(0,0,10); // x y z
  
  	function render() {
  		requestAnimationFrame( render );
  
  		shape[0].rotation.x += 0.0035;
  
  		renderer.render(scene, camera);
  	}
  	render();
  }
    
  function hideArrows() {
    $('#downArrows').click(function() {
      $('body,html').animate({scrollTop: 220 }, 500);
    })
    $(window).scroll(function() {
     if ($(this).scrollTop() > 20) {
       $('#downArrows').addClass('hide');
     } else {
       $('#downArrows').removeClass('hide');
     }
    });
  }
  
  function homePage() {
    if ($('#header').length > 0) {
      homeAnimate = true;
      var now = new Date().getHours();
      var time;
      switch (true) {
        case (now < 6):
          time = 'Late Night?';
          break;
        case (now < 12):
          time = 'Good Morning.';
          break;
        case (now < 19):
          time = 'Good Afternoon.';
          break;
        case (now < 24):
          time = 'Good Evening.';
          break;
      }
      $('#time').html(time);
      rubix();
      $('body').addClass('home');
      hideArrows();
    }
  }
  
  function scroller() {
    heading = []; // array of sticky h2s
    revealArray = [];
    video = [];
    base = 0; // where on scroll to reveal "next" button
    o = 400;
    console.log('scroller fired');
    
    // load all h2 into an array to make sticky
    $('h2.themeBackground').each(function() {
      var details = { item: $(this), pos: $(this).offset().top, h: $(this).height(), moved: false };
      heading.push(details);
    })
  
    // load all videos in an array, to play on scroll
    $('video').each(function() {
      console.log('video element loaded');
      var details = { item: $(this), pos: $(this).offset().top, played: false, moved: false };
      video.push(details);
      $(this).click(function() {
        $(this).get(0).play();
      })
    })
  
    // load all images that reveal from side on scroll into an array
    $('div.reveal').each(function() {
      var reveal = $(this);
      var details = { item: $(this), pos: $(this).offset().top, h: $(this).height(), moved: false };
      revealArray.push(details);
      reveal.find('img').css('max-width', $(this).width());
    });
  
    // wait until all elements are loaded to get the window height, then automatically show "next" arrow on scroll
    if ($('a.sideNav.next').length > 0) {
      base = ($('body').height() - $(window).height()) - 200;
    }
    
    // regenerate positions of elements on resize  
    $(window).resize(function() {
      $.each(heading, function () {
        $(this)[0].pos = $(this)[0].item.offset().top;
        $(this)[0].h = $(this)[0].item.height();
      })
      $.each(revealArray, function () {
        $(this)[0].item.find('img').css('max-width', $(this)[0].item.parent().find('> img').width());
      })
    })
    
    // fire functions on scroll
    $(window).scroll(function() {
      scroll = $(this).scrollTop();
      
      // Inserts h2 content into sticky position h2 on scroll
      $.each(heading, function () {
        if ($(this)[0].moved == false){
          $(this)[0].pos = $(this)[0].item.offset().top;
          $(this)[0].moved = true;
        }
        if (scroll > $(this)[0].pos - $(this)[0].h) {
          move = ($(this)[0].h - ($(this)[0].pos - scroll));
          if (move <= $(this)[0].h){
            $('#heading').css('top', '-'+move+'px');
          } else {
            $('#heading').css('top', '0');
            $('#heading').html($(this)[0].item.html());
          }
        }
      });
      if (heading.length > 0) {
        if (scroll < heading[1].pos) {
          $('#heading').html('');
        }
      }  
      
      // Play video when scrolled to it
      $.each(video, function () {
        if (scroll > ($(this)[0].pos - o) && $(this)[0].played == false) {
          $(this)[0].item.get(0).play();
          $(this)[0].played = true;
        }
      });
            
      // Does a side wipe reveal of content on scroll for any div.reveal
      $.each(revealArray, function () {
        console.log('reveal bound');
        if ($(this)[0].moved == false){
          $(this)[0].pos = $(this)[0].item.offset().top;
          $(this)[0].moved = true;
        }
        if (scroll > ($(this)[0].pos - o) && scroll < ($(this)[0].pos + $(this)[0].h)) {
          if (($(this)[0].pos - scroll) > 0) {
            s = ((($(this)[0].pos - scroll) / o) * 100)+'%';
            $(this)[0].item.css('width', s);
          } else {
            $(this)[0].item.css('width', '0');
          }
        } else {
          if (scroll < ($(this)[0].pos - o)) {
            $(this)[0].item.css('width', '99%');
          }
        }
      })
      
      // Move next navigation arrow out when scrolled near the bottom
      if (scroll > base) {
        $('a.sideNav.next').addClass('base');
      } else {
        $('a.sideNav.next').removeClass('base');
      }
    });
  }
  
  // Back/Forward Buttons
  window.onpopstate = function(event) {
    if (first) {
      first = false;
    } else {
      ajaxLoad(location.pathname);
    }
  };
  
  // Fire on load
  themeChange();
  navigation();
  homePage();
  $(window).on( 'load', function() {
    console.log('test for initial image load');
    scroller();
  })

});