/* sophisticated_code.js */

// This code is an implementation of a machine learning algorithm known as K-means clustering.
// It takes an input dataset and clusters the data points into k number of distinct groups.

class KMeans {
  constructor(k) {
    this.k = k;
    this.centroids = [];
    this.clusters = new Array(k);
  }

  initializeCentroids(dataset) {
    for (let i = 0; i < this.k; i++) {
      const randomIndex = Math.floor(Math.random() * dataset.length);
      this.centroids.push(dataset[randomIndex]);
    }
  }

  assignDataToClusters(dataset) {
    for (let i = 0; i < dataset.length; i++) {
      let minDistance = Infinity;
      let clusterIndex = -1;

      for (let j = 0; j < this.k; j++) {
        const distance = this.euclideanDistance(dataset[i], this.centroids[j]);

        if (distance < minDistance) {
          minDistance = distance;
          clusterIndex = j;
        }
      }

      this.clusters[clusterIndex] = this.clusters[clusterIndex] || [];
      this.clusters[clusterIndex].push(dataset[i]);
    }
  }

  updateCentroids() {
    for (let i = 0; i < this.k; i++) {
      if (this.clusters[i] && this.clusters[i].length > 0) {
        const newCentroid = this.calculateCentroid(this.clusters[i]);
        this.centroids[i] = newCentroid;
      }
    }
  }

  calculateCentroid(cluster) {
    const numDimensions = cluster[0].length;
    const centroid = new Array(numDimensions).fill(0);

    for (let i = 0; i < numDimensions; i++) {
      let sum = 0;

      for (let j = 0; j < cluster.length; j++) {
        sum += cluster[j][i];
      }

      centroid[i] = sum / cluster.length;
    }

    return centroid;
  }

  euclideanDistance(point1, point2) {
    let sumOfSquares = 0;

    for (let i = 0; i < point1.length; i++) {
      sumOfSquares += Math.pow(point1[i] - point2[i], 2);
    }

    return Math.sqrt(sumOfSquares);
  }

  fit(dataset, maxIterations = 100) {
    this.initializeCentroids(dataset);

    for (let iteration = 0; iteration < maxIterations; iteration++) {
      this.assignDataToClusters(dataset);
      this.updateCentroids();
    }
  }

  predict(point) {
    let minDistance = Infinity;
    let clusterIndex = -1;

    for (let i = 0; i < this.centroids.length; i++) {
      const distance = this.euclideanDistance(point, this.centroids[i]);

      if (distance < minDistance) {
        minDistance = distance;
        clusterIndex = i;
      }
    }

    return clusterIndex;
  }
}

// Usage example:

const dataset = [
  [2, 4],
  [3, 6],
  [3, 8],
  [4, 7],
  [6, 2],
  [7, 4],
  [8, 5],
  [10, 4],
  [11, 3],
  [12, 7]
];

const k = 3;
const kMeans = new KMeans(k);
kMeans.fit(dataset);

console.log("Clusters:");
for (let i = 0; i < k; i++) {
  console.log(`Cluster ${i}:`, kMeans.clusters[i]);
}

console.log("Predictions:");
for (let i = 0; i < dataset.length; i++) {
  const prediction = kMeans.predict(dataset[i]);
  console.log(`Point ${i}: Cluster ${prediction}`);
}