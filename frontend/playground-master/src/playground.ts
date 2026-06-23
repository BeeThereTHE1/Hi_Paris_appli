/// <reference types="seedrandom" />
declare var ga: any;
/* Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

import * as nn from "./nn";
import { HeatMap, reduceMatrix } from "./heatmap";
import {
  State,
  datasets,
  regDatasets,
  activations,
  problems,
  regularizations,
  getKeyFromValue,
  Problem
} from "./state";
import { Example2D, shuffle } from "./dataset";
import { AppendingLineChart } from "./linechart";
import * as d3 from 'd3';
//MODOFICATION APPORTER POUR LIER LA VARIABLR EXO UN
import { exo1, initExo1Popups } from "./exos/exo1";
import { exo2, initExo2Popups } from "./exos/exo2";
import { exo3, initExo3Popups } from "./exos/exo3";
import { exo4, initExo4Popups } from "./exos/exo4";
import { exo5, initExo5Popups } from "./exos/exo5";
import { exo6, initExo6Popups } from "./exos/exo6";
import { exo7, initExo7Popups } from "./exos/exo7";
import { exo8, initExo8Popups } from "./exos/exo8";
import { exo9, initExo9Popups } from "./exos/exo9";
import { exo10, initExo10Popups } from "./exos/exo10";
import { exo11, initExo11Popups } from "./exos/exo11";
import { exo12, initExo12Popups } from "./exos/exo12";
import { exo13, initExo13Popups } from "./exos/exo13";
import { exo14, initExo14Popups } from "./exos/exo14";
import { exo15, initExo15Popups } from "./exos/exo15";
import { exo16, initExo16Popups } from "./exos/exo16";
import { exo17, initExo17Popups } from "./exos/exo17";

const params = new URLSearchParams(window.location.search);
let exoIdStr = params.get("exo");
const modelId = params.get("model") || "1";

// -- FALLBACK INTELLIGENT POUR PAGE 2 --
// Si on ne trouve pas d'ID dans l'URL de l'iframe, on regarde l'URL parente
if (!exoIdStr) {
  try {
    const parentPath = window.parent.location.pathname; // ex: "/exo1"
    const match = parentPath.match(/exo(\d+)/);
    if (match) {
      exoIdStr = match[1];
    }
  } catch (e) {
    // Erreur Cross-Origin possible, on ignore silencieusement
  }
}
const exoId = Number(exoIdStr || "0");

d3.select("body").attr("data-exo", exoId);


const exoConfig = exoId === 1 ? exo1 : (exoId === 2 ? exo2 : (exoId === 3 ? exo3 : (exoId === 4 ? exo4 : (exoId === 5 ? exo5 : (exoId === 6 ? exo6 : (exoId === 7 ? exo7 : (exoId === 8 ? exo8 : (exoId === 9 ? exo9 : (exoId === 10 ? exo10 : (exoId === 11 ? exo11 : (exoId === 12 ? exo12 : (exoId === 13 ? exo13 : (exoId === 14 ? exo14 : (exoId === 15 ? exo15 : (exoId === 16 ? exo16 : (exoId === 17 ? exo17 : null))))))))))))))));
//
let mainWidth;

// More scrolling
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

enum HoverType {
  BIAS, WEIGHT
}

interface InputFeature {
  f: (x: number, y: number) => number;
  label?: string;
}

let INPUTS: { [name: string]: InputFeature } = {
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
  private timerIndex = 0;
  private isPlaying = false;
  private callback: (isPlaying: boolean) => void = null;

  /** Plays/pauses the player. */
  playOrPause() {
    if (this.isPlaying) {
      this.isPlaying = false;
      this.pause();
    } else {
      this.isPlaying = true;
      if (iter === 0) {
        simulationStarted();
      }
      this.play();
    }
  }

  onPlayPause(callback: (isPlaying: boolean) => void) {
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

  private start(localTimerIndex: number) {
    d3.timer(() => {
      if (localTimerIndex < this.timerIndex) {
        return true;  // Done.
      }
      oneStep();
      // Tracking pour Exo 7
      if (exoId === 7) {
        const actName = getKeyFromValue(activations, state.activation);
        if (actName && usedActivationsExo7.indexOf(actName) === -1) {
          usedActivationsExo7.push(actName);
        }
      }
      return false;  // Not done.
    }, 0);
  }
}

// Global variable for tracking Exo 7 activations
let usedActivationsExo7: string[] = [];

