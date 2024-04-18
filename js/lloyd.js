"use strict";

import Utilities from "./utils.js";
import dataSets from "./data.js";

export default class Lloyd {
    static dist(x, c) {
        return Math.sqrt(x.map((xi, i) => Math.pow(xi - c[i], 2)).reduce((sum, val) => sum + val, 0));
    }

    static checkTolerance(old, newCenters) {
        for (let i = 0; i < old.length; i++) {
            if (Lloyd.dist(newCenters[i], old[i]) >= Utilities.LLOYD_EPS) {
                return false;
            }
        }
        return true;
    }

    static closestCentroid(x, c) {
        let closest = -1;
        let minDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < c.length; i++) {
            const dist = Lloyd.dist(x, c[i]) ** 2;
            if (dist < minDist) {
                minDist = dist;
                closest = i;
            }
        }
        return closest;
    }

    static execute() {
        const data = dataSets.versicolor.concat(dataSets.setosa).map(row => row.slice(0, -1));

        const n = data.length;
        const c = 2;
        const old = [];
        const newCenters = [];

        for (let i = 0; i < c; i++) {
            const v = Utilities.INI_CENTROIDS[i];
            const vArray = v.map(val => val);
            old.push(vArray);
        }

        let numIter = 1;
        while (true) {
            for (let j = 0; j < n; j++) {
                const i = Lloyd.closestCentroid(data[j], old);
                newCenters[i] = old[i].map((val, idx) => val + Utilities.LLOYD_GAMMA * (data[j][idx] - val));
            }
            if (Lloyd.checkTolerance(old, newCenters) || numIter >= Utilities.LLOYD_KMAX) {
                break;
            } else {
                old.forEach((val, idx) => val.forEach((v, i) => val[i] = newCenters[idx][i]));
                numIter++;
            }
        }
        return { centroids: newCenters, iter: numIter };
    }

    static classify(centroids, example) {
        const data = [];
        let sol = -1;
        let minDist = Number.POSITIVE_INFINITY;
        for (let i = 0; i < centroids.length; i++) {
            const dist = Lloyd.dist(example, centroids[i]) ** 2;
            data.push([centroids[i], dist]);
            if (dist < minDist) {
                minDist = dist;
                sol = i;
            }
        }
        const classSol = sol === 0 ? "Iris-setosa" : "Iris-versicolor";

        return classSol;
    }
}
