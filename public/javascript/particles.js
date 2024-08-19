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