/** Interface pour les Toasts  */
function showToast(message: string, type: 'success' | 'error' = 'success') {
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

  // Animation Entrée
  setTimeout(() => toast.classList.add('visible'), 10);

  // Auto suppression après 4s
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

let state = State.deserializeState();

// --- CONFIGURATION DE L'EXERCICE (PRIORITÉ ABSOLUE) ---
if (exoId > 0 && exoConfig) {
  // 1. Cacher les contrôles définis dans l'exo
  exoConfig.hiddenControls.forEach((id) => {
    state.setHideProperty(id, true);
  });

  // 2. Forcer l'état (Dataset, Activation, Architecture, etc.)
  for (const key in exoConfig.forcedState) {
    if (exoConfig.forcedState.hasOwnProperty(key)) {
      (state as any)[key] = (exoConfig.forcedState as any)[key];
    }
  }
  // Permettre des surcharges par l'URL (utile pour l'exo 16 double-iframe)
  const urlActivation = params.get("activation");
  if (urlActivation && activations[urlActivation]) {
    state.activation = activations[urlActivation];
  }
  // 3. Synchroniser l'architecture
  state.numHiddenLayers = state.networkShape.length;
}

// Filter out inputs that are hidden.
state.getHiddenProps().forEach(prop => {
  if (prop in INPUTS) {
    delete INPUTS[prop];
  }
});

let boundary: { [id: string]: number[][] } = {};
let selectedNodeId: string = null;
// Plot the heatmap.
let xDomain: [number, number] = [-6, 6];
let heatMap =
  new HeatMap(300, DENSITY, xDomain, xDomain, d3.select("#heatmap"),
    { showAxes: true });
let linkWidthScale = d3.scale.linear()
  .domain([0, 5])
  .range([1, 10])
  .clamp(true);
let colorScale = d3.scale.linear<string, number>()
  .domain([-1, 0, 1])
  .range(["#f59322", "#e8eaeb", "#0877bd"])
  .clamp(true);
let iter = 0;
let trainData: Example2D[] = [];
let testData: Example2D[] = [];
let network: nn.Node[][] = null;
let lossTrain = 0;
let lossTest = 0;
let player = new Player();
let lineChart = new AppendingLineChart(d3.select("#linechart"),
  ["#777", "black"]);

// Snapshot state
let snapshotHeatMap: HeatMap = null;
let snapshotBoundary: number[][] = null;
let snapshotLossTrainVal: number = null;

//
let selectedLinkForSlider: nn.Link = null;
let selectedNodeForBiasSlider: nn.Node = null;

let weightSlider = d3.select("#weight-slider");
let weightValue = d3.select("#weight-value");
let selectedLinkLabel = d3.select("#selected-link-label");

let biasSlider = d3.select("#bias-slider");
let biasValue = d3.select("#bias-value");
let selectedNodeLabel = d3.select("#selected-node-label");
let biasModifiedInExo4 = false;
let weightModifiedInExo4 = false;
let hasTrainedInExo4 = false;

let boundaryHistory: { x1: number; y1: number; x2: number; y2: number; biasValue: number }[] = [];

function getBoundaryLinePoints(w1: number, w2: number, b: number) {
  let points: [number, number][] = [];
  // Check intersection with x1 = -6
  if (Math.abs(w2) > 1e-5) {
    let x2 = (6 * w1 - b) / w2;
    if (x2 >= -6 && x2 <= 6) points.push([-6, x2]);
  }
  // Check intersection with x1 = 6
  if (Math.abs(w2) > 1e-5) {
    let x2 = (-6 * w1 - b) / w2;
    if (x2 >= -6 && x2 <= 6) points.push([6, x2]);
  }
  // Check intersection with x2 = -6
  if (Math.abs(w1) > 1e-5) {
    let x1 = (6 * w2 - b) / w1;
    if (x1 >= -6 && x1 <= 6) {
      if (!points.some(p => Math.abs(p[0] - x1) < 1e-4 && Math.abs(p[1] - (-6)) < 1e-4)) {
        points.push([x1, -6]);
      }
    }
  }
  // Check intersection with x2 = 6
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

let trainedLinearDatasetsExo3: {[key: string]: boolean} = {};

function isQuadraticUnlockedExo3(): boolean {
  if (exoId !== 3) return true;
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
  } else {
    msgBoxLinear.style("display", "none");
    msgBoxQuadratic.style("display", "block");
  }
}

function initExo3Boxes() {
  if (exoId !== 3) return;

  // 1. Box Step 1 under datasets selector
  const datasetDiv = d3.select(".ui-dataset");
  datasetDiv.selectAll("#msg-box-linear").remove();
  
  const msgBoxLinear = datasetDiv.append("div")
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
    
  msgBoxLinear.html(`
    <strong>💡 Étape 1 :</strong> Entraîne le modèle sur chaque jeu de données (X et Y) pour observer ses limites.<br>
    <span style="font-size: 12px; color: #94a3b8;">Progression : <span id="msg-box-linear-count" style="font-weight: bold; color: #FF034D;">0</span> / 4 jeux de données entraînés.</span>
  `);

  // 2. Box Step 2 under the network SVG
  const networkDiv = d3.select("#network");
  networkDiv.selectAll("#msg-box-quadratic").remove();

  const msgBoxQuadratic = networkDiv.insert("div", "#hovercard")
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
    
  msgBoxQuadratic.html(`
    <strong>🎉 Étape 2 :</strong> Maintenant, active les caractéristiques <strong>X²</strong> et <strong>Y²</strong> et entraîne à nouveau pour réussir la classification !
  `);

  updateQuadraticFeaturesExo3();
}

function makeGUI() {
  // Slider pour modifier le poids
  weightSlider.on("input", function () {
    if (!selectedLinkForSlider) return;

    let newWeight = +(this as HTMLInputElement).value;
    selectedLinkForSlider.weight = newWeight;

    weightValue.text(newWeight.toFixed(2));

    if (exoId === 4) {
      weightModifiedInExo4 = true;
    }

    lossTrain = getLoss(network, trainData);
    lossTest = getLoss(network, testData);
    updateUI();
  });

  // Slider pour modifier le biais
  biasSlider.on("input", function () {
    if (!selectedNodeForBiasSlider) return;

    let newBias = +(this as HTMLInputElement).value;
    selectedNodeForBiasSlider.bias = newBias;

    biasValue.text(newBias.toFixed(2));

    if (exoId === 4) {
      biasModifiedInExo4 = true;
    }

    lossTrain = getLoss(network, trainData);
    lossTest = getLoss(network, testData);
    updateUI();
  });

  // Logique pour le Seed personnalisé
  const seedInput = d3.select("#seed-input");
  const regenSeedBtn = d3.select("#regenerate-seed");
  const seedStatus = d3.select("#seed-status");

  // Initialiser la valeur du champ avec le seed actuel
  seedInput.property("value", state.seed);

  seedInput.on("input", function () {
    state.seed = (this as HTMLInputElement).value;
    state.serialize();
    (Math as any).seedrandom(state.seed);

    // Afficher un petit indicateur de succès temporaire
    seedStatus.style("display", "inline");
    setTimeout(() => seedStatus.style("display", "none"), 1000);

    reset();
  });

  regenSeedBtn.on("click", () => {
    state.seed = Math.random().toFixed(5);
    seedInput.property("value", state.seed);
    state.serialize();
    (Math as any).seedrandom(state.seed);

    // Animation de rotation du bouton
    regenSeedBtn.select("i").style("transition", "transform 0.5s ease-in-out")
      .style("transform", "rotate(360deg)");
    setTimeout(() => regenSeedBtn.select("i").style("transform", "rotate(0deg)"), 500);

    reset();
  });

  // Valeurs par défaut pour TOUS les exercices si un exo est actif
  if (exoId > 0 && exoId !== 9 && exoId !== 10 && exoId !== 11 && exoId !== 12 && exoId !== 13 && exoId !== 14 && exoId !== 15 && exoId !== 16 && exoId !== 17) {
    state.learningRate = 0.03;
    state.regularization = null;
    state.percTrainData = 50;
    state.noise = 0;
    state.batchSize = 10;
  }

  // Introduction Popup Logic
  // Afficher la popup "Common" de façon universelle sur tous les exercices, ou sur le tutorial custom
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
    // Change the button's content.
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
    let newDataset = datasets[this.dataset.dataset];
    if (newDataset === state.dataset) {
      return; // No-op.
    }
    state.dataset = newDataset;
    dataThumbnails.classed("selected", false);
    d3.select(this).classed("selected", true);
    generateData();
    parametersChanged = true;
    reset();
  });

  let datasetKey = getKeyFromValue(datasets, state.dataset);
  // Select the dataset according to the current state.
  d3.select(`canvas[data-dataset=${datasetKey}]`)
    .classed("selected", true);

  let regDataThumbnails = d3.selectAll("canvas[data-regDataset]");
  regDataThumbnails.on("click", function () {
    let newDataset = regDatasets[this.dataset.regdataset];
    if (newDataset === state.regDataset) {
      return; // No-op.
    }
    state.regDataset = newDataset;
    regDataThumbnails.classed("selected", false);
    d3.select(this).classed("selected", true);
    generateData();
    parametersChanged = true;
    reset();
  });

  let regDatasetKey = getKeyFromValue(regDatasets, state.regDataset);
  // Select the dataset according to the current state.
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
  // Check/uncheck the checkbox according to the current state.
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
  // Check/uncheck the checbox according to the current state.
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
    } else {
      state.noise = 50;
    }
  } else if (state.noise < 0) {
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
    state.activation = activations[this.value];
    parametersChanged = true;
    reset();
  });
  activationDropdown.property("value",
    getKeyFromValue(activations, state.activation));

  let learningRate = d3.select("#learningRate").on("change", function () {
    state.learningRate = +this.value;
    state.serialize();
    userHasInteracted();
    parametersChanged = true;
  });
  learningRate.property("value", state.learningRate);

  let regularDropdown = d3.select("#regularizations").on("change",
    function () {
      state.regularization = regularizations[this.value];
      parametersChanged = true;
      reset();
    });
  regularDropdown.property("value",
    getKeyFromValue(regularizations, state.regularization));

  let regularRate = d3.select("#regularRate").on("change", function () {
    state.regularizationRate = +this.value;
    parametersChanged = true;
    reset();
  });
  regularRate.property("value", state.regularizationRate);

  let problem = d3.select("#problem").on("change", function () {
    state.problem = problems[this.value];
    generateData();
    drawDatasetThumbnails();
    parametersChanged = true;
    reset();
  });
  problem.property("value", getKeyFromValue(problems, state.problem));

  // Add scale to the gradient color map.
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

  // Listen for css-responsive changes and redraw the svg network.

  window.addEventListener("resize", () => {
    let newWidth = document.querySelector("#main-part")
      .getBoundingClientRect().width;
    if (newWidth !== mainWidth) {
      mainWidth = newWidth;
      drawNetwork(network);
      updateUI(true);
    }
  });

  // Hide the text below the visualization depending on the URL.
  if (state.hideText) {
    d3.select("#article-text").style("display", "none");
    d3.select("div.more").style("display", "none");
    d3.select("header").style("display", "none");
  }

  // Exo 1 Popup Logic — délégué à exo1.ts
  if (exoId === 1) {
    initExo1Popups();
  }

  // Exo 2 Popup Logic
  if (exoId === 2) {
    initExo2Popups();
  }

  // Exo 3 Popup Logic
  if (exoId === 3) {
    initExo3Popups();
  }

  // Exo 4 Popup Logic
  if (exoId === 4) {
    initExo4Popups();
  }

  // Exo 5 Popup Logic
  if (exoId === 5) {
    initExo5Popups();
  }

  // Exo 6 Popup Logic
  if (exoId === 6) {
    initExo6Popups();
  }
  if (exoId === 7) {
    initExo7Popups();
  }
  if (exoId === 8) {
    initExo8Popups();
  }
  if (exoId === 9) {
    initExo9Popups();
  }
  if (exoId === 10) {
    initExo10Popups();
  }
  if (exoId === 11) {
    initExo11Popups();
  }
  if (exoId === 12) {
    initExo12Popups();
  }
  if (exoId === 13) {
    initExo13Popups();
  }
  if (exoId === 14) {
    initExo14Popups();
  }
  if (exoId === 15) {
    initExo15Popups();
  }
  if (exoId === 16) {
    initExo16Popups();
  }
  if (exoId === 17) {
    initExo17Popups();
  }

  // Logique de validation de l'exercice : condition de réussite (caché pour les étudidants)
  d3.select("#validate-button").on("click", () => {
    let success = false;
    let message = "";

    if (exoId === 1 || exoId === 2) {
      if (lossTrain < 0.001) {
        success = true;
      } else {
        message = "Veillez relire la consigne! 😤";
      }
    } else if (exoId === 3) {
      const isCircle = getKeyFromValue(datasets, state.dataset) === "circle";
      const hasCorrectFeatures = state.x && state.y && state.xSquared && state.ySquared && 
        !state.xTimesY && !state.sinX && !state.sinY;
      const noHidden = state.numHiddenLayers === 0;

      if (!isQuadraticUnlockedExo3()) {
        message = "Vous devez d'abord entraîner le modèle sur les 4 jeux de données en mode linéaire.";
      } else if (!isCircle) {
        message = "Veuillez sélectionner le jeu de données Cercle.";
      } else if (!hasCorrectFeatures) {
        message = "Activez uniquement les caractéristiques X, Y, X² et Y².";
      } else if (!noHidden) {
        message = "Veuillez configurer le réseau sans aucune couche cachée (0 couche cachée).";
      } else if (iter < 1000) {
        message = "L'entraînement doit atteindre au moins 1000 époques (Epochs).";
      } else if (lossTrain >= 0.005) {
        message = "La perte d'entraînement (loss) doit être inférieure à 0.005.";
      } else {
        success = true;
      }
    } else if (exoId === 7) {
      // Condition Exo 7 : Toutes les fonctions d'activation testées
      if (usedActivationsExo7.length >= 4) {
        success = true;
      } else {
        const testees = usedActivationsExo7.join(", ");
        message = "Veillez relire la consigne! 😤";
      }
    } else if (exoId === 4) {
      let firstHiddenNode = network[1][0];
      if (!hasTrainedInExo4 || lossTrain >= 0.01) {
        message = "Veillez relire la consigne! 😤";
      } else if (!biasModifiedInExo4) {
        message = "Modify the bias neuron.";
      } else if (Math.abs(firstHiddenNode.bias) <= 0.5) {
        message = "The bias must be greater than 0.5 in absolute value.";
      } else {
        success = true;
      }
    } else if (exoId === 5) {
      if (lossTrain < 0.005) {
        success = true;
      } else {
        message = "Veillez relire la consigne! 😤";
      }
    } else if (exoId === 6) {
      if (lossTrain < 0.015) {
        success = true;
      } else {
        message = "Veillez relire la consigne! 😤";
      }
    } else if (exoId === 9 || exoId === 10) {
      if (!snapshotBoundary) {
        message = "Cliquez sur double run afin de comparer";
      } else {
        const diff = Math.abs(lossTrain - snapshotLossTrainVal);
        if (diff < 0.01) {
          success = true;
        } else {
          message = `Les pertes doivent être identiques ou très proches (diff < 0.01)}`;
        }
      }
    } else if (exoId === 8) {
      if (!compareUsedInExo8) {
        message = "Veillez relire la consigne! 😤";
      } else if (!postSnapshotRunInExo8) {
        message = "Now run again";
      } else {
        success = true;
      }
    } else if (exoId === 11) {
      if (runsCountExo11 < 2) {
        message = "Plusieurs runs doivent être faits.";
      } else if (!divergenceObservedExo11) {
        message = "Au moins un cas de divergence du learning rate doit être observé.";
      } else {
        success = true;
      }
    } else if (exoId === 12) {
      if (divergenceObservedExo12) {
        success = true;
      } else {
        message = "Les courbes de perte d'entraînement et de test doivent diverger d'au moins 0,005.";
      }
    } else if (exoId === 13 || exoId === 14 || exoId === 15 || exoId === 16) {
      success = true;
    } else {
      if (lossTrain < 0.1) {
        success = true;
      } else {
        message = "Exercice non validé";
      }
    }

    const msgDiv = d3.select("#validation-message");
    msgDiv.classed("show", false); // Hide then show for animation

    //permet d'afficher le message de réussite ou d'erreur
    setTimeout(() => {
      if (success) {
        showToast("✨ Félicitations ! Exercice validé.", "success");

        // On garde l'affichage interne pour la structure
        msgDiv.text("Congratulation !")
          .classed("success", true)
          .classed("error", false)
          .classed("show", true);

        // Envoyer le signal de réussite au parent (exoX.html)
        if (window.parent) {
          window.parent.postMessage({ type: 'EXO_SUCCESS', exoId: exoId }, '*');
        }
      } else {
        showToast(message || "Exercice non validé", "error");

        msgDiv.text("Echec")
          .classed("success", false)
          .classed("error", true)
          .classed("show", true);
      }
    }, 50);
  });

  // Snapshot / Compare Logic
  d3.select("#snapshot-button").on("click", () => {
    // Reveal comparison area
    d3.select("#compare-area").style("display", "block");

    if (exoId === 8) {
      compareUsedInExo8 = true;
    }

    // Capture current state
    const outputId = selectedNodeId != null ?
      selectedNodeId : nn.getOutputNode(network).id;
    const currentBoundary = boundary[outputId];

    // Deep copy the boundary matrix
    snapshotBoundary = currentBoundary.map(column => [...column]);
    snapshotLossTrainVal = lossTrain;

    // Update metrics in UI
    d3.select("#snapshot-iter").text(iter);
    d3.select("#snapshot-loss-train").text(lossTrain.toFixed(3));
    d3.select("#snapshot-loss-test").text(lossTest.toFixed(3));

    // Initialize snapshot heatmap if not already done
    if (!snapshotHeatMap) {
      // We use a slightly smaller size (200px) or keep 300px? 
      // Let's use 250px to fit better if needed, but 300px is the standard.
      // The container #snapshot-heatmap is where it goes.
      snapshotHeatMap = new HeatMap(250, DENSITY, xDomain, xDomain, d3.select("#snapshot-heatmap"), { noSvg: false });
    }

    // Update the snapshot heatmap background
    snapshotHeatMap.updateBackground(snapshotBoundary, state.discretize);
    snapshotHeatMap.updatePoints(trainData);
    snapshotHeatMap.updateTestPoints(state.showTestData ? testData : []);

    // Auto-scroll to show the comparison if it's below
    window.scrollTo({
      top: document.getElementById("compare-area").offsetTop - 20,
      behavior: "smooth"
    });
  });

  d3.select("#clear-snapshot").on("click", () => {
    d3.select("#compare-area").style("display", "none");
    snapshotBoundary = null;
    // We don't necessarily need to destroy the snapshotHeatMap object, just hide the area.
  });

  hideControls();
}

