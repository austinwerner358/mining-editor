CameraPlayer = ->
  @name = 'CameraPlayer'
  @entity = undefined
  @failing = 0
  @oldPos = new Float32Array(3)
  @tPos = new Float32Array(3)
  @nPos1 = new Float32Array(3)
  @nPos2 = new Float32Array(3)
  @tPos[0] = 0
  @tPos[1] = 0
  @tPos[2] = 0
  @control = @lpm = 0
  @fovy = 3.14 / 3
  @aspect = 1
  @fovx = @fovy * @aspect
  @starey = @starex = 0
  @autoMove = !0
  @lastTime = 0
  @sensitivity = 100
  @moveR = @moveL = @moveB = @moveF = !1
  @upY = @moveY = @moveX = 0
  @rotUp = @rotDown = @rotLeft = @rotRight = 0
  @rotSensitivity = 30
  return

window.cameraPlayer = new CameraPlayer

CameraPlayer::updatePos = (position) ->
  @aspect = window.gluu.gl.viewportWidth / window.gluu.gl.viewportHeight
  @entity = position
  @tPos[0] = position.pos[0]
  @tPos[1] = position.pos[1]
  @tPos[2] = position.pos[2]
  @

CameraPlayer::getMatrix = ->
  b = mat4.create()
  mat4.lookAt b, @getEye(), @getTarget(), @entity.up
  b

CameraPlayer::getRot = ->
  [
    @entity.rot[0]
    @entity.rot[1]
    @entity.rot[2]
  ]

CameraPlayer::getEye = ->
  @entity.getEye()

CameraPlayer::getPos = ->
  [
    @entity.pos[0]
    @entity.pos[1]
    @entity.pos[2]
  ]

CameraPlayer::getXYZPos = ->
  {
    x: Math.floor(@entity.pos[0])
    y: Math.floor(@entity.pos[1])
    z: Math.floor(@entity.pos[2])
  }

CameraPlayer::getTarget = ->
  @entity.getTarget()

CameraPlayer::moveForward = (b) ->
  @tPos[2] = @entity.pos[2] + @entity.przesz / b * Math.cos(@entity.rot[0])
  @tPos[0] = @entity.pos[0] + @entity.przesz / b * Math.sin(@entity.rot[0])
  @tPos[1] = @entity.pos[1]
  return

CameraPlayer::moveBackward = (b) ->
  @tPos[2] = @entity.pos[2] - (@entity.przesz / b * Math.cos(@entity.rot[0]))
  @tPos[0] = @entity.pos[0] - (@entity.przesz / b * Math.sin(@entity.rot[0]))
  @tPos[1] = @entity.pos[1]
  return

CameraPlayer::moveLeft = (b) ->
  @tPos[0] = @entity.pos[0] + @entity.przesz / b * Math.cos(@entity.rot[0])
  @tPos[1] = @entity.pos[1]
  @tPos[2] = @entity.pos[2] - (@entity.przesz / b * Math.sin(@entity.rot[0]))
  return

CameraPlayer::moveRight = (b) ->
  @tPos[0] = @entity.pos[0] - (@entity.przesz / b * Math.cos(@entity.rot[0]))
  @tPos[1] = @entity.pos[1]
  @tPos[2] = @entity.pos[2] + @entity.przesz / b * Math.sin(@entity.rot[0])
  return

CameraPlayer::mouseDown = (b) ->
  @lpm = 1
  return

CameraPlayer::mouseUp = (b) ->
  @lpm = 0
  return

CameraPlayer::mouseMove = (b, f, c) ->
  if 1 == @lpm or @autoMove
    20 > c and (c = 20)
    @patrzX(b / (3 * c))
    @patrzY(f / (3 * c))
  return

CameraPlayer::patrzX = (b) ->
  @entity.rot[0] += b
  return

CameraPlayer::patrzY = (b) ->
  @entity.rot[1] += b
  1.57 < @entity.rot[1] and (@entity.rot[1] = 1.57)
  -1.57 > @entity.rot[1] and (@entity.rot[1] = -1.57)
  return

CameraPlayer::updatePosition = (b) ->
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

CameraPlayer::moveUp = (b) ->
  @tPos[1] += @przesy
  return

CameraPlayer::moveDown = (b) ->
  @tPos[1] -= @przesy
  return

CameraPlayer::keyUp = (b) ->
  b = b.keyCode
  @move = !1
  switch b
    when 69
      @entity.przesx = @entity.przesz = 10
    when keyMap.moveLeft
      @moveL = !1
    when keyMap.moveForward
      @moveF = !1
    when keyMap.moveRight
      @moveR = !1
    when keyMap.moveBackward
      @moveB = !1
    when keyMap.arrowLeft
      @rotLeft = !1
    when keyMap.arrowUp
      @rotUp = !1
    when keyMap.arrowRight
      @rotRight = !1
    when keyMap.arrowDown
      @rotDown = !1
  return

CameraPlayer::keyDown = (b, f) ->
  switch b.keyCode
    when keyMap.moveLeft
      @moveL = !0
    when keyMap.moveForward
      @moveF = !0
    when keyMap.moveRight
      @moveR = !0
    when keyMap.moveBackward
      @moveB = !0
    when keyMap.arrowLeft
      @rotLeft = !0
    when keyMap.arrowUp
      @rotUp = !0
    when keyMap.arrowRight
      @rotRight = !0
    when keyMap.arrowDown
      @rotDown = !0
    when 69
      @entity.przesx = @entity.przesz = 20
  return


