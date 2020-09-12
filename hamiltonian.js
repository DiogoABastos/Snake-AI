const fs = require('fs');

const size = 10;
const rows = 60 / size;
const cols = 60 / size;
const graph = new Graph();
const graphBuilder = [];
let answer = [];

function Node(x, y) {
  this.x = x;
  this.y = y;
  this.edges = [];
}

function Graph() {
  this.nodes = [];

  this.addNode = function(node) {
    this.nodes.push(node);
  }
}

function makeNodes() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      graph.addNode(new Node(c * size, r * size));
    }
  }
}

function addEdges() {
  for (let x = 0; x < graph.nodes.length; x++) {
    for (let i = 0; i < graph.nodes.length; i++) {
      if (graph.nodes[i] === graph.nodes[x])
        continue;

      if (((graph.nodes[i].x === graph.nodes[x].x - size || graph.nodes[i].x === graph.nodes[x].x + size) && graph.nodes[i].y === graph.nodes[x].y) || ((graph.nodes[i].y === graph.nodes[x].y - size || graph.nodes[i].y === graph.nodes[x].y + size) && graph.nodes[i].x === graph.nodes[x].x)) {
        graph.nodes[x].edges.push(graph.nodes[i]);
      }
    }
  }
}

function makeGraph() {
  let a = [];
  for (let x = 0; x < graph.nodes.length; x++) {
    for (let i = 0; i < graph.nodes.length; i++) {
      if (graph.nodes[x].edges.includes(graph.nodes[i])) {
        a.push(1);
      } else {
        a.push(0);
      }

    }

    graphBuilder.push(a);
    a = [];
  }
}

function HamiltonGraph(vertices) {
  this.graph = [];
  for (let r = 0; r < vertices; r++) {
    let a = [];
    for (let c = 0; c < vertices; c++) {
      a.push(0);
    }
    this.graph.push(a);
  }

  this.V = vertices;

  let range = [...Array(this.V).keys()];
  range.shift();

  this.isSafe = function(v, pos, path) {
    if (this.graph[ path[pos-1] ][v] === 0)
      return false;

    for (let i = 0; i < path.length; i++) {
      if (path[i] === v)
        return false;
    }
    return true;
  }

  this.hamCycleUtil = function(path, pos) {

    if (pos === this.V) {
      if (this.graph[ path[pos - 1] ][path[0]] === 1) {
        return true;
      } else {
        return false;
      }
    }

    for (let i = 0; i < range.length; i++) {
      let v = range[i];

      if (this.isSafe(v, pos, path) === true) {
        path[pos] = v;

        if (this.hamCycleUtil(path, pos + 1) === true) {
          return true;
        }

        path[pos] = -1;
      }
    }

    return false;

  }

  this.hamCycle = function() {
    let path = new Array(this.V).fill(-1);

    path[0] = 0;

    if (this.hamCycleUtil(path, 1) === false) {
      console.log("Solution does not exist");
      return false;
    }

    this.printSolution(path)
    return true;
  }

  this.printSolution = function(path) {
    console.log("Solution Exists");

    path.forEach(vertex => {
      answer.push(vertex);
    });

    console.log(path);

  }

}

function makeHamiltonGraph() {
  let g1 = new HamiltonGraph(rows * cols);
  g1.graph = graphBuilder;

  g1.hamCycle();
}

function setup() {
  makeNodes();
  addEdges();
  makeGraph();
  makeHamiltonGraph();
}

setup();

fs.appendFile('6*6.txt', answer, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
