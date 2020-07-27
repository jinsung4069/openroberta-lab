package de.fhg.iais.roberta.syntax;

/**
 * This class contains all Blockly name constants that are used in the XML representation of the block.
 */
public final class BlocklyConstants {
    private BlocklyConstants() {
        // no objects :-)
    }

    public static final String THRESHOLD = "THRESHOLD";
    public static final String ACTOR = "ACTOR";
    public static final String INPUTNODE = "INPUTNODE";
    public static final String OUTPUTNODE = "OUTPUTNODE";
    public static final String INPUT_LAYER = "INPUT_LAYER";
    public static final String OUTPUT_LAYER = "OUTPUT_LAYER";
    public static final String OBSTACLE = "OBSTACLE";
    public static final String QLEARNING_START = "START"; //TODO Blockly ändern
    public static final String QLEARNING_FINISH = "FINISH"; //TODO Blockly ändern
    public static final String QLEARNING_ALPHA = "ALPHA"; //TODO Blockly ändern
    public static final String QLEARNING_GAMMA = "GAMMA"; //TODO Blockly ändern
    public static final String QLEARNING_NU = "NU"; //TODO Blockly ändern
    public static final String QLEARNING_RHO = "RHO"; //TODO Blockly ändern
    public static final String MAP = "MAP"; //TODO Blockly ändern
    public static final String QLEARNING_EPISODES = "EPISODES"; //TODO Blockly ändern
    public static final String QLEARNING_TIME = "Q_LEARNER_TIME"; //TODO Blockly ändern



    public static final String ADD = "ADD";
    public static final String ELSE = "ELSE";
    public static final String THEN = "THEN";
    public static final String IF = "IF";
    public static final String ACTIVITY = "ACTIVITY";
    public static final String FLOW = "FLOW";
    public static final String TIMES = "TIMES";
    public static final String FOR_EACH = "FOR_EACH";
    public static final String FOR = "FOR";
    public static final String BY = "BY";
    public static final String DO = "DO";
    public static final String WAIT = "WAIT"; //NOSONAR : clash with method "wait" defined in superclass "java.lang.Object" is no problem
    public static final String COLOUR = "COLOUR";
    public static final String AT1 = "AT1";
    public static final String AT2 = "AT2";
    public static final String WHERE2 = "WHERE2";
    public static final String WHERE1 = "WHERE1";
    public static final String WHERE = "WHERE";
    public static final String AT = "AT";
    public static final String ITEM = "ITEM";
    public static final String TO = "TO";
    public static final String FROM = "FROM";
    public static final String HIGH = "HIGH";
    public static final String LOW = "LOW";
    public static final String MOD = "MOD";
    public static final String LIST = "LIST";
    public static final String DIVISOR = "DIVISOR";
    public static final String DIVISIBLE_BY = "DIVISIBLE_BY";
    public static final String NUMBER_TO_CHECK = "NUMBER_TO_CHECK";
    public static final String END = "END";
    public static final String FIND = "FIND";
    public static final String TEXT = "TEXT";
    public static final String PROPERTY = "PROPERTY";
    public static final String CONSTANT = "CONSTANT";
    public static final String NUM = "NUM";
    public static final String NOT = "NOT";
    public static final String BOOL = "BOOL";
    public static final String OP = "OP";
    public static final String B = "B";
    public static final String A = "A";
    public static final String SENSORTYPE = "SENSORTYPE";
    public static final String SENSORNUM = "SENSORNUM";
    public static final String KEY = "KEY";
    public static final String SENSORPORT = "SENSORPORT";
    public static final String SWITCH_BLINK = "SWITCH_BLINK";
    public static final String SWITCH_COLOR = "SWITCH_COLOR";
    public static final String SWITCH_STATE = "SWITCH_STATE";
    public static final String VOLUME = "VOLUME";
    public static final String FILE = "FILE";
    public static final String DURATION = "DURATION";
    public static final String FREQUENCE = "FREQUENCE";
    public static final String FREQUENCY = "FREQUENCY";
    public static final String PICTURE = "PICTURE";
    public static final String ROW = "ROW";
    public static final String COL = "COL";
    public static final String OUT = "OUT";
    public static final String DEGREE = "DEGREE";
    public static final String MOTORROTATION = "MOTORROTATION";
    public static final String DISTANCE = "DISTANCE";
    public static final String DIRECTION = "DIRECTION";
    public static final String DIRECTION_LEFT = "DIRECTION_LEFT";
    public static final String DIRECTION_RIGHT = "DIRECTION_RIGHT";
    public static final String VALUE = "VALUE";
    public static final String POWER = "POWER";
    public static final String POWER_A = "POWER_A";
    public static final String POWER_B = "POWER_B";
    public static final String POWER_LEFT = "POWER_LEFT";
    public static final String POWER_RIGHT = "POWER_RIGHT";
    public static final String MOTORPORT = "MOTORPORT";
    public static final String VAR = "VAR";
    public static final String TYPE = "TYPE";
    public static final String ST = "ST";
    public static final String LIST_TYPE = "LIST_TYPE";
    public static final String DELTA = "DELTA";
    public static final String NEG = "NEG";
    public static final String DIVIDEND = "DIVIDEND";
    public static final String NAME = "NAME";
    public static final String STACK = "STACK";
    public static final String RETURN = "RETURN";
    public static final String CONDITION = "CONDITION";
    public static final String ARG = "ARG";
    public static final String NUMBER = "NUMBER";
    public static final String CONNECTION = "CONNECTION";
    public static final String CHANNEL = "CHANNEL";
    public static final String MESSAGE = "sendData";
    public static final String ADDRESS = "ADDRESS";
    public static final String BRIGHTNESS = "BRIGHTNESS";
    public static final String JOYSTICKAXIS = "JOYSTICKAXIS";
    public static final String STATE = "STATE";
    public static final String EXPRESSION = "EXPRESSION";

