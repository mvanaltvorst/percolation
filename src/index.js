import * as d3 from 'd3';
import Grid from './grid';

const WIDTH = 500;
const HEIGHT = 500;
const PADDING_HORIZONTAL = 60;
const PADDING_VERTICAL = 60;

const CONTAINER_ID = "body";

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
    console.log(this.grid.findLongestCluster())
  }
}

class View {
  constructor() {
    debugger;
    this.svg = d3
      .select(CONTAINER_ID)
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

  drawGrid(grid) {
    let vertices = [];
    for (let i = 0; i < grid.size; i++) {
      for (let j = 0; j < grid.size; j++) {
        vertices.push([i, j])
      }
    }
    this.svg
      .select('circle')
      .data(vertices)
      .enter()
      .append('circle')
      .style('stroke', 'gray')
      .style('fill', 'black')
      .attr('r', 25)
      .attr('cx', coordinate => this.coordinateToX(coordinate, grid.size))
      .attr('cy', coordinate => this.coordinateToY(coordinate, grid.size))
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    // this.draw()
  }

  draw() {
    this.view.drawGrid(this.model.grid);
  }

  setSize(size) {
    this.model.setSize(size);
    this.draw()
  }

  setProbability(probability) {
    this.model.setProbability(probability);
    this.draw()
  }
}

window.app = new Controller(new Model(0.5, 25), new View());
