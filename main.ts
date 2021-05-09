input.onButtonPressed(Button.A, function () {
    this_is_a_controller = true
    send_signal_turn_left_by(-1 * Math.round(speed_change_step_percent * initial_speed / 100.0))
})
radio.onReceivedValue(function (message_type, value) {
    this_is_a_controller = false
    if (message_type == "left_by") {
        turn_by_left_value(value)
    } else if (message_type == "newspeed") {
        change_innitial_speed(value)
    }
})
function update_engine_speed () {
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor1, Kitronik_Robotics_Board.MotorDirection.Forward, left_speed)
    Kitronik_Robotics_Board.motorOn(Kitronik_Robotics_Board.Motors.Motor2, Kitronik_Robotics_Board.MotorDirection.Forward, right_speed)
}
function send_signal_turn_left_by (value_to_add: number) {
    radio.sendValue("left_by", value_to_add)
}
function send_signal_change_initial_speed(new_initial_speed: number) {
    radio.sendValue("newspeed", new_initial_speed) 
}

function toggle_driving () {
    //0 -> 30 -> 60 -> 0
    if(initial_speed == 0){
        initial_speed = 30;
        basic.showIcon(IconNames.Heart)
    }else  if(initial_speed == 30){
        initial_speed = 60;
        basic.showIcon(IconNames.Surprised)
    }else  if(initial_speed == 60){
        initial_speed = 0;
        basic.showIcon(IconNames.No)
    }
    send_signal_change_initial_speed(initial_speed)

}

function change_innitial_speed(new_initial_speed: number){
    left_speed = new_initial_speed
    right_speed = new_initial_speed
    if(new_initial_speed == 0){
                basic.showIcon(IconNames.No)
    }else  if(new_initial_speed == 30){
                basic.showIcon(IconNames.Heart)
    }else  if(new_initial_speed == 60){
        basic.showIcon(IconNames.Target)
    }
    update_engine_speed()
}

function turn_by_left_value (leftwards_increase: number) {
    left_speed += leftwards_increase
    right_speed -= leftwards_increase
    if(leftwards_increase > 0){
        basic.showString("<");
    }else{
        basic.showString(">");
    }
    update_engine_speed()
}

input.onButtonPressed(Button.AB, function () {
    this_is_a_controller = true
    toggle_driving()
})
input.onButtonPressed(Button.B, function () {
    this_is_a_controller = true
    send_signal_turn_left_by( Math.round(speed_change_step_percent * initial_speed  / 100.0))
})
let this_is_a_controller = false
let right_speed = 0
let left_speed = 0
let initial_speed = 0
let speed_change_step_percent = 10
let speed_bracket = 30

initial_speed = 0
left_speed = initial_speed
right_speed = initial_speed
radio.setGroup(5000)

update_engine_speed()

basic.forever(function () {
    // update_engine_speed()
})
