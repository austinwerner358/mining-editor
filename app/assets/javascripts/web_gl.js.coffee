window.webGLStart = ->
  #### Init Settings and WebGL ####
  window.settings.initSettings()
  gluu.glCanvas = document.getElementById('webgl')
  gluu.glCanvas.width = window.innerWidth
  gluu.glCanvas.height = window.innerHeight
  window.onresize = windowResize
  gluu.glCanvas.onclick = canvasOn
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
  #### Init Camera ####
  console.log(settings.cameraType)
  camera = switch settings.cameraType
    when 'CameraGod' then window.cameraGod
    when 'Camera' then window.cameraOther
    when 'CameraPlayer' then window.cameraPlayer
    else undefined
  player.setPosRot(settings.pos, settings.rot)
  camera.updatePos(player)
  #### Chunk Related Code ####
  b = 0
  while 4 > b
    punkty1[b] = {}
    punkty1[b].d = new Float32Array(2e6)
    punkty1[b].o = 0
    b++
  #### Init GUI Settings
  document.getElementById('tools').style.display = 'none'
  document.getElementById('setDstLvl').value = settings.distanceLevel[0]
  document.getElementById('setDstLvl_val').innerHTML = settings.distanceLevel[0]
  document.getElementById('shaderName').value = settings.worldShader
  document.getElementById('setSun').value = settings.sun
  document.getElementById('setSun_val').innerHTML = settings.sun
  document.getElementById('setBrightness').value = settings.brightness
  document.getElementById('setBrightness_val').innerHTML = settings.brightness
  settings.setSkyColor document.getElementById('setSkyColor').color.rgb
  #### Assign Globals ####
  window.camera = camera
  window.firstTime = (new Date).getTime()
  window.lastTime = (new Date).getTime()
  window.mcWorld = new RegionLib(settings.gameRoot, settings.worldName)
  h_u_d.gameStateHtml = document.getElementById('game-state')
  #### Start Game ####
  chronometer.tick()
  return
