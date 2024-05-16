# Algoritmos de Clasificación
## Introducción
Este proyecto implementa varios algoritmos de clasificación utilizando JavaScript, HTML y CSS. Los algoritmos implementados incluyen K-Means, Bayes, el Algoritmo de Lloyd y Mapas Autoorganizados (SOM), usando como datos de prueba los tipos de iris.

## Entorno
El proyecto se desarrolló utilizando Visual Studio Code con el complemento Live Server para actualizaciones en tiempo real durante el desarrollo.

## Tecnologías
Las siguientes tecnologías se utilizaron en este proyecto:

- HTML: Lenguaje de marcado para crear la estructura de la página web.
- JavaScript: Lenguaje de programación utilizado para implementar la lógica de los algoritmos de clasificación y manipular el DOM.
- CSS: Lenguaje de hojas de estilo utilizado para la presentación de la página web.

## Librerías
Las siguientes librerías se utilizaron en este proyecto:

- Bootstrap: Framework CSS utilizado para diseñar la interfaz de usuario de la página web.
- JQuery: Biblioteca de JavaScript utilizada para la manipulación y recorrido de documentos HTML, manejo de eventos y animación.

## Otras Tecnologías
Las siguientes otras tecnologías se utilizaron en este proyecto:

- GitHub: Sistema de control de versiones utilizado para rastrear cambios en los archivos del proyecto.
- Whatsapp: Herramienta de comunicación utilizada para la comunicación del equipo.

## Implementación
### General
Se ha implementado un código de colores para diferenciar las diferentes cajas y sus estados.

### main.js
Este archivo contiene la lógica principal de la página. Incluye funciones para inicializar la cuadrícula, manejar clics en las celdas e iniciar la búsqueda.

### js/bayes.js
Este archivo contiene la implementación del algoritmo de clasificación de Bayes. Incluye funciones para calcular la media y la matriz de covarianza, así como para clasificar los datos.

### js/data.js
Este archivo se encarga de manejar los datos utilizados en el proyecto. Incluye funciones para cargar los datos de los archivos de texto proporcionados y para dividir los datos en conjuntos de entrenamiento y prueba.

### js/k-means.js
Este archivo contiene la implementación del algoritmo de clasificación K-Means. Incluye funciones para inicializar los centroides, asignar puntos de datos al centroide más cercano y actualizar los centroides en función de los puntos de datos asignados.

### js/lloyd.js
Este archivo contiene la implementación del algoritmo de Lloyd para la clasificación de datos. Incluye funciones para inicializar los centroides, asignar puntos de datos al centroide más cercano y actualizar los centroides en función de los puntos de datos asignados.

### js/utils.js
Este archivo contiene funciones de utilidad utilizadas en todo el proyecto. Incluye funciones para calcular la distancia euclidiana entre dos puntos, para generar números aleatorios dentro de un rango especificado y para copiar arrays de manera profunda.

### js/SOM.js
Este archivo contiene la implementación del algoritmo de Mapas Autoorganizados (SOM). Incluye una función para inicializar los pesos del mapa. Esta implementación no está completa, pero se puede utilizar como base para futuras mejoras.

### index.html
Este archivo contiene la estructura de la página web e incluye todos los elementos visibles de la implementación.

### styles.css
Este archivo contiene los estilos de la página web, como colores y reglas de diseño.