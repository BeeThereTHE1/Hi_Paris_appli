import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo4 = {
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
    "biasEditor",
    "doubleRunButton",
    "seedControl"
  ],

  forcedState: {
    dataset: datasets["gauss"],
    activation: activations["sigmoid"],
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


/**
 * Initialise la popup d'introduction de l'exercice 4 (2 pages).
 */
export function initExo4Popups(): void {
  const overlay = d3.select("#exo4-popup-overlay");
  const page1 = d3.select("#exo4-page1");
  const page2 = d3.select("#exo4-page2");

  overlay.style("display", "flex");

  d3.select("#exo4-next-btn1").on("click", () => {
    page1.style("display", "none");
    page2.style("display", "block");
  });

  d3.select("#exo4-next-btn2").on("click", () => {
    overlay.style("display", "none");
  });
}
