"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nn = require("./nn");
const heatmap_1 = require("./heatmap");
const state_1 = require("./state");
const dataset_1 = require("./dataset");
const linechart_1 = require("./linechart");
const d3 = require("d3");
const exo1_1 = require("./exos/exo1");
const exo2_1 = require("./exos/exo2");
const exo3_1 = require("./exos/exo3");
const exo4_1 = require("./exos/exo4");
const exo5_1 = require("./exos/exo5");
const exo6_1 = require("./exos/exo6");
const exo7_1 = require("./exos/exo7");
const exo8_1 = require("./exos/exo8");
const exo9_1 = require("./exos/exo9");
const exo10_1 = require("./exos/exo10");
const exo11_1 = require("./exos/exo11");
const exo12_1 = require("./exos/exo12");
const exo13_1 = require("./exos/exo13");
const exo14_1 = require("./exos/exo14");
const exo15_1 = require("./exos/exo15");
const exo16_1 = require("./exos/exo16");
const exo17_1 = require("./exos/exo17");
const params = new URLSearchParams(window.location.search);
let exoIdStr = params.get("exo");
const modelId = params.get("model") || "1";
if (!exoIdStr) {
    try {
        const parentPath = window.parent.location.pathname;
        const match = parentPath.match(/exo(\d+)/);
        if (match) {
            exoIdStr = match[1];
        }
    }
    catch (e) {
    }
}
const exoId = Number(exoIdStr || "0");
d3.select("body").attr("data-exo", exoId);
const exoConfig = exoId === 1 ? exo1_1.exo1 : (exoId === 2 ? exo2_1.exo2 : (exoId === 3 ? exo3_1.exo3 : (exoId === 4 ? exo4_1.exo4 : (exoId === 5 ? exo5_1.exo5 : (exoId === 6 ? exo6_1.exo6 : (exoId === 7 ? exo7_1.exo7 : (exoId === 8 ? exo8_1.exo8 : (exoId === 9 ? exo9_1.exo9 : (exoId === 10 ? exo10_1.exo10 : (exoId === 11 ? exo11_1.exo11 : (exoId === 12 ? exo12_1.exo12 : (exoId === 13 ? exo13_1.exo13 : (exoId === 14 ? exo14_1.exo14 : (exoId === 15 ? exo15_1.exo15 : (exoId === 16 ? exo16_1.exo16 : (exoId === 17 ? exo17_1.exo17 : null))))))))))))))));
let mainWidth;
d3.select(".more button").on("click", function () {
    let position = 800;
    d3.transition()
        .duration(1000)
        .tween("scroll", scrollTween(position));
});
function scrollTween(offset) {
    return function () {
        let i = d3.interpolateNumber(window.pageYOffset ||
            document.documentElement.scrollTop, offset);
        return function (t) { scrollTo(0, i(t)); };
    };
}
const RECT_SIZE = 30;
const BIAS_SIZE = 8;
const NUM_SAMPLES_CLASSIFY = 500;
const NUM_SAMPLES_REGRESS = 1200;
const DENSITY = 100;
var HoverType;
(function (HoverType) {
    HoverType[HoverType["BIAS"] = 0] = "BIAS";
    HoverType[HoverType["WEIGHT"] = 1] = "WEIGHT";
})(HoverType || (HoverType = {}));
let INPUTS = {
    "x": { f: (x, y) => x, label: "X_1" },
    "y": { f: (x, y) => y, label: "X_2" },
    "xSquared": { f: (x, y) => x * x, label: "X_1^2" },
    "ySquared": { f: (x, y) => y * y, label: "X_2^2" },
    "xTimesY": { f: (x, y) => x * y, label: "X_1X_2" },
    "sinX": { f: (x, y) => Math.sin(x), label: "sin(X_1)" },
    "sinY": { f: (x, y) => Math.sin(y), label: "sin(X_2)" },
};
let HIDABLE_CONTROLS = [
    ["Show test data", "showTestData"],
    ["Discretize output", "discretize"],
    ["Play button", "playButton"],
    ["Step button", "stepButton"],
    ["Reset button", "resetButton"],
    ["Learning rate", "learningRate"],
    ["Activation", "activation"],
    ["Regularization", "regularization"],
    ["Regularization rate", "regularizationRate"],
    ["Problem type", "problem"],
    ["Which dataset", "dataset"],
    ["Ratio train data", "percTrainData"],
    ["Noise level", "noise"],
    ["Batch size", "batchSize"],
    ["# of hidden layers", "numHiddenLayers"],
    ["Seed control", "seedControl"],
    ["Weight editor", "weightEditor"],
    ["Bias editor", "biasEditor"],
    ["Double run button", "doubleRunButton"],
    ["Epoch", "epoch"],
];
class Player {
    constructor() {
        this.timerIndex = 0;
        this.isPlaying = false;
        this.callback = null;
    }
    playOrPause() {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.pause();
        }
        else {
            this.isPlaying = true;
            if (iter === 0) {
                simulationStarted();
            }
            this.play();
        }
    }
    onPlayPause(callback) {
        this.callback = callback;
    }
    play() {
        this.pause();
        this.isPlaying = true;
        if (this.callback) {
            this.callback(this.isPlaying);
        }
        this.start(this.timerIndex);
    }
    pause() {
        this.timerIndex++;
        this.isPlaying = false;
        if (this.callback) {
            this.callback(this.isPlaying);
        }
    }
    start(localTimerIndex) {
        d3.timer(() => {
            if (localTimerIndex < this.timerIndex) {
                return true;
            }
            oneStep();
            if (exoId === 7) {
                const actName = state_1.getKeyFromValue(state_1.activations, state.activation);
                if (actName && usedActivationsExo7.indexOf(actName) === -1) {
                    usedActivationsExo7.push(actName);
                }
            }
            return false;
        }, 0);
    }
}
let usedActivationsExo7 = [];
function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✨' : '⚠️';
    toast.innerHTML = `<span class="toast-icon">${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}
let state = state_1.State.deserializeState();
if (exoId > 0 && exoConfig) {
    exoConfig.hiddenControls.forEach((id) => {
        state.setHideProperty(id, true);
    });
    for (const key in exoConfig.forcedState) {
        if (exoConfig.forcedState.hasOwnProperty(key)) {
            state[key] = exoConfig.forcedState[key];
        }
    }
    const urlActivation = params.get("activation");
    if (urlActivation && state_1.activations[urlActivation]) {
        state.activation = state_1.activations[urlActivation];
    }
    state.numHiddenLayers = state.networkShape.length;
}
state.getHiddenProps().forEach(prop => {
    if (prop in INPUTS) {
        delete INPUTS[prop];
    }
});
let boundary = {};
let selectedNodeId = null;
let xDomain = [-6, 6];
let heatMap = new heatmap_1.HeatMap(300, DENSITY, xDomain, xDomain, d3.select("#heatmap"), { showAxes: true });
let linkWidthScale = d3.scale.linear()
    .domain([0, 5])
    .range([1, 10])
    .clamp(true);
let colorScale = d3.scale.linear()
    .domain([-1, 0, 1])
    .range(["#f59322", "#e8eaeb", "#0877bd"])
    .clamp(true);
let iter = 0;
let trainData = [];
let testData = [];
let network = null;
let lossTrain = 0;
let lossTest = 0;
let player = new Player();
let lineChart = new linechart_1.AppendingLineChart(d3.select("#linechart"), ["#777", "black"]);
let snapshotHeatMap = null;
let snapshotBoundary = null;
let snapshotLossTrainVal = null;
let selectedLinkForSlider = null;
let selectedNodeForBiasSlider = null;
let weightSlider = d3.select("#weight-slider");
let weightValue = d3.select("#weight-value");
let selectedLinkLabel = d3.select("#selected-link-label");
let biasSlider = d3.select("#bias-slider");
let biasValue = d3.select("#bias-value");
let selectedNodeLabel = d3.select("#selected-node-label");
let biasModifiedInExo4 = false;
let weightModifiedInExo4 = false;
let hasTrainedInExo4 = false;
let boundaryHistory = [];
function getBoundaryLinePoints(w1, w2, b) {
    let points = [];
    if (Math.abs(w2) > 1e-5) {
        let x2 = (6 * w1 - b) / w2;
        if (x2 >= -6 && x2 <= 6)
            points.push([-6, x2]);
    }
    if (Math.abs(w2) > 1e-5) {
        let x2 = (-6 * w1 - b) / w2;
        if (x2 >= -6 && x2 <= 6)
            points.push([6, x2]);
    }
    if (Math.abs(w1) > 1e-5) {
        let x1 = (6 * w2 - b) / w1;
        if (x1 >= -6 && x1 <= 6) {
            if (!points.some(p => Math.abs(p[0] - x1) < 1e-4 && Math.abs(p[1] - (-6)) < 1e-4)) {
                points.push([x1, -6]);
            }
        }
    }
    if (Math.abs(w1) > 1e-5) {
        let x1 = (-6 * w2 - b) / w1;
        if (x1 >= -6 && x1 <= 6) {
            if (!points.some(p => Math.abs(p[0] - x1) < 1e-4 && Math.abs(p[1] - 6) < 1e-4)) {
                points.push([x1, 6]);
            }
        }
    }
    return points;
}
let compareUsedInExo8 = false;
let postSnapshotRunInExo8 = false;
let runsCountExo11 = 0;
let divergenceObservedExo11 = false;
let divergenceObservedExo12 = false;
let trainedLinearDatasetsExo3 = {};
function isQuadraticUnlockedExo3() {
    if (exoId !== 3)
        return true;
    const keys = ["circle", "xor", "gauss", "spiral"];
    return keys.every(k => trainedLinearDatasetsExo3[k] === true);
}
function updateQuadraticFeaturesExo3() {
    const locked = !isQuadraticUnlockedExo3();
    const opacity = locked ? "0.2" : "1.0";
    const cursor = locked ? "not-allowed" : "pointer";
    d3.select("#canvas-xSquared").style("opacity", opacity).style("cursor", cursor);
    d3.select("#canvas-ySquared").style("opacity", opacity).style("cursor", cursor);
    d3.select("#nodexSquared").style("opacity", opacity);
    d3.select("#nodeySquared").style("opacity", opacity);
    const msgBoxLinear = d3.select("#msg-box-linear");
    const msgBoxQuadratic = d3.select("#msg-box-quadratic");
    if (locked) {
        if (msgBoxLinear.size() > 0) {
            const keys = ["circle", "xor", "gauss", "spiral"];
            const count = keys.filter(k => trainedLinearDatasetsExo3[k]).length;
            msgBoxLinear.style("display", "block");
            msgBoxLinear.select("#msg-box-linear-count").text(count);
        }
        msgBoxQuadratic.style("display", "none");
    }
    else {
        msgBoxLinear.style("display", "none");
        msgBoxQuadratic.style("display", "block");
    }
}
function initExo3Boxes() {
    if (exoId !== 3)
        return;
    const datasetDiv = d3.select(".ui-dataset");
    datasetDiv.selectAll("#msg-box-linear").remove();
    const msgBoxLinear = datasetDiv.append("div")
        .attr("id", "msg-box-linear")
        .attr("class", "exo3-msg-box")
        .style({
        "background-color": "#004676",
        "border": "1px solid #004676",
        "border-radius": "8px",
        "padding": "12px",
        "margin-top": "15px",
        "font-size": "13px",
        "color": "#fff",
        "line-height": "1.4"
    });
    msgBoxLinear.html(`
    <strong>💡 Step 1:</strong> Train the model on each dataset (X and Y) to observe its limits.<br>
    <span style="font-size: 12px; color: #94a3b8;">Progress: <span id="msg-box-linear-count" style="font-weight: bold; color: #FF034D;">0</span> / 4 datasets trained.</span>
  `);
    const networkDiv = d3.select("#network");
    networkDiv.selectAll("#msg-box-quadratic").remove();
    const msgBoxQuadratic = networkDiv.insert("div", "#hovercard")
        .attr("id", "msg-box-quadratic")
        .attr("class", "exo3-msg-box")
        .style({
        "background-color": "#004676",
        "border": "1px solid #004676",
        "border-radius": "8px",
        "padding": "12px",
        "margin-top": "15px",
        "font-size": "13px",
        "color": "#fff",
        "line-height": "1.4",
        "position": "relative",
        "display": "none"
    });
    msgBoxQuadratic.html(`
    <strong>🎉 Step 2:</strong> Now, activate the <strong>X1²</strong> and <strong>X2²</strong> features and train again to successfully classify!
  `);
    updateQuadraticFeaturesExo3();
}
function makeGUI() {
    weightSlider.on("input", function () {
        if (!selectedLinkForSlider)
            return;
        let newWeight = +this.value;
        selectedLinkForSlider.weight = newWeight;
        weightValue.text(newWeight.toFixed(2));
        if (exoId === 4) {
            weightModifiedInExo4 = true;
        }
        lossTrain = getLoss(network, trainData);
        lossTest = getLoss(network, testData);
        updateUI();
    });
    biasSlider.on("input", function () {
        if (!selectedNodeForBiasSlider)
            return;
        let newBias = +this.value;
        selectedNodeForBiasSlider.bias = newBias;
        biasValue.text(newBias.toFixed(2));
        if (exoId === 4) {
            biasModifiedInExo4 = true;
        }
        lossTrain = getLoss(network, trainData);
        lossTest = getLoss(network, testData);
        updateUI();
    });
    const seedInput = d3.select("#seed-input");
    const regenSeedBtn = d3.select("#regenerate-seed");
    const seedStatus = d3.select("#seed-status");
    seedInput.property("value", state.seed);
    seedInput.on("input", function () {
        state.seed = this.value;
        state.serialize();
        Math.seedrandom(state.seed);
        seedStatus.style("display", "inline");
        setTimeout(() => seedStatus.style("display", "none"), 1000);
        reset();
    });
    regenSeedBtn.on("click", () => {
        state.seed = Math.random().toFixed(5);
        seedInput.property("value", state.seed);
        state.serialize();
        Math.seedrandom(state.seed);
        regenSeedBtn.select("i").style("transition", "transform 0.5s ease-in-out")
            .style("transform", "rotate(360deg)");
        setTimeout(() => regenSeedBtn.select("i").style("transform", "rotate(0deg)"), 500);
        reset();
    });
    if (exoId > 0 && exoId !== 9 && exoId !== 10 && exoId !== 11 && exoId !== 12 && exoId !== 13 && exoId !== 14 && exoId !== 15 && exoId !== 16 && exoId !== 17) {
        state.learningRate = 0.03;
        state.regularization = null;
        state.percTrainData = 50;
        state.noise = 0;
        state.batchSize = 10;
    }
    if (exoId > 0 || (exoId == 0 && state.tutorial != null)) {
        const overlay = d3.select("#common-exo-popup-overlay");
        overlay.style("display", "flex");
        d3.select("#common-exo-next-btn").on("click", () => {
            overlay.style("display", "none");
        });
    }
    d3.select("#reset-button").on("click", () => {
        reset();
        userHasInteracted();
        d3.select("#play-pause-button");
    });
    d3.select("#play-pause-button").on("click", function () {
        userHasInteracted();
        player.playOrPause();
    });
    player.onPlayPause(isPlaying => {
        d3.select("#play-pause-button").classed("playing", isPlaying);
        d3.select("#validate-button").property("disabled", isPlaying);
    });
    d3.select("#next-step-button").on("click", () => {
        player.pause();
        userHasInteracted();
        if (iter === 0) {
            simulationStarted();
        }
        oneStep();
    });
    d3.select("#data-regen-button").on("click", () => {
        generateData();
        parametersChanged = true;
    });
    let dataThumbnails = d3.selectAll("canvas[data-dataset]");
    dataThumbnails.on("click", function () {
        let newDataset = state_1.datasets[this.dataset.dataset];
        if (newDataset === state.dataset) {
            return;
        }
        state.dataset = newDataset;
        dataThumbnails.classed("selected", false);
        d3.select(this).classed("selected", true);
        generateData();
        parametersChanged = true;
        reset();
    });
    let datasetKey = state_1.getKeyFromValue(state_1.datasets, state.dataset);
    d3.select(`canvas[data-dataset=${datasetKey}]`)
        .classed("selected", true);
    let regDataThumbnails = d3.selectAll("canvas[data-regDataset]");
    regDataThumbnails.on("click", function () {
        let newDataset = state_1.regDatasets[this.dataset.regdataset];
        if (newDataset === state.regDataset) {
            return;
        }
        state.regDataset = newDataset;
        regDataThumbnails.classed("selected", false);
        d3.select(this).classed("selected", true);
        generateData();
        parametersChanged = true;
        reset();
    });
    let regDatasetKey = state_1.getKeyFromValue(state_1.regDatasets, state.regDataset);
    d3.select(`canvas[data-regDataset=${regDatasetKey}]`)
        .classed("selected", true);
    d3.select("#add-layers").on("click", () => {
        if (state.numHiddenLayers >= 6) {
            return;
        }
        state.networkShape[state.numHiddenLayers] = 2;
        state.numHiddenLayers++;
        parametersChanged = true;
        reset();
    });
    d3.select("#remove-layers").on("click", () => {
        if (state.numHiddenLayers <= 0) {
            return;
        }
        state.numHiddenLayers--;
        state.networkShape.splice(state.numHiddenLayers);
        parametersChanged = true;
        reset();
    });
    let showTestData = d3.select("#show-test-data").on("change", function () {
        state.showTestData = this.checked;
        state.serialize();
        userHasInteracted();
        heatMap.updateTestPoints(state.showTestData ? testData : []);
    });
    showTestData.property("checked", state.showTestData);
    let discretize = d3.select("#discretize").on("change", function () {
        state.discretize = this.checked;
        state.serialize();
        userHasInteracted();
        updateUI();
        if (snapshotHeatMap && snapshotBoundary) {
            snapshotHeatMap.updateBackground(snapshotBoundary, state.discretize);
        }
    });
    discretize.property("checked", state.discretize);
    let percTrain = d3.select("#percTrainData").on("input", function () {
        state.percTrainData = this.value;
        d3.select("label[for='percTrainData'] .value").text(this.value);
        generateData();
        parametersChanged = true;
        reset();
    });
    percTrain.property("value", state.percTrainData);
    d3.select("label[for='percTrainData'] .value").text(state.percTrainData);
    let noise = d3.select("#noise").on("input", function () {
        state.noise = this.value;
        d3.select("label[for='noise'] .value").text(this.value);
        generateData();
        parametersChanged = true;
        reset();
    });
    let currentMax = parseInt(noise.property("max"));
    if (state.noise > currentMax) {
        if (state.noise <= 80) {
            noise.property("max", state.noise);
        }
        else {
            state.noise = 50;
        }
    }
    else if (state.noise < 0) {
        state.noise = 0;
    }
    noise.property("value", state.noise);
    d3.select("label[for='noise'] .value").text(state.noise);
    let batchSize = d3.select("#batchSize").on("input", function () {
        state.batchSize = this.value;
        d3.select("label[for='batchSize'] .value").text(this.value);
        parametersChanged = true;
        reset();
    });
    batchSize.property("value", state.batchSize);
    d3.select("label[for='batchSize'] .value").text(state.batchSize);
    let activationDropdown = d3.select("#activations").on("change", function () {
        state.activation = state_1.activations[this.value];
        parametersChanged = true;
        reset();
    });
    activationDropdown.property("value", state_1.getKeyFromValue(state_1.activations, state.activation));
    let learningRate = d3.select("#learningRate").on("change", function () {
        state.learningRate = +this.value;
        state.serialize();
        userHasInteracted();
        parametersChanged = true;
        if (window.parent) {
            window.parent.postMessage({ type: 'LEARNING_RATE_CHANGED', value: state.learningRate }, '*');
        }
    });
    learningRate.property("value", state.learningRate);
    let regularDropdown = d3.select("#regularizations").on("change", function () {
        state.regularization = state_1.regularizations[this.value];
        parametersChanged = true;
        reset();
    });
    regularDropdown.property("value", state_1.getKeyFromValue(state_1.regularizations, state.regularization));
    let regularRate = d3.select("#regularRate").on("change", function () {
        state.regularizationRate = +this.value;
        parametersChanged = true;
        reset();
    });
    regularRate.property("value", state.regularizationRate);
    let problem = d3.select("#problem").on("change", function () {
        state.problem = state_1.problems[this.value];
        generateData();
        drawDatasetThumbnails();
        parametersChanged = true;
        reset();
    });
    problem.property("value", state_1.getKeyFromValue(state_1.problems, state.problem));
    let x = d3.scale.linear().domain([-1, 1]).range([0, 144]);
    let xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues([-1, 0, 1])
        .tickFormat(d3.format("d"));
    d3.select("#colormap g.core").append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,10)")
        .call(xAxis);
    window.addEventListener("resize", () => {
        let newWidth = document.querySelector("#main-part")
            .getBoundingClientRect().width;
        if (newWidth !== mainWidth) {
            mainWidth = newWidth;
            drawNetwork(network);
            updateUI(true);
        }
    });
    if (state.hideText) {
        d3.select("#article-text").style("display", "none");
        d3.select("div.more").style("display", "none");
        d3.select("header").style("display", "none");
    }
    if (exoId === 1) {
        exo1_1.initExo1Popups();
    }
    if (exoId === 2) {
        exo2_1.initExo2Popups();
    }
    if (exoId === 3) {
        exo3_1.initExo3Popups();
    }
    if (exoId === 4) {
        exo4_1.initExo4Popups();
    }
    if (exoId === 5) {
        exo5_1.initExo5Popups();
    }
    if (exoId === 6) {
        exo6_1.initExo6Popups();
    }
    if (exoId === 7) {
        exo7_1.initExo7Popups();
    }
    if (exoId === 8) {
        exo8_1.initExo8Popups();
    }
    if (exoId === 9) {
        exo9_1.initExo9Popups();
    }
    if (exoId === 10) {
        exo10_1.initExo10Popups();
    }
    if (exoId === 11) {
        exo11_1.initExo11Popups();
    }
    if (exoId === 12) {
        exo12_1.initExo12Popups();
    }
    if (exoId === 13) {
        exo13_1.initExo13Popups();
    }
    if (exoId === 14) {
        exo14_1.initExo14Popups();
    }
    if (exoId === 15) {
        exo15_1.initExo15Popups();
    }
    if (exoId === 16) {
        exo16_1.initExo16Popups();
    }
    if (exoId === 17) {
        exo17_1.initExo17Popups();
    }
    d3.select("#validate-button").on("click", () => {
        let success = false;
        let message = "";
        if (exoId === 1 || exoId === 2) {
            if (lossTrain < 0.001) {
                success = true;
            }
            else {
                message = "Please reread the instructions! 😤";
            }
        }
        else if (exoId === 3) {
            const isCircle = state_1.getKeyFromValue(state_1.datasets, state.dataset) === "circle";
            const hasCorrectFeatures = state.x && state.y && state.xSquared && state.ySquared &&
                !state.xTimesY && !state.sinX && !state.sinY;
            const noHidden = state.numHiddenLayers === 0;
            if (!isQuadraticUnlockedExo3()) {
                message = "You must first train the model on all 4 datasets in linear mode.";
            }
            else if (!isCircle) {
                message = "Please select the Circle dataset.";
            }
            else if (!hasCorrectFeatures) {
                message = "Activate only the X, Y, X² and Y² features.";
            }
            else if (!noHidden) {
                message = "Please configure the network with no hidden layers (0 hidden layers).";
            }
            else if (iter < 1000) {
                message = "Training must reach at least 1000 epochs.";
            }
            else if (lossTrain >= 0.005) {
                message = "The training loss must be less than 0.005.";
            }
            else {
                success = true;
            }
        }
        else if (exoId === 7) {
            if (usedActivationsExo7.length >= 4) {
                success = true;
            }
            else {
                const testees = usedActivationsExo7.join(", ");
                message = "Please reread the instructions! 😤";
            }
        }
        else if (exoId === 4) {
            let firstHiddenNode = network[1][0];
            if (!hasTrainedInExo4 || lossTrain >= 0.01) {
                message = "Please reread the instructions! 😤";
            }
            else if (!biasModifiedInExo4) {
                message = "Modify the bias neuron.";
            }
            else if (Math.abs(firstHiddenNode.bias) <= 0.5) {
                message = "The bias must be greater than 0.5 in absolute value.";
            }
            else {
                success = true;
            }
        }
        else if (exoId === 5) {
            if (lossTrain < 0.005) {
                success = true;
            }
            else {
                message = "Please reread the instructions! 😤";
            }
        }
        else if (exoId === 6) {
            if (lossTrain < 0.015) {
                success = true;
            }
            else {
                message = "Please reread the instructions! 😤";
            }
        }
        else if (exoId === 9 || exoId === 10) {
            if (!snapshotBoundary) {
                message = "Click on double run to compare";
            }
            else {
                const diff = Math.abs(lossTrain - snapshotLossTrainVal);
                if (diff < 0.01) {
                    success = true;
                }
                else {
                    message = `Losses must be identical or very close (diff < 0.01)}`;
                }
            }
        }
        else if (exoId === 8) {
            if (!compareUsedInExo8) {
                message = "Please reread the instructions! 😤";
            }
            else if (!postSnapshotRunInExo8) {
                message = "Now run again";
            }
            else {
                success = true;
            }
        }
        else if (exoId === 11) {
            if (runsCountExo11 < 2) {
                message = "Multiple runs must be done.";
            }
            else if (!divergenceObservedExo11) {
                message = "At least one case of learning rate divergence must be observed.";
            }
            else {
                success = true;
            }
        }
        else if (exoId === 12) {
            if (divergenceObservedExo12) {
                success = true;
            }
            else {
                message = "The training and test loss curves must diverge by at least 0.005.";
            }
        }
        else if (exoId === 13 || exoId === 14 || exoId === 15 || exoId === 16) {
            success = true;
        }
        else {
            if (lossTrain < 0.1) {
                success = true;
            }
            else {
                message = "Exercise not validated";
            }
        }
        const msgDiv = d3.select("#validation-message");
        msgDiv.classed("show", false);
        setTimeout(() => {
            if (success) {
                showToast("✨ Congratulations ! Exercise completed.", "success");
                msgDiv.text("Congratulation !")
                    .classed("success", true)
                    .classed("error", false)
                    .classed("show", true);
                if (window.parent) {
                    window.parent.postMessage({ type: 'EXO_SUCCESS', exoId: exoId }, '*');
                }
            }
            else {
                showToast(message || "Exercise not validated", "error");
                msgDiv.text("Echec")
                    .classed("success", false)
                    .classed("error", true)
                    .classed("show", true);
            }
        }, 50);
    });
    d3.select("#snapshot-button").on("click", () => {
        d3.select("#compare-area").style("display", "block");
        if (exoId === 8) {
            compareUsedInExo8 = true;
        }
        const outputId = selectedNodeId != null ?
            selectedNodeId : nn.getOutputNode(network).id;
        const currentBoundary = boundary[outputId];
        snapshotBoundary = currentBoundary.map(column => [...column]);
        snapshotLossTrainVal = lossTrain;
        d3.select("#snapshot-iter").text(iter);
        d3.select("#snapshot-loss-train").text(lossTrain.toFixed(3));
        d3.select("#snapshot-loss-test").text(lossTest.toFixed(3));
        if (!snapshotHeatMap) {
            snapshotHeatMap = new heatmap_1.HeatMap(250, DENSITY, xDomain, xDomain, d3.select("#snapshot-heatmap"), { noSvg: false });
        }
        snapshotHeatMap.updateBackground(snapshotBoundary, state.discretize);
        snapshotHeatMap.updatePoints(trainData);
        snapshotHeatMap.updateTestPoints(state.showTestData ? testData : []);
        window.scrollTo({
            top: document.getElementById("compare-area").offsetTop - 20,
            behavior: "smooth"
        });
    });
    d3.select("#clear-snapshot").on("click", () => {
        d3.select("#compare-area").style("display", "none");
        snapshotBoundary = null;
    });
    hideControls();
}
function updateBiasesUI(network) {
    nn.forEachNode(network, true, node => {
        d3.select(`rect#bias-${node.id}`).style("fill", colorScale(node.bias));
    });
}
function updateWeightsUI(network, container) {
    for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
        let currentLayer = network[layerIdx];
        for (let i = 0; i < currentLayer.length; i++) {
            let node = currentLayer[i];
            for (let j = 0; j < node.inputLinks.length; j++) {
                let link = node.inputLinks[j];
                container.select(`#link${link.source.id}-${link.dest.id}`)
                    .style({
                    "stroke-dashoffset": -iter / 3,
                    "stroke-width": linkWidthScale(Math.abs(link.weight)),
                    "stroke": colorScale(link.weight)
                })
                    .datum(link);
            }
        }
    }
}
function drawNode(cx, cy, nodeId, isInput, container, node) {
    let x = cx - RECT_SIZE / 2;
    let y = cy - RECT_SIZE / 2;
    let nodeGroup = container.append("g")
        .attr({
        "class": "node",
        "id": `node${nodeId}`,
        "transform": `translate(${x},${y})`
    });
    nodeGroup.append("rect")
        .attr({
        x: 0,
        y: 0,
        width: RECT_SIZE,
        height: RECT_SIZE,
    });
    let activeOrNotClass = state[nodeId] ? "active" : "inactive";
    if (isInput) {
        let label = INPUTS[nodeId].label != null ?
            INPUTS[nodeId].label : nodeId;
        let text = nodeGroup.append("text").attr({
            class: "main-label",
            x: -10,
            y: RECT_SIZE / 2, "text-anchor": "end"
        });
        if (/[_^]/.test(label)) {
            let myRe = /(.*?)([_^])(.)/g;
            let myArray;
            let lastIndex;
            while ((myArray = myRe.exec(label)) != null) {
                lastIndex = myRe.lastIndex;
                let prefix = myArray[1];
                let sep = myArray[2];
                let suffix = myArray[3];
                if (prefix) {
                    text.append("tspan").text(prefix);
                }
                text.append("tspan")
                    .attr("baseline-shift", sep === "_" ? "sub" : "super")
                    .style("font-size", "9px")
                    .text(suffix);
            }
            if (label.substring(lastIndex)) {
                text.append("tspan").text(label.substring(lastIndex));
            }
        }
        else {
            text.append("tspan").text(label);
        }
        nodeGroup.classed(activeOrNotClass, true);
    }
    if (!isInput) {
        if (exoId === 4) {
            let sliderX = cx - 38;
            let sliderY = cy + 85;
            let biasGroup = container.append("g")
                .attr("class", "custom-weight-editor-group")
                .attr("id", "custom-bias-editor-group");
            let track = biasGroup.append("line")
                .attr({
                x1: sliderX,
                y1: sliderY - 30,
                x2: sliderX,
                y2: sliderY + 30,
                stroke: "#1e293b",
                "stroke-width": 4,
                "stroke-linecap": "round",
                cursor: "pointer"
            });
            let handleColor = "#8b5cf6";
            let badgeColor = "#5b21b6";
            let badge = biasGroup.append("g")
                .attr("transform", `translate(${sliderX - 60}, ${sliderY - 18})`);
            badge.append("rect")
                .attr({
                x: 0,
                y: 0,
                width: 48,
                height: 36,
                rx: 6,
                ry: 6,
                fill: badgeColor,
                stroke: "rgba(255,255,255,0.1)",
                "stroke-width": 1
            });
            let badgeText = badge.append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .style("font-family", "'Inter', sans-serif");
            badgeText.append("tspan")
                .attr({ x: 24, y: 14 })
                .style({ "font-size": "8px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": "0.5px", "opacity": "0.8" })
                .text("Biais");
            let valSpan = badgeText.append("tspan")
                .attr({ x: 24, y: 28 })
                .style({ "font-size": "12px", "font-weight": "800" })
                .text(node.bias.toFixed(2).replace(".", ","));
            let initialY = sliderY - (node.bias / 5.0) * 30;
            let handle = biasGroup.append("rect")
                .attr({
                x: sliderX - 8,
                y: initialY - 3,
                width: 16,
                height: 6,
                rx: 2,
                ry: 2,
                fill: handleColor,
                cursor: "ns-resize",
                stroke: "#ffffff",
                "stroke-width": 1
            });
            let drag = d3.behavior.drag()
                .on("drag", function () {
                let mouseContainer = d3.mouse(container.node());
                let mouseY = mouseContainer[1];
                let newY = Math.max(sliderY - 30, Math.min(sliderY + 30, mouseY));
                let bias = 5.0 - 10.0 * (newY - (sliderY - 30)) / 60.0;
                bias = Math.round(bias * 100) / 100;
                if (node.bias !== bias) {
                    let firstHiddenNode = network[1][0];
                    let w1 = firstHiddenNode.inputLinks[0].weight;
                    let w2 = firstHiddenNode.inputLinks[1].weight;
                    let linePoints = getBoundaryLinePoints(w1, w2, node.bias);
                    if (linePoints.length >= 2) {
                        let x1 = heatMap.xScale(linePoints[0][0]);
                        let y1 = heatMap.yScale(linePoints[0][1]);
                        let x2 = heatMap.xScale(linePoints[1][0]);
                        let y2 = heatMap.yScale(linePoints[1][1]);
                        if (boundaryHistory.length === 0 ||
                            Math.abs(boundaryHistory[boundaryHistory.length - 1].biasValue - node.bias) > 0.05) {
                            boundaryHistory.push({ x1, y1, x2, y2, biasValue: node.bias });
                            if (boundaryHistory.length > 5) {
                                boundaryHistory.shift();
                            }
                        }
                    }
                    node.bias = bias;
                    handle.attr("y", (sliderY - (bias / 5.0) * 30) - 3);
                    valSpan.text(bias.toFixed(2).replace(".", ","));
                    biasSlider.property("value", bias);
                    biasValue.text(bias.toFixed(2));
                    biasModifiedInExo4 = true;
                    lossTrain = getLoss(network, trainData);
                    lossTest = getLoss(network, testData);
                    updateUI();
                }
            });
            handle.call(drag);
            track.call(drag);
        }
        else {
            nodeGroup.append("rect")
                .attr({
                id: `bias-${nodeId}`,
                x: -BIAS_SIZE - 4,
                y: RECT_SIZE + 2,
                width: BIAS_SIZE,
                height: BIAS_SIZE,
            }).on("mouseenter", function () {
                updateHoverCard(HoverType.BIAS, node, d3.mouse(container.node()));
            }).on("mouseleave", function () {
                updateHoverCard(null);
            }).on("click", function () {
                selectedNodeForBiasSlider = node;
                selectedNodeLabel.text("Neurone : " + node.id);
                biasSlider.property("value", node.bias);
                biasValue.text((+node.bias).toFixed(2));
                console.log("biais séléctionné:", node.id, "bias = ", node.bias);
            });
        }
    }
    let div = d3.select("#network").insert("div", ":first-child")
        .attr({
        "id": `canvas-${nodeId}`,
        "class": "canvas"
    })
        .style({
        position: "absolute",
        left: `${x + 3}px`,
        top: `${y + 3}px`
    })
        .on("mouseenter", function () {
        selectedNodeId = nodeId;
        div.classed("hovered", true);
        nodeGroup.classed("hovered", true);
        updateDecisionBoundary(network, false);
        heatMap.updateBackground(boundary[nodeId], state.discretize);
    })
        .on("mouseleave", function () {
        selectedNodeId = null;
        div.classed("hovered", false);
        nodeGroup.classed("hovered", false);
        updateDecisionBoundary(network, false);
        heatMap.updateBackground(boundary[nn.getOutputNode(network).id], state.discretize);
    });
    if (isInput) {
        div.on("click", function () {
            if (exoId === 3 && (nodeId === "xSquared" || nodeId === "ySquared") && !isQuadraticUnlockedExo3()) {
                showToast("Entraînez d'abord le modèle sur chacun des 4 jeux de données en mode linéaire pour observer leurs limites.", "error");
                return;
            }
            state[nodeId] = !state[nodeId];
            parametersChanged = true;
            reset();
        });
        if (exoId === 3 && (nodeId === "xSquared" || nodeId === "ySquared") && !isQuadraticUnlockedExo3()) {
            div.style("cursor", "not-allowed");
            div.style("opacity", "0.2");
            nodeGroup.style("opacity", "0.2");
        }
        else {
            div.style("cursor", "pointer");
            div.style("opacity", null);
            nodeGroup.style("opacity", null);
        }
    }
    if (isInput) {
        div.classed(activeOrNotClass, true);
    }
    let nodeHeatMap = new heatmap_1.HeatMap(RECT_SIZE, DENSITY / 10, xDomain, xDomain, div, { noSvg: true });
    div.datum({ heatmap: nodeHeatMap, id: nodeId });
}
function drawNetwork(network) {
    let svg = d3.select("#svg");
    svg.select("g.core").remove();
    d3.select("#network").selectAll("div.canvas").remove();
    d3.select("#network").selectAll("div.plus-minus-neurons").remove();
    let padding = 3;
    let co = d3.select(".column.output").node();
    let cf = d3.select(".column.features").node();
    let width = co.offsetLeft - cf.offsetLeft;
    svg.attr("width", width);
    let node2coord = {};
    let container = svg.append("g")
        .classed("core", true)
        .attr("transform", `translate(${padding},${padding})`);
    let numLayers = network.length;
    let featureWidth = 118;
    let layerScale = d3.scale.ordinal()
        .domain(d3.range(1, numLayers - 1))
        .rangePoints([featureWidth, width - RECT_SIZE], 0.7);
    let spacing = exoId === 1 ? 100 : 25;
    let nodeIndexScale = (nodeIndex) => nodeIndex * (RECT_SIZE + spacing);
    let calloutThumb = d3.select(".callout.thumbnail").style("display", "none");
    let calloutWeights = d3.select(".callout.weights").style("display", "none");
    let idWithCallout = null;
    let targetIdWithCallout = null;
    let cx = RECT_SIZE / 2 + 50;
    let nodeIds = Object.keys(INPUTS);
    let maxY = nodeIndexScale(nodeIds.length);
    nodeIds.forEach((nodeId, i) => {
        let cy = nodeIndexScale(i) + RECT_SIZE / 2;
        node2coord[nodeId] = { cx, cy };
        drawNode(cx, cy, nodeId, true, container);
    });
    for (let layerIdx = 1; layerIdx < numLayers - 1; layerIdx++) {
        let numNodes = network[layerIdx].length;
        let cx = layerScale(layerIdx) + RECT_SIZE / 2;
        maxY = Math.max(maxY, nodeIndexScale(numNodes));
        addPlusMinusControl(layerScale(layerIdx), layerIdx);
        for (let i = 0; i < numNodes; i++) {
            let node = network[layerIdx][i];
            let cy = nodeIndexScale(i) + RECT_SIZE / 2;
            node2coord[node.id] = { cx, cy };
            drawNode(cx, cy, node.id, false, container, node);
            let numNodes = network[layerIdx].length;
            let nextNumNodes = network[layerIdx + 1].length;
            if (idWithCallout == null &&
                i === numNodes - 1 &&
                nextNumNodes <= numNodes) {
                calloutThumb.style({
                    display: null,
                    top: `${20 + 3 + cy}px`,
                    left: `${cx}px`
                });
                idWithCallout = node.id;
            }
            for (let j = 0; j < node.inputLinks.length; j++) {
                let link = node.inputLinks[j];
                let path = drawLink(link, node2coord, network, container, j === 0, j, node.inputLinks.length).node();
                let prevLayer = network[layerIdx - 1];
                let lastNodePrevLayer = prevLayer[prevLayer.length - 1];
                if (targetIdWithCallout == null &&
                    i === numNodes - 1 &&
                    link.source.id === lastNodePrevLayer.id &&
                    (link.source.id !== idWithCallout || numLayers <= 5) &&
                    link.dest.id !== idWithCallout &&
                    prevLayer.length >= numNodes) {
                    let midPoint = path.getPointAtLength(path.getTotalLength() * 0.7);
                    calloutWeights.style({
                        display: null,
                        top: `${midPoint.y + 5}px`,
                        left: `${midPoint.x + 3}px`
                    });
                    targetIdWithCallout = link.dest.id;
                }
            }
        }
    }
    cx = width + RECT_SIZE / 2;
    let node = network[numLayers - 1][0];
    let cy = (exoId === 1) ? (nodeIndexScale(nodeIds.length - 1) + RECT_SIZE) / 2 : (nodeIndexScale(0) + RECT_SIZE / 2);
    node2coord[node.id] = { cx, cy };
    for (let i = 0; i < node.inputLinks.length; i++) {
        let link = node.inputLinks[i];
        drawLink(link, node2coord, network, container, i === 0, i, node.inputLinks.length);
    }
    if (exoId === 4) {
        maxY = Math.max(maxY, 160);
    }
    svg.attr("height", maxY);
    let height = Math.max(getRelativeHeight(calloutThumb), getRelativeHeight(calloutWeights), getRelativeHeight(d3.select("#network")));
    d3.select(".column.features").style("height", height + "px");
}
function getRelativeHeight(selection) {
    let node = selection.node();
    return node.offsetHeight + node.offsetTop;
}
function addPlusMinusControl(x, layerIdx) {
    let div = d3.select("#network").append("div")
        .classed("plus-minus-neurons", true)
        .style("left", `${x - 10}px`);
    let i = layerIdx - 1;
    let firstRow = div.append("div").attr("class", `ui-numNodes${layerIdx}`);
    firstRow.append("button")
        .attr("class", "mdl-button mdl-js-button mdl-button--icon")
        .on("click", () => {
        let numNeurons = state.networkShape[i];
        if (numNeurons >= 8) {
            return;
        }
        state.networkShape[i]++;
        parametersChanged = true;
        reset();
    })
        .append("i")
        .attr("class", "material-icons")
        .text("add");
    firstRow.append("button")
        .attr("class", "mdl-button mdl-js-button mdl-button--icon")
        .on("click", () => {
        let numNeurons = state.networkShape[i];
        if (numNeurons <= 1) {
            return;
        }
        state.networkShape[i]--;
        parametersChanged = true;
        reset();
    })
        .append("i")
        .attr("class", "material-icons")
        .text("remove");
    let suffix = state.networkShape[i] > 1 ? "s" : "";
    div.append("div").text(state.networkShape[i] + " neuron" + suffix);
}
function updateHoverCard(type, nodeOrLink, coordinates) {
    let hovercard = d3.select("#hovercard");
    if (type == null) {
        hovercard.style("display", "none");
        d3.select("#svg").on("click", null);
        return;
    }
    d3.select("#svg").on("click", () => {
        hovercard.select(".value").style("display", "none");
        let input = hovercard.select("input");
        input.style("display", null);
        input.on("input", function () {
            if (this.value != null && this.value !== "") {
                if (type === HoverType.WEIGHT) {
                    nodeOrLink.weight = +this.value;
                }
                else {
                    nodeOrLink.bias = +this.value;
                }
                updateUI();
            }
        });
    });
    let value = (type === HoverType.WEIGHT) ?
        nodeOrLink.weight :
        nodeOrLink.bias;
    let name = (type === HoverType.WEIGHT) ? "Weight" : "Bias";
    hovercard.style({
        "left": `${coordinates[0] + 20}px`,
        "top": `${coordinates[1]}px`,
        "display": "block"
    });
    hovercard.select(".type").text(name);
    hovercard.select(".value")
        .style("display", null)
        .text(value.toPrecision(2));
    hovercard.select("input")
        .property("value", value.toPrecision(2))
        .style("display", "none");
}
function drawLink(input, node2coord, network, container, isFirst, index, length) {
    let line = container.insert("path", ":first-child");
    let source = node2coord[input.source.id];
    let dest = node2coord[input.dest.id];
    let datum = {
        source: {
            y: source.cx + RECT_SIZE / 2 + 2,
            x: source.cy
        },
        target: {
            y: dest.cx - RECT_SIZE / 2,
            x: dest.cy + ((index - (length - 1) / 2) / length) * 12
        }
    };
    let diagonal = d3.svg.diagonal().projection(d => [d.y, d.x]);
    line.attr({
        "marker-start": "url(#markerArrow)",
        class: "link",
        id: "link" + input.source.id + "-" + input.dest.id,
        d: diagonal(datum, 0)
    });
    container.append("path")
        .attr("d", diagonal(datum, 0))
        .attr("class", "link-hover")
        .on("mouseenter", function () {
        updateHoverCard(HoverType.WEIGHT, input, d3.mouse(this));
    }).on("mouseleave", function () {
        updateHoverCard(null);
    }).on("click", function () {
        selectedLinkForSlider = input;
        selectedLinkLabel.text("Lien : " + input.source.id + " → " + input.dest.id);
        weightSlider.property("value", input.weight);
        weightValue.text((+input.weight).toFixed(2));
        console.log("lien séléctionné:", input.source.id, "->", input.dest.id, "weight = ", input.weight);
    });
    if (exoId === 1) {
        let pathEl = line.node();
        let totalLength = pathEl.getTotalLength();
        let point = pathEl.getPointAtLength(totalLength * 0.35);
        let sliderX = point.x;
        let sliderY = point.y;
        let group = container.append("g")
            .attr("class", "custom-weight-editor-group")
            .attr("id", `custom-weight-editor-${input.source.id}`);
        let track = group.append("line")
            .attr({
            x1: sliderX,
            y1: sliderY - 30,
            x2: sliderX,
            y2: sliderY + 30,
            stroke: "#1e293b",
            "stroke-width": 4,
            "stroke-linecap": "round",
            cursor: "pointer"
        });
        let handleColor = input.source.id === "x" ? "#ef4444" : "#8b5cf6";
        let badgeColor = input.source.id === "x" ? "#b91c1c" : "#5b21b6";
        let initialY = sliderY - (input.weight / 5.0) * 30;
        let badge = group.append("g")
            .attr("transform", `translate(${sliderX - 60}, ${sliderY - 18})`);
        badge.append("rect")
            .attr({
            x: 0,
            y: 0,
            width: 48,
            height: 36,
            rx: 6,
            ry: 6,
            fill: badgeColor,
            stroke: "rgba(255,255,255,0.1)",
            "stroke-width": 1
        });
        let badgeText = badge.append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-family", "'Inter', sans-serif");
        badgeText.append("tspan")
            .attr({ x: 24, y: 14 })
            .style({ "font-size": "8px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": "0.5px", "opacity": "0.8" })
            .text("Weight");
        let valSpan = badgeText.append("tspan")
            .attr({ x: 24, y: 28 })
            .style({ "font-size": "12px", "font-weight": "800" })
            .text(input.weight.toFixed(1).replace(".", ","));
        let handle = group.append("rect")
            .attr({
            x: sliderX - 8,
            y: initialY - 3,
            width: 16,
            height: 6,
            rx: 2,
            ry: 2,
            fill: handleColor,
            cursor: "ns-resize",
            stroke: "#ffffff",
            "stroke-width": 1
        });
        let drag = d3.behavior.drag()
            .on("drag", function () {
            let mouseContainer = d3.mouse(container.node());
            let mouseY = mouseContainer[1];
            let newY = Math.max(sliderY - 30, Math.min(sliderY + 30, mouseY));
            let weight = 5.0 - 10.0 * (newY - (sliderY - 30)) / 60.0;
            weight = Math.round(weight * 10) / 10;
            input.weight = weight;
            handle.attr("y", (sliderY - (weight / 5.0) * 30) - 3);
            valSpan.text(weight.toFixed(1).replace(".", ","));
            if (selectedLinkForSlider === input) {
                weightSlider.property("value", weight);
                weightValue.text(weight.toFixed(2));
            }
            lossTrain = getLoss(network, trainData);
            lossTest = getLoss(network, testData);
            updateUI();
        });
        handle.call(drag);
        track.on("click", function () {
            let mouseContainer = d3.mouse(container.node());
            let mouseY = mouseContainer[1];
            let newY = Math.max(sliderY - 30, Math.min(sliderY + 30, mouseY));
            let weight = 5.0 - 10.0 * (newY - (sliderY - 30)) / 60.0;
            weight = Math.round(weight * 10) / 10;
            input.weight = weight;
            handle.attr("y", (sliderY - (weight / 5.0) * 30) - 3);
            valSpan.text(weight.toFixed(1).replace(".", ","));
            if (selectedLinkForSlider === input) {
                weightSlider.property("value", weight);
                weightValue.text(weight.toFixed(2));
            }
            lossTrain = getLoss(network, trainData);
            lossTest = getLoss(network, testData);
            updateUI();
        });
    }
    return line;
}
function updateDecisionBoundary(network, firstTime) {
    if (firstTime) {
        boundary = {};
        nn.forEachNode(network, true, node => {
            boundary[node.id] = new Array(DENSITY);
        });
        for (let nodeId in INPUTS) {
            boundary[nodeId] = new Array(DENSITY);
        }
    }
    let xScale = d3.scale.linear().domain([0, DENSITY - 1]).range(xDomain);
    let yScale = d3.scale.linear().domain([DENSITY - 1, 0]).range(xDomain);
    let i = 0, j = 0;
    for (i = 0; i < DENSITY; i++) {
        if (firstTime) {
            nn.forEachNode(network, true, node => {
                boundary[node.id][i] = new Array(DENSITY);
            });
            for (let nodeId in INPUTS) {
                boundary[nodeId][i] = new Array(DENSITY);
            }
        }
        for (j = 0; j < DENSITY; j++) {
            let x = xScale(i);
            let y = yScale(j);
            let input = constructInput(x, y);
            nn.forwardProp(network, input);
            nn.forEachNode(network, true, node => {
                boundary[node.id][i][j] = node.output;
            });
            if (firstTime) {
                for (let nodeId in INPUTS) {
                    boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y);
                }
            }
        }
    }
}
function getLoss(network, dataPoints) {
    let loss = 0;
    for (let i = 0; i < dataPoints.length; i++) {
        let dataPoint = dataPoints[i];
        let input = constructInput(dataPoint.x, dataPoint.y);
        let output = nn.forwardProp(network, input);
        loss += nn.Errors.SQUARE.error(output, dataPoint.label);
    }
    return loss / dataPoints.length;
}
function updateUI(firstStep = false) {
    updateWeightsUI(network, d3.select("g.core"));
    updateBiasesUI(network);
    updateDecisionBoundary(network, firstStep);
    let selectedId = selectedNodeId != null ?
        selectedNodeId : nn.getOutputNode(network).id;
    heatMap.updateBackground(boundary[selectedId], state.discretize);
    d3.select("#network").selectAll("div.canvas")
        .each(function (data) {
        data.heatmap.updateBackground(heatmap_1.reduceMatrix(boundary[data.id], 10), state.discretize);
    });
    function zeroPad(n) {
        let pad = "000000";
        return (pad + n).slice(-pad.length);
    }
    function addCommas(s) {
        return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    function humanReadable(n) {
        return n.toFixed(3);
    }
    d3.select("#loss-train").text(humanReadable(lossTrain));
    d3.select("#loss-test").text(humanReadable(lossTest));
    d3.select("#iter-number").text(addCommas(zeroPad(iter)));
    lineChart.addDataPoint([lossTrain, lossTest]);
    lineChart.setLineVisibility(1, !state.testLoss_hide);
    if (exoId === 4) {
        let svgG = d3.select("#heatmap svg g");
        let highlightGroup = svgG.select("g.boundary-highlight");
        if (highlightGroup.empty()) {
            highlightGroup = svgG.append("g").attr("class", "boundary-highlight");
        }
        else {
            highlightGroup.selectAll("*").remove();
        }
        boundaryHistory.forEach((histLine, index) => {
            let opacity = 0.05 + 0.15 * ((index + 1) / boundaryHistory.length);
            highlightGroup.append("line")
                .attr({
                x1: histLine.x1,
                y1: histLine.y1,
                x2: histLine.x2,
                y2: histLine.y2,
                stroke: "#FF034D",
                "stroke-width": 2,
                "stroke-dasharray": "4,4"
            })
                .style("opacity", opacity);
        });
        let firstHiddenNode = network[1][0];
        let w1 = firstHiddenNode.inputLinks[0].weight;
        let w2 = firstHiddenNode.inputLinks[1].weight;
        let b = firstHiddenNode.bias;
        let linePoints = getBoundaryLinePoints(w1, w2, b);
        if (linePoints.length >= 2) {
            let x1 = heatMap.xScale(linePoints[0][0]);
            let y1 = heatMap.yScale(linePoints[0][1]);
            let x2 = heatMap.xScale(linePoints[1][0]);
            let y2 = heatMap.yScale(linePoints[1][1]);
            highlightGroup.append("line")
                .attr({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                stroke: "#FF034D",
                "stroke-width": 4
            });
            highlightGroup.append("text")
                .attr({
                x: (x1 + x2) / 2 + 10,
                y: (y1 + y2) / 2 - 10,
                fill: "#FF034D"
            })
                .style({
                "font-family": "'Inter', sans-serif",
                "font-size": "11px",
                "font-weight": "800"
            })
                .text(`b = ${b.toFixed(2)}`);
        }
    }
}
function constructInputIds() {
    let result = [];
    for (let inputName in INPUTS) {
        if (state[inputName]) {
            result.push(inputName);
        }
    }
    return result;
}
function constructInput(x, y) {
    let input = [];
    for (let inputName in INPUTS) {
        if (state[inputName]) {
            input.push(INPUTS[inputName].f(x, y));
        }
    }
    return input;
}
function oneStep() {
    iter++;
    if (exoId === 6 && state.numHiddenLayers === 0 && iter === 300) {
        player.pause();
        if (window.parent) {
            window.parent.postMessage({ type: 'EXO6_EPOCH_300' }, '*');
        }
    }
    if (exoId === 3) {
        if (state.x && state.y && !state.xSquared && !state.ySquared && !state.xTimesY && !state.sinX && !state.sinY) {
            let dsKey = state_1.getKeyFromValue(state_1.datasets, state.dataset);
            if (dsKey && !trainedLinearDatasetsExo3[dsKey]) {
                trainedLinearDatasetsExo3[dsKey] = true;
                updateQuadraticFeaturesExo3();
                if (isQuadraticUnlockedExo3()) {
                    showToast("Congratulations! You have trained the model on all 4 linear datasets. The X² and Y² inputs are now unlocked!", "success");
                }
            }
        }
    }
    if (exoId === 4) {
        hasTrainedInExo4 = true;
    }
    if (exoId === 8 && compareUsedInExo8) {
        postSnapshotRunInExo8 = true;
    }
    if (exoId === 11) {
        if (iter === 1) {
            runsCountExo11++;
        }
    }
    trainData.forEach((point, i) => {
        let input = constructInput(point.x, point.y);
        nn.forwardProp(network, input);
        nn.backProp(network, point.label, nn.Errors.SQUARE);
        if ((i + 1) % state.batchSize === 0) {
            nn.updateWeights(network, state.learningRate, state.regularizationRate);
        }
    });
    lossTrain = getLoss(network, trainData);
    lossTest = getLoss(network, testData);
    if (exoId === 11) {
        if (lossTrain > 1.000) {
            divergenceObservedExo11 = true;
        }
    }
    if (exoId === 12) {
        if (Math.abs(lossTrain - lossTest) >= 0.005) {
            divergenceObservedExo12 = true;
        }
    }
    updateUI();
    if (exoId === 8) {
        if (window.parent) {
            window.parent.postMessage({
                type: 'EXO8_STEP',
                modelId: modelId,
                lossTrain: lossTrain,
                iter: iter
            }, '*');
        }
    }
    if (exoId === 11) {
        if (window.parent) {
            window.parent.postMessage({
                type: 'EXO11_STEP',
                learningRate: state.learningRate,
                lossTrain: lossTrain,
                iter: iter
            }, '*');
        }
    }
    if (exoId === 17) {
        if (window.parent) {
            window.parent.postMessage({
                type: 'EXO17_STEP',
                learningRate: state.learningRate,
                lossTrain: lossTrain,
                iter: iter
            }, '*');
        }
    }
}
function getOutputWeights(network) {
    let weights = [];
    for (let layerIdx = 0; layerIdx < network.length - 1; layerIdx++) {
        let currentLayer = network[layerIdx];
        for (let i = 0; i < currentLayer.length; i++) {
            let node = currentLayer[i];
            for (let j = 0; j < node.outputs.length; j++) {
                let output = node.outputs[j];
                weights.push(output.weight);
            }
        }
    }
    return weights;
}
exports.getOutputWeights = getOutputWeights;
function reset(onStartup = false) {
    boundaryHistory = [];
    lineChart.reset();
    state.serialize();
    if (!onStartup) {
        userHasInteracted();
    }
    player.pause();
    let suffix = state.numHiddenLayers !== 1 ? "s" : "";
    d3.select("#layers-label").text("Hidden layer" + suffix);
    d3.select("#num-layers").text(state.numHiddenLayers);
    iter = 0;
    let numInputs = constructInput(0, 0).length;
    let shape = [numInputs].concat(state.networkShape).concat([1]);
    let outputActivation = (state.problem === state_1.Problem.REGRESSION) ?
        nn.Activations.LINEAR : nn.Activations.TANH;
    network = nn.buildNetwork(shape, state.activation, outputActivation, state.regularization, constructInputIds(), state.initZero);
    lossTrain = getLoss(network, trainData);
    lossTest = getLoss(network, testData);
    if (exoId === 11 && (lossTrain > 100 || isNaN(lossTrain))) {
        divergenceObservedExo11 = true;
    }
    drawNetwork(network);
    updateUI(true);
    if (exoId === 6) {
        if (window.parent) {
            window.parent.postMessage({
                type: 'EXO6_STATE_CHANGE',
                numHiddenLayers: state.numHiddenLayers,
                networkShape: state.networkShape
            }, '*');
        }
    }
    if (exoId === 8) {
        if (window.parent) {
            window.parent.postMessage({
                type: 'EXO8_RESET',
                modelId: modelId
            }, '*');
        }
    }
    if (exoId === 11) {
        if (window.parent) {
            window.parent.postMessage({
                type: 'EXO11_RESET',
                learningRate: state.learningRate
            }, '*');
        }
    }
}
;
function initTutorial() {
    if (state.tutorial == null || state.tutorial === '' || state.hideText) {
        return;
    }
    d3.selectAll("article div.l--body").remove();
    let tutorial = d3.select("article").append("div")
        .attr("class", "l--body");
    d3.html(`tutorials/${state.tutorial}.html`, (err, htmlFragment) => {
        if (err) {
            throw err;
        }
        tutorial.node().appendChild(htmlFragment);
        let title = tutorial.select("title");
        if (title.size()) {
            d3.select("header h1").style({
                "margin-top": "20px",
                "margin-bottom": "20px",
            })
                .text(title.text());
            document.title = title.text();
        }
    });
}
function drawDatasetThumbnails() {
    function renderThumbnail(canvas, dataGenerator) {
        let w = 100;
        let h = 100;
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);
        let context = canvas.getContext("2d");
        let data = dataGenerator(200, 0);
        data.forEach(function (d) {
            context.fillStyle = colorScale(d.label);
            context.fillRect(w * (d.x + 6) / 12, h * (d.y + 6) / 12, 4, 4);
        });
        d3.select(canvas.parentNode).style("display", null);
    }
    d3.selectAll(".dataset").style("display", "none");
    if (state.problem === state_1.Problem.CLASSIFICATION) {
        for (let dataset in state_1.datasets) {
            let canvas = document.querySelector(`canvas[data-dataset=${dataset}]`);
            let dataGenerator = state_1.datasets[dataset];
            if (exoId > 0 && exoId !== 3 && exoId !== 7 && dataGenerator !== state.dataset) {
                continue;
            }
            renderThumbnail(canvas, dataGenerator);
        }
    }
    if (state.problem === state_1.Problem.REGRESSION) {
        for (let regDataset in state_1.regDatasets) {
            let canvas = document.querySelector(`canvas[data-regDataset=${regDataset}]`);
            let dataGenerator = state_1.regDatasets[regDataset];
            if (exoId > 0 && dataGenerator !== state.regDataset) {
                continue;
            }
            renderThumbnail(canvas, dataGenerator);
        }
    }
}
function hideControls() {
    let hiddenProps = state.getHiddenProps();
    hiddenProps.forEach(prop => {
        let controls = d3.selectAll(`.ui-${prop}`);
        if (controls.size() === 0) {
            console.warn(`0 html elements found with class .ui-${prop}`);
        }
        controls.style("display", "none");
    });
    if (state.numHiddenLayers === 0 && hiddenProps.indexOf("numHiddenLayers") !== -1) {
        d3.select(".column.hidden-layers").style("visibility", "hidden");
    }
    let hideControls = d3.select(".hide-controls");
    HIDABLE_CONTROLS.forEach(([text, id]) => {
        let label = hideControls.append("label")
            .attr("class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        let input = label.append("input")
            .attr({
            type: "checkbox",
            class: "mdl-checkbox__input",
        });
        if (hiddenProps.indexOf(id) === -1) {
            input.attr("checked", "true");
        }
        input.on("change", function () {
            state.setHideProperty(id, !this.checked);
            state.serialize();
            userHasInteracted();
            d3.select(".hide-controls-link")
                .attr("href", window.location.href);
        });
        label.append("span")
            .attr("class", "mdl-checkbox__label label")
            .text(text);
    });
    d3.select(".hide-controls-link")
        .attr("href", window.location.href);
}
function generateData(firstTime = false) {
    if (!firstTime) {
        state.seed = Math.random().toFixed(5);
        state.serialize();
        userHasInteracted();
    }
    Math.seedrandom(state.seed);
    let numSamples = (state.problem === state_1.Problem.REGRESSION) ?
        NUM_SAMPLES_REGRESS : NUM_SAMPLES_CLASSIFY;
    let generator = state.problem === state_1.Problem.CLASSIFICATION ?
        state.dataset : state.regDataset;
    let data = generator(numSamples, state.noise / 100);
    dataset_1.shuffle(data);
    let splitIndex = Math.floor(data.length * state.percTrainData / 100);
    trainData = data.slice(0, splitIndex);
    testData = data.slice(splitIndex);
    heatMap.updatePoints(trainData);
    heatMap.updateTestPoints(state.showTestData ? testData : []);
}
let firstInteraction = true;
let parametersChanged = false;
function userHasInteracted() {
    if (!firstInteraction) {
        return;
    }
    firstInteraction = false;
    let page = 'index';
    if (state.tutorial != null && state.tutorial !== '') {
        page = `/v/tutorials/${state.tutorial}`;
    }
    if (typeof ga !== 'undefined') {
        ga('set', 'page', page);
        ga('send', 'pageview', { 'sessionControl': 'start' });
    }
}
function simulationStarted() {
    if (typeof ga !== 'undefined') {
        ga('send', {
            hitType: 'event',
            eventCategory: 'Starting Simulation',
            eventAction: parametersChanged ? 'changed' : 'unchanged',
            eventLabel: state.tutorial == null ? '' : state.tutorial
        });
    }
    parametersChanged = false;
}
drawDatasetThumbnails();
initTutorial();
makeGUI();
generateData(true);
reset(true);
hideControls();
initExo3Boxes();
if (exoId > 0 && exoConfig) {
    d3.select("#learningRate").property("value", state.learningRate);
    d3.select("#activations").property("value", state_1.getKeyFromValue(state_1.activations, state.activation));
    d3.select("#batchSize").property("value", state.batchSize);
    d3.select("#noise").property("value", state.noise);
    d3.select("#percTrainData").property("value", state.percTrainData);
    d3.select("#regularizations").property("value", state_1.getKeyFromValue(state_1.regularizations, state.regularization));
    generateData(true);
    reset(true);
}
if (typeof window.componentHandler !== 'undefined') {
    window.componentHandler.upgradeDom();
}
['mousemove', 'keydown', 'click', 'scroll'].forEach(evt => {
    window.addEventListener(evt, () => {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage('USER_ACTIVE_IN_IFRAME', '*');
        }
    }, { passive: true });
});
