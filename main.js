"use strict";

import dataSets from "./docs/data.js";
import KMeans from "./js/k-means.js";

(async function init() {
    await createTable();

    // Call the kMeans function to perform clustering
    const finalCentroids = KMeans.execute();
    console.log("Final Centroids:", finalCentroids);

    // SOM
    runSOM(versicolorData, setosaData);
})();

function createTable() {
    dataSets.versicolor.forEach(rowData => {
        createRow(rowData, false);
    });

    dataSets.setosa.forEach(rowData => {
        createRow(rowData, true);
    });
}

function createRow(rowData, isSetosa) {
    const vTable = document.getElementById("versicolorTable");
    const sTable = document.getElementById("setosaTable");

    const row = document.createElement('tr');
    rowData.forEach((cellData, index) => {
        if (index == rowData.length - 1)
            return;

        const cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
    });

    if (isSetosa) {
        sTable.appendChild(row);
    }
    else {
        vTable.appendChild(row);
    }
}

function runSOM(versicolorData, setosaData) {
    const som = new SOM();
    let somData = versicolorData.concat(setosaData);
    som.train(somData);
    som.predict(['5.1', '3.5', '1.4', '0.2']);
    console.log('Iris-setosa was the correct classification');
}