// Global Variables
var result = "";
var Π = Math.PI;
var e = Math.E;
var state = 0;
var flag = 0;
var XLen = 4000, YLen = 4000, density = 8;
var vMouseflag = false;
var vCanvasX = -XLen + 800, vCanvasY = -YLen + 300, vDownX = 0, vDownY = 0;
var objCanvas, objPen, gScale = 8;
var vFunction = null;
var vDate = null;
var solution = null; // For geometry mode

// Basic calculator functions
function fCaution() {
  if (state == 0) {
    document.getElementById('idfCaution').style = "display:none";
    state = 1;
  } else if (state == 1) {
    document.getElementById('idfCaution').style = "display:block";
    state = 0;
  }
}

function fCalculate(num) {
  try {
    if (num == "=") {
      document.form1.text.value = eval(result);
    } else if (num == "Del") {
      var o = document.getElementById('text');
      result = o.value;
      if (result.length > 0) {
        o.value = result.substr(0, result.length - 1);
      }
      result = o.value;
    } else if (num == "AC") {
      document.getElementById('text').value = "";
      result = "";
    } else {
      result = result + num;
      document.form1.text.value = result;
    }
  } catch (error) {
    document.form1.text.value = "Error";
    console.error("Calculation error:", error);
    result = "";
  }
}

function hideFunction() {
  if (flag == 0) {
    document.getElementById('idShowHide').style = "display:none";
    document.getElementById('idShowHideGraph').style = "display:block";
    document.getElementById('geometry').style = "display:none";
    document.getElementById('algebra').style = "display:none";
    flag = 1;
  } else if (flag == 1) {
    document.getElementById('idShowHide').style = "display:none";
    document.getElementById('idShowHideGraph').style = "display:none";
    document.getElementById('geometry').style = "display:block";
    document.getElementById('geometry').style = "opacity:0.85";
    document.getElementById('algebra').style = "display:none";
    flag = 2;
  } else if (flag == 2) {
    document.getElementById('idShowHide').style = "display:none";
    document.getElementById('idShowHideGraph').style = "display:none";
    document.getElementById('geometry').style = "display:none";
    document.getElementById('algebra').style = "display:block";
    flag = 3;
  } else if (flag == 3) {
    document.getElementById('idShowHide').style = "display:block";
    document.getElementById('idShowHideGraph').style = "display:none";
    document.getElementById('geometry').style = "display:none";
    document.getElementById('algebra').style = "display:none";
    flag = 0;
  }
}

// Trigonometry functions
function trigonometry(num) {
  try {
    var trig = "";
    var degree = "";
    var arc = "";
    
    if (num == "=") {
      document.form1.text.value = eval(degree);
    } else if (num == "sin") {
      degree = eval(document.getElementById("text").value);
      trig = degree * Math.PI / 180;
      document.getElementById("text").value = Math.sin(trig);
    } else if (num == "cos") {
      degree = eval(document.getElementById("text").value);
      trig = degree * Math.PI / 180;
      document.getElementById("text").value = Math.cos(trig);
    } else if (num == "tan") {
      degree = eval(document.getElementById("text").value);
      trig = degree * Math.PI / 180;
      document.getElementById("text").value = Math.tan(trig);
    } else if (num == "asin") {
      trig = eval(document.getElementById("text").value);
      arc = Math.asin(trig);
      degree = arc * 180 / Math.PI;
      document.getElementById("text").value = degree;
    } else if (num == "acos") {
      trig = eval(document.getElementById("text").value);
      arc = Math.acos(trig);
      degree = arc * 180 / Math.PI;
      document.getElementById("text").value = degree;
    } else if (num == "atan") {
      trig = eval(document.getElementById("text").value);
      arc = Math.atan(trig);
      degree = arc * 180 / Math.PI;
      document.getElementById("text").value = degree;
    }
  } catch (error) {
    document.getElementById("text").value = "Error";
    console.error("Trigonometry error:", error);
  }
}

