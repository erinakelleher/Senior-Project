//timeline-related variables

//colors of things
var warColor = "#ff6600";
var otherColor = "#898989";
var naturalColor = '#66ff33';
var scitechColor = "#33ccff";
var politicalColor = "#669999";
var economicColor = "#ccccff";
var culturalColor = "#ffcc99";

//DOM-related variables
var xmlns = "http://www.w3.org/2000/svg";

d3.json('gettrends',function(data){
	var trendAry = []; //array of trends

	if(data!=null)
	{
		var length = data[0].length;
		var interval = data[0].intervals;		
		var start = data[0].start;
		for(var i=0;i<data.length;i++)
		{			
			var tr = {start:data[i].startyear, end:data[i].endyear, type:data[i].type, name:data[i].name};
			trendAry.push(tr);
		}
	}

	drawTrends(trendAry, length, interval, start);
})

d3.json('getbubbles', function(data){
	var bubbleAry = []; //array of bubbles

	if(data!=null)
	{
		var length = data[0].length;
		var start = data[0].start;
		var interval = data[0].intervals;
		var startEra = data[0].era_start;
		var endEra = data[0].era_end;
		for(var i=0;i<data.length;i++)
		{		
			var bubble = {name: data[i].name, type: data[i].type, startYear:data[i].startyear, endYear:data[i].endyear};
			bubbleAry.push(bubble);
		}	
	}
	drawBubble(bubbleAry, length, start, interval, startEra, endEra);
	//desc:data[i].description, startEra:data[i].startera, endEra:data[i].endera,
	
});

d3.json('gettimeline', function(data){ 
	var interval = 0;
	var length = 0;
	var startyear = 0;
	var endyear = 0;
	var eraStart = ""; //BCE or CE
	var endEra = ""; //BCE or CE
	var lineTitle = "";

	if(data!=null)
	{
		startyear = data[0].start;
		endyear = data[0].end;
		interval = data[0].intervals;
		length = data[0].length;
		eraStart = data[0].era_start;
		eraEnd = data[0].era_end;
		lineTitle = data[0].title;
	}
	drawTicks(length, interval, startyear, endyear);
});
 
function drawBubble(bubbleAry, length, start, interval, end, startEra, endEra){
	var svg = document.getElementById("#svgBubbles");
	var yearPix = 1000/length; //amount of pixels per year
	var lengthAry = []; //array of 0-end
	var yearsAry = []; //an array that contains all the years
	var pixelsAry = []; //an array that contains the pixel location for each year
	var eventStarts = []; //array of starting years
	var eventEnds = []; //array of ending years
	var startPix = []; //array of pixel locations for starting years
	var endPix = []; //array of pixel locations for ending years
	var pixels = 0;
	var eventsLength = bubbleAry.length;
	var i =0;
	console.log(length);
	console.log(endEra);
	console.log(end);

	while(i<length)
	{
		lengthAry.push(i);
		i++;
	}
	if(startEra == "CE" && endEra == "CE")
	{	
		while(start<end)
		{
			yearsAry.push(start);
			start++;
		}
	}
	else if(startEra=="BCE" && endEra=="CE")
	{
		while(start > 0)
		{
			yearsAry.push(start);
			start--;
			len--;
		}
		for(var i = 0; i < len; i++)
		{
			yearsAry.push(i);
		}
	}
	else if(startEra == "BCE" && endEra == "BCE")
	{
		while(start > end)
		{
			yearsAry.push(start);
			start--;
		}
	}
	for(var i=0; i < yearsAry.length; i++)
	{
		pixelsAry.push(pixels);
		console.log(pixels);
		pixels += yearPix;
	}
	console.log("pixels:");
	console.log(pixelsAry);

	console.log("years:");
	console.log(yearsAry);
	 
	console.log("length:");
	console.log(lengthAry);
	/*
	for(var i = 0; i< eventsLength; i++)
	{
		eventStarts.push(bubbleAry[i].startYear);
		eventEnds.push(bubbleAry[i].endYear);
	}
	
	for(var i = 0; i< eventsLength; i++)
	{
		var evst = eventStarts[i];
		var eved = eventEnds[i];
		var stIndex = yearsAry.indexOf(evst);
		var endIndex = yearsAry.indexOf(eved);
		console.log(stIndex);
		console.log(endIndex);
		startPix.push(pixelsAry[stIndex]);
		endPix.push(pixelsAry[endIndex]);
	}*/
	
}

function drawTrends(trends, length, interval, start)
{
	var svg = document.getElementById("#svgTrends");	
	var yearPix = 1000/length; //amount of pixels per year
	var yearsAry = []; //an array that contains all the years
	var pixelsAry = []; //am array that contains the pixel location for each year
	var trendStarts = []; //array of starting years
	var trendEnds = []; //array of ending years
	var startPix = [];
	var endPix = [];
	var pixels = 0;
	var trendsLength = trends.length;

	while(start<length)
	{
		yearsAry.push(start);
		pixelsAry.push(pixels);
		pixels += yearPix;
		start++;
	}

	for(var i = 0; i< trendsLength; i++)
	{
		trendStarts.push(trends[i].startYear);
		trendEnds.push(trends[i].endYear);
	}
	for(var i = 0; i< trendsLength; i++)
	{
		startPix.push();
		endPix.push();
	}
	console.log("trends works");
 
}

function drawTicks(length, interval, startyear, endyear){

	var ticks = length/interval;
	var pix = 1000/ticks; //actual pixels that there should be between the ticks
	var i = 0;
	var svg = document.getElementById("#svgLine");
	while(i<1000)
	{
	
		var tick = document.createElementNS(xmlns,'rect');
		
		tick.setAttribute('style',"fill:'black';stroke-width:3;stroke:'black'");
		tick.setAttribute('x',i+10);
		tick.setAttribute('y',380);
		tick.setAttribute('width','4px');
		tick.setAttribute('height','10px');
		svg.append(tick);
		i+=pix;
	}
}