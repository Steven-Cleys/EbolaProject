var map;
var delay = 200; // sim delay between intervals

var mcG = 0; // markers guinea
var mcL = 0;
var mcS = 0;
var markers = [];
var garr = []; // json response
var larr = [];
var sarr = [];

var lchart = []; // arrays voor grafiek
var gchart = [];
var schart = [];

var gmarkers; // coords
var lmarkers;
var slmarkers;
var myslider; // timeline
var sliderpos = 0;


function initMap() {
	var mapOptions = { // create map with start pos
		center : {
			lat : 8.692158,
			lng : -11.917162
		},
		zoom : 6,
		mapTypeId : google.maps.MapTypeId.HYBRID
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions); // add
	// map
	// to
	// div

	myslider = $("#ex1").slider();
	loadRSS();

	$("#ex1").on(
			"slideStop",
			function(slideEvt) { // slide event on slider

				if (slideEvt.value != sliderpos) {
					deleteMarkers();
					mcG = 0;
					mcL = 0;
					mcS = 0;
					for (var i = 0; i < slideEvt.value; i++) {
						drawMarkers(garr[i].key, garr[i].value, larr[i].value,
								sarr[i].value); // load markers
					}

					sliderpos = slideEvt.value;
					console.log(slideEvt.value, sliderpos);
				}
			});
	// grab json data
	$.getJSON("../../guinea_coords", function(data) {
		// console.log(data);
		gmarkers = data.points;
		// console.log(gmarkers);
	});

	$.getJSON("../../lib_coords", function(data) {
		// console.log(data);
		lmarkers = data.points;
		// console.log(lmarkers);
	});

	$.getJSON("../../sierra_coords", function(data) {
		// console.log(data);
		slmarkers = data.points;
		// console.log(slmarkers);
	});

	$.ajax({
		type : 'GET',
		url : '_view/guinea',
		success : function(data) {
			// console.log(data);
			garr = JSON.parse(data).rows;
		},
		error : function(request, status, error) {
			console.log(error);
		}
	});

	$.ajax({
		type : 'GET',
		url : '_view/liberia',
		success : function(data) {
			// console.log(data);
			larr = JSON.parse(data).rows;
		},
		error : function(request, status, error) {
			console.log(error);
		}
	});

	$.ajax({
		type : 'GET',
		url : '_view/sierra',
		success : function(data) {
			// console.log(data);
			sarr = JSON.parse(data).rows;

		},
		error : function(request, status, error) {
			console.log(error);
		},
		complete : function(xhr, status) {
			setTimeout(function() {
				loadgraph(); //executes after a delay
			}, 1500)

		}
	});
}

function loadRSS() {
	$('#divRss').FeedEk({
		FeedUrl : 'http://www.theguardian.com/world/ebola/rss', // http://www.feedyes.com/feed.php?f=gdYa4PqYb3ve85qZ
		MaxCount : 8,
		ShowDesc : true,
		ShowPubDate : true,
		DescCharacterLimit : 100,
		TitleLinkTarget : '_blank',
		DateFormat : 'MM/DD/YYYY',
		DateFormatLang : 'en'
	});
}

