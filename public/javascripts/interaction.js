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
        scroller();
      }
    });
  });
}


/*  HOME PAGE PARTICLES  */
function danceParticles(backgroundC, dotC) {  
	var group;
	var particlesData = [];
	var camera, scene, renderer;
	var positions, colors;
	var particles;
	var pointCloud;
	var particlePositions;
	var linesMesh;
	var maxParticleCount = 100;
	var particleCount = 100;
	var r = 800;
	var rHalf = r / 2;
	var minDistance = 120
  var tex = new THREE.TextureLoader().load("/images/orb.png");  
  var canvas = $('#particles')[0];
  
  
	function initOrbs() {
		camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
		camera.position.z = 800;
		scene = new THREE.Scene();
		scene.background = new THREE.Color(backgroundC);
		group = new THREE.Group();
		scene.add( group );
		var segments = maxParticleCount * maxParticleCount;
		positions = new Float32Array( segments * 3 );
		colors = new Float32Array( segments * 3 );
		
		// allow the mouse to control scene
    // var controls = new THREE.OrbitControls( camera, canvas );

		var pMaterial = new THREE.PointsMaterial( {
			color: dotC,
			size: 16,
			transparent: true,
			map: tex
		} );
		particles = new THREE.BufferGeometry();
		particlePositions = new Float32Array( maxParticleCount * 3 );
		for ( var i = 0; i < maxParticleCount; i++ ) {
			var x = Math.random() * r - r / 2;
			var y = Math.random() * r - r / 2;
			var z = Math.random() * r - r / 2;
			particlePositions[ i * 3     ] = x;
			particlePositions[ i * 3 + 1 ] = y;
			particlePositions[ i * 3 + 2 ] = z;
			// add it to the geometry
			particlesData.push( {
				velocity: new THREE.Vector3( -1 + Math.random() * 2, -1 + Math.random() * 2,  -1 + Math.random() * 2 ),
				numConnections: 0
			} );
		}
		particles.setDrawRange( 0, particleCount );
		particles.addAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setDynamic( true ) );
		// create the particle system
		pointCloud = new THREE.Points( particles, pMaterial );
		group.add( pointCloud );
		var geometry = new THREE.BufferGeometry();
		geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
		geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setDynamic( true ) );
		geometry.computeBoundingSphere();
		geometry.setDrawRange( 0, 1 );
		var material = new THREE.LineBasicMaterial( {
//  		vertexColors: THREE.VertexColors,
  		transparent: false,
  		color: dotC
		} );
		linesMesh = new THREE.LineSegments( geometry, material );
		group.add( linesMesh );

		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
    canvas.appendChild( renderer.domElement );
    var delay = (function(){
      var timer = 0;
      return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
      };
    })();
    
    // resize the particle canvas
    function sizeCanvas() {
  		camera.aspect = window.innerWidth / window.innerHeight;
  		camera.updateProjectionMatrix();
  		renderer.setSize( window.innerWidth, window.innerHeight);
      $('#homeCopy').css('top', (window.innerHeight / 2) - 90);
    }
    
    // delay on resize so it's not redrawing all of the time
    $(window).resize(function() {
      delay(function(){
        sizeCanvas();
      }, 500);
    });
    sizeCanvas();
  };
  
	function animateOrbs() {
  	if (homeAnimate) {
  		var vertexpos = 0;
  		var colorpos = 0;
  		var numConnected = 0;
  		for ( var i = 0; i < particleCount; i++ )
  			particlesData[ i ].numConnections = 0;
  		for ( var i = 0; i < particleCount; i++ ) {
  			// get the particle
  			var particleData = particlesData[i];
  			particlePositions[ i * 3     ] += particleData.velocity.x;
  			particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
  			particlePositions[ i * 3 + 2 ] += particleData.velocity.z;
  			if ( particlePositions[ i * 3 + 1 ] < -rHalf || particlePositions[ i * 3 + 1 ] > rHalf )
  				particleData.velocity.y = -particleData.velocity.y;
  			if ( particlePositions[ i * 3 ] < -rHalf || particlePositions[ i * 3 ] > rHalf )
  				particleData.velocity.x = -particleData.velocity.x;
  			if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
  				particleData.velocity.z = -particleData.velocity.z;
  
  			// Check collision
  			for ( var j = i + 1; j < particleCount; j++ ) {
  				var particleDataB = particlesData[ j ];
  				var dx = particlePositions[ i * 3     ] - particlePositions[ j * 3     ];
  				var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
  				var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
  				var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );
  				if ( dist < minDistance ) {
  					particleData.numConnections++;
  					particleDataB.numConnections++;
  					var alpha = 1.0 - dist / minDistance;
  					positions[ vertexpos++ ] = particlePositions[ i * 3     ];
  					positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
  					positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];
  					positions[ vertexpos++ ] = particlePositions[ j * 3     ];
  					positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
  					positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];
  					colors[ colorpos++ ] = alpha;
  					colors[ colorpos++ ] = alpha;
  					colors[ colorpos++ ] = alpha;
  					colors[ colorpos++ ] = alpha;
  					colors[ colorpos++ ] = alpha;
  					colors[ colorpos++ ] = alpha;
  					numConnected++;
  				}
  			}
  		}
  		linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
  		linesMesh.geometry.attributes.position.needsUpdate = true;
  		linesMesh.geometry.attributes.color.needsUpdate = true;
  		pointCloud.geometry.attributes.position.needsUpdate = true;
  		requestAnimationFrame( animateOrbs );
  		render();
    }
	}

	function render() {
  	var time = Date.now() * 0.001;
  	group.rotation.y = time * -.1;
  	group.rotation.x = time * -.1;
  	renderer.render( scene, camera );
  }

  // call the functions
  initOrbs();
  animateOrbs();

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
  if ($('#particles').length > 0) {
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
    danceParticles(0xFFFFFF, 0x32CCD6);
    $('body').addClass('home');
    hideArrows();
  }
}

function scroller() {
  heading = [];
  revealArray = [];
  video = [];
  base = 0;
  o = 400;
  // load all h2 into an array to make sticky
  $('h2.themeBackground').each(function() {
    var details = { item: $(this), pos: $(this).offset().top, h: $(this).height(), moved: false };
    heading.push(details);
  });
  
  // load all images that reveal on scroll into an array
  // TODO fix JS error
  $('div.reveal').each(function() {
    var reveal = $(this);
    var details = { item: $(this), pos: $(this).offset().top, h: $(this).height(), moved: false };
    revealArray.push(details);
    reveal.parent().find('> img').load(function() {
      reveal.find('img').css('max-width', $(this).width());
    });
  });
  
  // load all videos in an array, to play on scroll
  $('video').each(function() {
    console.log('video element loaded');
    var details = { item: $(this), pos: $(this).offset().top, played: false, moved: false };
    video.push(details);
    $(this).click(function() {
      $(this).get(0).play();
    })
  })
  
  // wait until all elements are loaded to get the window height, then automatically show "next" arrow on scroll
  $( window ).on( 'load', function() {
    if ($('a.sideNav.next').length > 0) {
      console.log('bang');
      base = ($('body').height() - $(window).height()) - 200;
      console.log(base);
    }
  })
  
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
    // Does a side wipe of content on scroll for any div.reveal
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
          $(this)[0].item.css('width', '100%');
        }
      }
    })
    // Play video when scrolled to it
    $.each(video, function () {
      if (scroll > ($(this)[0].pos - o) && $(this)[0].played == false) {
        $(this)[0].item.get(0).play();
        $(this)[0].played = true;
      }
    });
    // BASE H2
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
scroller();

});