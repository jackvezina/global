input.onButtonPressed(Button.A, function () {
    Skip = 1
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
            . # . # .
            `)
    } else {
        basic.showIcon(IconNames.Sword)
    }
    basic.pause(1000)
    basic.clearScreen()
    Skip = 0
})
let Temp = ""
let Compas = 0
let Skip = 0
let Mode = 0
input.setAccelerometerRange(AcceleratorRange.OneG)
Mode = 0
Skip = 0
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
                basic.showArrow(ArrowNames.North)
            } else if (Compas < 67.5) {
                basic.showArrow(ArrowNames.NorthEast)
            } else if (Compas < 112.5) {
                basic.showArrow(ArrowNames.East)
            } else if (Compas < 157.5) {
                basic.showArrow(ArrowNames.SouthEast)
            } else if (Compas < 202.5) {
                basic.showArrow(ArrowNames.South)
            } else if (Compas < 247.5) {
                basic.showArrow(ArrowNames.SouthWest)
            } else if (Compas < 292.5) {
                basic.showArrow(ArrowNames.West)
            } else if (Compas < 337.5) {
                basic.showArrow(ArrowNames.NorthWest)
            } else {
                basic.showArrow(ArrowNames.North)
            }
        } else if (Mode == 5) {
            led.plotBarGraph(
            input.magneticForce(Dimension.X),
            256
            )
        } else {
            Temp = "" + input.temperature() + "C"
            basic.showString(Temp)
        }
    }
})
