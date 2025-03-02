// JavaScript code extracted from the single-file version

var result = "";
var Π = Math.PI;
var e = Math.E;

var state = 0;
function fCaution() {
  if (state == 0) {
    document.getElementById("idfCaution").style = "display:none";
    state = 1;
  } else if (state == 1) {
    document.getElementById("idfCaution").style = "display:block";
    state = 0;
  }
}

function fCalculate(num) {
  if (num == "=") {
    document.form1.text.value = eval(result);
  } else if (num == "Del") {
    var o = document.getElementById("text");
    result = o.value;
    if (result.length > 0) o.value = result.substr(0, result.length - 1);
    result = o.value;
  } else if (num == "AC") {
    document.getElementById("text").value = "";
    result = "";
  } else {
    result = result + num;
    document.form1.text.value = result;
  }
}

var flag = 0;
function hideFunction() {
  if (flag == 0) {
    document.getElementById("idShowHide").style = "display:none";
    document.getElementById("idShowHideGraph").style = "display:block";
    document.getElementById("geometry").style = "display:none";
    document.getElementById("algebra").style = "display:none";
    flag = 1;
  } else if (flag == 1) {
    document.getElementById("idShowHide").style = "display:none";
    document.getElementById("idShowHideGraph").style = "display:none";
    document.getElementById("geometry").style = "display:block";
    document.getElementById("geometry").style = "opacity:0.85";
    document.getElementById("algebra").style = "display:none";
    flag = 2;
  } else if (flag == 2) {
    document.getElementById("idShowHide").style = "display:none";
    document.getElementById("idShowHideGraph").style = "display:none";
    document.getElementById("geometry").style = "display:none";
    document.getElementById("algebra").style = "display:block";
    flag = 3;
  } else if (flag == 3) {
    document.getElementById("idShowHide").style = "display:block";
    document.getElementById("idShowHideGraph").style = "display:none";
    document.getElementById("geometry").style = "display:none";
    document.getElementById("algebra").style = "display:none";
    flag = 0;
  }
}

function trigonometry(num) {
  var trig = "";
  var degree = "";
  var arc = "";
  if (num == "=") {
    document.form1.text.value = eval(degree);
  } else if (num == "sin") {
    degree = eval(document.getElementById("text").value);
    trig = (degree * Math.PI) / 180;
    document.getElementById("text").value = Math.sin(trig);
  } else if (num == "cos") {
    degree = eval(document.getElementById("text").value);
    trig = (degree * Math.PI) / 180;
    document.getElementById("text").value = Math.cos(trig);
  } else if (num == "tan") {
    degree = eval(document.getElementById("text").value);
    trig = (degree * Math.PI) / 180;
    document.getElementById("text").value = Math.tan(trig);
  } else if (num == "asin") {
    trig = eval(document.getElementById("text").value);
    arc = Math.asin(trig);
    degree = (arc * 180) / Math.PI;
    document.getElementById("text").value = degree;
  } else if (num == "acos") {
    trig = eval(document.getElementById("text").value);
    arc = Math.acos(trig);
    degree = (arc * 180) / Math.PI;
    document.getElementById("text").value = degree;
  } else if (num == "atan") {
    trig = eval(document.getElementById("text").value);
    arc = Math.atan(trig);
    degree = (arc * 180) / Math.PI;
    document.getElementById("text").value = degree;
  }
}

function fMinMax() {
  var max;
  var min;
  var sum;
  var value;
  var srcStr;
  var srcStrArr = new Array();
  var i;

  srcStr = document.getElementById("text").value;
  srcStr = srcStr.replace(/\s+/g, " ");
  srcStr = srcStr.replace(/(^\s*)|(\s*$)/g, "");
  srcStrArr = srcStr.split(".");
  srcStr = " ";

  for (i = 0; i < srcStrArr.length; i++) {
    value = parseInt(srcStrArr[i]);

    if (i == 0) {
      max = value;
      min = value;
      sum = value;
    } else {
      if (value > max) max = value;
      if (value < min) min = value;
      sum += value;
    }
  }
  document.getElementById("text").value =
    "sum=" +
    sum +
    "; average=" +
    sum / srcStrArr.length +
    "; max=" +
    max +
    "; min=" +
    min;
}

function temperature(num) {
  var Fdegree = "";
  var Cdegree = "";
  if (num == "to℉") {
    Cdegree = document.getElementById("text").value;
    Fdegree = (Cdegree * 9) / 5 + 32;
    document.getElementById("text").value = Fdegree + "℉";
  } else if (num == "to℃") {
    Fdegree = document.getElementById("text").value;
    Cdegree = ((Fdegree - 32) * 5) / 9;
    document.getElementById("text").value = Cdegree + "℃";
  }
}

