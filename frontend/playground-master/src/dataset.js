"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = require("d3");
function shuffle(array) {
    let counter = array.length;
    let temp = 0;
    let index = 0;
    while (counter > 0) {
        index = Math.floor(Math.random() * counter);
        counter--;
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
}
exports.shuffle = shuffle;
function classifyTwoGaussData(numSamples, noise) {
    let points = [];
    let varianceScale = d3.scale.linear().domain([0, .5]).range([0.5, 4]);
    let variance = varianceScale(noise);
    function genGauss(cx, cy, label) {
        for (let i = 0; i < numSamples / 2; i++) {
            let x = normalRandom(cx, variance);
            let y = normalRandom(cy, variance);
            points.push({ x, y, label });
        }
    }
    genGauss(2, 2, 1);
    genGauss(-2, -2, -1);
    return points;
}
exports.classifyTwoGaussData = classifyTwoGaussData;
function regressPlane(numSamples, noise) {
    let radius = 6;
    let labelScale = d3.scale.linear()
        .domain([-10, 10])
        .range([-1, 1]);
    let getLabel = (x, y) => labelScale(x + y);
    let points = [];
    for (let i = 0; i < numSamples; i++) {
        let x = randUniform(-radius, radius);
        let y = randUniform(-radius, radius);
        let noiseX = randUniform(-radius, radius) * noise;
        let noiseY = randUniform(-radius, radius) * noise;
        let label = getLabel(x + noiseX, y + noiseY);
        points.push({ x, y, label });
    }
    return points;
}
exports.regressPlane = regressPlane;
function regressGaussian(numSamples, noise) {
    let points = [];
    let labelScale = d3.scale.linear()
        .domain([0, 2])
        .range([1, 0])
        .clamp(true);
    let gaussians = [
        [-4, 2.5, 1],
        [0, 2.5, -1],
        [4, 2.5, 1],
        [-4, -2.5, -1],
        [0, -2.5, 1],
        [4, -2.5, -1]
    ];
    function getLabel(x, y) {
        let label = 0;
        gaussians.forEach(([cx, cy, sign]) => {
            let newLabel = sign * labelScale(dist({ x, y }, { x: cx, y: cy }));
            if (Math.abs(newLabel) > Math.abs(label)) {
                label = newLabel;
            }
        });
        return label;
    }
    let radius = 6;
    for (let i = 0; i < numSamples; i++) {
        let x = randUniform(-radius, radius);
        let y = randUniform(-radius, radius);
        let noiseX = randUniform(-radius, radius) * noise;
        let noiseY = randUniform(-radius, radius) * noise;
        let label = getLabel(x + noiseX, y + noiseY);
        points.push({ x, y, label });
    }
    ;
    return points;
}
exports.regressGaussian = regressGaussian;
function classifySpiralData(numSamples, noise) {
    let points = [];
    let n = numSamples / 2;
    function genSpiral(deltaT, label) {
        for (let i = 0; i < n; i++) {
            let r = i / n * 5;
            let t = 1.75 * i / n * 2 * Math.PI + deltaT;
            let x = r * Math.sin(t) + randUniform(-1, 1) * noise;
            let y = r * Math.cos(t) + randUniform(-1, 1) * noise;
            points.push({ x, y, label });
        }
    }
    genSpiral(0, 1);
    genSpiral(Math.PI, -1);
    return points;
}
exports.classifySpiralData = classifySpiralData;
function classifyCircleData(numSamples, noise) {
    let points = [];
    let radius = 5;
    function getCircleLabel(p, center) {
        return (dist(p, center) < (radius * 0.5)) ? 1 : -1;
    }
    for (let i = 0; i < numSamples / 2; i++) {
        let r = randUniform(0, radius * 0.5);
        let angle = randUniform(0, 2 * Math.PI);
        let x = r * Math.sin(angle);
        let y = r * Math.cos(angle);
        let noiseX = randUniform(-radius, radius) * noise;
        let noiseY = randUniform(-radius, radius) * noise;
        let label = getCircleLabel({ x: x + noiseX, y: y + noiseY }, { x: 0, y: 0 });
        points.push({ x, y, label });
    }
    for (let i = 0; i < numSamples / 2; i++) {
        let r = randUniform(radius * 0.7, radius);
        let angle = randUniform(0, 2 * Math.PI);
        let x = r * Math.sin(angle);
        let y = r * Math.cos(angle);
        let noiseX = randUniform(-radius, radius) * noise;
        let noiseY = randUniform(-radius, radius) * noise;
        let label = getCircleLabel({ x: x + noiseX, y: y + noiseY }, { x: 0, y: 0 });
        points.push({ x, y, label });
    }
    return points;
}
exports.classifyCircleData = classifyCircleData;
function classifyXORData(numSamples, noise) {
    function getXORLabel(p) { return p.x * p.y >= 0 ? 1 : -1; }
    let points = [];
    for (let i = 0; i < numSamples; i++) {
        let x = randUniform(-5, 5);
        let padding = 0.3;
        x += x > 0 ? padding : -padding;
        let y = randUniform(-5, 5);
        y += y > 0 ? padding : -padding;
        let noiseX = randUniform(-5, 5) * noise;
        let noiseY = randUniform(-5, 5) * noise;
        let label = getXORLabel({ x: x + noiseX, y: y + noiseY });
        points.push({ x, y, label });
    }
    return points;
}
exports.classifyXORData = classifyXORData;
function randUniform(a, b) {
    return Math.random() * (b - a) + a;
}
function normalRandom(mean = 0, variance = 1) {
    let v1, v2, s;
    do {
        v1 = 2 * Math.random() - 1;
        v2 = 2 * Math.random() - 1;
        s = v1 * v1 + v2 * v2;
    } while (s > 1);
    let result = Math.sqrt(-2 * Math.log(s) / s) * v1;
    return mean + Math.sqrt(variance) * result;
}
function dist(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}