function getCoords() { // function to get random locations in a polygon

	var image = {
		url : 'red.png',
		// This marker is 20 pixels wide by 32 pixels tall.
		size : new google.maps.Size(32, 32),
		scaledSize : new google.maps.Size(5, 5),
		anchor : new google.maps.Point(0, 0),
		origin : new google.maps.Point(0, 0)
	};
	//borders guinea
	var polygonG = [ [ -8.439298468448698, 7.686042792181738 ], 
			[ -8.722123582382125, 7.71167430259851 ],
			[ -8.926064622422004, 7.309037380396376 ],
			[ -9.208786383490846, 7.313920803247953 ],
			[ -9.40334815106975, 7.526905218938907 ],
			[ -9.337279832384581, 7.928534450711354 ],
			[ -9.755342169625834, 8.541055202666925 ],
			[ -10.016566534861255, 8.428503933135232 ],
			[ -10.23009355309128, 8.406205552601293 ],
			[ -10.505477260774668, 8.348896389189605 ],
			[ -10.494315151399633, 8.715540676300435 ],
			[ -10.654770473665891, 8.977178452994195 ],
			[ -10.622395188835041, 9.267910061068278 ],
			[ -10.839151984083301, 9.688246161330369 ],
			[ -11.11748124840733, 10.045872911006285 ],
			[ -11.917277390988659, 10.046983954300558 ],
			[ -12.150338100625005, 9.858571682164381 ],
			[ -12.425928514037565, 9.835834051955956 ],
			[ -12.59671912276221, 9.620188300001971 ],
			[ -12.71195756677308, 9.342711696810767 ],
			[ -13.246550258832515, 8.903048610871508 ],
			[ -13.685153977909792, 9.49474376061346 ],
			[ -14.074044969122282, 9.886166897008252 ],
			[ -14.330075852912371, 10.015719712763968 ],
			[ -14.579698859098258, 10.214467271358515 ],
			[ -14.693231980843505, 10.656300767454042 ],
			[ -14.839553798877944, 10.876571560098141 ],
			[ -15.130311245168173, 11.040411688679526 ],
			[ -14.685687221728898, 11.527823798056488 ],
			[ -14.382191534878729, 11.509271958863692 ],
			[ -14.121406419317779, 11.677117010947697 ],
			[ -13.900799729863776, 11.678718980348748 ],
			[ -13.743160773157413, 11.811269029177412 ],
			[ -13.828271857142125, 12.142644151249044 ],
			[ -13.718743658899513, 12.247185573775511 ],
			[ -13.700476040084325, 12.586182969610194 ],
			[ -13.217818162478238, 12.575873521367967 ],
			[ -12.499050665730564, 12.332089952031057 ],
			[ -12.27859900557344, 12.354440008997287 ],
			[ -12.203564825885634, 12.465647691289405 ],
			[ -11.658300950557932, 12.386582749882836 ],
			[ -11.513942836950591, 12.442987575729418 ],
			[ -11.456168585648271, 12.076834214725338 ],
			[ -11.297573614944511, 12.077971096235771 ],
			[ -11.03655595543826, 12.211244615116515 ],
			[ -10.870829637078215, 12.17788747807211 ],
			[ -10.593223842806282, 11.92397532800598 ],
			[ -10.165213792348837, 11.844083563682744 ],
			[ -9.890992804392013, 12.060478623904972 ],
			[ -9.567911749703214, 12.194243068892476 ],
			[ -9.327616339546012, 12.334286200403454 ],
			[ -9.127473517279583, 12.308060411015333 ],
			[ -8.90526485842453, 12.088358059126437 ],
			[ -8.786099005559464, 11.812560939984706 ],
			[ -8.376304897484914, 11.393645941610629 ],
			[ -8.581305304386774, 11.136245632364805 ],
			[ -8.620321010767128, 10.810890814655183 ],
			[ -8.407310756860028, 10.909256903522762 ],
			[ -8.282357143578281, 10.792597357623846 ],
			[ -8.33537716310974, 10.494811916541934 ],
			[ -8.029943610048619, 10.206534939001713 ],
			[ -8.229337124046822, 10.129020290563901 ],
			[ -8.309616461612251, 9.789531968622441 ],
			[ -8.079113735374349, 9.376223863152035 ],
			[ -7.832100389019188, 8.575704250518626 ],
			[ -8.20349890790088, 8.455453192575447 ],
			[ -8.299048631208564, 8.316443589710303 ],
			[ -8.221792364932199, 8.123328762235573 ],
			[ -8.280703497744938, 7.687179673692157 ],
			[ -8.439298468448698, 7.686042792181738 ] ];
	
	//borders liberia

	var polygonL = [ [ -11.458740, 6.904614 ], [ -11.348877, 6.730076 ],
			[ -11.118164, 6.599131 ], [ -10.876465, 6.468151 ],
			[ -10.783081, 6.309839 ], [ -10.629272, 6.211551 ],
			[ -10.365601, 6.124170 ], [ -10.068970, 5.938436 ],
			[ -9.992065, 5.807292 ], [ -9.580078, 5.473832 ],
			[ -9.519653, 5.386336 ], [ -9.030762, 5.019811 ],
			[ -8.783569, 4.877521 ], [ -8.536377, 4.762573 ],
			[ -8.245239, 4.587376 ], [ -7.833252, 4.466904 ],
			[ -7.767334, 4.401183 ], [ -7.591553, 4.379275 ],
			[ -7.586060, 5.823687 ], [ -7.965088, 6.217012 ],
			[ -8.635254, 6.457234 ], [ -8.393555, 7.177201 ],
			[ -8.371582, 7.242598 ], [ -8.514404, 7.547656 ],
			[ -8.624268, 7.656553 ], [ -9.437256, 7.776309 ],
			[ -9.602051, 8.363693 ], [ -10.140381, 8.635334 ],
			[ -11.458740, 6.904614 ] ];
	//borders sierra leone
	var polygonSL = [ [ -13.298950, 9.031578 ], [ -13.244019, 8.933914 ],
			[ -13.161621, 8.879644 ], [ -13.211060, 8.711359 ],
			[ -13.216553, 8.597316 ], [ -13.276978, 8.499537 ],
			[ -13.260498, 8.401734 ], [ -13.156128, 8.216927 ],
			[ -12.974854, 8.222364 ], [ -12.892456, 8.097300 ],
			[ -12.908936, 7.901471 ], [ -12.810059, 7.765423 ],
			[ -12.623291, 7.710992 ], [ -12.529907, 7.645665 ],
			[ -12.453003, 7.531319 ], [ -12.431030, 7.362467 ],
			[ -12.084961, 7.237148 ], [ -11.727905, 7.073637 ],
			[ -11.475220, 6.937333 ], [ -10.129395, 8.428904 ],
			[ -10.634766, 9.031578 ], [ -11.211548, 9.985081 ],
			[ -11.821289, 10.060811 ], [ -12.409058, 9.893099 ],
			[ -13.298950, 9.031578 ] ];

	var coords = [];
//push points into array
	for (var i = 0; i < polygonSL.length; i++) {
		coords.push(new google.maps.LatLng(polygonSL[i][1], polygonSL[i][0]))
	}

	console.log(coords);

	var poly = new google.maps.Polygon({
		paths : coords,
		strokeColor : '#3344dd',
		strokeOpacity : 0.9,
		strokeWeight : 2,
		fillColor : '#3344dd',
		fillOpacity : 0.35
	});
	//show borderline on map
	poly.setMap(map);

	var bounds = new google.maps.LatLngBounds();

	for (var i = 0; i < poly.getPath().getLength(); i++) {
		bounds.extend(poly.getPath().getAt(i)); //yes i found this on the internet
	}

	var sw = bounds.getSouthWest();
	var ne = bounds.getNorthEast(); // get min and max values from borders

	var json = '';

	for (i = 0; i < 3000; i++) {

		var check = false;

		while (!check) {
			var ptLat = Math.random() * (ne.lat() - sw.lat()) + sw.lat(); //generate randoms
			var ptLng = Math.random() * (ne.lng() - sw.lng()) + sw.lng();
			var point = new google.maps.LatLng(ptLat, ptLng);

			if (google.maps.geometry.poly.containsLocation(point, poly)) { // check
				// if
				// random
				// location
				// falls
				// in
				// the
				// polygon
				var marker = new google.maps.Marker({
					position : point,
					map : map,
					icon : image
				});
				check = true;
				console.log(i + " " + point); // create json from data
				json += '{"num":"' + i + '","lat": "' + point.lat() + '","lng":"'
						+ point.lng() + '"},';

			} else
				console.log("nope");
		}
	}
	console.log(json);
}

