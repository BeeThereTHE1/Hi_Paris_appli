import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo1 = {
  hiddenControls: [
    "learningRate",
    "activation",
    "regularization",
    "regularizationRate",
    "problem",
    "percTrainData",
    "noise",
    "batchSize",
    "numHiddenLayers",
    "showTestData",
    "discretize",
    "sinX",
    "cosX",
    "sinY",
    "cosY",
    "xTimesY",
    "xSquared",
    "ySquared",
    "playButton",
    "biasEditor",
    "doubleRunButton",
    "seedControl",
    "epoch",
    "resetButton",
    "stepButton",
    "testLoss",
    "dataset",
    "weightEditor"
  ],

  forcedState: {
    dataset: datasets["gauss"],
    activation: activations["sigmoid"],
    numHiddenLayers: 0,
    networkShape: [],
    x: true,
    y: true,
  }
};

/**
 * Initialise toutes les popups de l'exercice 1 :
 * - Popup d'introduction (2 pages)
 * - Success Popup (3 pages)
 * À appeler une fois le DOM prêt, depuis playground.ts.
 */
/**
 * Initialise la popup d'introduction de l'exercice 1 (2 pages).
 * La popup de succès a été supprimée.
 */
export function initExo1Popups(): void {
  const overlay = d3.select("#exo1-popup-overlay");
  const page1 = d3.select("#exo1-page1");
  const page2 = d3.select("#exo1-page2");

  // Afficher la popup d'intro au chargement
  overlay.style("display", "flex");

  // Bouton "Next" page 1 → page 2
  d3.select("#exo1-next-btn1").on("click", () => {
    page1.style("display", "none");
    page2.style("display", "block");
  });

  // Bouton "Commencer" page 2 → ferme la popup
  d3.select("#exo1-next-btn2").on("click", () => {
    overlay.style("display", "none");
  });
}
