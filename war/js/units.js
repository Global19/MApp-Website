/** iFrame Setup **/
// set default heights and widths for iframes
var default_width = 960;
var default_height = 749;
var default_doc_height = 300;
var default_ratio = default_width / default_height;

// Adjust iframe dimensions on load
$(document).ready(function() {
	$("#header").load("../header.html"); 	// load the header
	resizeFrames();							// initial iframe sizing
});

//Adjust iframe dimensions on resize
$(window).resize(function() {
	resizeFrames();
});

// update iframe width and height
function resizeFrames() {
	
	var iframe_ratio = default_width / default_height;		// need to calculate an updated height
	var win_width = $(window).width();
	var iframes = document.getElementsByTagName("iframe");
	
	// if the window is between 100 and default_width pixels > update
	if(win_width<default_width && win_width>100) {
		
		// for each iframe, calculate and set a new width and height
		for(var i=0; i<iframes.length; i++) {
			var updated_width = win_width - 50;
			var updated_height = updated_width / default_ratio;

			var iframe = iframes[i];
			var iclass = iframe.className;
			
			iframe.setAttribute("width", updated_width);
			if(iclass==="slidedeck") {
				iframe.setAttribute("height", updated_height);
			}
			else if(iclass==="doc"){
				iframe.setAttribute("height", default_doc_height);
			}
		}
	}
	
	// otherwise set defaults
	else {
		for(var i=0; i<iframes.length; i++) {
			var iframe = iframes[i];
			var iclass = iframe.className;
			
			iframe.setAttribute("width", default_width);
			if(iclass==="slidedeck") {
				iframe.setAttribute("height", default_height);
			}
			else if(iclass==="doc"){
				iframe.setAttribute("height", default_doc_height);
			}
		}
	}
}

/** Handle Button Clicks **/
var bclicked = "Reload";
var bunclicked = "Begin";
var ow_header = "Overview";
var gs_header = "Getting Started";
var qz_header = "Quizzes";

// Redirect with correct handler argument
function open_intro_ow() { open_intro_handler("ow"); }
function open_intro_gs() { open_intro_handler("gs"); }
function open_intro_quizzes() { open_intro_handler("qz"); }

// Handle all requests to load new Intro Pages
function open_intro_handler(page) {

	// load the new section
	$("#content").load("../html/tutorial-intro-"+ page + ".html");
	
	 // update frame sizes
	 resizeFrames();
	
	 // update buttons' text
	 document.getElementById("t-intro-ow-bt").innerHTML = bunclicked;
	 document.getElementById("t-intro-gs-bt").innerHTML = bunclicked;
	 document.getElementById("t-intro-qz-bt").innerHTML = bunclicked;
	 document.getElementById("t-intro-"+page+"-bt").innerHTML = bclicked;

	 // update headers' text
	 document.getElementById("t-intro-ow-h").innerHTML = ow_header;
	 document.getElementById("t-intro-gs-h").innerHTML = gs_header;
	 document.getElementById("t-intro-qz-h").innerHTML = qz_header;
	 
	 // scroll to top of page
	 document.body.scrollTop = document.documentElement.scrollTop = 0;
	
	// update headers' text
	switch(page) {
		case "ow": 
			document.getElementById("t-intro-ow-h").innerHTML = "<u>" + ow_header + "</u>";
			break;
		case "gs": 
			document.getElementById("t-intro-gs-h").innerHTML = "<u>" + gs_header + "</u>";
			break;
		case "qz": 
			document.getElementById("t-intro-qz-h").innerHTML = "<u>" + qz_header + "</u>";
			break;
		default:
			alert("Unfortunately, something went wrong processing your page request. Please try again");
			break;
	}
}