"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Node {
    constructor(id, activation, initZero) {
        this.inputLinks = [];
        this.bias = 0.1;
        this.outputs = [];
        this.outputDer = 0;
        this.inputDer = 0;
        this.accInputDer = 0;
        this.numAccumulatedDers = 0;
        this.id = id;
        this.activation = activation;
        if (initZero) {
            this.bias = 0;
        }
    }
    updateOutput() {
        this.totalInput = this.bias;
        for (let j = 0; j < this.inputLinks.length; j++) {
            let link = this.inputLinks[j];
            this.totalInput += link.weight * link.source.output;
        }
        this.output = this.activation.output(this.totalInput);
        return this.output;
    }
}
exports.Node = Node;
class Errors {
}
Errors.SQUARE = {
    error: (output, target) => 0.5 * Math.pow(output - target, 2),
    der: (output, target) => output - target
};
exports.Errors = Errors;
Math.tanh = Math.tanh || function (x) {
    if (x === Infinity) {
        return 1;
    }
    else if (x === -Infinity) {
        return -1;
    }
    else {
        let e2x = Math.exp(2 * x);
        return (e2x - 1) / (e2x + 1);
    }
};
class Activations {
}
Activations.TANH = {
    output: x => Math.tanh(x),
    der: x => {
        let output = Activations.TANH.output(x);
        return 1 - output * output;
    }
};
Activations.RELU = {
    output: x => Math.max(0, x),
    der: x => x <= 0 ? 0 : 1
};
Activations.SIGMOID = {
    output: x => 1 / (1 + Math.exp(-x)),
    der: x => {
        let output = Activations.SIGMOID.output(x);
        return output * (1 - output);
    }
};
Activations.LINEAR = {
    output: x => x,
    der: x => 1
};
exports.Activations = Activations;
class RegularizationFunction {
}
RegularizationFunction.L1 = {
    output: w => Math.abs(w),
    der: w => w < 0 ? -1 : (w > 0 ? 1 : 0)
};
RegularizationFunction.L2 = {
    output: w => 0.5 * w * w,
    der: w => w
};
exports.RegularizationFunction = RegularizationFunction;
class Link {
    constructor(source, dest, regularization, initZero) {
        this.weight = Math.random() - 0.5;
        this.isDead = false;
        this.errorDer = 0;
        this.accErrorDer = 0;
        this.numAccumulatedDers = 0;
        this.id = source.id + "-" + dest.id;
        this.source = source;
        this.dest = dest;
        this.regularization = regularization;
        if (initZero) {
            this.weight = 0;
        }
    }
}
exports.Link = Link;
function buildNetwork(networkShape, activation, outputActivation, regularization, inputIds, initZero) {
    let numLayers = networkShape.length;
    let id = 1;
    let network = [];
    for (let layerIdx = 0; layerIdx < numLayers; layerIdx++) {
        let isOutputLayer = layerIdx === numLayers - 1;
        let isInputLayer = layerIdx === 0;
        let currentLayer = [];
        network.push(currentLayer);
        let numNodes = networkShape[layerIdx];
        for (let i = 0; i < numNodes; i++) {
            let nodeId = id.toString();
            if (isInputLayer) {
                nodeId = inputIds[i];
            }
            else {
                id++;
            }
            let node = new Node(nodeId, isOutputLayer ? outputActivation : activation, initZero);
            currentLayer.push(node);
            if (layerIdx >= 1) {
                for (let j = 0; j < network[layerIdx - 1].length; j++) {
                    let prevNode = network[layerIdx - 1][j];
                    let link = new Link(prevNode, node, regularization, initZero);
                    prevNode.outputs.push(link);
                    node.inputLinks.push(link);
                }
            }
        }
    }
    return network;
}
exports.buildNetwork = buildNetwork;
function forwardProp(network, inputs) {
    let inputLayer = network[0];
    if (inputs.length !== inputLayer.length) {
        throw new Error("The number of inputs must match the number of nodes in" +
            " the input layer");
    }
    for (let i = 0; i < inputLayer.length; i++) {
        let node = inputLayer[i];
        node.output = inputs[i];
    }
    for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
        let currentLayer = network[layerIdx];
        for (let i = 0; i < currentLayer.length; i++) {
            let node = currentLayer[i];
            node.updateOutput();
        }
    }
    return network[network.length - 1][0].output;
}
exports.forwardProp = forwardProp;
function backProp(network, target, errorFunc) {
    let outputNode = network[network.length - 1][0];
    outputNode.outputDer = errorFunc.der(outputNode.output, target);
    for (let layerIdx = network.length - 1; layerIdx >= 1; layerIdx--) {
        let currentLayer = network[layerIdx];
        for (let i = 0; i < currentLayer.length; i++) {
            let node = currentLayer[i];
            node.inputDer = node.outputDer * node.activation.der(node.totalInput);
            node.accInputDer += node.inputDer;
            node.numAccumulatedDers++;
        }
        for (let i = 0; i < currentLayer.length; i++) {
            let node = currentLayer[i];
            for (let j = 0; j < node.inputLinks.length; j++) {
                let link = node.inputLinks[j];
                if (link.isDead) {
                    continue;
                }
                link.errorDer = node.inputDer * link.source.output;
                link.accErrorDer += link.errorDer;
                link.numAccumulatedDers++;
            }
        }
        if (layerIdx === 1) {
            continue;
        }
        let prevLayer = network[layerIdx - 1];
        for (let i = 0; i < prevLayer.length; i++) {
            let node = prevLayer[i];
            node.outputDer = 0;
            for (let j = 0; j < node.outputs.length; j++) {
                let output = node.outputs[j];
                node.outputDer += output.weight * output.dest.inputDer;
            }
        }
    }
}
exports.backProp = backProp;
function updateWeights(network, learningRate, regularizationRate) {
    for (let layerIdx = 1; layerIdx < network.length; layerIdx++) {
        let currentLayer = network[layerIdx];
        for (let i = 0; i < currentLayer.length; i++) {
            let node = currentLayer[i];
            if (node.numAccumulatedDers > 0) {
                node.bias -= learningRate * node.accInputDer / node.numAccumulatedDers;
                node.accInputDer = 0;
                node.numAccumulatedDers = 0;
            }
            for (let j = 0; j < node.inputLinks.length; j++) {
                let link = node.inputLinks[j];
                if (link.isDead) {
                    continue;
                }
                let regulDer = link.regularization ?
                    link.regularization.der(link.weight) : 0;
                if (link.numAccumulatedDers > 0) {
                    link.weight = link.weight -
                        (learningRate / link.numAccumulatedDers) * link.accErrorDer;
                    let newLinkWeight = link.weight -
                        (learningRate * regularizationRate) * regulDer;
                    if (link.regularization === RegularizationFunction.L1 &&
                        link.weight * newLinkWeight < 0) {
                        link.weight = 0;
                        link.isDead = true;
                    }
                    else {
                        link.weight = newLinkWeight;
                    }
                    link.accErrorDer = 0;
                    link.numAccumulatedDers = 0;
                }
            }
        }
    }
}
exports.updateWeights = updateWeights;
function forEachNode(network, ignoreInputs, accessor) {
    for (let layerIdx = ignoreInputs ? 1 : 0; layerIdx < network.length; layerIdx++) {
        let currentLayer = network[layerIdx];
        for (let i = 0; i < currentLayer.length; i++) {
            let node = currentLayer[i];
            accessor(node);
        }
    }
}
exports.forEachNode = forEachNode;
function getOutputNode(network) {
    return network[network.length - 1][0];
}
exports.getOutputNode = getOutputNode;
