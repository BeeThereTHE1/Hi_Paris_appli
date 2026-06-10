import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo3 = {
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
    "biasEditor",
    "doubleRunButton",
    "seedControl",
    "testLoss"
  ],

  forcedState: {
    dataset: datasets["circle"],
    activation: activations["sigmoid"],
    numHiddenLayers: 0,
    //neuronsPerLayer: 3,
    networkShape: [],
    x: true,
    y: true,
    xTimesY: false,
    xSquared: false,
    ySquared: false,
    cosX: false,
    sinX: false,
    cosY: false,
  }
};

/**
 * Initialise la popup d'introduction de l'exercice 3.
 */
export function initExo3Popups(): void {
  const overlay = d3.select("#exo3-popup-overlay");
  const page1 = d3.select("#exo3-page1");
  const page2 = d3.select("#exo3-page2");

  overlay.style("display", "flex");

  d3.select("#exo3-next-btn1").on("click", () => {
    page1.style("display", "none");
    page2.style("display", "block");
  });

  d3.select("#exo3-next-btn2").on("click", () => {
    overlay.style("display", "none");
  });
}
