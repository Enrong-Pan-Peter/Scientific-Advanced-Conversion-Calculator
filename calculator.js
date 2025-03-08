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
var RECT_PADDED_SIZE = 36;
var DEGREE = "\u00B0";
var functionHistory = []; // For tracking graphing history

// Basic Calculator Functions
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

// Trigonometry Functions
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

// Min/Max Data Analysis Function
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
      value = parseFloat(srcStrArr[i]);

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

// Temperature Conversion
function temperature(num) {
  try {
    var Fdegree = "";
    var Cdegree = "";
    if (num == "to℉") {
      Cdegree = parseFloat(document.getElementById('text').value);
      Fdegree = Cdegree * 9 / 5 + 32;
      document.getElementById("text").value = Fdegree + "℉";
    } else if (num == "to℃") {
      Fdegree = parseFloat(document.getElementById('text').value);
      Cdegree = (Fdegree - 32) * 5 / 9;
      document.getElementById("text").value = Cdegree + "℃";
    }
  } catch (error) {
    document.getElementById("text").value = "Error";
    console.error("Temperature conversion error:", error);
  }
}

// Power, Square, Percentage Functions
function fPower_Square_Percent(num) {
  try {
    var inputValue = parseFloat(document.getElementById('text').value);
    
    if (num == "x^2") {
      result = Math.pow(inputValue, 2);
      document.getElementById('text').value = result;
    } else if (num == "x^3") {
      result = Math.pow(inputValue, 3);
      document.getElementById('text').value = result;
    } else if (num == "x to%") {
      result = inputValue * 100;
      document.getElementById('text').value = result + "%";
    } else if (num == "%to x") {
      result = inputValue / 100;
      document.getElementById('text').value = result;
    } else if (num == "√￣") {
      var squareRoot = Math.sqrt(inputValue);
      document.getElementById("text").value = squareRoot;
      result = squareRoot;
    } else if (num == "abs") {
      result = Math.abs(inputValue);
      document.getElementById("text").value = result;
    } else if (num == "log") {
      result = Math.log(inputValue);
      document.getElementById("text").value = result;
    } else if (num == "int") {
      result = Math.floor(inputValue);
      document.getElementById("text").value = result;
    }
  } catch (error) {
    document.getElementById("text").value = "Error";
    console.error("Function calculation error:", error);
  }
}

// Spacing Function
function fSpacing() {
  result = document.getElementById('text').value;
  document.getElementById('text').value = result + " ";
}

// Date Function
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

// Clock Function
var t = null;
function time() {
  clearTimeout(t);
  var dt = new Date();
  var hr = dt.getHours();
  var minute = dt.getMinutes();
  var sec = dt.getSeconds();
  
  // Format with leading zeros
  minute = minute < 10 ? "0" + minute : minute;
  sec = sec < 10 ? "0" + sec : sec;
  
  document.getElementById("timeShow").innerHTML = hr + ":" + minute + ":" + sec;
  t = setTimeout(time, 1000);
}

/***********************************
 * Graph Mode Functions
 ***********************************/

// Initialize graph canvas
function initGraph() {
    objCanvas = document.getElementById("idCanvas");
    if (objCanvas) {
      objPen = objCanvas.getContext("2d");
      
      // Set canvas dimensions to match container
      var container = document.getElementById("graph-container");
      if (container) {
        objCanvas.width = container.clientWidth;
        objCanvas.height = container.clientHeight;
      } else {
        objCanvas.width = 800;
        objCanvas.height = 400;
      }
      
      // Reset canvas position
      objCanvas.style.left = "0px";
      objCanvas.style.top = "0px";
      
      // Center the origin
      objPen.translate(objCanvas.width / 2, objCanvas.height / 2);
      objPen.scale(gScale, -gScale); // Flip Y-axis to make positive Y go up
      
      // Add direct event listeners to the canvas
      objCanvas.addEventListener('mousedown', fMousedown);
      objCanvas.addEventListener('mouseup', fMouseup);
      objCanvas.addEventListener('mousemove', fMousemove);
      objCanvas.addEventListener('mouseover', fMouseover);
      objCanvas.addEventListener('mouseout', fMouseout);
      objCanvas.addEventListener('wheel', handleMouseWheel, { passive: false });
      
      // Set initial cursor style
      objCanvas.style.cursor = "grab";
      
      // Draw initial grid
      drawGrid();
    }
  }

