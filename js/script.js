/**
 * This is the text from the code file
 */
var fileText;

/**
 * This is the current position in the fileText
 */
var counter = 0;

/**
 * Maximum chars that will be printed at one key press
 */
var stepsizeMax = 5;

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

/**
 * This part of the code decides what to happen, when a key is pressed
 */
document.addEventListener('keydown', function(e) {
    
    if (e.keyCode >= 48 && e.keyCode <= 90) {
        keyDown();
        pageScroll();
    } else if (e.keyCode == 13) {
        // alert("Firewall down");
        panelFirewall.style.visibility = "visible";
    } else if (e.keyCode == 27) {
        panelFirewall.style.visibility = "hidden";
    }
    

});

function keyDown() {

    var stepSizeRnd = Math.floor(Math.random() * stepsizeMax) + 1;

    codeDiv.innerText = codeDiv.innerText + fileText.substring(counter, counter + stepSizeRnd);
    counter = counter + stepSizeRnd;
}

function callbackMethod(text) {
    fileText = text;
}

function dumpAll(text) {
    codeDiv.innerText = text;
}

function pageScroll() {
    window.scrollBy(0, scrollStep);
}

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

function toggleCursor() {
    
    cursor.style.visibility == "hidden" ? cursor.style.visibility = "visible" : cursor.style.visibility = "hidden";
    
    setTimeout(() => {  toggleCursor(); }, cursorSpeed);
}

/**
 * Load init text into the div
 */
loadFile(dumpAll, "./init_text2.txt");

loadFile(callbackMethod, "./index.html");

toggleCursor();
