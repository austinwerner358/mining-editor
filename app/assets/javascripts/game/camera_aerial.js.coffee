class CameraAerial extends CameraPlayer
  constructor:() ->
    super
    @name = 'CameraAerial'

  updatePosition: (b) ->
    # Save previous position.
    @oldPos[0] = @entity.pos[0]
    @oldPos[1] = @entity.pos[1]
    @oldPos[2] = @entity.pos[2]
    # Setup movement variables.
    20 > b and (b = 20)
    @moveF and 1 != @jestcontrol and @moveForward(b)
    @moveB and 1 != @jestcontrol and @moveBackward(b)
    @moveR and @moveRight(b)
    @moveL and @moveLeft(b)
    # Handle vertical movement.
    if 0 == @upY
      # @tPos[1] -= 10 / b
    else
      @tPos[1] += 8 / b
    @upY -= 1e3 / b
    if 0 > @upY
      @upY = 0
    if 0 == @downY
      # @tPos[1] -= 10 / b
    else
      @tPos[1] -= 8 / b
    @downY -= 1e3 / b
    if 0 > @downY
      @downY = 0
    @entity.pos[1] = @tPos[1]
    # Change back to old position if there is a collision.
    if mcWorld.testCollisions()
      @failing = 0
      @entity.pos[1] = @oldPos[1]
    else
      @failing = 1
    # Move but reset states if collision.
    @entity.pos[2] = @tPos[2]
    mcWorld.testCollisions() and (@entity.pos[2] = @oldPos[2])
    @entity.pos[0] = @tPos[0]
    mcWorld.testCollisions() and (@entity.pos[0] = @oldPos[0])
    # Move around states.
    @nPos1[0] = @entity.pos[0]
    @nPos1[1] = @entity.pos[1]
    @nPos1[2] = @entity.pos[2]
    @entity.pos[0] = @oldPos[0]
    @entity.pos[1] = @oldPos[1]
    @entity.pos[2] = @oldPos[2]
    # Falling.
    @tPos[1] = if 0 == @failing then @oldPos[1] + 0.5 else @oldPos[1] + 0
    # Update player/entity position.
    @entity.pos[1] = @tPos[1]
    mcWorld.testCollisions() and (@entity.pos[1] = @oldPos[1])
    @entity.pos[2] = @tPos[2]
    mcWorld.testCollisions() and (@entity.pos[2] = @oldPos[2])
    @entity.pos[0] = @tPos[0]
    mcWorld.testCollisions() and (@entity.pos[0] = @oldPos[0])
    # Handle rotation and other aspects of movement.
    f = Math.abs(@entity.pos[0] - (@oldPos[0])) + Math.abs(@entity.pos[2] - (@oldPos[2]))
    b = Math.abs(@nPos1[0] - (@oldPos[0])) + Math.abs(@nPos1[2] - (@oldPos[2]))
    b >= f and @entity.pos[0] = @nPos1[0]
    @entity.pos[1] = @nPos1[1]
    @entity.pos[2] = @nPos1[2]
    @patrzX @moveX / @sensitivity
    @patrzY @moveY / @sensitivity
    @patrzX(-1 / @rotSensitivity) if @rotRight
    @patrzY(1 / @rotSensitivity) if @rotUp
    @patrzX(1 / @rotSensitivity) if @rotLeft
    @patrzY(-1 / @rotSensitivity) if @rotDown
    @moveY = @moveX = 0
    @tPos[0] = @entity.pos[0]
    @tPos[1] = @entity.pos[1]
    @tPos[2] = @entity.pos[2]
    # Move up if stuck.
    if mcWorld.testCollisions()
      @entity.pos[1] += .03

window.cameraAerial = new CameraAerial