function fPower_Square_Percent(num) {
  if (num == "x^2") {
    result = document.getElementById("text").value;
    result = Math.pow(result, 2);
    document.getElementById("text").value = result;
  } else if (num == "x^3") {
    result = document.getElementById("text").value;
    result = Math.pow(result, 3);
    document.getElementById("text").value = result;
  } else if (num == "x to%") {
    result = document.getElementById("text").value;
    result = result * 100;
    document.getElementById("text").value = result + "%";
  } else if (num == "%to x") {
    result = document.getElementById("text").value;
    result = result / 100;
    document.getElementById("text").value = result;
  } else if (num == "√￣") {
    result = document.getElementById("text").value;
    var squareRoot = Math.sqrt(result);
    document.getElementById("text").value = squareRoot;
  } else if (num == "abs") {
    result = document.getElementById("text").value;
    result = Math.abs(result);
    document.getElementById("text").value = result;
  } else if (num == "log") {
    result = document.getElementById("text").value;
    result = Math.log(result);
    document.getElementById("text").value = result;
  } else if (num == "int") {
    result = document.getElementById("text").value;
    result = Math.floor(result);
    document.getElementById("text").value = result;
  }
}

function fSpacing() {
  result = document.getElementById("text").value;
  document.getElementById("text").value = result + " ";
}

function fDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var date1 = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var second = date.getSeconds();

  alert(
    date +
      "  |  " +
      year +
      "年" +
      month +
      "月" +
      date1 +
      "日" +
      hour +
      "时" +
      minutes +
      "分" +
      second +
      "秒"
  );
}

var t = null;
t = setTimeout(time, 1000); // start
function time() {
  clearTimeout(t); // clear timout
  dt = new Date();
  var hr = dt.getHours();
  var minute = dt.getMinutes();
  var sec = dt.getSeconds();
  document.getElementById("timeShow").innerHTML =
    "BJS | HK " + hr + "hr " + minute + "min " + sec + "s ";
  t = setTimeout(time, 1000); // sets timer and starts cycling
}

var XLen = 4000,
  YLen = 4000,
  density = 8;
var vMouseflag = false;
var vCanvasX = -XLen + 800,
  vCanvasY = -YLen + 300,
  vDownX = 0,
  vDownY = 0;
var objCanvas,
  objPen,
  gScale = 8;

function getCtrlPoint(x0, y0, x1, y1, x2, y2, x3, y3) {
  var a = 0.15,
    b = 0.15;
  var pAx = x1 + (x2 - x0) * a;
  var pAy = y1 + (y2 - y0) * a;
  var pBx = x2 - (x3 - x1) * b;
  var pBy = y2 - (y3 - y1) * b;
  return [
    [pAx, pAy],
    [pBx, pBy]
  ];
}

window.onload = function() {
  objCanvas = document.getElementById("idCanvas");
  objPen = objCanvas.getContext("2d");
  objCanvas.width = XLen * 2;
  objCanvas.height = YLen * 2;
  objCanvas.style.left = vCanvasX;
  objCanvas.style.top = vCanvasY;
  objPen.translate(XLen, YLen);
  objPen.scale(gScale, -gScale);
};

function fMousedown(e) {
  vMouseflag = true;
  vDownX = e.clientX;
  vDownY = e.clientY;
}
function fMouseup(e) {
  vMouseflag = false;
  vDownX = e.clientX;
  vDownY = e.clientY;
}
function fMouseover(e) {
  objCanvas.style.cursor = "pointer";
}
function fMouseout(e) {
  vMouseflag = false;
  objCanvas.style.cursor = "default";
}
function fMousemove(e) {
  if (!vMouseflag) return;
  vCanvasX += e.clientX - vDownX;
  vCanvasY += e.clientY - vDownY;
  vDownX = e.clientX;
  vDownY = e.clientY;
  objCanvas.style.left = vCanvasX;
  objCanvas.style.top = vCanvasY;
}

function clearCanvas() {
  objPen.clearRect(-XLen, -YLen, 2 * XLen, 2 * YLen);
}

function enlarge() {
  gScale *= 1.2;
  clearCanvas();
  objPen.scale(1.2, 1.2);
  draw(false);
}

function reduce() {
  gScale *= 0.8;
  clearCanvas();
  objPen.scale(0.8, 0.8);
  draw(false);
}

