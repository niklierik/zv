type Graph = [from: number, to: number, weight: number][];

function findParent(parents: number[], vertexKey: number): number {
  if (parents[vertexKey] == vertexKey) {
    return vertexKey;
  }
  return (parents[vertexKey] = findParent(parents, parents[vertexKey]));
}

function unionSet(
  vertex1: number,
  vertex2: number,
  parents: number[],
  ranks: number[]
): void {
  vertex1 = findParent(parents, vertex1);
  vertex2 = findParent(parents, vertex2);

  if (ranks[vertex1] < ranks[vertex2]) {
    parents[vertex1] = vertex2;
  } else if (ranks[vertex1] > ranks[vertex2]) {
    parents[vertex2] = vertex1;
  } else {
    parents[vertex2] = vertex1;
    ranks[vertex1]++;
  }
}

function kruskal(graph: Graph) {
  const edges = graph.length;
  graph.sort((edge1, edge2) => edge1[2] - edge2[2]);

  const parents = new Array(edges);
  const ranks = new Array(edges);

  for (let i = 0; i < edges; i++) {
    parents[i] = i;
    ranks[i] = 0;
  }

  let minCost = 0;
  for (let i = 0; i < edges; i++) {
    const vertex1 = findParent(parents, graph[i][0]);
    const vertex2 = findParent(parents, graph[i][1]);

    const weight = graph[i][2];

    if (vertex1 != vertex2) {
      unionSet(vertex1, vertex2, parents, ranks);
      minCost += weight;
      console.log(graph[i][0] + " -- " + graph[i][1] + " == " + weight);
    }
  }

  console.log("Minimum cost: ", minCost);
}

const graph: Graph = [
  // from, to, weight
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4],
];

kruskal(graph);
