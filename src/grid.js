export default class Grid {
  constructor(size) {
    this.size = size;
    this.visited = Array(size).fill(0).map(() => new Array(size).fill(false));
    this.adjList = Array(size * size).fill(0).map(() => new Array());
  }

  addEdge(i, j, p, q) {
    const c1 = this.coordToIndex(i, j);
    const c2 = this.coordToIndex(p, q);
    this.adjList[Math.min(c1, c2)].push(Math.max(c1, c2));
  }

  getEdge(i, j, p, q) {
    const c1 = this.coordToIndex(i, j);
    const c2 = this.coordToIndex(p, q);
    return this.adjList[Math.min(c1, c2)].includes(Math.max(c1, c2));
  }

  getAllEdges() {
    let edges = [];
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const neighbours = [
          [i + 1, j],
          // [i - 1, j],
          [i, j + 1],
          // [i, j - 1]
        ]
        neighbours.map(([p, q]) => {
          if (p < 0 || p >= this.size || q < 0 || q >= this.size) return;
          if (!this.getEdge(i, j, p, q)) return;
          edges.push([i, j, p, q]);
        })
      }
    }
    return edges;
  }

  coordToIndex(i, j) {
    return i*this.size + j;
  }

  indexToCoord(c) {
    return { 
      i: ~~(c / this.size), // integer division, works via double bit inversion
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

  dfsClusterFind(i, j) {
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
      if (p < 0 || p >= this.size || q < 0 || q >= this.size) return;
      if (!this.getEdge(i, j, p, q)) return;
      acc += this.dfsClusterFind(p, q);
    })
    return acc;
  }

  findLongestCluster() {
    // if you find a cluster with >= 1/2 * nVertices, you don't have to check the rest
    // for a longer cluster.
    const instantReturnThreshold = this.size*this.size / 2;
    this.setAllNotVisited();
    let longestCluster = {
      length: 0,
      startingNode: { i: 0, j: 0 }
    };

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.visited[i][j]) continue;
        let length = this.dfsClusterFind(i, j);
        if (length > longestCluster.length) {
          longestCluster = {
            length,
            startingNode: { i, j }
          }
          if (length > instantReturnThreshold) return longestCluster;
        }
      }
    }
    return longestCluster;
  }

  dfsClusterDraw(i, j, vertices, edges) {
    if (this.visited[i][j]) return;
    this.visited[i][j] = true;
    vertices.push([i, j]);

    const neighbours = [
      [i + 1, j],
      [i - 1, j],
      [i, j + 1],
      [i, j - 1]
    ]

    neighbours.map(([p, q]) => {
      if (p < 0 || p >= this.size || q < 0 || q >= this.size) return;
      if (!this.getEdge(i, j, p, q)) return;
      edges.push([i, j, p, q]);
      this.dfsClusterDraw(p, q, vertices, edges);
    })
  }

  getVerticesAndEdges(cluster) {
    let vertices = [];
    let edges = [];
    this.setAllNotVisited();
    this.dfsClusterDraw(cluster.startingNode.i, cluster.startingNode.j, vertices, edges);
    return { vertices, edges };
  }

  clearAdjList() {
    this.adjList = Array(this.size * this.size).fill(0).map(() => new Array());
  }

  initAdjList(probability) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (j != this.size - 1) {
          // not in last column => we can move one vertex right
          if (Math.random() < probability) {
            this.addEdge(i, j, i, j+1);
          }
        }
        if (i != this.size - 1) {
          // not in last row => we can move one vertex down
          if (Math.random() < probability) {
            this.addEdge(i, j, i+1, j);
          }
        }
      }
    }
  }
}