function updateBiasesUI(network: nn.Node[][]) {
  nn.forEachNode(network, true, node => {
    d3.select(`rect#bias-${node.id}`).style("fill", colorScale(node.bias));
  });
}

function updateWeightsUI(network: nn.Node[][], container) {
  for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
    let currentLayer = network[layerIdx];
    // Update all the nodes in this layer.
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

function drawNode(cx: number, cy: number, nodeId: string, isInput: boolean,
  container, node?: nn.Node) {
  let x = cx - RECT_SIZE / 2;
  let y = cy - RECT_SIZE / 2;

  let nodeGroup = container.append("g")
    .attr({
      "class": "node",
      "id": `node${nodeId}`,
      "transform": `translate(${x},${y})`
    });

  // Draw the main rectangle.
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
    // Draw the input label.
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
    } else {
      text.append("tspan").text(label);
    }
    nodeGroup.classed(activeOrNotClass, true);
  }
  if (!isInput) {
    if (exoId === 4) {
      // Draw the custom bias editor inside container (SVG space)
      let sliderX = cx - 38;
      let sliderY = cy + 85; // positioned below the node's canvas
      
      let biasGroup = container.append("g")
        .attr("class", "custom-weight-editor-group")
        .attr("id", "custom-bias-editor-group");

      // Track line
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

      // Badge (rounded rect)
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

      // Handle (thumb)
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

      // Drag behavior
      let drag = (d3.behavior as any).drag()
        .on("drag", function () {
          let mouseContainer = d3.mouse(container.node());
          let mouseY = mouseContainer[1];
          let newY = Math.max(sliderY - 30, Math.min(sliderY + 30, mouseY));
          let bias = 5.0 - 10.0 * (newY - (sliderY - 30)) / 60.0;
          bias = Math.round(bias * 100) / 100;

          // Track changes for ghost boundaries
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

            // Sync with default bias slider
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
    } else {
      // Draw the default node's bias.
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

          selectedNodeLabel.text(
            "Neurone : " + node.id
          );
          biasSlider.property("value", node.bias);
          biasValue.text((+node.bias).toFixed(2));
          console.log("biais séléctionné:", node.id, "bias = ", node.bias);
        });
    }
  }

  // Draw the node's canvas.
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
      heatMap.updateBackground(boundary[nn.getOutputNode(network).id],
        state.discretize);
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
    } else {
      div.style("cursor", "pointer");
      div.style("opacity", null);
      nodeGroup.style("opacity", null);
    }
  }
  if (isInput) {
    div.classed(activeOrNotClass, true);
  }
  let nodeHeatMap = new HeatMap(RECT_SIZE, DENSITY / 10, xDomain,
    xDomain, div, { noSvg: true });
  div.datum({ heatmap: nodeHeatMap, id: nodeId });

}

