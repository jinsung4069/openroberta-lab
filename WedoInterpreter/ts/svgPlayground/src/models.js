define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ResultState;
    (function (ResultState) {
        ResultState[ResultState["SUCCESS"] = 1] = "SUCCESS";
        ResultState[ResultState["ERROR"] = 2] = "ERROR";
    })(ResultState = exports.ResultState || (exports.ResultState = {}));
    var Rho;
    (function (Rho) {
        Rho["EXPLOIT"] = "nutze das Wissen aus";
        Rho["EXPLORE"] = "erkunde";
    })(Rho = exports.Rho || (exports.Rho = {}));
    var Nu;
    (function (Nu) {
        Nu[Nu["STAY_ON_PATH"] = 0] = "STAY_ON_PATH";
        Nu[Nu["RANDOM_STATE"] = 1] = "RANDOM_STATE";
    })(Nu = exports.Nu || (exports.Nu = {}));
    var RunningState;
    (function (RunningState) {
        RunningState[RunningState["PAUSE"] = 0] = "PAUSE";
        RunningState[RunningState["STOP"] = 1] = "STOP";
        RunningState[RunningState["PLAY"] = 2] = "PLAY";
    })(RunningState = exports.RunningState || (exports.RunningState = {}));
});
//# sourceMappingURL=models.js.map