    public static final String STRING_CONST_TEXT = "text";

    public static final String ROB_CONTROLS_START_ACTIVITY = "robControls_start_activity";
    public static final String ROB_ACTIONS_MOTOR_DIFF_ON = "robActions_motorDiff_on";
    public static final String ROB_ACTIONS_BRICK_LIGHT_OFF = "robActions_brickLight_off";
    public static final String ROB_ACTIONS_MOTOR_DIFF_TURN = "robActions_motorDiff_turn";
    public static final String ROB_ACTIONS_MOTOR_ON = "robActions_motor_on";
    public static final String ROB_ACTIONS_PLAY_SET_VOLUME = "robActions_play_setVolume";
    public static final String ROB_SENSORS_GYRO_RESET = "robSensors_gyro_reset";
    public static final String ROB_SENSORS_ENCODER_RESET = "robSensors_encoder_reset";
    public static final String ROB_SENSORS_TIMER_RESET = "robSensors_timer_reset";
    public static final String ROB_SENSORS_TIMER_RESET_CALLIOPE = "mbedSensors_timer_reset";
    public static final String ROB_SENSORS_COMPASS_CALIBRATE = "robSensors_compass_calibrate";
    public static final String ROB_SENSOR_COLOUR_GET_SAMPLE = "robSensors_colour_getSample";
    public static final String ROB_SENSOR_LIGHT_GET_SAMPLE = "robSensors_light_getSample";
    public static final String ROB_SENSOR_SOUND_GET_SAMPLE = "robSensors_sound_getSample";
    public static final String ROB_SENSOR_TOUCH_IS_PRESSED = "robSensors_touch_isPressed";
    public static final String ROB_SENSOR_COMPASS_GET_SAMPLE = "robSensors_compass_getSample";
    public static final String ROB_SENSOR_MICROPHONE_GET_SAMPLE = "robSensors_microphone_getSample";
    public static final String ROB_SENSOR_VOLTAGE_GET_SAMPLE = "robSensors_battery_getSample";
    public static final String ROB_SENSOR_ULTRASONIC_GET_SAMPLE = "robSensors_ultrasonic_getSample";
    public static final String ROB_SENSOR_INFRARED_GET_SAMPLE = "robSensors_infrared_getSample";
    public static final String ROB_SENSOR_ENCODER_GET_SAMPLE = "robSensors_encoder_getSample";
    public static final String ROB_SENSOR_KEY_IS_PRESSED = "robSensors_key_isPressed";
    public static final String ROB_SENSOR_GYRO_GET_SAMPLE = "robSensors_gyro_getSample";
    public static final String ROB_SENSOR_TIMER_GET_SAMPLE = "robSensors_timer_getSample";
    public static final String ROB_SENSOR_TIMER_GET_SAMPLE_CALLIOPE = "mbedsensors_timer_getsample";
    public static final String ROB_SENSOR_GET_SAMPLE = "robSensors_getSample";
    public static final String ROB_SENSOR_GET_SAMPLE_ARDU = "robSensors_getSample_ardu";
    public static final String ROB_COLOUR_PICKER = "robColour_picker";
    public static final String CONNECTION_NXT = "robCommunication_connection";