function init() {

	$('#startbtn').prop("disabled", true); // disable sim button during execute
	deleteMarkers();
	mcG = 0;
	mcL = 0;
	mcS = 0;

	var i = 0;

	function myLoop() {
		setTimeout(function() { // sim delay

			drawMarkers(garr[i].key, garr[i].value, // pas marker data between
			// intervals
			larr[i].value, sarr[i].value);
			console.log(i)
			myslider.slider('setValue', i);
			sliderpos = i;
			// console.log(myslider.slider('getValue'));

			i++;
			if (i < garr.length) {
				myLoop();
			} else {
				$('#startbtn').prop("disabled", false); // enable sim button
				// again after sim is
				// finished
			}
		}, delay)
	}

	myLoop();
}

function drawMarkers(date, deathsG, deathsL, deathsS, total) { // draw the
	// markers on
	// the map

	var image = {
		url : 'red.png',
		// This marker is 20 pixels wide by 32 pixels tall.
		size : new google.maps.Size(32, 32),
		scaledSize : new google.maps.Size(3, 3),
		anchor : new google.maps.Point(0, 0),
		origin : new google.maps.Point(0, 0)
	};

	var datum = new Date(date);

	// loop over markers of each country and psh them to map
	for (mcG; mcG < deathsG; mcG++) {
		// console.log("loop " + mc);

		var point = new google.maps.LatLng(gmarkers[mcG].lat, gmarkers[mcG].lng);

		var marker = new google.maps.Marker({
			position : point,
			opacity : 0.7,
			map : map,
			icon : image
		});
		markers.push(marker);
	}

	for (mcL; mcL < deathsL; mcL++) {

		var point = new google.maps.LatLng(lmarkers[mcL].lat, lmarkers[mcL].lng);

		var marker = new google.maps.Marker({
			position : point,
			map : map,
			opacity : 0.7,
			icon : image
		});
		markers.push(marker);
	}

	for (mcS; mcS < deathsS; mcS++) {

		var point = new google.maps.LatLng(slmarkers[mcS].lat,
				slmarkers[mcS].lng);

		var marker = new google.maps.Marker({
			position : point,
			map : map,
			opacity : 0.7,
			icon : image
		});
		markers.push(marker);
	}
	var total = +deathsG + +deathsL + +deathsS;
	var html = '';
	html = '<table class="table table-condensed" style="font-size: 16px">'
			+ '<tr class="info"><td>Date </td><td>'
			+ datum.toDateString().toString().substring(3) + '</td></tr>'
			+ '<tr class="success"><td>Guinea Deaths</td><td>' + deathsG
			+ '</td></tr>' + '<tr class="warning"><td>Liberia Deaths</td><td>'
			+ deathsL + '</td></tr>'
			+ '<tr class="active"><td>Sierra Leone Deaths</td><td>' + deathsS
			+ '</td></tr>' + '<tr class="danger"><td>Total Deaths</td><td>'
			+ total + '</td></tr>' + '</table>';
	$('#output').html(html);

}

