"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo12 = {
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
        "weightEditor",
        "biasEditor",
        "seedControl",
        "doubleRunButton"
    ],
    forcedState: {
        dataset: state_1.datasets["spiral"],
        activation: state_1.activations["tanh"],
        numHiddenLayers: 4,
        networkShape: [7, 7, 7, 7],
        x: true,
        y: true,
        xSquared: false,
        ySquared: false,
        xTimesY: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false,
        learningRate: 0.03,
        regularization: null,
        percTrainData: 50,
        noise: 5,
        batchSize: 10
    }
};
function initExo12Popups() {
    var overlay = d3.select("#exo12-popup-overlay");
    var page1 = d3.select("#exo12-page1");
    var page2 = d3.select("#exo12-page2");
    overlay.style("display", "flex");
    d3.select("#exo12-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo12-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo12Popups = initExo12Popups;
