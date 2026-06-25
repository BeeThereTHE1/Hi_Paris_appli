"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo4 = {
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
        "learningRate",
        "problem",
        "dataset",
        "regularization",
        "regularizationRate",
        "weightEditor",
        "doubleRunButton",
        "seedControl"
    ],
    forcedState: {
        dataset: state_1.datasets["gauss"],
        activation: state_1.activations["sigmoid"],
        numHiddenLayers: 1,
        networkShape: [1],
        x: true,
        y: true,
        xTimesY: false,
        xSquared: false,
        ySquared: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false
    }
};
function initExo4Popups() {
    var overlay = d3.select("#exo4-popup-overlay");
    var page1 = d3.select("#exo4-page1");
    var page2 = d3.select("#exo4-page2");
    overlay.style("display", "flex");
    d3.select("#exo4-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo4-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo4Popups = initExo4Popups;