function getPricesDollarAsia() {
	$
			.ajax({
				type : 'GET',
				url : 'https://tobacco.cloudant.com/tobacco/84504400b372d40f4037358317e355b8',
				async : true,
				contenttype : 'application/json',
				dataType : 'jsonp',
				success : function(data) {
					var price = [];
					for (i = 0; i < data.prices_asia.length; i++) {
						for (record in data.prices_asia[i]) {
							var getal = data.prices_asia[i][record];
							price[i] = getal;
						}
					}

					var countries = [];
					for (i = 0; i < data.prices_asia.length; i++) {
						var country = data.prices_asia[i].country;
						countries.push(country);

					}

					//setTimeout(function() {
						chart(price, countries); //executes after a delay
					//}, 500);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					console.log(error.errorThrown);
				}
			});
}

function loadgraph() {
	console.log("whut" + larr)
	for (var i = 1; i < larr.length; i++) {
		if (larr[i].key == "2014-03-31T00:00:00.000Z") {
			lchart[0] = larr[i].value;
			gchart[0] = garr[i].value;
			schart[0] = sarr[i].value;
		}
		if (larr[i].key == "2014-04-30T00:00:00.000Z") {
			lchart[1] = larr[i].value;
			gchart[1] = garr[i].value;
			schart[1] = sarr[i].value;
		}
		if (larr[i].key == "2014-05-27T00:00:00.000Z") {
			lchart[2] = larr[i].value;
			gchart[2] = garr[i].value;
			schart[2] = sarr[i].value;
		}
		if (larr[i].key == "2014-06-24T00:00:00.000Z") {
			lchart[3] = larr[i].value;
			gchart[3] = garr[i].value;
			schart[3] = sarr[i].value;
		}
		if (larr[i].key == "2014-07-30T00:00:00.000Z") {
			lchart[4] = larr[i].value;
			gchart[4] = garr[i].value;
			schart[4] = sarr[i].value;
		}
		if (larr[i].key == "2014-08-31T00:00:00.000Z") {
			lchart[5] = larr[i].value;
			gchart[5] = garr[i].value;
			schart[5] = sarr[i].value;
		}
		if (larr[i].key == "2014-09-28T00:00:00.000Z") {
			lchart[6] = larr[i].value;
			gchart[6] = garr[i].value;
			schart[6] = sarr[i].value;
		}
		if (larr[i].key == "2014-10-30T00:00:00.000Z") {
			lchart[7] = larr[i].value;
			gchart[7] = garr[i].value;
			schart[7] = sarr[i].value;
		}
		if (larr[i].key == "2014-11-23T00:00:00.000Z") {
			lchart[8] = larr[i].value;
			gchart[8] = garr[i].value;
			schart[8] = sarr[i].value;
			console.log(schart[8]);
		}
	}
	drawGraph(lchart, gchart, schart);
}

