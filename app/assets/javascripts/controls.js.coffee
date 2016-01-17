Controls = ->
  @lastTarget = !1
  @selectE = !1
  @selectT = 0
  @selectU = 1

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

Controls::keyDown = (b) ->
  if @lastTarget == gluu.glCanvas
    window.camera.keyDown b, chronometer.fps
    switch b.keyCode
      when keyMap.moveUp, keyMap.moveUpAlt
        0 == window.camera.upY and (window.camera.upY = 200)
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
        b = document.getElementById('settings')
        if 'none' == b.style.display
          b.style.display = 'block'
        else
          'block' == b.style.display and (b.style.display = 'none')
        undefined != window.ace and window.settings.edit and null == window.codeEditor and (window.codeEditor = ace.edit('editor'))
        window.codeEditor.setTheme 'ace/theme/tomorrow_night'
        window.codeEditor.getSession().setMode 'ace/mode/javascript'
        window.codeEditor.setValue 'var pos = window.camera.getXYZPos();\nvar block = { id: 17, data: 0};\n\nfor(var i = -2; i < 3; i++)\n    for(var j = -2; j < 3; j++){\n    if(i > -2 && i < 2 && j > -2 && j < 2) continue;\n    window.useNextBlockData(block);\n    mcWorld.setBlock(pos.x+i,pos.y,pos.z+j,block.id,block.data);\n}\n\nmcWorld.updateChunks();'
        b = document.getElementById('tools')
        if 'none' == b.style.display
          b.style.display = 'block'
        else
          'block' == b.style.display and (b.style.display = 'none')
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
      when 77
        window.localStorage.clear()
      when 86
        console.log window.camera.name
        if 'CameraGod' == window.camera.name
          window.player.setPosRot window.camera.getEye(), window.camera.getRot()
          window.camera = window.cameraPlayer.updatePos(window.player)
        else
          'CameraPlayer' == window.camera.name and (window.camera = window.cameraGod.updatePos(window.player))
        window.camera.sensitivity = 2 * window.settings.sensitivity
  return

Controls::keyUp = (b) ->
  @lastTarget == gluu.glCanvas and window.camera.keyUp(b)
  return

Controls::mouseDown = (b) ->
  @lastTarget = b.target
  @lastTarget == gluu.glCanvas and (window.camera.starex = b.clientX)
  window.camera.starey = b.clientY
  window.settings.edit and window.camera.autoMove and (@selectE = !0)
  @selectT = if 0 == b.button then 0 else @selectU
  window.camera.mouseDown chronometer.fps
  return

Controls::mouseUp = (b) ->
  @lastTarget == gluu.glCanvas and window.camera.mouseUp(chronometer.fps)
  return

# Controls::mouseMove = (b) ->
#   f = undefined
#   if @lastTarget == gluu.glCanvas
#     f = b.clientX
#     b = b.clientY
#     window.camera.mouseMove window.camera.starex - f, window.camera.starey - b, chronometer.fps
#     window.camera.starex = f
#     window.camera.starey = b
#   return

Controls::pointerMove = (b) ->
  f = undefined
  f = b.movementY or b.mozMovementY or b.webkitMovementY or 0
  window.camera.moveX -= b.movementX or b.mozMovementX or b.webkitMovementX or 0
  window.camera.moveY -= f
  return

Controls::mouseWheel = (b) ->
  @lastTarget == gluu.glCanvas and (b = window.event or b)
  if 0 > Math.max(-1, Math.min(1, b.wheelDelta or -b.detail))
    window.useNextBlock useBlock
  else
    window.usePrevBlock useBlock
  return

Controls::pointerChange = (b) ->
  b = document.getElementById('webgl')
  if document.pointerLockElement == b or document.mozPointerLockElement == b or document.webkitPointerLockElement == b
    window.addEventListener 'mousemove', @pointerMove, !1
  else
    b.onclick = canvasOn
    window.removeEventListener 'mousemove', @pointerMove, !1
  window.camera.moveX = 0
  window.camera.moveY = 0
  return