// Draw network
function drawNetwork(network: nn.Node[][]): void {
  let svg = d3.select("#svg");
  // Remove all svg elements.
  svg.select("g.core").remove();
  // Remove all div elements.
  d3.select("#network").selectAll("div.canvas").remove();
  d3.select("#network").selectAll("div.plus-minus-neurons").remove();

  // Get the width of the svg container.
  let padding = 3;
  let co = d3.select(".column.output").node() as HTMLDivElement;
  let cf = d3.select(".column.features").node() as HTMLDivElement;
  let width = co.offsetLeft - cf.offsetLeft;
  svg.attr("width", width);

  // Map of all node coordinates.
  let node2coord: { [id: string]: { cx: number, cy: number } } = {};
  let container = svg.append("g")
    .classed("core", true)
    .attr("transform", `translate(${padding},${padding})`);
  // Draw the network layer by layer.
  let numLayers = network.length;
  let featureWidth = 118;
  let layerScale = d3.scale.ordinal<number, number>()
    .domain(d3.range(1, numLayers - 1))
    .rangePoints([featureWidth, width - RECT_SIZE], 0.7);
  let spacing = exoId === 1 ? 100 : 25;
  let nodeIndexScale = (nodeIndex: number) => nodeIndex * (RECT_SIZE + spacing);


  let calloutThumb = d3.select(".callout.thumbnail").style("display", "none");
  let calloutWeights = d3.select(".callout.weights").style("display", "none");
  let idWithCallout = null;
  let targetIdWithCallout = null;

  // Draw the input layer separately.
  let cx = RECT_SIZE / 2 + 50;
  let nodeIds = Object.keys(INPUTS);
  let maxY = nodeIndexScale(nodeIds.length);
  nodeIds.forEach((nodeId, i) => {
    let cy = nodeIndexScale(i) + RECT_SIZE / 2;
    node2coord[nodeId] = { cx, cy };
    drawNode(cx, cy, nodeId, true, container);
  });

  // Draw the intermediate layers.
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

      // Show callout to thumbnails.
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

      // Draw links.
      for (let j = 0; j < node.inputLinks.length; j++) {
        let link = node.inputLinks[j];
        let path: SVGPathElement = drawLink(link, node2coord, network,
          container, j === 0, j, node.inputLinks.length).node() as any;
        // Show callout to weights.
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

  // Draw the output node separately.
  cx = width + RECT_SIZE / 2;
  let node = network[numLayers - 1][0];
  let cy = (exoId === 1) ? (nodeIndexScale(nodeIds.length - 1) + RECT_SIZE) / 2 : (nodeIndexScale(0) + RECT_SIZE / 2);
  node2coord[node.id] = { cx, cy };
  // Draw links.
  for (let i = 0; i < node.inputLinks.length; i++) {
    let link = node.inputLinks[i];
    drawLink(link, node2coord, network, container, i === 0, i,
      node.inputLinks.length);
  }
  // Adjust the height of the svg.
  if (exoId === 4) {
    maxY = Math.max(maxY, 160);
  }
  svg.attr("height", maxY);

  // Adjust the height of the features column.
  let height = Math.max(
    getRelativeHeight(calloutThumb),
    getRelativeHeight(calloutWeights),
    getRelativeHeight(d3.select("#network"))
  );
  d3.select(".column.features").style("height", height + "px");
}

function getRelativeHeight(selection) {
  let node = selection.node() as HTMLAnchorElement;
  return node.offsetHeight + node.offsetTop;
}

function addPlusMinusControl(x: number, layerIdx: number) {
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
  div.append("div").text(
    state.networkShape[i] + " neuron" + suffix
  );
}

function updateHoverCard(type: HoverType, nodeOrLink?: nn.Node | nn.Link,
  coordinates?: [number, number]) {
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
          (nodeOrLink as nn.Link).weight = +this.value;
        } else {
          (nodeOrLink as nn.Node).bias = +this.value;
        }
        updateUI();
      }
    });
  });
  let value = (type === HoverType.WEIGHT) ?
    (nodeOrLink as nn.Link).weight :
    (nodeOrLink as nn.Node).bias;
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