// Min/Max data analysis function
function fMinMax() {
  try {
    var max;
    var min;
    var sum;
    var value;
    var srcStr;
    var srcStrArr = new Array();
    var i;

    srcStr = document.getElementById('text').value;
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
        if (value > max)
          max = value;
        if (value < min)
          min = value;
        sum += value;
      }
    }
    document.getElementById('text').value = "sum=" + sum + "; average=" + sum / srcStrArr.length + "; max=" + max + "; min=" + min;
  } catch (error) {
    document.getElementById('text').value = "Error in data analysis";
    console.error("Data analysis error:", error);
  }
}

// Temperature conversion
function temperature(num) {
  try {
    var Fdegree = "";
    var Cdegree = "";
    if (num == "to℉") {
      Cdegree = document.getElementById('text').value;
      Fdegree = Cdegree * 9 / 5 + 32;
      document.getElementById("text").value = Fdegree + "℉";
    } else if (num == "to℃") {
      Fdegree = document.getElementById('text').value;
      Cdegree = (Fdegree - 32) * 5 / 9;
      document.getElementById("text").value = Cdegree + "℃";
    }
  } catch (error) {
    document.getElementById("text").value = "Error";
    console.error("Temperature conversion error:", error);
  }
}

// Power, Square, Percentage functions
function fPower_Square_Percent(num) {
  try {
    if (num == "x^2") {
      result = document.getElementById('text').value;
      result = Math.pow(result, 2);
      document.getElementById('text').value = result;
    } else if (num == "x^3") {
      result = document.getElementById('text').value;
      result = Math.pow(result, 3);
      document.getElementById('text').value = result;
    } else if (num == "x to%") {
      result = document.getElementById('text').value;
      result = result * 100;
      document.getElementById('text').value = result + "%";
    } else if (num == "%to x") {
      result = document.getElementById('text').value;
      result = result / 100;
      document.getElementById('text').value = result;
    } else if (num == "√￣") {
      result = document.getElementById('text').value;
      var squareRoot = Math.sqrt(result);
      document.getElementById("text").value = squareRoot;
    } else if (num == "abs") {
      result = document.getElementById('text').value;
      result = Math.abs(result);
      document.getElementById("text").value = result;
    } else if (num == "log") {
      result = document.getElementById('text').value;
      result = Math.log(result);
      document.getElementById("text").value = result;
    } else if (num == "int") {
      result = document.getElementById('text').value;
      result = Math.floor(result);
      document.getElementById("text").value = result;
    }
  } catch (error) {
    document.getElementById("text").value = "Error";
    console.error("Function calculation error:", error);
  }
}

// Spacing function
function fSpacing() {
  result = document.getElementById('text').value;
  document.getElementById('text').value = result + " ";
}

// Date function
function fDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var date1 = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var second = date.getSeconds();

  alert(date + "  |  " + year + "年" + month + "月" + date1 + "日" + hour + "时" + minutes + "分" + second + "秒");
}

// Clock function
var t = null;
function time() {
  clearTimeout(t);
  dt = new Date();
  var hr = dt.getHours();
  var minute = dt.getMinutes();
  var sec = dt.getSeconds();
  document.getElementById("timeShow").innerHTML = "BJS | HK " + hr + "hr " + minute + "min " + sec + "s ";
  t = setTimeout(time, 1000);
}

// Graph mode functions
function getCtrlPoint(x0, y0, x1, y1, x2, y2, x3, y3) {
  var a = 0.15, b = 0.15;
  var pAx = x1 + (x2 - x0) * a;
  var pAy = y1 + (y2 - y0) * a;
  var pBx = x2 - (x3 - x1) * b;
  var pBy = y2 - (y3 - y1) * b;
  return [[pAx, pAy], [pBx, pBy]];
}

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

