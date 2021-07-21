import { min } from "d3";

export default class Grid {
  constructor(size) {
    this.size = size;
    this.visited = Array(size).fill(0).map(() => new Array(size).fill(false));
    this.adjList = Array(size * size).fill(0).map(() => new Array());

    initAdjList();
  }

  initAdjList(probability) {
    const nVertices = this.size*this.size;

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (j != this.size - 1) {
          // not in last column => we can move on vertex right
          if (Math.random() < probability) {
            addEdge(i, j, i, j+1);
          }
        }
        if (i != this.size - 1) {
          if (Math.random() < probability) {
            addEdge(i, j, i+1, j);
          }
        }
      }
    }
  }

  addEdge(i, j, p, q) {
    const c1 = this.indexToCoord(i, j);
    const c2 = this.indexToCoord(p, q);
    this.adjList[min(c1, c2)].push(max(c1, c2));
  }

  getEdge(i, j, p, q) {
    const c1 = this.indexToCoord(i, j);
    const c2 = this.indexToCoord(p, q);
    return this.adjList[min(c1, c2)].contains(max(c1, c2));
  }

  coordToIndex(i, j) {
    return i*this.size + j;
  }

  indexToCoord(c) {
    return { 
      i: c / this.size, 
      j: c % this.size 
    };
  }

  setAllNotVisited() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.visited[i][j] = false;
      }
    }
  }

  dfs(i, j) {
    if (this.visited[i][j]) return 0;
    this.visited[i][j] = true;

    const neighbours = [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1]
    ]

    let acc = 1;
    neighbours.map(([p, q]) => {
      if (p < 0 || p >= size || q < 0 || q >= size) return;
      this.acc += this.dfs(p, q);
    })
    return acc;
  }

  findLongestCluster() {
    this.setAllNotVisited();
    let longestCluster = {
      lenght: 0,
      startingNode: { i: 0, j: 0 }
    };

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.visited[i][j]) continue;
        this.visited[i][j] = true;
        let length = this.dfs(i, j);
        if (length > longestCluster.length) {
          longestCluster = {
            lenght,
            startingNode: { i, j }
          }
        }
      }
    }
    return longestCluster;
  }

}