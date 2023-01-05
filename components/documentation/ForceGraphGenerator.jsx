import IconsByName from "components/iconsByName";
import * as d3 from "d3";
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import styles from "./forceGraph.module.css";

export function runForceGraph(
    container,
    linksData,
    nodesData,
    nodeHoverTooltip
) {
    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    const color = () => { return "#9D79A0"; };

    /* const icon = (d) => {
        return d.gender === "male" ? "\uf222" : "\uf221";
    }

    const getClass = (d) => {
        return d.gender === "male" ? "A" : "B"; //styles.male : styles.female
    }; */

    const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-6000))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("radius", d3.forceCollide(5));

    const svg = d3
        .select(container)
        .append("svg")
        .attr("viewBox", [-width / 2, -450, width, 900]);

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(links)
        .join("path")
        .attr("stroke", d => color(d.source.id))
        .attr("marker-end", d => `url(${new URL(`#arrow-${d.type}`, location)})`)
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform);
        }));
        
    const node = svg.append("g")
        //.attr("fill", "currentColor")
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
        .selectAll("g")
        .data(nodes)
        .join("g")
        .attr("r", 8)
        //      .attr("cx", d => d.x)
        //  .attr("cy", d => d.y)
        .attr("fill", d => color(d.id))
    //.call(drag(simulation));

    node.append("circle")
        .attr("stroke", "white")
        .attr("stroke-width", 1.5)
        .attr("r", 10);

    node.append("text")
        .attr("x", 8)
        .attr("y", "0.91em")
        .text(d => d.id)
        .clone(true).lower()
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 5);

    /* const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central') */
    //.attr("class", d => `fa ${getClass(d)}`)
    //.text(d => { return IconsByName("bs", "BsCheck") });

    simulation.on("tick", () => {
        link.attr("d", linkArc);
        node.attr("transform", d => `translate(${d.x},${d.y})`);
        //update link positions
        /* link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // update node positions
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        // update label positions
        label
            .attr("x", d => { return d.x; })
            .attr("y", d => { return d.y; }) */
    });

    function linkArc(d) {
        var xRotation = 0;
        var largeArc = 0;
        var sweep = 1;
        var y1 = d.source.y;
        var y2 = d.target.y;
        var x1 = d.source.x;
        var x2 = d.target.x;
        var r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
        if (d.target.x === d.source.x && d.target.y === d.source.y) {
            r = Math.max(r, 15);
            xRotation = 0;

            largeArc = 1;
            x2 = x2 + 1;
            y2 = y2 + 1;
        }
        else {
        }
        return `
       M${x1},${y1}
       A${r},${r} ${xRotation} ${largeArc},${sweep} ${x2},${y2}
     `;
    }

    return {
        destroy: () => {
            simulation.stop();
        }
    };
}

/* import * as d3 from "d3";
//import "@fortawesome/fontawesome-free/css/all.min.css";
//import styles from "./forceGraph.module.css";

export function runForceGraph(
    container,
    linksData,
    nodesData,
    nodeHoverTooltip
) {
    const links = linksData.map((d) => Object.assign({}, d));
    const nodes = nodesData.map((d) => Object.assign({}, d));

    const containerRect = container.getBoundingClientRect();
    const height = containerRect.height;
    const width = containerRect.width;

    const color = () => { return "#9D79A0"; };

    const icon = (d) => {
        return d.gender === "male" ? "\uf222" : "\uf221";
    }

    const getClass = (d) => {
        return d.gender === "male" ? "A" : "B"; //styles.male : styles.female
    };

    const drag = (simulation) => {
        const dragstarted = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        };

        const dragged = (d) => {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        };

        const dragended = (d) => {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        };

        return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    };

    // Add the tooltip element to the graph
    const tooltip = document.querySelector("#graph-tooltip");
    if (!tooltip) {
        const tooltipDiv = document.createElement("div");
        tooltipDiv.classList.add("A"); //styles.tooltip
        tooltipDiv.style.opacity = "0";
        tooltipDiv.id = "graph-tooltip";
        document.body.appendChild(tooltipDiv);
    }
    const div = d3.select("#graph-tooltip");

    const addTooltip = (hoverTooltip, d, x, y) => {
        div
            .transition()
            .duration(200)
            .style("opacity", 0.9);
        div
            .html(hoverTooltip(d))
            .style("left", `${x}px`)
            .style("top", `${y - 28}px`);
    };

    const removeTooltip = () => {
        div
            .transition()
            .duration(200)
            .style("opacity", 0);
    };

    const simulation = d3
        .forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-150))
        .force("x", d3.forceX())
        .force("y", d3.forceY());

    const svg = d3
        .select(container)
        .append("svg")
        .attr("viewBox", [-width / 2, -height / 2, width, height])
        .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform);
        }));

    const link = svg
        .append("g")
        .attr("stroke", "#999")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg
        .append("g")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .selectAll("circle")
        .data(nodes)
        .join("circle")
        .attr("r", 12)
        .attr("fill", color)
        .call(drag(simulation));

    const label = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'central')
        .attr("class", d => `fa ${getClass(d)}`)
        .text(d => { return icon(d); })
        .call(drag(simulation));

    label.on("mouseover", (d) => {
        addTooltip(nodeHoverTooltip, d, d3.event.pageX, d3.event.pageY);
    })
        .on("mouseout", () => {
            removeTooltip();
        });

    simulation.on("tick", () => {
        //update link positions
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        // update node positions
        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        // update label positions
        label
            .attr("x", d => { return d.x; })
            .attr("y", d => { return d.y; })
    });

    return {
        destroy: () => {
            simulation.stop();
        },
        nodes: () => {
            return svg.node();
        }
    };
} */