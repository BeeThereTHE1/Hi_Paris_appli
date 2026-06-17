"use strict";
exports.__esModule = true;
var state_1 = require("../state");
var d3 = require("d3");
exports.exo14 = {
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
        activation: state_1.activations["relu"],
        numHiddenLayers: 6,
        networkShape: [8, 8, 8, 8, 8, 8],
        x: true,
        y: true,
        xSquared: false,
        ySquared: false,
        xTimesY: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false,
        learningRate: 0.1,
        regularization: null,
        percTrainData: 50,
        noise: 5,
        batchSize: 10
    }
};
function initExo14Popups() {
    var overlay = d3.select("#exo14-popup-overlay");
    var page1 = d3.select("#exo14-page1");
    var page2 = d3.select("#exo14-page2");
    overlay.style("display", "flex");
    d3.select("#exo14-next-btn1").on("click", function () {
        page1.style("display", "none");
        page2.style("display", "block");
    });
    d3.select("#exo14-next-btn2").on("click", function () {
        overlay.style("display", "none");
    });
}
exports.initExo14Popups = initExo14Popups;
