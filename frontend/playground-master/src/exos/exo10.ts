import { datasets, activations } from "../state";
import * as d3 from "d3";

export const exo10 = {
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
        "numHiddenLayers",
        "weightEditor",
        "biasEditor"
    ],

    forcedState: {
        dataset: datasets["gauss"],
        activation: activations["linear"],
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
        sinY: false,
        learningRate: 1,
        regularization: null,
        percTrainData: 50,
        noise: 50,
        batchSize: 10
    }
};

/**
 * Initialise la popup d'introduction de l'exercice 9 (2 pages).
 */
export function initExo10Popups(): void {
    const overlay = d3.select("#exo10-popup-overlay");
    const page1 = d3.select("#exo10-page1");
    const page2 = d3.select("#exo10-page2");

    overlay.style("display", "flex");

    d3.select("#exo10-next-btn1").on("click", () => {
        page1.style("display", "none");
        page2.style("display", "block");
    });

    d3.select("#exo10-next-btn2").on("click", () => {
        overlay.style("display", "none");
    });
}
