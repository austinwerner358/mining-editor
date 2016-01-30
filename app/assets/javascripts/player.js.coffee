class Player extends Mob
  constructor:() ->
    @pos = [
      0
      0
      0
    ]
    @rot = [
      0
      0
    ]
    @up = [
      0
      1
      0
    ]
    @eyePos = [
      0
      1.65
      0
    ]
    @przesx = 8
    @przesy = 1
    @przesz = 8

Player::shape = new Float32Array([
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  0.01
  0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  -0.3
  0.01
  0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  -0.3
  0.01
  0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
])

window.player = new Player
