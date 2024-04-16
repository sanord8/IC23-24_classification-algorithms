"use strict";

/**
 * Self-Organizing Map (SOM) class.
 */
class SOM {

    
   /**
     * @param {number} inputSize - The number of features in each data point.
     * @param {number} mapSize - The size of the SOM grid.
     * @param {number} tolerance - The tolerance value for convergence.
     * @param {number} maxIterations - The maximum number of iterations.
     * @param {number} learningRate - The learning rate.
    */
    constructor() {
        const inputSize = 4;
        const mapSize = 10; 
        const tolerance = Math.pow(10, -6); 
        const maxIterations = 1000; 
        const learningRate = 0.1; 

        this.tolerance = tolerance;
        this.maxIterations = maxIterations;
        this.learningRate = learningRate;
        this.inputSize = inputSize;
        this.mapSize = mapSize;
        this.weights = this.initializeWeights();
    }

    /**
     * Initializes the weights of the SOM.
     * @returns {number[][][]} - The initialized weights.
     */
    initializeWeights() {
        const weights = [];
        for (let i = 0; i < this.mapSize; i++) {
            weights[i] = [];
            for (let j = 0; j < this.mapSize; j++) {
                weights[i][j] = new Array(this.inputSize);
                for (let k = 0; k < this.inputSize; k++) {
                    weights[i][j][k] = Math.random();
                }
            }
        }
        return weights;
    }

    /**
     * Trains the SOM using the given data.
     * @param {number[][]} data - The training data.
     * @param {number} epochs - The number of training epochs.
     */
    train(data) {
        let epochs = this.maxIterations;
        for (let epoch = 0; epoch < epochs; epoch++) {
            for (let i = 0; i < data.length; i++) {
                const input = data[i].slice(0, this.inputSize);
                const winner = this.findWinner(input);
                this.updateWeights(input, winner, epoch, epochs);
            }
        }
    }

    /**
     * Finds the winning neuron for the given input.
     * @param {number[]} input - The input data.
     * @returns {number[]} - The coordinates of the winning neuron.
     */
    findWinner(input) {
        let minDistance = Number.MAX_VALUE;
        let winner = [0, 0];
        for (let i = 0; i < this.mapSize; i++) {
            for (let j = 0; j < this.mapSize; j++) {
                const distance = this.calculateDistance(input, this.weights[i][j]);
                if (distance < minDistance) {
                    minDistance = distance;
                    winner = [i, j];
                }
            }
        }
        return winner;
    }

    /**
     * Calculates the Euclidean distance between two vectors.
     * @param {number[]} input - The first vector.
     * @param {number[]} weight - The second vector.
     * @returns {number} - The Euclidean distance.
     */
    calculateDistance(input, weight) {
        let distance = 0;
        for (let i = 0; i < this.inputSize; i++) {
            distance += Math.pow(input[i] - weight[i], 2);
        }
        return Math.sqrt(distance);
    }

    /**
     * Updates the weights of the SOM based on the input and winner neuron.
     * @param {number[]} input - The input data.
     * @param {number[]} winner - The coordinates of the winning neuron.
     * @param {number} epoch - The current epoch.
     * @param {number} epochs - The total number of epochs.
     */
    updateWeights(input, winner, epoch, epochs) {
        const learningRate = 1 - (epoch / epochs);
        const neighborhoodRadius = this.mapSize / 2;
        for (let i = 0; i < this.mapSize; i++) {
            for (let j = 0; j < this.mapSize; j++) {
                const distanceToWinner = Math.sqrt(Math.pow(i - winner[0], 2) + Math.pow(j - winner[1], 2));
                const influence = Math.exp(-(Math.pow(distanceToWinner, 2) / (2 * Math.pow(neighborhoodRadius, 2))));
                for (let k = 0; k < this.inputSize; k++) {
                    this.weights[i][j][k] += learningRate * influence * (input[k] - this.weights[i][j][k]);
                }
            }
        }
    }

    /**
     * Predicts the output for the given input.
     * @param {number[]} input - The input data.
     * @returns {number[]} - The predicted output.
     */
    predict(input) {
        const winner = this.findWinner(input);
        return this.weights[winner[0]][winner[1]];
    }
}