    public static final String MBED_SENSOR_TEMPERATURE_GET_SAMPLE = "mbedSensors_temperature_getSample";
    public static final String ROB_SENSOR_TEMPERATURE_GET_SAMPLE = "makeblockSensors_temperature_getSample";

    public static final String ROB_GLOBAL_VARIABLES_DECLARE = "robGlobalvariables_declare";
    public static final String ROB_LOCAL_VARIABLES_DECLARE = "robLocalVariables_declare";
    public static final String VARIABLE_SET = "variables_set";
    public static final String VARIABLE_GET = "variables_get";

    public static final String ROB_CONTROLS_IF = "robControls_if";
    public static final String ROB_CONTROLS_IF_ELSE = "robControls_ifElse";
    public static final String ROB_CONTROLS_LOOP_FOREVER = "robControls_loopForever";
    public static final String ROB_CONTROLS_LOOP_FOREVER_ARDU = "robControls_loopForever_ardu";
    public static final String CONTROLS_WHILE_UNTIL = "controls_whileUntil";
    public static final String CONTROLS_FOR = "controls_for";
    public static final String ROB_CONTROLS_FOR = "robControls_for";
    public static final String CONTROLS_FOR_EACH = "controls_forEach";
    public static final String ROB_CONTROLS_FOR_EACH = "robControls_forEach";
    public static final String CONTROLS_REPEAT = "controls_repeat";
    public static final String CONTROLS_REPEAT_EXT = "controls_repeat_ext";

    public static final String LOGIC_TERNARY = "logic_ternary";
    public static final String LOGICAL_NULL = "logic_null";
    public static final String LOGICAL_BOOLEAN = "logic_boolean";
    public static final String LOGIC_NEGATE = "logic_negate";
    public static final String LOGIC_COMPARE = "logic_compare";
    public static final String LOGIC_COPERATION = "logic_operation";

    public static final String MATH_ARITHMETIC = "math_arithmetic";
    public static final String ROB_MATH_CHANGE = "robMath_change";
    public static final String MATH_CHANGE = "math_change";
    public static final String MATH_MODULO = "math_modulo";
    public static final String MATH_NUMBER = "math_number";
    public static final String MATH_CONSTANT = "math_constant";
    public static final String MATH_ROUND = "math_round";
    public static final String MATH_TRIG = "math_trig";
    public static final String MATH_SINGLE = "math_single";
    public static final String MATH_ON_LIST = "math_on_list";
    public static final String MATH_ON_CONSTRAINT = "math_constrain";
    public static final String MATH_RANDOM_INT = "math_random_int";
    public static final String MATH_RANDOM_FLOAT = "math_random_float";
    public static final String MATH_NUMBER_PROPERTY = "math_number_property";

    public static final String TEXT_APPEND = "robText_append";
    public static final String ROB_TEXT_JOIN = "robText_join";
    public static final String TEXT_JOIN = "text_join";
    public static final String TEXT_PRINT = "text_print";
    public static final String TEXT_COMMENT = "text_comment";

    public static final String CONTROLS_IF = "controls_if";
    public static final String CONTROLS_FLOW_STATEMENT = "controls_flow_statements";

