import d3 from 'd3';
import { linspace } from './util';
import Grid from './grid';

const w = 500;
const h = 500;
const padding = 60;

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

  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  setSize(size) {
    this.model.setSize(size);
  }

  setProbability(probability) {
    this.model.setProbability(probability);
  }
}

window.app = new Controller(new Model(0.5, 25), new View());
