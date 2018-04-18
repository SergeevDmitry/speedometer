// #1

let endICO = '2018-05-26',
    //countdown
icoSumma = 0,
    //summa million USD
roadmapStep = 12; // step on roadmap

// countdown ico

$(document).ready(() => {
  timer(endICO);
  setInterval(() => {
    timer(endICO);
  }, 60000);
});

function timer(endICO) {
  t = Date.parse(new Date(endICO)) - Date.parse(new Date());
  let minutes = Math.floor(t / 1000 / 60 % 60);
  let hours = Math.floor(t / (1000 * 60 * 60) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (days < 10) {
    days = '0' + days;
  }
  $('.days').html(days + ' <span>D</span>');
  $('.hours').html(hours + ' <span>H</span>');
  $('.mins').html(minutes + ' <span>M</span>');
}

// canvas

let icoCount = icoSumma,
    hCap = 50,
    oneStep = 2.73 / hCap,
    canvasValue = -(2.93 - icoCount * oneStep);

var canv = document.getElementById('canv'),
    ctx = canv.getContext('2d');

canv.width = 700;
canv.height = 400;

var center_x = canv.width / 2,
    center_y = canv.height / 2 + 100,
    radius = 200;

ctx.lineWidth = 15;
ctx.strokeStyle = '#492528';

ctx.beginPath();
ctx.arc(center_x, center_y, radius, -0.2, Math.PI + 0.2, true);
ctx.stroke();

var l_ = -2.73,
    l_t = -2.3,
    simpleAnimationTimer = setInterval(function () {
  var grad = ctx.createRadialGradient(center_x, center_y, 50, center_x, center_y, radius);
  grad.addColorStop(1, 'rgba(83, 48, 26, .03)');
  grad.addColorStop(0.5, 'rgba(45, 14, 16, 1)');
  grad.addColorStop(0.4, 'rgba(45, 14, 16, .5)');
  grad.addColorStop(0.3, 'rgba(45, 14, 16, .001)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(center_x, center_y, 257, l_, Math.PI + 0.2, true);
  ctx.lineTo(center_x, center_y);
  ctx.lineTo(center_x, center_y);
  ctx.fill();

  ctx.lineWidth = 15;
  ctx.strokeStyle = '#F7B349';

  ctx.beginPath();
  ctx.arc(center_x, center_y, radius, l_, Math.PI + 0.2, true);
  ctx.stroke();

  /*  ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(center_x, center_y, 10, 0, Math.PI * 2, true);
      ctx.fill(); */

  l_ += 0.01;

  if (l_ >= -2.657) {
    $('.sp-goal-1').addClass('cap-done');
  }
  if (l_ >= -2.384) {
    $('.sp-goal-2').addClass('cap-done');
  }
  if (l_ >= -2.111) {
    $('.sp-goal-3').addClass('cap-done');
  }
  if (l_ >= -1.838) {
    $('.sp-goal-4').addClass('cap-done');
  }
  if (l_ >= -1.565) {
    $('.sp-goal-5').addClass('cap-done');
  }
  if (l_ >= -1.292) {
    $('.sp-goal-6').addClass('cap-done');
  }
  if (l_ >= -0.2) {
    $('.sp-goal-7').addClass('cap-done');
  }

  if (l_ > canvasValue) {
    clearInterval(simpleAnimationTimer);
  }

  let softCapMarkerColor = '#2f0000';
  if (canvasValue >= 21) {
    softCapMarkerColor = '#ffbf1f';
  }
}, 20);

function drawTick(angle, from, to) {
  var angle = angle,
      // 168 is start
  xs = center_x + radius * Math.cos(-angle * Math.PI / 180) * from,
      ys = center_y + radius * Math.sin(-angle * Math.PI / 180) * from,
      xe = center_x + radius * Math.cos(-angle * Math.PI / 180) * to,
      ye = center_y + radius * Math.sin(-angle * Math.PI / 180) * to;

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#8A6047';

  ctx.beginPath();
  ctx.moveTo(xs, ys);
  ctx.lineTo(xe, ye);
  ctx.stroke();
}

// first level outer ticks
for (i = 0; i < 157; i++) {
  drawTick(168 - i * 1, 1.1, 1.06);
}

// dots
for (i = 0; i < 157; i++) {
  drawTick(168 - i * 1, 1.25, 1.255);
}

ctx.lineWidth = 1;
ctx.strokeStyle = '#603738';

ctx.beginPath();
ctx.arc(center_x, center_y, radius + 55, -0.2, Math.PI + 0.2, true);
ctx.stroke();

// first level outer ticks
for (i = 0; i < 58; i++) {
  drawTick(167 - i * 2.7, 1.3, 1.35);
}

// video player

const videoPlayer = document.getElementById('video-player'),
      playBtn = document.getElementById('play-video'),
      text = $('.video-description');

playBtn.addEventListener('click', function () {
  $('video').css('opacity', '1');
  text.hide();
  $('video').attr('controls', 'controls');
  videoPlayer.play();
});
videoPlayer.addEventListener('click', function () {
  if (videoPlayer.paused) {
    videoPlayer.play();
    $('video').attr('controls', 'controls');
  } else {
    videoPlayer.pause();
  }
});

// goals progress
// #3
let icoSum = icoSumma;

let goal1Progress = $('.progress-now'),
    valueGoal1 = 0,
    goal1End = 50,
    textGoal1 = $('#goal-1-sum-text'),
    goal1 = $('.goal-1'),
    goal2 = $('.goal-2'),
    goal3 = $('.goal-3'),
    goal4 = $('.goal-4'),
    goal5 = $('.goal-5'),
    goal6 = $('.goal-6'),
    goal7 = $('.goal-7'),
    goalDone = 'goal-done',
    goal = $('.goal'),
    atmOn = $('.atm-on'),
    atmOff = $('.atm-off'),
    wallOn = $('.wall-on'),
    wallOff = $('.wall-off'),
    arbOn = $('.arb-on'),
    arbOff = $('.arb-off'),
    blchOn = $('.blch-on'),
    blchOff = $('.blch-off'),
    lisOn = $('.lis-on'),
    lisOff = $('.lis-off');

if (icoSum >= goal1End) {
  icoSum = 50;
}

if (icoSum >= 5) {
  goal1.addClass(goalDone);
  $('.atm-value-img').hide();
  $('.img-205').show();
  lisOn.show();
  lisOff.hide();
}
if (icoSum >= 10) {
  goal2.addClass(goalDone);
  $('.atm-value-img').hide();
  $('.img-334').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
}
if (icoSum >= 15) {
  goal3.addClass(goalDone);
  $('.atm-value-img').hide();
  $('.img-743').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
}
if (icoSum >= 20) {
  goal4.addClass(goalDone);
  $('.atm-value-img').hide();
  $('.img-1190').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
}
if (icoSum >= 25) {
  goal5.addClass(goalDone);
  $('.atm-value-img').hide();
  $('.img-1619').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
}
if (icoSum >= 30) {
  goal6.addClass(goalDone);
  $('.atm-value-img').hide();
  $('.img-2046').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
}
if (icoSum >= 50) {
  goal7.addClass(goalDone);
  $('.atm-value-img').hide();
  $('.img-3757').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
}
valueGoal1 = icoSum / goal1End * 100;
goal1Progress.css('width', valueGoal1 + '%');
if (icoSum > 0) {
  textGoal1.html('$' + icoSum + 'M');
}

function imgOff() {
  lisOff.show();
  lisOn.hide();
  blchOff.show();
  blchOn.hide();
  wallOff.show();
  wallOn.hide();
  arbOff.show();
  arbOn.hide();
  atmOff.show();
  atmOn.hide();
}
goal.click(function () {
  goal.removeClass('goal-active');
  $(this).addClass('goal-active');
});
goal1.click(function () {
  imgOff();
  $('.atm-value-img').hide();
  $('.img-205').show();
  lisOn.show();
  lisOff.hide();
});
goal2.click(function () {
  imgOff();
  $('.atm-value-img').hide();
  $('.img-334').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
});
goal3.click(function () {
  imgOff();
  $('.atm-value-img').hide();
  $('.img-743').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
});
goal4.click(function () {
  imgOff();
  $('.atm-value-img').hide();
  $('.img-1190').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
});
goal5.click(function () {
  imgOff();
  $('.atm-value-img').hide();
  $('.img-1619').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
});
goal6.click(function () {
  imgOff();
  $('.atm-value-img').hide();
  $('.img-2046').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
});
goal7.click(function () {
  imgOff();
  $('.atm-value-img').hide();
  $('.img-3757').show();
  lisOn.show();
  lisOff.hide();
  blchOn.show();
  blchOff.hide();
  wallOn.show();
  wallOff.hide();
  arbOn.show();
  arbOff.hide();
  atmOn.show();
  atmOff.hide();
});
// roadmap bcg line
/* let roadStep = 2
const r1 = $('.roadmap-1'),
  r2 = $('.roadmap-2'),
  r3 = $('.roadmap-3'),
  r4 = $('.roadmap-4'),
  r5 = $('.roadmap-5'),
  r6 = $('.roadmap-6'),
  r7 = $('.roadmap-7'),
  l1 = $('.line-before-1'),
  l2 = $('.line-before-2'),
  l3 = $('.line-before-3'),
  l4 = $('.line-before-4'),
  l5 = $('.line-before-5'),
  l6 = $('.line-before-6'),
  l7 = $('.line-before-7'),
  start = 'active-roadmap-start',
  mid = 'active-roadmap-middle',
  end = 'active-roadmap-end';

switch (roadStep) {
  case 1:
    r1.addClass(end);
    l1.addClass(mid);
    break;
  case 2:
    r1.addClass(start);
    l1.addClass(start);
    r2.addClass(end);
    l2.addClass(mid);
    break;
  case 3:
    r1.addClass(start);
    l1.addClass(start);
    r2.addClass(start);
    l2.addClass(start);
    r3.addClass(end);
    l3.addClass(mid);
    break;
  case 4:
    r1.addClass(start);
    l1.addClass(start);
    r2.addClass(start);
    l2.addClass(start);
    r3.addClass(start);
    l3.addClass(start);
    r4.addClass(end);
    l4.addClass(mid);
    break;
  case 5:
    r1.addClass(start);
    l1.addClass(start);
    r2.addClass(start);
    l2.addClass(start);
    r3.addClass(start);
    l3.addClass(start);
    r4.addClass(start);
    l4.addClass(start);
    r5.addClass(end);
    l5.addClass(mid);
    break;
  case 6:
    r1.addClass(start);
    l1.addClass(start);
    r2.addClass(start);
    l2.addClass(start);
    r3.addClass(start);
    l3.addClass(start);
    r4.addClass(start);
    l4.addClass(start);
    r5.addClass(start);
    l5.addClass(start);
    r6.addClass(end);
    l6.addClass(mid);
    l7.addClass(end);
    r7.addClass('roadmap-7-active');
    break;
} */

// events slider

$(function () {
  $('.slider').slick({
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    prevArrow: "<div class='circle-left'><i class='fas fa-angle-left'></i></div>",
    nextArrow: "<div class='circle-right'><i class='fas fa-angle-right'></i></div>",
    responsive: [{
      breakpoint: 750,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true
      }
    }]
  });
});

// faq list

$(function () {
  var Accordion = function (el, multiple) {
    this.el = el || {};
    // more then one submenu open?
    this.multiple = multiple || false;

    var dropdownlink = this.el.find('.dropdownlink');
    dropdownlink.on('click', { el: this.el, multiple: this.multiple }, this.dropdown);
  };

  Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
        $this = $(this),

    //this is the ul.submenuItems
    $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');
    $this.parent().toggleClass('active-question');
    if (!e.data.multiple) {
      //show only one menu at the same time
      $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open active-question');
    }
  };

  var accordion = new Accordion($('.accordion-menu'), false);
});

