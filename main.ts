input.onButtonPressed(Button.A, function () {
    Skip = 1
    led.stopAnimation()
    basic.clearScreen()
    Mode = (Mode + 1) % 6
    if (Mode == 1) {
        basic.showLeds(`
            . # # # .
            # . . . #
            # . # . #
            # . . . #
            . # # # .
            `)
    } else if (Mode == 2) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . # . # .
            . . # . .
            . # # # .
            `)
    } else if (Mode == 3) {
        basic.showLeds(`
            # . # . #
            . # # # .
            # # . # #
            . # # # .
            # . # . #
            `)
    } else if (Mode == 4) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # # . # #
            . . # . .
            . . # . .
            `)
    } else if (Mode == 5) {
        basic.showLeds(`
            . # # # .
            # # # # #
            # # . # #
            # # . # #
            # # . # #
            `)
    } else {
        basic.showIcon(IconNames.Sword)
    }
    basic.pause(1000)
    basic.clearScreen()
    Skip = 0
})
input.onButtonPressed(Button.B, function () {
    if (Mode == 0) {
        Unit = 1 - Unit
        led.stopAnimation()
        basic.clearScreen()
    }
})
let Temp = ""
let Y = 0
let X = 0
let Compas = 0
let Unit = 0
let Skip = 0
let Mode = 0
input.setAccelerometerRange(AcceleratorRange.OneG)
Mode = 0
Skip = 0
Unit = 0
basic.showIcon(IconNames.Happy)
basic.pause(1000)
basic.clearScreen()
basic.forever(function () {
    if (Skip == 0) {
        if (Mode == 1) {
            basic.showLeds(`
                . # # # .
                # . . . #
                # . . . #
                # . . . #
                . # # # .
                `)
            led.toggle(input.acceleration(Dimension.X) / 512 + 2.5, input.acceleration(Dimension.Y) / 512 + 2.5)
            basic.pause(200)
        } else if (Mode == 2) {
            led.plotBarGraph(
            input.soundLevel(),
            256
            )
        } else if (Mode == 3) {
            led.plotBarGraph(
            input.lightLevel(),
            256
            )
        } else if (Mode == 4) {
            Compas = input.compassHeading()
            if (Compas < 22.5) {
                basic.showString("N")
            } else if (Compas < 67.5) {
                basic.showString("NE")
            } else if (Compas < 112.5) {
                basic.showString("E")
            } else if (Compas < 157.5) {
                basic.showString("SE")
            } else if (Compas < 202.5) {
                basic.showString("S")
            } else if (Compas < 247.5) {
                basic.showString("SW")
            } else if (Compas < 292.5) {
                basic.showString("W")
            } else if (Compas < 337.5) {
                basic.showString("NW")
            } else {
                basic.showString("N")
            }
        } else if (Mode == 5) {
            X = input.magneticForce(Dimension.X)
            Y = input.magneticForce(Dimension.Y)
            if (Math.abs(X) < 0.5 && Y > 0.5) {
                basic.showArrow(ArrowNames.North)
            } else if (Math.abs(X) < 0.5 && Y < -0.5) {
                basic.showArrow(ArrowNames.South)
            } else if (X > 0.5 && Math.abs(Y) < 0.5) {
                basic.showArrow(ArrowNames.East)
            } else if (X < -0.5 && Math.abs(Y) < 0.5) {
                basic.showArrow(ArrowNames.West)
            } else if (X > 0.5 && Y > 0.5) {
                basic.showArrow(ArrowNames.NorthEast)
            } else if (X < 0.5 && Y > 0.5) {
                basic.showArrow(ArrowNames.NorthWest)
            } else if (X > 0.5 && Y < -0.5) {
                basic.showArrow(ArrowNames.SouthEast)
            } else if (X < 0.5 && Y < -0.5) {
                basic.showArrow(ArrowNames.SouthWest)
            } else {
                basic.showNumber(X)
            }
        } else {
            if (Unit != 0) {
                Temp = "" + Math.round(input.temperature() * 1.8 + 32) + "F"
            } else {
                Temp = "" + input.temperature() + "C"
            }
            basic.showString(Temp)
        }
    }
})
