"use strict";

const c = 2; // num classes
const n = 50; // num data

const e = Math.pow(1, -2);  // tolerance
const b = 2;    // exponential weight

function kMeans(versicolorData, setosaData) {
    console.log("kmeans");
    console.log(versicolorData);
    console.log(setosaData);

    // Check if input data is valid
    if (!versicolorData) {
        throw new Error("Invalid input data");
    }

    if(!setosaData)
        throw new Error("Invalid input data 2");

    if(versicolorData.length !== n)
        throw new Error(versicolorData.length);

    if(setosaData.length !== n)
        throw new Error("Invalid input data 4");

    // Remove class label from each element in versicolorData and setosaData
    const versicolorFeatures = versicolorData.map(row => row.slice(0, -1));
    const setosaFeatures = setosaData.map(row => row.slice(0, -1));

    // Combine the two datasets
    const data = versicolorFeatures.concat(setosaFeatures);
    const numFeatures = data[0].length;

    // Step 1: Initialize centroids randomly
    let centroids = [];
    for (let i = 0; i < c; i++) {
        let centroid = [];
        for (let j = 0; j < numFeatures; j++) {
            centroid.push(Math.random()); // Initialize with random values
        }
        centroids.push(centroid);
    }

    let iteration = 0;
    let prevCentroids = null;

    // Steps 2 and 3: Assign data points to nearest centroids and update centroids until convergence
    while (iteration === 0 || !hasConverged(centroids, prevCentroids)) {
        prevCentroids = [...centroids]; // Save centroids for convergence check

        // Step 2: Assign each data point to the nearest centroid
        let assignments = new Array(data.length);
        for (let i = 0; i < data.length; i++) {
            let minDistance = Number.MAX_VALUE;
            let closestCentroid = null;
            for (let j = 0; j < centroids.length; j++) {
                let distance = euclideanDistance(data[i], centroids[j]);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCentroid = j;
                }
            }
            assignments[i] = closestCentroid;
        }

        // Step 3: Update centroids based on the mean of the points assigned to them
        for (let i = 0; i < centroids.length; i++) {
            let points = [];
            for (let j = 0; j < assignments.length; j++) {
                if (assignments[j] === i) {
                    points.push(data[j]);
                }
            }
            if (points.length > 0) {
                centroids[i] = calculateMean(points);
            }
        }

        iteration++;
    }

    return centroids;
}

// Function to calculate Euclidean distance between two points
function euclideanDistance(point1, point2) {
    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
        sum += Math.pow(point1[i] - point2[i], 2);
    }
    return Math.sqrt(sum);
}

// Function to check convergence
function hasConverged(centroids, prevCentroids) {
    if (prevCentroids === null) return false;
    for (let i = 0; i < centroids.length; i++) {
        for (let j = 0; j < centroids[i].length; j++) {
            if (Math.abs(centroids[i][j] - prevCentroids[i][j]) > e) {
                return false;
            }
        }
    }
    return true;
}

// Function to calculate mean of a list of points
function calculateMean(points) {
    let mean = new Array(points[0].length).fill(0);
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
            mean[j] += points[i][j];
        }
    }
    return mean.map(val => val / points.length);
}