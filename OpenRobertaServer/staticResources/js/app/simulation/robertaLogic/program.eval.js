/**
 * Interpreter of program that is running in the simulation. This interpreter
 * reads every statement of the program and gives command to the simulation what
 * the robot should do.
 */
define([ 'robertaLogic.actors', 'robertaLogic.memory', 'robertaLogic.program' ], function(Actors, Memory, Program) {
    var privateMem = new WeakMap();

    var internal = function(object) {
        if (!privateMem.has(object)) {
            privateMem.set(object, {});
        }
        return privateMem.get(object);
    }

    var ProgramEval = function() {
        internal(this).program = new Program();
        internal(this).memory = new Memory();
        internal(this).actors = new Actors();
        internal(this).simulationData = {};
        internal(this).outputCommands = {};
    };

    ProgramEval.prototype.getProgram = function() {
        return internal(this).program;
    };

    /**
     * Initialize the program that is executed in the simulation.
     * 
     * @param program
     *            {Object} - list of statements representing the program
     */
    ProgramEval.prototype.initProgram = function(program) {
        internal(this).memory.clear();
        internal(this).program.setNextStatement(true);
        internal(this).program.setWait(false);
        internal(this).program.set(program);
        internal(this).actors.resetMotorsSpeed();
    };

    /**
     * Function that executes one step of the program.
     * 
     * @param simulationData
     *            {Object} - sensor data from the simulation
     */
    ProgramEval.prototype.step = function(simulationData) {
        setSensorActorValues(internal(this), simulationData);
        if (internal(this).program.isNextStatement()) {
            var stmt = internal(this).program.getRemove();
            switch (stmt.stmt) {
            case ASSIGN_STMT:
                var value = evalExpr(internal(this), stmt.expr);
                internal(this).memory.assign(stmt.name, value);
                break;

            case VAR_DECLARATION:
                var value = evalExpr(internal(this), stmt.value);
                internal(this).memory.decl(stmt.name, value);
                break;

            case IF_STMT:
                evalIf(internal(this), stmt);
                this.step(simulationData);
                break;

            case REPEAT_STMT:
                evalRepeat(internal(this), stmt);
                this.step(simulationData);
                break;

            case DRIVE_ACTION:
                evalDriveAction(internal(this), stmt);
                break;

            case TURN_ACTION:
                evalTurnAction(internal(this), stmt);
                break;

            case MOTOR_ON_ACTION:
                evalMotorOnAction(internal(this), stmt);
                break;

            case SHOW_TEXT_ACTION:
                evalShowTextAction(internal(this), stmt);
                break;

            case WAIT_STMT:
                evalWaitStmt(internal(this), stmt);
                break;

            case WAIT_TIME_STMT:
                evalWaitTime(internal(this), simulationData, stmt);
                break;

            case TURN_LIGHT:
                evalLedOnAction(internal(this), simulationData, stmt);
                break;

            case STOP_DRIVE:
                internal(this).actors.setSpeed(0);
                break;

            case MOTOR_STOP:
                evalMotorStopAction(internal(this), stmt);
                break;

            case MOTOR_SET_POWER:
                evalMotorSetPowerAction(internal(this), stmt);
                break;

            case RESET_LIGHT:
                evalLedResetAction(internal(this));
                break;

            case ENCODER_SENSOR_RESET:
                evalResetEncoderSensor(internal(this), stmt);
                break;

            default:
                throw "Invalid Statement " + stmt.stmt + "!";
            }
        }
        newSpeeds = internal(this).actors.checkCoveredDistanceAndCorrectSpeed(internal(this).program, internal(this).simulationData.correctDrive);
        internal(this).program.handleWaitTimer();
        outputSpeeds(internal(this), newSpeeds)
        return internal(this).outputCommands;

    };

    var setSensorActorValues = function(obj, simulationData) {
        obj.simulationData = simulationData;
        obj.actors.getLeftMotor().setCurrentRotations(simulationData.encoder.left);
        obj.actors.getRightMotor().setCurrentRotations(simulationData.encoder.right);
        obj.program.getTimer().setCurrentTime(simulationData.time);
        obj.program.setNextFrameTimeDuration(simulationData.frameTime);
    };

    var outputSpeeds = function(obj, speeds) {
        obj.outputCommands.motors = {};
        obj.outputCommands.motors.powerLeft = obj.actors.getLeftMotor().getPower();
        obj.outputCommands.motors.powerRight = obj.actors.getRightMotor().getPower();
        if (speeds.left) {
            obj.outputCommands.motors.powerLeft = speeds.left;
        }
        if (speeds.right) {
            obj.outputCommands.motors.powerRight = speeds.right;
        }
    };

    var evalResetEncoderSensor = function(obj, stmt) {
        if (stmt[MOTOR_SIDE] == MOTOR_LEFT) {
            obj.actors.initLeftTachoMotor(0);
        } else {
            obj.actors.initRightTachoMotor(0);
        }
    };

    var evalWaitTime = function(obj, simulationData, stmt) {
        obj.program.setIsRunningTimer(true);
        obj.program.resetTimer(simulationData.time);
        obj.program.setTimer(evalExpr(obj, stmt.time));
    };

    var evalLedOnAction = function(obj, simulationData, stmt) {
        obj.outputCommands.led = {}
        obj.outputCommands.led.color = stmt.color;
        obj.outputCommands.led.mode = stmt.mode;
    };

    var evalLedResetAction = function(obj) {
        obj.outputCommands.led.color = '';
        obj.outputCommands.led.mode = OFF;
    };

    var evalShowTextAction = function(obj, stmt) {
        obj.outputCommands.display = {};
        obj.outputCommands.display.text = evalExpr(obj, stmt.text);
        obj.outputCommands.display.x = evalExpr(obj, stmt.x);
        obj.outputCommands.display.y = evalExpr(obj, stmt.y);
    };

    var evalTurnAction = function(obj, simulationData, stmt) {
        obj.actors.initTachoMotors(obj.simulationData.encoder.left, obj.simulationData.encoder.right);
        obj.actors.setAngleSpeed(evalExpr(obj, stmt.speed), stmt[TURN_DIRECTION]);
        setAngleToTurn(obj, stmt);
    };

    var evalDriveAction = function(obj, stmt) {
        obj.actors.initTachoMotors(obj.simulationData.encoder.left, obj.simulationData.encoder.right);
        obj.actors.setSpeed(evalExpr(obj, stmt.speed), stmt[DRIVE_DIRECTION]);
        setDistanceToDrive(obj, stmt);
    };

    var evalMotorOnAction = function(obj, stmt) {
        if (stmt[MOTOR_SIDE] == MOTOR_LEFT) {
            obj.actors.initLeftTachoMotor(obj.simulationData.encoder.left);
            obj.actors.setLeftMotorSpeed(evalExpr(obj, stmt.speed));
        } else {
            obj.actors.initRightTachoMotor(obj.simulationData.encoder.right);
            obj.actors.setRightMotorSpeed(evalExpr(obj, stmt.speed));
        }
        setDurationToCover(obj, stmt);
    };

    var evalMotorSetPowerAction = function(obj, stmt) {
        if (stmt[MOTOR_SIDE] == MOTOR_LEFT) {
            obj.actors.setLeftMotorSpeed(evalExpr(obj, stmt.speed));
        } else {
            obj.actors.setRightMotorSpeed(evalExpr(obj, stmt.speed));
        }
    };

    var evalMotorStopAction = function(obj, stmt) {
        if (stmt[MOTOR_SIDE] == MOTOR_LEFT) {
            obj.actors.setLeftMotorSpeed(0);
        } else {
            obj.actors.setRightMotorSpeed(0);
        }
    };

    var evalMotorGetPowerAction = function(obj, motorSide) {
        if (motorSide == MOTOR_LEFT) {
            return obj.actors.getLeftMotor().getPower();
        } else {
            return obj.actors.getRightMotor().getPower();
        }
    };

    var setAngleToTurn = function(obj, stmt) {
        if (stmt.angle) {
            obj.actors.calculateAngleToCover(obj.program, evalExpr(obj, stmt.angle));
        }
    };

    var setDistanceToDrive = function(obj, stmt) {
        if (stmt.distance) {
            obj.actors.setDistanceToCover(obj.program, evalExpr(obj, stmt.distance));
        }
    };

    var setDurationToCover = function(obj, stmt) {
        if (stmt[MOTOR_DURATION]) {
            obj.actors.setMotorDuration(obj.program, (stmt[MOTOR_DURATION]).motorMoveMode, evalExpr(obj, (stmt[MOTOR_DURATION]).motorDurationValue),
                    stmt[MOTOR_SIDE]);
        }
    };

    var evalRepeat = function(obj, stmt) {
        switch (stmt.mode) {
        case TIMES:
            for (var i = 0; i < evalExpr(obj, stmt.expr); i++) {
                obj.program.prepend(stmt.stmtList);
            }
            break;
        default:
            var value = evalExpr(obj, stmt.expr);
            if (value) {
                obj.program.prepend([ stmt ]);
                obj.program.prepend(stmt.stmtList);
            }
        }
    };

    var evalIf = function(obj, stmt) {
        var programPrefix;
        var value;
        for (var i = 0; i < stmt.exprList.length; i++) {
            value = evalExpr(obj, stmt.exprList[i]);
            if (value) {
                programPrefix = stmt.thenList[i];
                if (obj.program.isWait()) {
                    obj.program.getRemove();
                    obj.program.setWait(false);
                }
                break;
            }
        }
        if ((programPrefix == undefined || programPrefix == []) && !obj.program.isWait()) {
            programPrefix = stmt.elseStmts;
        }
        obj.program.prepend(programPrefix);
        return value;
    };

    var evalWaitStmt = function(obj, stmt) {
        obj.program.setWait(true);
        obj.program.prepend([ stmt ]);
        for (var i = 0; i < stmt.statements.length; i++) {
            var value = evalIf(obj, stmt.statements[i]);
            if (value) {
                break;
            }
        }
    };

    var evalExpr = function(obj, expr) {
        switch (expr.expr) {
        case NUM_CONST:
        case BOOL_CONST:
        case COLOR_CONST:
        case STRING_CONST:
            return expr.value;
        case VAR:
            return obj.memory.get(expr.name);
        case BINARY:
            return evalBinary(obj, expr.op, expr.left, expr.right);
        case UNARY:
            return evalUnary(obj, expr.op, expr.value);
        case SINGLE_FUNCTION:
            return evalSingleFunction(obj, expr.op, expr.value);
        case RANDOM_INT:
            return evalRandInt(obj, expr.min, expr.max);
        case RANDOM_DOUBLE:
            return evalRandDouble();
        case MATH_CONSTRAIN_FUNCTION:
            return evalMathPropFunct(obj, expr.value, expr.min, expr.max);
        case MATH_PROP_FUNCT:
            return evalMathPropFunct(obj, expr.op, expr.arg1, expr.arg2);
        case MATH_CONST:
            return evalMathConst(obj, expr.value);
        case GET_SAMPLE:
            return evalSensor(obj, expr[SENSOR_TYPE], expr[SENSOR_MODE]);
        case ENCODER_SENSOR_SAMPLE:
            return evalEncoderSensor(obj, expr.motorSide, expr.sensorMode);
        case MOTOR_GET_POWER:
            return evalMotorGetPowerAction(obj, expr.motorSide);
            break;
        default:
            throw "Invalid Expression Type!";
        }
    };

    var evalSensor = function(obj, sensorType, sensorMode) {
        switch (sensorType) {
        case TOUCH:
            return obj.simulationData.touch;
        case ULTRASONIC:
            return obj.simulationData.ultrasonic[sensorMode];
        case RED:
            return obj.simulationData.color.lightValue;
        case COLOUR:
            return obj.simulationData.color.colorValue;
        case ANGLE:
            return obj.simulationData.gyro.angle;
        case RATE:
            return obj.simulationData.gyro.rate;
        default:
            throw "Invalid Sensor!";
        }
    };

    var evalEncoderSensor = function(obj, motorSide, sensorMode) {
        var motor = obj.actors.getRightMotor();
        if (motorSide == MOTOR_LEFT) {
            motor = obj.actors.getLeftMotor()
        }
        switch (sensorMode) {
        case ROTATION:
            return motor.getCurrentRotations();
        case DEGREE:
            return motor.getCurrentRotations() * 360.;
        case DISTANCE:
            return motor.getCurrentRotations() * (WHEEL_DIAMETER * 3.14);
        default:
            throw "Invalid Encoder Mode!";
        }
    };

    var evalBinary = function(obj, op, left, right) {
        var valLeft = evalExpr(obj, left);
        var valRight = evalExpr(obj, right);
        var val;
        switch (op) {
        case ADD:
            val = valLeft + valRight;
            break;
        case MINUS:
            val = valLeft - valRight;
            break;
        case MULTIPLY:
            val = valLeft * valRight;
            break;
        case DIVIDE:
            val = valLeft / valRight;
            break;
        case POWER:
            val = Math.pow(valLeft, valRight);
            break;
        case LT:
            val = valLeft < valRight;
            break;
        case GT:
            val = valLeft > valRight;
            break;
        case EQ:
            val = valLeft == valRight;
            break;
        case NEQ:
            val = valLeft != valRight;
            break;
        case GTE:
            val = valLeft >= valRight;
            break;
        case LTE:
            val = valLeft <= valRight;
            break;
        case OR:
            val = valLeft || valRight;
            break;
        case AND:
            val = valLeft && valRight;
            break;
        case MOD:
            val = valLeft % valRight;
            break;
        default:
            throw "Invalid Binary Operator";
        }
        return val;
    };

    var evalUnary = function(obj, op, value) {
        var val = evalExpr(obj, value);
        switch (op) {
        case NEG:
            return -val;
        default:
            throw "Invalid Unary Operator";
        }
    };

    var evalSingleFunction = function(obj, functName, value) {
        var val = evalExpr(obj, value);
        switch (functName) {
        case 'ROOT':
            return Math.sqrt(val);
        case 'ABS':
            return Math.abs(val);
        case 'LN':
            return Math.log(val);
        case 'LOG10':
            return Math.log10(val);
        case 'EXP':
            return Math.exp(val);
        case 'POW10':
            return Math.pow(10, val);
        case 'SIN':
            return Math.sin(val);
        case 'COS':
            return Math.cos(val);
        case 'TAN':
            return Math.tan(val);
        case 'ASIN':
            return Math.asin(val);
        case 'ATAN':
            return Math.atan(val);
        case 'ACOS':
            return Math.acos(val);
        case 'ROUND':
            return Math.round(val);
        case 'ROUNDUP':
            return Math.ceil(val);
        case 'ROUNDDOWN':
            return Math.floor(val);
        default:
            throw "Invalid Function Name";
        }
    };

    var evalMathConst = function(obj, mathConst) {
        switch (mathConst) {
        case 'PI':
            return Math.PI;
        case 'E':
            return Math.E;
        case 'GOLDEN_RATIO':
            return (1.0 + Math.sqrt(5.0)) / 2.0;
        case 'SQRT2':
            return Math.SQRT2;
        case 'SQRT1_2':
            return Math.SQRT1_2;
        case 'INFINITY':
            return Infinity;
        default:
            throw "Invalid Math Constant Name";
        }
    };

    var evalMathPropFunct = function(obj, val, min, max) {
        var val_ = evalExpr(obj, val);
        var min_ = evalExpr(obj, min);
        var max_ = evalExpr(obj, max);
        return Math.min(Math.max(val_, min_), max_);
    };

    var evalMathConstrainFunct = function(obj, val, min, max) {
        var val1 = evalExpr(obj, arg1);
        if (arg2) {
            var val2 = evalExpr(obj, arg2);
        }
        switch (functName) {
        case 'EVEN':
            return val1 % 2 == 0;
        case 'ODD':
            return val1 % 2 != 0;
        case 'PRIME':
            return isPrime(val1);
        case 'WHOLE':
            return Number(val1) === val1 && val1 % 1 === 0;
        case 'POSITIVE':
            return val1 >= 0;
        case 'NEGATIVE':
            return val1 < 0;
        case 'DIVISIBLE_BY':
            return val1 % val2 == 0;
        default:
            throw "Invalid Math Property Function Name";
        }
    };

    function evalRandInt(obj, min, max) {
        min_ = evalExpr(obj, min);
        max_ = evalExpr(obj, max)
        return math_random_int(min_, max_);
    }

    var evalRandDouble = function() {
        return Math.random();
    };

    var isPrime = function(n) {
        if (isNaN(n) || !isFinite(n) || n % 1 || n < 2) {
            return false;
        }
        if (n == leastFactor(n)) {
            return true;
        }
        return false;
    };

    var leastFactor = function(n) {
        if (isNaN(n) || !isFinite(n)) {
            return NaN;
        }
        if (n == 0) {
            return 0;
        }
        if (n % 1 || n * n < 2) {
            return 1;
        }
        if (n % 2 == 0) {
            return 2;
        }
        if (n % 3 == 0) {
            return 3;
        }
        if (n % 5 == 0) {
            return 5;
        }
        var m = Math.sqrt(n);
        for (var i = 7; i <= m; i += 30) {
            if (n % i == 0) {
                return i;
            }
            if (n % (i + 4) == 0) {
                return i + 4;
            }
            if (n % (i + 6) == 0) {
                return i + 6;
            }
            if (n % (i + 10) == 0) {
                return i + 10;
            }
            if (n % (i + 12) == 0) {
                return i + 12;
            }
            if (n % (i + 16) == 0) {
                return i + 16;
            }
            if (n % (i + 22) == 0) {
                return i + 22;
            }
            if (n % (i + 24) == 0) {
                return i + 24;
            }
        }
        return n;
    };

    var math_random_int = function(a, b) {
        if (a > b) {
            // Swap a and b to ensure a is smaller.
            var c = a;
            a = b;
            b = c;
        }
        return Math.floor(Math.random() * (b - a + 1) + a);
    };

    return ProgramEval;
});
