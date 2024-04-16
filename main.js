(function init() {
    createTableFromTextFile();
})();

function createTableFromTextFile() {
    fetch('/docs/Iris2Clases.txt')
        .then(response => response.text())
        .then(data => {
            const rows = data.trim().split('\n').map(row => row.split(','));

            const vTable = document.getElementById("versicolorTable");
            const sTable = document.getElementById("setosaTable");

            rows.forEach(rowData => {
                const isSetosa = (rowData[rowData.length - 1] == "Iris-setosa");
                console.log(rowData[rowData.length - 1], (rowData[rowData.length - 1] == "Iris-setosa"));

                const row = document.createElement('tr');
                rowData.forEach((cellData, index) => {
                    if(index == rowData.length)
                        return;

                    const cell = document.createElement('td');
                    cell.appendChild(document.createTextNode(cellData));
                    row.appendChild(cell);
                });

                if (isSetosa)
                    sTable.appendChild(row);
                else
                    vTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error reading file:', error));
}