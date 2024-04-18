"use strict";

export default class Utilities {
    static INI_CENTROIDS = [[4.6, 3.0, 4.0, 0.0], [6.8, 3.4, 4.6, 0.7]];

    static KMEANS_EPS = Math.pow(1, -2);
    static KMEANS_B = 2;

    static LLOYD_EPS = Math.pow(10, -6);
    static LLOYD_GAMMA = 1;
    static LLOYD_KMAX = 1000;
}