// Handle mouse wheel event for zooming
function handleMouseWheel(e) {
    e.preventDefault();
    
    // Get mouse position relative to canvas center
    var rect = objCanvas.getBoundingClientRect();
    var mouseX = e.clientX - rect.left - objCanvas.width / 2;
    var mouseY = e.clientY - rect.top - objCanvas.height / 2;
    
    // Convert to graph coordinates
    var graphX = mouseX / gScale;
    var graphY = -mouseY / gScale;
    
    // Determine zoom direction
    var zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    
    // Apply zoom
    objPen.translate(graphX, graphY);
    objPen.scale(zoomFactor, zoomFactor);
    objPen.translate(-graphX, -graphY);
    
    // Update global scale
    gScale *= zoomFactor;
    
    // Redraw
    clearCanvas();
    drawGrid();
    draw(false);
}

// Draw grid and axes
function drawGrid() {
    if (!objPen) return;
    
    clearCanvas();
    
    // Calculate visible area
    var visibleWidth = objCanvas.width / gScale;
    var visibleHeight = objCanvas.height / gScale;
    var gridSize = 10; // Grid spacing
    
    // Draw grid
    objPen.beginPath();
    objPen.strokeStyle = "#e0e0e0";
    objPen.lineWidth = 1 / gScale;
    
    // Vertical grid lines
    for (var x = -Math.floor(visibleWidth/2/gridSize) * gridSize; x <= Math.floor(visibleWidth/2/gridSize) * gridSize; x += gridSize) {
      objPen.moveTo(x, -visibleHeight/2);
      objPen.lineTo(x, visibleHeight/2);
    }
    
    // Horizontal grid lines
    for (var y = -Math.floor(visibleHeight/2/gridSize) * gridSize; y <= Math.floor(visibleHeight/2/gridSize) * gridSize; y += gridSize) {
      objPen.moveTo(-visibleWidth/2, y);
      objPen.lineTo(visibleWidth/2, y);
    }
    
    objPen.stroke();
    
    // Draw axes
    objPen.beginPath();
    objPen.strokeStyle = "#000000";
    objPen.lineWidth = 1.5 / gScale;
    
    // X-axis
    objPen.moveTo(-visibleWidth/2, 0);
    objPen.lineTo(visibleWidth/2, 0);
    
    // Y-axis
    objPen.moveTo(0, -visibleHeight/2);
    objPen.lineTo(0, visibleHeight/2);
    
    objPen.stroke();
}