    public static final String ROB_CONTROLS_WAIT_FOR = "robControls_wait_for";
    public static final String ROB_CONTROLS_WAIT = "robControls_wait";
    public static final String ROB_CONTROLS_WAIT_TIME = "robControls_wait_time";
    public static final String ROB_ACTIONS_MOTOR_DIFF_TURN_FOR = "robActions_motorDiff_turn_for";
    public static final String ROB_ACTIONS_MOTOR_DIFF_ON_FOR = "robActions_motorDiff_on_for";
    public static final String ROB_ACTIONS_DISPLAY_TEXT = "robActions_display_text";
    public static final String ROB_ACTIONS_DISPLAY_PICTURE = "robActions_display_picture";
    public static final String ROB_ACTIONS_PLAY_TONE = "robActions_play_tone";
    public static final String ROB_ACTIONS_BRICK_LIGHT_ON = "robActions_brickLight_on";
    public static final String ROB_ACTIONS_LIGHT_SENSOR_LIGHT_ON = "robActions_sensorLight_on";
    public static final String ROB_ACTIONS_LIGHT_SENSOR_LIGHT_OFF = "robActions_sensorLight_off";
    public static final String ROB_ACTIONS_DISPLAY_CLEAR = "robActions_display_clear";
    public static final String ROB_ACTIONS_MOTOR_ON_FOR = "robActions_motor_on_for";
    public static final String ROB_ACTIONS_MOTOR_ON_FOR_MBED = "mbedActions_motor_on";
    public static final String ROB_ACTIONS_MOTOR_ON_FOR_ARDU = "robActions_motor_on_for_ardu";
    public static final String ROB_ACTIONS_MOTOR_GET_POWER = "robActions_motor_getPower";
    public static final String ROB_ACTIONS_MOTOR_SET_POWER = "robActions_motor_setPower";
    public static final String ROB_ACTIONS_MOTOR_STOP = "robActions_motor_stop";
    public static final String ROB_ACTIONS_MOTOR_DIFF_CURVE = "robActions_motorDiff_curve";
    public static final String ROB_ACTIONS_MOTOR_DIFF_CURVE_FOR = "robActions_motorDiff_curve_for";
    public static final String ROB_ACTIONS_PLAY_FILE = "robActions_play_file";
    public static final String ROB_ACTIONS_PLAY_GET_VOLUME = "robActions_play_getVolume";
    public static final String ROB_ACTIONS_BRICK_LIGHT_RESET = "robActions_brickLight_reset";
    public static final String ROB_ACTIONS_MOTOR_DIFF_STOP = "robActions_motorDiff_stop";

    public static final String ROB_CONTROLS_START = "robControls_start";
    public static final String ROB_CONTROLS_START_ARDU = "robControls_start_ardu";
    public static final String ROB_CONTROLS_ACTIVITY = "robControls_activity";

    public static final String LISTS_CREATE_EMPTY = "lists_create_empty";
    public static final String LISTS_INDEX_OF = "lists_indexOf";
    public static final String ROB_LISTS_INDEX_OF = "robLists_indexOf";
    public static final String LISTS_GET_SUBLIST = "lists_getSublist";
    public static final String ROB_LISTS_GET_SUBLIST = "robLists_getSublist";
    public static final String LISTS_REPEAT = "lists_repeat";
    public static final String ROB_LISTS_REPEAT = "robLists_repeat";
    public static final String LISTS_CREATE_WITH = "lists_create_with";
    public static final String ROB_LISTS_CREATE_WITH = "robLists_create_with";
    public static final String LISTS_GET_INDEX = "lists_getIndex";
    public static final String ROB_LISTS_GET_INDEX = "robLists_getIndex";
    public static final String LISTS_SET_INDEX = "lists_setIndex";
    public static final String ROB_LISTS_SET_INDEX = "robLists_setIndex";
    public static final String LISTS_LENGTH = "lists_length";
    public static final String LISTS_IS_EMPTY = "lists_isEmpty";
    public static final String ROB_LISTS_LENGTH = "robLists_length";
    public static final String ROB_LISTS_IS_EMPTY = "robLists_isEmpty";