/* Scroll effect */
$(function () {
  $('.menuLink').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top }, 500, 'linear');
  });
});

$(document).ready(function () {
  $(window).scroll(function () {
    showFooterMenu();

    let scTop = $(window).scrollTop();
    if (scTop < 800) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu1').addClass('left-fixed-menu-active');
    }
    if (scTop > 800 && scTop < 1800) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu2').addClass('left-fixed-menu-active');
    }
    if (scTop > 1800 && scTop < 5600) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu3').addClass('left-fixed-menu-active');
    }

    if (scTop > 5600 && scTop < 8600) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu6').addClass('left-fixed-menu-active');
    }
    if (scTop > 8600 && scTop < 9300) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu7').addClass('left-fixed-menu-active');
    }
    if (scTop > 9300 && scTop < 10300) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu8').addClass('left-fixed-menu-active');
    }
    if (scTop > 10300 && scTop < 12000) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu9').addClass('left-fixed-menu-active');
    }
    // if (scTop > 8960 && scTop < 9200) {
    //   $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
    //   $('.menu10').addClass('left-fixed-menu-active');
    // }
    if (scTop > 12000 && scTop < 12600) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu11').addClass('left-fixed-menu-active');
    }
    if (scTop > 12600) {
      $('.left-fixed-menu li').removeClass('left-fixed-menu-active');
      $('.menu12').addClass('left-fixed-menu-active');
    }
  });
});

