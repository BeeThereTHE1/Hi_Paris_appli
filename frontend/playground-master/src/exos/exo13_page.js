(function () {
    var ExoBase = window.MLPlaygroundExoBase;
    var ApiClient = window.MLPlaygroundApiClient;
    if (!ExoBase) {
        console.error('ExoBase is not available for exercise 13.');
        return;
    }

    class Exo13 extends ExoBase {
        constructor() {
            super();
            this.apiClient = ApiClient ? new ApiClient() : null;
            this.exoId = 13;
            this.currentStepIndex = -1;
            this.steps = [
                {
                    id: 0,
                    title: 'Step 0 – Initialize the parameters',
                    text: 'Before learning begins, the weights and biases of the network are initialized randomly. This establishes the initial starting point of the network\'s parameters.'
                },
                {
                    id: 1,
                    title: 'Step 1 – Forward pass (make a prediction)',
                    text: 'The input data travels forward through the network. Each neuron calculates a weighted sum of its inputs, adds a bias, applies the activation function, and passes the result to the next layer to make a prediction.'
                },
                {
                    id: 2,
                    title: 'Step 2 – Compute the error (loss)',
                    text: 'The predicted outputs are compared with the actual target values using a loss function. This measures the error of the model\'s current predictions.'
                },
                {
                    id: 3,
                    title: 'Step 3 – Backward pass (compute corrections)',
                    text: 'The gradient of the loss function is calculated with respect to each weight and bias, propagating the error backwards from the output layer through the hidden layers.'
                },
                {
                    id: 4,
                    title: 'Step 4 – Update the weights',
                    text: 'The optimizer updates the weights and biases of the network in the opposite direction of the gradient, scaled by the learning rate, to reduce the loss.'
                },
                {
                    id: 5,
                    title: 'Then the loop repeats from step 1',
                    text: 'With the updated parameters, the cycle starts again. Over thousands of iterations, the network progressively learns the complex decision boundary to classify the dataset.'
                }
            ];
            this.initExercise();
        }

        async initExercise() {
            try {
                if (this.apiClient) {
                    var config = await this.apiClient.getExercise(this.exoId).catch(function () { return null; });
                    if (config && Array.isArray(config.steps)) {
                        this.steps = config.steps;
                    }
                    var userId = this.getCurrentUserIdentifier();
                    if (userId) {
                        var progress = await this.apiClient.getProgress(this.exoId, userId).catch(function () { return null; });
                        if (progress && Number.isInteger(progress.current_step)) {
                            this.currentStepIndex = progress.current_step;
                        }
                    }
                }
            } catch (error) {
                console.error('Error initializing exercise 13:', error);
            }
            this.setupEventListeners();
        }

        setupEventListeners() {
            var iframe = document.getElementById('iframe-playground');
            if (!iframe) return;
            iframe.addEventListener('load', () => {
                setTimeout(() => this.startTutorial(), 1200);
            });
            window.addEventListener('resize', () => {
                if (this.currentStepIndex >= 0 && this.currentStepIndex < this.steps.length) {
                    this.renderAndPositionCards();
                    this.drawFlowArrows();
                }
            });

            var btnSauvegarder = document.getElementById('btn-sauvegarder');
            if (btnSauvegarder) {
                btnSauvegarder.onclick = () => this.handleSaveDraft();
            }
        }

        renderAndPositionCards() {
            var self = this;
            this.steps.forEach(function (step, idx) {
                var card = document.getElementById('step-card-' + idx);
                if (!card) {
                    card = document.createElement('div');
                    card.id = 'step-card-' + idx;
                    card.className = 'step-card inactive';
                    var h3 = document.createElement('h3');
                    h3.innerText = step.title;
                    var p = document.createElement('p');
                    p.innerText = step.text;
                    var okBtn = document.createElement('button');
                    okBtn.innerText = 'OK';
                    okBtn.onclick = function (event) {
                        event.stopPropagation();
                        self.goToNextStep();
                    };
                    var btnContainer = document.createElement('div');
                    btnContainer.className = 'btn-right';
                    btnContainer.appendChild(okBtn);
                    card.appendChild(h3);
                    card.appendChild(p);
                    card.appendChild(btnContainer);
                    document.body.appendChild(card);
                }

                card.className = idx === self.currentStepIndex ? 'step-card active' : 'step-card inactive';
                var button = card.querySelector('button');
                if (button) {
                    button.style.display = idx === self.currentStepIndex ? 'inline-block' : 'none';
                }

                var d = self.getElementCoords('.ui-dataset');
                var n = self.getElementCoords('#network');
                var h = self.getElementCoords('#heatmap');
                var m = self.getElementCoords('.metrics');
                var f = self.getElementCoords('.column.features');
                if (idx === 0 && d) {
                    card.style.left = (d.cx - 190) + 'px';
                    card.style.top = (d.bottom + 45) + 'px';
                } else if (idx === 1 && n && h) {
                    card.style.left = (((n.cx + h.cx) / 2) - 270) + 'px';
                    card.style.top = (h.bottom + 100) + 'px';
                } else if (idx === 2 && h) {
                    card.style.left = (h.cx - 70) + 'px';
                    card.style.top = (h.top - 145) + 'px';
                } else if (idx === 3 && n && m) {
                    card.style.left = (n.cx - 110) + 'px';
                    card.style.top = (m.top - 85) + 'px';
                } else if (idx === 4 && f) {
                    card.style.left = (f.cx - 110) + 'px';
                    card.style.top = (f.top - 50) + 'px';
                } else if (idx === 5 && f) {
                    card.style.left = (f.cx - 110) + 'px';
                    card.style.top = (f.top + 335) + 'px';
                }
            });
        }

        drawFlowArrows() {
            this.clearOverlay();
            var overlay = document.getElementById('arrow-overlay');
            if (!overlay) return;
            var d = this.getElementCoords('.ui-dataset');
            var cards = this.steps.map(function (_step, idx) {
                return document.getElementById('step-card-' + idx);
            });
            if (cards.some(function (card) { return !card; })) return;
            var rects = cards.map(function (card) { return card.getBoundingClientRect(); });
            function addArrowPath(dStr) {
                var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path.setAttribute('d', dStr);
                path.setAttribute('class', 'flow-arrow-grey');
                path.setAttribute('marker-end', 'url(#arrow-head-grey)');
                overlay.appendChild(path);
            }
            if (d) {
                addArrowPath('M ' + d.cx + ',' + d.bottom + ' C ' + d.cx + ',' + ((d.bottom + rects[0].top) / 2) + ' ' + (rects[0].left + rects[0].width / 2) + ',' + ((d.bottom + rects[0].top) / 2) + ' ' + (rects[0].left + rects[0].width / 2) + ',' + rects[0].top);
            }
            addArrowPath('M ' + rects[0].right + ',' + (rects[0].top + rects[0].height / 2) + ' C ' + (rects[0].right + Math.min(100, Math.abs(rects[1].left - rects[0].right) / 2)) + ',' + (rects[0].top + rects[0].height / 2) + ' ' + (rects[1].left - Math.min(100, Math.abs(rects[1].left - rects[0].right) / 2)) + ',' + (rects[1].top + rects[1].height / 2) + ' ' + rects[1].left + ',' + (rects[1].top + rects[1].height / 2));
            var midX = Math.max(rects[1].right, rects[2].right) + 60;
            addArrowPath('M ' + rects[1].right + ',' + (rects[1].top + rects[1].height / 2) + ' C ' + (rects[1].right + 80) + ',' + (rects[1].top + rects[1].height / 2) + ' ' + midX + ',' + (rects[1].top + rects[1].height / 2) + ' ' + midX + ',' + ((rects[1].top + rects[1].height / 2 + rects[2].bottom) / 2) + ' C ' + midX + ',' + (rects[2].bottom + 80) + ' ' + (rects[2].left + rects[2].width / 2) + ',' + (rects[2].bottom + 60) + ' ' + (rects[2].left + rects[2].width / 2) + ',' + rects[2].bottom);
            addArrowPath('M ' + rects[2].left + ',' + (rects[2].top + rects[2].height / 2) + ' C ' + (rects[2].left - Math.min(100, Math.abs(rects[3].right - rects[2].left) / 2)) + ',' + (rects[2].top + rects[2].height / 2) + ' ' + (rects[3].right + Math.min(100, Math.abs(rects[3].right - rects[2].left) / 2)) + ',' + (rects[3].top + rects[3].height / 2) + ' ' + rects[3].right + ',' + (rects[3].top + rects[3].height / 2));
            addArrowPath('M ' + rects[3].left + ',' + (rects[3].top + rects[3].height / 2) + ' C ' + ((rects[3].left + rects[4].left + rects[4].width / 2) / 2) + ',' + (rects[3].top + rects[3].height / 2) + ' ' + (rects[4].left + rects[4].width / 2) + ',' + (rects[3].top + rects[3].height / 2) + ' ' + (rects[4].left + rects[4].width / 2) + ',' + rects[4].top);
            addArrowPath('M ' + (rects[4].left + rects[4].width / 2) + ',' + rects[4].bottom + ' L ' + (rects[5].left + rects[5].width / 2) + ',' + rects[5].top);
        }

        injectBlinkStyleInIframe() {
            var iframe = document.getElementById('iframe-playground');
            if (!iframe) return;
            try {
                var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc.getElementById('exo13-blink-styles')) return;
                var style = iframeDoc.createElement('style');
                style.id = 'exo13-blink-styles';
                style.textContent = '@keyframes blink-active-anim { 0%, 100% { background-color: rgba(255, 3, 77, 0.2); transform: scale(1); box-shadow: none; } 50% { background-color: #FF034D; transform: scale(1.2); box-shadow: 0 0 15px #FF034D; color: white !important; } } .blink-active { animation: blink-active-anim 1s infinite !important; border-radius: 50% !important; }';
                iframeDoc.head.appendChild(style);
            } catch (_error) {}
        }

        setBlinkStatus(active) {
            var iframe = document.getElementById('iframe-playground');
            if (!iframe) return;
            try {
                var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                var button = iframeDoc.getElementById('next-step-button');
                if (button) {
                    button.classList[active ? 'add' : 'remove']('blink-active');
                }
            } catch (_error) {}
        }

        bindIframeEvents() {
            var iframe = document.getElementById('iframe-playground');
            if (!iframe) return;
            try {
                var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                var button = iframeDoc.getElementById('next-step-button');
                if (button) {
                    button.onclick = () => {
                        if (this.currentStepIndex === -1) {
                            this.goToNextStep();
                        }
                    };
                }
            } catch (_error) {}
        }

        async goToNextStep() {
            this.currentStepIndex += 1;
            if (this.currentStepIndex >= this.steps.length) {
                this.steps.forEach(function (_step, idx) {
                    var card = document.getElementById('step-card-' + idx);
                    if (card) card.remove();
                });
                await this.saveProgress(this.steps.length, 'COMPLETED', this.getScoreDetails());
                this.showSynthesisOverlay();
                return;
            }
            if (this.currentStepIndex === 0) {
                this.setBlinkStatus(false);
            }
            await this.saveProgress(this.currentStepIndex, 'IN_PROGRESS', this.getScoreDetails());
            this.renderAndPositionCards();
            this.drawFlowArrows();
        }

        startTutorial() {
            var overlay = document.createElement('div');
            overlay.className = 'tutorial-overlay';
            overlay.id = 'exo13-tutorial-overlay';
            var popup = document.createElement('div');
            popup.className = 'tutorial-popup';
            var h3 = document.createElement('h3');
            h3.innerText = 'Exercise #13 : Iterative Learning Cycle';
            var p = document.createElement('p');
            p.innerText = 'Observe the evolution of the decision frontier over the epochs. Pause at different times during the training (epoch 10, 100, 500) and describe what is happening visually.';
            var timerSpan = document.createElement('span');
            timerSpan.style.cssText = 'display: block; margin-top: 15px; font-size: 13px; color: #94a3b8;';
            var nextBtn = document.createElement('button');
            nextBtn.className = 'tutorial-btn';
            nextBtn.innerText = 'Continue';
            nextBtn.disabled = true;
            popup.appendChild(h3);
            popup.appendChild(p);
            popup.appendChild(timerSpan);
            popup.appendChild(nextBtn);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);
            var timeLeft = 5;
            function updateTimer() {
                if (timeLeft > 0) {
                    timerSpan.innerText = 'Temps de lecture restant : ' + timeLeft + 's';
                    timeLeft -= 1;
                    setTimeout(updateTimer, 1000);
                } else {
                    timerSpan.style.display = 'none';
                    nextBtn.disabled = false;
                }
            }
            updateTimer();
            nextBtn.onclick = () => {
                overlay.remove();
                this.injectBlinkStyleInIframe();
                this.setBlinkStatus(true);
                this.bindIframeEvents();
                setTimeout(() => this.goToNextStep(), 500);
            };
        }

        showSynthesisOverlay() {
            this.clearOverlay();
            var overlay = document.createElement('div');
            overlay.className = 'tutorial-overlay';
            overlay.id = 'exo13-synthesis-overlay';
            var popup = document.createElement('div');
            popup.className = 'tutorial-popup';
            var h3 = document.createElement('h3');
            h3.innerText = 'In summary';
            var p = document.createElement('p');
            p.style.textAlign = 'left';
            p.style.whiteSpace = 'pre-line';
            p.style.fontSize = '20px';
            p.innerText = [
                'Training is an iterative loop:',
                'predict → measure error → correct → update',
                '',
                'Each step slightly improves the model',
                'Learning emerges progressively over many iterations.',
                '',
                'You can run the model again to observe these steps in action;',
                '',
                'Whenever you are ready click "Next" to proceed to the next activity.'
            ].join('\n');
            var nextBtn = document.createElement('button');
            nextBtn.className = 'tutorial-btn';
            nextBtn.innerText = 'NEXT';
            nextBtn.onclick = function () {
                overlay.remove();
                window.location.href = 'exoquiz/exo13_quiz.html';
            };
            popup.appendChild(h3);
            popup.appendChild(p);
            popup.appendChild(nextBtn);
            overlay.appendChild(popup);
            document.body.appendChild(overlay);
        }

        getScoreDetails() {
            return {
                completed_steps: Math.max(this.currentStepIndex + 1, 0),
                total_steps: this.steps.length
            };
        }

        async handleSaveDraft() {
            var saved = await this.saveProgress(Math.max(this.currentStepIndex, 0), 'IN_PROGRESS', this.getScoreDetails());
            if (saved) {
                var btnSauvegarder = document.getElementById('btn-sauvegarder');
                if (btnSauvegarder) {
                    btnSauvegarder.innerHTML = '✅ Saved !';
                    btnSauvegarder.disabled = true;
                }
                return;
            }
            this.showErrorMessage('Please log in to save this exercise.');
        }

        async saveProgress(stepIndex, status, scoreDetails) {
            if (!this.apiClient) return false;
            var userId = this.getCurrentUserIdentifier();
            if (!userId) return false;
            try {
                await this.apiClient.saveProgress(this.exoId, userId, {
                    current_step: Number.isInteger(stepIndex) ? stepIndex : 0,
                    status: status || 'IN_PROGRESS',
                    score_details: scoreDetails || null
                });
                return true;
            } catch (error) {
                console.warn('Unable to save progress for exercise 13.', error);
                return window.StorageService ? window.StorageService[status === 'COMPLETED' ? 'complete' : 'save'](this.exoId) : false;
            }
        }
    }

    new Exo13();
})();
