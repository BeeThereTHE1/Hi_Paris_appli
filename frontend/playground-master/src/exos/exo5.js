"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo5 = {
    hiddenControls: [
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "numHiddenLayers",
        "showTestData",
        "discretize",
        "xTimesY",
        "cosX",
        "cosY",
        "sinX",
        "sinY",
        "activation",
        "learningRate",
        "problem",
        "regularization",
        "regularizationRate",
        "weightEditor",
        "biasEditor",
        "doubleRunButton",
        "seedControl"
    ],
    forcedState: {
        dataset: state_1.datasets["circle"],
        activation: state_1.activations["sigmoid"],
        numHiddenLayers: 0,
        networkShape: [],
        x: true,
        y: true,
        xSquared: true,
        ySquared: true,
        xTimesY: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false
    }
};
function initExo5Popups() {
    var overlay = d3.select("#exo5-popup-overlay");
    var page1 = d3.select("#exo5-page1");
    var page2 = d3.select("#exo5-page2");
    overlay.style("display", "flex");
    d3.select("#exo5-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo5-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo5Popups = initExo5Popups;
