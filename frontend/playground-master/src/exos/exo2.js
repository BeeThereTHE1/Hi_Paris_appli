"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo2 = {
    hiddenControls: [
        "percTrainData",
        "noise",
        "batchSize",
        "numHiddenLayers",
        "showTestData",
        "discretize",
        "xTimesY",
        "xSquared",
        "ySquared",
        "cosX",
        "sinX",
        "cosY",
        "sinY",
        "activation",
        "doubleRunButton",
        "seedControl",
        "weightEditor",
        "biasEditor",
        "regularization",
        "regularizationRate",
        "dataset",
        "problem",
        "learningRate",
        "testLoss"
    ],
    forcedState: {
        dataset: state_1.datasets["gauss"],
        activation: state_1.activations["sigmoid"],
        numHiddenLayers: 0,
        networkShape: [],
        x: true,
        y: true,
        xTimesY: false,
        xSquared: false,
        ySquared: false,
        cosX: false,
        sinX: false,
        cosY: false
    }
};
function initExo2Popups() {
    var overlay = d3.select("#exo2-popup-overlay");
    var page1 = d3.select("#exo2-page1");
    var page2 = d3.select("#exo2-page2");
    overlay.style("display", "flex");
    d3.select("#exo2-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo2-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo2Popups = initExo2Popups;
