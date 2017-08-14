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
/*    _gaq.push(['_trackPageview', link]); */
  });
}
function ajaxLoad(url) {
  $('#content').fadeOut(200, function() {
    $.ajax({
      type:    'GET',
      url:     url,
      timeout: 5000,
      success: function(d){
        $('#content').html(d).fadeIn(200);
        title = $('header h1').html();
        if (typeof title != 'undefined') {
          title = 'Layton Hayes : '+title;
        } else {
          title = 'Layton Hayes : Portfolio';
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
function danceParticles() {
  var wOffset = 0;
  var hOffset = 4;
  var W = $(window).width() -  wOffset, H = $(window).height() - hOffset;
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      window.oRequestAnimationFrame      ||
      window.msRequestAnimationFrame     ||
      function( callback ){
        window.setTimeout(callback, 1000 / 60);
      };
  })();
  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();
  function sizeCanvas() {
    W = $(window).width() -  wOffset, H = $(window).height() - hOffset;
    canvas.width = W;
    canvas.height = H;
    ctx.fillRect(0,0,W,H);
    $('#homeCopy').css('top', (H / 2) - 90);
  }
  $(window).resize(function() {
    delay(function(){
      sizeCanvas();
    }, 500);
  });
  
  var canvas = $('#particles')[0];
  var ctx = canvas.getContext('2d');
  sizeCanvas();
  
  var particleCount = 30,
    particles = [],
    minDist = 60;
  
  function paintCanvas() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,W,H);
  }
  
  function Particle() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = -1 + Math.random() * 2;
    this.vy = -1 + Math.random() * 2;
    this.radius = 3;
    this.draw = function() {
      ctx.fillStyle = '#82d2e5';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    };
  }
  for(var i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function draw() {
    paintCanvas();
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.draw();
    }
    update();
  }
  
  function update() {
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if(p.x + p.radius > W) {
        p.x = p.radius;
      }
      else if(p.x - p.radius < 0) {
        p.x = W - p.radius;
      }
      if(p.y + p.radius > H) {
        p.y = p.radius;
      }
      else if(p.y - p.radius < 0) {
        p.y = H - p.radius;
      }
      for(var j = i + 1; j < particles.length; j++) {
        var p2 = particles[j];
        distance(p, p2);
      }
    }
  }
  
  function distance(p1, p2) {
    var dist;
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    dist = Math.sqrt(dx*dx + dy*dy);
    if(dist <= minDist) {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(130,210,229,'+ (1.2-dist/minDist) +')';
      ctx.lineWidth=2;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.closePath();
      var ax = dx/8000,
        ay = dy/8000;
      p1.vx -= ax;
      p1.vy -= ay;
      p2.vx += ax;
      p2.vy += ay;
      }
  }
  
  function animloop() {
    if (homeAnimate) {
      draw();
      requestAnimFrame(animloop);
    }
  }
  animloop();
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
  if ($('canvas#particles').length > 0) {
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
    danceParticles();
    hideArrows();
  }
}

function scroller() {
  heading = [];
  revealArray = [];
  video = [];
  base = 0;
  o = 400;
  $('h2.themeBackground').each(function() {
    var details = { item: $(this), pos: $(this).offset().top, h: $(this).height(), moved: false };
    heading.push(details);
  });
  
  $('div.reveal').each(function() {
    var reveal = $(this);
    var details = { item: $(this), pos: $(this).offset().top, h: $(this).height(), moved: false };
    revealArray.push(details);
    reveal.parent().find('> img').load(function() {
      reveal.find('img').css('max-width', $(this).width());
    });
  });
  
  $('video').each(function() {
    var details = { item: $(this), pos: $(this).offset().top, played: false, moved: false };
    video.push(details);
    $(this).click(function() {
      $(this).get(0).play();
    })
  })
  
  $('img').load(function() {
    if ($('a.sideNav.next').length > 0) {
      base = ($('body').height() - $(window).height()) - 40;
    }
  })
    
  $(window).resize(function() {
    $.each(heading, function () {
      $(this)[0].pos = $(this)[0].item.offset().top;
      $(this)[0].h = $(this)[0].item.height();
    })
    $.each(revealArray, function () {
      $(this)[0].item.find('img').css('max-width', $(this)[0].item.parent().find('> img').width());
    })
  })
  
  $(window).scroll(function() {
    scroll = $(this).scrollTop();    
    // HEADINGS
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
    // REVEAL
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
    // VIDEO
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