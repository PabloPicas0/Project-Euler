// Problem 107: Minimal network
// The following undirected network consists of seven vertices and twelve edges with a total weight of 243.

// Network with seven vertices and twelve edges
// The same network can be represented by the matrix below.

// A	B	C	D	E	F	G
// A	-	16	12	21	-	-	-
// B	16	-	-	17	20	-	-
// C	12	-	-	28	-	31	-
// D	21	17	28	-	18	19	23
// E	-	20	-	18	-	-	11
// F	-	-	31	19	-	-	27
// G	-	-	-	23	11	27	-
// However, it is possible to optimise the network by removing some edges and still ensure that all points on the network remain connected. The network which achieves the maximum saving is shown below. It has a weight of 93, representing a saving of 243 − 93 = 150 from the original network.

// Network with seven vertices and left six edges: AB, BD, CA, DE, DF, EG
// Using network, an 2D array representing network in matrix form, find the maximum saving which can be achieved by removing redundant edges whilst ensuring that the network remains connected. Vertices not having connection will be represented with -1.

// For more details see
// https://www.freecodecamp.org/learn/project-euler/project-euler-problems-101-to-200/problem-107-minimal-network
// https://projecteuler.net/problem=107

function minimalNetwork(network) {

  return true;
}
