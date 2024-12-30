// IDENTIFIERS_USED=armMotorAsDcMotor,backLeftWheelAsDcMotor,backRightMotorAsDcMotor,clawServoAsServo,ControlHubAsVoltageSensor,frontLeftWheelAsDcMotor,frontRightWheelAsDcMotor,pivotServoAsServo

var xPwr, yPwr, seconds, power, angle, endPower, speedOffset;

/**
 * may be unreliable
 */
function moveWithVectors(xPwr, yPwr, seconds) {
  xPwr = xPwr * speedOffset;
  yPwr = yPwr * speedOffset;
  frontLeftWheelAsDcMotor.setDualPower(yPwr + xPwr, frontRightWheelAsDcMotor, yPwr - xPwr);
  backLeftWheelAsDcMotor.setDualPower(yPwr - xPwr, backRightMotorAsDcMotor, yPwr + xPwr);
  linearOpMode.sleep(seconds * 1000);
  frontLeftWheelAsDcMotor.setDualPower(0, frontRightWheelAsDcMotor, 0);
  backLeftWheelAsDcMotor.setDualPower(0, backRightMotorAsDcMotor, 0);
}

/**
 * This sample contains the bare minimum Blocks for any regular OpMode. The 3 blue
 * Comment Blocks show where to place Initialization code (runs once, after touching the
 * DS INIT button, and before touching the DS
 * Start arrow), Run code (runs once, after
 * touching Start), and Loop code (runs repeatedly
 * while the OpMode is active, namely not
 * Stopped).
 */
function runOpMode() {
  clawServoAsServo.setPosition(1);
  frontLeftWheelAsDcMotor.setDirection("REVERSE");
  backLeftWheelAsDcMotor.setDirection("REVERSE");
  speedOffset = 1 + ControlHubAsVoltageSensor.getVoltage() / 200;
  telemetry.addNumericData('multiplier', speedOffset);
  telemetry.update();
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    Push_Starting_Sample();
    Push_Yellow_Samples();
    Touch_Low_Rung();
  }
  pivotServoAsServo.setPosition(0);
}

/**
 * may be unreliable
 */
function strafeWithAngle(power, angle, seconds) {
  xPwr = (typeof xPwr == 'number' ? xPwr : 0) + power * Math.cos(angle / 180 * Math.PI) * speedOffset;
  yPwr = (typeof yPwr == 'number' ? yPwr : 0) + power * Math.sin(angle / 180 * Math.PI) * speedOffset;
  frontLeftWheelAsDcMotor.setDualPower(yPwr + xPwr, frontRightWheelAsDcMotor, yPwr - xPwr);
  backLeftWheelAsDcMotor.setDualPower(yPwr - xPwr, backRightMotorAsDcMotor, yPwr + xPwr);
  linearOpMode.sleep(seconds * 1000);
  frontLeftWheelAsDcMotor.setDualPower(0, frontRightWheelAsDcMotor, 0);
  backLeftWheelAsDcMotor.setDualPower(0, backRightMotorAsDcMotor, 0);
}

/**
 * Describe this function...
 */
function Push_Yellow_Samples() {
  moveWithVectors(0.4, 0, 1);
  moveWithVectors(0, 0.4, 1.9);
  moveWithVectors(-0.3, 0, 0.8);
  moveWithVectors(0, -0.3, 1.3);
  turn(-0.5, 0.25);
  moveWithVectors(0, -0.4, 0.9);
  moveWithVectors(0, 0.4, 0.9);
  turn(0.5, 0.25);
  moveWithVectors(0, 0.4, 1.1);
  moveWithVectors(-0.2, 0, 1.2);
  moveWithVectors(0, -0.3, 2.9);
  moveWithVectors(0, 0.4, 2.1);
}

/**
 * Strafes
 * Right | Left
 *     1   |  -1
 */
function turn(power, seconds) {
  power = power * speedOffset;
  frontLeftWheelAsDcMotor.setDualPower(-power, frontRightWheelAsDcMotor, power);
  backLeftWheelAsDcMotor.setDualPower(-power, backRightMotorAsDcMotor, power);
  linearOpMode.sleep(seconds * 1000);
  frontLeftWheelAsDcMotor.setDualPower(0, frontRightWheelAsDcMotor, 0);
  backLeftWheelAsDcMotor.setDualPower(0, backRightMotorAsDcMotor, 0);
}

/**
 * Describe this function...
 */
function Push_Starting_Sample() {
  arm(-0.4, -0.1, 0.13);
  moveWithVectors(0, 0.3, 0.2);
  moveWithVectors(-0.4, 0, 1.6);
  linearOpMode.sleep(500);
}

/**
 * Describe this function...
 */
function Touch_Low_Rung() {
  turn(0.4, 0.85);
  moveWithVectors(0, -0.4, 0.8);
  openClaw();
  arm(-0.3, 0, 10);
}

/**
 * Describe this function...
 */
function arm(power, endPower, seconds) {
  armMotorAsDcMotor.setPower(power);
  linearOpMode.sleep(seconds * 1000);
  armMotorAsDcMotor.setPower(endPower);
}

/**
 * Describe this function...
 */
function Hang_Specimen() {
  arm(-0.3, -0.1, 3.8);
  moveWithVectors(0.45, 0.38, 0.83);
  linearOpMode.sleep(500);
  arm(0.2, 0, 0.1);
  linearOpMode.sleep(150);
  openClaw();
  moveWithVectors(-0.45, -0.38, 0.83);
  linearOpMode.sleep(1000);
  Push_Yellow_Samples();
}

/**
 * Describe this function...
 */
function openClaw() {
  clawServoAsServo.setPosition(0.5);
  linearOpMode.sleep(700);
}

/**
 * Describe this function...
 */
function closeClaw() {
  clawServoAsServo.setPosition(0);
  linearOpMode.sleep(700);
}
