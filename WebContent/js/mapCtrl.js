routerApp.controller("mapCtrl", function($scope, $http) {

	/*
	 * ========================================= Start line
	 * chart====================================================
	 */  	  $scope.trend = [];
      function getData()
       {
     
    	  $http.get("json/chart.json").then(function(data){
    	  $scope.chart= data.data;
    
    	  angular.forEach($scope.chart, function (l, o){
      
    		  var date = l["Trend"].split("-");
    		  $scope.trend.push({x:new Date(date[2], date[0]-1, date[1]), y:l.Change})

    	  			});
    	  		}); 

  return [{
          key: "Change",
          values: $scope.trend,
           
  		}];
  
}
    
  $scope.options = {
            chart: {
                type: 'lineChart',
                height: 350,
                margin : {
                    top: 150,
                    right: 20,
                    bottom: 150,
                    left: 40
                },
                x: function(d){ 
                				return d.x; 
                  
                				},
               
                y: function(d){ return d.y; },
                useInteractiveGuideline: true,
          
           
                xAxis: {
                    axisLabel: 'Trend',
                   gridThickness: 8,
								tickFormat: function(d){
                 return d3.time.format("%x")(new Date(d));     

				                         } 
                },
                yAxis: {
                    axisLabel: 'Count',
                    tickFormat: function(d){
                        return d3.format('.f')(d);
                    },
                    axisLabelDistance: -5
                },
                callback: function(chart){
                    console.log("!!! lineChart callback !!!");
                }
            }
            
          
        };

             $scope.data =getData();
/*
 * ========================================= Endline
 * chart====================================================
 */             
             
 /*
	 * ================================Stacked area* Chart====================================
	 */
             $scope.Positive=[];
             $scope.Negative=[];
             $scope.Neutral=[];
       
             function getDonut()
              {
            
         $http.get("json/Fbweek.json").then(function(data){
           $scope.donutchart= data.data;
            angular.forEach($scope.donutchart, function (l, o){
            	
      		  var date = l["Date"].split("-");
      		  $scope.Positive.push({x:new Date(date[2], date[0]-1, date[1]), y:l.Positive});
      		  $scope.Negative.push({x:new Date(date[2], date[0]-1, date[1]), y:l.Negative});
      		  $scope.Neutral.push({x:new Date(date[2], date[0]-1, date[1]), y:l.Neutral});
            });
         }); 
             return [{
            	 "values" : $scope.Positive,
            	 "key" : "Positive"
             }, {
            	 "values" :$scope.Negative ,
            	 "key" : "Negative"
},{
    "values" : $scope.Neutral,
    "key" : "Neutral"
}];
              }
         $scope.options2 = {
                     chart: {
                         type: 'stackedAreaChart',
                         height: 450,
                         margin : {
                             top: 20,
                             right: 20,
                             bottom: 30,
                             left: 40
                         },
                         x: function(d){return d.x;},
                         y: function(d){return d.y;},
                         useVoronoi: false,
                         clipEdge: true,
                         duration: 100,
                         useInteractiveGuideline: true,
                         xAxis: {
                             valueFormatString: "MMMM-YYYY",

                             showMaxMin: false,
                             tickFormat: function(d) {
                                 return d3.time.format('%x')(new Date(d))
                             }
                         },
                         yAxis: {
                             tickFormat: function(d){
                                 return d3.format('f')(d);
                             }
                         },
                         zoom: {
                             enabled: true,
                             scaleExtent: [1, 10],
                             useFixedDomain: false,
                             useNiceScale: false,
                             horizontalOff: false,
                             verticalOff: true,
                             unzoomEventType: 'dblclick.zoom'
                         }
                     }
                 };
$scope.data2=getDonut();




/*==============================stacked area monthlychart=============================================*/
/*$scope.Positive1=[];
$scope.Negative1=[];
$scope.Neutral1=[];
function getFbmonth()
{

$http.get("json/Fbmonth.json").then(function(data){
$scope.Fbmonth= data.data;
angular.forEach($scope.Fbmonth, function (l, o){
	
  var date = l["Date"].split("-");
  $scope.Positive1.push({x:new Date(date[0]-1, date[2]), y:l.Positive});
  $scope.Negative1.push({x:new Date(date[0]-1, date[2]), y:l.Negative});

  $scope.Neutral1.push({x:new Date(date[0]-1, date[2]), y:l.Neutral});

  console.log($scope.Positive1);

});
}); 

return [{
	 "values" : $scope.Positive1,
	 "key" : "Positive"}
		 
		 , {
    	 "values" :$scope.Negative1 ,
    	 "key" : "Negative"
},{
"values" : $scope.Neutral1,
"key" : "Neutral"
		 
}];
}

$scope.options3 = {
        chart: {
            type: 'stackedAreaChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 30,
                left: 40
            },
            x: function(d){return d.x;},
            y: function(d){return d.y;},
            useVoronoi: false,
            clipEdge: true,
            duration: 100,
            useInteractiveGuideline: true,
            xAxis: {
                showMaxMin: false,
                tickFormat: function(d) {
                    return d3.time.format('%x')(new Date(d))
                }
            },
            yAxis: {
                tickFormat: function(d){
                    return d3.format('f')(d);
                }
            },
            zoom: {
                enabled: true,
                scaleExtent: [1, 10],
                useFixedDomain: false,
                useNiceScale: false,
                horizontalOff: false,
                verticalOff: true,
                unzoomEventType: 'dblclick.zoom'
            }
        }
    };
$scope.data3=getFbmonth();*/

/*
 * ==============================================D3 worldmap===================================
 */
        var width = 400,
        height = 200;

        var initX;
        var mouseClicked = false;
        var s = 1;
        var rotated = 90;
          
        var mouse;
          
        var projection =  d3.geo.mercator()
        .scale(50)
        .translate([width/2,height/1.5])
        .rotate([rotated,0,0]); // center on USA
          
        var path = d3.geo.path().projection(projection);
        var tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "1000")
        .style('opacity', 0)
        .style("font-family", "sans-serif")
        .style("background-color", "#ded575")
        .style("border-radius", "5px")
        .style("height", "100px")
        .style("width", "150px")
        .style("padding", "10px")
        .style('color', 'Green')
        .style("font-size", "12px");

        var zoom = d3.behavior.zoom()
        .scaleExtent([1, 8])
        .on("zoom", move);

        
        
        function move() {

        	  var t = d3.event.translate;
        	  var s = d3.event.scale; 
        	  zscale = s;
        	  var h = height/4;


        	  t[0] = Math.min(
        	    (width/height)  * (s - 1), 
        	    Math.max( width * (1 - s), t[0] )
        	  );

        	  t[1] = Math.min(
        	    h * (s - 1) + h * s, 
        	    Math.max(height  * (1 - s) - h * s, t[1])
        	  );

        	  zoom.translate(t);
        	  g.attr("transform", "translate(" + t + ")scale(" + s + ")");

        	  // adjust the country hover stroke width based on zoom level
        	  d3.selectAll(".country").style("stroke-width", 1.5 / s);

        	}

        	var throttleTimer;
        	function throttle() {
        	  window.clearTimeout(throttleTimer);
        	  throttleTimer = window.setTimeout(function() {
        	    redraw();
        	  }, 200);
        	}

        
        
        var svg = d3.select("#map").append("svg")
        .attr("width", width)
        .attr("height", height)
        .on("wheel", function() {
          // zoomend needs mouse coords
          initX = d3.mouse(this)[0];
        })
        .on("mousedown", function() {
          // only if scale === 1
          if(s !== 1) return;
          initX = d3.mouse(this)[0];
          mouseClicked = true;
        })
        .call(zoom);

        var g = svg.append("g");

          
        function rotateMap(endX) {
          projection.rotate([rotated + (endX - initX) * 360 / (s * width),0,0]);
          g.selectAll('path').attr('d', path);
        }
 d3.json("http://enjalot.github.io/wwsd/data/world/world-110m.geojson", function(json) {
        	
        	$http.get("v1.0/getData").then(function(response) {
        		 $scope.myData = response.data;
        		 $scope.d3Data=JSON.parse(response.data.data).data;
        	  g.selectAll("circle")
                        .data($scope.d3Data)
                        .enter()
                       .append("circle")
                        .attr("cx", function(d) {
                        	// console.log(d);
                            return projection([d.lng, d.lat])[0];
                        })
                        .attr("cy", function(d) {
                            return projection([d.lng, d.lat])[1];
                        })
                        .attr("r", 4)
                        .style("fill", "#006400")
                        .on("mouseover", function(d){
                         tooltip.transition().style("opacity", 0.9)
                                tooltip .html("Name: " +d.PASSENGER_FIRST_NAME  + "<br/>"+ 'PNR N0:'+d.AIRLINE_PNR_NO +"<br/>"+ 'DESTINATION: ' + d.DESTINATION )
                            .style('left', (d3.event.pageX) + 'px')
              			  	.style('top', (d3.event.pageY) + 'px')
        			})
                        .on("mousemove", function(event){
                            tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");
                        })
                        .on("mouseout", function(){
                        	tooltip.transition().delay(500).style("opacity", 0);
                        });
        	});

            g.selectAll("path")
               .data(json.features)
               .enter()
               .append("path")
               .attr("d", path);

        }); 
        
        
       
      
});