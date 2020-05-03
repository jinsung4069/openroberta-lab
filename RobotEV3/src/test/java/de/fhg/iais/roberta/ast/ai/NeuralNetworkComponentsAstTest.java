package de.fhg.iais.roberta.ast.ai;

import org.junit.Ignore;
import org.junit.Test;

import de.fhg.iais.roberta.ast.AstTest;
import de.fhg.iais.roberta.util.test.UnitTestHelper;

public class NeuralNetworkComponentsAstTest extends AstTest {

    @Test
    public void validateInputNode() throws Exception {
        String a =
            "BlockAST[project=[[Location[x=188,y=337],AiInput[UltrasonicSensor[1,DISTANCE,NO_SLOT],Threshold=0]]]]";
        UnitTestHelper.checkProgramAstEquality(testFactory, a, "/ast/ai/input_node.xml");
    }
    @Ignore
    @Test
    public void validateOutputNode() throws Exception{
        String a =
            "BlockAST[project=[[Location[x=112,y=112],AiOutput[MotorGetPower[port=A]]]]]";
        UnitTestHelper.checkProgramAstEquality(testFactory, a, "/ast/ai/output_node.xml");
    }
    @Ignore
    @Test
    public void validateNeuralNetwork() throws Exception {
        String a =
            "BlockAST[project=[[Location[x=-238,y=-312],AiNeuralNetwork[Input-Layer:ListCreate[INPUTNODE,AiInput[UltrasonicSensor[1,DISTANCE,NO_SLOT],Threshold=0],AiInput[UltrasonicSensor[2,DISTANCE,NO_SLOT],Threshold=0]]Output-Layer:ListCreate[OUTPUTNODE,AiOutput[MotorGetPower[port=A]],AiOutput[MotorGetPower[port=B]]]]]]]";
        UnitTestHelper.checkProgramAstEquality(testFactory, a, "/ast/ai/ai_neural_network_test.xml");
    }


    @Ignore
    @Test
    public void reverseTransformation() throws Exception {
        UnitTestHelper.checkProgramReverseTransformation(testFactory, "/ast/sensors/sensor_setUltrasonic.xml");
    }

}