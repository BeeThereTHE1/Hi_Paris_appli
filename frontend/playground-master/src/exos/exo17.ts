import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo17 = {
    // 1. On liste TOUT ce qui doit être caché (tout sauf le LR)
    hiddenControls: [
        "activation",
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "showTestData",
        "dataset",
        "xSquared",
        "ySquared",
        "xTimesY",
        "cosX",
        "cosY",
        "sinX",
        "sinY",
        "numHiddenLayers",
        "weightEditor",
        "biasEditor",
        "seedControl",
        "doubleRunButton"
    ],

    // 2. On force l'état initial (LR=10, Batch=10, etc.)
    forcedState: {
        learningRate: 10,
        dataset: datasets["gauss"],
        activation: activations["linear"],
        percTrainData: 50,
        noise: 0,
        batchSize: 10,
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
 * Initialise la popup d'introduction de l'exercice 17 (2 pages).
 */
export function initExo17Popups(): void {
    const overlay = d3.select("#exo17-popup-overlay");
    const page1 = d3.select("#exo17-page1");
    const page2 = d3.select("#exo17-page2");

    overlay.style("display", "flex");

    d3.select("#exo17-next-btn1").on("click", () => {
        page1.style("display", "none");
        page2.style("display", "block");
    });

    d3.select("#exo17-next-btn2").on("click", () => {
        overlay.style("display", "none");
    });
}