// Mouse event handlers for graph panning
function fMousedown(e) {
    e.preventDefault();
    vMouseflag = true;
    vDownX = e.clientX;
    vDownY = e.clientY;
    
    // Change cursor to indicate dragging is active
    if (objCanvas) {
      objCanvas.style.cursor = "grabbing";
    }
    
    console.log("Mouse down: dragging started");
  }
  
  function fMouseup(e) {
    vMouseflag = false;
    
    // Reset cursor
    if (objCanvas) {
      objCanvas.style.cursor = "grab";
    }
    
    console.log("Mouse up: dragging stopped");
  }
  
  function fMouseover(e) {
    if (objCanvas) {
      objCanvas.style.cursor = "grab";
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
    
    // Calculate the mouse movement in pixels
    var deltaX = e.clientX - vDownX;
    var deltaY = e.clientY - vDownY;
    vDownX = e.clientX;
    vDownY = e.clientY;
    
    console.log("Dragging: deltaX=" + deltaX + ", deltaY=" + deltaY);
    
    // Convert pixel movement to graph coordinates
    var graphDeltaX = deltaX / gScale;
    var graphDeltaY = -deltaY / gScale; // Flip Y because screen Y is inverted
    
    // Update the canvas translation
    objPen.translate(graphDeltaX, graphDeltaY);
    
    // Redraw
    clearCanvas();
    drawGrid();
    draw(false);
  }

// Clear canvas
function clearCanvas() {
    if (!objPen) return;
    
    // Get visible area dimensions
    var visibleWidth = objCanvas.width;
    var visibleHeight = objCanvas.height;
    
    // Clear the entire canvas
    objPen.save();
    objPen.setTransform(1, 0, 0, 1, 0, 0);
    objPen.clearRect(0, 0, visibleWidth, visibleHeight);
    objPen.restore();
}

// Zoom functions
function enlarge() {
    // Zoom in at the center
    var centerX = 0;
    var centerY = 0;
    
    objPen.translate(centerX, centerY);
    objPen.scale(1.2, 1.2);
    objPen.translate(-centerX, -centerY);
    
    gScale *= 1.2;
    
    // Redraw
    clearCanvas();
    drawGrid();
    draw(false);
}
  
function reduce() {
    // Zoom out from the center
    var centerX = 0;
    var centerY = 0;

    objPen.translate(centerX, centerY);
    objPen.scale(0.8, 0.8);
    objPen.translate(-centerX, -centerY);

    gScale *= 0.8;

    // Redraw
    clearCanvas();
    drawGrid();
    draw(false);
}
  
  // Control point calculation for smooth curves
  function getCtrlPoint(x0, y0, x1, y1, x2, y2, x3, y3) {
    var a = 0.15, b = 0.15;
    var pAx = x1 + (x2 - x0) * a;
    var pAy = y1 + (y2 - y0) * a;
    var pBx = x2 - (x3 - x1) * b;
    var pBy = y2 - (y3 - y1) * b;
    return [[pAx, pAy], [pBx, pBy]];
  }
  
  // Enhanced function evaluator for graphing
  function fCompute(x) {
    try {
      // Make copy of the function expression
      var expression = vFunction;
      
      // Replace variables
      expression = expression.replace(/x/g, "(" + x + ")");
      
      // Replace common mathematical functions with JavaScript equivalents if not prefixed
      if (expression.indexOf("Math.") === -1) {
        expression = expression.replace(/sin\(/g, "Math.sin(");
        expression = expression.replace(/cos\(/g, "Math.cos(");
        expression = expression.replace(/tan\(/g, "Math.tan(");
        expression = expression.replace(/log\(/g, "Math.log(");
        expression = expression.replace(/sqrt\(/g, "Math.sqrt(");
        expression = expression.replace(/\^/g, "**"); // Support for exponentiation
      }
      
      // Evaluate the expression
      return eval(expression);
    } catch (error) {
      console.error("Error evaluating function:", error);
      return NaN;
    }
  }
  
  // Function to handle different function types
  function onFunctionTypeChange() {
    var type = document.getElementById("functionType").value;
    var inputLabel = document.getElementById("functionInputLabel");
    var endBracket = document.getElementById("inputEndBracket");
    
    if (type === "sin") {
      inputLabel.textContent = "sin(";
      endBracket.textContent = ")";
    } else if (type === "cos") {
      inputLabel.textContent = "cos(";
      endBracket.textContent = ")";
    } else if (type === "poly") {
      inputLabel.textContent = "";
      endBracket.textContent = "";
    } else {
      inputLabel.textContent = "";
      endBracket.textContent = "";
    }
  }
  
  // Draw function graph
function draw(needCalcul) {
    if (!objCanvas || !objPen) {
      initGraph();
    }
    
    // Get function input
    var functionInput = document.getElementById("iFunction").value;
    if (!functionInput) return;
    
    // Apply function type if not custom
    var functionType = document.getElementById("functionType").value;
    if (functionType !== "custom") {
      if (functionType === "sin") {
        vFunction = "Math.sin(" + functionInput + ")";
      } else if (functionType === "cos") {
        vFunction = "Math.cos(" + functionInput + ")";
      } else if (functionType === "poly") {
        vFunction = functionInput;
      }
    } else {
      vFunction = functionInput;
    }
    
    // Clear and redraw grid
    drawGrid();
    
    // Calculate visible area in graph coordinates
    var transform = objPen.getTransform();
    var visibleWidth = objCanvas.width / transform.a; // transform.a is the horizontal scale
    var visibleHeight = objCanvas.height / Math.abs(transform.d); // transform.d is the vertical scale
    var xMin = -visibleWidth / 2;
    var xMax = visibleWidth / 2;
    
    // Draw function
    objPen.beginPath();
    objPen.strokeStyle = "#ff0000";
    objPen.lineWidth = 2 / gScale;
    
    // Adjust step size based on zoom level for smoother curves at high zoom levels
    var step = 0.1 / gScale;
    var firstPoint = true;
    var lastY;
    
    for (var x = xMin; x <= xMax; x += step) {
      var y = fCompute(x);
      
      if (!isNaN(y) && isFinite(y)) {
        // Check for discontinuities
        if (!firstPoint && Math.abs(y - lastY) > 50) {
          objPen.stroke();
          objPen.beginPath();
          firstPoint = true;
        }
        
        if (firstPoint) {
          objPen.moveTo(x, y);
          firstPoint = false;
        } else {
          objPen.lineTo(x, y);
        }
        
        lastY = y;
      }
    }
    
    objPen.stroke();
    
    // Add to history if not already there
    if (needCalcul) {
      addToHistory(functionInput);
    }
  }
  
  // Function history management
  function addToHistory(func) {
    if (func && !functionHistory.includes(func)) {
      functionHistory.push(func);
      updateHistoryDisplay();
    }
  }
  
  function updateHistoryDisplay() {
    var historyContainer = document.getElementById("functionHistory");
    if (!historyContainer) return;
    
    historyContainer.innerHTML = "";
    
    // Display most recent functions first
    for (var i = functionHistory.length - 1; i >= 0; i--) {
      var historyItem = document.createElement("a");
      historyItem.className = "list-group-item list-group-item-action";
      historyItem.href = "#";
      historyItem.textContent = functionHistory[i];
      
      historyItem.onclick = (function(func) {
        return function(e) {
          e.preventDefault();
          document.getElementById("iFunction").value = func;
          document.getElementById("functionType").value = "custom";
          draw(true);
        };
      })(functionHistory[i]);
      
      historyContainer.appendChild(historyItem);
    }
  }
  
  function clearHistory() {
    functionHistory = [];
    updateHistoryDisplay();
  }
  
  function clearGraph() {
    document.getElementById("iFunction").value = "";
    drawGrid();
  }
  
  /***********************************
   * Geometry Mode Functions
   ***********************************/
  
  // Initialize geometry components
  function initGeometry() {
    // Initialize the clickable areas on the triangle
    initImageMap();
    
    // Make sure the results section is hidden initially
    var resultsSection = document.getElementById("resultsSection");
    if (resultsSection) {
      resultsSection.style.display = "none";
    }
  }
  
  // Interactive triangle map initialization
  function initImageMap() {
    // Define clickable areas for the triangle diagram
    var triangleAreas = [
      { id: 'sideAin', x: 300, y: 100, width: 30, height: 30 }, // Side a (right)
      { id: 'sideBin', x: 200, y: 235, width: 30, height: 30 }, // Side b (bottom)
      { id: 'sideCin', x: 100, y: 120, width: 30, height: 30 }, // Side c (left)
      { id: 'angleAin', x: 40, y: 230, width: 30, height: 30 },  // Angle A (bottom left)
      { id: 'angleBin', x: 200, y: 15, width: 30, height: 30 },  // Angle B (top)
      { id: 'angleCin', x: 360, y: 230, width: 30, height: 30 }  // Angle C (bottom right)
    ];
    
    var container = document.getElementById("diagramcontainer");
    if (!container) {
      console.error("Triangle diagram container not found");
      return;
    }
    
    // Get container dimensions for scaling
    var containerWidth = container.clientWidth || 400;
    var containerHeight = container.clientHeight || 250;
    var scaleX = containerWidth / 400;
    var scaleY = containerHeight / 250;
    
    // Clear any existing clickable areas
    var existingLinks = container.querySelectorAll(".letterhover");
    existingLinks.forEach(function(elem) {
      if (elem.parentNode) {
        elem.parentNode.removeChild(elem);
      }
    });
    
    // Create clickable areas
    triangleAreas.forEach(function(area) {
      var elem = document.createElement("a");
      elem.href = "#" + area.id;
      elem.className = "letterhover";
      container.appendChild(elem);
      
      // Scale coordinates
      var left = area.x * scaleX - (RECT_PADDED_SIZE / 2);
      var top = area.y * scaleY - (RECT_PADDED_SIZE / 2);
      
      // Set styles
      elem.style.position = "absolute";
      elem.style.left = left + "px";
      elem.style.top = top + "px";
      elem.style.width = RECT_PADDED_SIZE + "px";
      elem.style.height = RECT_PADDED_SIZE + "px";
      elem.style.zIndex = "10";
      elem.style.borderRadius = "4px";
      elem.style.cursor = "pointer";
      
      // Add interactivity
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
        this.style.backgroundColor = "transparent";
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

  // Solve triangle with given inputs
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
      // Get input values
      var a = getInputNumber("sideAin");
      var b = getInputNumber("sideBin");
      var c = getInputNumber("sideCin");
      var A = getInputNumber("angleAin");
      var B = getInputNumber("angleBin");
      var C = getInputNumber("angleCin");
      
      // Solve the triangle
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
      
      // Scroll to results
      document.getElementById("resultsSection").scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      return false;
    }
  }
  
  // Parses the number from the HTML form field with the given ID.
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
  
  // Clear all triangle outputs
  function clearOutputs() {
    solution = null;
    
    // Hide results sections
    document.getElementById("secondSolutionContainer").style.display = "none";
    document.getElementById("resultsSection").style.display = "none";
    
    // Clear all output fields
    ioNames = ["sideA", "sideB", "sideC", "angleA", "angleB", "angleC", "area"];
    ioNames.forEach(function(name) {
      setElementText(name + "out", "");
      setElementText(name + "out2", "");
    });
    setElementText("status", "");
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
  else // Numerically stable law of cosines for small angles
    return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
}

// Returns angle C using law of cosines.
function solveAngle(a, b, c) {
  var temp = (a * a + b * b - c * c) / (2 * a * b);
  if (and(temp >= -1, 0.9999999 >= temp))
    return radToDeg(Math.acos(temp));
  else if (1 >= temp) // Numerically stable version for angles close to 0
    return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
  else
    throw "No solution";
}

/***********************************
 * Quadratic Solver Functions
 ***********************************/

// Solve quadratic equation
function checkQuad() {
  var a = parseFloat(document.fquad.fa.value);
  var b = parseFloat(document.fquad.fb.value);
  var c = parseFloat(document.fquad.fc.value);
  
  // Display the results section
  document.getElementById('quadratic-results').style.display = 'block';
  
  // Create equation display string
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
    
    // Scroll to results
    document.getElementById('quadratic-results').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    
    return false;
  }
  
  // Construct equation string for quadratic equation
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
  
  return false;
}

// Clear quadratic results
function clearQuadraticResults() {
  document.getElementById('quadratic-results').style.display = 'none';
  document.getElementById('x1').value = '';
  document.getElementById('x2').value = '';
  document.getElementById('equation-display').textContent = '';
  document.getElementById('solution-note').textContent = '';
}

/***********************************
 * Helper Functions
 ***********************************/

// Set element text content
function setElementText(nodeId, str) {
  var element = document.getElementById(nodeId);
  if (element) {
    element.textContent = str;
  }
}

// Format number for display
function formatNumber(x) {
  return Number(x.toFixed(4)).toString();
}

// Convert degrees to radians
function degToRad(x) {
  return x / 180 * Math.PI;
}

// Convert radians to degrees
function radToDeg(x) {
  return x / Math.PI * 180;
}

// Logical AND helper
function and(x, y) {
  return x ? y : false;
}