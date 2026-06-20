"use strict";
exports.__esModule = true;
var nn = require("./nn");
var heatmap_1 = require("./heatmap");
var state_1 = require("./state");
var dataset_1 = require("./dataset");
var linechart_1 = require("./linechart");
var d3 = require("d3");
var exo1_1 = require("./exos/exo1");
var exo2_1 = require("./exos/exo2");
var exo3_1 = require("./exos/exo3");
var exo4_1 = require("./exos/exo4");
var exo5_1 = require("./exos/exo5");
var exo6_1 = require("./exos/exo6");
var exo7_1 = require("./exos/exo7");
var exo8_1 = require("./exos/exo8");
var exo9_1 = require("./exos/exo9");
var exo10_1 = require("./exos/exo10");
var exo11_1 = require("./exos/exo11");
var exo12_1 = require("./exos/exo12");
var exo13_1 = require("./exos/exo13");
var exo14_1 = require("./exos/exo14");
var exo15_1 = require("./exos/exo15");
var exo16_1 = require("./exos/exo16");
var exo17_1 = require("./exos/exo17");
var params = new URLSearchParams(window.location.search);
var exoIdStr = params.get("exo");
if (!exoIdStr) {
    try {
        var parentPath = window.parent.location.pathname;
        var match = parentPath.match(/exo(\d+)/);
        if (match) {
            exoIdStr = match[1];
        }
    }
    catch (e) {
    }
}
var exoId = Number(exoIdStr || "0");
d3.select("body").attr("data-exo", exoId);
var exoConfig = exoId === 1 ? exo1_1.exo1 : (exoId === 2 ? exo2_1.exo2 : (exoId === 3 ? exo3_1.exo3 : (exoId === 4 ? exo4_1.exo4 : (exoId === 5 ? exo5_1.exo5 : (exoId === 6 ? exo6_1.exo6 : (exoId === 7 ? exo7_1.exo7 : (exoId === 8 ? exo8_1.exo8 : (exoId === 9 ? exo9_1.exo9 : (exoId === 10 ? exo10_1.exo10 : (exoId === 11 ? exo11_1.exo11 : (exoId === 12 ? exo12_1.exo12 : (exoId === 13 ? exo13_1.exo13 : (exoId === 14 ? exo14_1.exo14 : (exoId === 15 ? exo15_1.exo15 : (exoId === 16 ? exo16_1.exo16 : (exoId === 17 ? exo17_1.exo17 : null))))))))))))))));
var mainWidth;
d3.select(".more button").on("click", function () {
    var position = 800;
    d3.transition()
        .duration(1000)
        .tween("scroll", scrollTween(position));
});
function scrollTween(offset) {
    return function () {
        var i = d3.interpolateNumber(window.pageYOffset ||
            document.documentElement.scrollTop, offset);
        return function (t) { scrollTo(0, i(t)); };
    };
}
var RECT_SIZE = 30;
var BIAS_SIZE = 8;
var NUM_SAMPLES_CLASSIFY = 500;
var NUM_SAMPLES_REGRESS = 1200;
var DENSITY = 100;
var HoverType;
(function (HoverType) {
    HoverType[HoverType["BIAS"] = 0] = "BIAS";
    HoverType[HoverType["WEIGHT"] = 1] = "WEIGHT";
})(HoverType || (HoverType = {}));
var INPUTS = {
    "x": { f: function (x, y) { return x; }, label: "X_1" },
    "y": { f: function (x, y) { return y; }, label: "X_2" },
    "xSquared": { f: function (x, y) { return x * x; }, label: "X_1^2" },
    "ySquared": { f: function (x, y) { return y * y; }, label: "X_2^2" },
    "xTimesY": { f: function (x, y) { return x * y; }, label: "X_1X_2" },
    "sinX": { f: function (x, y) { return Math.sin(x); }, label: "sin(X_1)" },
    "sinY": { f: function (x, y) { return Math.sin(y); }, label: "sin(X_2)" }
};
var HIDABLE_CONTROLS = [
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
var Player = (function () {
    function Player() {
        this.timerIndex = 0;
        this.isPlaying = false;
        this.callback = null;
    }
    Player.prototype.playOrPause = function () {
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
    };
    Player.prototype.onPlayPause = function (callback) {
        this.callback = callback;
    };
    Player.prototype.play = function () {
        this.pause();
        this.isPlaying = true;
        if (this.callback) {
            this.callback(this.isPlaying);
        }
        this.start(this.timerIndex);
    };
    Player.prototype.pause = function () {
        this.timerIndex++;
        this.isPlaying = false;
        if (this.callback) {
            this.callback(this.isPlaying);
        }
    };
    Player.prototype.start = function (localTimerIndex) {
        var _this = this;
        d3.timer(function () {
            if (localTimerIndex < _this.timerIndex) {
                return true;
            }
            oneStep();
            if (exoId === 7) {
                var actName = state_1.getKeyFromValue(state_1.activations, state.activation);
                if (actName && usedActivationsExo7.indexOf(actName) === -1) {
                    usedActivationsExo7.push(actName);
                }
            }
            return false;
        }, 0);
    };
    return Player;
}());
var usedActivationsExo7 = [];
function showToast(message, type) {
    if (type === void 0) { type = 'success'; }
    var container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = "toast " + type;
    var icon = type === 'success' ? '✨' : '⚠️';
    toast.innerHTML = "<span class=\"toast-icon\">" + icon + "</span> <span>" + message + "</span>";
    container.appendChild(toast);
    setTimeout(function () { return toast.classList.add('visible'); }, 10);
    setTimeout(function () {
        toast.classList.remove('visible');
        setTimeout(function () { return toast.remove(); }, 500);
    }, 4000);
}
var state = state_1.State.deserializeState();
if (exoId > 0 && exoConfig) {
    exoConfig.hiddenControls.forEach(function (id) {
        state.setHideProperty(id, true);
    });
    for (var key in exoConfig.forcedState) {
        if (exoConfig.forcedState.hasOwnProperty(key)) {
            state[key] = exoConfig.forcedState[key];
        }
    }
    state.numHiddenLayers = state.networkShape.length;
}
state.getHiddenProps().forEach(function (prop) {
    if (prop in INPUTS) {
        delete INPUTS[prop];
    }
});
var boundary = {};
var selectedNodeId = null;
var xDomain = [-6, 6];
var heatMap = new heatmap_1.HeatMap(300, DENSITY, xDomain, xDomain, d3.select("#heatmap"), { showAxes: true });
var linkWidthScale = d3.scale.linear()
    .domain([0, 5])
    .range([1, 10])
    .clamp(true);
var colorScale = d3.scale.linear()
    .domain([-1, 0, 1])
    .range(["#f59322", "#e8eaeb", "#0877bd"])
    .clamp(true);
var iter = 0;
var trainData = [];
var testData = [];
var network = null;
var lossTrain = 0;
var lossTest = 0;
var player = new Player();
var lineChart = new linechart_1.AppendingLineChart(d3.select("#linechart"), ["#777", "black"]);
var snapshotHeatMap = null;
var snapshotBoundary = null;
var snapshotLossTrainVal = null;
var selectedLinkForSlider = null;
var selectedNodeForBiasSlider = null;
var weightSlider = d3.select("#weight-slider");
var weightValue = d3.select("#weight-value");
var selectedLinkLabel = d3.select("#selected-link-label");
var biasSlider = d3.select("#bias-slider");
var biasValue = d3.select("#bias-value");
var selectedNodeLabel = d3.select("#selected-node-label");
var biasModifiedInExo4 = false;
var weightModifiedInExo4 = false;
var hasTrainedInExo4 = false;
var boundaryHistory = [];
function getBoundaryLinePoints(w1, w2, b) {
    var points = [];
    if (Math.abs(w2) > 1e-5) {
        var x2 = (6 * w1 - b) / w2;
        if (x2 >= -6 && x2 <= 6)
            points.push([-6, x2]);
    }
    if (Math.abs(w2) > 1e-5) {
        var x2 = (-6 * w1 - b) / w2;
        if (x2 >= -6 && x2 <= 6)
            points.push([6, x2]);
    }
    if (Math.abs(w1) > 1e-5) {
        var x1_1 = (6 * w2 - b) / w1;
        if (x1_1 >= -6 && x1_1 <= 6) {
            if (!points.some(function (p) { return Math.abs(p[0] - x1_1) < 1e-4 && Math.abs(p[1] - (-6)) < 1e-4; })) {
                points.push([x1_1, -6]);
            }
        }
    }
    if (Math.abs(w1) > 1e-5) {
        var x1_2 = (-6 * w2 - b) / w1;
        if (x1_2 >= -6 && x1_2 <= 6) {
            if (!points.some(function (p) { return Math.abs(p[0] - x1_2) < 1e-4 && Math.abs(p[1] - 6) < 1e-4; })) {
                points.push([x1_2, 6]);
            }
        }
    }
    return points;
}
var compareUsedInExo8 = false;
var postSnapshotRunInExo8 = false;
var runsCountExo11 = 0;
var divergenceObservedExo11 = false;
var divergenceObservedExo12 = false;
var trainedLinearDatasetsExo3 = {};
function isQuadraticUnlockedExo3() {
    if (exoId !== 3)
        return true;
    var keys = ["circle", "xor", "gauss", "spiral"];
    return keys.every(function (k) { return trainedLinearDatasetsExo3[k] === true; });
}
function updateQuadraticFeaturesExo3() {
    var locked = !isQuadraticUnlockedExo3();
    var opacity = locked ? "0.2" : "1.0";
    var cursor = locked ? "not-allowed" : "pointer";
    d3.select("#canvas-xSquared").style("opacity", opacity).style("cursor", cursor);
    d3.select("#canvas-ySquared").style("opacity", opacity).style("cursor", cursor);
    d3.select("#nodexSquared").style("opacity", opacity);
    d3.select("#nodeySquared").style("opacity", opacity);
    var msgBoxLinear = d3.select("#msg-box-linear");
    var msgBoxQuadratic = d3.select("#msg-box-quadratic");
    if (locked) {
        if (msgBoxLinear.size() > 0) {
            var keys = ["circle", "xor", "gauss", "spiral"];
            var count = keys.filter(function (k) { return trainedLinearDatasetsExo3[k]; }).length;
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
    var datasetDiv = d3.select(".ui-dataset");
    datasetDiv.selectAll("#msg-box-linear").remove();
    var msgBoxLinear = datasetDiv.append("div")
        .attr("id", "msg-box-linear")
        .attr("class", "exo3-msg-box")
        .style({
        "background-color": "rgba(0, 70, 118, 0.1)",
        "border": "1px solid #004676",
        "border-radius": "8px",
        "padding": "12px",
        "margin-top": "15px",
        "font-size": "13px",
        "color": "#fff",
        "line-height": "1.4"
    });
    msgBoxLinear.html("\n    <strong>\uD83D\uDCA1 \u00C9tape 1 :</strong> Entra\u00EEne le mod\u00E8le sur chaque jeu de donn\u00E9es (X et Y) pour observer ses limites.<br>\n    <span style=\"font-size: 12px; color: #94a3b8;\">Progression : <span id=\"msg-box-linear-count\" style=\"font-weight: bold; color: #FF034D;\">0</span> / 4 jeux de donn\u00E9es entra\u00EEn\u00E9s.</span>\n  ");
    var networkDiv = d3.select("#network");
    networkDiv.selectAll("#msg-box-quadratic").remove();
    var msgBoxQuadratic = networkDiv.insert("div", "#hovercard")
        .attr("id", "msg-box-quadratic")
        .attr("class", "exo3-msg-box")
        .style({
        "background-color": "rgba(16, 185, 129, 0.1)",
        "border": "1px solid #10b981",
        "border-radius": "8px",
        "padding": "12px",
        "margin-top": "15px",
        "font-size": "13px",
        "color": "#fff",
        "line-height": "1.4",
        "position": "relative",
        "display": "none"
    });
    msgBoxQuadratic.html("\n    <strong>\uD83C\uDF89 \u00C9tape 2 :</strong> Maintenant, active les caract\u00E9ristiques <strong>X\u00B2</strong> et <strong>Y\u00B2</strong> et entra\u00EEne \u00E0 nouveau pour r\u00E9ussir la classification !\n  ");
    updateQuadraticFeaturesExo3();
}
function makeGUI() {
    weightSlider.on("input", function () {
        if (!selectedLinkForSlider)
            return;
        var newWeight = +this.value;
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
        var newBias = +this.value;
        selectedNodeForBiasSlider.bias = newBias;
        biasValue.text(newBias.toFixed(2));
        if (exoId === 4) {
            biasModifiedInExo4 = true;
        }
        lossTrain = getLoss(network, trainData);
        lossTest = getLoss(network, testData);
        updateUI();
    });
    var seedInput = d3.select("#seed-input");
    var regenSeedBtn = d3.select("#regenerate-seed");
    var seedStatus = d3.select("#seed-status");
    seedInput.property("value", state.seed);
    seedInput.on("input", function () {
        state.seed = this.value;
        state.serialize();
        Math.seedrandom(state.seed);
        seedStatus.style("display", "inline");
        setTimeout(function () { return seedStatus.style("display", "none"); }, 1000);
        reset();
    });
    regenSeedBtn.on("click", function () {
        state.seed = Math.random().toFixed(5);
        seedInput.property("value", state.seed);
        state.serialize();
        Math.seedrandom(state.seed);
        regenSeedBtn.select("i").style("transition", "transform 0.5s ease-in-out")
            .style("transform", "rotate(360deg)");
        setTimeout(function () { return regenSeedBtn.select("i").style("transform", "rotate(0deg)"); }, 500);
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
        var overlay_1 = d3.select("#common-exo-popup-overlay");
        overlay_1.style("display", "flex");
        d3.select("#common-exo-next-btn").on("click", function () {
            overlay_1.style("display", "none");
        });
    }
    d3.select("#reset-button").on("click", function () {
        reset();
        userHasInteracted();
        d3.select("#play-pause-button");
    });
    d3.select("#play-pause-button").on("click", function () {
        userHasInteracted();
        player.playOrPause();
    });
    player.onPlayPause(function (isPlaying) {
        d3.select("#play-pause-button").classed("playing", isPlaying);
        d3.select("#validate-button").property("disabled", isPlaying);
    });
    d3.select("#next-step-button").on("click", function () {
        player.pause();
        userHasInteracted();
        if (iter === 0) {
            simulationStarted();
        }
        oneStep();
    });
    d3.select("#data-regen-button").on("click", function () {
        generateData();
        parametersChanged = true;
    });
    var dataThumbnails = d3.selectAll("canvas[data-dataset]");
    dataThumbnails.on("click", function () {
        var newDataset = state_1.datasets[this.dataset.dataset];
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
    var datasetKey = state_1.getKeyFromValue(state_1.datasets, state.dataset);
    d3.select("canvas[data-dataset=" + datasetKey + "]")
        .classed("selected", true);
    var regDataThumbnails = d3.selectAll("canvas[data-regDataset]");
    regDataThumbnails.on("click", function () {
        var newDataset = state_1.regDatasets[this.dataset.regdataset];
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
    var regDatasetKey = state_1.getKeyFromValue(state_1.regDatasets, state.regDataset);
    d3.select("canvas[data-regDataset=" + regDatasetKey + "]")
        .classed("selected", true);
    d3.select("#add-layers").on("click", function () {
        if (state.numHiddenLayers >= 6) {
            return;
        }
        state.networkShape[state.numHiddenLayers] = 2;
        state.numHiddenLayers++;
        parametersChanged = true;
        reset();
    });
    d3.select("#remove-layers").on("click", function () {
        if (state.numHiddenLayers <= 0) {
            return;
        }
        state.numHiddenLayers--;
        state.networkShape.splice(state.numHiddenLayers);
        parametersChanged = true;
        reset();
    });
    var showTestData = d3.select("#show-test-data").on("change", function () {
        state.showTestData = this.checked;
        state.serialize();
        userHasInteracted();
        heatMap.updateTestPoints(state.showTestData ? testData : []);
    });
    showTestData.property("checked", state.showTestData);
    var discretize = d3.select("#discretize").on("change", function () {
        state.discretize = this.checked;
        state.serialize();
        userHasInteracted();
        updateUI();
        if (snapshotHeatMap && snapshotBoundary) {
            snapshotHeatMap.updateBackground(snapshotBoundary, state.discretize);
        }
    });
    discretize.property("checked", state.discretize);
    var percTrain = d3.select("#percTrainData").on("input", function () {
        state.percTrainData = this.value;
        d3.select("label[for='percTrainData'] .value").text(this.value);
        generateData();
        parametersChanged = true;
        reset();
    });
    percTrain.property("value", state.percTrainData);
    d3.select("label[for='percTrainData'] .value").text(state.percTrainData);
    var noise = d3.select("#noise").on("input", function () {
        state.noise = this.value;
        d3.select("label[for='noise'] .value").text(this.value);
        generateData();
        parametersChanged = true;
        reset();
    });
    var currentMax = parseInt(noise.property("max"));
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
    var batchSize = d3.select("#batchSize").on("input", function () {
        state.batchSize = this.value;
        d3.select("label[for='batchSize'] .value").text(this.value);
        parametersChanged = true;
        reset();
    });
    batchSize.property("value", state.batchSize);
    d3.select("label[for='batchSize'] .value").text(state.batchSize);
    var activationDropdown = d3.select("#activations").on("change", function () {
        state.activation = state_1.activations[this.value];
        parametersChanged = true;
        reset();
    });
    activationDropdown.property("value", state_1.getKeyFromValue(state_1.activations, state.activation));
    var learningRate = d3.select("#learningRate").on("change", function () {
        state.learningRate = +this.value;
        state.serialize();
        userHasInteracted();
        parametersChanged = true;
    });
    learningRate.property("value", state.learningRate);
    var regularDropdown = d3.select("#regularizations").on("change", function () {
        state.regularization = state_1.regularizations[this.value];
        parametersChanged = true;
        reset();
    });
    regularDropdown.property("value", state_1.getKeyFromValue(state_1.regularizations, state.regularization));
    var regularRate = d3.select("#regularRate").on("change", function () {
        state.regularizationRate = +this.value;
        parametersChanged = true;
        reset();
    });
    regularRate.property("value", state.regularizationRate);
    var problem = d3.select("#problem").on("change", function () {
        state.problem = state_1.problems[this.value];
        generateData();
        drawDatasetThumbnails();
        parametersChanged = true;
        reset();
    });
    problem.property("value", state_1.getKeyFromValue(state_1.problems, state.problem));
    var x = d3.scale.linear().domain([-1, 1]).range([0, 144]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues([-1, 0, 1])
        .tickFormat(d3.format("d"));
    d3.select("#colormap g.core").append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,10)")
        .call(xAxis);
    window.addEventListener("resize", function () {
        var newWidth = document.querySelector("#main-part")
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
    d3.select("#validate-button").on("click", function () {
        var success = false;
        var message = "";
        if (exoId === 1 || exoId === 2) {
            if (lossTrain < 0.001) {
                success = true;
            }
            else {
                message = "Veillez relire la consigne! 😤";
            }
        }
        else if (exoId === 3) {
            var isCircle = state_1.getKeyFromValue(state_1.datasets, state.dataset) === "circle";
            var hasCorrectFeatures = state.x && state.y && state.xSquared && state.ySquared &&
                !state.xTimesY && !state.sinX && !state.sinY;
            var noHidden = state.numHiddenLayers === 0;
            if (!isQuadraticUnlockedExo3()) {
                message = "Vous devez d'abord entraîner le modèle sur les 4 jeux de données en mode linéaire.";
            }
            else if (!isCircle) {
                message = "Veuillez sélectionner le jeu de données Cercle.";
            }
            else if (!hasCorrectFeatures) {
                message = "Activez uniquement les caractéristiques X, Y, X² et Y².";
            }
            else if (!noHidden) {
                message = "Veuillez configurer le réseau sans aucune couche cachée (0 couche cachée).";
            }
            else if (iter < 1000) {
                message = "L'entraînement doit atteindre au moins 1000 époques (Epochs).";
            }
            else if (lossTrain >= 0.005) {
                message = "La perte d'entraînement (loss) doit être inférieure à 0.005.";
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
                var testees = usedActivationsExo7.join(", ");
                message = "Veillez relire la consigne! 😤";
            }
        }
        else if (exoId === 4) {
            var firstHiddenNode = network[1][0];
            if (!hasTrainedInExo4 || lossTrain >= 0.01) {
                message = "Veillez relire la consigne! 😤";
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
                message = "Veillez relire la consigne! 😤";
            }
        }
        else if (exoId === 6) {
            if (lossTrain < 0.015) {
                success = true;
            }
            else {
                message = "Veillez relire la consigne! 😤";
            }
        }
        else if (exoId === 9 || exoId === 10) {
            if (!snapshotBoundary) {
                message = "Cliquez sur double run afin de comparer";
            }
            else {
                var diff = Math.abs(lossTrain - snapshotLossTrainVal);
                if (diff < 0.01) {
                    success = true;
                }
                else {
                    message = "Les pertes doivent \u00EAtre identiques ou tr\u00E8s proches (diff < 0.01)}";
                }
            }
        }
        else if (exoId === 8) {
            if (!compareUsedInExo8) {
                message = "Veillez relire la consigne! 😤";
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
                message = "Plusieurs runs doivent être faits.";
            }
            else if (!divergenceObservedExo11) {
                message = "Au moins un cas de divergence du learning rate doit être observé.";
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
                message = "Les courbes de perte d'entraînement et de test doivent diverger d'au moins 0,005.";
            }
        }
        else if (exoId === 13 || exoId === 14 || exoId === 15) {
            success = true;
        }
        else {
            if (lossTrain < 0.1) {
                success = true;
            }
            else {
                message = "Exercice non validé";
            }
        }
        var msgDiv = d3.select("#validation-message");
        msgDiv.classed("show", false);
        setTimeout(function () {
            if (success) {
                showToast("✨ Félicitations ! Exercice validé.", "success");
                msgDiv.text("Congratulation !")
                    .classed("success", true)
                    .classed("error", false)
                    .classed("show", true);
                if (window.parent) {
                    window.parent.postMessage({ type: 'EXO_SUCCESS', exoId: exoId }, '*');
                }
            }
            else {
                showToast(message || "Exercice non validé", "error");
                msgDiv.text("Echec")
                    .classed("success", false)
                    .classed("error", true)
                    .classed("show", true);
            }
        }, 50);
    });
    d3.select("#snapshot-button").on("click", function () {
        d3.select("#compare-area").style("display", "block");
        if (exoId === 8) {
            compareUsedInExo8 = true;
        }
        var outputId = selectedNodeId != null ?
            selectedNodeId : nn.getOutputNode(network).id;
        var currentBoundary = boundary[outputId];
        snapshotBoundary = currentBoundary.map(function (column) { return column.slice(); });
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
    d3.select("#clear-snapshot").on("click", function () {
        d3.select("#compare-area").style("display", "none");
        snapshotBoundary = null;
    });
    hideControls();
}
function updateBiasesUI(network) {
    nn.forEachNode(network, true, function (node) {
        d3.select("rect#bias-" + node.id).style("fill", colorScale(node.bias));
    });
}
function updateWeightsUI(network, container) {
    for (var layerIdx = 1; layerIdx < network.length; layerIdx++) {
        var currentLayer = network[layerIdx];
        for (var i = 0; i < currentLayer.length; i++) {
            var node = currentLayer[i];
            for (var j = 0; j < node.inputLinks.length; j++) {
                var link = node.inputLinks[j];
                container.select("#link" + link.source.id + "-" + link.dest.id)
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
    var x = cx - RECT_SIZE / 2;
    var y = cy - RECT_SIZE / 2;
    var nodeGroup = container.append("g")
        .attr({
        "class": "node",
        "id": "node" + nodeId,
        "transform": "translate(" + x + "," + y + ")"
    });
    nodeGroup.append("rect")
        .attr({
        x: 0,
        y: 0,
        width: RECT_SIZE,
        height: RECT_SIZE
    });
    var activeOrNotClass = state[nodeId] ? "active" : "inactive";
    if (isInput) {
        var label = INPUTS[nodeId].label != null ?
            INPUTS[nodeId].label : nodeId;
        var text = nodeGroup.append("text").attr({
            "class": "main-label",
            x: -10,
            y: RECT_SIZE / 2, "text-anchor": "end"
        });
        if (/[_^]/.test(label)) {
            var myRe = /(.*?)([_^])(.)/g;
            var myArray = void 0;
            var lastIndex = void 0;
            while ((myArray = myRe.exec(label)) != null) {
                lastIndex = myRe.lastIndex;
                var prefix = myArray[1];
                var sep = myArray[2];
                var suffix = myArray[3];
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
            var sliderX = cx - 38;
            var sliderY_1 = cy + 85;
            var biasGroup = container.append("g")
                .attr("class", "custom-weight-editor-group")
                .attr("id", "custom-bias-editor-group");
            var track = biasGroup.append("line")
                .attr({
                x1: sliderX,
                y1: sliderY_1 - 30,
                x2: sliderX,
                y2: sliderY_1 + 30,
                stroke: "#1e293b",
                "stroke-width": 4,
                "stroke-linecap": "round",
                cursor: "pointer"
            });
            var handleColor = "#8b5cf6";
            var badgeColor = "#5b21b6";
            var badge = biasGroup.append("g")
                .attr("transform", "translate(" + (sliderX - 60) + ", " + (sliderY_1 - 18) + ")");
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
            var badgeText = badge.append("text")
                .attr("text-anchor", "middle")
                .attr("fill", "white")
                .style("font-family", "'Inter', sans-serif");
            badgeText.append("tspan")
                .attr({ x: 24, y: 14 })
                .style({ "font-size": "8px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": "0.5px", "opacity": "0.8" })
                .text("Biais");
            var valSpan_1 = badgeText.append("tspan")
                .attr({ x: 24, y: 28 })
                .style({ "font-size": "12px", "font-weight": "800" })
                .text(node.bias.toFixed(2).replace(".", ","));
            var initialY = sliderY_1 - (node.bias / 5.0) * 30;
            var handle_1 = biasGroup.append("rect")
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
            var drag = d3.behavior.drag()
                .on("drag", function () {
                var mouseContainer = d3.mouse(container.node());
                var mouseY = mouseContainer[1];
                var newY = Math.max(sliderY_1 - 30, Math.min(sliderY_1 + 30, mouseY));
                var bias = 5.0 - 10.0 * (newY - (sliderY_1 - 30)) / 60.0;
                bias = Math.round(bias * 100) / 100;
                if (node.bias !== bias) {
                    var firstHiddenNode = network[1][0];
                    var w1 = firstHiddenNode.inputLinks[0].weight;
                    var w2 = firstHiddenNode.inputLinks[1].weight;
                    var linePoints = getBoundaryLinePoints(w1, w2, node.bias);
                    if (linePoints.length >= 2) {
                        var x1 = heatMap.xScale(linePoints[0][0]);
                        var y1 = heatMap.yScale(linePoints[0][1]);
                        var x2 = heatMap.xScale(linePoints[1][0]);
                        var y2 = heatMap.yScale(linePoints[1][1]);
                        if (boundaryHistory.length === 0 ||
                            Math.abs(boundaryHistory[boundaryHistory.length - 1].biasValue - node.bias) > 0.05) {
                            boundaryHistory.push({ x1: x1, y1: y1, x2: x2, y2: y2, biasValue: node.bias });
                            if (boundaryHistory.length > 5) {
                                boundaryHistory.shift();
                            }
                        }
                    }
                    node.bias = bias;
                    handle_1.attr("y", (sliderY_1 - (bias / 5.0) * 30) - 3);
                    valSpan_1.text(bias.toFixed(2).replace(".", ","));
                    biasSlider.property("value", bias);
                    biasValue.text(bias.toFixed(2));
                    biasModifiedInExo4 = true;
                    lossTrain = getLoss(network, trainData);
                    lossTest = getLoss(network, testData);
                    updateUI();
                }
            });
            handle_1.call(drag);
            track.call(drag);
        }
        else {
            nodeGroup.append("rect")
                .attr({
                id: "bias-" + nodeId,
                x: -BIAS_SIZE - 4,
                y: RECT_SIZE + 2,
                width: BIAS_SIZE,
                height: BIAS_SIZE
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
    var div = d3.select("#network").insert("div", ":first-child")
        .attr({
        "id": "canvas-" + nodeId,
        "class": "canvas"
    })
        .style({
        position: "absolute",
        left: x + 3 + "px",
        top: y + 3 + "px"
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
    var nodeHeatMap = new heatmap_1.HeatMap(RECT_SIZE, DENSITY / 10, xDomain, xDomain, div, { noSvg: true });
    div.datum({ heatmap: nodeHeatMap, id: nodeId });
}
function drawNetwork(network) {
    var svg = d3.select("#svg");
    svg.select("g.core").remove();
    d3.select("#network").selectAll("div.canvas").remove();
    d3.select("#network").selectAll("div.plus-minus-neurons").remove();
    var padding = 3;
    var co = d3.select(".column.output").node();
    var cf = d3.select(".column.features").node();
    var width = co.offsetLeft - cf.offsetLeft;
    svg.attr("width", width);
    var node2coord = {};
    var container = svg.append("g")
        .classed("core", true)
        .attr("transform", "translate(" + padding + "," + padding + ")");
    var numLayers = network.length;
    var featureWidth = 118;
    var layerScale = d3.scale.ordinal()
        .domain(d3.range(1, numLayers - 1))
        .rangePoints([featureWidth, width - RECT_SIZE], 0.7);
    var spacing = exoId === 1 ? 100 : 25;
    var nodeIndexScale = function (nodeIndex) { return nodeIndex * (RECT_SIZE + spacing); };
    var calloutThumb = d3.select(".callout.thumbnail").style("display", "none");
    var calloutWeights = d3.select(".callout.weights").style("display", "none");
    var idWithCallout = null;
    var targetIdWithCallout = null;
    var cx = RECT_SIZE / 2 + 50;
    var nodeIds = Object.keys(INPUTS);
    var maxY = nodeIndexScale(nodeIds.length);
    nodeIds.forEach(function (nodeId, i) {
        var cy = nodeIndexScale(i) + RECT_SIZE / 2;
        node2coord[nodeId] = { cx: cx, cy: cy };
        drawNode(cx, cy, nodeId, true, container);
    });
    for (var layerIdx = 1; layerIdx < numLayers - 1; layerIdx++) {
        var numNodes = network[layerIdx].length;
        var cx_1 = layerScale(layerIdx) + RECT_SIZE / 2;
        maxY = Math.max(maxY, nodeIndexScale(numNodes));
        addPlusMinusControl(layerScale(layerIdx), layerIdx);
        for (var i = 0; i < numNodes; i++) {
            var node_1 = network[layerIdx][i];
            var cy_1 = nodeIndexScale(i) + RECT_SIZE / 2;
            node2coord[node_1.id] = { cx: cx_1, cy: cy_1 };
            drawNode(cx_1, cy_1, node_1.id, false, container, node_1);
            var numNodes_1 = network[layerIdx].length;
            var nextNumNodes = network[layerIdx + 1].length;
            if (idWithCallout == null &&
                i === numNodes_1 - 1 &&
                nextNumNodes <= numNodes_1) {
                calloutThumb.style({
                    display: null,
                    top: 20 + 3 + cy_1 + "px",
                    left: cx_1 + "px"
                });
                idWithCallout = node_1.id;
            }
            for (var j = 0; j < node_1.inputLinks.length; j++) {
                var link = node_1.inputLinks[j];
                var path = drawLink(link, node2coord, network, container, j === 0, j, node_1.inputLinks.length).node();
                var prevLayer = network[layerIdx - 1];
                var lastNodePrevLayer = prevLayer[prevLayer.length - 1];
                if (targetIdWithCallout == null &&
                    i === numNodes_1 - 1 &&
                    link.source.id === lastNodePrevLayer.id &&
                    (link.source.id !== idWithCallout || numLayers <= 5) &&
                    link.dest.id !== idWithCallout &&
                    prevLayer.length >= numNodes_1) {
                    var midPoint = path.getPointAtLength(path.getTotalLength() * 0.7);
                    calloutWeights.style({
                        display: null,
                        top: midPoint.y + 5 + "px",
                        left: midPoint.x + 3 + "px"
                    });
                    targetIdWithCallout = link.dest.id;
                }
            }
        }
    }
    cx = width + RECT_SIZE / 2;
    var node = network[numLayers - 1][0];
    var cy = (exoId === 1) ? (nodeIndexScale(nodeIds.length - 1) + RECT_SIZE) / 2 : (nodeIndexScale(0) + RECT_SIZE / 2);
    node2coord[node.id] = { cx: cx, cy: cy };
    for (var i = 0; i < node.inputLinks.length; i++) {
        var link = node.inputLinks[i];
        drawLink(link, node2coord, network, container, i === 0, i, node.inputLinks.length);
    }
    if (exoId === 4) {
        maxY = Math.max(maxY, 160);
    }
    svg.attr("height", maxY);
    var height = Math.max(getRelativeHeight(calloutThumb), getRelativeHeight(calloutWeights), getRelativeHeight(d3.select("#network")));
    d3.select(".column.features").style("height", height + "px");
}
function getRelativeHeight(selection) {
    var node = selection.node();
    return node.offsetHeight + node.offsetTop;
}
function addPlusMinusControl(x, layerIdx) {
    var div = d3.select("#network").append("div")
        .classed("plus-minus-neurons", true)
        .style("left", x - 10 + "px");
    var i = layerIdx - 1;
    var firstRow = div.append("div").attr("class", "ui-numNodes" + layerIdx);
    firstRow.append("button")
        .attr("class", "mdl-button mdl-js-button mdl-button--icon")
        .on("click", function () {
        var numNeurons = state.networkShape[i];
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
        .on("click", function () {
        var numNeurons = state.networkShape[i];
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
    var suffix = state.networkShape[i] > 1 ? "s" : "";
    div.append("div").text(state.networkShape[i] + " neuron" + suffix);
}
function updateHoverCard(type, nodeOrLink, coordinates) {
    var hovercard = d3.select("#hovercard");
    if (type == null) {
        hovercard.style("display", "none");
        d3.select("#svg").on("click", null);
        return;
    }
    d3.select("#svg").on("click", function () {
        hovercard.select(".value").style("display", "none");
        var input = hovercard.select("input");
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
    var value = (type === HoverType.WEIGHT) ?
        nodeOrLink.weight :
        nodeOrLink.bias;
    var name = (type === HoverType.WEIGHT) ? "Weight" : "Bias";
    hovercard.style({
        "left": coordinates[0] + 20 + "px",
        "top": coordinates[1] + "px",
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
    var line = container.insert("path", ":first-child");
    var source = node2coord[input.source.id];
    var dest = node2coord[input.dest.id];
    var datum = {
        source: {
            y: source.cx + RECT_SIZE / 2 + 2,
            x: source.cy
        },
        target: {
            y: dest.cx - RECT_SIZE / 2,
            x: dest.cy + ((index - (length - 1) / 2) / length) * 12
        }
    };
    var diagonal = d3.svg.diagonal().projection(function (d) { return [d.y, d.x]; });
    line.attr({
        "marker-start": "url(#markerArrow)",
        "class": "link",
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
        var pathEl = line.node();
        var totalLength = pathEl.getTotalLength();
        var point = pathEl.getPointAtLength(totalLength * 0.35);
        var sliderX = point.x;
        var sliderY_2 = point.y;
        var group = container.append("g")
            .attr("class", "custom-weight-editor-group")
            .attr("id", "custom-weight-editor-" + input.source.id);
        var track = group.append("line")
            .attr({
            x1: sliderX,
            y1: sliderY_2 - 30,
            x2: sliderX,
            y2: sliderY_2 + 30,
            stroke: "#1e293b",
            "stroke-width": 4,
            "stroke-linecap": "round",
            cursor: "pointer"
        });
        var handleColor = input.source.id === "x" ? "#ef4444" : "#8b5cf6";
        var badgeColor = input.source.id === "x" ? "#b91c1c" : "#5b21b6";
        var initialY = sliderY_2 - (input.weight / 5.0) * 30;
        var badge = group.append("g")
            .attr("transform", "translate(" + (sliderX - 60) + ", " + (sliderY_2 - 18) + ")");
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
        var badgeText = badge.append("text")
            .attr("text-anchor", "middle")
            .attr("fill", "white")
            .style("font-family", "'Inter', sans-serif");
        badgeText.append("tspan")
            .attr({ x: 24, y: 14 })
            .style({ "font-size": "8px", "font-weight": "700", "text-transform": "uppercase", "letter-spacing": "0.5px", "opacity": "0.8" })
            .text("Weight");
        var valSpan_2 = badgeText.append("tspan")
            .attr({ x: 24, y: 28 })
            .style({ "font-size": "12px", "font-weight": "800" })
            .text(input.weight.toFixed(1).replace(".", ","));
        var handle_2 = group.append("rect")
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
        var drag = d3.behavior.drag()
            .on("drag", function () {
            var mouseContainer = d3.mouse(container.node());
            var mouseY = mouseContainer[1];
            var newY = Math.max(sliderY_2 - 30, Math.min(sliderY_2 + 30, mouseY));
            var weight = 5.0 - 10.0 * (newY - (sliderY_2 - 30)) / 60.0;
            weight = Math.round(weight * 10) / 10;
            input.weight = weight;
            handle_2.attr("y", (sliderY_2 - (weight / 5.0) * 30) - 3);
            valSpan_2.text(weight.toFixed(1).replace(".", ","));
            if (selectedLinkForSlider === input) {
                weightSlider.property("value", weight);
                weightValue.text(weight.toFixed(2));
            }
            lossTrain = getLoss(network, trainData);
            lossTest = getLoss(network, testData);
            updateUI();
        });
        handle_2.call(drag);
        track.on("click", function () {
            var mouseContainer = d3.mouse(container.node());
            var mouseY = mouseContainer[1];
            var newY = Math.max(sliderY_2 - 30, Math.min(sliderY_2 + 30, mouseY));
            var weight = 5.0 - 10.0 * (newY - (sliderY_2 - 30)) / 60.0;
            weight = Math.round(weight * 10) / 10;
            input.weight = weight;
            handle_2.attr("y", (sliderY_2 - (weight / 5.0) * 30) - 3);
            valSpan_2.text(weight.toFixed(1).replace(".", ","));
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
        nn.forEachNode(network, true, function (node) {
            boundary[node.id] = new Array(DENSITY);
        });
        for (var nodeId in INPUTS) {
            boundary[nodeId] = new Array(DENSITY);
        }
    }
    var xScale = d3.scale.linear().domain([0, DENSITY - 1]).range(xDomain);
    var yScale = d3.scale.linear().domain([DENSITY - 1, 0]).range(xDomain);
    var i = 0, j = 0;
    for (i = 0; i < DENSITY; i++) {
        if (firstTime) {
            nn.forEachNode(network, true, function (node) {
                boundary[node.id][i] = new Array(DENSITY);
            });
            for (var nodeId in INPUTS) {
                boundary[nodeId][i] = new Array(DENSITY);
            }
        }
        for (j = 0; j < DENSITY; j++) {
            var x = xScale(i);
            var y = yScale(j);
            var input = constructInput(x, y);
            nn.forwardProp(network, input);
            nn.forEachNode(network, true, function (node) {
                boundary[node.id][i][j] = node.output;
            });
            if (firstTime) {
                for (var nodeId in INPUTS) {
                    boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y);
                }
            }
        }
    }
}
function getLoss(network, dataPoints) {
    var loss = 0;
    for (var i = 0; i < dataPoints.length; i++) {
        var dataPoint = dataPoints[i];
        var input = constructInput(dataPoint.x, dataPoint.y);
        var output = nn.forwardProp(network, input);
        loss += nn.Errors.SQUARE.error(output, dataPoint.label);
    }
    return loss / dataPoints.length;
}
function updateUI(firstStep) {
    if (firstStep === void 0) { firstStep = false; }
    updateWeightsUI(network, d3.select("g.core"));
    updateBiasesUI(network);
    updateDecisionBoundary(network, firstStep);
    var selectedId = selectedNodeId != null ?
        selectedNodeId : nn.getOutputNode(network).id;
    heatMap.updateBackground(boundary[selectedId], state.discretize);
    d3.select("#network").selectAll("div.canvas")
        .each(function (data) {
        data.heatmap.updateBackground(heatmap_1.reduceMatrix(boundary[data.id], 10), state.discretize);
    });
    function zeroPad(n) {
        var pad = "000000";
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
        var svgG = d3.select("#heatmap svg g");
        var highlightGroup_1 = svgG.select("g.boundary-highlight");
        if (highlightGroup_1.empty()) {
            highlightGroup_1 = svgG.append("g").attr("class", "boundary-highlight");
        }
        else {
            highlightGroup_1.selectAll("*").remove();
        }
        boundaryHistory.forEach(function (histLine, index) {
            var opacity = 0.05 + 0.15 * ((index + 1) / boundaryHistory.length);
            highlightGroup_1.append("line")
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
        var firstHiddenNode = network[1][0];
        var w1 = firstHiddenNode.inputLinks[0].weight;
        var w2 = firstHiddenNode.inputLinks[1].weight;
        var b = firstHiddenNode.bias;
        var linePoints = getBoundaryLinePoints(w1, w2, b);
        if (linePoints.length >= 2) {
            var x1 = heatMap.xScale(linePoints[0][0]);
            var y1 = heatMap.yScale(linePoints[0][1]);
            var x2 = heatMap.xScale(linePoints[1][0]);
            var y2 = heatMap.yScale(linePoints[1][1]);
            highlightGroup_1.append("line")
                .attr({
                x1: x1,
                y1: y1,
                x2: x2,
                y2: y2,
                stroke: "#FF034D",
                "stroke-width": 4
            });
            highlightGroup_1.append("text")
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
                .text("b = " + b.toFixed(2));
        }
    }
}
function constructInputIds() {
    var result = [];
    for (var inputName in INPUTS) {
        if (state[inputName]) {
            result.push(inputName);
        }
    }
    return result;
}
function constructInput(x, y) {
    var input = [];
    for (var inputName in INPUTS) {
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
            var dsKey = state_1.getKeyFromValue(state_1.datasets, state.dataset);
            if (dsKey && !trainedLinearDatasetsExo3[dsKey]) {
                trainedLinearDatasetsExo3[dsKey] = true;
                updateQuadraticFeaturesExo3();
                if (isQuadraticUnlockedExo3()) {
                    showToast("Félicitations ! Vous avez entraîné le modèle sur les 4 jeux de données linéaires. Les entrées X² et Y² sont maintenant déverrouillées !", "success");
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
    trainData.forEach(function (point, i) {
        var input = constructInput(point.x, point.y);
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
}
function getOutputWeights(network) {
    var weights = [];
    for (var layerIdx = 0; layerIdx < network.length - 1; layerIdx++) {
        var currentLayer = network[layerIdx];
        for (var i = 0; i < currentLayer.length; i++) {
            var node = currentLayer[i];
            for (var j = 0; j < node.outputs.length; j++) {
                var output = node.outputs[j];
                weights.push(output.weight);
            }
        }
    }
    return weights;
}
exports.getOutputWeights = getOutputWeights;
function reset(onStartup) {
    if (onStartup === void 0) { onStartup = false; }
    boundaryHistory = [];
    lineChart.reset();
    state.serialize();
    if (!onStartup) {
        userHasInteracted();
    }
    player.pause();
    var suffix = state.numHiddenLayers !== 1 ? "s" : "";
    d3.select("#layers-label").text("Hidden layer" + suffix);
    d3.select("#num-layers").text(state.numHiddenLayers);
    iter = 0;
    var numInputs = constructInput(0, 0).length;
    var shape = [numInputs].concat(state.networkShape).concat([1]);
    var outputActivation = (state.problem === state_1.Problem.REGRESSION) ?
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
}
;
function initTutorial() {
    if (state.tutorial == null || state.tutorial === '' || state.hideText) {
        return;
    }
    d3.selectAll("article div.l--body").remove();
    var tutorial = d3.select("article").append("div")
        .attr("class", "l--body");
    d3.html("tutorials/" + state.tutorial + ".html", function (err, htmlFragment) {
        if (err) {
            throw err;
        }
        tutorial.node().appendChild(htmlFragment);
        var title = tutorial.select("title");
        if (title.size()) {
            d3.select("header h1").style({
                "margin-top": "20px",
                "margin-bottom": "20px"
            })
                .text(title.text());
            document.title = title.text();
        }
    });
}
function drawDatasetThumbnails() {
    function renderThumbnail(canvas, dataGenerator) {
        var w = 100;
        var h = 100;
        canvas.setAttribute("width", w);
        canvas.setAttribute("height", h);
        var context = canvas.getContext("2d");
        var data = dataGenerator(200, 0);
        data.forEach(function (d) {
            context.fillStyle = colorScale(d.label);
            context.fillRect(w * (d.x + 6) / 12, h * (d.y + 6) / 12, 4, 4);
        });
        d3.select(canvas.parentNode).style("display", null);
    }
    d3.selectAll(".dataset").style("display", "none");
    if (state.problem === state_1.Problem.CLASSIFICATION) {
        for (var dataset in state_1.datasets) {
            var canvas = document.querySelector("canvas[data-dataset=" + dataset + "]");
            var dataGenerator = state_1.datasets[dataset];
            if (exoId > 0 && exoId !== 3 && dataGenerator !== state.dataset) {
                continue;
            }
            renderThumbnail(canvas, dataGenerator);
        }
    }
    if (state.problem === state_1.Problem.REGRESSION) {
        for (var regDataset in state_1.regDatasets) {
            var canvas = document.querySelector("canvas[data-regDataset=" + regDataset + "]");
            var dataGenerator = state_1.regDatasets[regDataset];
            if (exoId > 0 && dataGenerator !== state.regDataset) {
                continue;
            }
            renderThumbnail(canvas, dataGenerator);
        }
    }
}
function hideControls() {
    var hiddenProps = state.getHiddenProps();
    hiddenProps.forEach(function (prop) {
        var controls = d3.selectAll(".ui-" + prop);
        if (controls.size() === 0) {
            console.warn("0 html elements found with class .ui-" + prop);
        }
        controls.style("display", "none");
    });
    if (state.numHiddenLayers === 0 && hiddenProps.indexOf("numHiddenLayers") !== -1) {
        d3.select(".column.hidden-layers").style("visibility", "hidden");
    }
    var hideControls = d3.select(".hide-controls");
    HIDABLE_CONTROLS.forEach(function (_a) {
        var text = _a[0], id = _a[1];
        var label = hideControls.append("label")
            .attr("class", "mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect");
        var input = label.append("input")
            .attr({
            type: "checkbox",
            "class": "mdl-checkbox__input"
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
function generateData(firstTime) {
    if (firstTime === void 0) { firstTime = false; }
    if (!firstTime) {
        state.seed = Math.random().toFixed(5);
        state.serialize();
        userHasInteracted();
    }
    Math.seedrandom(state.seed);
    var numSamples = (state.problem === state_1.Problem.REGRESSION) ?
        NUM_SAMPLES_REGRESS : NUM_SAMPLES_CLASSIFY;
    var generator = state.problem === state_1.Problem.CLASSIFICATION ?
        state.dataset : state.regDataset;
    var data = generator(numSamples, state.noise / 100);
    dataset_1.shuffle(data);
    var splitIndex = Math.floor(data.length * state.percTrainData / 100);
    trainData = data.slice(0, splitIndex);
    testData = data.slice(splitIndex);
    heatMap.updatePoints(trainData);
    heatMap.updateTestPoints(state.showTestData ? testData : []);
}
var firstInteraction = true;
var parametersChanged = false;
function userHasInteracted() {
    if (!firstInteraction) {
        return;
    }
    firstInteraction = false;
    var page = 'index';
    if (state.tutorial != null && state.tutorial !== '') {
        page = "/v/tutorials/" + state.tutorial;
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
['mousemove', 'keydown', 'click', 'scroll'].forEach(function (evt) {
    window.addEventListener(evt, function () {
        if (window.parent && window.parent !== window) {
            window.parent.postMessage('USER_ACTIVE_IN_IFRAME', '*');
        }
    }, { passive: true });
});
