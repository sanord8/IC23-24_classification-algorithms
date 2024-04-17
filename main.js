"use strict";

import KMeans from "./JS/K-means";

(async function init() {
    const versicolorData = [];
    const setosaData = [];

    await createTableFromTextFile(versicolorData, setosaData);
    
    // Call the kMeans function to perform clustering
    const finalCentroids = KMeans.execute(versicolorData, setosaData);
    console.log("Final Centroids:", finalCentroids);

    // SOM
    runSOM(versicolorData, setosaData);
})();

function createTableFromTextFile(versicolorData, setosaData) {
    fetch('/docs/Iris2Clases.txt')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').map(row => row.split(','));

            const vTable = document.getElementById("versicolorTable");
            const sTable = document.getElementById("setosaTable");

            rows.forEach(rowData => {
                const isSetosa = (rowData[rowData.length - 1].trim() == "Iris-setosa");

                const row = document.createElement('tr');
                const numericRow = [];
                rowData.forEach((cellData, index) => {
                    if (index == rowData.length - 1) {
                        numericRow.push(cellData.trim());
                        return;
                    }
                    else {
                        numericRow.push(parseFloat(cellData))
                    }

                    const cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    row.appendChild(cell);
                });

                if (isSetosa) {
                    setosaData.push(numericRow);
                    sTable.appendChild(row);
                }
                else {
                    versicolorData.push(numericRow);
                    vTable.appendChild(row);
                }
            });
        })
        .catch(error => console.error('Error reading file:', error));
}

function runSOM(versicolorData, setosaData) {
    const som = new SOM();
    let somData = versicolorData.concat(setosaData);
    som.train(somData);
    som.predict(['5.1','3.5','1.4','0.2']);
    console.log('Iris-setosa was the correct classification');
}