function fCompute(x) {
  var result;
  result = eval(vFunction);
  return result;
}

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

    for (i = 0; i < XLen * density * 2 / gScale; i++) {
      x = i * (1 / density * gScale) - XLen;
      try {
        y = fCompute(x);
        vDate[i] = y;
      } catch (error) {
        console.error("Error computing function at x=" + x, error);
        vDate[i] = NaN;
      }
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
    objPen.lineTo(i - XLen / gScale, 1 / gScale * 4);
  }
  for (i = 0; i < YLen * 2; i++) {
    objPen.moveTo(0, i - YLen / gScale);
    objPen.lineTo(1 / gScale * 4, i - YLen / gScale);
  }
  for (i = 0; i < XLen * density * 2 / gScale; i++) {
    if (isNaN(vDate[i]) || isNaN(vDate[i + 1]) || isNaN(vDate[i + 2]) || isNaN(vDate[i + 3]))
      continue;
    var xx0 = i * (1 / density * gScale) - XLen, yy0 = vDate[i];
    var xx1 = (i + 1) * (1 / density * gScale) - XLen, yy1 = vDate[i + 1];
    var xx2 = (i + 2) * (1 / density * gScale) - XLen, yy2 = vDate[i + 2];
    var xx3 = (i + 3) * (1 / density * gScale) - XLen, yy3 = vDate[i + 3];

    var ctrlP = getCtrlPoint(xx0, yy0, xx1, yy1, xx2, yy2, xx3, yy3);
    objPen.moveTo(xx1, yy1);
    objPen.bezierCurveTo(ctrlP[0][0], ctrlP[0][1], ctrlP[1][0], ctrlP[1][1], xx2, yy2);
  }
  objPen.stroke();
}

function clearGraph() {
  document.getElementById('iFunction').value = "";
  result = "";
}

function reload() {
  window.location.reload();
}

// Initialize canvas on load
window.onload = function() {
  objCanvas = document.getElementById("idCanvas");
  objPen = objCanvas.getContext("2d");
  objCanvas.width = XLen * 2;
  objCanvas.height = YLen * 2;
  objCanvas.style.left = vCanvasX;
  objCanvas.style.top = vCanvasY;
  objPen.translate(XLen, YLen);
  objPen.scale(gScale, -gScale);
  
  // Start the clock
  setTimeout(time, 1000);
  
  // Initialize the geometry diagram interaction
  initImageMap();
}

// Geometry mode functions
function solve() {
  function doOutput(nodeId, val, suffix) {
    if (and(typeof val == "object", val.length == 2)) { // Array
      setElementText(nodeId, formatNumber(val[0]) + suffix);
      setElementText(nodeId + "2", formatNumber(val[1]) + suffix);
      twosoln = true;
    } else if (typeof val == "number") {
      setElementText(nodeId, formatNumber(val) + suffix);
      setElementText(nodeId + "2", formatNumber(val) + suffix);
    } else
      throw "Assertion error";
  }
  
  try {
    // Get input and solve
    var a = getInputNumber("sideAin");
    var b = getInputNumber("sideBin");
    var c = getInputNumber("sideCin");
    var A = getInputNumber("angleAin");
    var B = getInputNumber("angleBin");
    var C = getInputNumber("angleCin");
    var answer = solveTriangle(a, b, c, A, B, C);
    solution = answer.slice(0, 6); // Global variable for mouse hover

    // Set outputs
    setElementText("status", answer[7]);
    var twosoln = false; // Is set to true by doOutput() if any answer item is a length-2 array
    doOutput("sideAout", answer[0], "");
    doOutput("sideBout", answer[1], "");
    doOutput("sideCout", answer[2], "");
    doOutput("angleAout", answer[3], DEGREE);
    doOutput("angleBout", answer[4], DEGREE);
    doOutput("angleCout", answer[5], DEGREE);
    doOutput("areaout", answer[6], "");
    if (twosoln)
      document.getElementById("formtable").classList.remove("onesoln");
    else
      document.getElementById("formtable").classList.add("onesoln");
  } catch (e) {
    clearOutputs();
    setElementText("status", e);
  }
}

