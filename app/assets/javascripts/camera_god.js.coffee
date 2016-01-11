CameraGod = ->
  @name = 'CameraGod'
  @pos = undefined
  @oldPos = new Float32Array(3)
  @rot = undefined
  @up = undefined
  @przesz = @przesy = @przesx = 1
  @control = @lpm = 0
  @fovy = 3.14 / 3
  @aspect = 1
  @fovx = @fovy * @aspect
  @starey = @starex = 0
  @autoMove = !0
  @lastTime = 0
  @sensitivity = 100
  @moveR = @moveL = @moveB = @moveF = !1
  @moveY = @moveX = 0
  return

window.cameraGod = new CameraGod

CameraGod::updatePos = (position, rotation, u) ->
  @aspect = window.gl.viewportWidth / window.gl.viewportHeight
  @pos = position
  @rot = rotation
  @up = u
  @

CameraGod::getMatrix = ->
  b = mat4.create()
  mat4.lookAt b, @getEye(), @getTarget(), @up
  b

CameraGod::getRot = ->
  [
    @rot[0]
    @rot[1]
    @rot[2]
  ]

CameraGod::getTarget = ->
  [
    @pos[0] + Math.sin(@rot[0]) * Math.cos(@rot[1])
    @pos[1] + 1 * Math.sin(@rot[1])
    @pos[2] + Math.cos(@rot[0]) * Math.cos(@rot[1])
  ]

CameraGod::getEye = ->
  [
    @pos[0]
    @pos[1]
    @pos[2]
  ]

CameraGod::getPos = ->
  [
    @pos[0]
    @pos[1]
    @pos[2]
  ]

CameraGod::getXYZPos = ->
  {
    x: Math.floor(@pos[0])
    y: Math.floor(@pos[1])
    z: Math.floor(@pos[2])
  }

CameraGod::moveForward = (b) ->
  @pos[2] += 30 / b * @przesz * Math.cos(@rot[0]) * Math.cos(@rot[1])
  @pos[0] += 30 / b * @przesz * Math.sin(@rot[0]) * Math.cos(@rot[1])
  @pos[1] += 30 / b * @przesz * Math.sin(@rot[1])
  return

CameraGod::moveBackward = (b) ->
  @pos[2] -= 30 / b * @przesz * Math.cos(@rot[0]) * Math.cos(@rot[1])
  @pos[0] -= 30 / b * @przesz * Math.sin(@rot[0]) * Math.cos(@rot[1])
  @pos[1] -= 30 / b * @przesz * Math.sin(@rot[1])
  return

CameraGod::moveLeft = (b) ->
  @pos[0] += 30 / b * @przesz * Math.cos(@rot[0])
  @pos[2] -= 30 / b * @przesz * Math.sin(@rot[0])
  return

CameraGod::moveRight = (b) ->
  @pos[0] -= 30 / b * @przesz * Math.cos(@rot[0])
  @pos[2] += 30 / b * @przesz * Math.sin(@rot[0])
  return

CameraGod::mouseDown = (b) ->
  @lpm = 1
  return

CameraGod::mouseUp = (b) ->
  @lpm = 0
  return

CameraGod::mouseMove = (b, f, c) ->
  if 1 == @lpm or @autoMove
    20 > c and (c = 20)
    @patrzX(b / (3 * c))
    @patrzY(f / (3 * c))
  return

CameraGod::patrzX = (b) ->
  @rot[0] += b
  return

CameraGod::patrzY = (b) ->
  @rot[1] += b
  1.57 < @rot[1] and (@rot[1] = 1.57)
  -1.57 > @rot[1] and (@rot[1] = -1.57)
  return

CameraGod::updatePosition = (b) ->
  @moveF and (if 1 == @jestcontrol then @moveUp(b) else @moveForward(b))
  @moveB and (if 1 == @jestcontrol then @moveDown(b) else @moveBackward(b))
  @moveR and @moveRight(b)
  @moveL and @moveLeft(b)
  @patrzX @moveX / @sensitivity
  @patrzY @moveY / @sensitivity
  @moveY = @moveX = 0
  return

CameraGod::previousPosition = ->
  @pos[0] = @oldPos[0]
  @pos[1] = @oldPos[1]
  @pos[2] = @oldPos[2]
  return

CameraGod::moveUp = (b) ->
  @pos[1] += @przesy
  return

CameraGod::moveDown = (b) ->
  @pos[1] -= @przesy
  return

CameraGod::keyUp = (b) ->
  b = b.keyCode
  @move = !1
  switch b
    when 81
      @jestcontrol = 0
    when 69
      @przesx = @przesz = 1
    when 37, 65
      @moveL = !1
    when 38, 87
      @moveF = !1
    when 39, 68
      @moveR = !1
    when 40, 83
      @moveB = !1
  return

CameraGod::keyDown = (b, f) ->
  switch b.keyCode
    when 81
      @jestcontrol = 1
    when 37, 65
      @moveL = !0
    when 38, 87
      @moveF = !0
    when 39, 68
      @moveR = !0
    when 40, 83
      @moveB = !0
    when 69
      @przesx = @przesz = 5
  return

