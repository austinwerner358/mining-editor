class window.CameraGhost
  constructor:() ->
    @name = 'CameraGhost'
    @entity = undefined
    @oldPos = new Float32Array(3)
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
    @rotUp = @rotDown = @rotLeft = @rotRight = 0
    @rotSensitivity = 30

  updatePos: (player) ->
    @aspect = window.gluu.gl.viewportWidth / window.gluu.gl.viewportHeight
    @entity = player
    @entity.przesx = @entity.przesz = @getNormalSpeed()
    @sensitivity = 2 * window.settings.sensitivity
    @

  getNormalSpeed: ->
    window.settings.cameraGhostNormalSpeed

  getFastSpeed: ->
    window.settings.cameraGhostFastSpeed

  getMatrix: ->
    b = mat4.create()
    mat4.lookAt b, @getEye(), @getTarget(), @entity.up
    b

  getRot: ->
    [
      @entity.rot[0]
      @entity.rot[1]
      @entity.rot[2]
    ]

  getTarget: ->
    @entity.getTarget()

  getEye: ->
    @entity.getEye()

  getPos: ->
    [
      @entity.pos[0]
      @entity.pos[1]
      @entity.pos[2]
    ]

  getXYZPos: ->
    {
      x: Math.floor(@entity.pos[0])
      y: Math.floor(@entity.pos[1])
      z: Math.floor(@entity.pos[2])
    }

  moveForward: (b) ->
    @entity.pos[2] += 30 / b * @entity.przesz * Math.cos(@entity.rot[0]) * Math.cos(@entity.rot[1])
    @entity.pos[0] += 30 / b * @entity.przesz * Math.sin(@entity.rot[0]) * Math.cos(@entity.rot[1])
    @entity.pos[1] += 30 / b * @entity.przesz * Math.sin(@entity.rot[1])

  moveBackward: (b) ->
    @entity.pos[2] -= 30 / b * @entity.przesz * Math.cos(@entity.rot[0]) * Math.cos(@entity.rot[1])
    @entity.pos[0] -= 30 / b * @entity.przesz * Math.sin(@entity.rot[0]) * Math.cos(@entity.rot[1])
    @entity.pos[1] -= 30 / b * @entity.przesz * Math.sin(@entity.rot[1])

  moveLeft: (b) ->
    @entity.pos[0] += 30 / b * @entity.przesz * Math.cos(@entity.rot[0])
    @entity.pos[2] -= 30 / b * @entity.przesz * Math.sin(@entity.rot[0])

  moveRight: (b) ->
    @entity.pos[0] -= 30 / b * @entity.przesz * Math.cos(@entity.rot[0])
    @entity.pos[2] += 30 / b * @entity.przesz * Math.sin(@entity.rot[0])

  mouseDown: (b) ->
    @lpm = 1

  mouseUp: (b) ->
    @lpm = 0

  mouseMove: (b, f, c) ->
    if 1 == @lpm or @autoMove
      20 > c and (c = 20)
      @patrzX(b / (3 * c))
      @patrzY(f / (3 * c))

  patrzX: (b) ->
    @entity.rot[0] += b

  patrzY: (b) ->
    @entity.rot[1] += b
    1.57 < @entity.rot[1] and (@entity.rot[1] = 1.57)
    -1.57 > @entity.rot[1] and (@entity.rot[1] = -1.57)

  updatePosition: (b) ->
    @moveF and (if 1 == @jestcontrol then @moveUp(b) else @moveForward(b))
    @moveB and (if 1 == @jestcontrol then @moveDown(b) else @moveBackward(b))
    @moveR and @moveRight(b)
    @moveL and @moveLeft(b)
    @patrzX @moveX / @sensitivity
    @patrzY @moveY / @sensitivity
    @patrzX(-1 / @rotSensitivity) if @rotRight
    @patrzY(1 / @rotSensitivity) if @rotUp
    @patrzX(1 / @rotSensitivity) if @rotLeft
    @patrzY(-1 / @rotSensitivity) if @rotDown
    @moveY = @moveX = 0

  previousPosition: ->
    @entity.pos[0] = @oldPos[0]
    @entity.pos[1] = @oldPos[1]
    @entity.pos[2] = @oldPos[2]

  moveUp: (b) ->
    @entity.pos[1] += @entity.przesy

  moveDown: (b) ->
    @entity.pos[1] -= @entity.przesy

  keyUp: (b) ->
    b = b.keyCode
    @move = !1
    switch b
      when keyMap.changeMovement
        @jestcontrol = 0
      when keyMap.modifyPlayerSpeed
        @entity.przesx = @entity.przesz = @getNormalSpeed()
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

  keyDown: (b, f) ->
    switch b.keyCode
      when keyMap.changeMovement
        @jestcontrol = 1
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
      when keyMap.modifyPlayerSpeed
        @entity.przesx = @entity.przesz = @getFastSpeed()

window.cameraGhost = new CameraGhost
