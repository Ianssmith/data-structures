var data3 = [338
,329
,228
,220
,240
,232
,226
,216
,241
,230
,225
,219
,215
,227
,221
,242
,236
,235
,239
,232
,226
,230
,236
,228
,250
,232
,217]

var data2 = [330
,323
,249
,250
,230
,224
,229
,231
,241
,249
,232
,219
,237
,232
,218
,243
,218
,219
,232
,258
,226
,235
,247
,239
,222
,227
,222];
var data = [421
,371
,333
,219
,256
,253
,236
,262
,258
,243
,257
,237
,241
,226
,232
,230
,220
,233
,237
,266
,225
,250
,248
,234
,236
,228
,237]

var w = 1200;
var h = 500;
var pad = 10;



	console.log(data)
	var items = data.length;
	var max = d3.max(data,function(d){return d});
	var min = d3.min(data,function(d){return d});

console.log(max)
console.log(min)

	var yscale = d3.scaleLinear()
		.domain([min,max])
		.range([0,h]);
		
		//console.log(yscale(max))

	var xscale = d3.scaleBand()
		.domain(d3.range(0,items))
		.range([0,w]);


var tempcolor;

	var colors = d3.scaleLinear()
		.domain([min,max])
		.range(['#66DB88',"#25aa25"]);


	var svg = d3.select("#chart").attr("align","center")
		.append("svg")
		.attr("width",w)
		.attr("height",h)
		.style("background", "#FFFFFF");	

	var tooltip = d3.select('body').append('div')
		.attr("id","label")
		.style('position', 'absolute')
		.style('padding', '0 10px')
		.style('background', 'white')
		.style('opacity', 0);
			
	var chart = svg.selectAll("rect")
		.data(data3)
		.enter()
		.append("rect")
		.style("fill", function(d){return colors(d)})
		.style("stroke", "#FFFFFF")
		.attr("x",function(d,i){return xscale(i)})
		.attr("y",h)
		.attr("width",xscale.bandwidth())
		.attr("height",0)
	.on('mouseover', function(d,i){
		tooltip.transition()
			.style("opacity", 0.8)
			
			tooltip.html("<span style='color:#444488'>#"+(i+1)+"</span> : "+d+"ms")
			.style("left", (d3.event.pageX-35)+"px")
			.style("top", (d3.event.pageY-35)+"px")
			
			tempcolor = this.style.stroke;
			d3.select(this)
				.style('opacity', 0.5)
				.style('stroke', '#FFFFFF')
			})
	.on('mouseout', function(d){
		//tooltip.style("opacity",0)
		d3.select(this)
			.style('opacity', 1)
			.style('stroke', tempcolor)
		})

	chart.transition()
		.attr("y", function(d){return h-d})
		.attr("height", function(d,i){return d})
	.delay(function(d,i){return i*30;})
	.duration(1000)
	//.easeElasticIn(5000)
	
