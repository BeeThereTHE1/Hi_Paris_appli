"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo10 = {
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
        "biasEditor"
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
        noise: 50,
        batchSize: 10
    }
};
function initExo10Popups() {
    var overlay = d3.select("#exo10-popup-overlay");
    var page1 = d3.select("#exo10-page1");
    var page2 = d3.select("#exo10-page2");
    overlay.style("display", "flex");
    d3.select("#exo10-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo10-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo10Popups = initExo10Popups;
