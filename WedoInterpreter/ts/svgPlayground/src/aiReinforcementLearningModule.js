define(["require", "exports", "@svgdotjs/svg.js"], function (require, exports, SVG) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var QLearningAlgorithmModule = /** @class */ (function () {
        function QLearningAlgorithmModule(updateBackground) {
            this.svg = SVG.SVG();
            this.startNode = undefined;
            this.finishNode = undefined;
            this.problem = undefined;
            this.alpha = undefined;
            this.gamma = undefined;
            this.nu = undefined;
            this.rho = undefined;
            this.qValueStore = undefined;
            this.episodes = 150;
            this.timePerEpisode = 200; //TODO - auch im QLearner anpassen
            this.updateBackground = updateBackground;
        }
        QLearningAlgorithmModule.prototype.createQLearningEnvironment = function (obstaclesList, startNode, finishNode) {
            this.startNode = startNode;
            this.finishNode = finishNode;
            var path = "./marsTopView.svg";
            this.loadSVG(path, obstaclesList, finishNode);
            return 1000; //TODO
        };
        QLearningAlgorithmModule.prototype.loadSVG = function (filePath, obstaclesList, finishNode) {
            var that = this;
            RlUtils.file_get_contents(filePath, function (text) {
                that.drawSVG(text);
                var statesAndActions = RlUtils.generateStatesAndActionsFromSVG(that.svg, obstaclesList, finishNode);
                that.problem = new ReinforcementProblem(statesAndActions);
            });
        };
        QLearningAlgorithmModule.prototype.drawSVG = function (text) {
            document.getElementById('qLearningBackgroundArea').innerText = "";
            this.svg = SVG.SVG().addTo('#qLearningBackgroundArea').size(3148 / 5, 1764 / 5).viewbox("0 0 3148 1764");
            this.svg.svg(text);
            this.svg.find('.cls-customPathColor').each(function (e) { return e.stroke({ color: '#fcfcfc', opacity: 0.9, width: 0 }); });
        };
        QLearningAlgorithmModule.prototype.setUpQLearningBehaviour = function (alpha, gamma, nu, rho) {
            this.alpha = alpha;
            this.gamma = gamma;
            this.nu = nu;
            this.rho = rho;
        };
        QLearningAlgorithmModule.prototype.learningEnded = function (qValueStore, problem) {
        };
        QLearningAlgorithmModule.prototype.runQLearner = function () {
            this.qValueStore = new QLearningAlgorithm().qLearnerStep(this.svg, this.problem, this.episodes, 9007199254740991, this.alpha, this.gamma, this.rho, this.nu, this.learningEnded);
            return this.episodes * this.timePerEpisode;
        };
        QLearningAlgorithmModule.prototype.drawOptimalPath = function () {
            console.log(this.qValueStore);
            var optimalPathResult = this.qValueStore.createOptimalPath(this.startNode, this.finishNode, this.problem);
            this.drawOptimalPathIntern(optimalPathResult);
            var copyOfSVG = this.svg.clone();
            RlUtils.hideAllPathsExeptTheOptimal(copyOfSVG);
            var learnedImageHTML = copyOfSVG.svg();
            var learnedImage = window.btoa(learnedImageHTML);
            var temp = 'data:image/svg+xml;base64,' + learnedImage;
            this.updateBackground(9, temp);
        };
        QLearningAlgorithmModule.prototype.drawOptimalPathIntern = function (optimalPathResult) {
            var _a;
            if (optimalPathResult.resultState == ResultState.ERROR) {
                console.log("...");
            }
            else {
                var combinedPath;
                for (var qValue in optimalPathResult.optimalPath) {
                    var firstValue = optimalPathResult.optimalPath[parseInt(qValue)];
                    var secondValue = optimalPathResult.optimalPath[parseInt(qValue) + 1];
                    if (secondValue !== null) {
                        try {
                            // combinedPathTestPurpose = RlUtils.findPathWithID(this.svg, firstValue, secondValue);
                            // combinedPathTestPurpose.addTo(this.svg);
                            // combinedPathTestPurpose.stroke({width: 20, color: '#1ad274'})
                            if (combinedPath == undefined) {
                                var combinedPath = RlUtils.findPathWithID(this.svg, firstValue, secondValue);
                            }
                            else {
                                var temp = RlUtils.findPathWithID(this.svg, firstValue, secondValue).array();
                                // temp.stroke({linecap: 'round'})
                                temp.splice(0, 1);
                                (_a = combinedPath.array()).push.apply(_a, temp);
                                combinedPath.plot(combinedPath.array());
                            }
                        }
                        catch (error) {
                            console.log(combinedPath);
                        }
                    }
                }
                combinedPath.addTo(this.svg);
                combinedPath.removeClass('cls-customPathColor');
                combinedPath.addClass('pink-flower');
                combinedPath.stroke({ width: 80, color: '#ffffff', opacity: 1, linecap: 'round', linejoin: 'round' })
                    .fill('none');
                var pathCopyBlack = combinedPath.clone();
                pathCopyBlack.addTo(this.svg);
                pathCopyBlack.removeClass('cls-customPathColor');
                pathCopyBlack.addClass('pink-flower');
                pathCopyBlack.stroke({ width: 30, color: '#000000' })
                    .fill('none');
                console.log(combinedPath.array());
            }
        };
        return QLearningAlgorithmModule;
    }());
    exports.QLearningAlgorithmModule = QLearningAlgorithmModule;
    var RlUtils = /** @class */ (function () {
        function RlUtils() {
        }
        RlUtils.generateStatesAndActionsFromSVG = function (svg, obstaclesList, finishNode) {
            var statesAndActions = [];
            var allPathes = svg.find('.cls-customPathColor');
            var obstaclesArray = [];
            for (var obstacleItem in obstaclesList) {
                var obstacle = obstaclesList[obstacleItem];
                obstaclesArray.push(obstacle.startNode + "-" + obstacle.finishNode);
            }
            allPathes.each(function (item) {
                // let obstaclePresent = false;
                var idName = item.attr("id");
                var tokens = idName.split("-");
                var firstValue = parseInt(tokens[1]); //0
                var secondValue = parseInt(tokens[2]); //1
                if (statesAndActions[firstValue] == undefined) {
                    statesAndActions[firstValue] = [];
                }
                if (obstaclesArray.includes(firstValue + "-" + secondValue)) {
                }
                else if (secondValue == finishNode) {
                    statesAndActions[firstValue][secondValue] = 50;
                }
                else {
                    statesAndActions[firstValue][secondValue] = 0;
                }
            });
            return statesAndActions;
        };
        RlUtils.hideAllPathsExeptTheOptimal = function (svg) {
            svg.find('.cls-customPathColor').hide();
        };
        /**
         *
         * @param svg
         * @param firstValue
         * @param secondValue
         * @return foundPath in {@link svg} or null if not found
         */
        RlUtils.findPathWithID = function (svg, firstValue, secondValue) {
            var linkIDPrefix = "path-";
            var foundPath = svg.findOne('#' + linkIDPrefix + firstValue + "-" + secondValue);
            return foundPath;
        };
        return RlUtils;
    }());
    // exports.QLearningAlgorithmModule = QLearningAlgorithmModule;
    //Utils
    var ResultState;
    (function (ResultState) {
        ResultState[ResultState["SUCCESS"] = 1] = "SUCCESS";
        ResultState[ResultState["ERROR"] = 2] = "ERROR";
    })(ResultState || (ResultState = {}));
    var ReinforcementProblem = /** @class */ (function () {
        function ReinforcementProblem(statesAndActions) {
            this.statesAndActions = statesAndActions;
            this.states = [];
            for (var i = 0; i < statesAndActions.length; i++) {
                this.states.push(i);
            }
        }
        ReinforcementProblem.prototype.getRandomState = function () {
            var indexOfState = Math.floor(Math.random() * this.states.length);
            return this.states[indexOfState];
        };
        ReinforcementProblem.prototype.getAvailableActions = function (state) {
            var availableActions = [];
            var actions = this.statesAndActions[state];
            var actionIndex;
            for (actionIndex in actions) {
                if (actions[actionIndex] !== undefined) {
                    availableActions.push(parseInt(actionIndex));
                }
            }
            return availableActions;
        };
        ReinforcementProblem.prototype.takeAction = function (state, action) {
            var actions = this.statesAndActions[state];
            return {
                "reward": actions[action],
                "newState": action
            };
        };
        ReinforcementProblem.prototype.takeOneOfActions = function (actions) {
            var action = Math.floor(Math.random() * actions.length);
            return actions[action];
        };
        return ReinforcementProblem;
    }());
    var QValueStore = /** @class */ (function () {
        function QValueStore(statesAndActions) {
            this.qMatrix = [];
            for (var statesIndex in statesAndActions) {
                var actions = statesAndActions[statesIndex].slice().fill(0);
                this.qMatrix.push(actions);
            }
        }
        QValueStore.prototype.getQValue = function (state, action) {
            var actions = this.qMatrix[state];
            return actions[action]; //associatedQValue
        };
        QValueStore.prototype.getBestAction = function (state, availableActions) {
            var actionsQMatrix = this.qMatrix[state];
            var bestActionValue = -1;
            var bestAction;
            for (var actionIndex in actionsQMatrix) {
                var action = actionsQMatrix[actionIndex];
                if (action != undefined && availableActions.includes(parseInt(actionIndex)) && action > bestActionValue) {
                    bestActionValue = actionsQMatrix[actionIndex];
                    bestAction = parseInt(actionIndex);
                }
            }
            return bestAction;
        };
        QValueStore.prototype.storeQValue = function (state, action, value) {
            var actions = this.qMatrix[state];
            actions[action] = value; // === this.qMatrix[state][action] = value;
        };
        QValueStore.prototype.createOptimalPath = function (startState, endState, problem) {
            var optimalPath = [startState];
            var currentState = startState;
            var resultState = ResultState.SUCCESS;
            while (currentState !== endState) {
                var nextState = this.getBestAction(currentState, problem.getAvailableActions(currentState));
                currentState = nextState;
                if (optimalPath.includes(currentState)) {
                    console.log("Keinen optimalen Pfad von " + startState + " nach " + endState + " gefunden. Zyklus geschlossen bei: " + currentState);
                    resultState = ResultState.ERROR;
                    break;
                }
                optimalPath.push(nextState);
            }
            return { optimalPath: optimalPath, resultState: resultState };
        };
        return QValueStore;
    }());
    var QLearningAlgorithm = /** @class */ (function () {
        function QLearningAlgorithm() {
        }
        QLearningAlgorithm.prototype.qLearnerStep = function (svg, problem, episodes, timeLimit, alpha, gamma, rho, nu, callback) {
            var qValueStore = new QValueStore(problem.statesAndActions);
            var state = problem.getRandomState();
            var action;
            var previousPath;
            var timer = setInterval(function () {
                var startTime = Date.now();
                if (Math.random() < nu) {
                    state = problem.getRandomState();
                }
                var actions = problem.getAvailableActions(state);
                if (Math.random() < rho) {
                    action = problem.takeOneOfActions(actions);
                }
                else {
                    action = qValueStore.getBestAction(state, actions);
                }
                var rewardAndNewState = problem.takeAction(state, action);
                var reward = rewardAndNewState.reward;
                var newState = rewardAndNewState.newState;
                var q = qValueStore.getQValue(state, action);
                var newStateActions = problem.getAvailableActions(newState);
                var maxQ = qValueStore.getQValue(newState, qValueStore.getBestAction(newState, newStateActions));
                q = (1 - alpha) * q + alpha * (reward + gamma * maxQ);
                if (previousPath !== undefined) {
                    previousPath.stroke({ color: '#f8f7f7', dasharray: "0" });
                }
                previousPath = RlUtils.findPathWithID(svg, state, newState);
                var pathLength = previousPath.length();
                var direction = state > newState ? -1 : 1;
                previousPath.stroke({
                    color: '#8fdc5d',
                    dasharray: "" + pathLength + ", " + pathLength,
                    dashoffset: pathLength * direction,
                    width: q * 2 + 10
                });
                // let strokeData: SVG.StrokeData = previousPath.stroke();
                // strokeData.color = "red";
                // strokeData.dasharray = "" + pathLength + ", " + pathLength;
                // strokeData.dashoffset = pathLength * direction;
                // strokeData.width = q * 2 + 10
                previousPath.animate(200).attr("stroke-dashoffset", "0");
                // previousPath.animate({
                //     duration: 400,
                //     delay: 0,
                //     when: 'now',
                // }).attr("stroke-dashoffset", 0);
                qValueStore.storeQValue(state, action, q);
                console.log("state " + state + " > " + newState + "; reward " + reward + "; q " + q + "; maxQ " + maxQ);
                state = newState;
                timeLimit = timeLimit - (Date.now() - startTime);
                episodes = episodes - 1;
                if (!((timeLimit > 0) && (episodes > 0))) {
                    previousPath.stroke({ color: '#f8f7f7', dasharray: "0" });
                    clearInterval(timer);
                    callback(qValueStore, problem);
                }
            }, 200);
            return qValueStore;
        };
        return QLearningAlgorithm;
    }());
});
