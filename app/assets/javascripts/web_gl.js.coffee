window.webGLStart = ->
  b = undefined
  camera = undefined
  firstTime = undefined
  glCanvas = undefined
  lastTime = undefined
  mcWorld = undefined
  gameStateHtml = undefined
  glCanvas = document.getElementById('webgl')
  glCanvas.width = window.innerWidth
  glCanvas.height = window.innerHeight
  window.onresize = windowResize
  window.addEventListener 'keydown', keyDown, !1
  window.addEventListener 'keyup', keyUp, !0
  glCanvas.onclick = canvasOn
  document.addEventListener 'pointerlockchange', pointerChange, !1
  document.addEventListener 'mozpointerlockchange', pointerChange, !1
  document.addEventListener 'webkitpointerlockchange', pointerChange, !1
  window.addEventListener 'mousedown', mouseDown, !0
  window.addEventListener 'mouseup', mouseUp, !0
  window.addEventListener 'mousewheel', mouseWheel, !1
  window.addEventListener 'DOMMouseScroll', mouseWheel, !1
  gameStateHtml = document.getElementById('game-state')
  gluu.initGL glCanvas
  gluu.initStandardShader settings.worldShader
  gluu.initLineShader()
  gluu.initSelectionShader()
  gl.enable gl.CULL_FACE
  gl.enable gl.BLEND
  gl.cullFace gl.BACK
  gl.clearColor 0, 0, 0, 1
  gl.blendFunc gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA
  gl.enable gl.DEPTH_TEST
  initTextures()
  window.initBlocks()
  if 'CameraGod' == settings.cameraType
    camera = new CameraGod(settings.pos, settings.rot, [
      0
      1
      0
    ])
  else if 'Camera' == settings.cameraType
    camera = new Camera(settings.pos, settings.rot, [
      0
      1
      0
    ])
  else
    player.setPosRot [
      settings.pos[0]
      settings.pos[1]
      settings.pos[2]
    ], [
      settings.rot[0]
      settings.rot[1]
    ]
  camera = window.cameraPlayer.updatePos(player)
  camera.sensitivity = 2 * settings.sensitivity
  b = undefined
  b = 0
  while 4 > b
    punkty1[b] = {}
    punkty1[b].d = new Float32Array(2e6)
    punkty1[b].o = 0
    b++
  mcWorld = new RegionLib(settings.gameRoot, settings.worldName)
  document.getElementById('tools').style.display = 'none'
  document.getElementById('setDstLvl').value = settings.distanceLevel[0]
  document.getElementById('setDstLvl_val').innerHTML = settings.distanceLevel[0]
  document.getElementById('shaderName').value = settings.worldShader
  document.getElementById('setSun').value = settings.sun
  document.getElementById('setSun_val').innerHTML = settings.sun
  document.getElementById('setBrightness').value = settings.brightness
  document.getElementById('setBrightness_val').innerHTML = settings.brightness
  settings.setSkyColor document.getElementById('setSkyColor').color.rgb
  firstTime = (new Date).getTime()
  lastTime = (new Date).getTime()

  window.camera = camera
  window.firstTime = firstTime
  window.glCanvas = glCanvas
  window.lastTime = lastTime
  window.mcWorld = mcWorld
  h_u_d.gameStateHtml = gameStateHtml

  chronometer.tick()
  return

