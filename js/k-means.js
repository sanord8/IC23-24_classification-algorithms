"use strict";

import Utilities from "./utils.js";
import dataSets from "./data.js";

export default class KMeans {
    static dist(x, v) {
        return Math.sqrt(x.map((xi, i) => Math.pow(xi - v[i], 2)).reduce((sum, val) => sum + val, 0));
    }

    static checkTolerance(old, newCenters) {
        for (let i = 0; i < old.length; i++) {
            if (KMeans.dist(newCenters[i], old[i]) >= Utilities.KMEANS_EPS) {
                return false;
            }
        }
        return true;
    }

    static updateCentroid(i, u, x) {
        let numValue = new Array(x[0].length).fill(0);
        let denValue = 0;
        for (let j = 0; j < x.length; j++) {
            numValue = numValue.map((val, idx) => val + Math.pow(u[i][j], Utilities.KMEANS_B) * x[j][idx]);
            denValue += Math.pow(u[i][j], Utilities.KMEANS_B);
        }
        return numValue.map(val => val / denValue);
    }

    static execute() {
        const data = dataSets.versicolor.concat(dataSets.setosa).map(row => row.slice(0, -1));

        const n = data.length;
        const c = 2;

        const old = [];
        const newCenters = [];

        for (let i = 0; i < c; i++) {
            const v = Utilities.INI_CENTROIDS[i];
            old.push(v.map(val => val));
        }

        let numIter = 1;
        while (true) {
            const u = [];
            const acc = new Array(n).fill(0);
            for (let i = 0; i < c - 1; i++) {
                u[i] = [];
                for (let j = 0; j < n; j++) {
                    let numValue = Math.pow(1 / Math.pow(KMeans.dist(data[j], old[i]), 2), 1 / (Utilities.KMEANS_B - 1));
                    let denValue = 0;
                    for (let r = 0; r < c; r++) {
                        denValue += Math.pow(1 / Math.pow(KMeans.dist(data[j], old[r]), 2), 1 / (Utilities.KMEANS_B - 1));
                    }
                    u[i][j] = numValue / denValue;
                    acc[j] += u[i][j];
                }
            }
            u[c - 1] = acc.map(val => 1 - val);
            for (let i = 0; i < c; i++) {
                newCenters[i] = KMeans.updateCentroid(i, u, data);
            }
            if (KMeans.checkTolerance(old, newCenters)) {
                break;
            } else {
                old.forEach((val, idx) => val.forEach((v, i) => val[i] = newCenters[idx][i]));
                numIter++;
            }
        }
        return { centroids: newCenters, iter: numIter };
    }

    static classify(centroids, example) {
        let data = [];
        let sol = -1;
        let minDist = Number.POSITIVE_INFINITY;
        let maxDegree = 0;
        for (let i = 0; i < centroids.length; i++) {
            let dist = KMeans.dist(example, centroids[i]) ** 2;
            let numValue = Math.pow(1 / Math.pow(KMeans.dist(example, centroids[i]), 2), 1 / (Utilities.KMEANS_B - 1));
            let denValue = 0;
            for (let r = 0; r < centroids.length; r++) {
                denValue += Math.pow(1 / Math.pow(KMeans.dist(example, centroids[r]), 2), 1 / (Utilities.KMEANS_B - 1));
            }
            maxDegree = Math.max(maxDegree, numValue / denValue);
            data.push([centroids[i], dist, numValue / denValue]);
            if (dist < minDist) {
                minDist = dist;
                sol = i;
            }
        }
        const classSol = sol === 0 ? "Iris-setosa" : "Iris-versicolor";
        data.push(maxDegree);

        return classSol;
    }
}