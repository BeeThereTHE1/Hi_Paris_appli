"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo1 = {
    hiddenControls: [
        "learningRate",
        "activation",
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "numHiddenLayers",
        "showTestData",
        "discretize",
        "sinX",
        "cosX",
        "sinY",
        "cosY",
        "xTimesY",
        "xSquared",
        "ySquared",
        "playButton",
        "biasEditor",
        "doubleRunButton",
        "seedControl",
        "epoch",
        "resetButton",
        "stepButton",
        "testLoss",
        "dataset",
        "weightEditor"
    ],
    forcedState: {
        dataset: state_1.datasets["gauss"],
        activation: state_1.activations["sigmoid"],
        numHiddenLayers: 0,
        networkShape: [],
        x: true,
        y: true
    }
};
function initExo1Popups() {
    var overlay = d3.select("#exo1-popup-overlay");
    var page1 = d3.select("#exo1-page1");
    var page2 = d3.select("#exo1-page2");
    overlay.style("display", "flex");
    d3.select("#exo1-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo1-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo1Popups = initExo1Popups;