// Given some sides and angles, this returns a tuple of 8 number/string values.
function solveTriangle(a, b, c, A, B, C) {
  var sides = (a != null) + (b != null) + (c != null); // Boolean to integer conversion
  var angles = (A != null) + (B != null) + (C != null); // Boolean to integer conversion
  var area, status;

  if (sides + angles != 3)
    throw "Give exactly 3 pieces of information";
  else if (sides == 0)
    throw "Give at least one side length";
  else if (sides == 3) {
    status = "Side side side (SSS) case";
    if (c >= a + b || a >= b + c || b >= c + a)
      throw status + " - No solution";
    A = solveAngle(b, c, a);
    B = solveAngle(c, a, b);
    C = solveAngle(a, b, c);
    // Heron's formula
    var s = (a + b + c) / 2;
    area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  } else if (angles == 2) {
    status = "Angle side angle (ASA) case";
    // Find missing angle
    if (A == null) A = 180 - B - C;
    if (B == null) B = 180 - C - A;
    if (C == null) C = 180 - A - B;
    if (0 >= A || 0 >= B || 0 >= C)
      throw status + " - No solution";
    var sinA = Math.sin(degToRad(A));
    var sinB = Math.sin(degToRad(B));
    var sinC = Math.sin(degToRad(C));
    // Use law of sines to find sides
    var ratio; // side / sin(angle)
    if (a != null) { ratio = a / sinA; area = a * ratio * sinB * sinC / 2; }
    if (b != null) { ratio = b / sinB; area = b * ratio * sinC * sinA / 2; }
    if (c != null) { ratio = c / sinC; area = c * ratio * sinA * sinB / 2; }
    if (a == null) a = ratio * sinA;
    if (b == null) b = ratio * sinB;
    if (c == null) c = ratio * sinC;
  } else if (and(A != null, a == null) || and(B != null, b == null) || and(C != null, c == null)) {
    status = "Side angle side (SAS) case";
    if (and(A != null, A >= 180) || and(B != null, B >= 180) || and(C != null, C >= 180))
      throw status + " - No solution";
    if (a == null) a = solveSide(b, c, A);
    if (b == null) b = solveSide(c, a, B);
    if (c == null) c = solveSide(a, b, C);
    if (A == null) A = solveAngle(b, c, a);
    if (B == null) B = solveAngle(c, a, b);
    if (C == null) C = solveAngle(a, b, c);
    if (A != null) area = b * c * Math.sin(degToRad(A)) / 2;
    if (B != null) area = c * a * Math.sin(degToRad(B)) / 2;
    if (C != null) area = a * b * Math.sin(degToRad(C)) / 2;
  } else {
    status = "Side side angle (SSA) case - ";
    var knownSide, knownAngle, partialSide;
    if (and(a != null, A != null)) { knownSide = a; knownAngle = A; }
    if (and(b != null, B != null)) { knownSide = b; knownAngle = B; }
    if (and(c != null, C != null)) { knownSide = c; knownAngle = C; }
    if (and(a != null, A == null)) partialSide = a;
    if (and(b != null, B == null)) partialSide = b;
    if (and(c != null, C == null)) partialSide = c;
    if (knownAngle >= 180)
      throw status + "No solution";
    var ratio = knownSide / Math.sin(degToRad(knownAngle));
    var temp = partialSide / ratio; // sin(partialAngle)
    var partialAngle, unknownSide, unknownAngle;
    if (temp > 1 || and(knownAngle >= 90, partialSide >= knownSide))
      throw status + "No solution";
    else if (temp == 1 || knownSide >= partialSide) {
      status += "Unique solution";
      partialAngle = radToDeg(Math.asin(temp));
      unknownAngle = 180 - knownAngle - partialAngle;
      unknownSide = ratio * Math.sin(degToRad(unknownAngle)); // Law of sines
      area = knownSide * partialSide * Math.sin(degToRad(unknownAngle)) / 2;
    } else {
      status += "Two solutions";
      var partialAngle0 = radToDeg(Math.asin(temp));
      var partialAngle1 = 180 - partialAngle0;
      var unknownAngle0 = 180 - knownAngle - partialAngle0;
      var unknownAngle1 = 180 - knownAngle - partialAngle1;
      var unknownSide0 = ratio * Math.sin(degToRad(unknownAngle0)); // Law of sines
      var unknownSide1 = ratio * Math.sin(degToRad(unknownAngle1)); // Law of sines
      partialAngle = [partialAngle0, partialAngle1];
      unknownAngle = [unknownAngle0, unknownAngle1];
      unknownSide = [unknownSide0, unknownSide1];
      area = [knownSide * partialSide * Math.sin(degToRad(unknownAngle0)) / 2,
              knownSide * partialSide * Math.sin(degToRad(unknownAngle1)) / 2];
    }
    if (and(a != null, A == null)) A = partialAngle;
    if (and(b != null, B == null)) B = partialAngle;
    if (and(c != null, C == null)) C = partialAngle;
    if (and(a == null, A == null)) { a = unknownSide; A = unknownAngle; }
    if (and(b == null, B == null)) { b = unknownSide; B = unknownAngle; }
    if (and(c == null, C == null)) { c = unknownSide; C = unknownAngle; }
  }

  return [a, b, c, A, B, C, area, status];
}

