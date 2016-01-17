class CameraPlayer extends CameraGod
  constructor:() ->
    super
    @name = 'CameraPlayer'
    @failing = 0
    @tPos = new Float32Array(3)
    @nPos1 = new Float32Array(3)
    @nPos2 = new Float32Array(3)
    @tPos[0] = 0
    @tPos[1] = 0
    @tPos[2] = 0
    @upY = 0

  updatePos: (player) ->
    super
    @entity.przesx = @entity.przesz = @getNormalSpeed()
    @tPos[0] = player.pos[0]
    @tPos[1] = player.pos[1]
    @tPos[2] = player.pos[2]
    @

  getNormalSpeed: ->
    10

  getFastSpeed: ->
    20

  moveForward: (b) ->
    @tPos[2] = @entity.pos[2] + @entity.przesz / b * Math.cos(@entity.rot[0])
    @tPos[0] = @entity.pos[0] + @entity.przesz / b * Math.sin(@entity.rot[0])
    @tPos[1] = @entity.pos[1]
    return

  moveBackward: (b) ->
    @tPos[2] = @entity.pos[2] - (@entity.przesz / b * Math.cos(@entity.rot[0]))
    @tPos[0] = @entity.pos[0] - (@entity.przesz / b * Math.sin(@entity.rot[0]))
    @tPos[1] = @entity.pos[1]
    return

  moveLeft: (b) ->
    @tPos[0] = @entity.pos[0] + @entity.przesz / b * Math.cos(@entity.rot[0])
    @tPos[1] = @entity.pos[1]
    @tPos[2] = @entity.pos[2] - (@entity.przesz / b * Math.sin(@entity.rot[0]))
    return

  moveRight: (b) ->
    @tPos[0] = @entity.pos[0] - (@entity.przesz / b * Math.cos(@entity.rot[0]))
    @tPos[1] = @entity.pos[1]
    @tPos[2] = @entity.pos[2] + @entity.przesz / b * Math.sin(@entity.rot[0])
    return

  updatePosition: (b) ->
    @oldPos[0] = @entity.pos[0]
    @oldPos[1] = @entity.pos[1]
    @oldPos[2] = @entity.pos[2]
    20 > b and (b = 20)
    @moveF and 1 != @jestcontrol and @moveForward(b)
    @moveB and 1 != @jestcontrol and @moveBackward(b)
    @moveR and @moveRight(b)
    @moveL and @moveLeft(b)
    if 0 == @upY then (@tPos[1] -= 10 / b) else @tPos[1] += 8 / b
    @upY -= 1e3 / b
    0 > @upY and (@upY = 0)
    @entity.pos[1] = @tPos[1]
    if mcWorld.testCollisions()
      @failing = 0
      @entity.pos[1] = @oldPos[1]
    else
      (@failing = 1)
    @entity.pos[2] = @tPos[2]
    mcWorld.testCollisions() and (@entity.pos[2] = @oldPos[2])
    @entity.pos[0] = @tPos[0]
    mcWorld.testCollisions() and (@entity.pos[0] = @oldPos[0])
    @nPos1[0] = @entity.pos[0]
    @nPos1[1] = @entity.pos[1]
    @nPos1[2] = @entity.pos[2]
    b = Math.abs(@nPos1[0] - (@oldPos[0])) + Math.abs(@nPos1[2] - (@oldPos[2]))
    @entity.pos[0] = @oldPos[0]
    @entity.pos[1] = @oldPos[1]
    @entity.pos[2] = @oldPos[2]
    @tPos[1] = if 0 == @failing then @oldPos[1] + 0.5 else @oldPos[1] + 0
    @entity.pos[1] = @tPos[1]
    mcWorld.testCollisions() and (@entity.pos[1] = @oldPos[1])
    @entity.pos[2] = @tPos[2]
    mcWorld.testCollisions() and (@entity.pos[2] = @oldPos[2])
    @entity.pos[0] = @tPos[0]
    mcWorld.testCollisions() and (@entity.pos[0] = @oldPos[0])
    f = Math.abs(@entity.pos[0] - (@oldPos[0])) + Math.abs(@entity.pos[2] - (@oldPos[2]))
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
    return

  moveUp: (b) ->
    @tPos[1] += @entity.przesy
    return

  moveDown: (b) ->
    @tPos[1] -= @entity.przesy
    return

window.cameraPlayer = new CameraPlayer
