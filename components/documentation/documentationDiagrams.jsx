import CapTitle from "atoms/capTitle";
import CapVisualCard from "atoms/capVisualCard";
import { Col, Row } from "react-bootstrap";
import * as d3 from "d3";
import { forceGraph2 } from "./forceGraph2";

import { useEffect, useRef, useState } from "react";
import { useInterval } from 'usehooks-ts';
import React from "react";

import { ForceGraph } from "./forceGraph";
import { tickStep } from "d3";

function BarChart(id, data, width = 550, height = 300) {
  useEffect(() => {
    var svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + 10 + 10)
      .attr("height", height + 10 + 10)
      .append("g")
      .attr("transform",
        "translate(" + 10 + "," + 10 + ")");

    d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json", function (data) {

      // List of node names
      var allNodes = data.nodes.map(function (d) { return d.name })

      // A linear scale to position the nodes on the X axis
      var x = d3.scalePoint()
        .range([0, width])
        .domain(allNodes)

      // Add the circle for the nodes
      var nodes = svg
        .selectAll("mynodes")
        .data(data.nodes)
        .enter()
        .append("circle")
        .attr("cx", function (d) { return (x(d.name)) })
        .attr("cy", height - 30)
        .attr("r", 8)
        .style("fill", "#69b3a2")

      // And give them a label
      var labels = svg
        .selectAll("mylabels")
        .data(data.nodes)
        .enter()
        .append("text")
        .attr("x", function (d) { return (x(d.name)) })
        .attr("y", height - 10)
        .text(function (d) { return (d.name) })
        .style("text-anchor", "middle")

      // Add links between nodes. Here is the tricky part.
      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      var idToNode = {};
      data.nodes.forEach(function (n) {
        idToNode[n.id] = n;
      });
      // Cool, now if I do idToNode["2"].name I've got the name of the node with id 2

      // Add the links
      var links = svg
        .selectAll('mylinks')
        .data(data.links)
        .enter()
        .append('path')
        .attr('d', function (d) {
          start = x(idToNode[d.source].name)            // X position of start node on the X axis
          end = x(idToNode[d.target].name)              // X position of end node
          return ['M', start, height - 30,                // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
            'A',                                        // This means we're gonna build an elliptical arc
            (start - end) / 2, ',',                       // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
            (start - end) / 2, 0, 0, ',',
            start < end ? 1 : 0, end, ',', height - 30]   // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
            .join(' ');
        })
        .style("fill", "none")
        .attr("stroke", "black")

      // Add the highlighting functionality
      nodes
        .on('mouseover', function (d) {
          // Highlight the nodes: every node is green except of him
          nodes.style('fill', "#B8B8B8")
          d3.select(this).style('fill', '#69b3b2')
          // Highlight the connections
          links
            .style('stroke', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? '#69b3b2' : '#b8b8b8'; })
            .style('stroke-width', function (link_d) { return link_d.source === d.id || link_d.target === d.id ? 4 : 1; })
        })
        .on('mouseout', function (d) {
          nodes.style('fill', "#69b3a2")
          links
            .style('stroke', 'black')
            .style('stroke-width', '1')
        })
    })

    // text hover nodes
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .style("fill", "#B8B8B8")
      .style("font-size", "17px")
      .attr("x", 50)
      .attr("y", 10)
      .html("Hover nodes")

    /* const svg = d3
      .select(id) //'#' + id
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('margin-left', 100);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 70)
      .attr('y', (d, i) => height - 10 * d)
      .attr('width', 65)
      .attr('height', (d, i) => d * 10)
      .attr('fill', 'green'); */
  }, []);

  return <div id={id}></div>;
}