// Returns side c using law of cosines.
function solveSide(a, b, C) {
  C = degToRad(C);
  if (C > 0.001)
    return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
  else // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
    return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
}

// Returns angle C using law of cosines.
function solveAngle(a, b, c) {
  var temp = (a * a + b * b - c * c) / (2 * a * b);
  if (and(temp >= -1, 0.9999999 >= temp))
    return radToDeg(Math.acos(temp));
  else if (1 >= temp) // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
    return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
  else
    throw "No solution";
}

// Geometry Input/output/GUI handling
var ioNames = ["sideA", "sideB", "sideC", "angleA", "angleB", "angleC", "area"];

// Parses the number from the HTML form field with the given ID.
// Returns the number if it's positive and finite. Throws an exception if it's zero, negative, infinite, or NaN.
// Returns null if the field is blank.
function getInputNumber(elemId) {
  var str = document.getElementById(elemId).value;
  if (str == "")
    return null;
  var result = parseFloat(str);
  if (!isFinite(result))
    throw "Invalid number";
  if (0 >= result)
    throw "All inputs must be positive";
  return result;
}

function clearOutputs() {
  solution = null;
  document.getElementById("formtable").classList.add("onesoln");
  ioNames.forEach(function(name) {
    setElementText(name + "out", "");
    setElementText(name + "out2", "");
  });
  setElementText("status", "");
}

var RECT_PADDED_SIZE = 36;

// List of tuples (left, top, width, height). Values will be modified by initImageMap() to include padding.
var rectangles = [
  [246, 221, 12, 12],
  [89, 89, 12, 18],
  [321, 87, 11, 13],
  [177, 48, 15, 17], // Tweaked for better aesthetics. True dimensions are [175,48,15,17]
  [391, 176, 16, 17],
  [69, 175, 17, 18],
];

function initImageMap() {
  var container = document.getElementById("diagramcontainer");
  rectangles.forEach(function(rect, i) {
    var elem = container.appendChild(document.createElement("a"));
    elem.href = "#";
    elem.classList.add("letterhover");
    rect[0] -= Math.round((RECT_PADDED_SIZE - rect[2]) / 2);
    rect[1] -= Math.round((RECT_PADDED_SIZE - rect[3]) / 2);
    elem.style.left = rect[0] + "px";
    elem.style.top = rect[1] + "px";
    elem.style.width = RECT_PADDED_SIZE + "px";
    elem.style.height = RECT_PADDED_SIZE + "px";

    elem.onmouseover = function() {
      if (solution == null)
        return;

      var suffix = and(i >= 3, 6 > i) ? DEGREE : "";
      var text;
      if (typeof solution[i] == "object")
        text = formatNumber(solution[i][0]) + suffix + " or " + formatNumber(solution[i][1]) + suffix;
      else
        text = formatNumber(solution[i]) + suffix;
      setElementText("hoveroutput", text);

      // Set hover element style
      var hovelem = document.getElementById("hoveroutput");
      hovelem.style.display = "block";
      try {
        var compStyle = window.getComputedStyle(hovelem, null);
        var height = parsePixels(compStyle.getPropertyValue("height"));
        height += parsePixels(compStyle.getPropertyValue("padding-top"));
        height += parsePixels(compStyle.getPropertyValue("padding-bottom"));
        hovelem.style.top = rect[1] - height - 8 + "px";

        var temp = document.getElementById("diagramcontainer");
        var containerWidth = parsePixels(window.getComputedStyle(temp, null).getPropertyValue("width"));
        var bodyWidth = parsePixels(window.getComputedStyle(temp.parentNode, null).getPropertyValue("width"));
        hovelem.style.left = Math.round((bodyWidth - containerWidth) / 2) + rect[0] + "px";
      } catch (e) {
        hovelem.style.left = "0px";
        hovelem.style.top = "0px";
      }
    };

    elem.onmouseout = function() {
      setElementText("hoveroutput", "");
      document.getElementById("hoveroutput").style.display = "none";
    };
    elem.onclick = function() {
      document.getElementById(ioNames[i] + "in").select();
      return false;
    };
  });
}