    public static final String ROB_PROCEDURES_IF_RETURN = "robProcedures_ifreturn";
    public static final String ROB_PROCEDURES_NO_RETURN = "robProcedures_defnoreturn";
    public static final String ROB_PROCEDURES_CALL_NO_RETURN = "robProcedures_callnoreturn";
    public static final String ROB_PROCEDURES_CALL_RETURN = "robProcedures_callreturn";
    public static final String ROB_PROCEDURES_RETURN = "robProcedures_defreturn";

    public static final String COM_CHECK_CONNECTION = "robCommunication_checkConnection";
    public static final String COM_START_CONNECTION = "robCommunication_startConnection";
    public static final String COM_SEND_BLOCK = "robCommunication_sendBlock";
    public static final String COM_WAIT_CONNECTION = "robCommunication_waitForConnection";
    public static final String COM_RECEIVE_BLOCK = "robCommunication_receiveBlock";
    public static final String STRING = "STRING";
    public static final String TOUCH = "TOUCH";
    public static final String ULTRASONIC = "ULTRASONIC";
    public static final String INFRARED = "INFRARED";
    public static final String ENCODER = "ENCODER";
    public static final String KEY_PRESSED = "KEYS_PRESSED";
    public static final String GYRO = "GYRO";
    public static final String TIME = "TIME";
    public static final String COLOR = "COLOR";
    public static final String NO_COLOR = "NO_COLOR";
    public static final String LIGHT = "LIGHT";
    public static final String LIGHT_VALUE = "LIGHT_VALUE";
    public static final String AMBIENTLIGHT = "AMBIENTLIGHT";
    public static final String SOUND = "SOUND";
    public static final String JOYSTICK = "JOYSTICK";
    public static final String FLAME = "FLAME";
    public static final String PIRMOTION = "PIRMOTION";
    public static final String VOLTAGE = "VOLTAGE";
    public static final String COMPASS = "COMPASS";
    public static final String MICROPHONE = "MICROPHONE";
    public static final String ARMSIDE = "ARM";
    public static final String ARMPART = "ARMPAIR";

    public static final String ROB_BRICK_GYRO = "robBrick_gyro";
    public static final String ROB_BRICK_INFRARED = "robBrick_infrared";
    public static final String ROB_BRICK_ULTRASONIC = "robBrick_ultrasonic";
    public static final String ROB_BRICK_TOUCH = "robBrick_touch";
    public static final String ROB_BRICK_COLOUR = "robBrick_colour";
    public static final String ROB_BRICK_LIGHT = "robBrick_light";
    public static final String ROB_BRICK_SOUND = "robBrick_sound";

    public static final String SIM_LED_ON = "sim_LED_on";
    public static final String SIM_LED_OFF = "sim_LED_off";
    public static final String SENSOR_LIGHT_ON = "sensorLight_on";
    public static final String SENSOR_LIGHT_OFF = "sensorLight_off";

    public static final String SIM_GET_SAMPLE = "sim_getSample";
    public static final String SIM_TOUCH_IS_PRESSED = "sim_touch_isPressed";
    public static final String SIM_ULTRASONIC_GET_SAMPLE = "sim_ultrasonic_getSample";
    public static final String SIM_COLOUR_GET_SAMPLE = "sim_colour_getSample";
    public static final String SIM_LIGHT_GET_SAMPLE = "sim_light_getSample";
    public static final String SIM_SOUND_GET_SAMPLE = "sim_sound_getSample";

    public static final String SIM_MOTOR_ON = "sim_motor_on";
    public static final String SIM_MOTOR_ON_FOR = "sim_motor_on_for";
    public static final String SIM_MOTOR_STOP = "sim_motor_stop";
    public static final String IMAGE = "IMAGE";
    public static final String GESTURE = "GESTURE";
    public static final String GESTURE_ACTIVE = "GESTURE_ACTIVE";
    public static final String TEMPERATURE = "TEMPERATURE";
    public static final String LIGHT_LEVEL = "LIGHT_LEVEL";
    public static final String RED = "RED";
    public static final String GREEN = "GREEN";
    public static final String BLUE = "BLUE";
    public static final String ALPHA = "WHITE";

