$(document).ready(function() {
  
  var homeAnimate = false;
  var first = true;  
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  
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
      if (link == '/indeed') {
        console.log('test the session, pop the modal if not active');
      } else {
        ajaxLoad(link);
        window.history.pushState('', '', link);
      }
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
          $('#content').html(d).fadeIn(1000);
          $('#page').addClass('loaded');
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
          yall();
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
  	var canvas = $('#rubix')[0];
  	var cWidth = document.getElementById('rubix').offsetWidth;
  	var cHeight = document.getElementById('rubix').offsetHeight;
  	var scene = new THREE.Scene();
  	var camera = new THREE.PerspectiveCamera(100, cWidth / cHeight, 0.1, 100);
  	var renderer = new THREE.WebGLRenderer({ alpha: true });
  	renderer.setPixelRatio(window.devicePixelRatio);
  	renderer.setSize(cWidth, cHeight);
  	canvas.appendChild(renderer.domElement);
  
  	// add the shapes 
  	var shape = [];
  	geometry = new THREE.IcosahedronGeometry(4.2,0);
  	material = new THREE.MeshNormalMaterial({ wireframe: false });
  	shape[0] = new THREE.Mesh( geometry, material );
    shape[1] = new THREE.Mesh( geometry, material );
    shape[2] = new THREE.Mesh( geometry, material );
  	shape[0].position.set(0,0,0);
  	shape[1].position.set(0,0,0);
  	shape[2].position.set(0,0,0);
  	scene.add(shape[0], shape[1], shape[2]);
  	camera.position.set(0,0,10);
  	
  	// render and move the shapes
  	function render() {
  		requestAnimationFrame( render );
  		shape[0].rotation.x += 0.0035;
  		shape[0].rotation.y -= 0.001;
  		shape[1].rotation.y += 0.003;
  		shape[1].rotation.z -= 0.003;
  		shape[2].rotation.z -= 0.005;
  		shape[2].rotation.x += 0.005;
  		renderer.render(scene, camera);
  	}
  	render();
  	
  	// update the size on window resize
    $(window).resize(function() {
      delay(function(){
      	cWidth = document.getElementById('rubix').offsetWidth;
      	cHeight = document.getElementById('rubix').offsetHeight;
	  		camera.aspect = cWidth / cHeight;
	  		camera.updateProjectionMatrix();
    		renderer.setSize(cWidth, cHeight);
      }, 500);
    });
  }
    
  /* DOWN ARROWS ON HOME PAGE */  
  function hideArrows() {
    $('#downArrows').click(function() {
      $('body,html').animate({scrollTop: 300 }, 1000);
    })
    $(window).scroll(function() {
     if ($(this).scrollTop() > 20) {
       $('#downArrows').addClass('hide');
     } else {
       $('#downArrows').removeClass('hide');
     }
    });
  }
  
  /* HOME PAGE FUNCTIONS */
  function homePage() {
    if ($('#page.home').length > 0) {
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
      // changes intro verbiage to march time of day
      $('#time').html(time);
      rubix();
      $('body').addClass('home');
      hideArrows();
    }
  }
  
  /* MANAGE FUNCTIONS BASED ON SCROLL */
  function scroller() {
    heading = []; // array of sticky h2s
    revealArray = [];
    base = 0; // where on scroll to reveal "next" button
    o = 400;
    
    // load all h2 into an array to make sticky
    delay(function(){
      $('h2.themeBackground').each(function() {
        var details = { item: $(this), pos: $(this).offset().top, h: $(this).height(), moved: false };
        heading.push(details);
      })
    }, 1000);
  
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
    
    /* UPDATE ELEMENTS ON WINDOW RESIZE */
    if ($('#page.home').length == 0) {
      function resize() {
        $.each(heading, function () {
          $(this)[0].pos = $(this)[0].item.offset().top;
          $(this)[0].h = $(this)[0].item.height();
        })
        $.each(revealArray, function () {
          $(this)[0].item.find('img').css('max-width', $(this)[0].item.parent().find('> img').width());
        })
      }
      $(window).resize(function() {
        delay(function(){
          resize();
        }, 500);
      });
    }
    
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
      if (heading.length > 1) {
        if (scroll < heading[1].pos) {
          $('#heading').html('');
        }
      }  
            
      // Does a side wipe reveal of content on scroll for any div.reveal
      $.each(revealArray, function () {
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
  if ($('#page.home').length > 0) {
    homePage();
    yall({threshold: -100});
  } else {
    yall();
    $('#page').addClass('loaded');
  }
  $(window).on('load', function() {
    scroller();
  })

});