function showFooterMenu() {
  if ($(window).scrollTop() > 700) {
    $('.footer-position-fixed').show().animate({
      bottom: '-5px'
    }, 1000);
    $('.left-fixed-menu').animate({
      left: '0'
    }, 1000);
  } else {
    $('.footer-position-fixed').css('bottom', '-75px').hide();
  }
}
// mobile metr progress
let mainMetrMobile = icoSumma;
let progress = $('.progress-now-main-metr'),
    valueMetr = 0,
    metrEnd = 50,
    textProgress = $('#main-metr-progress-text');

if (mainMetrMobile >= metrEnd) {
  mainMetrMobile = 50;
}
if (mainMetrMobile >= 22) {
  $('.progress-soft-cap').addClass('main-metr-cap-done');
  $('.progress-soft-cap').css('background', '#825F1C');
  $('.progress-soft-cap').css('opacity', '.8');
}

valueMetr = mainMetrMobile / metrEnd * 100;
progress.css('width', valueMetr + '%');
textProgress.html('$' + mainMetrMobile + 'M');

$('.close-popup').click(function () {
  $('.popup-page').hide();
  $('body').css('overflow', 'auto');
  if ($(window).width() > '1024') {
    $('.left-fixed-menu').show();
  }
});

$('.arbitrage-link-a').click(function () {
  $('body').css('overflow', 'hidden');
  $('.popup-arbitrage').show();
  $('.left-fixed-menu').hide();
});

