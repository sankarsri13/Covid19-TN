function createMap() {
  var width = 760,
    height = 700,
    centered = null,
    state = null,
    flag = 0;
  var path;
  var group;
  var areas;
  var canvas = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  d3.json(
    "https://raw.githubusercontent.com/tarunshah/India-D3/master/india_states.geojson",
    function (data) {
      group = canvas.selectAll("g").data(data.features).enter().append("g");

      var center = d3.geo.centroid(data);
      var projection = d3.geo
        .mercator()
        .scale(1000)
        .center(center)
        .translate([width / 2, height / 2]);
      path = d3.geo.path().projection(projection);
      var tooltip = d3
        .select("body")
        .append("div")
        .attr("class", "hidden tooltip");
      areas = group
        .append("path")
        .attr("d", path)
        .attr("class", "area")
        .attr("fill", function getRandomColor() {
          var new_light_color =
            "rgb(" +
            (Math.floor((256 - 229) * Math.random()) + 230) +
            "," +
            (Math.floor((256 - 229) * Math.random()) + 230) +
            "," +
            (Math.floor((256 - 229) * Math.random()) + 230) +
            ")";
          return new_light_color;
        })
        .style("stroke", "black")
        .style("tooltip", "check")
        .on("click", clicked)
        .on("mousemove", function (d) {
          var mouse = d3.mouse(areas.node()).map(function (d) {
            return parseInt(d);
          });
          tooltip
            .classed("hidden", false)
            .attr(
              "style",
              "left:" + (mouse[0] + 15) + "px; top:" + (mouse[1] - 35) + "px"
            )
            .html(d.properties.NAME_1);
        })
        .on("mouseout", function () {
          tooltip.classed("hidden", true);
        });

      /* group.append("text")
					.attr("x", function(d){ return path.centroid(d)[0]; })
					.attr("y", function(d){ return path.centroid(d)[1]; })
					.attr("text-anchor", "middle")
					.text(function(d){ return d.properties.NAME_1; }) */
    }
  );

  function country_clicked(d) {
    //group.selectAll([""]).remove();
    // state = null;
    // if (country) {
    //  g.selectAll("#" + country.id).style('display', null);
    //  }
    if (d && state !== d) {
      state = d.properties.NAME_1;

      if (d.properties.NAME_1 == "Tamil Nadu") {
        d3.json(
          "https://raw.githubusercontent.com/tarunshah/India-D3/master/TamilNadu.geojson",
          function (error, us) {
            group
              .append("g")
              .attr("class", "states")
              .selectAll("path")
              .data(us.features)
              .enter()
              .append("path")
              .attr("d", path)
              .attr("fill", function getRandomColor() {
                var new_light_color =
                  "rgb(" +
                  (Math.floor((256 - 229) * Math.random()) + 230) +
                  "," +
                  (Math.floor((256 - 229) * Math.random()) + 230) +
                  "," +
                  (Math.floor((256 - 229) * Math.random()) + 230) +
                  ")";
                return new_light_color;
              })
              .style("stroke", "black")
              .on("click", clicked);
          }
        );
      }
    } else {
      var xyz = [width / 2, height / 1.5, 1];
      state = null;
    }
  }

  function clicked(d) {
    var x, y, k;
    if (flag == 0) {
      var centroid = path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      centered = d;
      country_clicked(d);
      flag = 1;
    } else {
      x = width / 2;
      y = height / 2;
      k = 1;
      centered = null;
      group.selectAll(".states").remove();
      flag = 0;
    }

    /* if(state == null)
				  country_clicked(d);
			  else
				  {
				  	group.selectAll(".states").remove();
				  	x = width / 2;
				    y = height / 2;
				    k = 1;
				    state==null;
				  } */
    group.selectAll("path").classed(
      "active",
      centered &&
        function (d) {
          return d === centered;
        }
    );

    group
      .transition()
      .duration(750)
      .attr(
        "transform",
        "translate(" +
          width / 2 +
          "," +
          height / 2 +
          ")scale(" +
          k +
          ")translate(" +
          -x +
          "," +
          -y +
          ")"
      )
      .style("stroke-width", 1 / k + "px");
  }

  /* var zoom = d3.behavior.zoom()
	    .on("zoom",function() {
	        group.attr("transform","translate("+ 
	            d3.event.translate.join(",")+")scale("+d3.event.scale+")");
	        group.selectAll("circle")
	            .attr("d", path.projection(projection));
	        group.selectAll("path")  
	            .attr("d", path.projection(projection)); 
	  });
	canvas.call(zoom) */
}