export default function DocumentationDiagrams() {
  const nodeHoverTooltip = React.useCallback((node) => {
    return `<div>${node.name}</div>`;
  }, []);

  /* const data = {
    nodes: [{ id: "Conta do Município" }, { id: "Dados do Município" }, { id: "Responsável pelo Município" }, { id: "Conta da Autarquia" }, { id: "Dados da Autarquia" }, { id: "Responsavel pela Autarquia" }, { id: "Finalização" }],
    links: [
      { source: "Conta do Município", target: "Dados do Município", value: 6 },
      { source: "Conta do Município", target: "Finalização", value: 6 },
      { source: "Dados do Município", target: "Responsável pelo Município", value: 6 },
      { source: "Responsável pelo Município", target: "Conta da Autarquia", value: 6 },
      { source: "Responsável pelo Município", target: "Finalização", value: 6 },
      { source: "Conta da Autarquia", target: "Conta da Autarquia", value: 6 },
      { source: "Conta da Autarquia", target: "Dados da Autarquia", value: 6 },
      { source: "Conta da Autarquia", target: "Finalização", value: 6 },
      { source: "Dados da Autarquia", target: "Responsavel pela Autarquia", value: 6 },
      { source: "Responsavel pela Autarquia", target: "Conta da Autarquia", value: 6 },
      { source: "Responsavel pela Autarquia", target: "Finalização", value: 6 }
    ]
  }; */

  const data = {
    "nodes": [
      {
        "name": "Julie",
        "gender": "female"
      },
      {
        "name": "Matt",
        "gender": "male"
      },
      {
        "name": "Mark",
        "gender": "male"
      },
      {
        "name": "John",
        "gender": "male"
      },
      {
        "name": "Alice",
        "gender": "female"
      },
      {
        "name": "Lincoln",
        "gender": "male"
      },
      {
        "name": "Elijah",
        "gender": "male"
      },
      {
        "name": "Grace",
        "gender": "female"
      },
      {
        "name": "Jon",
        "gender": "male"
      },
      {
        "name": "Luke",
        "gender": "male"
      },
      {
        "name": "Judy",
        "gender": "female"
      },
      {
        "name": "Rebecca",
        "gender": "female"
      },
      {
        "name": "Nicole",
        "gender": "female"
      },
      {
        "name": "Paul",
        "gender": "male"
      },
      {
        "name": "Matthew",
        "gender": "male"
      },
      {
        "name": "Norm",
        "gender": "male"
      },
      {
        "name": "Peter",
        "gender": "male"
      },
      {
        "name": "Megan",
        "gender": "female"
      },
      {
        "name": "Hannah",
        "gender": "female"
      },
      {
        "name": "Steve",
        "gender": "male"
      }
    ],
    "links": [
      {
        "source": 0,
        "target": 1
      },
      {
        "source": 0,
        "target": 1
      },
      {
        "source": 0,
        "target": 1
      },
      {
        "source": 0,
        "target": 1
      },
      {
        "source": 0,
        "target": 1
      },
      {
        "source": 0,
        "target": 1
      },
      {
        "source": 1,
        "target": 3
      },
      {
        "source": 1,
        "target": 3
      },
      {
        "source": 1,
        "target": 3
      },
      {
        "source": 1,
        "target": 3
      },
      {
        "source": 1,
        "target": 3
      },
      {
        "source": 1,
        "target": 2
      },
      {
        "source": 2,
        "target": 3
      },
      {
        "source": 3,
        "target": 4
      },
      {
        "source": 3,
        "target": 4
      },
      {
        "source": 3,
        "target": 4
      },
      {
        "source": 3,
        "target": 4
      },
      {
        "source": 3,
        "target": 4
      },
      {
        "source": 3,
        "target": 4
      },
      {
        "source": 4,
        "target": 5
      },
      {
        "source": 4,
        "target": 6
      },
      {
        "source": 4,
        "target": 6
      },
      {
        "source": 4,
        "target": 5
      },
      {
        "source": 4,
        "target": 5
      },
      {
        "source": 4,
        "target": 5
      },
      {
        "source": 5,
        "target": 6
      },
      {
        "source": 5,
        "target": 6
      },
      {
        "source": 5,
        "target": 6
      },
      {
        "source": 6,
        "target": 7
      },
      {
        "source": 6,
        "target": 7
      },
      {
        "source": 6,
        "target": 7
      },
      {
        "source": 6,
        "target": 7
      },
      {
        "source": 6,
        "target": 7
      },
      {
        "source": 6,
        "target": 7
      },
      {
        "source": 7,
        "target": 12
      },
      {
        "source": 7,
        "target": 12
      },
      {
        "source": 7,
        "target": 12
      },
      {
        "source": 7,
        "target": 12
      },
      {
        "source": 7,
        "target": 12
      },
      {
        "source": 7,
        "target": 8
      },
      {
        "source": 8,
        "target": 9
      },
      {
        "source": 9,
        "target": 10
      },
      {
        "source": 10,
        "target": 11
      },
      {
        "source": 11,
        "target": 12
      },
      {
        "source": 12,
        "target": 13
      },
      {
        "source": 12,
        "target": 13
      },
      {
        "source": 12,
        "target": 13
      },
      {
        "source": 12,
        "target": 13
      },
      {
        "source": 12,
        "target": 13
      },
      {
        "source": 12,
        "target": 13
      },
      {
        "source": 13,
        "target": 14
      },
      {
        "source": 14,
        "target": 15
      },
      {
        "source": 15,
        "target": 16
      },
      {
        "source": 16,
        "target": 17
      },
      {
        "source": 13,
        "target": 17
      },
      {
        "source": 13,
        "target": 17
      },
      {
        "source": 13,
        "target": 17
      },
      {
        "source": 13,
        "target": 17
      },
      {
        "source": 13,
        "target": 17
      },
      {
        "source": 17,
        "target": 18
      },
      {
        "source": 17,
        "target": 18
      },
      {
        "source": 17,
        "target": 18
      },
      {
        "source": 17,
        "target": 18
      },
      {
        "source": 17,
        "target": 18
      },
      {
        "source": 17,
        "target": 18
      },
      {
        "source": 18,
        "target": 19
      },
      {
        "source": 18,
        "target": 19
      },
      {
        "source": 18,
        "target": 19
      },
      {
        "source": 18,
        "target": 19
      },
      {
        "source": 18,
        "target": 19
      }
    ]
  }

  const ArcDiagram2 = () => {
    const ref = useRef()
    const margin = { top: 0, right: 30, bottom: 50, left: 60 },
      width = 650 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const data = { "nodes": [
      { "name": "Dados do Produto", "n": 5, "grp": 1, "id": "Dados do Produto" },
      { "name": "Normas", "n": 5, "grp": 1, "id": "Normas" },
      { "name": "Acessórios", "n": 5, "grp": 1, "id": "Acessórios" },
      { "name": "Imagem", "n": 5, "grp": 1, "id": "Imagem" },
      { "name": "Finalizar", "n": 5, "grp": 2, "id": "Finalizar" }],
    "links": [
      { "source": "Dados do Produto", "target": "Normas", "value": 1 },
      { "source": "Normas", "target": "Acessórios", "value": 1 },
      { "source": "Dados do Produto", "target": "Acessórios", "value": 1 },
      { "source": "Dados do Produto", "target": "Imagem", "value": 1 },
      { "source": "Normas", "target": "Imagem", "value": 1 },
      { "source": "Acessórios", "target": "Imagem", "value": 1 },
      { "source": "Imagem", "target": "Finalizar", "value": 1 }], "attributes": {} };
    useEffect(() => {
      const svg = d3.select(ref.current)
      .append("svg") 
        .attr("viewBox", [0, 0, width + 90, height + 80])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // List of node names
      const allNodes = data.nodes.map(d => d.name)

      // List of groups
      let allGroups = data.nodes.map(d => d.grp)
      allGroups = [...new Set(allGroups)]

      // A color scale for groups:
      const color = d3.scaleOrdinal()
        .domain(allGroups)
        .range(d3.schemeSet3);

      // A linear scale for node size
      const size = d3.scaleLinear()
        .domain([1, 10])
        .range([0.5, 8]);

      // A linear scale to position the nodes on the X axis
      const x = d3.scalePoint()
        .range([0, width])
        .domain(allNodes)

      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      const idToNode = {};
      data.nodes.forEach(function (n) {
        idToNode[n.id] = n;
      });

      // Add the links
      const links = svg
        .selectAll('mylinks')
        .data(data.links)
        .join('path')
        .attr('d', d => {
          let start = x(idToNode[d.source].name)    // X position of start node on the X axis
          let end = x(idToNode[d.target].name)      // X position of end node
          return ['M', start, height - 30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
            'A',                            // This means we're gonna build an elliptical arc
            (start - end) / 2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
            (start - end) / 2, 0, 0, ',',
            start < end ? 1 : 0, end, ',', height - 30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
            .join(' ');
        })
        .style("fill", "none")
        .attr("stroke", "grey")
        .style("stroke-width", 1)

      // Add the circle for the nodes
      const nodes = svg
        .selectAll("mynodes")
        .data(data.nodes.sort((a, b) => { +b.n - +a.n }))
        .join("circle")
        .attr("cx", d => x(d.name))
        .attr("cy", height - 30)
        .attr("r", d => size(d.n))
        .style("fill", d => color(d.grp))
        .attr("stroke", "gray")

      // And give them a label
      const labels = svg
        .selectAll("mylabels")
        .data(data.nodes)
        .join("text")
        .style("fill", d => "grey")
        .attr("x", 0)
        .attr("y", 0)
        .text(d => d.name)
        .style("text-anchor", "end")
        .attr("transform", d => `translate(${x(d.name)},${height - 15}) rotate(-45)`)
        .style("font-size", 6)

      // Add the highlighting functionality
      nodes.on('mouseover', function (event, d) {

        // Highlight the nodes: every node is green except of him
        nodes.style('opacity', .2)
        d3.select(this).style('opacity', 1)

        // Highlight the connections
        links
          .style('stroke', a => a.source === d.id || a.target === d.id ? color(d.grp) : '#b8b8b8')
          .style('stroke-opacity', a => a.source === d.id || a.target === d.id ? 1 : .2)
          .style('stroke-width', a => a.source === d.id || a.target === d.id ? 4 : 1)
        labels
          .style("font-size", b => b.name === d.name ? 10 : 0)
          .attr("y", b => b.name === d.name ? 10 : 0)
      })
        .on('mouseout', d => {
          nodes.style('opacity', 1)
          links
            .style('stroke', 'grey')
            .style('stroke-opacity', .8)
            .style('stroke-width', '1')
          labels
            .style("font-size", 6)
        })
    }, []);
    return (
      <svg viewBox="0 0 650 400"
        ref={ref}>
      </svg>
    )
  }

  const ArcDiagram = () => {
    const ref = useRef()
    const margin = { top: 0, right: 30, bottom: 50, left: 60 },
      width = 650 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const data = { "nodes": [
      { "name": "Conta Município", "n": 5, "grp": 1, "id": "Conta Município" },
      { "name": "Dados Município", "n": 5, "grp": 1, "id": "Dados Município" },
      { "name": "Responsável Município", "n": 5, "grp": 1, "id": "Responsável Município" },
      { "name": "Conta Autarquia", "n": 10, "grp": 2, "id": "Conta Autarquia" },
      { "name": "Dados Autarquia", "n": 5, "grp": 2, "id": "Dados Autarquia" },
      { "name": "Responsável Autarquia", "n": 5, "grp": 2, "id": "Responsável Autarquia" },
      { "name": "Finalizar", "n": 5, "grp": 3, "id": "Finalizar" }],
    "links": [
      { "source": "Conta Município", "target": "Dados Município", "value": 1 },
      { "source": "Dados Município", "target": "Responsável Município", "value": 1 },
      { "source": "Responsável Município", "target": "Conta Autarquia", "value": 1 },
      { "source": "Responsável Município", "target": "Finalizar", "value": 1 },
      { "source": "Conta Município", "target": "Conta Autarquia", "value": 1 },
      { "source": "Conta Autarquia", "target": "Dados Autarquia", "value": 1 },
      { "source": "Dados Autarquia", "target": "Responsável Autarquia", "value": 1 },
      { "source": "Responsável Autarquia", "target": "Conta Autarquia", "value": 1 },
      { "source": "Responsável Autarquia", "target": "Finalizar", "value": 1 },
      { "source": "Conta Município", "target": "Finalizar", "value": 1 },
      { "source": "Conta Autarquia", "target": "Finalizar", "value": 1 }], "attributes": {} };
    useEffect(() => {
      const svg = d3.select(ref.current)
        .append("svg")
        .attr("viewBox", [0, 0, width + 90, height + 80])
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // List of node names
      const allNodes = data.nodes.map(d => d.name)

      // List of groups
      let allGroups = data.nodes.map(d => d.grp)
      allGroups = [...new Set(allGroups)]

      // A color scale for groups:
      const color = d3.scaleOrdinal()
        .domain(allGroups)
        .range(d3.schemeSet3);

      // A linear scale for node size
      const size = d3.scaleLinear()
        .domain([1, 10])
        .range([0.5, 8]);

      // A linear scale to position the nodes on the X axis
      const x = d3.scalePoint()
        .range([0, width])
        .domain(allNodes)

      // In my input data, links are provided between nodes -id-, NOT between node names.
      // So I have to do a link between this id and the name
      const idToNode = {};
      data.nodes.forEach(function (n) {
        idToNode[n.id] = n;
      });

      // Add the links
      const links = svg
        .selectAll('mylinks')
        .data(data.links)
        .join('path')
        .attr('d', d => {
          let start = x(idToNode[d.source].name)    // X position of start node on the X axis
          let end = x(idToNode[d.target].name)      // X position of end node
          return ['M', start, height - 30,    // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
            'A',                            // This means we're gonna build an elliptical arc
            (start - end) / 2, ',',    // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
            (start - end) / 2, 0, 0, ',',
            start < end ? 1 : 0, end, ',', height - 30] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
            .join(' ');
        })
        .style("fill", "none")
        .attr("stroke", "grey")
        .style("stroke-width", 1)

      // Add the circle for the nodes
      const nodes = svg
        .selectAll("mynodes")
        .data(data.nodes.sort((a, b) => { +b.n - +a.n }))
        .join("circle")
        .attr("cx", d => x(d.name))
        .attr("cy", height - 30)
        .attr("r", d => size(d.n))
        .style("fill", d => color(d.grp))
        .attr("stroke", "gray")

      // And give them a label
      const labels = svg
        .selectAll("mylabels")
        .data(data.nodes)
        .join("text")
        .style("fill", d => "grey")
        .attr("x", 0)
        .attr("y", 0)
        .text(d => d.name)
        .style("text-anchor", "end")
        .attr("transform", d => `translate(${x(d.name)},${height - 15}) rotate(-45)`)
        .style("font-size", 6)

      // Add the highlighting functionality
      nodes.on('mouseover', function (event, d) {

        // Highlight the nodes: every node is green except of him
        nodes.style('opacity', .2)
        d3.select(this).style('opacity', 1)

        // Highlight the connections
        links
          .style('stroke', a => a.source === d.id || a.target === d.id ? color(d.grp) : '#b8b8b8')
          .style('stroke-opacity', a => a.source === d.id || a.target === d.id ? 1 : .2)
          .style('stroke-width', a => a.source === d.id || a.target === d.id ? 4 : 1)
        labels
          .style("font-size", b => b.name === d.name ? 10 : 0)
          .attr("y", b => b.name === d.name ? 10 : 0)
      })
        .on('mouseout', d => {
          nodes.style('opacity', 1)
          links
            .style('stroke', 'grey')
            .style('stroke-opacity', .8)
            .style('stroke-width', '1')
          labels
            .style("font-size", 6)
        })
    }, []);
    return (
      <svg viewBox="0 0 650 400"
        ref={ref}>
      </svg>
    )
  }

  const Circle = () => {
    return (
      <svg>
        <circle
          cx="150"
          cy="77"
          r="40"
        />
      </svg>
    )
  }

  const generateDataset = () => (
    Array(10).fill(0).map(() => ([
      Math.random() * 80 + 10,
      Math.random() * 35 + 10,
    ]))
  )

  const Circles = () => {
    const [dataset, setDataset] = useState(
      generateDataset()
    )
    const ref = useRef()
    useEffect(() => {
      const svgElement = d3.select(ref.current)
      svgElement.selectAll("circle")
        .data(dataset)
        .join("circle")
        .attr("cx", d => d[0])
        .attr("cy", d => d[1])
        .attr("r", 3)
    }, [dataset])
    useInterval(() => {
      const newDataset = generateDataset()
      setDataset(newDataset)
    }, 2000)
    return (
      <svg
        viewBox="0 0 100 50"
        ref={ref}
      />
    )
  }

  const data2 = {
    "nodes": [
      {
        "id": 1,
        "name": "Andy",
        "gender": "male"
      },
      {
        "id": 2,
        "name": "Betty",
        "gender": "female"
      },
      {
        "id": 3,
        "name": "Cate",
        "gender": "female"
      },
      {
        "id": 4,
        "name": "Dave",
        "gender": "male"
      },
      {
        "id": 5,
        "name": "Ellen",
        "gender": "female"
      },
      {
        "id": 6,
        "name": "Fiona",
        "gender": "female"
      },
      {
        "id": 7,
        "name": "Garry",
        "gender": "male"
      },
      {
        "id": 8,
        "name": "Holly",
        "gender": "female"
      },
      {
        "id": 9,
        "name": "Iris",
        "gender": "female"
      },
      {
        "id": 10,
        "name": "Jane",
        "gender": "female"
      }
    ],
    "links": [
      {
        "source": 1,
        "target": 2
      },
      {
        "source": 1,
        "target": 5
      },
      {
        "source": 1,
        "target": 6
      },
  
      {
        "source": 2,
        "target": 3
      },
      {
        "source": 2,
        "target": 7
      }
    ,
  
      {
        "source": 3,
        "target": 4
      },
      {
        "source": 8,
        "target": 3
      }
    ,
      {
        "source": 4,
        "target": 5
      }
    ,
  
      {
        "source": 4,
        "target": 9
      },
      {
        "source": 5,
        "target": 10
      }
    ]
  };

  function runForceGraph(
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
  
    const color = () => { return "#9D00A0"; };
  
    const icon = (d) => {
      return d.gender === "male" ? "\uf222" : "\uf221";
    }
  
    const getClass = (d) => {
      return d.gender === "male" ? "" : ""; //styles.male : styles.female;
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
      //tooltipDiv.classList.add(styles.tooltip);
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
      .text(d => {return icon(d);})
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
  }

  const ArcDiagram3 = () => {

    const nodeHoverTooltip = React.useCallback((node) => {
      return `<div>     
        <b>${node.name}</b>
      </div>`;
    }, []);

    const containerRef = useRef(null);

    let linksData = data2.links;
    let nodesData = data2.nodes;

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip);
      
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} className={""} />; //className={styles.container}

//     let ref = useRef();
//     const margin = {top: 10, right: 30, bottom: 30, left: 40},
//   width = 400 - margin.left - margin.right,
//   height = 400 - margin.top - margin.bottom;

//     useEffect(() => {
//       const svg = d3.select("#my_dataviz")
// .append("svg")
//   .attr("width", width + margin.left + margin.right)
//   .attr("height", height + margin.top + margin.bottom)
// .append("g")
//   .attr("transform",
//         `translate(${margin.left}, ${margin.top})`);

//         d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json").then( function( data) {

//   // Initialize the links
//   const link = svg
//     .selectAll("line")
//     .data(data.links)
//     .join("line")
//       .style("stroke", "#aaa")

//   // Initialize the nodes
//   const node = svg
//     .selectAll("circle")
//     .data(data.nodes)
//     .join("circle")
//       .attr("r", 20)
//       .style("fill", "#69b3a2")

//   // Let's list the force we wanna apply on the network
//   const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
//       .force("link", d3.forceLink()                               // This force provides links between nodes
//             .id(function(d) { return d.id; })                     // This provide  the id of a node
//             .links(data.links)                                    // and this the list of links
//       )
//       .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
//       .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
//       .on("end", ticked);

//   // This function is run at each iteration of the force algorithm, updating the nodes position.
//   function ticked() {
//     link
//         .attr("x1", function(d) { return d.source.x; })
//         .attr("y1", function(d) { return d.source.y; })
//         .attr("x2", function(d) { return d.target.x; })
//         .attr("y2", function(d) { return d.target.y; });

//     node
//          .attr("cx", function (d) { return d.x+6; })
//          .attr("cy", function(d) { return d.y-6; });
//   }

// });
//     }, []);
//     return (
//       <svg viewBox="0 0 650 400"
//         ref={ref}>
//       </svg>
//     )
  }

  return <>
    <CapTitle base="diagram" label="diagrams" />
    <ArcDiagram />
    <ArcDiagram2 />
    <ArcDiagram3 />
    {/* <Circle />
    <Circles /> */}
    {/* {() => forceGraph2()} */}
    {/* <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <BarChart id={"barchart"} data={[12, 6, 6, 7, 10]} width={550} height={300} />
      <BarChart />
    </div> */}
    {/* <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip} /> */}
    {/* <ForceGraph linksData={data.links} nodesData={data.nodes} nodeHoverTooltip={nodeHoverTooltip} /> */}
    <CapVisualCard literal="County" components={
      <>
        <Row>
          <Col>
            <CapVisualCard literal="TownHall" components={
              <>
                <CapVisualCard literal="Responsable" components={
                  <>
                    <p>_id: string</p>
                    <p>email: string</p>
                    <p>name: string</p>
                    <p>surname: string</p>
                    <p>{"properties: { profession: string }"}</p>
                  </>
                } />
                <p>_id: string</p>
                <p>{"account: {"}</p>
                <p>user: string</p>
                <p>password: string</p>
                <p>{"}"}</p>
              </>
            } />
          </Col>
          <Col>
            <CapVisualCard literal="Autarchy" />
          </Col>
        </Row>
      </>
    } />
    <Row>
      <Col>
        <CapVisualCard literal="Product" components={
          <CapVisualCard literal="Unit" />
        } />
      </Col>
    </Row>
    <Row>
      <Col>
        <CapVisualCard literal="Bidding" components={
          <CapVisualCard literal="Unit" />
        } />
      </Col>
    </Row>
    <p>Front End</p>
  </>;
}