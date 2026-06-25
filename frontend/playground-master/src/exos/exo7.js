"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo7 = {
    hiddenControls: [
        "learningRate",
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "showTestData",
        "discretize",
        "xSquared",
        "ySquared",
        "xTimesY",
        "cosX",
        "cosY",
        "sinX",
        "sinY",
        "weightEditor",
        "biasEditor",
        "doubleRunButton",
        "seedControl"
    ],
    forcedState: {
        dataset: state_1.datasets["circle"],
        activation: state_1.activations["linear"],
        numHiddenLayers: 1,
        networkShape: [4],
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
function initExo7Popups() {
    var overlay = d3.select("#exo7-popup-overlay");
    var page1 = d3.select("#exo7-page1");
    var page2 = d3.select("#exo7-page2");
    overlay.style("display", "flex");
    d3.select("#exo7-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo7-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo7Popups = initExo7Popups;
