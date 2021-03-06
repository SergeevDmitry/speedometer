let icoSum = 36.4;

let speedometr = new Vivus("spd", {
  duration: 100,
  start: "autostart",
  file: "./1.svg",
  onReady: function(myVivus) {
    myVivus.el.setAttribute("opacity", "1");
    myVivus.el.setAttribute("filter", "url(#dropShadow)");
    myVivus.el.setAttribute("class", "gray-line-2-svg");
  }
});
let greayLine = new Vivus(
  "spd",
  {
    duration: 100,
    start: "autostart",
    file: "./2.svg",
    onReady: function(myVivus) {
      myVivus.el.setAttribute("opacity", "1");
      myVivus.el.setAttribute("class", "gray-line-svg");
    }
  },
  transform
);

let spdBlock = document.getElementById("spd");
function transform() {
  let gl = document.getElementsByClassName("gray-line-svg");
  let gl2 = document.getElementsByClassName("gray-line-2-svg");
  gl[0].classList.add("shadow-1");
  gl2[0].classList.add("shadow-1");
  /* spdBlock.getElementsByTagName('svg')[0].style.transform = 'scale(1)' */
  spdBlock.style.transform = "rotateX(0)";
  setTimeout(function() {
    gl[0].classList.add("gray-line-transform-small");
    gl2[0].classList.add("gray-line-transform");
  }, 300);
  setTimeout(function() {
    drawProgress();
  }, 800);
}

function drawProgress() {
  let spdBlock = document.getElementById("spd");
  let animTime = 2700;
  if (icoSum >= 0 && icoSum < 10) {
    animTime = 1000;
  }
  if (icoSum >= 10 && icoSum < 20) {
    animTime = 1200;
  }
  if (icoSum >= 20 && icoSum < 30) {
    animTime = 3000;
  }
  if (icoSum >= 30 && icoSum < 40) {
    animTime = 1600;
  }
  if (icoSum >= 40) {
    animTime = 1800;
  }

  var svg = document.querySelector("svg");
  var canvas = SVG("spd").viewbox(-20, 17, 383, 263),
    path = canvas.path(
      "m50,295 C19,264 0,221 0,173 C0,77 77,0 173,0 C269,0 347,77 347,173 C347,221 327,265 295,296"
    ),
    path2 = canvas.path(
      "M75.5729788,254.349657 C52.9751559,231.73217 39,200.498121 39,166 C39,96.9644063 94.9644063,41 164,41 C233.035594,41 289,96.9644063 289,166 C289,200.532973 274.996593,231.795275 252.358506,254.418179 L250.944292,253.003966 C273.22045,230.742991 287,199.980688 287,166"
    ),
    length = path.length(),
    text = canvas
      .text(`${icoSum}`)
      .font({
        family: "Helvetica",
        size: 36
      })
      .fill("none"),
    length2 = path2.length(),
    /* , arrow = canvas.path('m434.691154 248.247831h6l-3-88.774917z', 50, 100).fill("#ffb600" ) */

    circle = canvas.circle(15);

  spdBlock.getElementsByTagName("svg")[2].style.position = "absolute";

  path.fill("none").stroke({ width: 0, color: "#ffb600" });
  path2.fill("none").stroke({ width: 0, color: "#ffb600" });
  circle.fill("none");

  let x1 = 52,
    y1 = 295,
    cx = 174,
    cy = 172;

  let smallcircleId = "";
  let arrowId = "";
  function prg(x2, y2, icoS) {
    let elem = document.getElementById(smallcircleId);
    /* console.log(elem.getAttribute('stroke-width')) */
    let elementArrow = document.getElementById(arrowId);
    let elementASmallCircle = document.getElementById(smallcircleId);
    if (elementArrow) {
      elementArrow.parentNode.removeChild(elementArrow);
    }
    if (elementASmallCircle) {
      elementASmallCircle.parentNode.removeChild(elementASmallCircle);
    }

    let progressPath = canvas
      .path(`m${x1} ${y1} L${x2} ${y2} L${cx} ${cy} `)
      .fill("rgba(255, 182, 0, .5)");

    let progressPath2 = canvas.path(`m${x1} ${y1} L${x2} ${y2} `);

    let circle3 = canvas
      .circle(290)
      .fill("none")
      .stroke({ width: 55, color: "rgba(255, 182, 0, .5)" })
      .center(cx, cy);
    let mask = canvas.mask().add(circle3);
    let circle4 = canvas
      .circle(268)
      .fill("none")
      .stroke({ width: 55, color: "rgba(255, 182, 0, 1)" })
      .center(cx, cy);
    let mask2 = canvas.mask().add(circle4);
    progressPath2
      .fill("none")
      .stroke({ width: 5, color: "rgba(255, 182, 0, 1)" });
    progressPath.maskWith(mask);


 
   
    if(icoS<=5) {
        let arrow = canvas
        .path(`m${cx + 10 } ${cy} L${cx-10} ${cy} L${x2} ${y2} z`)
        .fill("rgba(255, 182, 0, 1)")
        .transform({scale: 1.4})
    
        arrowId = arrow.node.id;
        arrow.maskWith(mask2);
    }
    if(icoS>5 && icoS<10) {
        let arrow = canvas
        .path(`m${cx + 10 } ${cy} L${cx-10} ${cy-10} L${x2} ${y2} z`)
        .fill("rgba(255, 182, 0, 1)")
        .transform({scale: 1.4})
    
        arrowId = arrow.node.id;
        arrow.maskWith(mask2);
    }
    if(icoS>=10 && icoS<=34) {
        let arrow = canvas
        .path(`m${cx + 10 } ${cy} L${cx-10} ${cy} L${x2} ${y2} z`)
        .fill("rgba(255, 182, 0, 1)")
        .transform({scale: 1.4})
    
        arrowId = arrow.node.id;
        arrow.maskWith(mask2);
    }
    if(icoS>34 && icoS<44) {
        let arrow = canvas
        .path(`m${cx + 10 } ${cy} L${cx-10} ${cy-10} L${x2} ${y2} z`)
        .fill("rgba(255, 182, 0, 1)")
        .transform({scale: 1.4})
    
        arrowId = arrow.node.id;
        arrow.maskWith(mask2);
    }
    if(icoS>=44) {
        let arrow = canvas
        .path(`m${cx + 10 } ${cy} L${cx-10} ${cy} L${x2} ${y2} z`)
        .fill("rgba(255, 182, 0, 1)")
        .transform({scale: 1.4})
    
        arrowId = arrow.node.id;
        arrow.maskWith(mask2);
    }
    





    let circle2 = canvas
      .circle(10)
      .fill("none")
      .stroke({ width: 1, color: "#3B0315" })
      .center(x2, y2);
    smallcircleId = circle2.node.id;

    text.center(cx, cy).fill("rgba(255, 182, 0, 1)");
    text.text(`$${icoS}M`);

    x1 = x2;
    y1 = y2;
  }

  text.animate(animTime).during(function(pos, morph, eased) {
    let progress = 16.3426 * icoSum;
    let progress2 = 11.82 * icoSum;

    let icoS = (icoSum * eased).toFixed(1);
    var p = path.pointAt(eased * progress);
    var p1 = path2.pointAt(eased * progress2);
    prg(p.x, p.y, icoS);
    circle.center(p.x, p.y).fill("rgba(255, 182, 0, 1)");
    /* arrow.center(p.x, p.y+10)
        console.log(arrow) */

    if (eased > 0.8) {
      spdBlock.style.transform = "rotateX(0)";
    }
  });
  /* .after(function() {
        transform()
         spdBlock.style.transform = 'rotateX(0)'
        
    }) */
}