// Simple Helper functions
function setElementText(nodeId, str) {
  document.getElementById(nodeId).textContent = str;
}

function parsePixels(str) {
  var match = /^(\d+(?:\.\d*)?)px$/.exec(str);
  if (match != null)
    return parseFloat(match[1]);
  else
    throw "Invalid unit";
}

function formatNumber(x) {
  return x.toPrecision(9);
}

function degToRad(x) {
  return x / 180 * Math.PI;
}

function radToDeg(x) {
  return x / Math.PI * 180;
}

// Workaround to avoid HTML parsing issues
function and(x, y) {
  return x ? y : false;
}

var DEGREE = "\u00B0";

// Quadratic equation solver
var rootparti;
var rootpart;
var det;
var rootparti1;
var rootparti2;
var a;
var b;
var c;
var x1;
var x2;
var i = "i";

function checkQuad() {
  var a = document.fquad.fa.value;
  var b = document.fquad.fb.value;
  var c = document.fquad.fc.value;
  
  if (a == 0 && c != 0) {
    x1 = -c / b;
    x2 = "Not a quadratic equation, but here is your answer for x";
    document.fquad.x1.value = x1;
    document.fquad.x2.value = x2;
  } else if (a == "" && c != 0) {
    x1 = -c / b;
    x2 = "Not a quadratic equation";
    document.fquad.x1.value = x1;
    document.fquad.x2.value = x2;
  } else {
    quad();
  }
}

function quad() {
  var a = document.fquad.fa.value;
  var b = document.fquad.fb.value;
  var c = document.fquad.fc.value;
  
  try {
    det = Math.pow(b, 2) - 4 * a * c;
    rootpart = Math.sqrt(det) / (2 * a);
    rootparti = (Math.sqrt(-det) / (2 * a)) + i;
    
    if (parseFloat(rootparti) < 0) {
      rootparti1 = rootparti;
      rootparti2 = (-1 * parseFloat(rootparti)) + i;
    } else {
      rootparti1 = (-1 * parseFloat(rootparti)) + i;
      rootparti2 = rootparti;
    }
    
    if (rootparti1 == "1i") {
      rootparti1 = i;
      rootparti2 = "-i";
    } else if (rootparti1 == "-1i") {
      rootparti1 = "-i";
      rootparti2 = i;
    }
    
    if (det == 0) {
      x1 = x2 = -b / (2 * a);
    } else if (det > 0) {
      x1 = (-b + Math.sqrt(det)) / (2 * a);
      x2 = (-b - Math.sqrt(det)) / (2 * a);
    } else if ((-b / (2 * a)) == 0) {
      x1 = rootparti1;
      x2 = rootparti2;
    } else {
      x1 = (-b / (2 * a) + " + " + rootparti1);
      x2 = (-b / (2 * a) + " + " + rootparti2);
    }
    
    document.fquad.x1.value = x1;
    document.fquad.x2.value = x2;
  } catch (error) {
    document.fquad.x1.value = "Error";
    document.fquad.x2.value = "Check your input values";
    console.error("Quadratic solver error:", error);
  }
}