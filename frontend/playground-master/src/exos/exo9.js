"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo9 = {
    hiddenControls: [
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "batchSize",
        "showTestData",
        "xSquared",
        "ySquared",
        "xTimesY",
        "cosX",
        "cosY",
        "sinX",
        "sinY",
        "numHiddenLayers",
        "weightEditor",
        "biasEditor",
        "seedControl"
    ],
    forcedState: {
        dataset: state_1.datasets["gauss"],
        activation: state_1.activations["linear"],
        numHiddenLayers: 0,
        networkShape: [],
        x: true,
        y: true,
        xSquared: false,
        ySquared: false,
        xTimesY: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false,
        learningRate: 1,
        regularization: null,
        percTrainData: 50,
        noise: 5,
        batchSize: 10
    }
};
function initExo9Popups() {
    var overlay = d3.select("#exo9-popup-overlay");
    var page1 = d3.select("#exo9-page1");
    var page2 = d3.select("#exo9-page2");
    overlay.style("display", "flex");
    d3.select("#exo9-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo9-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo9Popups = initExo9Popups;
