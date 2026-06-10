import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo11 = {
    hiddenControls: [
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "batchSize",
        "showTestData",
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

    forcedState: {
        dataset: datasets["spiral"],
        activation: activations["sigmoid"],
        numHiddenLayers: 1,
        networkShape: [2],
        x: true,
        y: true,
        xSquared: false,
        ySquared: false,
        xTimesY: false,
        cosX: false,
        sinX: false,
        cosY: false,
        sinY: false,
        learningRate: 0.03,
        regularization: null,
        percTrainData: 50,
        noise: 5,
        batchSize: 10
    }
};

/**
 * Initialise la popup d'introduction de l'exercice 9 (2 pages).
 */
export function initExo11Popups(): void {
    const overlay = d3.select("#exo11-popup-overlay");
    const page1 = d3.select("#exo11-page1");
    const page2 = d3.select("#exo11-page2");

    overlay.style("display", "flex");

    d3.select("#exo9-next-btn1").on("click", () => {
        page1.style("display", "none");
        page2.style("display", "block");
    });

    d3.select("#exo9-next-btn2").on("click", () => {
        overlay.style("display", "none");
    });
}
