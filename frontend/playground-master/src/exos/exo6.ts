import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo6 = {
  hiddenControls: [
    "learningRate",
    "activation",
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
    dataset: datasets["circle"],
    activation: activations["sigmoid"],
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
    sinY: false
  }
};

/**
 * Initialise la popup d'introduction de l'exercice 6 (2 pages).
 */
export function initExo6Popups(): void {
  const overlay = d3.select("#exo6-popup-overlay");
  const page1 = d3.select("#exo6-page1");
  const page2 = d3.select("#exo6-page2");

  overlay.style("display", "flex");

  d3.select("#exo6-next-btn1").on("click", () => {
    page1.style("display", "none");
    page2.style("display", "block");
  });

  d3.select("#exo6-next-btn2").on("click", () => {
    overlay.style("display", "none");
  });
}
