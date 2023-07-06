// Parameters used in the physics engine

let P_ENGINE_ITER_CONSTRAINT = 10,  // Default in engine 2
    P_ENGINE_ITER_VELOCITY   = 20,  // Default in engine 4
    P_ENGINE_ITER_POSITION   = 30;  // Default in engine 6

let P_BIKE_SHURA_DENSITY = 0.0000001,

    P_BIKE_BODY_RESTITUTION = 0,
    P_BIKE_BODY_DENSITY     = 0.0001,

    P_BIKE_WHEEL_REAR_RESTITUTION  = 0.01,
    P_BIKE_WHEEL_REAR_DENSITY      = 0.02,
    P_BIKE_WHEEL_REAR_FRICTION     = 0.9,

    P_BIKE_WHEEL_FRONT_RESTITUTION = 0.01,
    P_BIKE_WHEEL_FRONT_DENSITY     = 0.01,
    P_BIKE_WHEEL_FRONT_FRICTION    = 0.9,

    P_BIKE_AXEL_REAR_LENGTH     = 0.01,
    P_BIKE_AXEL_REAR_STIFFNESS  = 0.9,

    P_BIKE_AXEL_FRONT_LENGTH    = 0.01,
    P_BIKE_AXEL_FRONT_STIFFNESS = 0.9;

let P_BIKE_TORQUE_THROTTLE_WHEEL_REAR = 3,
    P_BIKE_TORQUE_THROTTLE_BODY       = -2, // Better than -1.5
    P_BIKE_TORQUE_BRAKE_WHEEL_REAR    = -3,
    P_BIKE_TORQUE_BRAKE_WHEEL_FRONT   = 0,
    P_BIKE_TORQUE_TILT_BACK           = -2.5, // Better than -3
    P_BIKE_TORQUE_TILT_FORWARD        = 3;

let P_OBJECT_RESTITUTION            = 0.01;