    public static final String X = "X";
    public static final String Y = "Y";
    public static final String Z = "Z";
    public static final String SPEED = "Speed";
    public static final String THETA = "Theta";
    public static final String INTENSITY = "INTENSITY";
    public static final String LANGUAGE = "LANGUAGE";
    public static final String POSITION = "POSITION";
    public static final String PART = "PART";
    public static final String SIDE = "SIDE";
    public static final String CAMERA = "CAMERA";
    public static final String RESOLUTION = "RESOLUTION";
    public static final String COORDINATE = "COORDINATE";
    public static final String PIN = "PIN";
    public static final String VALUETYPE = "VALUETYPE";
    public static final String VOICEPITCH = "VOICEPITCH";
    public static final String VOICESPEED = "VOICESPEED";

    public static final String MODE = "MODE";
    public static final String PHRASE = "PHRASE";
    public static final String ANSWER = "ANSWER";
    public static final String WORD = "WORD";
    public static final String LED = "LED";
    public static final String LEDNUMBER = "LEDNUMBER";
    public static final String JOINT = "joint";
    public static final String MOVE = "MOVE";
    public static final String FILENAME = "FILENAME";
    public static final String NAO_TOUCHSENSOR = "TOUCHSENSOR";
    public static final String DETECT_FACE = "DETECT_FACE";
    public static final String DETECT_MARK = "DETECT_MARK";
    public static final String NAO_SONAR = "SONAR";
    public static final String NAO_GYROMETER = "GYROMETER";
    public static final String NAO_FACE = "NAO_FACE";
    public static final String NAO_SPEECH = "NAO_SPEECH";
    public static final String ACCELEROMETER = "ACCELEROMETER";
    public static final String NAO_FSR = "FSR";
    public static final String NAO_PHRASE = "PHRASE";
    public static final String ACCELERATION = "ACCELERATION";
    public static final String ORIENTATION = "ORIENTATION";
    public static final String NAO_RECOGNIZEWORD = "RECOGNIZEWORD";
    public static final String CODE = "CODE";
    public static final String PIN_TOUCHED = "PIN_TOUCHED";
    public static final String PINTOUCH = "PINTOUCH";
    public static final String PIN_ANALOG = "PIN_ANALOG";
    public static final String PIN_DIGITAL = "PIN_DIGITAL";
    public static final String PIN_PULSEHIGH = "PIN_PULSEHIGH";
    public static final String PIN_PULSELOW = "PIN_PULSELOW";
    public static final String PIN_PORT = "PIN_PORT";
    public static final String PIN_PULL = "PIN_PULL";
    public static final String DEFAULT = "DEFAULT";
    public static final String NO_PORT = "NO_PORT";
    public static final String NO_SLOT = "NO_SLOT";
    public static final String SLOT = "SLOT";
    public static final String EMPTY_SLOT = "EMPTY_SLOT";
    public static final String ELECTRIC_CURRENT = "ELECTRIC_CURRENT";
    public static final String FSR = "FSR";
    public static final String COLON = "COLON";
    public static final String WALL = "WALL";
    public static final String DROP_OFF = "DROP_OFF";
    public static final String ACTORPORT = "ACTORPORT";
    public static final String LEDSTATE = "LEDSTATE";
    public static final String RELAYSTATE = "RELAYSTATE";
    public static final String MOISTURE = "MOISTURE";
    public static final String POTENTIOMETER = "POTENTIOMETER";
    public static final String HUMIDITY = "HUMIDITY";
    public static final String MOTION = "MOTION";
    public static final String PULSE = "PULSE";
    public static final String DROP = "DROP";
    public static final String RFID = "RFID";
    public static final String SENSOR = "SENSOR";
    public static final String PHEN = "PHEN";
    public static final String ID = "ID";
    public static final String PROTOCOL = "PROTOCOL";
    public static final String TICKMARK = "TICKMARK";
    public static final String ON = "ON";
}