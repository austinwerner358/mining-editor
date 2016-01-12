Camera = ->
  @name = 'Camera'
  @pos = undefined
  @oldPos = new Float32Array(3)
  @tPos = new Float32Array(3)
  @tPos[0] = 0
  @tPos[1] = 0
  @tPos[2] = 0
  @eyePos = [
    0
    1.65
    0
  ]
  @rot = undefined
  @up = undefined
  @przesx = 8
  @przesy = 1
  @przesz = 8
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
  return

window.cameraOther = new Camera

Camera::updatePos = (position) ->
  @aspect = window.gl.viewportWidth / window.gl.viewportHeight
  @entity = position
  @tPos[0] = position.pos[0]
  @tPos[1] = position.pos[1]
  @tPos[2] = position.pos[2]
  @

Camera::getMatrix = ->
  b = mat4.create()
  mat4.lookAt b, @getEye(), @getTarget(), @up
  b

Camera::getRot = ->
  [
    @rot[0]
    @rot[1]
    @rot[2]
  ]

Camera::getEye = ->
  [
    @pos[0] + @eyePos[0]
    @pos[1] + @eyePos[1]
    @pos[2] + @eyePos[2]
  ]

Camera::getPos = ->
  [
    @pos[0]
    @pos[1]
    @pos[2]
  ]

Camera::getTarget = ->
  [
    @pos[0] + @eyePos[0] + Math.sin(@rot[0]) * Math.cos(@rot[1])
    @pos[1] + @eyePos[1] + 1 * Math.sin(@rot[1])
    @pos[2] + @eyePos[2] + Math.cos(@rot[0]) * Math.cos(@rot[1])
  ]

Camera::moveForward = (b) ->
  @tPos[2] = @pos[2] + @przesz / b * Math.cos(@rot[0])
  @tPos[0] = @pos[0] + @przesz / b * Math.sin(@rot[0])
  @tPos[1] = @pos[1]
  return

Camera::moveBackward = (b) ->
  @tPos[2] = @pos[2] - (@przesz / b * Math.cos(@rot[0]))
  @tPos[0] = @pos[0] - (@przesz / b * Math.sin(@rot[0]))
  @tPos[1] = @pos[1]
  return

Camera::moveLeft = (b) ->
  @tPos[0] = @pos[0] + @przesz / b * Math.cos(@rot[0])
  @tPos[1] = @pos[1]
  @tPos[2] = @pos[2] - (@przesz / b * Math.sin(@rot[0]))
  return

Camera::moveRight = (b) ->
  @tPos[0] = @pos[0] - (@przesz / b * Math.cos(@rot[0]))
  @tPos[1] = @pos[1]
  @tPos[2] = @pos[2] + @przesz / b * Math.sin(@rot[0])
  return

Camera::mouseDown = (b) ->
  @lpm = 1
  return

Camera::mouseUp = (b) ->
  @lpm = 0
  return

Camera::mouseMove = (b, f, c) ->
  if 1 == @lpm or @autoMove
    20 > c and (c = 20)
    @patrzX(b / (3 * c))
    @patrzY(f / (3 * c))
  return

Camera::patrzX = (b) ->
  @rot[0] += b
  return

Camera::patrzY = (b) ->
  @rot[1] += b
  1.57 < @rot[1] and (@rot[1] = 1.57)
  -1.57 > @rot[1] and (@rot[1] = -1.57)
  return

Camera::updatePosition = (b) ->
  @oldPos[0] = @pos[0]
  @oldPos[1] = @pos[1]
  @oldPos[2] = @pos[2]
  20 > b and (b = 20)
  @moveF and 1 != @jestcontrol and @moveForward(b)
  @moveB and 1 != @jestcontrol and @moveBackward(b)
  @moveR and @moveRight(b)
  @moveL and @moveLeft(b)
  if 0 == @upY then (@tPos[1] -= 10 / b) else @tPos[1] += 8 / b
  @upY -= 1e3 / b
  0 > @upY and (@upY = 0)
  @pos[1] = @tPos[1]
  if mcWorld.testCollisions() then (@pos[1] = @oldPos[1]) else (@oldPos[1] = @pos[1])
  @pos[2] = @tPos[2]
  if mcWorld.testCollisions() then (@pos[2] = @oldPos[2]) else (@oldPos[2] = @pos[2])
  @pos[0] = @tPos[0]
  if mcWorld.testCollisions() then (@pos[0] = @oldPos[0]) else (@oldPos[0] = @pos[0])
  @patrzX @moveX / @sensitivity
  @patrzY @moveY / @sensitivity
  @moveY = @moveX = 0
  @tPos[0] = @pos[0]
  @tPos[1] = @pos[1]
  @tPos[2] = @pos[2]
  return

Camera::previousPosition = ->
  @pos[0] = @oldPos[0]
  @pos[1] = @oldPos[1]
  @pos[2] = @oldPos[2]
  return

Camera::moveUp = (b) ->
  @tPos[1] += @przesy
  return

Camera::moveDown = (b) ->
  @tPos[1] -= @przesy
  return

Camera::keyUp = (b) ->
  b = b.keyCode
  @move = !1
  switch b
    when 69
      @przesx = @przesz = 10
    when 37, 65
      @moveL = !1
    when 38, 87
      @moveF = !1
    when 39, 68
      @moveR = !1
    when 40, 83
      @moveB = !1
  return

Camera::keyDown = (b, f) ->
  switch b.keyCode
    when 37, 65
      @moveL = !0
    when 38, 87
      @moveF = !0
    when 39, 68
      @moveR = !0
    when 40, 83
      @moveB = !0
    when 69
      @przesx = @przesz = 20
  return
