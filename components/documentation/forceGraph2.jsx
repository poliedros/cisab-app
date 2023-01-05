import * as d3 from "d3";

export function forceGraph2() {
  var width = 1000,
    height = 500,
    margin = 20,
    pad = margin / 2,
    radius = 6,
    yfixed = pad + radius;

  var color = () => { return "#9D79A0"; };

  function arcDiagram(graph) {
    var radius = d3.scale.sqrt()
      .domain([0, 20])
      .range([0, 15]);

    var svg = d3.select("#chart").append("svg")
      .attr("id", "arc")
      .attr("width", width)
      .attr("height", height);

    // create plot within svg
    var plot = svg.append("g")
      .attr("id", "plot")
      .attr("transform", "translate(" + pad + ", " + pad + ")");

    graph.links.forEach(function (d, i) {
      var pathCount = 0;
      for (var j = 0; j < i; j++) {
        var otherPath = graph.links[j];
        if (otherPath.source === d.source && otherPath.target === d.target) {
          pathCount++;
        }
      }

      d.pathCount = pathCount;
    });

    // fix graph links to map to objects
    graph.links.forEach(function (d, i) {
      d.source = isNaN(d.source) ? d.source : graph.nodes[d.source];
      d.target = isNaN(d.target) ? d.target : graph.nodes[d.target];
    });

    linearLayout(graph.nodes);
    drawLinks(graph.links);
    drawNodes(graph.nodes);
  }

  // layout nodes linearly
  function linearLayout(nodes) {
    nodes.sort(function (a, b) {
      return a.uniq - b.uniq;
    })

    var xscale = d3.scale.linear()
      .domain([0, nodes.length - 1])
      .range([radius, width - margin - radius]);

    nodes.forEach(function (d, i) {
      d.x = xscale(i);
      d.y = yfixed;
    });
  }

  function drawNodes(nodes) {

    var gnodes = d3.select("#plot").selectAll("g.node")
      .data(nodes)
      .enter().append('g');

    var nodes = gnodes.append("circle")
      .attr("class", "node")
      .attr("id", function (d, i) { return d.name; })
      .attr("cx", function (d, i) { return d.x; })
      .attr("cy", function (d, i) { return d.y; })
      .attr("r", 5)
      .style("stroke", function (d, i) { return color(d.gender); });

    nodes.append("text")
      .attr("dx", function (d) { return 20; })
      .attr("cy", ".35em")
      .text(function (d) { return d.name; })

  }

  function drawLinks(links) {
    var radians = d3.scale.linear()
      .range([Math.PI / 2, 3 * Math.PI / 2]);

    var arc = d3.svg.line.radial()
      .interpolate("basis")
      .tension(0)
      .angle(function (d) { return radians(d); });

    d3.select("#plot").selectAll(".link")
      .data(links)
      .enter().append("path")
      .attr("class", "link")
      .attr("transform", function (d, i) {
        var xshift = d.source.x + (d.target.x - d.source.x) / 2;
        var yshift = yfixed;
        return "translate(" + xshift + ", " + yshift + ")";
      })
      .attr("d", function (d, i) {
        var xdist = Math.abs(d.source.x - d.target.x);
        arc.radius(xdist / 2);
        var points = d3.range(0, Math.ceil(xdist / 3));
        radians.domain([0, points.length - 1]);
        return arc(points);
      });

    d3.select("#plot").selectAll(".ellipse-link")
      .data(links)
      .enter().append("ellipse")
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", 1)
      .attr("cx", function (d) {
        return (d.target.x - d.source.x) / 2 + radius;
      })
      .attr("cy", pad)
      .attr("rx", function (d) {
        return Math.abs(d.target.x - d.source.x) / 2;
      })
      .attr("ry", function (d) {
        return 150 + d.pathCount * 20;
      })
      .attr("transform", function (d, i) {
        var xshift = d.source.x - radius;
        var yshift = yfixed;
        return "translate(" + xshift + ", " + yshift + ")";
      });
  }

  return {
    /* destroy: () => {
        simulation.stop();
    }, */
    nodes: () => {
        return svg.gnodes();
    }
};

  //return d3.json("data.json", arcDiagram);

  /* var width = 960,
  height = 500;

var color = () => { return "#9D79A0"; };//d3.scale.category20();

var radius = d3.scaleLinear()
.domain([0, 10])
.range([0, 600]);//d3.scale.sqrt()
  //.range([0, 6]);

var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

var force = d3.layout.force()
  .size([width, height])
  .charge(-400)
  .linkDistance(function(d) { return radius(d.source.size) + radius(d.target.size) + 20; });

var graph = {
"nodes": [
  {"size": 12},
  {"size": 12},
  {"size": 12}
],
"links": [
  {"source": 0, "target": 1},
  {"source": 1, "target": 2},
  {"source": 2, "target": 2}
]
};

var drawGraph = function(graph) {
force
    .nodes(graph.nodes)
    .links(graph.links)
    .on("tick", tick)
    .start();
var link = svg.selectAll(".link")
    .data(graph.links)
  .enter().append("path")
    .attr("class","link");

var node = svg.selectAll(".node")
    .data(graph.nodes)
  .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

node.append("circle")
    .attr("r", function(d) { return radius(d.size); })
    .style("fill", function(d) { return color(d.atom); });

function tick() {
  link.attr("d", function(d) {
    var x1 = d.source.x,
        y1 = d.source.y,
        x2 = d.target.x,
        y2 = d.target.y,
        dx = x2 - x1,
        dy = y2 - y1,
        dr = Math.sqrt(dx * dx + dy * dy),

        // Defaults for normal edge.
        drx = dr,
        dry = dr,
        xRotation = 0, // degrees
        largeArc = 0, // 1 or 0
        sweep = 1; // 1 or 0

        // Self edge.
        if ( x1 === x2 && y1 === y2 ) {
          // Fiddle with this angle to get loop oriented.
          xRotation = -45;

          // Needs to be 1.
          largeArc = 1;

          // Change sweep to change orientation of loop. 
          //sweep = 0;

          // Make drx and dry different to get an ellipse
          // instead of a circle.
          drx = 30;
          dry = 20;
          
          // For whatever reason the arc collapses to a point if the beginning
          // and ending points of the arc are the same, so kludge it.
          x2 = x2 + 1;
          y2 = y2 + 1;
        } 

   return "M" + x1 + "," + y1 + "A" + drx + "," + dry + " " + xRotation + "," + largeArc + "," + sweep + " " + x2 + "," + y2;
  });

  node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
}
};

drawGraph(graph); */
}