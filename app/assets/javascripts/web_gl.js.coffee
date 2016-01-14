window.webGLStart = ->
  b = undefined
  camera = undefined
  firstTime = undefined
  lastTime = undefined
  gameStateHtml = undefined
  gluu.glCanvas = document.getElementById('webgl')
  gluu.glCanvas.width = window.innerWidth
  gluu.glCanvas.height = window.innerHeight
  window.onresize = windowResize
  gluu.glCanvas.onclick = canvasOn
  gameStateHtml = document.getElementById('game-state')
  window.gluu.initGL gluu.glCanvas
  window.gluu.initStandardShader settings.worldShader
  window.gluu.initLineShader()
  window.gluu.initSelectionShader()
  gluu.gl.enable gluu.gl.CULL_FACE
  gluu.gl.enable gluu.gl.BLEND
  gluu.gl.cullFace gluu.gl.BACK
  gluu.gl.clearColor 0, 0, 0, 1
  gluu.gl.blendFunc gluu.gl.SRC_ALPHA, gluu.gl.ONE_MINUS_SRC_ALPHA
  gluu.gl.enable gluu.gl.DEPTH_TEST
  gluu.initTextures()
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
  window.mcWorld.initRegionLib(settings.gameRoot, settings.worldName)
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
  window.lastTime = lastTime
  h_u_d.gameStateHtml = gameStateHtml

  chronometer.tick()
  return

