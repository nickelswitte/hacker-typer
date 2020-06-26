/**
 * This is the text from the code file
 */
var fileText;

/**
 * This is the current position in the fileText
 */
var filePositionCounter = 0;

/**
 * Maximum chars that will be printed at one key press
 */
var stepsizeMax = 3;

/**
 * How far it will scroll when a key is pressed
 */
var scrollStep = 100000;

/**
 * The element where the code will be put in.
 */
var codeDiv = document.getElementById("code-div");

var cursorSpeed = 750;

var panelFirewall = document.getElementById("panel-firewall");

var cursor = document.getElementById("cursor");

var counterSlowly = 0;
var textSlowly;

/**
 * This part of the code decides what to happen, when a key is pressed
 */
document.addEventListener('keydown', function(e) {
    
    
    if (e.keyCode >= 48 && e.keyCode <= 90) {
        // When some normal keys are pressed
        displaySomeCode();
    } else if (e.keyCode == 13) {
        // ENTER
        panelFirewall.style.visibility = "visible";
    } else if (e.keyCode == 27) {
        // ESCAPE
        panelFirewall.style.visibility = "hidden";
    } else if (e.keyCode == 160) {
        // ^
        loadFile(dumpAll, "./text_files/filestructure.txt");
    } else if (e.keyCode == 188) {
        // ,
            
    } else if (e.keyCode == 190) {
        // .

    } else if (e.keyCode == 163) {
        //#
        clearCode();
    } else if (e.keyCode == 9) {
        e.preventDefault();
        dumpTillLineEnd();
    }
    

});

/**
 * This function will display some 
 */
function displaySomeCode() {

    // Calculate a random step size between one and Max Value
    var stepSizeRnd = Math.floor(Math.random() * stepsizeMax) + 1;

    var emptyChars = getNumberOfNextEmptyChars();

    // Append the number of chars to the div
    appendText(fileText.substring(filePositionCounter, filePositionCounter + emptyChars + stepSizeRnd));

    // Set the text counter to the new value
    filePositionCounter = filePositionCounter + emptyChars + stepSizeRnd;
}

function getNumberOfNextEmptyChars() {

    var numberOfEmptyChars = 0;

    var start = filePositionCounter;
    var offset = start + 1;

    while (fileText.substring(start, offset) == " " || fileText.substring(start, offset) == "\n") {
        // filePositionCounter + numberOfEmptyChars, filePositionCounter + numberOfEmptyChars + 1
        numberOfEmptyChars = numberOfEmptyChars + 1;
        
        
        start = filePositionCounter + numberOfEmptyChars;
        offset = start + 1;
    }

    return numberOfEmptyChars;
}

/**
 * Will store the info of the file to the variable.
 * This is used as a callback method.
 * @param {String} text 
 */
function saveFileToVariable(text) {
    fileText = text;
}

/**
 * This is a callback method.
 * Dumps String instantly on the page
 * @param {String} text Sting that will be dumped instantly on the page 
 */
function dumpAll(text) {
    appendText(text);
}

function dumpAllSlowly(text) {
    textSlowly = text;

    
}

function dumpTillLineEnd() {

    // Find the index of the next line break
    indexOfNextLinebreak = fileText.indexOf('\n', filePositionCounter) + 1;

    // Append everything till the next linebreak
    appendText(fileText.substring(filePositionCounter, indexOfNextLinebreak));

    // Update the file counter
    filePositionCounter = indexOfNextLinebreak;
}

/**
 * 
 * @param {String} text This is the text that is to be appended to the page 
 */
function appendText(text) {
    codeDiv.innerText = codeDiv.innerText + text;
    pageScroll();
}

/**
 * Will remove every code that has been displayed
 */
function clearCode() {
    codeDiv.innerText = "";
}

/**
 * Scroll the page down to the lowest possible point
 */
function pageScroll() {
    window.scrollBy(0, scrollStep);
}

/* 
 * This function will load a file and take its content to the callback method
 */
function loadFile(callbackMethod, pathToFile) {   

    // console.log(callbackMethod + " " + pathToFile);
    // console.log("Hey");

    var xobj = new XMLHttpRequest();

    xobj.open('GET', pathToFile, true);

    //xobj.setRequestHeader("Cache-Control", "max-age=0");

    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // console.log(xobj.responseText);
            callbackMethod(xobj.responseText);
        }
    };

    xobj.send(null);  
}

/**
 * This recursive function will male the cursor toggle
 */
function toggleCursor() {
    
    cursor.style.visibility == "hidden" ? cursor.style.visibility = "visible" : cursor.style.visibility = "hidden";
    
    setTimeout(() => {  toggleCursor(); }, cursorSpeed);
}

/**
 * Load init text into the div
 */
loadFile(dumpAll, "./text_files/init_text.txt");

/**
 * Load default code file to the variable
 */
loadFile(saveFileToVariable, "./text_files/code1.txt");

// Init the toggle cursor function
toggleCursor();