var vFunction = null;
function fCompute(x) {
  var result;
  result = eval(vFunction);
  return result;
}
var vDate = null;
function draw(needCalcul) {
  {
    var i, x, y;

    vFunction = document.getElementById("iFunction").value;
    vFunction = vFunction.replace("sin", "Math.sin");
    vFunction = vFunction.replace("cos", "Math.cos");
    vFunction = vFunction.replace("tan", "Math.tan");
    vFunction = vFunction.replace("log", "Math.log");
    console.log("vFunction is " + vFunction);

    vDate = new Array(XLen * density + 1);

    for (i = 0; i < (XLen * density * 2) / gScale; i++) {
      x = i * ((1 / density) * gScale) - XLen;
      y = fCompute(x);
      vDate[i] = y;
    }
  }
  objPen.beginPath();
  objPen.lineWidth = 1 / gScale;
  console.log("gScale = " + gScale + ", line width = " + objPen.lineWidth);
  objPen.moveTo(-XLen / gScale, 0);
  objPen.lineTo(XLen / gScale, 0);
  objPen.moveTo(0, -YLen / gScale);
  objPen.lineTo(0, YLen / gScale);

  for (i = 0; i < XLen * 2; i++) {
    objPen.moveTo(i - XLen / gScale, 0);
    objPen.lineTo(i - XLen / gScale, (1 / gScale) * 4);
  }
  for (i = 0; i < YLen * 2; i++) {
    objPen.moveTo(0, i - YLen / gScale);
    objPen.lineTo((1 / gScale) * 4, i - YLen / gScale);
  }
  for (i = 0; i < (XLen * density * 2) / gScale; i++) {
    if (
      isNaN(vDate[i]) ||
      isNaN(vDate[i + 1]) ||
      isNaN(vDate[i + 2]) ||
      isNaN(vDate[i + 3])
    )
      continue;
    var xx0 = i * ((1 / density) * gScale) - XLen,
      yy0 = vDate[i];
    var xx1 = (i + 1) * ((1 / density) * gScale) - XLen,
      yy1 = vDate[i + 1];
    var xx2 = (i + 2) * ((1 / density) * gScale) - XLen,
      yy2 = vDate[i + 2];
    var xx3 = (i + 3) * ((1 / density) * gScale) - XLen,
      yy3 = vDate[i + 3];

    var ctrlP = getCtrlPoint(xx0, yy0, xx1, yy1, xx2, yy2, xx3, yy3);
    objPen.moveTo(xx1, yy1);
    objPen.bezierCurveTo(
      ctrlP[0][0],
      ctrlP[0][1],
      ctrlP[1][0],
      ctrlP[1][1],
      xx2,
      yy2
    );
  }
  objPen.stroke();
}

function clearGraph() {
  document.getElementById("iFunction").value = "";
  result = "";
}

function reload() {
  window.location.reload();
}

// Quadratic solving

function checkQuad() {
  var a = document.fquad.fa.value;
  var b = document.fquad.fb.value;
  var c = document.fquad.fc.value;
  a = parseFloat(a);
  b = parseFloat(b);
  c = parseFloat(c);
  var x1, x2;
  var discriminant = b * b - 4 * a * c;
  if (!isFinite(a) || !isFinite(b) || !isFinite(c)) {
    alert("Please enter valid numbers for a, b, c.");
    return;
  }
  if (a == 0) {
    alert("a cannot be 0 for a quadratic equation.");
    return;
  }
  if (discriminant < 0) {
    document.fquad.x1.value = "No real solutions";
    document.fquad.x2.value = "";
  } else if (discriminant == 0) {
    x1 = x2 = -b / (2 * a);
    document.fquad.x1.value = x1;
    document.fquad.x2.value = x2;
  } else {
    x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    document.fquad.x1.value = x1;
    document.fquad.x2.value = x2;
  }
}

// Additional geometry functions
function solve() {
  // Implementation (from the original code) that calculates triangle geometry, etc.
  // This portion is truncated in the original snippet but presumably is included in full.
}

// Utility for geometry
function degToRad(d) {
  return (d * Math.PI) / 180;
}
function radToDeg(r) {
  return (r * 180) / Math.PI;
}
function and(a, b) {
  return a && b;
}
function setElementText(elemId, text) {
  var elem = document.getElementById(elemId);
  if (elem) elem.textContent = text;
}
function formatNumber(val) {
  return val.toFixed(6);
}
function clearOutputs() {
  // As found in the snippet
}

// End of JS code