function drawLink(
  input: nn.Link, node2coord: { [id: string]: { cx: number, cy: number } },
  network: nn.Node[][], container,
  isFirst: boolean, index: number, length: number) {
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

  // Add an invisible thick link that will be used for
  // showing the weight value on hover, and for capturing clicks.
  container.append("path")
    .attr("d", diagonal(datum, 0))
    .attr("class", "link-hover")
    .on("mouseenter", function () {
      updateHoverCard(HoverType.WEIGHT, input, d3.mouse(this));
    }).on("mouseleave", function () {
      updateHoverCard(null);
    }).on("click", function () {
      selectedLinkForSlider = input;

      selectedLinkLabel.text(
        "Lien : " + input.source.id + " → " + input.dest.id
      );
      weightSlider.property("value", input.weight);
      weightValue.text((+input.weight).toFixed(2));
      console.log("lien séléctionné:", input.source.id, "->", input.dest.id, "weight = ", input.weight);
    });

  if (exoId === 1) {
    let pathEl = line.node() as SVGPathElement;
    let totalLength = pathEl.getTotalLength();
    let point = pathEl.getPointAtLength(totalLength * 0.35); // 35% along the path
    let sliderX = point.x;
    let sliderY = point.y;

    let group = container.append("g")
      .attr("class", "custom-weight-editor-group")
      .attr("id", `custom-weight-editor-${input.source.id}`);

    // Track
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

    // Determine colors based on source node
    let handleColor = input.source.id === "x" ? "#ef4444" : "#8b5cf6";
    let badgeColor = input.source.id === "x" ? "#b91c1c" : "#5b21b6";

    // Handle initial position
    let initialY = sliderY - (input.weight / 5.0) * 30;

    // Value Display Badge (rounded rect)
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

    // Handle (thumb)
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

    // Drag behavior
    let drag = (d3.behavior as any).drag()
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
    
    // Allow clicking track to set weight
    track.on("click", function() {
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

/**
 * Given a neural network, it asks the network for the output (prediction)
 * of every node in the network using inputs sampled on a square grid.
 * It returns a map where each key is the node ID and the value is a square
 * matrix of the outputs of the network for each input in the grid respectively.
 */
function updateDecisionBoundary(network: nn.Node[][], firstTime: boolean) {
  if (firstTime) {
    boundary = {};
    nn.forEachNode(network, true, node => {
      boundary[node.id] = new Array(DENSITY);
    });
    // Go through all predefined inputs.
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
      // Go through all predefined inputs.
      for (let nodeId in INPUTS) {
        boundary[nodeId][i] = new Array(DENSITY);
      }
    }
    for (j = 0; j < DENSITY; j++) {
      // 1 for points inside the circle, and 0 for points outside the circle.
      let x = xScale(i);
      let y = yScale(j);
      let input = constructInput(x, y);
      nn.forwardProp(network, input);
      nn.forEachNode(network, true, node => {
        boundary[node.id][i][j] = node.output;
      });
      if (firstTime) {
        // Go through all predefined inputs.
        for (let nodeId in INPUTS) {
          boundary[nodeId][i][j] = INPUTS[nodeId].f(x, y);
        }
      }
    }
  }
}

function getLoss(network: nn.Node[][], dataPoints: Example2D[]): number {
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
  // Update the links visually.
  updateWeightsUI(network, d3.select("g.core"));
  // Update the bias values visually.
  updateBiasesUI(network);
  // Get the decision boundary of the network.
  updateDecisionBoundary(network, firstStep);
  let selectedId = selectedNodeId != null ?
    selectedNodeId : nn.getOutputNode(network).id;
  heatMap.updateBackground(boundary[selectedId], state.discretize);

  // Update all decision boundaries.
  d3.select("#network").selectAll("div.canvas")
    .each(function (data: { heatmap: HeatMap, id: string }) {
      data.heatmap.updateBackground(reduceMatrix(boundary[data.id], 10),
        state.discretize);
    });

  function zeroPad(n: number): string {
    let pad = "000000";
    return (pad + n).slice(-pad.length);
  }

  function addCommas(s: string): string {
    return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function humanReadable(n: number): string {
    return n.toFixed(3);
  }

  // Update loss and iteration number.
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
    } else {
      highlightGroup.selectAll("*").remove();
    }

    // 1. Draw ghost boundaries from history
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

    // 2. Draw current boundary line
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


function constructInputIds(): string[] {
  let result: string[] = [];
  for (let inputName in INPUTS) {
    if (state[inputName]) {
      result.push(inputName);
    }
  }
  return result;
}

function constructInput(x: number, y: number): number[] {
  let input: number[] = [];
  for (let inputName in INPUTS) {
    if (state[inputName]) {
      input.push(INPUTS[inputName].f(x, y));
    }
  }
  return input;
}

function oneStep(): void {
  iter++;

  if (exoId === 6 && state.numHiddenLayers === 0 && iter === 300) {
    player.pause();
    if (window.parent) {
      window.parent.postMessage({ type: 'EXO6_EPOCH_300' }, '*');
    }
  }

  // Record training activity for Exercise 3
  if (exoId === 3) {
    if (state.x && state.y && !state.xSquared && !state.ySquared && !state.xTimesY && !state.sinX && !state.sinY) {
      let dsKey = getKeyFromValue(datasets, state.dataset);
      if (dsKey && !trainedLinearDatasetsExo3[dsKey]) {
        trainedLinearDatasetsExo3[dsKey] = true;
        updateQuadraticFeaturesExo3();
        if (isQuadraticUnlockedExo3()) {
          showToast("Félicitations ! Vous avez entraîné le modèle sur les 4 jeux de données linéaires. Les entrées X² et Y² sont maintenant déverrouillées !", "success");
        }
      }
    }
  }

  // Record training activity for Exercise 4
  if (exoId === 4) {
    hasTrainedInExo4 = true;
  }


  // Record post-snapshot activity for Exercise 8
  if (exoId === 8 && compareUsedInExo8) {
    postSnapshotRunInExo8 = true;
  }

  // Tracking pour Exo 11
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
  // Compute the loss.
  lossTrain = getLoss(network, trainData);
  lossTest = getLoss(network, testData);

  // Tracking divergence IMMEDIATEMENT après calcul (avant l'UI qui peut crasher sur NaN)
  if (exoId === 11) {
    if (lossTrain > 1.000) {
      divergenceObservedExo11 = true;
    }
  }

  // Tracking pour Exo 12 (divergence train/test)
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
}

export function getOutputWeights(network: nn.Node[][]): number[] {
  let weights: number[] = [];
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

  // Make a simple network.
  iter = 0;
  let numInputs = constructInput(0, 0).length;
  let shape = [numInputs].concat(state.networkShape).concat([1]);
  let outputActivation = (state.problem === Problem.REGRESSION) ?
    nn.Activations.LINEAR : nn.Activations.TANH;
  network = nn.buildNetwork(shape, state.activation, outputActivation,
    state.regularization, constructInputIds(), state.initZero);
  lossTrain = getLoss(network, trainData);
  lossTest = getLoss(network, testData);

  // Vérifier la divergence dès le reset
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
};

function initTutorial() {
  if (state.tutorial == null || state.tutorial === '' || state.hideText) {
    return;
  }
  // Remove all other text.
  d3.selectAll("article div.l--body").remove();
  let tutorial = d3.select("article").append("div")
    .attr("class", "l--body");
  // Insert tutorial text.
  d3.html(`tutorials/${state.tutorial}.html`, (err, htmlFragment) => {
    if (err) {
      throw err;
    }
    tutorial.node().appendChild(htmlFragment);
    // If the tutorial has a <title> tag, set the page title to that.
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

  if (state.problem === Problem.CLASSIFICATION) {
    for (let dataset in datasets) {
      let canvas: any =
        document.querySelector(`canvas[data-dataset=${dataset}]`);
      let dataGenerator = datasets[dataset];
      if (exoId > 0 && exoId !== 3 && exoId !== 7 && dataGenerator !== state.dataset) {
        continue;
      }
      renderThumbnail(canvas, dataGenerator);
    }
  }
  if (state.problem === Problem.REGRESSION) {
    for (let regDataset in regDatasets) {
      let canvas: any =
        document.querySelector(`canvas[data-regDataset=${regDataset}]`);
      let dataGenerator = regDatasets[regDataset];
      if (exoId > 0 && dataGenerator !== state.regDataset) {
        continue;
      }
      renderThumbnail(canvas, dataGenerator);
    }
  }
}

function hideControls() {
  // Set display:none to all the UI elements that are hidden.
  let hiddenProps = state.getHiddenProps();
  hiddenProps.forEach(prop => {
    let controls = d3.selectAll(`.ui-${prop}`);
    if (controls.size() === 0) {
      console.warn(`0 html elements found with class .ui-${prop}`);
    }
    controls.style("display", "none");
  });

  // Special case: if 0 layers and locked, make the column invisible but keep its space (layout)
  if (state.numHiddenLayers === 0 && hiddenProps.indexOf("numHiddenLayers") !== -1) {
    d3.select(".column.hidden-layers").style("visibility", "hidden");
  }

  // Also add checkbox for each hidable control in the "use it in classrom"
  // section.
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
    // Change the seed.
    state.seed = Math.random().toFixed(5);
    state.serialize();
    userHasInteracted();
  }
  // Math.seedrandom(state.seed); version qui fait planter le code . A revoir si besoinn derenplace la source
  (Math as any).seedrandom(state.seed);
  let numSamples = (state.problem === Problem.REGRESSION) ?
    NUM_SAMPLES_REGRESS : NUM_SAMPLES_CLASSIFY;
  let generator = state.problem === Problem.CLASSIFICATION ?
    state.dataset : state.regDataset;
  let data = generator(numSamples, state.noise / 100);
  // Shuffle the data in-place.
  shuffle(data);
  // Split into train and test data.
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

// --- POST-INITIALIZATION SYNC FOR EXERCISES ---
if (exoId > 0 && exoConfig) {
  // Sync dropdowns/controls with state that might have been forced
  d3.select("#learningRate").property("value", state.learningRate);
  d3.select("#activations").property("value", getKeyFromValue(activations, state.activation));
  d3.select("#batchSize").property("value", state.batchSize);
  d3.select("#noise").property("value", state.noise);
  d3.select("#percTrainData").property("value", state.percTrainData);
  d3.select("#regularizations").property("value", getKeyFromValue(regularizations, state.regularization));

  // Re-generate data to match noise/split
  generateData(true);
  reset(true);
}

// Upgrade MDL components for interactivity
if (typeof (window as any).componentHandler !== 'undefined') {
  (window as any).componentHandler.upgradeDom();
}

// --- SYSTEME DE DECONNEXION : Propager l'activité à la page parente ---
['mousemove', 'keydown', 'click', 'scroll'].forEach(evt => {
  window.addEventListener(evt, () => {
    // Si on est dans un iframe, on prévient la page mère qu'on est actif
    if (window.parent && window.parent !== window) {
      window.parent.postMessage('USER_ACTIVE_IN_IFRAME', '*');
    }
  }, { passive: true });
});