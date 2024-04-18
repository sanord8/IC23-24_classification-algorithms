"use strict";

import dataSets from "./docs/data.js";
import KMeans from "./js/k-means.js";
import SOM from "./js/SOM.js";

(async function init() {
    createDataTable();

    kMeans();

    // SOM
    runSOM();
})();

async function createDataTable() {
    dataSets.versicolor.forEach(rowData => {
        createRow(rowData, false);
    });

    dataSets.setosa.forEach(rowData => {
        createRow(rowData, true);
    });

    document.getElementById("tests").innerHTML = `<table class="table table-striped">
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Test 1</th>
                                                            <td>${dataSets.test1[0]}</td>
                                                            <td>${dataSets.test1[1]}</td>
                                                            <td>${dataSets.test1[2]}</td>
                                                            <td>${dataSets.test1[3]}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Test 2</th>
                                                            <td>${dataSets.test2[0]}</td>
                                                            <td>${dataSets.test2[1]}</td>
                                                            <td>${dataSets.test2[2]}</td>
                                                            <td>${dataSets.test2[3]}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Test 3</th>
                                                            <td>${dataSets.test3[0]}</td>
                                                            <td>${dataSets.test3[1]}</td>
                                                            <td>${dataSets.test3[2]}</td>
                                                            <td>${dataSets.test3[3]}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>`
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

async function kMeans() {
    // Call the kMeans function to perform clustering
    const result = KMeans.execute();
    const finalCentroids = result.centroids.map(subArray =>
        subArray.map(number => parseFloat(number.toFixed(2)))
    );
    console.log(finalCentroids);

    document.getElementById("kMeansCentroids").innerHTML = `<table class="table table-striped-columns">
                            <tbody>
                                <tr>
                                    <th scope="row">V1</th>
                                    <td>${finalCentroids[0][0]}</td>
                                    <td>${finalCentroids[0][1]}</td>
                                    <td>${finalCentroids[0][2]}</td>
                                    <td>${finalCentroids[0][3]}</td>
                                </tr>
                                <tr>
                                    <th scope="row">V2</th>
                                    <td>${finalCentroids[1][0]}</td>
                                    <td>${finalCentroids[1][1]}</td>
                                    <td>${finalCentroids[1][2]}</td>
                                    <td>${finalCentroids[1][3]}</td>
                                </tr>
                            </tbody>
                        </table>`;

    // Delete solution from test
    const t1 = KMeans.classify(finalCentroids, dataSets.test1.slice(0, -1));
    const t2 = KMeans.classify(finalCentroids, dataSets.test2.slice(0, -1));
    const t3 = KMeans.classify(finalCentroids, dataSets.test3.slice(0, -1));

    document.getElementById("kMeansTests").innerHTML = `<table class="table table-striped">
                                                            <tbody>
                                                                <tr>
                                                                    <th scope="row">Test 1</th>
                                                                    <td>${t1}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Test 2</th>
                                                                    <td>${t2}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Test 3</th>
                                                                    <td>${t3}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>`;
}

function runSOM() {
    const som = new SOM();
    som.train(dataSets.versicolor.concat(dataSets.setosa));
    
    const t1 = som.predict(dataSets.test1.slice(0, -1));
    console.log(t1);
}