"use strict";

import dataSets from "./js/data.js";
import KMeans from "./js/k-means.js";
import Bayes from "./js/bayes.js";
import Lloyd from "./js/lloyd.js";
import SOM from "./js/SOM.js";

(async function init() {
    createDataTable();

    kMeans();
    bayes();
    lloydAlgorithm();
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

async function createTestSolutionsTable(id, t1, t2, t3) {
    document.getElementById(id).innerHTML = `<table class="table table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Test 1</th>
                                                        <td>${t1}</td>
                                                        <td>${t1 === dataSets.test1[4] ? '✅' : '❌'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Test 2</th>
                                                        <td>${t2}</td>
                                                        <td>${t2 === dataSets.test2[4] ? '✅' : '❌'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Test 3</th>
                                                        <td>${t3}</td>
                                                        <td>${t3 === dataSets.test3[4] ? '✅' : '❌'}</td>
                                                    </tr>
                                                </tbody>
                                            </table>`;
}

async function drawCentroids(id, centroids) {
    document.getElementById(id).innerHTML = `<table class="table table-striped-columns">
    <tbody>
        <tr>
            <th scope="row">V1</th>
            <td>${centroids[0][0]}</td>
            <td>${centroids[0][1]}</td>
            <td>${centroids[0][2]}</td>
            <td>${centroids[0][3]}</td>
        </tr>
        <tr>
            <th scope="row">V2</th>
            <td>${centroids[1][0]}</td>
            <td>${centroids[1][1]}</td>
            <td>${centroids[1][2]}</td>
            <td>${centroids[1][3]}</td>
        </tr>
    </tbody>
</table>`;
}

async function kMeans() {
    // Call the kMeans function to perform clustering
    const result = KMeans.execute();
    const finalCentroids = result.centroids.map(subArray =>
        subArray.map(number => parseFloat(number.toFixed(2)))
    );

    drawCentroids("kMeansCentroids", finalCentroids);

    // Delete solution from test
    const t1 = KMeans.classify(finalCentroids, dataSets.test1.slice(0, -1));
    const t2 = KMeans.classify(finalCentroids, dataSets.test2.slice(0, -1));
    const t3 = KMeans.classify(finalCentroids, dataSets.test3.slice(0, -1));

    createTestSolutionsTable("kMeansTests", t1, t2, t3);
}

function bayesCreateMatrixTable(matrix) {
    let hmtlMatrix = "";
    for(let x = 0; x < 4; x++) {
        hmtlMatrix += `<tr>
                            <td>${matrix[x][0]}</td>
                            <td>${matrix[x][1]}</td>
                            <td>${matrix[x][2]}</td>
                            <td>${matrix[x][3]}</td>
                        </tr>`
    }
    return hmtlMatrix;
}

async function bayes() {
    let x = Bayes.execute();
    const means = x.means.map(subArray =>
        subArray.map(number => parseFloat(number.toFixed(2)))
    );
    const matrices = x.matrices.map(row =>
        row = row.map(subArray =>
            subArray.map(number => parseFloat(number.toFixed(2)))
        )
    );
    
    document.getElementById("bayesMeans").innerHTML = `<table class="table table-striped-columns">
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">M1</th>
                                                                        <td>${means[0][0]}</td>
                                                                        <td>${means[0][1]}</td>
                                                                        <td>${means[0][2]}</td>
                                                                        <td>${means[0][3]}</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">M2</th>
                                                                        <td>${means[1][0]}</td>
                                                                        <td>${means[1][1]}</td>
                                                                        <td>${means[1][2]}</td>
                                                                        <td>${means[1][3]}</td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>`;

    document.getElementById("bayesMatrices").innerHTML = `<div class="col">
                                                            <h5>M1</h5>
                                                            <table class="table table-striped-columns">
                                                                <tbody>
                                                                    ${bayesCreateMatrixTable(matrices[0])}
                                                                </tbody>
                                                            </table>    
                                                        </div>
                                                        <div class="col">
                                                            <h5>M2</h5>
                                                            <table class="table table-striped-columns">
                                                                <tbody>
                                                                    ${bayesCreateMatrixTable(matrices[1])}
                                                                </tbody>
                                                            </table>    
                                                        </div>`;

    // Delete solution from test
    const t1 = Bayes.classify(means, matrices, dataSets.test1.slice(0, -1));
    const t2 = Bayes.classify(means, matrices, dataSets.test2.slice(0, -1));
    const t3 = Bayes.classify(means, matrices, dataSets.test3.slice(0, -1));

    createTestSolutionsTable("bayesTests", t1, t2, t3);
}

async function lloydAlgorithm() {
    const result = Lloyd.execute();
    const finalCentroids = result.centroids.map(subArray =>
        subArray.map(number => parseFloat(number.toFixed(2)))
    );

    drawCentroids("lloydCentroids", finalCentroids);

    // Delete solution from test
    const t1 = Lloyd.classify(finalCentroids, dataSets.test1.slice(0, -1));
    const t2 = Lloyd.classify(finalCentroids, dataSets.test2.slice(0, -1));
    const t3 = Lloyd.classify(finalCentroids, dataSets.test3.slice(0, -1));

    createTestSolutionsTable("lloydTests", t1, t2, t3);
}

async function runSOM() {
    const som = new SOM();
    som.train(dataSets.versicolor.concat(dataSets.setosa));
    
    const t1 = som.predict(dataSets.test1.slice(0, -1));
}