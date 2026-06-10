import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo2 = {
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
    "doubleRunButton",
    "seedControl",
    "weightEditor",
    "biasEditor",
    "regularization",
    "regularizationRate",
    "dataset",
    "problem",
    "learningRate",
    "testLoss"
  ],

  forcedState: {
    dataset: datasets["gauss"],
    activation: activations["sigmoid"],
    numHiddenLayers: 0,
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
 * Initialise la popup d'introduction de l'exercice 2 (2 pages).
 * La popup de succès a été supprimée.
 */
export function initExo2Popups(): void {
  const overlay = d3.select("#exo2-popup-overlay");
  const page1 = d3.select("#exo2-page1");
  const page2 = d3.select("#exo2-page2");

  // Afficher la popup d'intro au chargement
  overlay.style("display", "flex");

  // Bouton "Suivant" page 1 → page 2
  d3.select("#exo2-next-btn1").on("click", () => {
    page1.style("display", "none");
    page2.style("display", "block");
  });

  // Bouton "Commencer" page 2 → ferme la popup
  d3.select("#exo2-next-btn2").on("click", () => {
    overlay.style("display", "none");
  });
}
