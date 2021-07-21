import * as d3 from 'd3';
import Grid from './grid';

const WIDTH = 800;
const HEIGHT = 800;
const PADDING_HORIZONTAL = 60;
const PADDING_VERTICAL = 60;

const CONTAINER_ID = "#percolation-graph";

class Model {
  constructor(probability, size) {
    this.probability = probability;
    this.grid = new Grid(size);
    this.grid.initAdjList(probability);
  }

  setSize(size) {
    if (size == this.grid.size) return;
    this.grid = new Grid(size);
    this.grid.initAdjList(this.probability);
  }
  setProbability(probability) {
    if (probability == this.probability) return;
    this.probability = probability;
    this.grid.clearAdjList();
    this.grid.initAdjList(probability);
  }
}

class View {
  constructor() {
    this.svg = d3
      .select(CONTAINER_ID)
      .append('svg')
      .attr("width", WIDTH)
      .attr("height", HEIGHT);
    this.svg.append("text").text("asdf");
  }

  coordinateToX([ i, j ], size) {
    return PADDING_HORIZONTAL + (j/(size-1)) * (WIDTH - 2 * PADDING_HORIZONTAL);
  }
  coordinateToY([ i, j ], size) {
    return PADDING_VERTICAL   + (i/(size-1)) * (HEIGHT - 2 * PADDING_VERTICAL );
  }

  drawVertices(size) {
    let vertices = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        vertices.push([i, j])
      }
    }
    let circles = this.svg
      .selectAll('circle')
      .data(vertices)
      .attr('id', ([ i, j ]) => `circle-${i}-${j}`)
      .attr('cx', coordinate => this.coordinateToX(coordinate, size))
      .attr('cy', coordinate => this.coordinateToY(coordinate, size))
      .style('stroke', 'gray')
      .style('fill', 'black')
      .attr('r', 2);
    circles.exit().remove();
    circles
      .enter()
      .append('circle')
      .attr('id', ([ i, j ]) => `circle-${i}-${j}`)
      .attr('cx', coordinate => this.coordinateToX(coordinate, size))
      .attr('cy', coordinate => this.coordinateToY(coordinate, size))
      .style('stroke', 'gray')
      .style('fill', 'black')
      .attr('r', 2);
  }

  drawEdges(grid) {
    const edges = grid.getAllEdges();
    let lines = this.svg
      .selectAll("line")
      .data(edges)
      .attr('id', ([i1, j1, i2, j2]) => `line-${i1}-${j1}-${i2}-${j2}`)
      .attr("x1", ([i1, j1, i2, j2]) => this.coordinateToX([i1, j1], grid.size))
      .attr("y1", ([i1, j1, i2, j2]) => this.coordinateToY([i1, j1], grid.size))
      .attr("x2", ([i1, j1, i2, j2]) => this.coordinateToX([i2, j2], grid.size))
      .attr("y2", ([i1, j1, i2, j2]) => this.coordinateToY([i2, j2], grid.size))
      .style("stroke", "black");;
    lines.exit().remove();
    lines
      .enter()
      .append("line")
      .attr('id', ([i1, j1, i2, j2]) => `line-${i1}-${j1}-${i2}-${j2}`)
      .attr("x1", ([i1, j1, i2, j2]) => this.coordinateToX([i1, j1], grid.size))
      .attr("y1", ([i1, j1, i2, j2]) => this.coordinateToY([i1, j1], grid.size))
      .attr("x2", ([i1, j1, i2, j2]) => this.coordinateToX([i2, j2], grid.size))
      .attr("y2", ([i1, j1, i2, j2]) => this.coordinateToY([i2, j2], grid.size))
      .style("stroke", "black");
  }
  drawCluster({ vertices, edges }) {
    vertices.forEach(([i, j]) => {
      d3.select(`#circle-${i}-${j}`)
        .style("stroke", "red")
        .style("fill", "red")
        .attr("r", 3)
    });
    edges.forEach(([i1, j1, i2, j2]) => {
      d3.select(`#line-${i1}-${j1}-${i2}-${j2}`)
        .style("stroke", "red");
    })
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.drawInitial()
  }

  drawInitial() {
    this.view.drawVertices(this.model.grid.size);
    this.view.drawEdges(this.model.grid);
    const longestCluster = this.model.grid.findLongestCluster();
    this.view.drawCluster(
      this.model.grid.getVerticesAndEdges(longestCluster)
    );
  }

  setSize(size) {
    this.model.setSize(size);
    this.view.drawVertices(size);
    this.view.drawEdges(this.model.grid);
    const longestCluster = this.model.grid.findLongestCluster();
    this.view.drawCluster(
      this.model.grid.getVerticesAndEdges(longestCluster)
    );
  }

  setProbability(probability) {
    this.model.setProbability(probability);
    this.view.drawEdges(this.model.grid);
    const longestCluster = this.model.grid.findLongestCluster();
    this.view.drawCluster(
      this.model.grid.getVerticesAndEdges(longestCluster)
    );
  }
}

window.app = new Controller(new Model(0.5, 25), new View());
