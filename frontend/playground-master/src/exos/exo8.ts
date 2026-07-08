import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo8 = {
    hiddenControls: [
        "learningRate",
        "regularization",
        "regularizationRate",
        "problem",
        "percTrainData",
        "noise",
        "batchSize",
        "showTestData",
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
        "seedControl"
    ],

    forcedState: {
        dataset: datasets["circle"],
        activation: activations["sigmoid"],
        numHiddenLayers: 1,
        networkShape: [4],
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
 * Initialise la popup d'introduction de l'exercice 7 (2 pages).
 */
export function initExo8Popups(): void {
    const overlay = d3.select("#exo8-popup-overlay");
    const page1 = d3.select("#exo8-page1");
    const page2 = d3.select("#exo8-page2");

    overlay.style("display", "flex");

    d3.select("#exo8-next-btn1").on("click", () => {
        page1.style("display", "none");
        page2.style("display", "block");
    });

    d3.select("#exo8-next-btn2").on("click", () => {
        overlay.style("display", "none");
    });
}