$('.new-atm-link-link-a').click(function () {
  $('body').css('overflow', 'hidden');
  $('.popup-new-atm').show();
  $('.left-fixed-menu').hide();
});

//loader

var loader = $('.loader');
var wHeight = $(window).height();
var wWidth = $(window).width();
var o = 0;

loader.css({
  top: wHeight / 2 - 2.5,
  left: wWidth / 2 - 200
});

do {
  loader.animate({
    width: o
  }, 10);
  o += 3;
} while (o <= 400);
if (o === 402) {
  loader.animate({
    left: 0,
    width: '100%'
  }, function () {
    loader.animate({
      opacity: '0'
    }, 300);
    $('.bg-1 ').animate({
      top: '-50vh'
    }, 1500);
    $('.bg-2 ').animate({
      top: '150vh'
    }, 1500);
  });
}

setTimeout(function () {
  $('.loader-wrapper').hide();
  loader.hide();
  $('.bg-1, .bg-2').hide();
}, 4500);

// team join item w


$(document).ready(function () {
  $('form.subscription').on('submit', function (event) {
    event.preventDefault();

    var form = $(event.target);
    var emailEl = form.find("input[type='email']");
    var messageEl = form.find('.message');
    var email = emailEl.val();
    var url = '/subscribe';

    if (form.hasClass('investor')) {
      url = '/investor-subscribe';
    }

    $.ajax({
      url: url,
      method: 'POST',
      data: {
        email: email
      }
    }).success(function () {
      messageEl.addClass('success');
      messageEl.html('Thank you for your subscription!');
      messageEl.fadeIn();
    }).error(function (xhr) {
      messageEl.addClass('error');
      if (xhr.status === 422) {
        messageEl.html('This email is already subscribed.');
      } else {
        messageEl.html('Server error while subscribing.');
      }

      messageEl.fadeIn();
    }).complete(function () {
      emailEl.val('');
      setTimeout(function () {
        messageEl.fadeOut(400, function () {
          $(this).removeClass('success error');
          $(this).html('');
        });
      }, 2000);
    });
  });
});

// roadmap

var sDone = 'stroke-done',
    stepDone = 'road-step-done ',
    s1 = $('.s1'),
    s2 = $('.s2'),
    s3 = $('.s3'),
    s4 = $('.s4'),
    s5 = $('.s5'),
    s6 = $('.s6'),
    s7 = $('.s7'),
    s8 = $('.s8'),
    s9 = $('.s9'),
    s10 = $('.s10'),
    s11 = $('.s11'),
    s12 = $('.s12'),
    s13 = $('.s13'),
    s14 = $('.s14'),
    s15 = $('.s15'),
    s16 = $('.s16'),
    s17 = $('.s17'),
    s18 = $('.s18'),
    s19 = $('.s19'),
    s20 = $('.s20'),
    s21 = $('.s21'),
    s22 = $('.s22'),
    s23 = $('.s23'),
    s24 = $('.s24'),
    s25 = $('.s25'),
    s26 = $('.s26'),
    q315 = $('#q3-15'),
    q415 = $('#q4-15'),
    q116 = $('#q1-16'),
    q216 = $('#q2-16'),
    q316 = $('#q3-16'),
    q416 = $('#q4-16'),
    q117 = $('#q1-17'),
    q217 = $('#q2-17'),
    q317 = $('#q3-17'),
    q417 = $('#q4-17'),
    q118 = $('#q1-18'),
    q218 = $('#q2-18'),
    q318 = $('#q3-18'),
    q418 = $('#q4-18'),
    q119 = $('#q1-19'),
    q219 = $('#q2-19'),
    q319 = $('#q3-19'),
    q419 = $('#q4-19'),
    q120 = $('#q1-20'),
    q220 = $('#q2-20'),
    q320 = $('#q3-20'),
    q420 = $('#q4-20'),
    q121 = $('#q1-21'),
    q221 = $('#q2-21'),
    q321 = $('#q3-21'),
    q421 = $('#q4-21');