function drawGraph(lchart, gchart, schart) {

	console.log(lchart);
	console.log(gchart);
	console.log(schart);
	var buyerData = {
		labels : [ "Maart 2014", "April 2014", "Mei 2014", "Juni 2014",
				"Juli 2014", "Augustus 2014", "September 2014", "Oktober 2014",
				"Nobember 2014" ],
		datasets : [ {
			label : "Guinea",
			fillColor : "rgba(92, 184, 92, 0.2)",
			strokeColor : "rgba(92, 184, 92, 1)",
			pointColor : "rgba(92, 184, 92, 1)",
			pointStrokeColor : "#9DB86D",
			data : gchart

		}, {
			label : "Liberia",
			fillColor : "rgba(240, 173, 78, 0.2)",
			strokeColor : "rgba(240, 173, 78, 1)",
			pointColor : "rgba(240, 173, 78, 1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(8,187,205,1)",
			data : lchart
		}, {
			label : "Sierra Leone",
			fillColor : "rgba(151,187,205,0.2)",
			strokeColor : "rgba(151,187,205,1)",
			pointColor : "rgba(151,187,205,1)",
			pointStrokeColor : "#fff",
			pointHighlightFill : "#fff",
			pointHighlightStroke : "rgba(151,187,205,1)",
			data : schart
		} ]
	};
	var buyers = document.getElementById('buyers').getContext('2d');

	//new Chart(buyers).Line(buyerData);

	var chart = new Chart(buyers)
			.Line(
					buyerData,
					{
						legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].pointColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

					});

	legend(document.getElementById('chart'), buyerData);

}

function chart(price, countries) {
	console.log(countries)
	console.log(price);
	$(function() {
		$('#yolo')
				.highcharts(
						{
							chart : {
								type : 'bar',
									height: 1300,
							},
							title : {
								text : 'Historic World Population by Region'
							},
							subtitle : {
								text : 'Source: Wikipedia.org'
							},
							xAxis : {
								categories : countries,
								title : {
									text : null
								}
							},
							yAxis : {
								min : 0,
								title : {
									text : 'Population (millions)',
									align : 'high'
								},
								labels : {
									overflow : 'justify'
								}
							},
							tooltip : {
								valueSuffix : ' millions'
							},
							plotOptions : {
								bar : {
									dataLabels : {
										enabled : true
									}
								}
							},
							legend : {
								layout : 'vertical',
								align : 'right',
								verticalAlign : 'top',
								x : -40,
								y : 100,
								floating : true,
								borderWidth : 1,
								backgroundColor : ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
								shadow : true
							},
							credits : {
								enabled : false
							},
							series : [ {
								name : 'Year 1800',
								data : price
							}]
						});
	});
};

function setAllMap(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}
