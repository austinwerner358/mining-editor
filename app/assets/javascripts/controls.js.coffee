Controls = ->
  @lastTarget = !1
  @selectE = !1
  @selectT = 0
  @selectU = 1
  return

Controls::initControls = ->
  window.addEventListener 'keydown', ((e) => @keyDown(e)), !1
  window.addEventListener 'keyup', ((e) => @keyUp(e)), !0
  document.addEventListener 'pointerlockchange', ((e) => @pointerChange(e)), !1
  document.addEventListener 'mozpointerlockchange', ((e) => @pointerChange(e)), !1
  document.addEventListener 'webkitpointerlockchange', ((e) => @pointerChange(e)), !1
  window.addEventListener 'mousedown', ((e) => @mouseDown(e)), !0
  window.addEventListener 'mouseup', ((e) => @mouseUp(e)), !0
  window.addEventListener 'mousewheel', ((e) => @mouseWheel(e)), !1
  window.addEventListener 'DOMMouseScroll', ((e) => @mouseWheel(e)), !1
  return

window.controls = new Controls
console.log(window.controls)

Controls::keyDown = (event) ->
  if @lastTarget == gluu.glCanvas
    window.camera.keyDown event, chronometer.fps
    switch event.keyCode
      when keyMap.moveUp, keyMap.moveUpAlt
        window.camera.upY = 200
      when keyMap.moveDown, keyMap.moveDownAlt
        window.camera.downY = 400
      when keyMap.useNextBlock
        window.useNextBlock useBlock
      when keyMap.usePrevBlock
        window.usePrevBlock useBlock
      when keyMap.useNextBlockData
        window.useNextBlockData useBlock
      when 49
        @selectU = 0
      when 50
        @selectU = 1
      when 51
        @selectU = 2
      when 52
        @selectU = 3
      when keyMap.saveWorld
        window.mcWorld.save()
      when keyMap.useCodeEditor
        panel = document.getElementById('settings')
        if 'none' == panel.style.display
          panel.style.display = 'block'
        else
          'block' == panel.style.display and (panel.style.display = 'none')
        undefined != window.ace and window.settings.edit and null == window.codeEditor and (window.codeEditor = ace.edit('editor'))
        window.codeEditor.setTheme 'ace/theme/tomorrow_night'
        window.codeEditor.getSession().setMode 'ace/mode/javascript'
        window.codeEditor.setValue 'var pos = window.camera.getXYZPos();\nvar block = { id: 17, data: 0};\n\nfor(var i = -2; i < 3; i++)\n    for(var j = -2; j < 3; j++){\n    if(i > -2 && i < 2 && j > -2 && j < 2) continue;\n    window.useNextBlockData(block);\n    mcWorld.setBlock(pos.x+i,pos.y,pos.z+j,block.id,block.data);\n}\n\nmcWorld.updateChunks();'
        panel = document.getElementById('tools')
        if 'none' == panel.style.display
          panel.style.display = 'block'
        else
          'block' == panel.style.display and (panel.style.display = 'none')
        document.exitPointerLock = document.exitPointerLock or document.mozExitPointerLock or document.webkitExitPointerLock
        document.exitPointerLock()
        window.camera.moveX = 0
        window.camera.moveY = 0
      when 72
        if undefined == window.ace
          break
        if !window.settings.edit
          break
        executeJS()
      when 73
        window.localStorage.clear()
      when keyMap.changeCamera
        console.log window.camera.name
        switch window.camera.name
          when 'CameraGhost'
            window.camera = window.cameraPlayer
          when 'CameraPlayer', 'Camera'
          #   window.camera = window.cameraAerial
          # when 'CameraAerial'
            window.camera = window.cameraGhost
        camera.updatePos(window.player)
  return

Controls::keyUp = (event) ->
  @lastTarget == gluu.glCanvas and window.camera.keyUp(event)
  return

Controls::mouseDown = (event) -> # TODO: check what else is related to first mouseDown
  @lastTarget = event.target
  @lastTarget == gluu.glCanvas and (window.camera.starex = event.clientX)
  window.camera.starey = event.clientY
  if !settings.firstClick
    window.settings.edit and window.camera.autoMove and (@selectE = !0)
  @selectT = if 0 == event.button then 0 else @selectU
  window.camera.mouseDown chronometer.fps
  return

Controls::mouseUp = (event) ->
  @lastTarget == gluu.glCanvas and window.camera.mouseUp(chronometer.fps)
  return

# Controls::mouseMove = (event) ->
#   f = undefined
#   if @lastTarget == gluu.glCanvas
#     f = event.clientX
#     g = event.clientY
#     window.camera.mouseMove window.camera.starex - f, window.camera.starey - g, chronometer.fps
#     window.camera.starex = f
#     window.camera.starey = g
#   return

Controls::pointerMove = (event) ->
  window.camera.moveX -= event.movementX or event.mozMovementX or event.webkitMovementX or 0
  window.camera.moveY -= event.movementY or event.mozMovementY or event.webkitMovementY or 0
  return

Controls::mouseWheel = (event) ->
  @lastTarget == gluu.glCanvas and (event = window.event or event)
  if 0 > Math.max(-1, Math.min(1, event.wheelDelta or -event.detail))
    window.useNextBlock useBlock
  else
    window.usePrevBlock useBlock
  return

Controls::pointerChange = (event) ->
  canvas = document.getElementById('webgl')
  if document.pointerLockElement == canvas or document.mozPointerLockElement == canvas or document.webkitPointerLockElement == canvas
    window.addEventListener 'mousemove', @pointerMove, !1
    window.settings.firstClick = false
  else
    canvas.onclick = canvasOn
    window.removeEventListener 'mousemove', @pointerMove, !1
    window.settings.firstClick = true
  window.camera.moveX = 0
  window.camera.moveY = 0
  return
