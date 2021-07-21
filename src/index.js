import d3 from 'd3';
import { linspace } from './util';
import Grid from './grid';

const w = 500;
const h = 500;
const padding = 60;

const epsilon = 0.00001;

class Model {
  constructor(probability, size) {
    this.probability = probability;
    this.grid = new Grid(size);
  }

  changeSize(size) {
    if (size == this.grid.size) return;
    this.grid = new Grid(size);
    
  }
}

class View {
  constructor() {

  }
}

class Controller {
  constructor(model, view) {
    this.model = mode;
    this.view = view;
  }
}

const app = new Controller(new Model(), new View());
