"use strict";

import data from "./data.js";

export default class Bayes {
    static calcMean(x) {
        const acc = new Array(x[0].length).fill(0);
        x.forEach(d => {
            d.forEach((val, idx) => acc[idx] += val);
        });
        return acc.map(val => val / x.length);
    }

    static calcMatrix(x, m) {
        const dims = x[0].length;
        const acc = Array.from({ length: dims }, () => new Array(dims).fill(0));
        x.forEach(d => {
            const subs = d.map((val, idx) => val - m[idx]);
            for (let i = 0; i < dims; i++) {
                for (let j = 0; j < dims; j++) {
                    acc[i][j] += subs[i] * subs[j];
                }
            }
        });
        return acc.map(row => row.map(val => val / x.length));
    }

    static execute() {
        // Remove solution from data
        const dataSet = data.setosa.map(row => row.slice(0, -1));
        const dataVer = data.versicolor.map(row => row.slice(0, -1));

        const m1 = Bayes.calcMean(dataSet);
        const m2 = Bayes.calcMean(dataVer);
        const c1 = Bayes.calcMatrix(dataSet, m1);
        const c2 = Bayes.calcMatrix(dataVer, m2);
        return {
            means: [m1, m2],
            matrices: [c1, c2]
        };
    }

    static classify( means, matrices, example) {
        const data = [];
        let sol = -1;
        let minDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < means.length; i++) {
            const aux = example.map((val, idx) => val - means[i][idx]);
            let dist = 0;
            for (let j = 0; j < aux.length; j++) {
                for (let k = 0; k < aux.length; k++) {
                    dist += aux[j] * matrices[i][j][k] * aux[k];
                }
            }
            data.push({ mean: means[i], covariance: matrices[i], aux: aux, distance: dist });
            if (dist < minDist) {
                minDist = dist;
                sol = i;
            }
        }
        const classSol = sol === 0 ? "Iris-setosa" : "Iris-versicolor";

        return classSol;
    }
}