if (roadmapStep >= 1) {
  s1.addClass(stepDone);
  q315.css('stroke', '#ffb600');
}
if (roadmapStep >= 2) {
  s2.addClass(stepDone);
  q415.css('stroke', '#ffb600');
}
if (roadmapStep >= 3) {
  s3.addClass(stepDone);
  q116.css('stroke', '#ffb600');
}
if (roadmapStep >= 4) {
  s4.addClass(stepDone);
  q216.css('stroke', '#ffb600');
}
if (roadmapStep >= 5) {
  s5.addClass(stepDone);
  q316.css('stroke', '#ffb600');
  $('.ar1').css('border-left', '20px solid #ffb600');
}
if (roadmapStep >= 6) {
  s6.addClass(stepDone);
  q416.css('stroke', '#ffb600');
  $('.ar2').css('border-left', '20px solid #ffb600');
}
if (roadmapStep >= 7) {
  s7.addClass(stepDone);
  q117.css('stroke', '#ffb600');
}
if (roadmapStep >= 8) {
  s8.addClass(stepDone);
  q217.css('stroke', '#ffb600');
}
if (roadmapStep >= 9) {
  s9.addClass(stepDone);
  q317.css('stroke', '#ffb600');
}
if (roadmapStep >= 10) {
  s10.addClass(stepDone);
  q417.css('stroke', '#ffb600');
}
if (roadmapStep >= 11) {
  s11.addClass(stepDone);
  q118.css('stroke', '#ffb600');
}
if (roadmapStep >= 12) {
  s12.addClass(stepDone);
  q218.css('stroke', '#ffb600');
}
if (roadmapStep >= 13) {
  s13.addClass(stepDone);
  q318.css('stroke', '#ffb600');
}
if (roadmapStep >= 14) {
  s14.addClass(stepDone);
  q418.css('stroke', '#ffb600');
}
if (roadmapStep >= 15) {
  s15.addClass(stepDone);
  q119.css('stroke', '#ffb600');
  $('.ar3').css('border-left', '20px solid #ffb600');
}
if (roadmapStep >= 16) {
  s16.addClass(stepDone);
  q219.css('stroke', '#ffb600');
  $('.ar4').css('border-left', '20px solid #ffb600');
}
if (roadmapStep >= 17) {
  s17.addClass(stepDone);
  q319.css('stroke', '#ffb600');
}
if (roadmapStep >= 18) {
  s18.addClass(stepDone);
  q419.css('stroke', '#ffb600');
}
if (roadmapStep >= 19) {
  s19.addClass(stepDone);
  q120.css('stroke', '#ffb600');
}
if (roadmapStep >= 20) {
  s20.addClass(stepDone);
  q220.css('stroke', '#ffb600');
}
if (roadmapStep >= 21) {
  s21.addClass(stepDone);
  q320.css('stroke', '#ffb600');
}
if (roadmapStep >= 22) {
  s22.addClass(stepDone);
  q420.css('stroke', '#ffb600');
}
if (roadmapStep >= 23) {
  s23.addClass(stepDone);
  q121.css('stroke', '#ffb600');
}
if (roadmapStep >= 24) {
  s24.addClass(stepDone);
  q221.css('stroke', '#ffb600');
}
if (roadmapStep >= 25) {
  s25.addClass(stepDone);
  q321.css('stroke', '#ffb600');
}
if (roadmapStep >= 26) {
  s26.addClass(stepDone);
  q421.css('stroke', '#ffb600');
  $('.ar5').css('border-left', '20px solid #ffb600');
}
//# sourceMappingURL=script.js.map