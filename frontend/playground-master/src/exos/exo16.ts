import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo16 = {
    // 1. On liste TOUT ce qui doit être caché (tout sauf le LR)
    hiddenControls: [
        "regularization",
        "regularizationRate",
        "problem",
        "batchSize",
        "xSquared",
        "ySquared",
        "xTimesY",
        "cosX",
        "cosY",
        "sinX",
        "sinY",
        "weightEditor",
        "biasEditor",
        "seedControl",
        "doubleRunButton"
    ],

    // 2. On force l'état initial (LR=10, Batch=10, etc.)
    forcedState: {
        learningRate: 0.1,
        dataset: datasets["spiral"],
        activation: activations["sigmoid"],
        percTrainData: 50,
        noise: 5,
        batchSize: 10,
        numHiddenLayers: 6,
        networkShape: [8, 8, 8, 8, 8, 8],
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
export function initExo16Popups(): void {
    const overlay = d3.select("#exo16-popup-overlay");
    const page1 = d3.select("#exo16-page1");
    const page2 = d3.select("#exo16-page2");

    overlay.style("display", "flex");

    d3.select("#exo16-next-btn1").on("click", () => {
        page1.style("display", "none");
        page2.style("display", "block");
    });

    d3.select("#exo16-next-btn2").on("click", () => {
        overlay.style("display", "none");
    });
}
