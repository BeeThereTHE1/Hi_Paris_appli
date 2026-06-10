import { datasets, activations } from "../state";
import * as d3 from "d3";
export const exo7 = {
  hiddenControls: [
    "learningRate",
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
    activation: activations["linear"],
    numHiddenLayers: 1,
    networkShape: [4],
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

export function initExo7Popups(): void {
  const overlay = d3.select("#exo7-popup-overlay");
  const page1 = d3.select("#exo7-page1");
  const page2 = d3.select("#exo7-page2");

  // Afficher la popup d'intro au chargement
  overlay.style("display", "flex");

  // Bouton "Suivant" page 1 → page 2
  d3.select("#exo7-next-btn1").on("click", () => {
    page1.style("display", "none");
    page2.style("display", "block");
  });

  // Bouton "Commencer" page 2 → ferme la popup
  d3.select("#exo7-next-btn2").on("click", () => {
    overlay.style("display", "none");
  });
}
