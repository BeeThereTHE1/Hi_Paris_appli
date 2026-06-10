import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo5 = {
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
    dataset: datasets["circle"],
    activation: activations["sigmoid"],
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

/**
 * Initialise la popup d'introduction de l'exercice 5 (2 pages).
 */
export function initExo5Popups(): void {
  const overlay = d3.select("#exo5-popup-overlay");
  const page1 = d3.select("#exo5-page1");
  const page2 = d3.select("#exo5-page2");

  overlay.style("display", "flex");

  d3.select("#exo5-next-btn1").on("click", () => {
    page1.style("display", "none");
    page2.style("display", "block");
  });

  d3.select("#exo5-next-btn2").on("click", () => {
    overlay.style("display", "none");
  });
}