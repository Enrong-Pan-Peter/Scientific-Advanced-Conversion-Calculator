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

// Graph mode functions - modified to work properly
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
    if (objCanvas) {
      objCanvas.style.cursor = "pointer";
    }
  }
  
  function fMouseout(e) {
    vMouseflag = false;
    if (objCanvas) {
      objCanvas.style.cursor = "default";
    }
  }
  
  function fMousemove(e) {
    if (!vMouseflag) return;
    vCanvasX += e.clientX - vDownX;
    vCanvasY += e.clientY - vDownY;
    vDownX = e.clientX;
    vDownY = e.clientY;
    if (objCanvas) {
      objCanvas.style.left = vCanvasX + "px";
      objCanvas.style.top = vCanvasY + "px";
    }
  }
  
  function clearCanvas() {
    if (objPen) {
      objPen.clearRect(-XLen / gScale, -YLen / gScale, 2 * XLen / gScale, 2 * YLen / gScale);
    }
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
  
  function initGraph() {
    if (!objCanvas) {
      objCanvas = document.getElementById("idCanvas");
      if (objCanvas) {
        objPen = objCanvas.getContext("2d");
        objCanvas.width = XLen * 2;
        objCanvas.height = YLen * 2;
        objCanvas.style.left = vCanvasX + "px";
        objCanvas.style.top = vCanvasY + "px";
        objPen.translate(XLen, YLen);
        objPen.scale(gScale, -gScale);
      }
    }
  }
  
  // Enhanced function evaluator for graphing
  function fCompute(x) {
    // Replace vFunction with a valid JavaScript expression
    var expression = vFunction;
    
    // Make function safe for evaluation
    expression = expression.replace(/Math\./g, ""); // Remove any Math. prefixes (we'll add them back)
    
    // Replace common mathematical functions with JavaScript equivalents
    expression = expression.replace(/sin\(/g, "Math.sin(");
    expression = expression.replace(/cos\(/g, "Math.cos(");
    expression = expression.replace(/tan\(/g, "Math.tan(");
    expression = expression.replace(/log\(/g, "Math.log(");
    expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
    expression = expression.replace(/\^/g, "**"); // Replace ^ with ** for exponentiation
    expression = expression.replace(/pi/gi, "Math.PI"); // Replace pi with Math.PI
    
    // Make sure all x instances are properly spaced to avoid problems with expressions like 2x
    expression = expression.replace(/([0-9])x/g, "$1*x");
    
    // Define x variable for the expression
    var result;
    try {
      result = eval(expression);
      return result;
    } catch (error) {
      console.error("Error evaluating expression:", error);
      return NaN;
    }
  }
  
  // Draw the grid and axes
  function drawGrid() {
    if (!objPen) return;
    
    objPen.beginPath();
    objPen.strokeStyle = "#CCCCCC";
    objPen.lineWidth = 0.5 / gScale;
    
    // Draw grid lines
    var gridSize = 10; // Distance between grid lines
    var maxLines = Math.floor(XLen / gScale / gridSize);
    
    // Vertical grid lines
    for (var i = -maxLines; i <= maxLines; i++) {
      objPen.moveTo(i * gridSize, -YLen / gScale);
      objPen.lineTo(i * gridSize, YLen / gScale);
    }
    
    // Horizontal grid lines
    for (var i = -maxLines; i <= maxLines; i++) {
      objPen.moveTo(-XLen / gScale, i * gridSize);
      objPen.lineTo(XLen / gScale, i * gridSize);
    }
    
    objPen.stroke();
    
    // Draw axes
    objPen.beginPath();
    objPen.strokeStyle = "#000000";
    objPen.lineWidth = 1.5 / gScale;
    
    // X-axis
    objPen.moveTo(-XLen / gScale, 0);
    objPen.lineTo(XLen / gScale, 0);
    
    // Y-axis
    objPen.moveTo(0, -YLen / gScale);
    objPen.lineTo(0, YLen / gScale);
    
    objPen.stroke();
    
    // Draw tick marks on axes
    objPen.beginPath();
    objPen.lineWidth = 1 / gScale;
    
    // X-axis ticks
    for (var i = -maxLines; i <= maxLines; i++) {
      if (i !== 0) { // Skip origin
        objPen.moveTo(i * gridSize, -3 / gScale);
        objPen.lineTo(i * gridSize, 3 / gScale);
      }
    }
    
    // Y-axis ticks
    for (var i = -maxLines; i <= maxLines; i++) {
      if (i !== 0) { // Skip origin
        objPen.moveTo(-3 / gScale, i * gridSize);
        objPen.lineTo(3 / gScale, i * gridSize);
      }
    }
    
    objPen.stroke();
  }
  
  // Draw the function
  function draw(needCalcul) {
    if (!objCanvas || !objPen) {
      initGraph();
    }
    
    clearCanvas();
    drawGrid();
    
    vFunction = document.getElementById("iFunction").value;
    
    if (!vFunction || vFunction.trim() === "") {
      return; // Nothing to draw
    }
    
    // Special case for empty input with function type selected
    if (vFunction.trim() === "" && document.getElementById("functionType").value !== "custom") {
      var functionType = document.getElementById("functionType").value;
      if (functionType === "sin") {
        vFunction = "Math.sin(x)";
      } else if (functionType === "cos") {
        vFunction = "Math.cos(x)";
      } else if (functionType === "poly") {
        vFunction = "x^2"; // Default polynomial
      }
    }
    
    // Apply function type if not using custom function
    if (document.getElementById("functionType").value !== "custom") {
      var functionType = document.getElementById("functionType").value;
      if (functionType === "sin") {
        vFunction = "Math.sin(" + (vFunction || "x") + ")";
      } else if (functionType === "cos") {
        vFunction = "Math.cos(" + (vFunction || "x") + ")";
      } else if (functionType === "poly") {
        // For polynomial, keep the function as is
      }
    }
    
    console.log("Drawing function: " + vFunction);
    
    // Create points array for plotting
    var points = [];
    var step = 1 / (density * gScale);
    var xStart = -XLen / gScale;
    var xEnd = XLen / gScale;
    
    for (var x = xStart; x <= xEnd; x += step) {
      try {
        var y = fCompute(x);
        if (!isNaN(y) && isFinite(y)) {
          points.push({ x: x, y: y });
        }
      } catch (error) {
        console.error("Error computing function at x=" + x, error);
      }
    }
    
    // Draw the function curve
    if (points.length > 1) {
      objPen.beginPath();
      objPen.strokeStyle = "#FF0000"; // Red color for the function
      objPen.lineWidth = 2 / gScale;
      
      objPen.moveTo(points[0].x, points[0].y);
      
      for (var i = 1; i < points.length; i++) {
        // Skip discontinuities
        if (Math.abs(points[i].y - points[i-1].y) > 100) {
          objPen.stroke();
          objPen.beginPath();
          objPen.moveTo(points[i].x, points[i].y);
        } else {
          objPen.lineTo(points[i].x, points[i].y);
        }
      }
      
      objPen.stroke();
    }
    
    // Add function to history if it's not already there
    addToHistory(vFunction);
  }
  
  // Function history
  var functionHistory = [];
  
  function addToHistory(func) {
    // Only add if not already in history and not empty
    if (func && func.trim() !== "" && !functionHistory.includes(func)) {
      functionHistory.push(func);
      updateHistoryDisplay();
    }
  }
  
  function updateHistoryDisplay() {
    var historyElement = document.getElementById("functionHistory");
    if (historyElement) {
      historyElement.innerHTML = "";
      
      for (var i = functionHistory.length - 1; i >= 0; i--) {
        var item = document.createElement("div");
        item.className = "history-item";
        item.textContent = functionHistory[i];
        item.onclick = (function(func) {
          return function() {
            document.getElementById("iFunction").value = func;
            document.getElementById("functionType").value = "custom";
            draw(true);
          };
        })(functionHistory[i]);
        
        historyElement.appendChild(item);
      }
    }
  }
  
  function clearHistory() {
    functionHistory = [];
    updateHistoryDisplay();
  }
  
  function clearGraph() {
    document.getElementById('iFunction').value = "";
    if (objPen) {
      clearCanvas();
      drawGrid();
    }
  }
  
  function onFunctionTypeChange() {
    var type = document.getElementById("functionType").value;
    var inputLabel = document.getElementById("functionInputLabel");
    
    if (type === "sin") {
      inputLabel.textContent = "Sin(";
      document.getElementById("inputEndBracket").textContent = ")";
    } else if (type === "cos") {
      inputLabel.textContent = "Cos(";
      document.getElementById("inputEndBracket").textContent = ")";
    } else if (type === "poly") {
      inputLabel.textContent = "";
      document.getElementById("inputEndBracket").textContent = "";
    } else {
      inputLabel.textContent = "";
      document.getElementById("inputEndBracket").textContent = "";
    }
  }

// Initialize app on load
window.onload = function() {
    // Start the clock
    setTimeout(time, 1000);
    
    // Initialize the geometry feature
    try {
      initGeometry();
    } catch (error) {
      console.error("Error initializing geometry:", error);
    }
    
    // Set up event listener for mode changes
    var oldHideFunction = hideFunction;
    hideFunction = function() {
      oldHideFunction();
      
      // Initialize components based on current mode
      if (flag === 1) { // Graph mode
        setTimeout(function() {
          initGraph();
          drawGrid();
        }, 100);
      } else if (flag === 2) { // Geometry mode
        setTimeout(function() {
          initGeometry();
        }, 100);
      }
    };
  }
  
  // Make sure to add this initializeAllComponents function
  function initializeAllComponents() {
    // Initialize the canvas when switching to graph mode
    if (document.getElementById("idShowHideGraph").style.display === "block") {
      initGraph();
      drawGrid();
    }
  }

// Geometry mode functions - enhanced version

// Initialize the triangle diagram and interaction
// More robust geometry initialization
function initGeometry() {
    console.log("Initializing geometry mode...");
    
    // Make sure the results section is hidden initially
    var resultsSection = document.getElementById("resultsSection");
    if (resultsSection) {
      resultsSection.style.display = "none";
    }
    
    // Initialize the clickable areas
    setTimeout(function() {
      try {
        initImageMap();
      } catch (error) {
        console.error("Error initializing image map:", error);
      }
    }, 200); // Small delay to ensure elements are rendered
  }
  
  // Geometry Input/output/GUI handling
  var ioNames = ["sideA", "sideB", "sideC", "angleA", "angleB", "angleC", "area"];
  var solution = null; // Either null, or an array of 6 items: [sideA, sideB, sideC, angleA, angleB, angleC]
  
  // Modified solve function with better UI feedback
  function solve() {
    function doOutput(nodeId, val, suffix) {
      if (and(typeof val == "object", val.length == 2)) { // Array
        setElementText(nodeId, formatNumber(val[0]) + suffix);
        setElementText(nodeId + "2", formatNumber(val[1]) + suffix);
        twosoln = true;
      } else if (typeof val == "number") {
        setElementText(nodeId, formatNumber(val) + suffix);
        setElementText(nodeId + "2", formatNumber(val) + suffix);
      } else {
        throw "Assertion error";
      }
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
      
      // Show the results section
      document.getElementById("resultsSection").style.display = "block";
      
      // Handle two solutions case
      if (twosoln) {
        document.getElementById("secondSolutionContainer").style.display = "block";
      } else {
        document.getElementById("secondSolutionContainer").style.display = "none";
      }
      
      // Scroll to results
      document.getElementById("resultsSection").scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      return false; // Prevent form submission
    } catch (e) {
      clearOutputs();
      setElementText("status", e);
      document.getElementById("resultsSection").style.display = "block";
      document.getElementById("secondSolutionContainer").style.display = "none";
      return false;
    }
  }
  
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
  
  // Improved clearOutputs function
  function clearOutputs() {
    solution = null;
    document.getElementById("secondSolutionContainer").style.display = "none";
    document.getElementById("resultsSection").style.display = "none";
    
    // Clear all output fields
    ioNames.forEach(function(name) {
      setElementText(name + "out", "");
      setElementText(name + "out2", "");
    });
    setElementText("status", "");
  }
  
  var RECT_PADDED_SIZE = 36;
  
// showing the traingle with regions that direct users to input areas
function initImageMap() {
    // Define clickable areas for the triangle diagram with final positions
    var triangleAreas = [
      { id: 'sideAin', x: 200, y: 220, width: 30, height: 30 }, // Side b (bottom)
      { id: 'sideBin', x: 100, y: 120, width: 30, height: 30 }, // Side c (left) 
      { id: 'sideCin', x: 300, y: 100, width: 30, height: 30 }, // Side a (right) - moved outside
      { id: 'angleAin', x: 40, y: 220, width: 30, height: 30 },  // Angle A (bottom left)
      { id: 'angleBin', x: 200, y: 10, width: 30, height: 30 },  // Angle B (top) - adjusted position
      { id: 'angleCin', x: 360, y: 220, width: 30, height: 30 }  // Angle C (bottom right)
    ];
    
    var container = document.getElementById("diagramcontainer");
    if (!container) {
      console.error("Triangle diagram container not found");
      return;
    }
    
    // Get container dimensions for scaling
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight || 250; // Fallback height
    var scaleX = containerWidth / 400; // 400 is the base width
    var scaleY = containerHeight / 250; // 250 is the base height
    
    // Clear any existing interactive elements
    var existingLinks = container.querySelectorAll(".letterhover");
    existingLinks.forEach(function(elem) {
      if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    });
    
    // Create interactive areas
    triangleAreas.forEach(function(area) {
      var elem = container.appendChild(document.createElement("a"));
      elem.href = "#" + area.id;
      elem.className = "letterhover";
      
      // Scale coordinates
      var left = area.x * scaleX - (RECT_PADDED_SIZE / 2);
      var top = area.y * scaleY - (RECT_PADDED_SIZE / 2);
      
      // Set styles
      elem.style.left = left + "px";
      elem.style.top = top + "px";
      elem.style.width = RECT_PADDED_SIZE + "px";
      elem.style.height = RECT_PADDED_SIZE + "px";
      elem.style.position = "absolute";
      elem.style.display = "block";
      elem.style.borderRadius = "4px";
      elem.style.zIndex = "10";
      
      // Add hover effect
      elem.onmouseover = function() {
        this.style.backgroundColor = "rgba(128, 128, 128, 0.3)";
        
        // Show value if available
        if (solution) {
          var index = -1;
          if (area.id === "sideAin") index = 0;
          if (area.id === "sideBin") index = 1;
          if (area.id === "sideCin") index = 2;
          if (area.id === "angleAin") index = 3;
          if (area.id === "angleBin") index = 4;
          if (area.id === "angleCin") index = 5;
          
          if (index !== -1) {
            var suffix = (index >= 3 && index < 6) ? DEGREE : "";
            var value;
            
            if (typeof solution[index] === "object") {
              value = formatNumber(solution[index][0]) + suffix + " or " + formatNumber(solution[index][1]) + suffix;
            } else if (typeof solution[index] === "number") {
              value = formatNumber(solution[index]) + suffix;
            } else {
              value = "Unknown";
            }
            
            var hovelem = document.getElementById("hoveroutput");
            if (hovelem) {
              hovelem.innerHTML = value;
              hovelem.style.display = "block";
              hovelem.style.left = (parseFloat(this.style.left) + RECT_PADDED_SIZE) + "px";
              hovelem.style.top = (parseFloat(this.style.top) - 30) + "px";
            }
          }
        }
      };
      
      elem.onmouseout = function() {
        this.style.backgroundColor = "transparent"; // Fully transparent on mouseout
        var hovelem = document.getElementById("hoveroutput");
        if (hovelem) {
          hovelem.style.display = "none";
        }
      };
      
      elem.onclick = function(e) {
        e.preventDefault();
        var targetInput = document.getElementById(area.id);
        if (targetInput) {
          targetInput.focus();
        }
        return false;
      };
    });
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
  
  // Simple Helper functions
  function setElementText(nodeId, str) {
    var element = document.getElementById(nodeId);
    if (element) {
      element.textContent = str;
    }
  }
  
  function parsePixels(str) {
    var match = /^(\d+(?:\.\d*)?)px$/.exec(str);
    if (match != null)
      return parseFloat(match[1]);
    else
      throw "Invalid unit";
  }
  
  function formatNumber(x) {
    return x.toPrecision(6);
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
function checkQuad() {
    var a = parseFloat(document.fquad.fa.value);
    var b = parseFloat(document.fquad.fb.value);
    var c = parseFloat(document.fquad.fc.value);
    
    // Display the results section
    document.getElementById('quadratic-results').style.display = 'block';
    
    // Create equation display
    var equationStr = "";
    
    if (a === 0) {
      // Linear equation case
      if (b === 0) {
        if (c === 0) {
          // 0 = 0, infinite solutions
          document.getElementById('x1').value = "All real numbers";
          document.getElementById('x2').value = "All real numbers";
          document.getElementById('equation-display').textContent = "Equation: 0 = 0";
          document.getElementById('solution-note').textContent = "This equation is satisfied by all real numbers (infinite solutions).";
        } else {
          // c = 0, no solution
          document.getElementById('x1').value = "No solution";
          document.getElementById('x2').value = "No solution";
          document.getElementById('equation-display').textContent = `Equation: ${c} = 0`;
          document.getElementById('solution-note').textContent = "This equation has no solution.";
        }
      } else {
        // bx + c = 0
        var x = -c / b;
        document.getElementById('x1').value = x;
        document.getElementById('x2').value = "N/A";
        
        if (b === 1) {
          equationStr = `x + ${c} = 0`;
        } else if (b === -1) {
          equationStr = `-x + ${c} = 0`;
        } else {
          equationStr = `${b}x + ${c} = 0`;
        }
        
        document.getElementById('equation-display').textContent = `Equation: ${equationStr}`;
        document.getElementById('solution-note').textContent = "This is a linear equation, not a quadratic equation. It has one solution.";
      }
      return;
    }
    
    // Construct equation string
    if (a === 1) {
      equationStr = "x²";
    } else if (a === -1) {
      equationStr = "-x²";
    } else {
      equationStr = a + "x²";
    }
    
    if (b > 0) {
      if (b === 1) {
        equationStr += " + x";
      } else {
        equationStr += " + " + b + "x";
      }
    } else if (b < 0) {
      if (b === -1) {
        equationStr += " - x";
      } else {
        equationStr += " - " + Math.abs(b) + "x";
      }
    }
    
    if (c > 0) {
      equationStr += " + " + c;
    } else if (c < 0) {
      equationStr += " - " + Math.abs(c);
    }
    
    equationStr += " = 0";
    document.getElementById('equation-display').textContent = "Equation: " + equationStr;
    
    // Calculate discriminant
    var discriminant = b * b - 4 * a * c;
    
    if (discriminant > 0) {
      // Two real solutions
      var sqrtDiscriminant = Math.sqrt(discriminant);
      var x1 = (-b + sqrtDiscriminant) / (2 * a);
      var x2 = (-b - sqrtDiscriminant) / (2 * a);
      
      document.getElementById('x1').value = x1;
      document.getElementById('x2').value = x2;
      document.getElementById('solution-note').textContent = 
        `The discriminant (b² - 4ac) = ${discriminant} > 0, so this equation has two distinct real solutions.`;
    } else if (discriminant === 0) {
      // One repeated solution
      var x = -b / (2 * a);
      document.getElementById('x1').value = x;
      document.getElementById('x2').value = x;
      document.getElementById('solution-note').textContent = 
        `The discriminant (b² - 4ac) = 0, so this equation has one repeated real solution.`;
    } else {
      // Complex solutions
      var realPart = -b / (2 * a);
      var imagPart = Math.sqrt(-discriminant) / (2 * a);
      
      document.getElementById('x1').value = realPart.toFixed(4) + " + " + imagPart.toFixed(4) + "i";
      document.getElementById('x2').value = realPart.toFixed(4) + " - " + imagPart.toFixed(4) + "i";
      document.getElementById('solution-note').textContent = 
        `The discriminant (b² - 4ac) = ${discriminant} < 0, so this equation has two complex solutions.`;
    }
    
    // Scroll to results
    document.getElementById('quadratic-results').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  
  // Clear the quadratic results when form is reset
  function clearQuadraticResults() {
    document.getElementById('quadratic-results').style.display = 'none';
    document.getElementById('x1').value = '';
    document.getElementById('x2').value = '';
    document.getElementById('equation-display').textContent = '';
    document.getElementById('solution-note').textContent = '';
  }
  
  // Add event listener to the reset button
  document.addEventListener('DOMContentLoaded', function() {
    var resetButton = document.querySelector('form[name="fquad"] button[type="reset"]');
    if (resetButton) {
      resetButton.addEventListener('click', clearQuadraticResults);
    }
  });