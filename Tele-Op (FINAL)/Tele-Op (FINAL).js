// IDENTIFIERS_USED=armMotorAsDcMotor,backLeftWheelAsDcMotor,backRightMotorAsDcMotor,clawServoAsServo,frontLeftWheelAsDcMotor,frontRightWheelAsDcMotor,gamepad1,gamepad2,pivotServoAsServo

var xPwr, rPwr, yPwr, armInversed, speed, armTurboMode, armSlowMode, armTurboTurboMode;

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
  linearOpMode.waitForStart();
  if (linearOpMode.opModeIsActive()) {
    armMotorAsDcMotor.setZeroPowerBehavior("BRAKE");
    backLeftWheelAsDcMotor.setDirection("REVERSE");
    frontLeftWheelAsDcMotor.setDirection("REVERSE");
    clawServoAsServo.setPosition(0.5);
    pivotServoAsServo.setPosition(0);
    while (linearOpMode.opModeIsActive()) {
      HandleSettings();
      HandleMovement();
      HandleArm();
      HandleServos();
    }
  }
}

/**
 * Describe this function...
 */
function HandleMovement() {
  if (gamepad1.getA()) {
    xPwr = gamepad1.getLeftStickX() * speed;
    yPwr = -gamepad1.getLeftStickY() * speed;
  } else {
    xPwr = -gamepad1.getLeftStickX() * speed;
    yPwr = gamepad1.getLeftStickY() * speed;
  }
  rPwr = gamepad1.getRightStickX() * speed;
  frontLeftWheelAsDcMotor.setPower(xPwr + yPwr + rPwr);
  backLeftWheelAsDcMotor.setPower((yPwr - xPwr) + rPwr);
  frontRightWheelAsDcMotor.setPower((yPwr - xPwr) - rPwr);
  backRightMotorAsDcMotor.setPower((xPwr + yPwr) - rPwr);
}

/**
 * Describe this function...
 */
function HandleServos() {
  if (gamepad2.getA()) {
    clawServoAsServo.setPosition(0);
  } else if (gamepad2.getB()) {
    clawServoAsServo.setPosition(0.5);
  }
}

/**
 * Describe this function...
 */
function HandleSettings() {
  if (gamepad1.getLeftBumper()) {
    speed = 0.8;
  } else if (gamepad1.getRightBumper()) {
    speed = 0.5;
  } else {
    speed = 0.3;
  }
  if (gamepad2.getRightBumper()) {
    armInversed = 1;
    armMotorAsDcMotor.setZeroPowerBehavior("BRAKE");
  } else {
    armInversed = 0;
    armMotorAsDcMotor.setZeroPowerBehavior("BRAKE");
  }
  if (gamepad2.getX() || gamepad2.getLeftBumper()) {
    armTurboMode = 1;
  } else if (gamepad2.getY()) {
    armSlowMode = 1;
  } else if (gamepad2.getRightStickX() > 0.5) {
    armTurboTurboMode = 1;
  } else {
    armSlowMode = 0;
    armTurboMode = 0;
    armTurboTurboMode = 0;
  }
}

/**
 * Describe this function...
 */
function HandleArm() {
  if (armInversed == 1) {
    if (armTurboMode == 1) {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(-0.6);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(0.6);
      } else {
        armMotorAsDcMotor.setPower(0);
      }
    } else if (armSlowMode == 1) {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(-0.3);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(0);
      } else {
        armMotorAsDcMotor.setPower(-0.1);
      }
    } else if (armTurboTurboMode == 1) {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(-1);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(1);
      } else {
        armMotorAsDcMotor.setPower(0);
      }
    } else {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(-0.4);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(0);
      } else {
        armMotorAsDcMotor.setPower(-0.15);
      }
    }
  } else {
    if (armTurboMode == 1) {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(0.6);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(-0.6);
      } else {
        armMotorAsDcMotor.setPower(0);
      }
    } else if (armSlowMode == 1) {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(0.3);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(0);
      } else {
        armMotorAsDcMotor.setPower(0.1);
      }
    } else if (armTurboTurboMode == 1) {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(1);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(-1);
      } else {
        armMotorAsDcMotor.setPower(0);
      }
    } else {
      if (gamepad2.getDpadUp()) {
        armMotorAsDcMotor.setPower(0.4);
      } else if (gamepad2.getDpadDown()) {
        armMotorAsDcMotor.setPower(0);
      } else {
        armMotorAsDcMotor.setPower(0.15);
      }
    }
  }
}
