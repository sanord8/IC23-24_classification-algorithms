export default class SOM {
    constructor(inputSize, mapSize, tolerance, maxIterations, learningRate) {
        this.inputSize = inputSize;
        this.mapSize = mapSize;
        this.tolerance = tolerance;
        this.maxIterations = maxIterations;
        this.learningRate = learningRate;
        this.weights = this.initializeWeights();
    }

    initializeWeights() {
        // Initialize the weights randomly
        let weights = [];
        for (let i = 0; i < this.mapSize; i++) {
            let weight = [];
            for (let j = 0; j < this.inputSize; j++) {
                weight.push(Math.random());
            }
            weights.push(weight);
        }
        return weights;
    }

    train(data, labels) {
        // Train the SOM
        for (let i = 0; i < this.maxIterations; i++) {
            for (let j = 0; j < data.length; j++) {
                this.updateWeights(data[j], labels[j]);
            }
        }
    }

    updateWeights(input, label) {
        // Update the weights of the best matching unit
        let bmuIndex = this.findBestMatchingUnit(input);
        for (let i = 0; i < this.weights[bmuIndex].length; i++) {
            this.weights[bmuIndex][i] += this.learningRate * (input[i] - this.weights[bmuIndex][i]);
        }
    }

    findBestMatchingUnit(input) {
        // Find the best matching unit for the given input
        let minDist = Infinity;
        let bmuIndex = -1;
        for (let i = 0; i < this.weights.length; i++) {
            let dist = this.calculateDistance(input, this.weights[i]);
            if (dist < minDist) {
                minDist = dist;
                bmuIndex = i;
            }
        }
        return bmuIndex;
    }

    calculateDistance(input, weights) {
        // Calculate the Euclidean distance between the input and the weights
        let sum = 0;
        for (let i = 0; i < input.length; i++) {
            sum += Math.pow(input[i] - weights[i], 2);
        }
        return Math.sqrt(sum);
    }

    predict(input) {
        // Predict the output for the given input
        let bmuIndex = this.findBestMatchingUnit(input);
        return bmuIndex;
    }
}