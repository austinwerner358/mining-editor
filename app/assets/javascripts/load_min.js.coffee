shadersCode =
  fs: []
  vs: []

ab2str = (b) ->
  f = ''
  c = b.length
  d = 2 ** 10
  e = undefined
  m = undefined
  e = 0
  while e < c
    m = Math.min(d, c - e)
    m = b.subarray(e, e + m)
    f += String.fromCharCode.apply(null, m)
    e += d
  f

str2ab = (b) ->
  f = undefined
  c = undefined
  d = undefined
  e = undefined
  f = new ArrayBuffer(b.length)
  c = new Uint8Array(f)
  d = 0
  e = b.length
  while d < e
    c[d] = b.charCodeAt(d)
    d++
  f

jenkins_hash = (b) ->
  f = undefined
  c = undefined
  f = 0
  c = 0
  while c < b.length
    f += b[c]
    f += f << 10
    f ^= f >> 6
    ++c
  f += f << 3
  f ^= f >> 11
  f + (f << 15) >>> 0

spiralLoop = (b) ->
  f = Math.floor((Math.sqrt(b + 1) - 1) / 2) + 1
  c = 2 * f
  b = (1 + b - (8 * f * (f - 1) / 2)) % 8 * f
  d = [
    0
    0
    f
  ]
  switch Math.floor(b / (2 * f))
    when 0
      d[0] = b - f
      d[1] = -f
    when 1
      d[0] = f
      d[1] = b % c - f
    when 2
      d[0] = f - (b % c)
      d[1] = f
    when 3
      d[0] = -f
      d[1] = f - (b % c)
  d

Settings = ->
  b = {}
  window.location.search.substr(1).split('&').forEach (c) ->
    b[c.split('=')[0]] = c.split('=')[1]
    return
  window.location.hash.substr(1).split('&').forEach (c) ->
    b[c.split('=')[0]] = c.split('=')[1]
    return
  f = JSON.parse(Readfile.readTxt('config/settings.json'))
  console.log f
  @gameRoot = f.gameroot.value
  undefined != b.gameroot and f.gameroot.url and (@gameRoot = b.gameroot)
  @worldName = f.worldname.value
  undefined != b.worldname and f.worldname.url and (@worldName = b.worldname)
  @distanceLevel = [
    10
    10
    10
  ]
  undefined != f.distanceLevel and @distanceLevel[0] = parseInt(f.distanceLevel.value.split('-')[0]) or @distanceLevel[0]
  @distanceLevel[1] = parseInt(f.distanceLevel.value.split('-')[1]) or @distanceLevel[1]
  @distanceLevel[2] = parseInt(f.distanceLevel.value.split('-')[2]) or @distanceLevel[2]
  undefined != b.distanceLevel and f.distanceLevel.url and @distanceLevel[0] = parseInt(b.distanceLevel.split('-')[0]) or @distanceLevel[0]
  @distanceLevel[1] = parseInt(b.distanceLevel.split('-')[1]) or @distanceLevel[1]
  @distanceLevel[2] = parseInt(b.distanceLevel.split('-')[2]) or @distanceLevel[2]
  10 > @distanceLevel[0] and (@distanceLevel[0] = 10)
  @distanceLevel[1] < @distanceLevel[0] and (@distanceLevel[1] = @distanceLevel[0])
  @distanceLevel[2] < @distanceLevel[0] and (@distanceLevel[2] = @distanceLevel[0])
  100 < @distanceLevel[0] and (@distanceLevel[0] = 100)
  100 < @distanceLevel[1] and (@distanceLevel[1] = 100)
  100 < @distanceLevel[2] and (@distanceLevel[2] = 100)
  @sensitivity = 50
  undefined != f.mouseSensitivity and (@sensitivity = parseInt(f.mouseSensitivity.value))
  undefined != b.mouseSensitivity and f.mouseSensitivity.url and (@sensitivity = parseInt(b.mouseSensitivity))
  10 > @sensitivity and (@sensitivity = 10)
  100 < @sensitivity and (@sensitivity = 100)
  @pos = [
    0
    100
    0
  ]
  @rot = [
    0
    0
  ]
  undefined != f.pos and @pos[0] = parseFloat(f.pos.value.split('+')[0]) or @pos[0]
  @pos[1] = parseFloat(f.pos.value.split('+')[1]) or @pos[1]
  @pos[2] = parseFloat(f.pos.value.split('+')[2]) or @pos[2]
  undefined != b.pos and f.pos.url and @pos[0] = parseFloat(b.pos.split('+')[0]) or @pos[0]
  @pos[1] = parseFloat(b.pos.split('+')[1]) or @pos[1]
  @pos[2] = parseFloat(b.pos.split('+')[2]) or @pos[2]
  undefined != f.rot and @rot[0] = parseFloat(f.rot.value.split('+')[0]) or @rot[0]
  @rot[1] = parseFloat(f.rot.value.split('+')[1]) or @rot[1]
  undefined != b.rot and f.rot.url and @rot[0] = parseFloat(b.rot.split('+')[0]) or @rot[0]
  @rot[1] = parseFloat(b.rot.split('+')[1]) or @rot[1]
  @skyColor = new Float32Array([
    1
    1
    1
    1
  ])
  undefined != f.skyColor and @skyColor[0] = parseFloat(f.skyColor.value.split('-')[0]) / 255 or @skyColor[0]
  @skyColor[1] = parseFloat(f.skyColor.value.split('-')[1]) / 255 or @skyColor[1]
  @skyColor[2] = parseFloat(f.skyColor.value.split('-')[2]) / 255 or @skyColor[2]
  undefined != b.skyColor and f.skyColor.url and @skyColor[0] = parseFloat(b.skyColor.split('-')[0]) / 255 or @skyColor[0]
  @skyColor[1] = parseFloat(b.skyColor.split('-')[1]) / 255 or @skyColor[1]
  @skyColor[2] = parseFloat(b.skyColor.split('-')[2]) / 255 or @skyColor[2]
  @sun = 1
  undefined != f.sun and (@sun = parseFloat(f.sun.value) + 0.01 or @sun)
  undefined != b.sun and f.sun.url and (@sun = parseFloat(b.sun) + 0.01 or @sun)
  1 < @sun and (@sun = 1)
  @brightness = 0.3
  undefined != f.brightness and (@brightness = parseFloat(f.brightness.value) + 0.01 or @brightness)
  undefined != b.brightness and f.brightness.url and (@brightness = parseFloat(b.brightness) + 0.01 or @brightness)
  @loadLag = 3
  undefined != f.loadLag and (@loadLag = parseFloat(f.loadLag.value) or @loadLag)
  undefined != b.loadLag and f.loadLag.url and (@loadLag = parseFloat(b.loadLag) or @loadLag)
  @loadSpeed = 1
  undefined != f.loadSpeed and (@loadSpeed = parseFloat(f.loadSpeed.value) or @loadSpeed)
  undefined != b.loadSpeed and f.loadSpeed.url and (@loadSpeed = parseFloat(b.loadSpeed) or @loadSpeed)
  @worldShader = 'standard'
  undefined != f.worldShader and (@worldShader = f.worldShader.value or @worldShader)
  undefined != b.worldShader and f.worldShader.url and (@worldShader = b.worldShader or @worldShader)
  @edit = !0
  undefined != f.edit and (@edit = f.edit.value)
  undefined != f.edit and f.edit.url and 'true' == b.edit and (@edit = !0)
  'false' == b.edit and (@edit = !1)
  @lightInit = !1
  undefined != f.lightInit and (@lightInit = f.lightInit.value)
  undefined != f.lightInit and f.lightInit.url and 'true' == b.lightInit and (@lightInit = !0)
  'false' == b.lightInit and (@lightInit = !1)
  @cameraType = f.camera.value
  undefined != b.camera and f.camera.url and (@cameraType = b.camera)
  return

Gluu = ->
  @selectionShader = @lineShader = @standardShader = null
  @mvMatrix = mat4.create()
  @objStrMatrix = mat4.create([
    1
    0
    0
    0
    0
    1
    0
    0
    0
    0
    1
    0
    0
    0
    0
    1
  ])
  @mvMatrixStack = []
  @pMatrix = mat4.create()
  return

Camera = (b, f, c) ->
  @name = 'Camera'
  @pos = b
  @oldPos = new Float32Array(3)
  @tPos = new Float32Array(3)
  @tPos[0] = @pos[0]
  @tPos[1] = @pos[1]
  @tPos[2] = @pos[2]
  @eyePos = [
    0
    1.65
    0
  ]
  @rot = f
  @up = c
  @przesx = 8
  @przesy = 1
  @przesz = 8
  @control = @lpm = 0
  @fovy = 3.14 / 3
  @aspect = gl.viewportWidth / gl.viewportHeight
  @fovx = @fovy * @aspect
  @starey = @starex = 0
  @autoMove = !0
  @lastTime = 0
  @sensitivity = 100
  @moveR = @moveL = @moveB = @moveF = !1
  @upY = @moveY = @moveX = 0
  return

CameraGod = (b, f, c) ->
  @name = 'CameraGod'
  @pos = b
  @oldPos = new Float32Array(3)
  @rot = f
  @up = c
  @przesz = @przesy = @przesx = 1
  @control = @lpm = 0
  @fovy = 3.14 / 3
  @aspect = gl.viewportWidth / gl.viewportHeight
  @fovx = @fovy * @aspect
  @starey = @starex = 0
  @autoMove = !0
  @lastTime = 0
  @sensitivity = 100
  @moveR = @moveL = @moveB = @moveF = !1
  @moveY = @moveX = 0
  return

CameraPlayer = (b) ->
  @name = 'CameraPlayer'
  @entity = b
  @failing = 0
  @oldPos = new Float32Array(3)
  @tPos = new Float32Array(3)
  @nPos1 = new Float32Array(3)
  @nPos2 = new Float32Array(3)
  @tPos[0] = b.pos[0]
  @tPos[1] = b.pos[1]
  @tPos[2] = b.pos[2]
  @control = @lpm = 0
  @fovy = 3.14 / 3
  @aspect = gl.viewportWidth / gl.viewportHeight
  @fovx = @fovy * @aspect
  @starey = @starex = 0
  @autoMove = !0
  @lastTime = 0
  @sensitivity = 100
  @moveR = @moveL = @moveB = @moveF = !1
  @upY = @moveY = @moveX = 0
  return

RegionLib = (b, f) ->
  @gameRoot = b
  @worldName = f
  @region = []
  @localIChunk = []
  @rchunk = []
  @iChunk = 0
  return

Chunk = ->
  @section = []
  @isInit1 = @isInit = 0
  @visible = !0
  @changed = !1
  @ivbo = []
  @vbo = []
  @needsUpdate = !1
  @timestamp = (new Date).getTime()
  return

Mob = (b, f, c) ->
  @pos = b or [
    0
    0
    0
  ]
  @rot = f or [
    0
    0
  ]
  @up = c or [
    0
    1
    0
  ]
  @eyePos = [
    0
    0
    0
  ]
  @przesz = @przesy = @przesx = 0
  return

Player = (b, f, c) ->
  @pos = b or [
    0
    0
    0
  ]
  @rot = f or [
    0
    0
  ]
  @up = c or [
    0
    1
    0
  ]
  @eyePos = [
    0
    1.65
    0
  ]
  @przesx = 8
  @przesy = 1
  @przesz = 8
  return

Pointer = ->

SelectionBox = ->

tick = ->
  `var d`
  requestAnimFrame tick
  b = (new Date).getTime()
  fps = 1e3 / (b - lastTime)
  f = camera.getPos()
  c = camera.getRot()
  0 < Math.floor(b / 100) - Math.floor(lastTime / 100) and textDiv.innerHTML = 'x: ' + f[0].toFixed(2) + '  y: ' + f[1].toFixed(2) + '  z: ' + f[2].toFixed(2)
  textDiv.innerHTML += '<br/>FPS: ' + Math.floor(fps)
  textDiv.innerHTML += '<br/>Block: ' + useBlock.id + '-' + useBlock.data + '  : ' + (block[useBlock.id][useBlock.data].name or block[useBlock.id].name or block[useBlock.id][useBlock.data].defaultTexture or '')
  textDiv.innerHTML += '<br/>Est. Gpu Mem: ' + Math.floor(8 * gpuMem / 1048576) + ' M'
  newSec = !1
  lastTime % 1e3 > b % 1e3 and newSec = !0
  sec++
  d = !1
  lastTime % 100 > b % 100 and (d = !0)
  lastTime = b
  camera.updatePosition fps
  iLag += settings.loadSpeed
  iLag > settings.loadLag and (iLag = settings.loadLag)
  if settings.edit and d and (blockSelection = mcWorld.renderSelection())
    selectE

    switch b = blockSelection
    selectE = !1
    console.log('y: ' + b.y + ' z: ' + b.z + ' x: ' + b.x + ' chx: ' + b.chx + ' chz: ' + b.chz + ' side: ' + b.side)
    selectT

      when 0
        mcWorld.updateChunkBlock b.chx, b.chz, b.x, b.y, b.z, 0, 0
      when 1
        e = 0
        m = 0
        d = 0
        l = mcWorld.getChunkBlock(b.chx, b.chz, b.x, b.y, b.z)
        console.log l.id + ' ' + l.data
        p = !1
        undefined != block[l.id][l.data & block[l.id].mask] and (if undefined != block[l.id][l.data & block[l.id].mask].replace then (p = block[l.id][l.data & block[l.id].mask].replace) else undefined != block[l.id].replace and (p = block[l.id].replace))
        if !p
          switch b.side
            when 1
              e = -1
            when 2
              e = 1
            when 3
              m = -1
            when 4
              m = 1
            when 5
              d = -1
            when 6
              d = 1
        b.x += e
        15 < b.x and b.x = 0
        b.chx++
        0 > b.x and b.x = 15
        b.chx--
        b.z += m
        15 < b.z and b.z = 0
        b.chz++
        0 > b.z and b.z = 15
        b.chz--
        0 > b.y and (b.y = 0)
        256 < b.y and (b.y = 256)
        e = useBlock.id or 1
        m = useBlock.data or 0
        mcWorld.updateChunkBlock b.chx, b.chz, b.x, b.y + d, b.z, e, m
      when 2
        e = useBlock.id or 1
        m = useBlock.data or 0
        mcWorld.updateChunkBlock b.chx, b.chz, b.x, b.y, b.z, e, m
      when 3
        mcWorld.changeChunkBlockAdd b.chx, b.chz, b.x, b.y, b.z
  mcWorld.render()
  settings.edit and selectBox.render(blockSelection)
  pointer.render()
  newSec and settings.setHashURL(f, c, camera.name)
  10 == sec and sec = 0
  mcWorld.deleteBuffers()
  return

initTextures = ->
  blockTexture = gl.createTexture()
  b = new Image

  b.onload = ->
    handleTextureLoaded b, blockTexture
    return

  b.src = 'config/blocks.png'
  return

handleTextureLoaded = (b, f) ->
  gl.bindTexture gl.TEXTURE_2D, f
  gl.texImage2D gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, b
  gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST
  gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST
  gl.bindTexture gl.TEXTURE_2D, null
  initTexture = !0
  return

initBlocks = ->
  texLib = JSON.parse(Readfile.readTxt('config/textures.json'))
  console.log texLib
  block = JSON.parse(Readfile.readTxt('config/blocks.json'))
  block.length = 300
  biomes = JSON.parse(Readfile.readTxt('config/biomes.json'))
  shapeLib = JSON.parse(Readfile.readTxt('config/shapes.json'))
  console.log shapeLib
  texLib.texF = 1 / texLib.row
  b = 0
  f = 0
  c = texLib.texF
  d = 0
  block.lightSource = new Uint8Array(block.length)
  block.lightTransmission = new Float32Array(block.length)
  e = undefined
  m = undefined
  l = undefined
  e = 0
  while e < block.length
    undefined == block[e] and block[e] = {}
    block[e].type = 0
    undefined == block[e][0] and block[e][0] = {}
    block[e][0].type = 0
    block.lightSource[e] = block[e].lightSource or 0
    block.lightTransmission[e] = if 1 == block[e].type then block[e].lightTransmission or 0 else block[e].lightTransmission or 1
    for m of block[e]
      if 'mask' == m
        block[e][m] = parseInt(block[e][m], 16)
      else if undefined != block[e][m].shapeName
        block[e][m].shape = {}
        for l of shapeLib[block[e][m].shapeName]
          `l = l`
          block[e][m].shape[l] = []
          if undefined != block[e][m][l] then d = texLib.texture[block[e][m][l]]
          b = d % texLib.row
          f = (d - b) / texLib.row
 else undefined != block[e][m].defaultTexture and d = texLib.texture[block[e][m].defaultTexture]
          b = d % texLib.row
          f = (d - b) / texLib.row

          block[e][m].shape[l] = new Float32Array(shapeLib[block[e][m].shapeName][l].length)
          d = 0
          while d < shapeLib[block[e][m].shapeName][l].length
            block[e][m].shape[l][d] = shapeLib[block[e][m].shapeName][l][d]
            block[e][m].shape[l][d + 1] = shapeLib[block[e][m].shapeName][l][d + 1]
            block[e][m].shape[l][d + 2] = shapeLib[block[e][m].shapeName][l][d + 2]
            block[e][m].shape[l][d + 3] = c * (shapeLib[block[e][m].shapeName][l][d + 3] + b)
            block[e][m].shape[l][d + 4] = c * (shapeLib[block[e][m].shapeName][l][d + 4] + f)
            d += 5
    e++
  useBlock.id = 1
  useBlock.data = 0
  console.log block
  return

useNextBlock = (b) ->
  b.id == block.length - 1 and (b.id = 0)
  while 0 == block[++b.id].type
    b.id == block.length - 1 and (b.id = 0)
  b.data = -1
  useNextBlockData b
  return

usePrevBlock = (b) ->
  1 == b.id and (b.id = block.length)
  while 0 == block[--b.id].type
    0 == b.id and (b.id = block.length)
  b.data = -1
  useNextBlockData b
  return

useNextBlockData = (b) ->
  f = undefined
  f = 0
  while 16 > f
    if undefined != block[b.id][++b.data] and undefined != block[b.id][b.data].shapeType and !block[b.id][b.data].hidden
      return
    16 == b.data and (b.data = -1)
    f++
  b.data = 0
  return

keyDown = (b) ->
  if lastTarget == glCanvas
    switch camera.keyDown(b, fps)
    b.keyCode

      when 81
        0 == camera.upY and (camera.upY = 200)
      when 90
        useNextBlock useBlock
      when 88
        usePrevBlock useBlock
      when 67
        useNextBlockData useBlock
      when 49
        selectTt = 0
      when 50
        selectTt = 1
      when 51
        selectTt = 2
      when 52
        selectTt = 3
      when 80
        mcWorld.save()
      when 71
        b = document.getElementById('settings')
        if 'none' == b.style.display then (b.style.display = 'block') else 'block' == b.style.display and (b.style.display = 'none')
        undefined != window.ace and settings.edit and null == codeEditor and codeEditor = ace.edit('editor')
        codeEditor.setTheme('ace/theme/tomorrow_night')
        codeEditor.getSession().setMode('ace/mode/javascript')
        codeEditor.setValue('var pos = camera.getXYZPos();\nvar block = { id: 17, data: 0};\n\nfor(var i = -2; i < 3; i++)\n    for(var j = -2; j < 3; j++){\n    if(i > -2 && i < 2 && j > -2 && j < 2) continue;\n    useNextBlockData(block);\n    mcWorld.setBlock(pos.x+i,pos.y,pos.z+j,block.id,block.data);\n}\n\nmcWorld.updateChunks();')

        b = document.getElementById('tools')
        if 'none' == b.style.display then (b.style.display = 'block') else 'block' == b.style.display and (b.style.display = 'none')
        document.exitPointerLock = document.exitPointerLock or document.mozExitPointerLock or document.webkitExitPointerLock
        document.exitPointerLock()
        camera.moveX = 0
        camera.moveY = 0
      when 72
        if undefined == window.ace
          break
        if !settings.edit
          break
        executeJS()
      when 77
        window.localStorage.clear()
      when 86
        console.log(camera.name)
        if 'CameraGod' == camera.name then player.setPosRot(camera.getEye(), camera.getRot())
        camera = new CameraPlayer(player)
 else 'CameraPlayer' == camera.name and (camera = new CameraGod(camera.getEye(), camera.getRot(), [
          0
          1
          0
        ]))
        camera.sensitivity = 2 * settings.sensitivity
  return

keyUp = (b) ->
  lastTarget == glCanvas and camera.keyUp(b)
  return

mouseDown = (b) ->
  lastTarget = b.target
  lastTarget == glCanvas and camera.starex = b.clientX
  camera.starey = b.clientY
  settings.edit and camera.autoMove and (selectE = !0)
  selectT = if 0 == b.button then 0 else selectTt

  camera.mouseDown(fps)
  return

mouseUp = (b) ->
  lastTarget == glCanvas and camera.mouseUp(fps)
  return

mouseMove = (b) ->
  if lastTarget == glCanvas
    f = b.clientX
    b = b.clientY
    camera.mouseMove camera.starex - f, camera.starey - b, fps
    camera.starex = f
    camera.starey = b
  return

pointerMove = (b) ->
  f = b.movementY or b.mozMovementY or b.webkitMovementY or 0
  camera.moveX -= b.movementX or b.mozMovementX or b.webkitMovementX or 0
  camera.moveY -= f
  return

mouseWheel = (b) ->
  lastTarget == glCanvas and b = window.event or b
  if 0 > Math.max(-1, Math.min(1, b.wheelDelta or -b.detail)) then useNextBlock(useBlock) else usePrevBlock(useBlock)
  return

pointerChange = (b) ->
  b = document.getElementById('webgl')
  if document.pointerLockElement == b or document.mozPointerLockElement == b or document.webkitPointerLockElement == b then window.addEventListener('mousemove', pointerMove, !1) else b.onclick = canvasOn
  window.removeEventListener('mousemove', pointerMove, !1)
  camera.moveX = 0
  camera.moveY = 0
  return

windowResize = ->
  b = document.getElementById('webgl')
  b.width = window.innerWidth
  b.height = window.innerHeight
  gl.viewportWidth = b.width
  gl.viewportHeight = b.height
  return

canvasOn = ->
  document.getElementById('tools').style.display = 'none'
  document.getElementById('settings').style.display = 'none'
  b = document.getElementById('webgl')

  b.onclick = ->

  b.requestPointerLock = b.requestPointerLock or b.mozRequestPointerLock or b.webkitRequestPointerLock
  b.requestPointerLock()
  return

webGLStart = ->
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
  textDiv = document.getElementById('text')
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
  initBlocks()
  player = new Player
  if 'CameraGod' == settings.cameraType then (camera = new CameraGod(settings.pos, settings.rot, [
    0
    1
    0
  ])) else if 'Camera' == settings.cameraType then (camera = new Camera(settings.pos, settings.rot, [
    0
    1
    0
  ])) else player.setPosRot([
    settings.pos[0]
    settings.pos[1]
    settings.pos[2]
  ], [
    settings.rot[0]
    settings.rot[1]
  ])
  camera = new CameraPlayer(player)
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
  #    document.getElementById("setSkyColor").color.fromRGB(settings.skyColor[0], settings.skyColor[1], settings.skyColor[2]);
  settings.setSkyColor document.getElementById('setSkyColor').color.rgb
  firstTime = (new Date).getTime()
  lastTime = (new Date).getTime()
  tick()
  return

executeJS = ->
  eval codeEditor.getValue()
  return

shadersCode.fs.bloom = 'precision mediump float;varying vec2 vTextureCoord;varying float aaa;varying vec4 sLight;varying vec4 color;varying vec3 sky;uniform vec4 skyColor;uniform sampler2D uSampler;            void main(void) {    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));    if(gl_FragColor.a < 0.3)       discard;        gl_FragColor *= color;    gl_FragColor = gl_FragColor*sLight;    vec4 FragColor2 = gl_FragColor + aaa*skyColor;    float a = 0.0;    if(FragColor2.r > skyColor.x )         FragColor2.r = max(skyColor.x, gl_FragColor.r);    if(FragColor2.g > skyColor.y )         FragColor2.g = max(skyColor.y, gl_FragColor.g);    if(FragColor2.b > skyColor.z )         FragColor2.b = max(skyColor.z, gl_FragColor.b);   gl_FragColor = FragColor2;}'
shadersCode.vs.bloom = 'attribute vec3 aVertexPosition;attribute vec4 lightValue;attribute vec2 aTextureCoord;uniform float lod;uniform float sun;uniform float brightness;uniform mat4 uMVMatrix;uniform mat4 uMSMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying float aaa;varying vec4 color;varying vec4 sLight;void main(void) {     gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);     vTextureCoord = aTextureCoord;    aaa = sqrt((gl_Position.x)*(gl_Position.x) + (gl_Position.z)*(gl_Position.z))/(lod*13.5)-0.30;    if(aaa<0.0) aaa = 0.0;    if(aaa>1.0) aaa = 1.0;    float skylight = floor(lightValue.x/100.0);    float blocklight = lightValue.x - skylight*100.0;    float slight = ((skylight*sun)/15.0 + blocklight/15.0);    if(slight > 1.0) slight = 1.0;    slight = slight*(1.0 - brightness) + brightness;    slight *= lightValue.z;    sLight = vec4(slight,slight,slight,1.0);    if(lightValue.a != 0.0) {        float m5 = floor(lightValue.a/(256.0*256.0));        float m6 = floor((lightValue.a - m5*256.0*256.0)/(256.0));        float m7 = lightValue.a - m5*256.0*256.0 - m6*256.0;        color = vec4(m5/255.0, m6/255.0, m7/255.0, 1.0);    }    else color = vec4(1.0,1.0,1.0,1.0);}'
shadersCode.fs.line = 'precision mediump float;varying vec4 color;            void main(void) {    gl_FragColor = color;}'
shadersCode.vs.line = 'attribute vec3 aVertexPosition;attribute vec2 aTextureCoord;attribute vec4 lightValue;uniform mat4 uMVMatrix;uniform mat4 uPMatrix;varying vec4 color;void main(void) {    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);    color = vec4(1.0,1.0,1.0,1.0);    color.r = aTextureCoord.x;    color.g = lightValue.x;    color = vec4(0.0,0.0,0.0,1.0);}'
shadersCode.fs.selection = 'precision mediump float;varying vec2 vTextureCoord;varying float aaa;varying float slight;varying vec4 color;uniform sampler2D uSampler;            void main(void) {    gl_FragColor = color;    gl_FragColor.a = 1.0;}'
shadersCode.vs.selection = 'attribute vec3 aVertexPosition;attribute vec4 lightValue;attribute vec2 aTextureCoord;uniform mat4 uMVMatrix;uniform mat4 uMSMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying float aaa;varying vec4 color;varying float slight;void main(void) {     gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);     vTextureCoord = aTextureCoord;     color = vec4(0.0,0.0,0.0,1.0);     float yy = floor(lightValue.y/(256.0*256.0));     float zx = floor((lightValue.y - yy*256.0*256.0)/(256.0));     float cv = lightValue.y - yy*256.0*256.0 - zx*256.0;     color.r = yy/255.0;     color.g = zx/255.0;     color.b = cv/255.0;     slight = 1.0;}'
shadersCode.fs.standard = 'precision mediump float;varying vec2 vTextureCoord;varying float aaa;varying vec4 sLight;varying vec4 color;varying vec3 sky;uniform vec4 skyColor;uniform sampler2D uSampler;            void main(void) {    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));    if(gl_FragColor.a < 0.3)       discard;        gl_FragColor *= color;    gl_FragColor = gl_FragColor*sLight;    gl_FragColor = mix(gl_FragColor, skyColor, aaa);}'
shadersCode.vs.standard = 'attribute vec3 aVertexPosition;attribute vec4 lightValue;attribute vec2 aTextureCoord;uniform float lod;uniform float sun;uniform float brightness;uniform mat4 uMVMatrix;uniform mat4 uMSMatrix;uniform mat4 uPMatrix;varying vec2 vTextureCoord;varying float aaa;varying vec4 color;varying vec4 sLight;void main(void) {     gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);     vTextureCoord = aTextureCoord;    aaa = sqrt((gl_Position.x)*(gl_Position.x) + (gl_Position.z)*(gl_Position.z))/(lod*13.0)-0.25;    if(aaa<0.0) aaa = 0.0;    if(aaa>1.0) aaa = 1.0;    float skylight = floor(lightValue.x/100.0);    float blocklight = lightValue.x - skylight*100.0;    float slight = ((skylight*sun)/15.0 + blocklight/15.0);    if(slight > 1.0) slight = 1.0;    slight = slight*(1.0 - brightness) + brightness;    slight *= lightValue.z;    sLight = vec4(slight,slight,slight,1.0);    if(lightValue.a != 0.0) {        float m5 = floor(lightValue.a/(256.0*256.0));        float m6 = floor((lightValue.a - m5*256.0*256.0)/(256.0));        float m7 = lightValue.a - m5*256.0*256.0 - m6*256.0;        color = vec4(m5/255.0, m6/255.0, m7/255.0, 1.0);    }    else color = vec4(1.0,1.0,1.0,1.0);}'
threadsCode = []
threadsCode.loadRegionThread = 'self.addEventListener(\'message\', function(e) {        var x = e.data.x;        var y = e.data.y;        var xhr = new XMLHttpRequest();        xhr.open(\'GET\', e.data.name, false);        xhr.responseType = \'arraybuffer\';        try{            xhr.send();        } catch(e) {            self.postMessage({loaded: 0, x: x, y: y});            self.close();            return;        }        var regionData =  new Uint8Array(xhr.response);        self.postMessage({loaded: 1, x: x, y: y, data: regionData.buffer}, [regionData.buffer]);        self.close();    }, false);'

String::equalsIgnoreCase = (b) ->
  @toUpperCase() == b.toUpperCase()

Settings::setDistanceLevel = (b) ->
  @distanceLevel = [
    b
    b
    b
  ]
  document.getElementById('setDstLvl_val').innerHTML = @distanceLevel[0]
  @getSettingsURL()
  return

Settings::setSkyColor = (b) ->
  @skyColor[0] = b[0]
  @skyColor[1] = b[1]
  @skyColor[2] = b[2]
  @getSettingsURL()
  return

Settings::setSun = (b) ->
  @sun = b
  document.getElementById('setSun_val').innerHTML = @sun
  @getSettingsURL()
  return

Settings::setBrightness = (b) ->
  @brightness = b
  document.getElementById('setBrightness_val').innerHTML = @brightness
  @getSettingsURL()
  return

Settings::getSettingsURL = ->
  `var b`
  b = document.location.href.split(/#/)[0]
  b = b.split(/\?/)
  f = undefined
  f = if undefined == b[1] then [] else b[1].split(/&/)
  c = b[0] + '?'
  d = {}
  e = this
  f.forEach (b) ->
    c += '&'
    if 'sun' == b.split(RegExp('='))[0].toLowerCase() then d.sun = !0
    c += 'sun=' + e.sun
 else if 'skycolor' == b.split(RegExp('='))[0].toLowerCase() then d.skyColor = !0
    c += 'skyColor=' + Math.floor(255 * e.skyColor[0]) + '-' + Math.floor(255 * e.skyColor[1]) + '-' + Math.floor(255 * e.skyColor[2])
 else if 'brightness' == b.split(RegExp('='))[0].toLowerCase() then d.brightness = !0
    c += 'brightness=' + e.brightness
 else if 'worldshader' == b.split(RegExp('='))[0].toLowerCase() then d.worldshader = !0
    c += 'worldShader=' + e.worldShader
 else if 'distancelevel' == b.split(RegExp('='))[0].toLowerCase() then d.distancelevel = !0
    c += 'distanceLevel=' + e.distanceLevel[0]
 else (c += b)
    return
  !0 != d.sun and (c += '&sun=' + @sun)
  !0 != d.worldshader and (c += '&worldShader=' + @worldShader)
  !0 != d.brightness and (c += '&brightness=' + @brightness)
  !0 != d.distancelevel and (c += '&distanceLevel=' + @distanceLevel[0])
  !0 != d.skyColor and (c += '&skyColor=' + Math.floor(255 * @skyColor[0]) + '-' + Math.floor(255 * @skyColor[1]) + '-' + Math.floor(255 * @skyColor[2]))
  document.getElementById('settingsURL').value = c + window.location.hash
  return

Settings::setHashURL = (b, f, c) ->
  # test parent.location.hash
  window.location.hash = 'pos=' + b[0].toFixed(2) + '+' + b[1].toFixed(2) + '+' + b[2].toFixed(2) + '&rot=' + f[0].toFixed(2) + '+' + f[1].toFixed(2) + '&camera=' + c
  return

WebGLUtils = do ->

  b = (b, c) ->
    d = undefined
    e = undefined
    m = undefined
    d = [
      'webgl'
      'experimental-webgl'
      'webkit-3d'
      'moz-webgl'
    ]
    e = null
    m = 0
    while m < d.length
      try
        e = b.getContext(d[m], c)
      catch l
      if e
        break
      ++m
    e

  {
    create3DContext: b
    setupWebGL: (f, c, d) ->

      e = (b) ->
        `var d`
        `var c`
        c = f.parentNode
        if c
          d = if window.WebGLRenderingContext then 'It doesn\'t appear your computer can support WebGL.<br/><a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>' else 'This page requires a browser that supports WebGL.<br/><a href="http://get.webgl.org">Click here to upgrade your browser.</a>'
          b and (d += '<br/><br/>Status: ' + b)
          c.innerHTML = '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr><td align="center"><div style="display: table-cell; vertical-align: middle;"><div style="">' + d + '</div></div></td></tr></table>'
        return

      d = d or e
      f.addEventListener and f.addEventListener('webglcontextcreationerror', ((b) ->
        d b.statusMessage
        return
      ), !1)
      (c = b(f, c)) or window.WebGLRenderingContext or d('')
      c

  }
window.requestAnimFrame = do ->
  window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or window.oRequestAnimationFrame or window.msRequestAnimationFrame or (b, f) ->
    window.setTimeout b, 1e3 / 60
    return
((b) ->
  f = undefined
  if 'undefined' == typeof exports then (if 'function' == typeof define and 'object' == typeof define.amd and define.amd then f = {}
  define((->
    f
  ))
  else (f = if 'undefined' != typeof window then window else b)) else (f = exports)
  ((b) ->
    `var f`
    if !d
      d = 1e-6
    if !e
      e = if 'undefined' != typeof Float32Array then Float32Array else Array
    if !f
      f = Math.random
    l = setMatrixArrayType: (a) ->
      e = a
      return
    'undefined' != typeof b and (b.glMatrix = l)
    p =
      create: ->
        a = new e(2)
        a[0] = 0
        a[1] = 0
        a
      clone: (a) ->
        v = new e(2)
        v[0] = a[0]
        v[1] = a[1]
        v
      fromValues: (a, v) ->
        `var b`
        b = new e(2)
        b[0] = a
        b[1] = v
        b
      copy: (a, v) ->
        a[0] = v[0]
        a[1] = v[1]
        a
      set: (a, v, b) ->
        a[0] = v
        a[1] = b
        a
      add: (a, v, b) ->
        a[0] = v[0] + b[0]
        a[1] = v[1] + b[1]
        a
      subtract: (a, v, b) ->
        a[0] = v[0] - (b[0])
        a[1] = v[1] - (b[1])
        a
    p.sub = p.subtract

    p.multiply = (a, v, b) ->
      a[0] = v[0] * b[0]
      a[1] = v[1] * b[1]
      a

    p.mul = p.multiply

    p.divide = (a, v, b) ->
      a[0] = v[0] / b[0]
      a[1] = v[1] / b[1]
      a

    p.div = p.divide

    p.min = (a, v, b) ->
      a[0] = Math.min(v[0], b[0])
      a[1] = Math.min(v[1], b[1])
      a

    p.max = (a, v, b) ->
      a[0] = Math.max(v[0], b[0])
      a[1] = Math.max(v[1], b[1])
      a

    p.scale = (a, v, b) ->
      a[0] = v[0] * b
      a[1] = v[1] * b
      a

    p.scaleAndAdd = (a, v, b, c) ->
      a[0] = v[0] + b[0] * c
      a[1] = v[1] + b[1] * c
      a

    p.distance = (a, v) ->
      `var b`
      b = v[0] - (a[0])
      c = v[1] - (a[1])
      Math.sqrt b * b + c * c

    p.dist = p.distance

    p.squaredDistance = (a, v) ->
      `var b`
      b = v[0] - (a[0])
      c = v[1] - (a[1])
      b * b + c * c

    p.sqrDist = p.squaredDistance

    p.length = (a) ->
      v = a[0]
      a = a[1]
      Math.sqrt v * v + a * a

    p.len = p.length

    p.squaredLength = (a) ->
      v = a[0]
      a = a[1]
      v * v + a * a

    p.sqrLen = p.squaredLength

    p.negate = (a, v) ->
      a[0] = -v[0]
      a[1] = -v[1]
      a

    p.normalize = (a, v) ->
      `var b`
      `var b`
      b = v[0]
      c = v[1]
      b = b * b + c * c
      0 < b and b = 1 / Math.sqrt(b)
      a[0] = v[0] * b
      a[1] = v[1] * b
      a

    p.dot = (a, v) ->
      a[0] * v[0] + a[1] * v[1]

    p.cross = (a, v, b) ->
      v = v[0] * b[1] - (v[1] * b[0])
      a[0] = a[1] = 0
      a[2] = v
      a

    p.lerp = (a, v, b, c) ->
      `var d`
      d = v[0]
      v = v[1]
      a[0] = d + c * (b[0] - d)
      a[1] = v + c * (b[1] - v)
      a

    p.random = (a, v) ->
      `var b`
      v = v or 1
      b = 2 * f() * Math.PI
      a[0] = Math.cos(b) * v
      a[1] = Math.sin(b) * v
      a

    p.transformMat2 = (a, v, b) ->
      c = v[0]
      v = v[1]
      a[0] = b[0] * c + b[2] * v
      a[1] = b[1] * c + b[3] * v
      a

    p.transformMat2d = (a, v, b) ->
      c = v[0]
      v = v[1]
      a[0] = b[0] * c + b[2] * v + b[4]
      a[1] = b[1] * c + b[3] * v + b[5]
      a

    p.transformMat3 = (a, v, b) ->
      c = v[0]
      v = v[1]
      a[0] = b[0] * c + b[3] * v + b[6]
      a[1] = b[1] * c + b[4] * v + b[7]
      a

    p.transformMat4 = (a, v, b) ->
      c = v[0]
      v = v[1]
      a[0] = b[0] * c + b[4] * v + b[12]
      a[1] = b[1] * c + b[5] * v + b[13]
      a

    p.forEach = do ->
      a = p.create()
      (b, c, d, e, f, r) ->
        c or (c = 2)
        d or (d = 0)
        e = if e then Math.min(e * c + d, b.length) else b.length
        while d < e
          a[0] = b[d]
          a[1] = b[d + 1]
          f(a, a, r)
          b[d] = a[0]
          b[d + 1] = a[1]
          d += c
        b

    p.str = (a) ->
      'vec2(' + a[0] + ', ' + a[1] + ')'

    'undefined' != typeof b and (b.vec2 = p)
    q =
      create: ->
        a = new e(3)
        a[0] = 0
        a[1] = 0
        a[2] = 0
        a
      clone: (a) ->
        `var b`
        b = new e(3)
        b[0] = a[0]
        b[1] = a[1]
        b[2] = a[2]
        b
      fromValues: (a, b, c) ->
        `var d`
        d = new e(3)
        d[0] = a
        d[1] = b
        d[2] = c
        d
      copy: (a, b) ->
        a[0] = b[0]
        a[1] = b[1]
        a[2] = b[2]
        a
      set: (a, b, c, d) ->
        a[0] = b
        a[1] = c
        a[2] = d
        a
      add: (a, b, c) ->
        a[0] = b[0] + c[0]
        a[1] = b[1] + c[1]
        a[2] = b[2] + c[2]
        a
      subtract: (a, b, c) ->
        a[0] = b[0] - (c[0])
        a[1] = b[1] - (c[1])
        a[2] = b[2] - (c[2])
        a
    q.sub = q.subtract

    q.multiply = (a, b, c) ->
      a[0] = b[0] * c[0]
      a[1] = b[1] * c[1]
      a[2] = b[2] * c[2]
      a

    q.mul = q.multiply

    q.divide = (a, b, c) ->
      a[0] = b[0] / c[0]
      a[1] = b[1] / c[1]
      a[2] = b[2] / c[2]
      a

    q.div = q.divide

    q.min = (a, b, c) ->
      a[0] = Math.min(b[0], c[0])
      a[1] = Math.min(b[1], c[1])
      a[2] = Math.min(b[2], c[2])
      a

    q.max = (a, b, c) ->
      a[0] = Math.max(b[0], c[0])
      a[1] = Math.max(b[1], c[1])
      a[2] = Math.max(b[2], c[2])
      a

    q.scale = (a, b, c) ->
      a[0] = b[0] * c
      a[1] = b[1] * c
      a[2] = b[2] * c
      a

    q.scaleAndAdd = (a, b, c, d) ->
      a[0] = b[0] + c[0] * d
      a[1] = b[1] + c[1] * d
      a[2] = b[2] + c[2] * d
      a

    q.distance = (a, b) ->
      `var e`
      `var d`
      c = b[0] - (a[0])
      d = b[1] - (a[1])
      e = b[2] - (a[2])
      Math.sqrt c * c + d * d + e * e

    q.dist = q.distance

    q.squaredDistance = (a, b) ->
      `var e`
      `var d`
      c = b[0] - (a[0])
      d = b[1] - (a[1])
      e = b[2] - (a[2])
      c * c + d * d + e * e

    q.sqrDist = q.squaredDistance

    q.length = (a) ->
      `var b`
      b = a[0]
      c = a[1]
      a = a[2]
      Math.sqrt b * b + c * c + a * a

    q.len = q.length

    q.squaredLength = (a) ->
      `var b`
      b = a[0]
      c = a[1]
      a = a[2]
      b * b + c * c + a * a

    q.sqrLen = q.squaredLength

    q.negate = (a, b) ->
      a[0] = -b[0]
      a[1] = -b[1]
      a[2] = -b[2]
      a

    q.normalize = (a, b) ->
      `var c`
      `var e`
      `var d`
      c = b[0]
      d = b[1]
      e = b[2]
      c = c * c + d * d + e * e
      0 < c and c = 1 / Math.sqrt(c)
      a[0] = b[0] * c
      a[1] = b[1] * c
      a[2] = b[2] * c
      a

    q.dot = (a, b) ->
      a[0] * b[0] + a[1] * b[1] + a[2] * b[2]

    q.cross = (a, b, c) ->
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      b = b[2]
      f = c[0]
      r = c[1]
      c = c[2]
      a[0] = e * c - (b * r)
      a[1] = b * f - (d * c)
      a[2] = d * r - (e * f)
      a

    q.lerp = (a, b, c, d) ->
      `var f`
      `var e`
      e = b[0]
      f = b[1]
      b = b[2]
      a[0] = e + d * (c[0] - e)
      a[1] = f + d * (c[1] - f)
      a[2] = b + d * (c[2] - b)
      a

    q.random = (a, b) ->
      `var e`
      `var d`
      b = b or 1
      c = 2 * f() * Math.PI
      d = 2 * f() - 1
      e = Math.sqrt(1 - (d * d)) * b
      a[0] = Math.cos(c) * e
      a[1] = Math.sin(c) * e
      a[2] = d * b
      a

    q.transformMat4 = (a, b, c) ->
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      b = b[2]
      a[0] = c[0] * d + c[4] * e + c[8] * b + c[12]
      a[1] = c[1] * d + c[5] * e + c[9] * b + c[13]
      a[2] = c[2] * d + c[6] * e + c[10] * b + c[14]
      a

    q.transformMat3 = (a, b, c) ->
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      b = b[2]
      a[0] = d * c[0] + e * c[3] + b * c[6]
      a[1] = d * c[1] + e * c[4] + b * c[7]
      a[2] = d * c[2] + e * c[5] + b * c[8]
      a

    q.transformQuat = (a, b, c) ->
      `var d`
      `var l`
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      b = c[0]
      r = c[1]
      s = c[2]
      c = c[3]
      n = c * d + r * f - (s * e)
      l = c * e + s * d - (b * f)
      m = c * f + b * e - (r * d)
      d = -b * d - (r * e) - (s * f)
      a[0] = n * c + d * -b + l * -s - (m * -r)
      a[1] = l * c + d * -r + m * -b - (n * -s)
      a[2] = m * c + d * -s + n * -r - (l * -b)
      a

    q.forEach = do ->
      a = q.create()
      (b, c, d, e, f, r) ->
        c or (c = 3)
        d or (d = 0)
        e = if e then Math.min(e * c + d, b.length) else b.length
        while d < e
          a[0] = b[d]
          a[1] = b[d + 1]
          a[2] = b[d + 2]
          f(a, a, r)
          b[d] = a[0]
          b[d + 1] = a[1]
          b[d + 2] = a[2]
          d += c
        b

    q.str = (a) ->
      'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')'

    'undefined' != typeof b and (b.vec3 = q)
    x =
      create: ->
        a = new e(4)
        a[0] = 0
        a[1] = 0
        a[2] = 0
        a[3] = 0
        a
      clone: (a) ->
        `var b`
        b = new e(4)
        b[0] = a[0]
        b[1] = a[1]
        b[2] = a[2]
        b[3] = a[3]
        b
      fromValues: (a, b, c, d) ->
        `var f`
        f = new e(4)
        f[0] = a
        f[1] = b
        f[2] = c
        f[3] = d
        f
      copy: (a, b) ->
        a[0] = b[0]
        a[1] = b[1]
        a[2] = b[2]
        a[3] = b[3]
        a
      set: (a, b, c, d, e) ->
        a[0] = b
        a[1] = c
        a[2] = d
        a[3] = e
        a
      add: (a, b, c) ->
        a[0] = b[0] + c[0]
        a[1] = b[1] + c[1]
        a[2] = b[2] + c[2]
        a[3] = b[3] + c[3]
        a
      subtract: (a, b, c) ->
        a[0] = b[0] - (c[0])
        a[1] = b[1] - (c[1])
        a[2] = b[2] - (c[2])
        a[3] = b[3] - (c[3])
        a
    x.sub = x.subtract

    x.multiply = (a, b, c) ->
      a[0] = b[0] * c[0]
      a[1] = b[1] * c[1]
      a[2] = b[2] * c[2]
      a[3] = b[3] * c[3]
      a

    x.mul = x.multiply

    x.divide = (a, b, c) ->
      a[0] = b[0] / c[0]
      a[1] = b[1] / c[1]
      a[2] = b[2] / c[2]
      a[3] = b[3] / c[3]
      a

    x.div = x.divide

    x.min = (a, b, c) ->
      a[0] = Math.min(b[0], c[0])
      a[1] = Math.min(b[1], c[1])
      a[2] = Math.min(b[2], c[2])
      a[3] = Math.min(b[3], c[3])
      a

    x.max = (a, b, c) ->
      a[0] = Math.max(b[0], c[0])
      a[1] = Math.max(b[1], c[1])
      a[2] = Math.max(b[2], c[2])
      a[3] = Math.max(b[3], c[3])
      a

    x.scale = (a, b, c) ->
      a[0] = b[0] * c
      a[1] = b[1] * c
      a[2] = b[2] * c
      a[3] = b[3] * c
      a

    x.scaleAndAdd = (a, b, c, d) ->
      a[0] = b[0] + c[0] * d
      a[1] = b[1] + c[1] * d
      a[2] = b[2] + c[2] * d
      a[3] = b[3] + c[3] * d
      a

    x.distance = (a, b) ->
      `var f`
      `var e`
      `var d`
      c = b[0] - (a[0])
      d = b[1] - (a[1])
      e = b[2] - (a[2])
      f = b[3] - (a[3])
      Math.sqrt c * c + d * d + e * e + f * f

    x.dist = x.distance

    x.squaredDistance = (a, b) ->
      `var f`
      `var e`
      `var d`
      c = b[0] - (a[0])
      d = b[1] - (a[1])
      e = b[2] - (a[2])
      f = b[3] - (a[3])
      c * c + d * d + e * e + f * f

    x.sqrDist = x.squaredDistance

    x.length = (a) ->
      `var d`
      `var b`
      b = a[0]
      c = a[1]
      d = a[2]
      a = a[3]
      Math.sqrt b * b + c * c + d * d + a * a

    x.len = x.length

    x.squaredLength = (a) ->
      `var d`
      `var b`
      b = a[0]
      c = a[1]
      d = a[2]
      a = a[3]
      b * b + c * c + d * d + a * a

    x.sqrLen = x.squaredLength

    x.negate = (a, b) ->
      a[0] = -b[0]
      a[1] = -b[1]
      a[2] = -b[2]
      a[3] = -b[3]
      a

    x.normalize = (a, b) ->
      `var c`
      `var f`
      `var e`
      `var d`
      c = b[0]
      d = b[1]
      e = b[2]
      f = b[3]
      c = c * c + d * d + e * e + f * f
      0 < c and c = 1 / Math.sqrt(c)
      a[0] = b[0] * c
      a[1] = b[1] * c
      a[2] = b[2] * c
      a[3] = b[3] * c
      a

    x.dot = (a, b) ->
      a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]

    x.lerp = (a, b, c, d) ->
      `var f`
      `var e`
      e = b[0]
      f = b[1]
      r = b[2]
      b = b[3]
      a[0] = e + d * (c[0] - e)
      a[1] = f + d * (c[1] - f)
      a[2] = r + d * (c[2] - r)
      a[3] = b + d * (c[3] - b)
      a

    x.random = (a, b) ->
      b = b or 1
      a[0] = f()
      a[1] = f()
      a[2] = f()
      a[3] = f()
      x.normalize a, a
      x.scale a, a, b
      a

    x.transformMat4 = (a, b, c) ->
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      b = b[3]
      a[0] = c[0] * d + c[4] * e + c[8] * f + c[12] * b
      a[1] = c[1] * d + c[5] * e + c[9] * f + c[13] * b
      a[2] = c[2] * d + c[6] * e + c[10] * f + c[14] * b
      a[3] = c[3] * d + c[7] * e + c[11] * f + c[15] * b
      a

    x.transformQuat = (a, b, c) ->
      `var d`
      `var l`
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      b = c[0]
      r = c[1]
      s = c[2]
      c = c[3]
      n = c * d + r * f - (s * e)
      l = c * e + s * d - (b * f)
      m = c * f + b * e - (r * d)
      d = -b * d - (r * e) - (s * f)
      a[0] = n * c + d * -b + l * -s - (m * -r)
      a[1] = l * c + d * -r + m * -b - (n * -s)
      a[2] = m * c + d * -s + n * -r - (l * -b)
      a

    x.forEach = do ->
      a = x.create()
      (b, c, d, e, f, r) ->
        c or (c = 4)
        d or (d = 0)
        e = if e then Math.min(e * c + d, b.length) else b.length
        while d < e
          a[0] = b[d]
          a[1] = b[d + 1]
          a[2] = b[d + 2]
          a[3] = b[d + 3]
          f(a, a, r)
          b[d] = a[0]
          b[d + 1] = a[1]
          b[d + 2] = a[2]
          b[d + 3] = a[3]
          d += c
        b

    x.str = (a) ->
      'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')'

    'undefined' != typeof b and (b.vec4 = x)
    l =
      create: ->
        a = new e(4)
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 1
        a
      clone: (a) ->
        `var b`
        b = new e(4)
        b[0] = a[0]
        b[1] = a[1]
        b[2] = a[2]
        b[3] = a[3]
        b
      copy: (a, b) ->
        a[0] = b[0]
        a[1] = b[1]
        a[2] = b[2]
        a[3] = b[3]
        a
      identity: (a) ->
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 1
        a
      transpose: (a, b) ->
        if a == b
          c = b[1]
          a[1] = b[2]
          a[2] = c
        else
          a[0] = b[0]
          a[1] = b[2]
          a[2] = b[1]
          a[3] = b[3]
        a
      invert: (a, b) ->
        `var f`
        `var e`
        `var d`
        c = b[0]
        d = b[1]
        e = b[2]
        f = b[3]
        r = c * f - (e * d)
        if !r
          return null
        r = 1 / r
        a[0] = f * r
        a[1] = -d * r
        a[2] = -e * r
        a[3] = c * r
        a
      adjoint: (a, b) ->
        c = b[0]
        a[0] = b[3]
        a[1] = -b[1]
        a[2] = -b[2]
        a[3] = c
        a
      determinant: (a) ->
        a[0] * a[3] - (a[2] * a[1])
      multiply: (a, b, c) ->
        `var f`
        `var e`
        `var d`
        d = b[0]
        e = b[1]
        f = b[2]
        b = b[3]
        r = c[0]
        s = c[1]
        n = c[2]
        c = c[3]
        a[0] = d * r + e * n
        a[1] = d * s + e * c
        a[2] = f * r + b * n
        a[3] = f * s + b * c
        a
    l.mul = l.multiply

    l.rotate = (a, b, c) ->
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      b = b[3]
      r = Math.sin(c)
      c = Math.cos(c)
      a[0] = d * c + e * r
      a[1] = d * -r + e * c
      a[2] = f * c + b * r
      a[3] = f * -r + b * c
      a

    l.scale = (a, b, c) ->
      `var f`
      `var e`
      `var d`
      d = b[1]
      e = b[2]
      f = b[3]
      r = c[0]
      c = c[1]
      a[0] = b[0] * r
      a[1] = d * c
      a[2] = e * r
      a[3] = f * c
      a

    l.str = (a) ->
      'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')'

    'undefined' != typeof b and (b.mat2 = l)
    l =
      create: ->
        a = new e(6)
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 1
        a[4] = 0
        a[5] = 0
        a
      clone: (a) ->
        `var b`
        b = new e(6)
        b[0] = a[0]
        b[1] = a[1]
        b[2] = a[2]
        b[3] = a[3]
        b[4] = a[4]
        b[5] = a[5]
        b
      copy: (a, b) ->
        a[0] = b[0]
        a[1] = b[1]
        a[2] = b[2]
        a[3] = b[3]
        a[4] = b[4]
        a[5] = b[5]
        a
      identity: (a) ->
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 1
        a[4] = 0
        a[5] = 0
        a
      invert: (a, b) ->
        `var f`
        `var e`
        `var d`
        c = b[0]
        d = b[1]
        e = b[2]
        f = b[3]
        r = b[4]
        s = b[5]
        n = c * f - (d * e)
        if !n
          return null
        n = 1 / n
        a[0] = f * n
        a[1] = -d * n
        a[2] = -e * n
        a[3] = c * n
        a[4] = (e * s - (f * r)) * n
        a[5] = (d * r - (c * s)) * n
        a
      determinant: (a) ->
        a[0] * a[3] - (a[1] * a[2])
      multiply: (a, b, c) ->
        `var q`
        `var p`
        `var l`
        `var f`
        `var e`
        `var d`
        d = b[0]
        e = b[1]
        f = b[2]
        r = b[3]
        s = b[4]
        b = b[5]
        n = c[0]
        l = c[1]
        m = c[2]
        p = c[3]
        q = c[4]
        c = c[5]
        a[0] = d * n + e * m
        a[1] = d * l + e * p
        a[2] = f * n + r * m
        a[3] = f * l + r * p
        a[4] = n * s + m * b + q
        a[5] = l * s + p * b + c
        a
    l.mul = l.multiply

    l.rotate = (a, b, c) ->
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      r = b[3]
      s = b[4]
      b = b[5]
      n = Math.sin(c)
      c = Math.cos(c)
      a[0] = d * c + e * n
      a[1] = -d * n + e * c
      a[2] = f * c + r * n
      a[3] = -f * n + c * r
      a[4] = c * s + n * b
      a[5] = c * b - (n * s)
      a

    l.scale = (a, b, c) ->
      `var d`
      d = c[0]
      c = c[1]
      a[0] = b[0] * d
      a[1] = b[1] * c
      a[2] = b[2] * d
      a[3] = b[3] * c
      a[4] = b[4] * d
      a[5] = b[5] * c
      a

    l.translate = (a, b, c) ->
      a[0] = b[0]
      a[1] = b[1]
      a[2] = b[2]
      a[3] = b[3]
      a[4] = b[4] + c[0]
      a[5] = b[5] + c[1]
      a

    l.str = (a) ->
      'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ')'

    'undefined' != typeof b and (b.mat2d = l)
    A =
      create: ->
        a = new e(9)
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 0
        a[4] = 1
        a[5] = 0
        a[6] = 0
        a[7] = 0
        a[8] = 1
        a
      fromMat4: (a, b) ->
        a[0] = b[0]
        a[1] = b[1]
        a[2] = b[2]
        a[3] = b[4]
        a[4] = b[5]
        a[5] = b[6]
        a[6] = b[8]
        a[7] = b[9]
        a[8] = b[10]
        a
      clone: (a) ->
        `var b`
        b = new e(9)
        b[0] = a[0]
        b[1] = a[1]
        b[2] = a[2]
        b[3] = a[3]
        b[4] = a[4]
        b[5] = a[5]
        b[6] = a[6]
        b[7] = a[7]
        b[8] = a[8]
        b
      copy: (a, b) ->
        a[0] = b[0]
        a[1] = b[1]
        a[2] = b[2]
        a[3] = b[3]
        a[4] = b[4]
        a[5] = b[5]
        a[6] = b[6]
        a[7] = b[7]
        a[8] = b[8]
        a
      identity: (a) ->
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 0
        a[4] = 1
        a[5] = 0
        a[6] = 0
        a[7] = 0
        a[8] = 1
        a
      transpose: (a, b) ->
        `var e`
        `var d`
        if a == b
          c = b[1]
          d = b[2]
          e = b[5]
          a[1] = b[3]
          a[2] = b[6]
          a[3] = c
          a[5] = b[7]
          a[6] = d
          a[7] = e
        else
          a[0] = b[0]
          a[1] = b[3]
          a[2] = b[6]
          a[3] = b[1]
          a[4] = b[4]
          a[5] = b[7]
          a[6] = b[2]
          a[7] = b[5]
          a[8] = b[8]
        a
      invert: (a, b) ->
        `var q`
        `var p`
        `var l`
        `var f`
        `var e`
        `var d`
        c = b[0]
        d = b[1]
        e = b[2]
        f = b[3]
        r = b[4]
        s = b[5]
        n = b[6]
        l = b[7]
        m = b[8]
        p = m * r - (s * l)
        q = -m * f + s * n
        y = l * f - (r * n)
        t = c * p + d * q + e * y
        if !t
          return null
        t = 1 / t
        a[0] = p * t
        a[1] = (-m * d + e * l) * t
        a[2] = (s * d - (e * r)) * t
        a[3] = q * t
        a[4] = (m * c - (e * n)) * t
        a[5] = (-s * c + e * f) * t
        a[6] = y * t
        a[7] = (-l * c + d * n) * t
        a[8] = (r * c - (d * f)) * t
        a
      adjoint: (a, b) ->
        `var l`
        `var f`
        `var e`
        `var d`
        c = b[0]
        d = b[1]
        e = b[2]
        f = b[3]
        r = b[4]
        s = b[5]
        n = b[6]
        l = b[7]
        m = b[8]
        a[0] = r * m - (s * l)
        a[1] = e * l - (d * m)
        a[2] = d * s - (e * r)
        a[3] = s * n - (f * m)
        a[4] = c * m - (e * n)
        a[5] = e * f - (c * s)
        a[6] = f * l - (r * n)
        a[7] = d * n - (c * l)
        a[8] = c * r - (d * f)
        a
      determinant: (a) ->
        `var f`
        `var e`
        `var d`
        `var b`
        b = a[3]
        c = a[4]
        d = a[5]
        e = a[6]
        f = a[7]
        r = a[8]
        a[0] * (r * c - (d * f)) + a[1] * (-r * b + d * e) + a[2] * (f * b - (c * e))
      multiply: (a, b, c) ->
        `var A`
        `var x`
        `var q`
        `var p`
        `var l`
        `var f`
        `var e`
        `var d`
        d = b[0]
        e = b[1]
        f = b[2]
        r = b[3]
        s = b[4]
        n = b[5]
        l = b[6]
        m = b[7]
        b = b[8]
        p = c[0]
        q = c[1]
        y = c[2]
        t = c[3]
        x = c[4]
        A = c[5]
        N = c[6]
        P = c[7]
        c = c[8]
        a[0] = p * d + q * r + y * l
        a[1] = p * e + q * s + y * m
        a[2] = p * f + q * n + y * b
        a[3] = t * d + x * r + A * l
        a[4] = t * e + x * s + A * m
        a[5] = t * f + x * n + A * b
        a[6] = N * d + P * r + c * l
        a[7] = N * e + P * s + c * m
        a[8] = N * f + P * n + c * b
        a
    A.mul = A.multiply

    A.translate = (a, b, c) ->
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      r = b[3]
      s = b[4]
      n = b[5]
      l = b[6]
      m = b[7]
      b = b[8]
      p = c[0]
      c = c[1]
      a[0] = d
      a[1] = e
      a[2] = f
      a[3] = r
      a[4] = s
      a[5] = n
      a[6] = p * d + c * r + l
      a[7] = p * e + c * s + m
      a[8] = p * f + c * n + b
      a

    A.rotate = (a, b, c) ->
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      r = b[3]
      s = b[4]
      n = b[5]
      l = b[6]
      m = b[7]
      b = b[8]
      p = Math.sin(c)
      c = Math.cos(c)
      a[0] = c * d + p * r
      a[1] = c * e + p * s
      a[2] = c * f + p * n
      a[3] = c * r - (p * d)
      a[4] = c * s - (p * e)
      a[5] = c * n - (p * f)
      a[6] = l
      a[7] = m
      a[8] = b
      a

    A.scale = (a, b, c) ->
      `var d`
      d = c[0]
      c = c[1]
      a[0] = d * b[0]
      a[1] = d * b[1]
      a[2] = d * b[2]
      a[3] = c * b[3]
      a[4] = c * b[4]
      a[5] = c * b[5]
      a[6] = b[6]
      a[7] = b[7]
      a[8] = b[8]
      a

    A.fromMat2d = (a, b) ->
      a[0] = b[0]
      a[1] = b[1]
      a[2] = 0
      a[3] = b[2]
      a[4] = b[3]
      a[5] = 0
      a[6] = b[4]
      a[7] = b[5]
      a[8] = 1
      a

    A.fromQuat = (a, b) ->
      `var f`
      `var s`
      `var r`
      `var e`
      `var d`
      `var p`
      `var c`
      `var l`
      `var f`
      `var e`
      `var d`
      c = b[0]
      d = b[1]
      e = b[2]
      f = b[3]
      r = c + c
      s = d + d
      n = e + e
      l = c * r
      m = c * s
      c = c * n
      p = d * s
      d = d * n
      e = e * n
      r = f * r
      s = f * s
      f = f * n
      a[0] = 1 - (p + e)
      a[3] = m + f
      a[6] = c - s
      a[1] = m - f
      a[4] = 1 - (l + e)
      a[7] = d + r
      a[2] = c + s
      a[5] = d - r
      a[8] = 1 - (l + p)
      a

    A.normalFromMat4 = (a, b) ->
      `var y`
      `var q`
      `var p`
      `var m`
      `var A`
      `var x`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      c = b[0]
      d = b[1]
      e = b[2]
      f = b[3]
      r = b[4]
      s = b[5]
      n = b[6]
      l = b[7]
      m = b[8]
      p = b[9]
      q = b[10]
      y = b[11]
      t = b[12]
      x = b[13]
      A = b[14]
      N = b[15]
      P = c * s - (d * r)
      S = c * n - (e * r)
      Q = c * l - (f * r)
      V = d * n - (e * s)
      J = d * l - (f * s)
      Z = e * l - (f * n)
      I = m * x - (p * t)
      H = m * A - (q * t)
      m = m * N - (y * t)
      X = p * A - (q * x)
      p = p * N - (y * x)
      q = q * N - (y * A)
      y = P * q - (S * p) + Q * X + V * m - (J * H) + Z * I
      if !y
        return null
      y = 1 / y
      a[0] = (s * q - (n * p) + l * X) * y
      a[1] = (n * m - (r * q) - (l * H)) * y
      a[2] = (r * p - (s * m) + l * I) * y
      a[3] = (e * p - (d * q) - (f * X)) * y
      a[4] = (c * q - (e * m) + f * H) * y
      a[5] = (d * m - (c * p) - (f * I)) * y
      a[6] = (x * Z - (A * J) + N * V) * y
      a[7] = (A * Q - (t * Z) - (N * S)) * y
      a[8] = (t * J - (x * Q) + N * P) * y
      a

    A.str = (a) ->
      'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ')'

    'undefined' != typeof b and (b.mat3 = A)
    t =
      create: ->
        a = new e(16)
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 0
        a[4] = 0
        a[5] = 1
        a[6] = 0
        a[7] = 0
        a[8] = 0
        a[9] = 0
        a[10] = 1
        a[11] = 0
        a[12] = 0
        a[13] = 0
        a[14] = 0
        a[15] = 1
        a
      clone: (a) ->
        `var b`
        b = new e(16)
        b[0] = a[0]
        b[1] = a[1]
        b[2] = a[2]
        b[3] = a[3]
        b[4] = a[4]
        b[5] = a[5]
        b[6] = a[6]
        b[7] = a[7]
        b[8] = a[8]
        b[9] = a[9]
        b[10] = a[10]
        b[11] = a[11]
        b[12] = a[12]
        b[13] = a[13]
        b[14] = a[14]
        b[15] = a[15]
        b
      copy: (a, b) ->
        a[0] = b[0]
        a[1] = b[1]
        a[2] = b[2]
        a[3] = b[3]
        a[4] = b[4]
        a[5] = b[5]
        a[6] = b[6]
        a[7] = b[7]
        a[8] = b[8]
        a[9] = b[9]
        a[10] = b[10]
        a[11] = b[11]
        a[12] = b[12]
        a[13] = b[13]
        a[14] = b[14]
        a[15] = b[15]
        a
      identity: (a) ->
        a[0] = 1
        a[1] = 0
        a[2] = 0
        a[3] = 0
        a[4] = 0
        a[5] = 1
        a[6] = 0
        a[7] = 0
        a[8] = 0
        a[9] = 0
        a[10] = 1
        a[11] = 0
        a[12] = 0
        a[13] = 0
        a[14] = 0
        a[15] = 1
        a
      transpose: (a, b) ->
        `var l`
        `var f`
        `var e`
        `var d`
        if a == b
          c = b[1]
          d = b[2]
          e = b[3]
          f = b[6]
          r = b[7]
          l = b[11]
          a[1] = b[4]
          a[2] = b[8]
          a[3] = b[12]
          a[4] = c
          a[6] = b[9]
          a[7] = b[13]
          a[8] = d
          a[9] = f
          a[11] = b[14]
          a[12] = e
          a[13] = r
          a[14] = l
        else
          a[0] = b[0]
          a[1] = b[4]
          a[2] = b[8]
          a[3] = b[12]
          a[4] = b[1]
          a[5] = b[5]
          a[6] = b[9]
          a[7] = b[13]
          a[8] = b[2]
          a[9] = b[6]
          a[10] = b[10]
          a[11] = b[14]
          a[12] = b[3]
          a[13] = b[7]
          a[14] = b[11]
          a[15] = b[15]
        a
      invert: (a, b) ->
        `var A`
        `var x`
        `var t`
        `var q`
        `var p`
        `var l`
        `var f`
        `var e`
        `var d`
        c = b[0]
        d = b[1]
        e = b[2]
        f = b[3]
        r = b[4]
        l = b[5]
        n = b[6]
        m = b[7]
        p = b[8]
        q = b[9]
        t = b[10]
        y = b[11]
        x = b[12]
        A = b[13]
        M = b[14]
        N = b[15]
        P = c * l - (d * r)
        S = c * n - (e * r)
        Q = c * m - (f * r)
        V = d * n - (e * l)
        J = d * m - (f * l)
        Z = e * m - (f * n)
        I = p * A - (q * x)
        H = p * M - (t * x)
        X = p * N - (y * x)
        z = q * M - (t * A)
        $ = q * N - (y * A)
        aa = t * N - (y * M)
        W = P * aa - (S * $) + Q * z + V * X - (J * H) + Z * I
        if !W
          return null
        W = 1 / W
        a[0] = (l * aa - (n * $) + m * z) * W
        a[1] = (e * $ - (d * aa) - (f * z)) * W
        a[2] = (A * Z - (M * J) + N * V) * W
        a[3] = (t * J - (q * Z) - (y * V)) * W
        a[4] = (n * X - (r * aa) - (m * H)) * W
        a[5] = (c * aa - (e * X) + f * H) * W
        a[6] = (M * Q - (x * Z) - (N * S)) * W
        a[7] = (p * Z - (t * Q) + y * S) * W
        a[8] = (r * $ - (l * X) + m * I) * W
        a[9] = (d * X - (c * $) - (f * I)) * W
        a[10] = (x * J - (A * Q) + N * P) * W
        a[11] = (q * Q - (p * J) - (y * P)) * W
        a[12] = (l * H - (r * z) - (n * I)) * W
        a[13] = (c * z - (d * H) + e * I) * W
        a[14] = (A * S - (x * V) - (M * P)) * W
        a[15] = (p * V - (q * S) + t * P) * W
        a
      adjoint: (a, b) ->
        `var A`
        `var x`
        `var t`
        `var q`
        `var p`
        `var l`
        `var f`
        `var e`
        `var d`
        c = b[0]
        d = b[1]
        e = b[2]
        f = b[3]
        r = b[4]
        l = b[5]
        n = b[6]
        m = b[7]
        p = b[8]
        q = b[9]
        t = b[10]
        y = b[11]
        x = b[12]
        A = b[13]
        M = b[14]
        N = b[15]
        a[0] = l * (t * N - (y * M)) - (q * (n * N - (m * M))) + A * (n * y - (m * t))
        a[1] = -(d * (t * N - (y * M)) - (q * (e * N - (f * M))) + A * (e * y - (f * t)))
        a[2] = d * (n * N - (m * M)) - (l * (e * N - (f * M))) + A * (e * m - (f * n))
        a[3] = -(d * (n * y - (m * t)) - (l * (e * y - (f * t))) + q * (e * m - (f * n)))
        a[4] = -(r * (t * N - (y * M)) - (p * (n * N - (m * M))) + x * (n * y - (m * t)))
        a[5] = c * (t * N - (y * M)) - (p * (e * N - (f * M))) + x * (e * y - (f * t))
        a[6] = -(c * (n * N - (m * M)) - (r * (e * N - (f * M))) + x * (e * m - (f * n)))
        a[7] = c * (n * y - (m * t)) - (r * (e * y - (f * t))) + p * (e * m - (f * n))
        a[8] = r * (q * N - (y * A)) - (p * (l * N - (m * A))) + x * (l * y - (m * q))
        a[9] = -(c * (q * N - (y * A)) - (p * (d * N - (f * A))) + x * (d * y - (f * q)))
        a[10] = c * (l * N - (m * A)) - (r * (d * N - (f * A))) + x * (d * m - (f * l))
        a[11] = -(c * (l * y - (m * q)) - (r * (d * y - (f * q))) + p * (d * m - (f * l)))
        a[12] = -(r * (q * M - (t * A)) - (p * (l * M - (n * A))) + x * (l * t - (n * q)))
        a[13] = c * (q * M - (t * A)) - (p * (d * M - (e * A))) + x * (d * t - (e * q))
        a[14] = -(c * (l * M - (n * A)) - (r * (d * M - (e * A))) + x * (d * n - (e * l)))
        a[15] = c * (l * t - (n * q)) - (r * (d * t - (e * q))) + p * (d * n - (e * l))
        a
      determinant: (a) ->
        `var A`
        `var x`
        `var t`
        `var q`
        `var p`
        `var l`
        `var f`
        `var e`
        `var d`
        `var b`
        b = a[0]
        c = a[1]
        d = a[2]
        e = a[3]
        f = a[4]
        l = a[5]
        m = a[6]
        n = a[7]
        p = a[8]
        q = a[9]
        t = a[10]
        x = a[11]
        y = a[12]
        A = a[13]
        U = a[14]
        a = a[15]
        (b * l - (c * f)) * (t * a - (x * U)) - ((b * m - (d * f)) * (q * a - (x * A))) + (b * n - (e * f)) * (q * U - (t * A)) + (c * m - (d * l)) * (p * a - (x * y)) - ((c * n - (e * l)) * (p * U - (t * y))) + (d * n - (e * m)) * (p * A - (q * y))
      multiply: (a, b, c) ->
        `var A`
        `var x`
        `var t`
        `var q`
        `var p`
        `var l`
        `var f`
        `var e`
        `var d`
        d = b[0]
        e = b[1]
        f = b[2]
        l = b[3]
        m = b[4]
        n = b[5]
        p = b[6]
        q = b[7]
        t = b[8]
        x = b[9]
        y = b[10]
        A = b[11]
        U = b[12]
        M = b[13]
        N = b[14]
        b = b[15]
        P = c[0]
        S = c[1]
        Q = c[2]
        V = c[3]
        a[0] = P * d + S * m + Q * t + V * U
        a[1] = P * e + S * n + Q * x + V * M
        a[2] = P * f + S * p + Q * y + V * N
        a[3] = P * l + S * q + Q * A + V * b
        P = c[4]
        S = c[5]
        Q = c[6]
        V = c[7]
        a[4] = P * d + S * m + Q * t + V * U
        a[5] = P * e + S * n + Q * x + V * M
        a[6] = P * f + S * p + Q * y + V * N
        a[7] = P * l + S * q + Q * A + V * b
        P = c[8]
        S = c[9]
        Q = c[10]
        V = c[11]
        a[8] = P * d + S * m + Q * t + V * U
        a[9] = P * e + S * n + Q * x + V * M
        a[10] = P * f + S * p + Q * y + V * N
        a[11] = P * l + S * q + Q * A + V * b
        P = c[12]
        S = c[13]
        Q = c[14]
        V = c[15]
        a[12] = P * d + S * m + Q * t + V * U
        a[13] = P * e + S * n + Q * x + V * M
        a[14] = P * f + S * p + Q * y + V * N
        a[15] = P * l + S * q + Q * A + V * b
        a
    t.mul = t.multiply

    t.translate = (a, b, c) ->
      `var A`
      `var x`
      `var t`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      d = c[0]
      e = c[1]
      c = c[2]
      f = undefined
      l = undefined
      m = undefined
      n = undefined
      p = undefined
      q = undefined
      t = undefined
      x = undefined
      y = undefined
      A = undefined
      U = undefined
      M = undefined
      if b == a
        a[12] = b[0] * d + b[4] * e + b[8] * c + b[12]
        a[13] = b[1] * d + b[5] * e + b[9] * c + b[13]
        a[14] = b[2] * d + b[6] * e + b[10] * c + b[14]
        a[15] = b[3] * d + b[7] * e + b[11] * c + b[15]
      else
        f = b[0]
        l = b[1]
        m = b[2]
        n = b[3]
        p = b[4]
        q = b[5]
        t = b[6]
        x = b[7]
        y = b[8]
        A = b[9]
        U = b[10]
        M = b[11]
        a[0] = f
        a[1] = l
        a[2] = m
        a[3] = n
        a[4] = p
        a[5] = q
        a[6] = t
        a[7] = x
        a[8] = y
        a[9] = A
        a[10] = U
        a[11] = M
        a[12] = f * d + p * e + y * c + b[12]
        a[13] = l * d + q * e + A * c + b[13]
        a[14] = m * d + t * e + U * c + b[14]
        a[15] = n * d + x * e + M * c + b[15]
      a # return

    t.scale = (a, b, c) ->
      `var e`
      `var d`
      d = c[0]
      e = c[1]
      c = c[2]
      a[0] = b[0] * d
      a[1] = b[1] * d
      a[2] = b[2] * d
      a[3] = b[3] * d
      a[4] = b[4] * e
      a[5] = b[5] * e
      a[6] = b[6] * e
      a[7] = b[7] * e
      a[8] = b[8] * c
      a[9] = b[9] * c
      a[10] = b[10] * c
      a[11] = b[11] * c
      a[12] = b[12]
      a[13] = b[13]
      a[14] = b[14]
      a[15] = b[15]
      a

    t.rotate = (a, b, c, e) ->
      `var A`
      `var x`
      `var t`
      `var q`
      `var p`
      `var l`
      `var f`
      f = e[0]
      l = e[1]
      e = e[2]
      m = Math.sqrt(f * f + l * l + e * e)
      p = undefined
      n = undefined
      q = undefined
      t = undefined
      x = undefined
      A = undefined
      y = undefined
      R = undefined
      U = undefined
      M = undefined
      N = undefined
      P = undefined
      S = undefined
      Q = undefined
      V = undefined
      J = undefined
      Z = undefined
      I = undefined
      H = undefined
      X = undefined
      if Math.abs(m) < d
        return null
      m = 1 / m
      f *= m
      l *= m
      e *= m
      p = Math.sin(c)
      n = Math.cos(c)
      q = 1 - n
      c = b[0]
      m = b[1]
      t = b[2]
      x = b[3]
      A = b[4]
      y = b[5]
      R = b[6]
      U = b[7]
      M = b[8]
      N = b[9]
      P = b[10]
      S = b[11]
      Q = f * f * q + n
      V = l * f * q + e * p
      J = e * f * q - (l * p)
      Z = f * l * q - (e * p)
      I = l * l * q + n
      H = e * l * q + f * p
      X = f * e * q + l * p
      f = l * e * q - (f * p)
      l = e * e * q + n
      a[0] = c * Q + A * V + M * J
      a[1] = m * Q + y * V + N * J
      a[2] = t * Q + R * V + P * J
      a[3] = x * Q + U * V + S * J
      a[4] = c * Z + A * I + M * H
      a[5] = m * Z + y * I + N * H
      a[6] = t * Z + R * I + P * H
      a[7] = x * Z + U * I + S * H
      a[8] = c * X + A * f + M * l
      a[9] = m * X + y * f + N * l
      a[10] = t * X + R * f + P * l
      a[11] = x * X + U * f + S * l
      b != a and a[12] = b[12]
      a[13] = b[13]
      a[14] = b[14]
      a[15] = b[15]
      a

    t.rotateX = (a, b, c) ->
      `var t`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      d = Math.sin(c)
      c = Math.cos(c)
      e = b[4]
      f = b[5]
      l = b[6]
      m = b[7]
      n = b[8]
      p = b[9]
      q = b[10]
      t = b[11]
      b != a and a[0] = b[0]
      a[1] = b[1]
      a[2] = b[2]
      a[3] = b[3]
      a[12] = b[12]
      a[13] = b[13]
      a[14] = b[14]
      a[15] = b[15]
      a[4] = e * c + n * d
      a[5] = f * c + p * d
      a[6] = l * c + q * d
      a[7] = m * c + t * d
      a[8] = n * c - (e * d)
      a[9] = p * c - (f * d)
      a[10] = q * c - (l * d)
      a[11] = t * c - (m * d)
      a

    t.rotateY = (a, b, c) ->
      `var t`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      d = Math.sin(c)
      c = Math.cos(c)
      e = b[0]
      f = b[1]
      l = b[2]
      m = b[3]
      n = b[8]
      p = b[9]
      q = b[10]
      t = b[11]
      b != a and a[4] = b[4]
      a[5] = b[5]
      a[6] = b[6]
      a[7] = b[7]
      a[12] = b[12]
      a[13] = b[13]
      a[14] = b[14]
      a[15] = b[15]
      a[0] = e * c - (n * d)
      a[1] = f * c - (p * d)
      a[2] = l * c - (q * d)
      a[3] = m * c - (t * d)
      a[8] = e * d + n * c
      a[9] = f * d + p * c
      a[10] = l * d + q * c
      a[11] = m * d + t * c
      a

    t.rotateZ = (a, b, c) ->
      `var t`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      d = Math.sin(c)
      c = Math.cos(c)
      e = b[0]
      f = b[1]
      l = b[2]
      m = b[3]
      n = b[4]
      p = b[5]
      q = b[6]
      t = b[7]
      b != a and a[8] = b[8]
      a[9] = b[9]
      a[10] = b[10]
      a[11] = b[11]
      a[12] = b[12]
      a[13] = b[13]
      a[14] = b[14]
      a[15] = b[15]
      a[0] = e * c + n * d
      a[1] = f * c + p * d
      a[2] = l * c + q * d
      a[3] = m * c + t * d
      a[4] = n * c - (e * d)
      a[5] = p * c - (f * d)
      a[6] = q * c - (l * d)
      a[7] = t * c - (m * d)
      a

    t.fromRotationTranslation = (a, b, c) ->
      `var l`
      `var n`
      `var m`
      `var f`
      `var e`
      `var t`
      `var d`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      l = b[3]
      m = d + d
      n = e + e
      p = f + f
      b = d * m
      q = d * n
      d = d * p
      t = e * n
      e = e * p
      f = f * p
      m = l * m
      n = l * n
      l = l * p
      a[0] = 1 - (t + f)
      a[1] = q + l
      a[2] = d - n
      a[3] = 0
      a[4] = q - l
      a[5] = 1 - (b + f)
      a[6] = e + m
      a[7] = 0
      a[8] = d + n
      a[9] = e - m
      a[10] = 1 - (b + t)
      a[11] = 0
      a[12] = c[0]
      a[13] = c[1]
      a[14] = c[2]
      a[15] = 1
      a

    t.fromQuat = (a, b) ->
      `var f`
      `var m`
      `var l`
      `var e`
      `var d`
      `var t`
      `var c`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      `var d`
      c = b[0]
      d = b[1]
      e = b[2]
      f = b[3]
      l = c + c
      m = d + d
      n = e + e
      p = c * l
      q = c * m
      c = c * n
      t = d * m
      d = d * n
      e = e * n
      l = f * l
      m = f * m
      f = f * n
      a[0] = 1 - (t + e)
      a[1] = q + f
      a[2] = c - m
      a[3] = 0
      a[4] = q - f
      a[5] = 1 - (p + e)
      a[6] = d + l
      a[7] = 0
      a[8] = c + m
      a[9] = d - l
      a[10] = 1 - (p + t)
      a[11] = 0
      a[12] = 0
      a[13] = 0
      a[14] = 0
      a[15] = 1
      a

    t.frustum = (a, b, c, d, e, f, l) ->
      `var p`
      m = 1 / (c - b)
      n = 1 / (e - d)
      p = 1 / (f - l)
      a[0] = 2 * f * m
      a[1] = 0
      a[2] = 0
      a[3] = 0
      a[4] = 0
      a[5] = 2 * f * n
      a[6] = 0
      a[7] = 0
      a[8] = (c + b) * m
      a[9] = (e + d) * n
      a[10] = (l + f) * p
      a[11] = -1
      a[12] = 0
      a[13] = 0
      a[14] = l * f * 2 * p
      a[15] = 0
      a

    t.perspective = (a, b, c, d, e) ->
      `var f`
      b = 1 / Math.tan(b / 2)
      f = 1 / (d - e)
      a[0] = b / c
      a[1] = 0
      a[2] = 0
      a[3] = 0
      a[4] = 0
      a[5] = b
      a[6] = 0
      a[7] = 0
      a[8] = 0
      a[9] = 0
      a[10] = (e + d) * f
      a[11] = -1
      a[12] = 0
      a[13] = 0
      a[14] = 2 * e * d * f
      a[15] = 0
      a

    t.ortho = (a, b, c, d, e, f, l) ->
      `var p`
      m = 1 / (b - c)
      n = 1 / (d - e)
      p = 1 / (f - l)
      a[0] = -2 * m
      a[1] = 0
      a[2] = 0
      a[3] = 0
      a[4] = 0
      a[5] = -2 * n
      a[6] = 0
      a[7] = 0
      a[8] = 0
      a[9] = 0
      a[10] = 2 * p
      a[11] = 0
      a[12] = (b + c) * m
      a[13] = (e + d) * n
      a[14] = (l + f) * p
      a[15] = 1
      a

    t.lookAt = (a, b, c, e) ->
      `var A`
      `var x`
      `var q`
      `var p`
      `var l`
      `var f`
      f = undefined
      l = undefined
      m = undefined
      p = undefined
      n = undefined
      q = undefined
      x = undefined
      A = undefined
      T = b[0]
      y = b[1]
      b = b[2]
      m = e[0]
      p = e[1]
      l = e[2]
      x = c[0]
      e = c[1]
      f = c[2]
      if Math.abs(T - x) < d and Math.abs(y - e) < d and Math.abs(b - f) < d
        return t.identity(a)
      c = T - x
      e = y - e
      x = b - f
      A = 1 / Math.sqrt(c * c + e * e + x * x)
      c *= A
      e *= A
      x *= A
      f = p * x - (l * e)
      l = l * c - (m * x)
      m = m * e - (p * c)
      if (A = Math.sqrt(f * f + l * l + m * m))
        A = 1 / A
        f *= A
        l *= A
        m *= A
      else
        (m = l = f = 0)
      p = e * m - (x * l)
      n = x * f - (c * m)
      q = c * l - (e * f)
      if (A = Math.sqrt(p * p + n * n + q * q))
        A = 1 / A
        p *= A
        n *= A
        q *= A
      else
        (q = n = p = 0)
      a[0] = f
      a[1] = p
      a[2] = c
      a[3] = 0
      a[4] = l
      a[5] = n
      a[6] = e
      a[7] = 0
      a[8] = m
      a[9] = q
      a[10] = x
      a[11] = 0
      a[12] = -(f * T + l * y + m * b)
      a[13] = -(p * T + n * y + q * b)
      a[14] = -(c * T + e * y + x * b)
      a[15] = 1
      a

    t.str = (a) ->
      'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' + a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' + a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')'

    'undefined' != typeof b and (b.mat4 = t)
    a = create: ->
      `var a`
      a = new e(4)
      a[0] = 0
      a[1] = 0
      a[2] = 0
      a[3] = 1
      a
    a.rotationTo = do ->
      `var d`
      `var b`
      b = q.create()
      c = q.fromValues(1, 0, 0)
      d = q.fromValues(0, 1, 0)
      (e, f, l) ->
        m = q.dot(f, l)
        if -0.999999 > m
          return q.cross(b, c, f)
          1e-6 > q.length(b) and q.cross(b, d, f)
          q.normalize(b, b)
          a.setAxisAngle(e, b, Math.PI)
          e

        if 0.999999 < m
          return e[0] = 0
          e[1] = 0
          e[2] = 0
          e[3] = 1
          e

        q.cross b, f, l
        e[0] = b[0]
        e[1] = b[1]
        e[2] = b[2]
        e[3] = 1 + m
        a.normalize e, e
    a.setAxes = do ->
      `var b`
      b = A.create()
      (c, d, e, f) ->
        b[0] = e[0]
        b[3] = e[1]
        b[6] = e[2]
        b[1] = f[0]
        b[4] = f[1]
        b[7] = f[2]
        b[2] = d[0]
        b[5] = d[1]
        b[8] = d[2]
        a.normalize c, a.fromMat3(c, b)
    a.clone = x.clone
    a.fromValues = x.fromValues
    a.copy = x.copy
    a.set = x.set

    a.identity = (a) ->
      a[0] = 0
      a[1] = 0
      a[2] = 0
      a[3] = 1
      a

    a.setAxisAngle = (a, b, c) ->
      `var d`
      c *= 0.5
      d = Math.sin(c)
      a[0] = d * b[0]
      a[1] = d * b[1]
      a[2] = d * b[2]
      a[3] = Math.cos(c)
      a

    a.add = x.add

    a.multiply = (a, b, c) ->
      `var l`
      `var f`
      `var e`
      `var d`
      d = b[0]
      e = b[1]
      f = b[2]
      b = b[3]
      l = c[0]
      m = c[1]
      n = c[2]
      c = c[3]
      a[0] = d * c + b * l + e * n - (f * m)
      a[1] = e * c + b * m + f * l - (d * n)
      a[2] = f * c + b * n + d * m - (e * l)
      a[3] = b * c - (d * l) - (e * m) - (f * n)
      a

    a.mul = a.multiply
    a.scale = x.scale

    a.rotateX = (a, b, c) ->
      `var l`
      `var f`
      `var e`
      `var d`
      c *= 0.5
      d = b[0]
      e = b[1]
      f = b[2]
      b = b[3]
      l = Math.sin(c)
      c = Math.cos(c)
      a[0] = d * c + b * l
      a[1] = e * c + f * l
      a[2] = f * c - (e * l)
      a[3] = b * c - (d * l)
      a

    a.rotateY = (a, b, c) ->
      `var l`
      `var f`
      `var e`
      `var d`
      c *= 0.5
      d = b[0]
      e = b[1]
      f = b[2]
      b = b[3]
      l = Math.sin(c)
      c = Math.cos(c)
      a[0] = d * c - (f * l)
      a[1] = e * c + b * l
      a[2] = f * c + d * l
      a[3] = b * c - (e * l)
      a

    a.rotateZ = (a, b, c) ->
      `var l`
      `var f`
      `var e`
      `var d`
      c *= 0.5
      d = b[0]
      e = b[1]
      f = b[2]
      b = b[3]
      l = Math.sin(c)
      c = Math.cos(c)
      a[0] = d * c + e * l
      a[1] = e * c - (d * l)
      a[2] = f * c + b * l
      a[3] = b * c - (f * l)
      a

    a.calculateW = (a, b) ->
      `var e`
      `var d`
      c = b[0]
      d = b[1]
      e = b[2]
      a[0] = c
      a[1] = d
      a[2] = e
      a[3] = -Math.sqrt(Math.abs(1 - (c * c) - (d * d) - (e * e)))
      a

    a.dot = x.dot
    a.lerp = x.lerp

    a.slerp = (a, b, c, d) ->
      `var x`
      `var t`
      `var q`
      `var p`
      `var l`
      `var f`
      `var e`
      e = b[0]
      f = b[1]
      l = b[2]
      b = b[3]
      m = c[0]
      n = c[1]
      p = c[2]
      c = c[3]
      q = undefined
      t = undefined
      x = undefined
      t = e * m + f * n + l * p + b * c
      0 > t and t = -t
      m = -m
      n = -n
      p = -p
      c = -c
      if 1e-6 < 1 - t
        q = Math.acos(t)
        x = Math.sin(q)
        t = Math.sin((1 - d) * q) / x
        d = Math.sin(d * q) / x
      else
        (t = 1 - d)
      a[0] = t * e + d * m
      a[1] = t * f + d * n
      a[2] = t * l + d * p
      a[3] = t * b + d * c
      a

    a.invert = (a, b) ->
      `var l`
      `var l`
      `var f`
      `var e`
      `var d`
      c = b[0]
      d = b[1]
      e = b[2]
      f = b[3]
      l = c * c + d * d + e * e + f * f
      l = if l then 1 / l else 0
      a[0] = -c * l
      a[1] = -d * l
      a[2] = -e * l
      a[3] = f * l
      a

    a.conjugate = (a, b) ->
      a[0] = -b[0]
      a[1] = -b[1]
      a[2] = -b[2]
      a[3] = b[3]
      a

    a.length = x.length
    a.len = a.length
    a.squaredLength = x.squaredLength
    a.sqrLen = a.squaredLength
    a.normalize = x.normalize
    a.fromMat3 = do ->
      `var a`
      a = if 'undefined' != typeof Int8Array then new Int8Array([
        1
        2
        0
      ]) else [
        1
        2
        0
      ]
      (b, c) ->
        `var d`
        `var l`
        `var f`
        `var e`
        `var d`
        d = c[0] + c[4] + c[8]
        if 0 < d
          d = Math.sqrt(d + 1)
          b[3] = 0.5 * d
          d = 0.5 / d
          b[0] = (c[7] - (c[5])) * d
          b[1] = (c[2] - (c[6])) * d
          b[2] = (c[3] - (c[1])) * d
        else
          e = 0
          c[4] > c[0] and (e = 1)
          c[8] > c[3 * e + e] and (e = 2)
          f = a[e]
          l = a[f]
          d = Math.sqrt(c[3 * e + e] - (c[3 * f + f]) - (c[3 * l + l]) + 1)
          b[e] = 0.5 * d
          d = 0.5 / d
          b[3] = (c[3 * l + f] - (c[3 * f + l])) * d
          b[f] = (c[3 * f + e] + c[3 * e + f]) * d
          b[l] = (c[3 * l + e] + c[3 * e + l]) * d
        b

    a.str = (a) ->
      'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')'

    'undefined' != typeof b and (b.quat = a)
    return
  ) f
  return
) this

Gluu::initGL = (b) ->
  try
    gl = b.getContext('experimental-webgl',
      antialias: !1
      alpha: !1)
    gl.viewportWidth = b.width
    gl.viewportHeight = b.height
  catch f
  gl or alert('Could not initialise WebGL')
  return

Gluu::getShader = (b, f, c) ->
  d = new XMLHttpRequest
  if undefined != window.shadersCode
    if f = shadersCode[c][f]
      undefined == f

      return null
  else if d.open('GET', 'shaders/' + f + '.' + c, !1)
    d.send(null)
    f = d.responseText
    !f

    return null
  if 'fs' == c
    c = b.createShader(b.FRAGMENT_SHADER)
  else if 'vs' == c
    c = b.createShader(b.VERTEX_SHADER)
  else
    return null
  b.shaderSource c, f
  b.compileShader c
  if b.getShaderParameter(c, b.COMPILE_STATUS) then c else alert(b.getShaderInfoLog(c))
  null

Gluu::initLineShader = ->
  b = @getShader(gl, 'line', 'fs')
  f = @getShader(gl, 'line', 'vs')
  @lineShader = gl.createProgram()
  gl.attachShader @lineShader, f
  gl.attachShader @lineShader, b
  gl.linkProgram @lineShader
  gl.getProgramParameter(@lineShader, gl.LINK_STATUS) or alert('Could not initialise shaders')
  gl.useProgram @lineShader
  @lineShader.vertexPositionAttribute = gl.getAttribLocation(@lineShader, 'aVertexPosition')
  gl.enableVertexAttribArray @lineShader.vertexPositionAttribute
  @lineShader.textureCoordAttribute = gl.getAttribLocation(@lineShader, 'aTextureCoord')
  gl.enableVertexAttribArray @lineShader.textureCoordAttribute
  @lineShader.lightAttribute = gl.getAttribLocation(@lineShader, 'lightValue')
  gl.enableVertexAttribArray @lineShader.lightAttribute
  @lineShader.pMatrixUniform = gl.getUniformLocation(@lineShader, 'uPMatrix')
  @lineShader.mvMatrixUniform = gl.getUniformLocation(@lineShader, 'uMVMatrix')
  return

Gluu::initSelectionShader = ->
  b = @getShader(gl, 'selection', 'fs')
  f = @getShader(gl, 'selection', 'vs')
  @selectionShader = gl.createProgram()
  gl.attachShader @selectionShader, f
  gl.attachShader @selectionShader, b
  gl.linkProgram @selectionShader
  gl.getProgramParameter(@selectionShader, gl.LINK_STATUS) or alert('Could not initialise shaders')
  gl.useProgram @selectionShader
  @selectionShader.vertexPositionAttribute = gl.getAttribLocation(@selectionShader, 'aVertexPosition')
  gl.enableVertexAttribArray @selectionShader.vertexPositionAttribute
  @selectionShader.textureCoordAttribute = gl.getAttribLocation(@selectionShader, 'aTextureCoord')
  gl.enableVertexAttribArray @selectionShader.textureCoordAttribute
  @selectionShader.lightAttribute = gl.getAttribLocation(@selectionShader, 'lightValue')
  gl.enableVertexAttribArray @selectionShader.lightAttribute
  @selectionShader.pMatrixUniform = gl.getUniformLocation(@selectionShader, 'uPMatrix')
  @selectionShader.mvMatrixUniform = gl.getUniformLocation(@selectionShader, 'uMVMatrix')
  @selectionShader.msMatrixUniform = gl.getUniformLocation(@selectionShader, 'uMSMatrix')
  @selectionShader.samplerUniform = gl.getUniformLocation(@selectionShader, 'uSampler')
  return

Gluu::initStandardShader = (b) ->
  undefined != @standardShader and gl.deleteProgram(@standardShader)
  f = @getShader(gl, b, 'fs')
  c = @getShader(gl, b, 'vs')
  @standardShader = gl.createProgram()
  gl.attachShader @standardShader, c
  gl.attachShader @standardShader, f
  gl.linkProgram @standardShader
  gl.getProgramParameter(@standardShader, gl.LINK_STATUS) or alert('Could not initialise shaders')
  settings.worldShader = b
  gl.useProgram @standardShader
  @standardShader.vertexPositionAttribute = gl.getAttribLocation(@standardShader, 'aVertexPosition')
  gl.enableVertexAttribArray @standardShader.vertexPositionAttribute
  @standardShader.textureCoordAttribute = gl.getAttribLocation(@standardShader, 'aTextureCoord')
  gl.enableVertexAttribArray @standardShader.textureCoordAttribute
  @standardShader.lightAttribute = gl.getAttribLocation(@standardShader, 'lightValue')
  gl.enableVertexAttribArray @standardShader.lightAttribute
  @standardShader.lod = gl.getUniformLocation(@standardShader, 'lod')
  @standardShader.sun = gl.getUniformLocation(@standardShader, 'sun')
  @standardShader.brightness = gl.getUniformLocation(@standardShader, 'brightness')
  @standardShader.skyColor = gl.getUniformLocation(@standardShader, 'skyColor')
  @standardShader.pMatrixUniform = gl.getUniformLocation(@standardShader, 'uPMatrix')
  @standardShader.mvMatrixUniform = gl.getUniformLocation(@standardShader, 'uMVMatrix')
  @standardShader.msMatrixUniform = gl.getUniformLocation(@standardShader, 'uMSMatrix')
  @standardShader.samplerUniform = gl.getUniformLocation(@standardShader, 'uSampler')
  return

Gluu::setMatrixUniforms = ->
  gl.uniformMatrix4fv @standardShader.pMatrixUniform, !1, @pMatrix
  gl.uniformMatrix4fv @standardShader.mvMatrixUniform, !1, @mvMatrix
  gl.uniformMatrix4fv @standardShader.msMatrixUniform, !1, @objStrMatrix
  return

Gluu::mvPushMatrix = ->
  b = mat4.clone(@mvMatrix)
  @mvMatrixStack.push b
  return

Gluu::mvPopMatrix = ->
  if 0 == @mvMatrixStack.length
    throw 'Invalid popMatrix!'
  @mvMatrix = @mvMatrixStack.pop()
  return

Gluu::degToRad = (b) ->
  b * Math.PI / 180

(->
  s = undefined
  n = !0
  L = this
  K = 'undefined' != typeof Uint8Array and 'undefined' != typeof Uint16Array and 'undefined' != typeof Uint32Array

  b = (a) ->
    throw a
    return

  f = (a, b) ->
    c = a.split('.')
    d = L
    c[0] of d or !d.execScript or d.execScript('var ' + c[0])
    e = undefined
    e
    while c.length and (e = c.shift())
      if c.length or b == s then (d = if d[e] then d[e] else (d[e] = {})) else (d[e] = b)
    return

  c = (a, c) ->
    @index = if 'number' == typeof c then c else 0
    @i = 0
    @buffer = if a instanceof (if K then Uint8Array else Array) then a else new ((if K then Uint8Array else Array))(32768)
    2 * @buffer.length <= @index and b(Error('invalid index'))
    @buffer.length <= @index and @f()
    return

  d = (a) ->
    @buffer = new ((if K then Uint16Array else Array))(2 * a)
    @length = 0
    return

  e = (a) ->
    `var n`
    `var f`
    `var e`
    `var d`
    `var c`
    `var b`
    b = a.length
    c = 0
    d = Number.POSITIVE_INFINITY
    e = undefined
    f = undefined
    k = undefined
    l = undefined
    m = undefined
    n = undefined
    p = undefined
    q = undefined
    h = undefined
    while q < b
      a[q] > c and (c = a[q])
      a[q] < d and (d = a[q])
      ++q
    e = 1 << c
    f = new ((if K then Uint32Array else Array))(e)
    k = 1
    l = 0
    while k <= c
      q = 0
      while q < b
        if a[q] == k
          n = 0
          p = l
                    h = 0
          while h < k
            n = n << 1 | p & 1
            p >>= 1
            ++h
                    h = n
          while h < e
            f[h] = k << 16 | q
            h += m
          ++l
        ++q
      ++k
      l <<= 1
      m <<= 1
    [
      f
      c
      d
    ]

  m = (a, b) ->
    @h = N
    @w = 0
    @input = if K and a instanceof Array then new Uint8Array(a) else a
    @b = 0
    b and b.lazy and (@w = b.lazy)
    'number' == typeof b.compressionType and (@h = b.compressionType)
    b.outputBuffer and (@a = if K and b.outputBuffer instanceof Array then new Uint8Array(b.outputBuffer) else b.outputBuffer)
    'number' == typeof b.outputIndex and (@b = b.outputIndex)
    @a or (@a = new ((if K then Uint8Array else Array))(32768))
    return

  l = (a, b) ->
    @length = a
    @G = b
    return

  p = (a, c) ->
    `var d`
    `var p`
    `var m`
    `var l`
    `var f`
    `var e`
    e = undefined
    f = undefined
    k = undefined
    l = undefined
    m = undefined
    p = {}
    r = undefined
    t = undefined
    u = if K then new Uint16Array(2 * c.length) else []
    h = 0
    v = 0
    x = new ((if K then Uint32Array else Array))(286)
    w = new ((if K then Uint32Array else Array))(30)
    y = a.w
    A = undefined

    d = (a, c) ->
      `var l`
      `var k`
      `var f`
      `var e`
      e = a.G
      f = []
      g = 0
      k = undefined
      k = S[a.length]
      f[g++] = k & 65535
      f[g++] = k >> 16 & 255
      f[g++] = k >> 24
      l = undefined
      switch n
        when 1 === e
          l = [
            0
            e - 1
            0
          ]
        when 2 === e
          l = [
            1
            e - 2
            0
          ]
        when 3 === e
          l = [
            2
            e - 3
            0
          ]
        when 4 === e
          l = [
            3
            e - 4
            0
          ]
        when 6 >= e
          l = [
            4
            e - 5
            1
          ]
        when 8 >= e
          l = [
            5
            e - 7
            1
          ]
        when 12 >= e
          l = [
            6
            e - 9
            2
          ]
        when 16 >= e
          l = [
            7
            e - 13
            2
          ]
        when 24 >= e
          l = [
            8
            e - 17
            3
          ]
        when 32 >= e
          l = [
            9
            e - 25
            3
          ]
        when 48 >= e
          l = [
            10
            e - 33
            4
          ]
        when 64 >= e
          l = [
            11
            e - 49
            4
          ]
        when 96 >= e
          l = [
            12
            e - 65
            5
          ]
        when 128 >= e
          l = [
            13
            e - 97
            5
          ]
        when 192 >= e
          l = [
            14
            e - 129
            6
          ]
        when 256 >= e
          l = [
            15
            e - 193
            6
          ]
        when 384 >= e
          l = [
            16
            e - 257
            7
          ]
        when 512 >= e
          l = [
            17
            e - 385
            7
          ]
        when 768 >= e
          l = [
            18
            e - 513
            8
          ]
        when 1024 >= e
          l = [
            19
            e - 769
            8
          ]
        when 1536 >= e
          l = [
            20
            e - 1025
            9
          ]
        when 2048 >= e
          l = [
            21
            e - 1537
            9
          ]
        when 3072 >= e
          l = [
            22
            e - 2049
            10
          ]
        when 4096 >= e
          l = [
            23
            e - 3073
            10
          ]
        when 6144 >= e
          l = [
            24
            e - 4097
            11
          ]
        when 8192 >= e
          l = [
            25
            e - 6145
            11
          ]
        when 12288 >= e
          l = [
            26
            e - 8193
            12
          ]
        when 16384 >= e
          l = [
            27
            e - 12289
            12
          ]
        when 24576 >= e
          l = [
            28
            e - 16385
            13
          ]
        when 32768 >= e
          l = [
            29
            e - 24577
            13
          ]
        else
          b 'invalid distance'
      k = l
      f[g++] = k[0]
      f[g++] = k[1]
      f[g++] = k[2]
      e = 0
      while e < g
        u[h++] = f[e]
        ++e
      x[f[0]]++
      w[f[3]]++
      v = a.length + c - 1
      t = null
      return

    if !K
      k = 0
      while 285 >= k
        x[k++] = 0
      k = 0
      while 29 >= k
        w[k++] = 0
    x[256] = 1
    e = 0
    while e < f
      k = m = 0
      l = 3
      while k < l and e + k != f
        m = m << 8 | c[e + k]
        ++k
      p[m] == s and (p[m] = [])
      k = p[m]
      if !(0 < v--)
        while 0 < k.length and 32768 < e - (k[0])
          k.shift()
        if e + 3 >= f
          t and d(t, -1)
          k = 0
          l = f - e
          while k < l
            A = c[e + k]
            u[h++] = A
            ++x[A]
            ++k
          break
        if 0 < k.length
          r = q(c, e, k)
          if t
            if t.length < r.length
              A = c[e - 1]
              u[h++] = A
              ++x[A]
              d r, 0
            else
              d t, -1
          else
            if r.length < y
              t = r
            else
              d r, 0
        else
          if t
            d t, -1
          else
            A = c[e]
            u[h++] = A
            ++x[A]
      k.push e
      ++e
    u[h++] = 256
    x[256]++
    a.L = x
    a.K = w
    if K then u.subarray(0, h) else u

  q = (a, b, c) ->
    `var p`
    `var n`
    `var m`
    `var f`
    `var e`
    `var d`
    d = undefined
    e = undefined
    f = 0
    k = undefined
    m = undefined
    n = undefined
    p = a.length
    cont = false
    m = 0
    n = c.length
    while m < n
      d = c[n - m - 1]
      k = 3
      if 3 < f
        k = f
        while 3 < k
          if a[d + k - 1] != a[b + k - 1]
            cont = true
            break
          k--
        if cont
          cont = false
          k--
          continue
        k = f
      while 258 > k and b + k < p and a[d + k] == a[b + k]
        ++k
      k > f and e = d
      f = k
      if 258 == k
        break
      m++
    new l(f, b - e)

  x = (a, b) ->
    `var m`
    `var l`
    `var f`
    `var e`
    `var c`
    c = a.length
    e = new d(572)
    f = new ((if K then Uint8Array else Array))(c)
    k = undefined
    l = undefined
    m = undefined
    if !K
      l = 0
      while l < c
        f[l] = 0
        l++
    while l < c
      0 < a[l] and e.push(l, a[l])
      ++l
    c = Array(e.length / 2)
    k = new ((if K then Uint32Array else Array))(e.length / 2)
    if 1 == c.length
      return f[e.pop().index] = 1
      f

    l = 0
    while l < m
      c[l] = e.pop()
      k[l] = c[l].value
      ++l
    e = A(k, k.length, b)
    l = 0
    while l < m
      f[c[l].index] = e[l]
      ++l
    f

  A = (a, b, c) ->
    `var e`
    `var q`
    `var p`
    `var n`
    `var m`
    `var l`
    `var f`
    `var d`
    d = new ((if K then Uint16Array else Array))(c)
    f = new ((if K then Uint8Array else Array))(c)
    k = new ((if K then Uint8Array else Array))(b)
    l = Array(c)
    m = Array(c)
    n = Array(c)
    p = (1 << c) - b
    q = 1 << c - 1
    h = undefined
    r = undefined

    e = (a) ->
      `var c`
      c = m[a][n[a]]
      if c == b
        e(a + 1)
        e(a + 1)
      else
        --k[c]
      ++n[a]
      return
    d[c - 1] = b
    while h < c
      if p < q then (f[h] = 0) else f[h] = 1
      p -= q

      p <<= 1
      d[c - 2 - h] = (d[c - 1 - h] / 2 | 0) + b
      ++h
    d[0] = f[0]
    l[0] = Array(d[0])
    m[0] = Array(d[0])
    while h < c
      d[h] > 2 * d[h - 1] + f[h] and (d[h] = 2 * d[h - 1] + f[h])
      l[h] = Array(d[h])
      m[h] = Array(d[h])
      ++h
    while p < b
      k[p] = c
      ++p
    while q < d[c - 1]
      l[c - 1][q] = a[q]
      m[c - 1][q] = q
      ++q
    while p < c
      n[p] = 0
      ++p
    1 == f[c - 1] and --k[0]
    ++n[c - 1]
    while 0 <= h
      c = p = 0
      r = n[h + 1]
      q = 0
      while q < d[h]
        c = l[h + 1][r] + l[h + 1][r + 1]
        if c > a[p]
          l[h][q] = c
          m[h][q] = b
          r += 2
        else
          l[h][q] = a[p]
          m[h][q] = p
          ++p
        q++
      n[h] = 0
      1 == f[h] and e(h)
      --h
    k

  t = (a) ->
    `var l`
    `var f`
    `var e`
    `var d`
    `var c`
    `var b`
    b = new ((if K then Uint16Array else Array))(a.length)
    c = []
    d = []
    e = 0
    f = undefined
    k = undefined
    l = undefined
    f = 0
    while f < k
      c[a[f]] = (c[a[f]] | 0) + 1
      f++
    f = 1
    while f <= k
      d[f] = e
      e += c[f] | 0
      e <<= 1
      f++
    f = 0
    while f < k
      e = d[a[f]]
      d[a[f]] += 1
      c = b[f] = 0
      l = a[f]
      while c < l
        b[f] = b[f] << 1 | e & 1
        e >>>= 1
        c++
      f++
    b

  a = (a, c) ->
    @l = []
    @m = 32768
    @e = @g = @c = @q = 0
    @input = if K then new Uint8Array(a) else a
    @s = !1
    @n = V
    @B = !1
    if c or !(c = {})
      c.index and (@c = c.index)
      c.bufferSize and (@m = c.bufferSize)
      c.bufferType and (@n = c.bufferType)
      c.resize and (@B = c.resize)
    switch @n
      when Q
        @b = 32768
        @a = new ((if K then Uint8Array else Array))(32768 + @m + 258)
      when V
        @b = 0
        @a = new ((if K then Uint8Array else Array))(@m)
        @f = @J
        @t = @H
        @o = @I
      else
        b Error('invalid inflate mode')
    return

  B = (a, c) ->
    `var l`
    `var f`
    `var e`
    `var d`
    d = undefined
    e = undefined
    f = undefined
    k = undefined
    l = undefined
    while e < c
      l = f[k++]
      l == s and b(Error('input buffer is broken'))
      d |= l << e
      e += 8
    a.g = d >>> c
    a.e = e - c
    a.c = k
    d & (1 << c) - 1

  v = (a, b) ->
    `var m`
    `var l`
    `var f`
    `var e`
    `var d`
    `var c`
    c = undefined
    d = undefined
    e = undefined
    f = undefined
    k = undefined
    l = undefined
    m = undefined
    while d < l
      m = e[f++]
      if m == s
        break
      c |= m << d
      d += 8
    e = k[c & (1 << l) - 1]
    k = e >>> 16
    a.g = c >> k
    a.e = d - k
    a.c = f
    e & 65535

  C = (a) ->
    `var b`
    `var l`
    `var f`
    `var d`
    `var c`
    c = B(a, 5) + 257
    d = B(a, 5) + 1
    f = B(a, 4) + 4
    k = new ((if K then Uint8Array else Array))(J.length)
    l = undefined

    b = (a, c, d) ->
      `var k`
      `var f`
      `var e`
      e = undefined
      f = undefined
      h = undefined
      k = undefined
      while k < a
        switch e = v(this, c)
        e

          when 16
            h = 3 + B(this, 2)
            while h--
              d[k++] = f
          when 17
            h = 3 + B(this, 3)
            while h--
              d[k++] = 0
            f = 0
          when 18
            h = 11 + B(this, 7)
            while h--
              d[k++] = 0
            f = 0
          else
            f = d[k++] = e
      d

    while l < f
      k[J[l]] = B(a, 3)
      ++l
    f = e(k)
    k = new ((if K then Uint8Array else Array))(c)
    l = new ((if K then Uint8Array else Array))(d)
    a.o e(b.call(a, c, f, k)), e(b.call(a, d, f, l))
    return

  u = (a) ->
    `var f`
    `var e`
    `var d`
    `var c`
    `var b`
    if 'string' == typeof a
      a = a.split('')
      b = undefined
      c = undefined
      b = 0
      c = a.length
      while b < c
        a[b] = (a[b].charCodeAt(0) & 255) >>> 0
        b++
    b = 1
    c = 0
    d = undefined
    e = undefined
    f = undefined
    while 0 < d
      e = if 1024 < d then 1024 else d
      d -= e
      loop
        b += a[f++]
        c += b
        unless --e
          break
      b %= 65521
      c %= 65521
    (c << 16 | b) >>> 0

  w = (c, d) ->
    `var f`
    `var e`
    e = undefined
    f = undefined
    @input = c
    @c = 0
    if d or !(d = {})
      d.index and (@c = d.index)
      d.verify and (@M = d.verify)
    e = c[@c++]
    f = c[@c++]
    switch e & 15
      when W
        @method = W
      else
        b Error('unsupported compression method')
    0 != ((e << 8) + f) % 31 and b(Error('invalid fcheck flag:' + ((e << 8) + f) % 31))
    f & 32 and b(Error('fdict flag is not supported'))
    @A = new a(c,
      index: @c
      bufferSize: d.bufferSize
      bufferType: d.bufferType
      resize: d.resize)
    return

  F = (a, b) ->
    `var d`
    `var c`
    @input = a
    @a = new ((if K then Uint8Array else Array))(32768)
    @h = k.k
    c = {}
    d = undefined
    !b and (b = {}) or 'number' != typeof b.compressionType or (@h = b.compressionType)
    for d of b
      c[d] = b[d]
    c.outputBuffer = @a
    @z = new m(@input, c)
    return

  r = (a, b) ->
    `var e`
    `var d`
    `var c`
    c = undefined
    d = undefined
    e = undefined
    k = undefined
    if Object.keys
      c = Object.keys(b)
    else
      for d of c = []
      e = 0
      b

        c[e++] = d
    e = 0
    while e < k
      d = c[e]
      f(a + '.' + d, b[d])
      ++e
    return

  c::f = ->
    `var d`
    `var c`
    `var b`
    `var a`
    a = @buffer
    b = undefined
    c = a.length
    d = new ((if K then Uint8Array else Array))(c << 1)
    if K
      d.set a
    else
      b = 0
      while b < c
        d[b] = a[b]
        ++b
    @buffer = d

  c::d = (a, b, c) ->
    `var f`
    `var e`
    `var d`
    d = @buffer
    e = @index
    f = @i
    k = d[e]
    c and 1 < b and (a = if 8 < b then (M[a & 255] << 24 | M[a >>> 8 & 255] << 16 | M[a >>> 16 & 255] << 8 | M[a >>> 24 & 255]) >> 32 - b else M[a] >> 8 - b)
    if 8 > b + f
      k = k << b | a
      f += b
    else
      c = 0
      while c < b
        k = k << 1 | a >> b - c - 1 & 1
        8 == ++f and f = 0
        d[e++] = M[k]
        k = 0
        e == d.length and (d = @f())

        ++c
    d[e] = k
    @buffer = d
    @i = f
    @index = e
    return

  c::finish = ->
    `var c`
    `var b`
    `var a`
    a = @buffer
    b = @index
    c = undefined
    0 < @i and a[b] <<= 8 - (@i)
    a[b] = M[a[b]]
    b++
    if K then (c = a.subarray(0, b)) else a.length = b
    c = a
    c

  Y = new ((if K then Uint8Array else Array))(256)
  T = undefined
  y = undefined
  R = undefined
  U = undefined
  T = 0
  while 256 > T
        y = T
    R = y
    U = 7
    y = y >>> 1
    while y
      R <<= 1
      R |= y & 1
      --U
      y >>>= 1
    Y[T] = (R << U & 255) >>> 0
    ++T
  M = Y

  d::getParent = (a) ->
    2 * ((a - 2) / 4 | 0)

  d::push = (a, b) ->
    `var f`
    `var e`
    `var d`
    `var c`
    c = undefined
    d = undefined
    e = @buffer
    f = undefined
    c = @length
    e[@length++] = b
    while 0 < c
      if d = @getParent(c)
        e[c] > e[d]

        f = e[c]
        e[c] = e[d]
        e[d] = f
        f = e[c + 1]
        e[c + 1] = e[d + 1]
        e[d + 1] = f
        c = d
      else
        break
    @length

  d::pop = ->
    `var Y`
    `var f`
    `var e`
    `var d`
    `var c`
    `var b`
    `var a`
    a = undefined
    b = undefined
    c = @buffer
    d = undefined
    e = undefined
    f = undefined
    b = c[0]
    a = c[1]
    @length -= 2
    c[0] = c[@length]
    c[1] = c[@length + 1]
    loop
      e = 2 * f + 2
      if e >= @length
        break
      e + 2 < @length and c[e + 2] > c[e] and (e += 2)
      if c[e] > c[f]
        d = c[f]
        c[f] = c[e]
        c[e] = d
        d = c[f + 1]
        c[f + 1] = c[e + 1]
        c[e + 1] = d
      else
        break
      f = e
    {
      index: a
      value: b
      length: @length
    }

  N = 2
  Y =
    NONE: 0
    r: 1
    k: N
    N: 3
  P = []
  T = 0
  while 288 > T
    switch n
      when 143 >= T
        P.push [
          T + 48
          8
        ]
      when 255 >= T
        P.push [
          T - 144 + 400
          9
        ]
      when 279 >= T
        P.push [
          T - 256 + 0
          7
        ]
      when 287 >= T
        P.push [
          T - 280 + 192
          8
        ]
      else
        b 'invalid literal: ' + T
    T++

  m::j = ->
    `var F`
    `var C`
    `var r`
    `var m`
    `var B`
    `var A`
    `var y`
    `var w`
    `var v`
    `var u`
    `var r`
    `var q`
    `var q`
    `var m`
    `var l`
    `var f`
    `var e`
    `var d`
    `var a`
    a = undefined
    d = undefined
    e = undefined
    f = undefined
    k = @input
    switch @h
      when 0
        e = 0
        f = k.length
        while e < f
          d = if K then k.subarray(e, e + 65535) else k.slice(e, e + 65535)
          e += d.length
          l = e == f
          m = s
          q = m = s
          q = m = s
          r = @a
          u = @b
          if K
                        r = new Uint8Array(@a.buffer)
            while r.length <= u + d.length + 5
              r = new Uint8Array(r.length << 1)
            r.set @a
          m = if l then 1 else 0
          r[u++] = m | 0
          m = d.length
          q = ~m + 65536 & 65535
          r[u++] = m & 255
          r[u++] = m >>> 8 & 255
          r[u++] = q & 255
          r[u++] = q >>> 8 & 255
          if K
            r.set(d, u)
            u += d.length
            r = r.subarray(0, u)
          else
            m = 0
                        q = d.length
            while m < q
              r[u++] = d[m]
              ++m
            r.length = u
          @b = u
          @a = r
      when 1
        e = new c(if K then new Uint8Array(@a.buffer) else @a, @b)
        e.d 1, 1, n
        e.d 1, 2, n
        k = p(this, k)
        d = 0
        l = k.length
        while d < l
          if f = k[d]
            c::d.apply(e, P[f])
            256 < f

            e.d(k[++d], k[++d], n)
            e.d(k[++d], 5)
            e.d(k[++d], k[++d], n)
          else if 256 == f
            break
          d++
        @a = e.finish()
        @b = @a.length
      when N
        f = new c(if K then new Uint8Array(@a.buffer) else @a, @b)
        v = undefined
        w = undefined
        h = undefined
        y = [
          16
          17
          18
          0
          8
          7
          9
          6
          10
          5
          11
          4
          12
          3
          13
          2
          14
          1
          15
        ]
        A = undefined
        B = undefined
        m = Array(19)
        z = undefined
        r = N
        f.d 1, 1, n
        f.d r, 2, n
        k = p(this, k)
        q = x(@L, 15)
        A = t(q)
        r = x(@K, 7)
        u = t(r)
        v = 286
        while 257 < v and 0 == q[v - 1]
          v--
        w = 30
        while 1 < w and 0 == r[w - 1]
          w--
        C = v
        F = w
        a = new ((if K then Uint32Array else Array))(C + F)
        H = new ((if K then Uint32Array else Array))(316)
        I = undefined
        J = undefined
        B = new ((if K then Uint8Array else Array))(19)
        z = h = 0
        while z < C
          a[h++] = q[z]
          z++
        z = 0
        while z < F
          a[h++] = r[z]
          z++
        if !K
          z = 0
          F = B.length
          while z < F
            B[z] = 0
            ++z
        z = I = 0
        F = a.length
        while z < F
                    h = 1
          while z + h < F and a[z + h] == a[z]
            ++h
          C = h
          if 0 == a[z]
            if 3 > C
              while 0 < C--
                H[I++] = 0
                B[0]++
            else
              while 0 < C
                J = if 138 > C then C else 138
                J > C - 3 and J < C and (J = C - 3)
                if 10 >= J
                  H[I++] = 17
                  H[I++] = J - 3
                  B[17]++
                else
                  H[I++] = 18
                  H[I++] = J - 11
                  B[18]++

                  C -= J
          else if H[I++] = a[z]
            B[a[z]]++
            C--
            3 > C

            while 0 < C--
              H[I++] = a[z]
              B[a[z]]++
          else
            while 0 < C
              J = if 6 > C then C else 6
              J > C - 3 and J < C and (J = C - 3)
              H[I++] = 16
              H[I++] = J - 3
              B[16]++
              C -= J
          z += h
        a = if K then H.subarray(0, I) else H.slice(0, I)
        B = x(B, 7)
        z = 0
        while 19 > z
          m[z] = B[y[z]]
          z++
        h = 19
        while 4 < h and 0 == m[h - 1]
          h--
        y = t(B)
        f.d v - 257, 5, n
        f.d w - 1, 5, n
        f.d h - 4, 4, n
        z = 0
        while z < h
          f.d m[z], 3, n
          z++
        z = 0
        m = a.length
        while z < m
          if d = a[z]
            f.d(y[d], B[d], n)
            16 <= d

            z++
            switch d
              when 16
                l = 2
              when 17
                l = 3
              when 18
                l = 7
              else
                b 'invalid code: ' + d
            f.d a[z], l, n
          z++
        l = [
          A
          q
        ]
        u = [
          u
          r
        ]
        d = l[0]
        l = l[1]
        r = u[0]
        A = u[1]
        u = 0
        m = k.length
        while u < m
          if e = k[u]
            f.d(d[e], l[e], n)
            256 < e

            f.d(k[++u], k[++u], n)
            q = k[++u]
            f.d(r[q], A[q], n)
            f.d(k[++u], k[++u], n)
          else if 256 == e
            break
          ++u
        @a = f.finish()
        @b = @a.length
      else
        b 'invalid compression type'
    @a

  T = do ->
    `var a`
    `var e`
    `var d`
    `var c`
    c = []
    d = undefined
    e = undefined

    a = (c) ->
      switch n
        when 3 === c
          return [
            257
            c - 3
            0
          ]
        when 4 === c
          return [
            258
            c - 4
            0
          ]
        when 5 === c
          return [
            259
            c - 5
            0
          ]
        when 6 === c
          return [
            260
            c - 6
            0
          ]
        when 7 === c
          return [
            261
            c - 7
            0
          ]
        when 8 === c
          return [
            262
            c - 8
            0
          ]
        when 9 === c
          return [
            263
            c - 9
            0
          ]
        when 10 === c
          return [
            264
            c - 10
            0
          ]
        when 12 >= c
          return [
            265
            c - 11
            1
          ]
        when 14 >= c
          return [
            266
            c - 13
            1
          ]
        when 16 >= c
          return [
            267
            c - 15
            1
          ]
        when 18 >= c
          return [
            268
            c - 17
            1
          ]
        when 22 >= c
          return [
            269
            c - 19
            2
          ]
        when 26 >= c
          return [
            270
            c - 23
            2
          ]
        when 30 >= c
          return [
            271
            c - 27
            2
          ]
        when 34 >= c
          return [
            272
            c - 31
            2
          ]
        when 42 >= c
          return [
            273
            c - 35
            3
          ]
        when 50 >= c
          return [
            274
            c - 43
            3
          ]
        when 58 >= c
          return [
            275
            c - 51
            3
          ]
        when 66 >= c
          return [
            276
            c - 59
            3
          ]
        when 82 >= c
          return [
            277
            c - 67
            4
          ]
        when 98 >= c
          return [
            278
            c - 83
            4
          ]
        when 114 >= c
          return [
            279
            c - 99
            4
          ]
        when 130 >= c
          return [
            280
            c - 115
            4
          ]
        when 162 >= c
          return [
            281
            c - 131
            5
          ]
        when 194 >= c
          return [
            282
            c - 163
            5
          ]
        when 226 >= c
          return [
            283
            c - 195
            5
          ]
        when 257 >= c
          return [
            284
            c - 227
            5
          ]
        when 258 === c
          return [
            285
            c - 258
            0
          ]
        else
          b 'invalid length: ' + c
      return

    while 258 >= d
      e = a(d)
      c[d] = e[2] << 24 | e[1] << 16 | e[0]
      d++
    c
  S = if K then new Uint32Array(T) else T
  Q = 0
  V = 1
  T = Q
  y = V

  a::p = ->
    `var U`
    `var R`
    `var U`
    `var R`
    `var R`
    `var R`
    `var R`
    `var R`
    `var R`
    `var f`
    `var m`
    `var l`
    `var f`
    `var e`
    `var d`
    `var c`
    `var a`
    `var a`
    while !@s
      a = B(this, 3)
      a & 1 and (@s = n)
      a >>>= 1
      switch a
        when 0
          a = @input
          c = @c
          d = @a
          e = @b
          f = s
          k = s
          l = s
          m = d.length
          f = s
          @e = @g = 0
          f = a[c++]
          f == s and b(Error('invalid uncompressed block header: LEN (first byte)'))
          k = f
          f = a[c++]
          f == s and b(Error('invalid uncompressed block header: LEN (second byte)'))
          k |= f << 8
          f = a[c++]
          f == s and b(Error('invalid uncompressed block header: NLEN (first byte)'))
          l = f
          f = a[c++]
          f == s and b(Error('invalid uncompressed block header: NLEN (second byte)'))
          l |= f << 8
          k == ~l and b(Error('invalid uncompressed block header: length verify'))
          c + k > a.length and b(Error('input buffer is broken'))
          switch @n
            when Q
              while e + k > d.length
                f = m - e
                k -= f
                if K
                  d.set(a.subarray(c, c + f), e)
                  e += f
                  c += f
                else
                  while f--
                    d[e++] = a[c++]
                @b = e
                d = @f()
                e = @b
            when V
              while e + k > d.length
                d = @f(v: 2)
            else
              b Error('invalid inflate mode')
          if K
            d.set(a.subarray(c, c + k), e)
            e += k
            c += k
          else
            while k--
              d[e++] = a[c++]
          @c = c
          @b = e
          @a = d
        when 1
          @o $, aa
        when 2
          C this
        else
          b Error('unknown BTYPE: ' + a)
    @t()

  R = [
    16
    17
    18
    0
    8
    7
    9
    6
    10
    5
    11
    4
    12
    3
    13
    2
    14
    1
    15
  ]
  J = if K then new Uint16Array(R) else R
  R = [
    3
    4
    5
    6
    7
    8
    9
    10
    11
    13
    15
    17
    19
    23
    27
    31
    35
    43
    51
    59
    67
    83
    99
    115
    131
    163
    195
    227
    258
    258
    258
  ]
  Z = if K then new Uint16Array(R) else R
  R = [
    0
    0
    0
    0
    0
    0
    0
    0
    1
    1
    1
    1
    2
    2
    2
    2
    3
    3
    3
    3
    4
    4
    4
    4
    5
    5
    5
    5
    0
    0
    0
  ]
  I = if K then new Uint8Array(R) else R
  R = [
    1
    2
    3
    4
    5
    7
    9
    13
    17
    25
    33
    49
    65
    97
    129
    193
    257
    385
    513
    769
    1025
    1537
    2049
    3073
    4097
    6145
    8193
    12289
    16385
    24577
  ]
  H = if K then new Uint16Array(R) else R
  R = [
    0
    0
    0
    0
    1
    1
    2
    2
    3
    3
    4
    4
    5
    5
    6
    6
    7
    7
    8
    8
    9
    9
    10
    10
    11
    11
    12
    12
    13
    13
  ]
  X = if K then new Uint8Array(R) else R
  R = new ((if K then Uint8Array else Array))(288)
  z = undefined
  U = 0
  z = R.length
  while U < z
    R[U] = if 143 >= U then 8 else if 255 >= U then 9 else if 279 >= U then 7 else 8
    ++U
  $ = e(R)
  R = new ((if K then Uint8Array else Array))(30)
  U = 0
  z = R.length
  while U < z
    R[U] = 5
    ++U
  aa = e(R)

  a::o = (a, b) ->
    `var l`
    `var f`
    `var e`
    `var d`
    `var c`
    c = @a
    d = @b
    @u = a
    e = undefined
    f = undefined
    k = undefined
    l = undefined
    while 256 != (f = v(this, a))
      if 256 > f
        d >= e and @b = d
        c = @f()
        d = @b

        c[d++] = f
      else
        f -= 257
        l = Z[f]
        0 < I[f] and (l += B(this, I[f]))
        f = v(this, b)
        k = H[f]
        0 < X[f] and (k += B(this, X[f]))
        d >= e and @b = d
        c = @f()
        d = @b

        while l--
          c[d] = c[d++ - k]
    while 8 <= @e
      @e -= 8
      @c--
    @b = d
    return

  a::I = (a, b) ->
    `var l`
    `var f`
    `var e`
    `var d`
    `var c`
    c = @a
    d = @b
    @u = a
    e = undefined
    f = undefined
    k = undefined
    l = undefined
    while 256 != (f = v(this, a))
      if 256 > f
        d >= e and c = @f()
        e = c.length

        c[d++] = f
      else
        f -= 257
        l = Z[f]
        0 < I[f] and (l += B(this, I[f]))
        f = v(this, b)
        k = H[f]
        0 < X[f] and (k += B(this, X[f]))
        d + l > e and c = @f()
        e = c.length

        while l--
          c[d] = c[d++ - k]
    while 8 <= @e
      @e -= 8
      @c--
    @b = d
    return

  a::f = ->
    `var e`
    `var d`
    `var c`
    `var b`
    `var a`
    a = new ((if K then Uint8Array else Array))(@b - 32768)
    b = @b - 32768
    c = undefined
    d = undefined
    e = @a
    if K
      a.set e.subarray(32768, a.length)
    else
      c = 0
      d = a.length
      while c < d
        a[c] = e[c + 32768]
        ++c
    @l.push a
    @q += a.length
    if K
      e.set e.subarray(b, b + 32768)
    else
      c = 0
      while 32768 > c
        e[c] = e[b + c]
        ++c
    @b = 32768
    e

  a::J = (a) ->
    `var l`
    `var f`
    `var e`
    `var d`
    `var c`
    `var b`
    b = undefined
    c = @input.length / @c + 1 | 0
    d = undefined
    e = undefined
    f = undefined
    k = @input
    l = @a
    a and 'number' == typeof a.v and (c = a.v)
    'number' == typeof a.F and (c += a.F)
    if 2 > c
      d = (k.length - (@c)) / @u[2]
      f = d / 2 * 258 | 0
      e = if f < l.length then l.length + f else l.length << 1
    else
      e = l.length * c
    if K
      b = new Uint8Array(e)
      b.set(l)
    else
      (b = l)
    @a = b

  a::t = ->
    `var m`
    `var l`
    `var f`
    `var e`
    `var d`
    `var c`
    `var b`
    `var a`
    a = 0
    b = @a
    c = @l
    d = undefined
    e = new ((if K then Uint8Array else Array))(@q + @b - 32768)
    f = undefined
    k = undefined
    l = undefined
    m = undefined
    if 0 == c.length
      return if K then @a.subarray(32768, @b) else @a.slice(32768, @b)
    f = 0
    while f < k
      d = c[f]
      l = 0
      m = d.length
      while l < m
        e[a++] = d[l]
        ++l
      ++f
    f = 32768
    while f < k
      e[a++] = b[f]
      ++f
    @l = []
    @buffer = e

  a::H = ->
    `var b`
    `var a`
    a = undefined
    b = @b
    if K
      if @B
        a = new Uint8Array(b)
        a.set @a.subarray(0, b)
      else
        a = @a.subarray(0, b)
    else
      @a.length > b and (@a.length = b)
      a = @a
    @buffer = a

  w::p = ->
    `var d`
    `var c`
    `var a`
    a = @input
    c = undefined
    d = undefined
    c = @A.p()
    @c = @A.c
    @M and d = (a[@c++] << 24 | a[@c++] << 16 | a[@c++] << 8 | a[@c++]) >>> 0
    d != u(c) and b(Error('invalid adler-32 checksum'))
    c

  W = 8
  k = Y

  F::j = ->
    `var f`
    `var e`
    `var d`
    `var c`
    `var a`
    a = undefined
    c = undefined
    d = undefined
    e = undefined
    f = 0
    e = @a
    a = W
    switch a
      when W
        c = Math.LOG2E * Math.log(32768) - 8
      else
        b Error('invalid compression method')
    c = c << 4 | a
    e[f++] = c
    switch a
      when W
        switch @h
          when k.NONE
            d = 0
          when k.r
            d = 1
          when k.k
            d = 2
          else
            b Error('unsupported compression type')
      else
        b Error('invalid compression method')
    a = d << 6 | 0
    e[f++] = a | 31 - ((256 * c + a) % 31)
    a = u(@input)
    @z.b = f
    e = @z.j()
    f = e.length
    K and e = new Uint8Array(e.buffer)
    e.length <= f + 4 and @a = new Uint8Array(e.length + 4)
    @a.set(e)
    e = @a

    e = e.subarray(0, f + 4)
    e[f++] = a >> 24 & 255
    e[f++] = a >> 16 & 255
    e[f++] = a >> 8 & 255
    e[f++] = a & 255
    e

  f 'Zlib.Inflate', w
  f 'Zlib.Inflate.prototype.decompress', w::p
  r 'Zlib.Inflate.BufferType',
    ADAPTIVE: y
    BLOCK: T
  f 'Zlib.Deflate', F
  f 'Zlib.Deflate.compress', (a, b) ->
    new F(a, b).j()
  f 'Zlib.Deflate.prototype.compress', F::j
  r 'Zlib.Deflate.CompressionType',
    NONE: k.NONE
    FIXED: k.r
    DYNAMIC: k.k
  return
).call this
Readfile =
  readKuju: (b, f, c) ->
    d = !1
    undefined == c and (d = !0)
    e = new XMLHttpRequest
    e.open 'GET', b.toLowerCase(), d
    e.responseType = 'arraybuffer'
    d and
    (e.onload = (b) ->
      b = new Uint8Array(e.response)
      b = if 70 == b[7] then new (Zlib.Inflate)(b, index: 16).decompress() else b.subarray(16, b.length - 16)
      f.load b
      return
    )
    try
      e.send()
    catch m
      return -1
    if !d
      return b = new Uint8Array(e.response)
      if 70 == b[7] then new (Zlib.Inflate)(b, index: 16).decompress() else new Uint8Array(b.buffer.slice(16))

    return
  readRAW: (b, f, c) ->
    f = new XMLHttpRequest
    f.open 'GET', b, !1
    f.responseType = 'arraybuffer'
    try
      f.send()
    catch d
      return -1
    new Uint8Array(f.response)
  readTxt: (b, f, c) ->
    f = new XMLHttpRequest
    f.open 'GET', b, !1
    f.responseType = 'application/json'
    f.send()
    f.response
NBT =
  nextTag: (b) ->
    f = {}
    c = undefined
    f.type = b.data[b.offset++]
    if undefined == f.type
      return -1
    switch f.type
      when 0
        f.name = ''
      when 1
        f.name = NBT.getTagName(b, 0)
        f.value = b.data[b.offset++]
      when 2
        f.name = NBT.getTagName(b, 0)
        f.value = b.data[b.offset++] << 8 | b.data[b.offset++]
      when 3
        f.name = NBT.getTagName(b, 0)
        f.value = b.data[b.offset++] << 24 | b.data[b.offset++] << 16 | b.data[b.offset++] << 8 | b.data[b.offset++]
      when 4
        f.name = NBT.getTagName(b, 0)
        f.value = b.data[b.offset++] << 56 | b.data[b.offset++] << 48 | b.data[b.offset++] << 40 | b.data[b.offset++] << 32 | b.data[b.offset++] << 24 | b.data[b.offset++] << 16 | b.data[b.offset++] << 8 | b.data[b.offset++]
      when 5
        f.name = NBT.getTagName(b, 0)
        f.value = -999
        b.offset += 4
      when 6
        f.name = NBT.getTagName(b, 0)
        f.value = -999
        b.offset += 8
      when 7
        f.name = NBT.getTagName(b, 0)
        f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++]
        f.data = new Uint8Array(f.length)
        c = 0
        while c < f.length
          f.data[c] = b.data[b.offset++]
          c++
      when 8
        f.name = NBT.getTagName(b, 0)
        f.value = NBT.getTagName(b, 0)
      when 9
        f.name = NBT.getTagName(b, 0)
        f.tagId = b.data[b.offset++]
        f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++]
      when 10
        f.name = NBT.getTagName(b, 0)
      when 11
        f.name = NBT.getTagName(b, 0)
        f.length = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++]
        f.data = new Uint32Array(f.length)
        c = 0
        while c < f.length
          f.data[c] = 16777216 * b.data[b.offset++] + 65536 * b.data[b.offset++] + 256 * b.data[b.offset++] + b.data[b.offset++]
          c++
    f
  getTagName: (b) ->
    f = undefined
    c = undefined
    d = undefined
    f = ''
    c = 256 * b.data[b.offset++] + b.data[b.offset++]
    d = 0
    while d < c
      f += String.fromCharCode(b.data[b.offset++])
      d++
    f
  read9: (b, f, c) ->
    d = undefined
    e = undefined
    if 10 != b.tagId
      f = [
        0
        1
        2
        4
        8
        4
        8
        0
        0
        0
        0
        0
      ]
      e = 0
      while e < b.length * f[b.tagId]
        c.offset++
        e++
    else
      e = 0
      while e < b.length and -1 != (d = NBT.nextTag(c))
        0 == d.type and e++
        9 == d.type and NBT.read9(d, f, c)
    return
  write0Tag: (b) ->
    b.data[b.offset++] = 0
    return
  write1Tag: (b, f, c) ->
    b.data[b.offset++] = 1
    NBT.writeTagName b, f
    b.data[b.offset++] = c & 255
    return
  write3Tag: (b, f, c) ->
    b.data[b.offset++] = 3
    NBT.writeTagName b, f
    b.data[b.offset++] = c >> 24 & 255
    b.data[b.offset++] = c >> 16 & 255
    b.data[b.offset++] = c >> 8 & 255
    b.data[b.offset++] = c & 255
    return
  write7Tag: (b, f, c) ->
    b.data[b.offset++] = 7
    NBT.writeTagName b, f
    b.data[b.offset++] = c.length >> 24 & 255
    b.data[b.offset++] = c.length >> 16 & 255
    b.data[b.offset++] = c.length >> 8 & 255
    b.data[b.offset++] = c.length & 255
    f = 0
    while f < c.length
      b.data[b.offset++] = c[f]
      f++
    return
  write9Tag: (b, f, c, d) ->
    b.data[b.offset++] = 9
    NBT.writeTagName b, f
    b.data[b.offset++] = c
    b.data[b.offset++] = d >> 24 & 255
    b.data[b.offset++] = d >> 16 & 255
    b.data[b.offset++] = d >> 8 & 255
    b.data[b.offset++] = d & 255
    return
  write10Tag: (b, f) ->
    b.data[b.offset++] = 10
    NBT.writeTagName b, f
    return
  writeTagName: (b, f) ->
    c = f.length
    b.data[b.offset++] = Math.floor(c / 256)
    b.data[b.offset++] = c - Math.floor(c / 256)
    d = undefined
    d = 0
    while d < c
      b.data[b.offset++] = f.charCodeAt(d)
      d++
    f
Intersection3D = {}
Intersection3D.d = new Float32Array(3)
Intersection3D.e1 = new Float32Array(3)
Intersection3D.e2 = new Float32Array(3)
Intersection3D.h = new Float32Array(3)
Intersection3D.s = new Float32Array(3)
Intersection3D.q = new Float32Array(3)
Intersection3D.v0 = new Float32Array(3)
Intersection3D.v1 = new Float32Array(3)
Intersection3D.v2 = new Float32Array(3)
Intersection3D.p0 = new Float32Array(3)
Intersection3D.p1 = new Float32Array(3)
Intersection3D.p2 = new Float32Array(3)

Intersection3D.vector = (b, f, c) ->
  b[0] = f[0] - (c[0])
  b[1] = f[1] - (c[1])
  b[2] = f[2] - (c[2])
  return

Intersection3D.dot = (b, f) ->
  b[0] * f[0] + b[1] * f[1] + b[2] * f[2]

Intersection3D.cross = (b, f, c) ->
  b[0] = f[1] * c[2] - (f[2] * c[1])
  b[1] = f[2] * c[0] - (f[0] * c[2])
  b[2] = f[0] * c[1] - (f[1] * c[0])
  return

Intersection3D.shapeIntersectsShape = (b, f, c, d, e) ->
  m = undefined
  l = undefined
  p = undefined
  q = undefined
  x = undefined
  A = undefined
  t = undefined
  a = undefined
  B = undefined
  m = Intersection3D.v0
  l = Intersection3D.v1
  p = Intersection3D.v2
  q = Intersection3D.p0
  x = Intersection3D.p1
  A = Intersection3D.p2
  t = 0
  a = 0
  while a < b.length
        B = 0
    while B < f.length
      m[0] = b[a]
      m[1] = b[a + 1]
      m[2] = b[a + 2]
      l[0] = b[a + c]
      l[1] = b[a + 1 + c]
      l[2] = b[a + 2 + c]
      p[0] = b[a + 2 * c]
      p[1] = b[a + 1 + 2 * c]
      p[2] = b[a + 2 + 2 * c]
      q[0] = f[B] + e[0]
      q[1] = f[B + 1] + e[1]
      q[2] = f[B + 2] + e[2]
      x[0] = f[B + d] + e[0]
      x[1] = f[B + 1 + d] + e[1]
      x[2] = f[B + 2 + d] + e[2]
      A[0] = f[B + 2 * d] + e[0]
      A[1] = f[B + 1 + 2 * d] + e[1]
      A[2] = f[B + 2 + 2 * d] + e[2]
      t += Intersection3D.segmentIntersectsTriangle(q, x, m, l, p)
      t += Intersection3D.segmentIntersectsTriangle(q, A, m, l, p)
      t += Intersection3D.segmentIntersectsTriangle(x, A, m, l, p)
      t += Intersection3D.segmentIntersectsTriangle(m, l, q, x, A)
      t += Intersection3D.segmentIntersectsTriangle(m, p, q, x, A)
      t += Intersection3D.segmentIntersectsTriangle(l, p, q, x, A)
      B += 3 * d
    a += 3 * c
  t

Intersection3D.segmentIntersectsTriangle = (b, f, c, d, e) ->
  Intersection3D.d[0] = f[0] - (b[0])
  Intersection3D.d[1] = f[1] - (b[1])
  Intersection3D.d[2] = f[2] - (b[2])
  Intersection3D.vector Intersection3D.e1, d, c
  Intersection3D.vector Intersection3D.e2, e, c
  Intersection3D.cross Intersection3D.h, Intersection3D.d, Intersection3D.e2
  f = Intersection3D.e1[0] * Intersection3D.h[0] + Intersection3D.e1[1] * Intersection3D.h[1] + Intersection3D.e1[2] * Intersection3D.h[2]
  if -1e-5 < f and 1e-5 > f
    return 0
  f = 1 / f
  Intersection3D.vector Intersection3D.s, b, c
  b = f * (Intersection3D.s[0] * Intersection3D.h[0] + Intersection3D.s[1] * Intersection3D.h[1] + Intersection3D.s[2] * Intersection3D.h[2])
  if 0 > b or 1 < b
    return 0
  Intersection3D.cross Intersection3D.q, Intersection3D.s, Intersection3D.e1
  c = f * (Intersection3D.d[0] * Intersection3D.q[0] + Intersection3D.d[1] * Intersection3D.q[1] + Intersection3D.d[2] * Intersection3D.q[2])
  if 0 > c or 1 < b + c
    return 0
  b = f * (Intersection3D.e2[0] * Intersection3D.q[0] + Intersection3D.e2[1] * Intersection3D.q[1] + Intersection3D.e2[2] * Intersection3D.q[2])
  if 1e-5 < b and 1 >= b then 1 else 0

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
  if mcWorld.testCollisions() then @failing = 0
  @entity.pos[1] = @oldPos[1]
 else (@failing = 1)
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
    when 37, 65
      @moveL = !1
    when 38, 87
      @moveF = !1
    when 39, 68
      @moveR = !1
    when 40, 83
      @moveB = !1
  return

CameraPlayer::keyDown = (b, f) ->
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
      @entity.przesx = @entity.przesz = 20
  return

RegionLib::getChunkBlock = (b, f, c, d, e) ->
  b = 1e4 * b + f
  if undefined != @rchunk[b] then @rchunk[b].getBlock(c, d, e) else
    id: 0
    data: 0

RegionLib::getBlock = (b, f, c) ->
  `var m`
  d = Math.floor(b / 16)
  e = Math.floor(c / 16)
  m = 1e4 * d + e
  m = 1e4 * d + e
  if undefined != @rchunk[m] then b -= 16 * d
  0 > b and (b += 16)
  c -= 16 * e
  0 > c and (c += 16)
  @rchunk[m].getBlock(b, f, c)
 else
    id: 0
    data: 0

RegionLib::updateChunkBlock = (b, f, c, d, e, m, l) ->
  b = 1e4 * b + f
  undefined != @rchunk[b] and @rchunk[b].updateBlock(c, d, e, m, l)
  return

RegionLib::updateBlock = (b, f, c, d, e) ->
  m = Math.floor(b / 16)
  l = Math.floor(c / 16)
  p = 1e4 * m + l
  undefined != @rchunk[p] and b -= 16 * m
  0 > b and (b += 16)
  c -= 16 * l
  0 > c and (c += 16)
  @rchunk[p].updateBlock(Math.floor(b), Math.floor(f), Math.floor(c), d, e)
  return

RegionLib::setBlock = (b, f, c, d, e) ->
  m = Math.floor(b / 16)
  l = Math.floor(c / 16)
  p = 1e4 * m + l
  undefined != @rchunk[p] and b -= 16 * m
  0 > b and (b += 16)
  c -= 16 * l
  0 > c and (c += 16)
  @rchunk[p].setBlock(Math.floor(b), Math.floor(f), Math.floor(c), d, e)
  return

RegionLib::changeChunkBlockAdd = (b, f, c, d, e) ->
  b = 1e4 * b + f
  undefined != @rchunk[b] and @rchunk[b].changeAdd(c, d, e)
  return

RegionLib::updateChunks = ->
  b = (new Date).getTime()
  f = 0
  c = undefined
  for c of @rchunk
    undefined != @rchunk[c] and -1 != @rchunk[c] and -2 != @rchunk[c] and !0 == @rchunk[c].needsUpdate and @rchunk[c].update()
    f++
  c = (new Date).getTime()
  console.log 'update chunk ' + c - b + ' ' + f
  return

RegionLib::deleteBuffers = ->
  b = (new Date).getTime()
  f = 0
  c = undefined
  for c of @rchunk
    undefined != @rchunk[c] and -1 != @rchunk[c] and -2 != @rchunk[c] and !0 != @rchunk[c].changed and (1 == @rchunk[c].isInit or 1 == @rchunk[c].isInit1) and @rchunk[c].timestamp + 1e4 < b and @rchunk[c].deleteBuffers()
    @rchunk[c] = undefined
    f++
  c = (new Date).getTime()
  console.log 'delete buffers ' + c - b + ' ' + f
  return

RegionLib::render = ->
  `var c`
  `var v`
  `var c`
  `var d`
  `var v`
  `var f`
  if initTexture
    b = gluu.standardShader
    gl.useProgram b
    gl.viewport 0, 0, gl.viewportWidth, gl.viewportHeight
    gl.clearColor settings.skyColor[0], settings.skyColor[1], settings.skyColor[2], 1
    gl.clear gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT
    mat4.perspective gluu.pMatrix, camera.fovy, gl.viewportWidth / gl.viewportHeight, 0.1, 6e3
    f = camera.getMatrix()
    mat4.multiply gluu.pMatrix, gluu.pMatrix, f
    mat4.identity gluu.mvMatrix
    gl.uniformMatrix4fv b.pMatrixUniform, !1, gluu.pMatrix
    gl.uniformMatrix4fv b.mvMatrixUniform, !1, gluu.mvMatrix
    gl.uniform1f b.lod, settings.distanceLevel[1]
    gl.uniform1f b.sun, settings.sun
    gl.uniform1f b.brightness, settings.brightness
    gl.uniform4fv b.skyColor, settings.skyColor
    c = undefined
    d = undefined
    f = undefined
    e = undefined
    m = undefined
    l = undefined
    p = undefined
    q = undefined
    x = undefined
    A = undefined
    B = undefined
    c = 0
    d = 0
    f = 0
    e = [
      settings.distanceLevel[0]
      settings.distanceLevel[1]
      settings.distanceLevel[2]
      settings.distanceLevel[2]
    ]
    m = []
    l = 0
    p = 0
    q = 0
    x = camera.getPos()
    A = 0
    while 4 > A
      t = Math.floor(x[0] / 16)
      a = Math.floor(x[2] / 16)
      m[0] = 0
      m[1] = 0
            B = -1
      while B < e[A] * e[A] * 4
        if -1 != B and (m = spiralLoop(B))
          l = t + m[0]
          p = a + m[1]
          q = 1e4 * l + p
          -1 == @rchunk[q] or -2 == @rchunk[q]

          @rchunk[q].timestamp = lastTime
        else if c = x[0] - (16 * l + 8)
          d = x[2] - (16 * p + 8)
          f = Math.sqrt(c * c + d * d)
          !(f > 16 * e[A])

          if 64 < f
            v = camera.getTarget()
            v = [
              x[0] - (v[0])
              x[2] - (v[2])
            ]
            d = [
              -c
              -d
            ]
            c = v[0] * d[0] + v[1] * d[1]
            C = Math.sqrt(v[0] * v[0] + v[1] * v[1])
            v = Math.sqrt(d[0] * d[0] + d[1] * d[1])
            c = c / (C * v)
            if 0 < c
              B++
              continue
            c = Math.cos(camera.fovx / 1.5) + c
            v = Math.sqrt(2 * v * v * (1 - c))
            if 0 < c and 16 < v
              B++
              continue
          if undefined == @rchunk[q] then 1 < iLag and iLag -= 1
          @requestChunk(l, p)
 else @rchunk[q].timestamp = lastTime
          (62 <= x[1] or 160 > f) and @rchunk[q].render(A, b, 0)
          if 62 > x[1] and 96 > f then @rchunk[q].render(A, b, 1) else 64 > f and @rchunk[q].render(A, b, 1)
        B++
      A++
  return

RegionLib::renderSelection = ->
  `var f`
  if initTexture
    b = gluu.selectionShader
    gl.useProgram b
    gl.viewport 0, 0, gl.viewportWidth, gl.viewportHeight
    gl.clearColor 0, 0, 0, 0
    gl.clear gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT
    mat4.perspective gluu.pMatrix, camera.fovy, gl.viewportWidth / gl.viewportHeight, 0.1, 6e3
    f = camera.getMatrix()
    mat4.multiply gluu.pMatrix, gluu.pMatrix, f
    mat4.identity gluu.mvMatrix
    gl.uniformMatrix4fv b.pMatrixUniform, !1, gluu.pMatrix
    gl.uniformMatrix4fv b.mvMatrixUniform, !1, gluu.mvMatrix
    c = undefined
    d = undefined
    e = undefined
    m = undefined
    f = undefined
    l = undefined
    x = undefined
    c = []
    d = 0
    e = 0
    m = 0
    f = camera.getPos()
    l = 0
    while 4 > l
      p = Math.floor(f[0] / 16)
      q = Math.floor(f[2] / 16)
      c[0] = 0
      c[1] = 0
            x = -1
      while 24 > x
        -1 != x and (c = spiralLoop(x))
        d = p + c[0]
        e = q + c[1]
        m = 1e4 * d + e
        if -1 == @rchunk[m] or -2 == @rchunk[m] then (@rchunk[m].timestamp = lastTime) else if undefined == @rchunk[m] then 1 < iLag and iLag -= 1
        @requestChunk(d, e)
 else @rchunk[m].timestamp = lastTime
        @rchunk[m].render(l, b, 0)
        @rchunk[m].render(l, b, 1)

        x++
      l++
    q = new Uint8Array(4)
    gl.readPixels Math.floor(gl.viewportWidth / 2), Math.floor(gl.viewportHeight / 2), 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, q
    b = {}
    b.y = q[0]
    b.z = Math.floor(q[1] / 16)
    b.x = q[1] - (16 * b.z)
    p = Math.floor(q[2] / 10)
    b.side = q[2] - (10 * p)
    c = Math.floor(p / 5)
    d = p - (5 * c)
    p = Math.floor(f[0] / 16)
    q = Math.floor(f[2] / 16)
    f = p % 5
    0 > f and (f += 5)
    e = q % 5
    0 > e and (e += 5)
    c -= f
    d -= e
    2 < c and (c -= 5)
    -2 > c and (c += 5)
    2 < d and (d -= 5)
    -2 > d and (d += 5)
    b.chx = p + c
    b.chz = q + d
    b.rchx = c
    b.rchz = d
    return b
  return

RegionLib::testCollisions = ->
  `var d`
  `var p`
  b = camera.getPos()
  f = Math.floor(b[0] / 16)
  c = Math.floor(b[2] / 16)
  d = 0
  (new Date).getTime()
  e = undefined
  m = undefined
  e = f - 1
  while e < f + 2
        m = c - 1
    while m < c + 2
      if 16 * e - 2 < b[0] and 16 * e + 18 > b[0] and 16 * m - 2 < b[2] and 16 * m + 18 > b[2]
        l = 1e4 * e + m
        if -1 != @rchunk[l] and -2 != @rchunk[l]
          if undefined == @rchunk[l]
            return !0
          l = @rchunk[l].getBuffer([
            Math.floor(b[0] - (16 * e))
            Math.floor(b[1])
            Math.floor(b[2] - (16 * m))
          ])
          if !1 != l
            p = 0
            p = p + Intersection3D.shapeIntersectsShape(l, player.shape, 9, 5, b)
            d = d + p
      m++
    e++
  (new Date).getTime()
  if 0 < d then !0 else !1

RegionLib::save = ->
  b = undefined
  for b of @rchunk
    undefined != @rchunk[b] and -1 != @rchunk[b] and -2 != @rchunk[b] and @rchunk[b].changed and mcWorld.saveChunkToStorage(@rchunk[b].xPos, @rchunk[b].zPos)
    @rchunk[b].changed = !1
  return

RegionLib::saveChunkToStorage = (b, f) ->
  `var c`
  `var d`
  c = 1e4 * b + f
  if undefined != @rchunk[c] and -1 != @rchunk[c] and -2 != @rchunk[c]
    d = @rchunk[c].getNBT()
    d = new (Zlib.Deflate)(d).compress()
    e = new Uint8Array(d.length + 5)
    c = d.length + 1
    e[0] = c >> 24 & 255
    e[1] = c >> 16 & 255
    e[2] = c >> 8 & 255
    e[3] = c & 255
    e[4] = 2
    c = 0
    while c < d.length
      e[c + 5] = d[c]
      c++
    d = ab2str(e)
    window.localStorage.setItem @gameRoot + ' ' + @worldName + ' ' + b + ' ' + f, d
  return

RegionLib::getChunkFromStorage = (b, f) ->
  c = window.localStorage.getItem(@gameRoot + ' ' + @worldName + ' ' + b + ' ' + f)
  if undefined == c or null == c or '' == c
    return -1
  c = new Uint8Array(str2ab(c))
  RegionLib.loadChunk 0, c, !0

RegionLib::loadChunkFromStorage = (b, f, c) ->
  d = mcWorld.getChunkFromStorage(b, f)
  if -1 == d
    return -1
  if c
    return d
  @rchunk[1e4 * b + f] = d
  e = d = c = !1
  m = !1
  l = mcWorld.requestChunk(b + 1, f)
  undefined == l and (m = !0)
  -1 == l and (m = !0)
  -2 == l and (m = !0)
  p = mcWorld.requestChunk(b - 1, f)
  undefined == p and (e = !0)
  -1 == p and (e = !0)
  -2 == p and (e = !0)
  q = mcWorld.requestChunk(b, f + 1)
  undefined == q and (c = !0)
  -1 == q and (c = !0)
  -2 == q and (c = !0)
  b = mcWorld.requestChunk(b, f - 1)
  undefined == b and (d = !0)
  -1 == b and (d = !0)
  -2 == b and (d = !0)
  m or l.init2()
  e or p.init2()
  c or q.init2()
  d or b.init2()
  return

RegionLib::loadRegion = (b, f) ->
  `var c`
  @region[1e3 * b + f] = {}
  @region[1e3 * b + f].loaded = -2
  if undefined != window.threadsCode
    c = new Blob([ threadsCode.loadRegionThread ], type: 'application/javascript')
    c = new Worker(window.URL.createObjectURL(c))
  else
    c = new Worker('threads/loadRegionThread.js')
  c.regionLib = this
  c.region = @region[1e3 * b + f]

  c.onmessage = (b) ->
    @regionLib.regionLoaded b
    return

  c.onerror = (b) ->
    `var e`
    @region.loaded = -1
    return

  d = @gameRoot + '/' + @worldName + '/region/r.' + b + '.' + f + '.mca'
  e = ''
  if -1 == @gameRoot.indexOf(':')
    e = document.location.href.split(/\?|#/)[0]
    m = e.indexOf('index')
    -1 != m and (e = e.substring(0, m))
  console.log e + d
  c.postMessage
    x: b
    y: f
    name: e + d
  return

RegionLib::regionLoaded = (b) ->
  f = b.data.x
  c = b.data.y
  if 1 != b.data.loaded
    f = @region[1e3 * f + c]
    f.loaded = -1
  else if b = new Uint8Array(b.data.data)
    1e3 > b.length

    f = @region[1e3 * f + c]
    f.loaded = -1
  else
    f = @region[1e3 * f + c]
    f.regionData = b
    f.loaded = 0
    f.chunkPos = []
    f.chunkLen = []
    d = undefined
    d = c = 0
    while 4096 > c
      f.chunkPos[d] = 65536 * b[c] + 256 * b[c + 1] + b[c + 2]
      f.chunkLen[d] = b[c + 3]
      c += 4
      d++
  return

RegionLib::loadRegionFile = (b, f) ->
  try
    c = Readfile.readRAW(f)
  catch d
    console.log 'nie ma pliku'
    return
  b.regionData = c
  b.loaded = 0
  b.chunkPos = []
  b.chunkLen = []
  e = undefined
  m = undefined
  e = 0
  m = 0
  while 4096 > e
    b.chunkPos[m] = 65536 * c[e] + 256 * c[e + 1] + c[e + 2]
    b.chunkLen[m] = c[e + 3]
    e += 4
    m++
  return

RegionLib::requestChunk = (b, f) ->
  `var d`
  c = 1e4 * b + f
  if undefined != @rchunk[c]
    return @rchunk[c]
  if 1 != @localIChunk[c]
    d = -1
    @localIChunk[c] = 1
    if -1 != (d = @loadChunkFromStorage(b, f, !0))
      return @rchunk[c] = d
  d = Math.floor(b / 32)
  e = Math.floor(f / 32)
  undefined == @region[1e3 * d + e] and @loadRegion(d, e)
  if -1 == @region[1e3 * d + e].loaded
    return @rchunk[c] = -1
  if -2 == @region[1e3 * d + e].loaded
    return -2
  if 0 == @region[1e3 * d + e].loaded
    m = b % 32
    0 > m and (m += 32)
    l = f % 32
    0 > l and (l += 32)
    m += 32 * l
    if 0 < @region[1e3 * d + e].chunkPos[m]
      return console.log('chunk ' + c + ' : ' + @region[1e3 * d + e].chunkPos[m] + ' ' + @region[1e3 * d + e].chunkLen[m])
      @iChunk++
      @rchunk[c] = RegionLib.loadChunk(4096 * @region[1e3 * d + e].chunkPos[m], @region[1e3 * d + e].regionData, !0)
      @rchunk[c]

    @rchunk[c] = -1
  return

RegionLib.loadChunk = (b, f, c) ->
  d = {}
  e = new Chunk
  d.offset = 0
  try
    if c
      m = new (Zlib.Inflate)(f, index: b + 5)
      d.data = m.decompress()
    else
      d.data = f
  catch l
    return console.log('fail')
    -1

  f = 0
  while 2e3 > f and -1 != (b = NBT.nextTag(d))
    switch b.name
      when 'xPos'
        e.xPos = b.value
      when 'zPos'
        e.zPos = b.value
      when 'HeightMap'
        e.heightMap = b.data
      when 'Biomes'
        e.biomes = b.data
      when 'LightPopulated'
        e.lightPopulated = b.value
      when 'Sections'
        RegionLib.readSections b, e, d
                f++
        continue
    9 == b.type and NBT.read9(b, e, d)
    f++
  undefined == e.heightMap and e.initHeightMap()
  e

RegionLib.readSections = (b, f, c) ->
  d = undefined
  e = undefined
  m = undefined
  d = {}
  m = 0
  while m < b.length and -1 != (e = NBT.nextTag(c))
    switch 0 == e.type and undefined == d.add and (d.add = new Uint8Array(2048))
    f.section[d.y] = d
    d = {}
    m++

    e.name

      when 'Y'
        d.y = e.value
      when 'Blocks'
        d.blocks = e.data
      when 'SkyLight'
        d.skyLight = e.data
      when 'BlockLight'
        d.blockLight = e.data
      when 'Add'
        d.add = e.data
      when 'Data'
        d.data = e.data
  return

Chunk.stairsData = []
Chunk.stairsData['20xx2'] = '0001'
Chunk.stairsData['21x2x'] = '0010'
Chunk.stairsData['11x2x'] = '0010'
Chunk.stairsData['1x13x'] = '1000'
Chunk.stairsData['3x0x3'] = '0100'
Chunk.stairsData['3x13x'] = '1000'
Chunk.stairsData['00xx2'] = '0001'
Chunk.stairsData['0x0x3'] = '0100'
Chunk.stairsData['31xx3'] = '1110'
Chunk.stairsData['30x3x'] = '1101'
Chunk.stairsData['00x3x'] = '1101'
Chunk.stairsData['0x02x'] = '0111'
Chunk.stairsData['2x1x2'] = '1011'
Chunk.stairsData['2x02x'] = '0111'
Chunk.stairsData['11xx3'] = '1110'
Chunk.stairsData['1x1x2'] = '1011'
Chunk.stairsData['64xx6'] = '0001'
Chunk.stairsData['65x6x'] = '0010'
Chunk.stairsData['55x6x'] = '0010'
Chunk.stairsData['5x57x'] = '1000'
Chunk.stairsData['7x4x7'] = '0100'
Chunk.stairsData['7x57x'] = '1000'
Chunk.stairsData['44xx6'] = '0001'
Chunk.stairsData['4x4x7'] = '0100'
Chunk.stairsData['75xx7'] = '1110'
Chunk.stairsData['74x7x'] = '1101'
Chunk.stairsData['44x7x'] = '1101'
Chunk.stairsData['4x46x'] = '0111'
Chunk.stairsData['6x5x6'] = '1011'
Chunk.stairsData['6x46x'] = '0111'
Chunk.stairsData['55xx7'] = '1110'
Chunk.stairsData['5x5x6'] = '1011'
Chunk.cacheSlight = new Float32Array(83592)
Chunk.cacheBlight = new Float32Array(83592)
Chunk.cacheData = new Float32Array(83592)
Chunk.cacheId = new Float32Array(83592)
Chunk.cacheBlock = new Float32Array(5832)
Chunk.cacheHeightMap9 = new Uint8Array(2304)
Chunk.cacheHeightMap9hMax = new Uint8Array(2304)
Chunk.cacheSlight9 = new Uint8Array(594432)
Chunk.cacheBlight9 = new Uint8Array(594432)
Chunk.cacheId9 = new Int32Array(594432)

Chunk::initHeightMap = ->
  `var e`
  b = 0
  @heightMap = new Uint32Array(256)
  f = undefined
  c = undefined
  d = undefined
  e = undefined
  f = 0
  while 16 > f
        c = 0
    while 16 > c
            d = 255
      e = 15
      while 0 < d
        if 0 == (d - 15) % 16
          m = @section[(d - 15) / 16]
          e = 15
          if undefined == m
            d -= 15
            e = 16
                        d--
            e--
            continue
        b = 256 * e + 16 * f + c
        if 1 != block.lightTransmission[m.blocks[b]]
          @heightMap[16 * f + c] = d + 1
          break
        d--
        e--
      c++
    f++
  return

Chunk::refreshLight = (b, f) ->
  `var u`
  `var C`
  `var d`
  c = 0
  d = 0
  e = 0
  m = 0
  l = 0
  p = 0
  q = m = c = 0
  x = (new Date).getTime()
  f = f or !1
  @initHeightMap()
  if !@getCacheL9()
    return !1
  d = undefined
  A = undefined
  t = undefined
  a = undefined
  B = undefined
  v = undefined
  C = undefined
  u = undefined
  w = undefined
  F = undefined
  C = undefined
  r = undefined
  while 48 > w
    F = 0
    while 48 > F
      u = Chunk.cacheHeightMap9[48 * w + F]
      u > c and (c = u)
      u < v and (v = u)
            C = 0
      r = -1
      while 1 >= r
                q = -1
        while 1 >= q
          0 > w + r or 0 > F + q or 47 < w + r or 47 < F + q or u = Chunk.cacheHeightMap9[48 * (w + r) + F + q]
          u > C and (C = u)
          q++
        r++
      Chunk.cacheHeightMap9hMax[48 * w + F] = C + 1
      F++
    w++
  while 46 > w
    F = 2
    while 46 > F
            u = Chunk.cacheHeightMap9hMax[48 * w + F]
      while u >= Chunk.cacheHeightMap9[48 * w + F]
        q = 2304 * u + 48 * w + F
        t[q] = 15
        u--
            C = 15
      while 0 <= u
        q = 2304 * u + 48 * w + F
        C *= A[B[q]]
        t[q] = C
        0 < C and u < v and (v = u)
        u--
      F++
    w++
  while 48 > w
    u = 0
    while 255 > u
      if q = 2304 * u + 48 * w + 1
        0 < t[q] and u < v

        v = u
        break
      u++
    w++
  while 48 > w
    u = 0
    while 255 > u
      if q = 2304 * u + 48 * w + 46
        0 < t[q] and u < v

        v = u
        break
      u++
    w++
  while 48 > F
    u = 0
    while 255 > u
      if q = 2304 * u + 48 + F
        0 < t[q] and u < v

        v = u
        break
      u++
    F++
  while 48 > F
    u = 0
    while 255 > u
      if q = 2304 * u + 2208 + F
        0 < t[q] and u < v

        v = u
        break
      u++
    F++
  v--
  1 > v and (v = 1)
  if -1 == b then r = 0
  q = 256
 else r = b - 16
  0 > r and (r = 0)
  q = b + 16
  256 < q and (q = 256)
  C = 255
  e = 0
  while 46 > w
    F = 2
    while 46 > F
            u = r + 1
      while u < q - 1
        c = 2304 * u + 48 * w + F
        a[c] = d[B[c]]
        0 < a[c] and u < C and (C = u)
        0 < a[c] and u > e and (e = u)
        u++
      F++
    w++
  u = !1
  if -1 == b
    r = C - 16
    0 > r and (r = 0)
    q = e + 16
    256 < q and (q = 256)
    u = !0
  else
    c = 2304 * r
    while c < 2304 * q
      if 0 < a[c]
        u = !0
        break
      c++
  w = (new Date).getTime()
  console.log 'czas L0 ' + w - x
  x = (new Date).getTime()
  s = undefined
  if u
    s = 0
    while 14 > s
      w = 1
      while 47 > w
                F = 1
        while 47 > F
                    u = r
          while u < q
            c = 2304 * u + 48 * w + F
            C = a[c] - 1
            1 > C or d = c + 48
            e = c - 48
            m = c - 1
            l = c + 1
            p = c + 2304
            c -= 2304
            C * A[B[c]] > a[c] and (a[c] = C * A[B[c]])
            C * A[B[p]] > a[p] and (a[p] = C * A[B[p]])
            C * A[B[d]] > a[d] and (a[d] = C * A[B[d]])
            C * A[B[e]] > a[e] and (a[e] = C * A[B[e]])
            C * A[B[m]] > a[m] and (a[m] = C * A[B[m]])
            C * A[B[l]] > a[l] and (a[l] = C * A[B[l]])

            u++
          F++
        w++
      s++
  w = (new Date).getTime()
  console.log 'czas L1 ' + w - x
  x = (new Date).getTime()
  while 14 > s
    w = 1
    while 47 > w
            F = 1
      while 47 > F
                u = v
        while u < Chunk.cacheHeightMap9hMax[48 * w + F]
          c = 2304 * u + 48 * w + F
          C = t[c] - 1
          1 > C or d = c + 48
          e = c - 48
          m = c - 1
          l = c + 1
          p = c + 2304
          c -= 2304
          C * A[B[c]] > t[c] and (t[c] = C * A[B[c]])
          C * A[B[p]] > t[p] and (t[p] = C * A[B[p]])
          C * A[B[d]] > t[d] and (t[d] = C * A[B[d]])
          C * A[B[e]] > t[e] and (t[e] = C * A[B[e]])
          C * A[B[m]] > t[m] and (t[m] = C * A[B[m]])
          C * A[B[l]] > t[l] and (t[l] = C * A[B[l]])

          u++
        F++
      w++
    s++
  w = (new Date).getTime()
  console.log 'czas L2 ' + w - x
  x = (new Date).getTime()
  A = []
  while 1 >= r
    q = -1
    while 1 >= q
      if A[3 * (r + 1) + q + 1] = mcWorld.requestChunk(@xPos + r, @zPos + q)
        -2 == A[3 * (r + 1) + q + 1]

        return !1
      q++
    r++
  B = [
    0
    0
    0
    0
    0
    0
    0
    0
    0
  ]
  c = [
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
  ]
  C = [
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
  ]
  f and (B = [
    0
    1
    0
    1
    1
    1
    0
    1
    0
  ])
  while 2 >= d
    e = 0
    while 2 >= e
      if !f or 1 == d or 1 == e
        if v = A[3 * d + e]
          undefined != v and -1 != v

                    u = r = 0
          while 256 > r
            if 0 == r % 16
              n = v.section[r / 16]
              u = 0
              if undefined == n
                r += 15
                u = -1
                                r++
                u++
                continue
              f or c[r / 16] = jenkins_hash(n.skyLight)
              C[r / 16] = jenkins_hash(n.blockLight)
                        w = 0
            while 16 > w
                            F = 0
              while 16 > F
                m = (256 * u + 16 * w + F) / 2
                q = 2304 * r + 48 * (16 * e + w) + 16 * d + F
                n.skyLight[m] = t[q] + (t[q + 1] << 4)
                n.blockLight[m] = a[q] + (a[q + 1] << 4)
                F += 2
              w++
            r++
            u++
          u = 0
          if !f
            r = 0
            while 16 > r
              if undefined != v.section[r]
                u = jenkins_hash(v.section[r].skyLight)
                if c[r] != u
                  B[3 * d + e] = 1
                  break
                u = jenkins_hash(v.section[r].blockLight)
                if C[r] != u
                  B[3 * d + e] = 1
                  break
              r++
      e++
    d++
  w = (new Date).getTime()
  console.log 'czas L3 ' + w - x
  B

Chunk::getBiomeColor1 = (b, f, c) ->
  d = undefined
  e = undefined
  m = undefined
  l = undefined
  l = @cacheBiomes[18 * (f + 0) + b + 0]
  d = biomes[l].colorR[c]
  e = biomes[l].colorG[c]
  m = biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 0) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 0]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e / 4) + Math.floor(m / 4)

Chunk::getBiomeColor2 = (b, f, c) ->
  d = undefined
  e = undefined
  m = undefined
  l = undefined
  l = @cacheBiomes[18 * (f + 0) + b + 2]
  d = biomes[l].colorR[c]
  e = biomes[l].colorG[c]
  m = biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 0) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 2]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e / 4) + Math.floor(m / 4)

Chunk::getBiomeColor3 = (b, f, c) ->
  d = undefined
  e = undefined
  m = undefined
  l = undefined
  l = @cacheBiomes[18 * (f + 2) + b + 2]
  d = biomes[l].colorR[c]
  e = biomes[l].colorG[c]
  m = biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 2) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 2]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e / 4) + Math.floor(m / 4)

Chunk::getBiomeColor4 = (b, f, c) ->
  d = undefined
  e = undefined
  m = undefined
  l = undefined
  l = @cacheBiomes[18 * (f + 2) + b + 0]
  d = biomes[l].colorR[c]
  e = biomes[l].colorG[c]
  m = biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 2) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 0]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  d = 65536 * Math.floor(d / 4) + 256 * Math.floor(e / 4) + Math.floor(m / 4)

Chunk::getBiomeColor = (b, f, c) ->
  d = undefined
  e = undefined
  m = undefined
  l = undefined
  l = @cacheBiomes[18 * (f + 2) + b + 2]
  d = biomes[l].colorR[c]
  e = biomes[l].colorG[c]
  m = biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 0) + b + 0]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 2) + b + 0]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 0) + b + 2]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 2]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 1) + b + 0]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 2) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  l = @cacheBiomes[18 * (f + 0) + b + 1]
  d += biomes[l].colorR[c]
  e += biomes[l].colorG[c]
  m += biomes[l].colorB[c]
  d = 65536 * Math.floor(d / 8) + 256 * Math.floor(e / 8) + Math.floor(m / 8)

Chunk::getBlock = (b, f, c) ->
  if -1 == @isInit
    return {
      id: 0
      data: 0
    }
  d = Math.floor(f / 16)
  b = 256 * (f - (16 * d)) + 16 * c + b
  if undefined == @section[d]
    return {
      id: 0
      data: 0
    }
  f = @section[d].blocks[b]
  c = 0
  c = if 0 == b % 2 then @section[d].data[b / 2] & 15 else (@section[d].data[b / 2 - 0.5] & 240) >> 4
  {
    id: f
    data: c
  }

Chunk::getNBT = (b) ->
  b = offset: 0
  b.data = new Uint8Array(5e5)
  NBT.write10Tag b, ''
  NBT.write10Tag b, 'Level'
  NBT.write3Tag b, 'xPos', @xPos
  NBT.write3Tag b, 'zPos', @zPos
  NBT.write7Tag b, 'Biomes', @biomes
  NBT.write9Tag b, 'Sections', 10, @section.length
  f = undefined
  f = 0
  while f < @section.length
    NBT.write1Tag(b, 'Y', @section[f].y)
    NBT.write7Tag(b, 'Data', @section[f].data)
    NBT.write7Tag(b, 'SkyLight', @section[f].skyLight)
    NBT.write7Tag(b, 'BlockLight', @section[f].blockLight)
    NBT.write7Tag(b, 'Blocks', @section[f].blocks)
    NBT.write0Tag(b)
    f++
  NBT.write0Tag b
  NBT.write0Tag b
  new Uint8Array(b.data.buffer, 0, b.offset)

Chunk::newSection = (b) ->
  @section[b] = {}
  @section[b].y = b
  @section[b].blocks = new Uint32Array(4096)
  @section[b].skyLight = new Uint32Array(2048)
  f = undefined
  f = 0
  while 2048 > f
    @section[b].skyLight[f] = 255
    f++
  @section[b].blockLight = new Uint32Array(2048)
  @section[b].data = new Uint32Array(2048)
  @section[b].add = new Uint32Array(2048)
  return

Chunk::changeAdd = (b, f, c) ->
  if -1 != @isInit
    d = Math.floor(f / 16)
    b = 256 * (f - (16 * d)) + 16 * c + b
    f = 0
    c = b % 2
    undefined == @section[d] and @newSection(d)
    f = if 0 == c then @section[d].add[b / 2] & 15 else @section[d].add[b / 2 - 0.5] >> 4 & 15
    f++
    10 == f and (f = 0)
    if 0 == c then (@section[d].add[b / 2] = (@section[d].add[b / 2] & 240) + f) else (@section[d].add[b / 2 - 0.5] = (@section[d].add[b / 2 - 0.5] & 15) + (f << 4))
    @init2 0
    @init2 1
  return

Chunk::updateBlock = (b, f, c, d, e) ->
  `var q`
  `var m`
  if -1 != @isInit
    m = (new Date).getTime()
    @changed = !0
    m = Math.floor(f / 16)
    l = 256 * (f - (16 * m)) + 16 * c + b
    undefined == @section[m] and @newSection(m)
    @section[m].blocks[l] = d
    p = l % 2
    if 0 == p then @section[m].data[l / 2] = (@section[m].data[l / 2] & 240) + e
    @section[m].add[l / 2] &= 240
 else @section[m].data[l / 2 - 0.5] = (@section[m].data[l / 2 - 0.5] & 15) + (e << 4)
    @section[m].add[l / 2 - 0.5] &= 15
    q = 0
    if 0 == block[d].type or 2 == block[d].type or 3 == block[d].type or 4 == block[d].type
      q = @getSunLightValue(b, f + 1, c)
      x = 0
      d = -1
      while 1 >= d
                e = -1
        while 1 >= e
          0 != d and 0 != e or 0 > b + d or 15 < b + d or 0 > c + e or 15 < c + e or x = @getSunLightValue(b + d, f, c + e)
          x - 1 > q and (q = x - 1)
          e++
        d++
    if 0 == p then (@section[m].skyLight[l / 2] = (@section[m].skyLight[l / 2] & 240) + q) else (@section[m].skyLight[l / 2 - 0.5] = (@section[m].skyLight[l / 2 - 0.5] & 15) + (q << 4))
    f = @refreshLight(f)
    f[4] = 1
    0 == c and (f[3] = 1)
    15 == c and (f[5] = 1)
    0 == b and (f[1] = 1)
    15 == b and (f[7] = 1)
    m = (new Date).getTime()
    d = -1
    while 1 >= d
            e = -1
      while 1 >= e
        0 != f[3 * (d + 1) + e + 1] and b = mcWorld.requestChunk(@xPos + d, @zPos + e)
        undefined != b and -1 != b and -2 != b and b.changed = !0
        b.init2(0)
        b.init2(1)

        e++
      d++
    b = (new Date).getTime()
    console.log 'czas chunk ' + b - m
  return

Chunk::update = ->
  if -1 != @isInit
    b = @refreshLight(-1)
    b[4] = 1
    f = undefined
    c = undefined
    d = undefined
    e = undefined
    f = (new Date).getTime()
    d = -1
    while 1 >= d
            e = -1
      while 1 >= e
        0 != b[3 * (d + 1) + e + 1] and c = mcWorld.requestChunk(@xPos + d, @zPos + e)
        undefined != c and -1 != c and -2 != c and c.changed = !0
        c.init2(0)
        c.init2(1)

        e++
      d++
    @needsUpdate = !1
    b = (new Date).getTime()
    console.log 'czas chunk ' + b - f
  return

Chunk::setBlock = (b, f, c, d, e) ->
  if -1 != @isInit
    @changed = !0
    m = Math.floor(f / 16)
    l = 256 * (f - (16 * m)) + 16 * c + b
    undefined == @section[m] and @newSection(m)
    @section[m].blocks[l] = d
    p = l % 2
    if 0 == p then @section[m].data[l / 2] = (@section[m].data[l / 2] & 240) + e
    @section[m].add[l / 2] &= 240
 else @section[m].data[l / 2 - 0.5] = (@section[m].data[l / 2 - 0.5] & 15) + (e << 4)
    @section[m].add[l / 2 - 0.5] &= 15
    e = 0
    if 0 == block[d].type or 2 == block[d].type or 3 == block[d].type or 4 == block[d].type
      e = @getSunLightValue(b, f + 1, c)
      d = 0
      q = undefined
      x = undefined
      q = -1
      while 1 >= q
                x = -1
        while 1 >= x
          0 != q and 0 != x or 0 > b + q or 15 < b + q or 0 > c + x or 15 < c + x or d = @getSunLightValue(b + q, f, c + x)
          d - 1 > e and (e = d - 1)
          x++
        q++
    if 0 == p then (@section[m].skyLight[l / 2] = (@section[m].skyLight[l / 2] & 240) + e) else (@section[m].skyLight[l / 2 - 0.5] = (@section[m].skyLight[l / 2 - 0.5] & 15) + (e << 4))
    @needsUpdate = !0
  return

Chunk::getSunLightValue = (b, f, c) ->
  d = Math.floor(f / 16)
  f -= 16 * d
  undefined == @section[d] and @newSection(d)
  b = 256 * f + 16 * c + b
  if 16 > d then (if 0 == b % 2 then @section[d].skyLight[b / 2] & 15 else @section[d].skyLight[b / 2 - 0.5] >> 4 & 15) else 16

Chunk::render = (b, f, c) ->
  if @visible and (0 != c or -1 != @isInit) and (1 != c or -1 != @isInit1)
    if 0 == c and 0 == @isInit
      if 1 < iLag
        if iLag -= 1
          !@init2(0, !0)

          return
      else
        return
    if 1 == c and 0 == @isInit1
      if 1 < iLag
        if iLag -= 1
          !@init2(1, !0)

          return
      else
        return
    gl.bindTexture gl.TEXTURE_2D, blockTexture
    undefined != @vbo[c] and undefined != @vbo[c][b] and gl.bindBuffer(gl.ARRAY_BUFFER, @vbo[c][b])
    gl.vertexAttribPointer(f.vertexPositionAttribute, 3, gl.FLOAT, !1, 36, 0)
    gl.vertexAttribPointer(f.textureCoordAttribute, 2, gl.FLOAT, !1, 36, 12)
    gl.vertexAttribPointer(f.lightAttribute, 4, gl.FLOAT, !1, 36, 20)
    gl.drawArrays(gl.TRIANGLES, 0, @ivbo[c][b] / 9)
  return

Chunk::deleteBuffers = ->
  @isInit1 = @isInit = 0
  undefined != @vbo and undefined != @vbo[0] and @vbo[0].forEach((b) ->
    gl.deleteBuffer b
    return
  )
  @ivbo[0].forEach((b) ->
    gpuMem -= b
    return
  )

  undefined != @vbo[1] and @vbo[1].forEach((b) ->
    gl.deleteBuffer b
    return
  )
  @ivbo[1].forEach((b) ->
    gpuMem -= b
    return
  )

  return

Chunk::getCache = (b, f) ->
  `var n`
  c = 0
  d = 0
  e = 0
  @cacheBiomes = new Float32Array(324)
  @cacheHeightMap = new Int32Array(324)
  m = Chunk.cacheSlight
  l = Chunk.cacheBlight
  p = Chunk.cacheData
  q = Chunk.cacheId
  x = d = !1
  A = !1
  t = !1
  a = mcWorld.requestChunk(@xPos + 1, @zPos)
  undefined == a and (t = !0)
  -1 == a and (t = !0)
  if -2 == a
    return !1
  B = mcWorld.requestChunk(@xPos - 1, @zPos)
  undefined == B and (A = !0)
  -1 == B and (A = !0)
  if -2 == B
    return !1
  v = mcWorld.requestChunk(@xPos, @zPos + 1)
  undefined == v and (d = !0)
  -1 == v and (d = !0)
  if -2 == v
    return !1
  C = mcWorld.requestChunk(@xPos, @zPos - 1)
  undefined == C and (x = !0)
  -1 == C and (x = !0)
  if -2 == C
    return !1
  u = undefined
  w = undefined
  u = 0
  while 16 > u
        w = 0
    while 16 > w
      e = 0 + 18 * (u + 1) + w + 1
      q[e] = 1
      m[e] = 0
      l[e] = 0
      e = 83268 + 18 * (u + 1) + w + 1
      q[e] = 0
      m[e] = 15
      l[e] = 0
      w++
    u++
  F = b - 1
  0 > F and (F = 0)
  r = f + 1
  256 < r and (r = 256)
  s = undefined
  n = undefined
  s = F
  n = 0
  while s < r
        w = 0
    while 18 > w
      e = 324 * (s + 1) + 0 + w
      q[e] = 1
      e = 324 * (s + 1) + 306 + w
      q[e] = 1
      w++
        u = 0
    while 18 > u
      e = 324 * (s + 1) + 18 * u + 0
      q[e] = 1
      e = 324 * (s + 1) + 18 * u + 17
      q[e] = 1
      u++
    s++
    n++
  n = 0
  while 16 > n
        u = 0
    while 16 > u
      @cacheBiomes[18 * (n + 1) + u + 1] = @biomes[16 * n + u]
      @cacheHeightMap[18 * (n + 1) + u + 1] = @heightMap[16 * n + u]
      u++
    n++
  n = 0
  while 16 > n
    @cacheBiomes[18 * (n + 1) + 0] = @cacheBiomes[18 * (n + 1) + 1]
    @cacheHeightMap[18 * (n + 1) + 0] = @cacheHeightMap[18 * (n + 1) + 1]
    @cacheBiomes[18 * (n + 1) + 17] = @cacheBiomes[18 * (n + 1) + 16]
    @cacheHeightMap[18 * (n + 1) + 17] = @cacheHeightMap[18 * (n + 1) + 16]
    @cacheBiomes[306 + n + 1] = @cacheBiomes[288 + n + 1]
    @cacheHeightMap[306 + n + 1] = @cacheHeightMap[288 + n + 1]
    @cacheBiomes[0 + n + 1] = @cacheBiomes[18 + n + 1]
    @cacheHeightMap[0 + n + 1] = @cacheHeightMap[18 + n + 1]
    n++
  if !d
    s = F
    n = 0
    while s < r
      if 0 == s % 16
        L = v.section[s / 16]
        n = 0
        if undefined == L
                    n = s
          while n < s + 15
                        w = 0
            while 16 > w
              e = 324 * (n + 1) + 306 + w + 1
              q[e] = 0
              m[e] = 15
              l[e] = 0
              w++
            n++
          s += 15
          n = -1
                    w++
          continue
            w = 0
      while 16 > w
        d = 256 * n + 0 + w
        e = 324 * (s + 1) + 306 + w + 1
        q[e] = L.blocks[d]
        c = d % 2
        m[e] = L.skyLight[d / 2 - (c / 2)] >> 4 * c & 15
        l[e] = L.blockLight[d / 2 - (c / 2)] >> 4 * c & 15
        p[e] = L.data[d / 2 - (c / 2)] >> 4 * c & 15 & block[L.blocks[d]].mask
        w++
      s++
      n++
    n = 0
    while 16 > n
      @cacheBiomes[306 + n + 1] = v.biomes[0 + n]
      @cacheHeightMap[306 + n + 1] = v.heightMap[0 + n]
      n++
  if !x
    s = F
    n = 0
    while s < r
      if 0 == s % 16 and L = C.section[s / 16]
        n = 0
        undefined == L

                n = s
        while n < s + 15
                    w = 0
          while 16 > w
            e = 324 * (n + 1) + 0 + w + 1
            q[e] = 0
            m[e] = 15
            l[e] = 0
            w++
          n++
        s += 15
        n = -1
                w++
        continue
            w = 0
      while 16 > w
        d = 256 * n + 240 + w
        e = 324 * (s + 1) + 0 + w + 1
        q[e] = L.blocks[d]
        c = d % 2
        m[e] = L.skyLight[d / 2 - (c / 2)] >> 4 * c & 15
        l[e] = L.blockLight[d / 2 - (c / 2)] >> 4 * c & 15
        p[e] = L.data[d / 2 - (c / 2)] >> 4 * c & 15 & block[L.blocks[d]].mask
        w++
      s++
      n++
    n = 0
    while 16 > n
      @cacheBiomes[0 + n + 1] = C.biomes[240 + n]
      @cacheHeightMap[0 + n + 1] = C.heightMap[240 + n]
      n++
  if !A
    s = F
    n = 0
    while s < r
      if 0 == s % 16 and L = B.section[s / 16]
        n = 0
        undefined == L

                n = s
        while n < s + 15
                    u = 0
          while 16 > u
            e = 324 * (n + 1) + 18 * (u + 1) + 0
            q[e] = 0
            m[e] = 15
            l[e] = 0
            u++
          n++
        s += 15
        n = -1
                u++
        continue
            u = 0
      while 16 > u
        d = 256 * n + 16 * u + 15
        e = 324 * (s + 1) + 18 * (u + 1) + 0
        q[e] = L.blocks[d]
        c = d % 2
        m[e] = L.skyLight[d / 2 - (c / 2)] >> 4 * c & 15
        l[e] = L.blockLight[d / 2 - (c / 2)] >> 4 * c & 15
        p[e] = L.data[d / 2 - (c / 2)] >> 4 * c & 15 & block[L.blocks[d]].mask
        u++
      s++
      n++
    n = 0
    while 16 > n
      @cacheBiomes[18 * (n + 1) + 0] = B.biomes[16 * n + 15]
      @cacheHeightMap[18 * (n + 1) + 0] = B.heightMap[16 * n + 15]
      n++
  if !t
    s = F
    n = 0
    while s < r
      if 0 == s % 16 and L = a.section[s / 16]
        n = 0
        undefined == L

                n = s
        while n < s + 15
                    u = 0
          while 16 > u
            e = 324 * (n + 1) + 18 * (u + 1) + 17
            q[e] = 0
            m[e] = 15
            l[e] = 0
            u++
          n++
        s += 15
        n = -1
                u++
        continue
            u = 0
      while 16 > u
        d = 256 * n + 16 * u + 0
        e = 324 * (s + 1) + 18 * (u + 1) + 17
        q[e] = L.blocks[d]
        c = d % 2
        m[e] = L.skyLight[d / 2 - (c / 2)] >> 4 * c & 15
        l[e] = L.blockLight[d / 2 - (c / 2)] >> 4 * c & 15
        p[e] = L.data[d / 2 - (c / 2)] >> 4 * c & 15 & block[L.blocks[d]].mask
        u++
      s++
      n++
    n = 0
    while 16 > n
      @cacheBiomes[18 * (n + 1) + 17] = a.biomes[16 * n + 0]
      @cacheHeightMap[18 * (n + 1) + 17] = a.heightMap[16 * n + 0]
      n++
  s = F
  while s < r
    if 0 == s % 16 and L = @section[s / 16]
      n = 0
      undefined == L

      u = 0
      while 16 > u
                w = 0
        while 16 > w
          e = 324 * (s + 1) + 18 * (u + 1) + w + 1
          q[e] = 0
          m[e] = 15
          l[e] = 0
          e = 324 * (s + 16) + 18 * (u + 1) + w + 1
          q[e] = 0
          m[e] = 15
          l[e] = 0
          w++
        u++
      q[324 * (s + 2) + 19] = -1
      s += 15
      n = -1
      w++
      continue
    u = 0
    while 16 > u
            w = 0
      while 16 > w
        d = 256 * n + 16 * u + w
        e = 324 * (s + 1) + 18 * (u + 1) + w + 1
        q[e] = L.blocks[d]
        q[e + 1] = L.blocks[d + 1]
        x = L.data[d / 2]
        p[e] = x & 15 & block[L.blocks[d]].mask
        p[e + 1] = x >> 4 & 15 & block[L.blocks[d + 1]].mask
        x = L.skyLight[d / 2]
        m[e] = x & 15
        m[e + 1] = x >> 4 & 15
        x = L.blockLight[d / 2]
        l[e] = x & 15
        l[e + 1] = x >> 4 & 15
        w += 2
      u++
    s++
    n++
  while s < r
    m[324 * (s + 1) + 0] = Math.floor((m[324 * (s + 1) + 18] + m[324 * (s + 1) + 1]) / 2)
    m[324 * (s + 1) + 306] = Math.floor((m[324 * (s + 1) + 288] + m[324 * (s + 1) + 307]) / 2)
    m[324 * (s + 1) + 17] = Math.floor((m[324 * (s + 1) + 35] + m[324 * (s + 1) + 16]) / 2)
    m[324 * (s + 1) + 323] = Math.floor((m[324 * (s + 1) + 305] + m[324 * (s + 1) + 322]) / 2)
    l[324 * (s + 1) + 0] = Math.floor((l[324 * (s + 1) + 18] + l[324 * (s + 1) + 1]) / 2)
    l[324 * (s + 1) + 306] = Math.floor((l[324 * (s + 1) + 288] + l[324 * (s + 1) + 307]) / 2)
    l[324 * (s + 1) + 17] = Math.floor((l[324 * (s + 1) + 35] + l[324 * (s + 1) + 16]) / 2)
    l[324 * (s + 1) + 323] = Math.floor((l[324 * (s + 1) + 305] + l[324 * (s + 1) + 322]) / 2)
    s++
  !0

Chunk::getCacheL9 = ->
  `var a`
  `var p`
  b = undefined
  f = undefined
  c = undefined
  d = undefined
  e = undefined
  m = undefined
  l = undefined
  b = 0
  f = 0
  c = Chunk.cacheSlight9
  d = Chunk.cacheBlight9
  e = Chunk.cacheId9
  m = []
  l = -1
  while 1 >= l
        b = -1
    while 1 >= b
      if m[3 * (l + 1) + b + 1] = mcWorld.requestChunk(@xPos + l, @zPos + b)
        -2 == m[3 * (l + 1) + b + 1]

        return !1
      b++
    l++
  p = undefined
  q = undefined
  p = 0
  while 48 > p
        q = 0
    while 48 > q
      f = 48 * p + q
      e[f] = 1
      c[f] = 0
      d[f] = 0
      f = 592128 + 48 * p + q
      e[f] = 0
      c[f] = 15
      d[f] = 0
      f = 589824 + 48 * p + q
      e[f] = 0
      c[f] = 15
      d[f] = 0
      q++
    p++
  x = undefined
  A = undefined
  t = undefined
  a = undefined
  v = undefined
  p = undefined
  while 2 >= A
    t = 0
    while 2 >= t
      if x = m[3 * A + t]
        undefined != x and -1 != x

                p = 0
        while 16 > p
                    q = 0
          while 16 > q
            Chunk.cacheHeightMap9[48 * (16 * t + p) + 16 * A + q] = x.heightMap[16 * p + q]
            q++
          p++
                a = l = 0
        while 256 > l
          if 0 == l % 16
            B = x.section[l / 16]
            a = 0
            if undefined == B
                            p = 0
              while 16 > p
                                q = 0
                while 16 > q
                  f = 2304 * l + 48 * (16 * t + p) + 16 * A + q
                  e[f] = 0
                  c[f] = 0
                  d[f] = 0
                  f = 2304 * (l + 15) + 48 * (16 * t + p) + 16 * A + q
                  e[f] = 0
                  c[f] = 0
                  d[f] = 0
                  q++
                p++
              l += 15
              a = -1
                            q++
              continue
                    v = 0
          p = 0
          while 16 > p
                        q = 0
            while 16 > q
              b = 256 * a + 16 * p + q
              f = 2304 * l + 48 * (16 * t + p) + 16 * A + q
              e[f] = B.blocks[b]
              e[f + 1] = B.blocks[b + 1]
              v = B.skyLight[b / 2]
              c[f] = v & 15
              c[f + 1] = v >> 4 & 15
              v = B.blockLight[b / 2]
              d[f] = v & 15
              d[f + 1] = v >> 4 & 15
              q += 2
            p++
          l++
          a++
      t++
    A++
  !0

Chunk::init2 = (b) ->
  `var h`
  `var ea`
  `var ea`
  `var ea`
  `var ea`
  `var ea`
  `var z`
  `var s`
  `var r`
  `var F`
  `var w`
  `var u`
  `var C`
  if 0 == b
    f = 49
    c = 256
  else
    f = 0
    c = 49
  if 0 == @lightPopulated and settings.lightInit
    if !@refreshLight(-1, !0)
      return !1
    @lightPopulated = 1
  if !@getCache(f, c)
    return !1
  if 0 == b then (@isInit = -1) else (@isInit1 = -1)
  d = Chunk.cacheSlight
  e = Chunk.cacheBlight
  m = Chunk.cacheData
  l = Chunk.cacheId
  p = 0
  q = 0
  x = 0
  A = 0
  t = 0
  a = undefined
  B = punkty1
  B[0].o = 0
  B[1].o = 0
  B[2].o = 0
  v = undefined
  C = undefined
  u = undefined
  w = undefined
  F = undefined
  r = undefined
  s = undefined
  n = undefined
  L = undefined
  K = undefined
  Y = undefined
  T = undefined
  y = undefined
  R = undefined
  U = undefined
  M = undefined
  N = undefined
  P = undefined
  S = undefined
  Q = undefined
  V = undefined
  J = undefined
  Z = undefined
  I = undefined
  H = undefined
  X = undefined
  z = undefined
  $ = undefined
  aa = undefined
  W = undefined
  k = undefined
  lb = undefined
  mb = undefined
  ub = undefined
  D = undefined
  v = B[3].o = 0
  C = 0
  u = 0
  w = C = 0
  F = 0
  r = 0
  s = 0
  L = 0
  K = 0
  Y = 0
  T = 0
  y = 0
  R = 0
  U = 0
  M = 0
  N = 0
  P = 0
  S = 0
  Q = 0
  V = !1
  J = !1
  Z = !1
  I = !1
  H = !1
  X = !1
  z = 0
  $ = 0
  aa = 0
  W = 0
  k = 0
  ub = 0
  D = 0
  while 256 > D
    @heightMap[D] > ub and (ub = @heightMap[D])
    D++
  ub + 1 < c and (c = ub + 1)
  G = undefined
  E = undefined
  kb = undefined
  jb = undefined
  pb = undefined
  G = f
  while G < c
    if 0 == G % 16 and -1 == l[324 * (G + 2) + 19]
      G += 15
    else
      D = 0
      while 16 > D
                E = 0
        while 16 > E
          if X = H = I = Z = J = V = !1
            v = 324 * (G + 1) + 18 * (D + 1) + E + 1
            q = block[l[v]].type
            0 != q

            C = v + 18
            u = v - 18
            w = v - 1
            F = v + 1
            r = v + 324
            s = v - 324
            nb = block[l[r]].type
            ob = block[l[s]].type
            ha = block[l[w]].type
            ia = block[l[F]].type
            ja = block[l[u]].type
            ka = block[l[C]].type
            lb = @xPos % 5
            0 > lb and (lb += 5)
            mb = @zPos % 5
            0 > mb and (mb += 5)
            n = 65536 * (0 + G) + 256 * (16 * D + E) + 10 * (5 * lb + mb)
            if 1 == q or 2 == q or 4 == q or 6 == q
              1 != nb and Y = d[r]
              N = e[r]
              J = !0

              1 != ob and T = d[s]
              P = e[s]
              V = !0

              1 != ja and K = d[u]
              M = e[u]
              X = !0

              1 != ka and L = d[C]
              U = e[C]
              H = !0

              1 != ha and y = d[w]
              S = e[w]
              Z = !0

              1 != ia and R = d[F]
              Q = e[F]
              I = !0

            else if 300 < q
              nb != q and Y = d[r]
              N = e[r]
              J = !0

              1 != ob and ob != q and T = d[s]
              P = e[s]
              V = !0

              ja != q and K = d[u]
              M = e[u]
              X = !0

              ka != q and L = d[C]
              U = e[C]
              H = !0

              ha != q and y = d[w]
              S = e[w]
              Z = !0

              ia != q and R = d[F]
              Q = e[F]
              I = !0

            else if 300 == q
              if nb != q or m[r] != m[v]
                Y = d[r]
                N = e[r]
                J = !0
              if 1 != ob and ob != q or m[s] != m[v]
                T = d[s]
                P = e[s]
                V = !0
              if ja != q or m[u] != m[v]
                K = d[u]
                M = e[u]
                X = !0
              if ka != q or m[C] != m[v]
                L = d[C]
                U = e[C]
                H = !0
              if ha != q or m[w] != m[v]
                y = d[w]
                S = e[w]
                Z = !0
              if ia != q or m[F] != m[v]
                R = d[F]
                Q = e[F]
                I = !0
            else
              E++
              continue
            if Z or I or X or H or V or J
              if A = l[v]
                x = m[v]
                t = (if undefined == block[A][x] then block[A][0] else block[A][x])
                undefined != t.shapeType and 0 != t.shapeType

                if 1 == t.shapeType
                  p = t.drawLevel
                  a = B[p]
                  h = t.shape
                  O = h
                  z = 0
                  0 < t.useBiomeColor and (z = @getBiomeColor(E, D, t.useBiomeColor - 1))
                  if Z
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                    if 0 == block.lightSource[A]
                      oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4)
                      Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4)
                      pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4)
                      Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4)
                      la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4)
                      Ka = Math.floor((S + e[w - 324] + e[w - 324 + 18] + e[w + 18]) / 4)
                      ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) / 4)
                      La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4)
                    else
                      oa = Na = pa = Oa = la = Ka = ma = La = 15
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + O.front[g]
                    a.d[a.o++] = 0 + G + O.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * oa + la
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + O.front[g]
                    a.d[a.o++] = 0 + G + O.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * Na + Ka
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + O.front[g]
                    a.d[a.o++] = 0 + G + O.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * pa + ma
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + O.front[g]
                    a.d[a.o++] = 0 + G + O.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * oa + la
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + O.front[g]
                    a.d[a.o++] = 0 + G + O.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * pa + ma
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + O.front[g]
                    a.d[a.o++] = 0 + G + O.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * Oa + La
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                  if I
                    a = if 8 < R and 0 == p then B[p + 1] else B[p]
                    if 0 == block.lightSource[A]
                      na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4)
                      Ma = Math.floor((R + d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4)
                      qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F + 324]) / 4)
                      Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4)
                      ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4)
                      Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] + e[F + 18]) / 4)
                      sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4)
                      Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4)
                    else
                      na = Ma = qa = Pa = ra = Qa = sa = Ra = 15
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + O.back[g]
                    a.d[a.o++] = 0 + G + O.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * qa + sa
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + O.back[g]
                    a.d[a.o++] = 0 + G + O.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * na + ra
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + O.back[g]
                    a.d[a.o++] = 0 + G + O.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * Pa + Ra
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + O.back[g]
                    a.d[a.o++] = 0 + G + O.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * na + ra
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + O.back[g]
                    a.d[a.o++] = 0 + G + O.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * qa + sa
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + O.back[g]
                    a.d[a.o++] = 0 + G + O.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * Ma + Qa
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = z
                  if X
                    a = if 8 < K and 0 == p then B[p + 1] else B[p]
                    if 0 == block.lightSource[A]
                      ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4)
                      Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4)
                      ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4)
                      Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4)
                      va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4)
                      Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4)
                      wa = Math.floor((M + e[u + 1] + e[u + 324 + 1] + e[u + 324]) / 4)
                      Va = Math.floor((M + e[u + 324] + e[u + 324 - 1] + e[u - 1]) / 4)
                    else
                      ta = Sa = ua = Ta = va = Ua = wa = Va = 15
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + O.right[g]
                    a.d[a.o++] = 0 + G + O.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ua + wa
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + O.right[g]
                    a.d[a.o++] = 0 + G + O.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ta + va
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + O.right[g]
                    a.d[a.o++] = 0 + G + O.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * Ta + Va
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + O.right[g]
                    a.d[a.o++] = 0 + G + O.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ua + wa
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + O.right[g]
                    a.d[a.o++] = 0 + G + O.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * Sa + Ua
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + O.right[g]
                    a.d[a.o++] = 0 + G + O.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ta + va
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                  if H
                    a = if 8 < L and 0 == p then B[p + 1] else B[p]
                    if 0 == block.lightSource[A]
                      Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C - 324]) / 4)
                      xa = Math.floor((L + d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4)
                      Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4)
                      ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4)
                      Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4)
                      za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4)
                      Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] + e[C + 324]) / 4)
                      Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4)
                    else
                      Wa = xa = Xa = ya = Ya = za = Za = Aa = 15
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + O.left[g]
                    a.d[a.o++] = 0 + G + O.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * ya + Aa
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + O.left[g]
                    a.d[a.o++] = 0 + G + O.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * Wa + Ya
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + O.left[g]
                    a.d[a.o++] = 0 + G + O.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * xa + za
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + O.left[g]
                    a.d[a.o++] = 0 + G + O.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * Xa + Za
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + O.left[g]
                    a.d[a.o++] = 0 + G + O.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * ya + Aa
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + O.left[g]
                    a.d[a.o++] = 0 + G + O.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + O.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * xa + za
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = z
                  if V
                    a = B[p]
                    if 0 == block.lightSource[A]
                      Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4)
                      $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4)
                      Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4)
                      ab = Math.floor((T + d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4)
                      Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4)
                      bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4)
                      Ea = Math.floor((P + e[s + 1] + e[s + 18 + 1] + e[s + 18]) / 4)
                      cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4)
                    else
                      Ba = $a = Ca = ab = Da = bb = Ea = cb = 15
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                    a.d[a.o++] = 0 + G + h.bottom[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                    a.d[a.o++] = h.bottom[g + 3]
                    a.d[a.o++] = h.bottom[g + 4]
                    a.d[a.o++] = 100 * Ca + Ea
                    a.d[a.o++] = n + 5
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                    a.d[a.o++] = 0 + G + h.bottom[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                    a.d[a.o++] = h.bottom[g + 3]
                    a.d[a.o++] = h.bottom[g + 4]
                    a.d[a.o++] = 100 * Ba + Da
                    a.d[a.o++] = n + 5
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                    a.d[a.o++] = 0 + G + h.bottom[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                    a.d[a.o++] = h.bottom[g + 3]
                    a.d[a.o++] = h.bottom[g + 4]
                    a.d[a.o++] = 100 * $a + bb
                    a.d[a.o++] = n + 5
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                    a.d[a.o++] = 0 + G + h.bottom[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                    a.d[a.o++] = h.bottom[g + 3]
                    a.d[a.o++] = h.bottom[g + 4]
                    a.d[a.o++] = 100 * Ca + Ea
                    a.d[a.o++] = n + 5
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                    a.d[a.o++] = 0 + G + h.bottom[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                    a.d[a.o++] = h.bottom[g + 3]
                    a.d[a.o++] = h.bottom[g + 4]
                    a.d[a.o++] = 100 * ab + cb
                    a.d[a.o++] = n + 5
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                    a.d[a.o++] = 0 + G + h.bottom[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                    a.d[a.o++] = h.bottom[g + 3]
                    a.d[a.o++] = h.bottom[g + 4]
                    a.d[a.o++] = 100 * Ba + Da
                    a.d[a.o++] = n + 5
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                  if J
                    a = if 8 < Y and 0 == p then B[p + 1] else B[p]
                    if 0 == block.lightSource[A]
                      Fa = Math.floor((Y + d[r - 1] + d[r - 18 - 1] + d[r - 18]) / 4)
                      db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4)
                      Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4)
                      eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4)
                      Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4)
                      fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4)
                      Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4)
                      gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4)
                    else
                      Fa = db = Ga = eb = Ha = fb = Ia = gb = 15
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + h.top[g]
                    a.d[a.o++] = 0 + G + h.top[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                    a.d[a.o++] = h.top[g + 3]
                    a.d[a.o++] = h.top[g + 4]
                    a.d[a.o++] = 100 * Ga + Ia
                    a.d[a.o++] = n + 6
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + h.top[g]
                    a.d[a.o++] = 0 + G + h.top[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                    a.d[a.o++] = h.top[g + 3]
                    a.d[a.o++] = h.top[g + 4]
                    a.d[a.o++] = 100 * db + fb
                    a.d[a.o++] = n + 6
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + h.top[g]
                    a.d[a.o++] = 0 + G + h.top[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                    a.d[a.o++] = h.top[g + 3]
                    a.d[a.o++] = h.top[g + 4]
                    a.d[a.o++] = 100 * Fa + Ha
                    a.d[a.o++] = n + 6
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + h.top[g]
                    a.d[a.o++] = 0 + G + h.top[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                    a.d[a.o++] = h.top[g + 3]
                    a.d[a.o++] = h.top[g + 4]
                    a.d[a.o++] = 100 * Ga + Ia
                    a.d[a.o++] = n + 6
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + h.top[g]
                    a.d[a.o++] = 0 + G + h.top[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                    a.d[a.o++] = h.top[g + 3]
                    a.d[a.o++] = h.top[g + 4]
                    a.d[a.o++] = 100 * Fa + Ha
                    a.d[a.o++] = n + 6
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + h.top[g]
                    a.d[a.o++] = 0 + G + h.top[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                    a.d[a.o++] = h.top[g + 3]
                    a.d[a.o++] = h.top[g + 4]
                    a.d[a.o++] = 100 * eb + gb
                    a.d[a.o++] = n + 6
                    a.d[a.o++] = 1
                    a.d[a.o++] = z
                else if 2 == t.shapeType
                  p = t.drawLevel
                  a = B[p]
                  h = t.shape
                  if Z
                    g = 0
                    while g < h.front.length
                      a.d[a.o++] = 16 * @xPos + E + h.front[g]
                      a.d[a.o++] = 0 + G + h.front[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                      a.d[a.o++] = h.front[g + 3]
                      a.d[a.o++] = h.front[g + 4]
                      a.d[a.o++] = 100 * y + S
                      a.d[a.o++] = n + 1
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = 0
                      g += 5
                  if I
                    g = 0
                    while g < h.back.length
                      a.d[a.o++] = 16 * @xPos + E + h.back[g]
                      a.d[a.o++] = 0 + G + h.back[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                      a.d[a.o++] = h.back[g + 3]
                      a.d[a.o++] = h.back[g + 4]
                      a.d[a.o++] = 100 * R + Q
                      a.d[a.o++] = n + 2
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = 0
                      g += 5
                  if X
                    g = 0
                    while g < h.right.length
                      a.d[a.o++] = 16 * @xPos + E + h.right[g]
                      a.d[a.o++] = 0 + G + h.right[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                      a.d[a.o++] = h.right[g + 3]
                      a.d[a.o++] = h.right[g + 4]
                      a.d[a.o++] = 100 * K + M
                      a.d[a.o++] = n + 3
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = 0
                      g += 5
                  if H
                    g = 0
                    while g < h.left.length
                      a.d[a.o++] = 16 * @xPos + E + h.left[g]
                      a.d[a.o++] = 0 + G + h.left[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                      a.d[a.o++] = h.left[g + 3]
                      a.d[a.o++] = h.left[g + 4]
                      a.d[a.o++] = 100 * L + U
                      a.d[a.o++] = n + 4
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = 0
                      g += 5
                else if 3 == t.shapeType
                  if p = t.drawLevel
                    a = B[p]
                    h = t.shape
                    y = Math.floor((y + R + K + L + Y) / 5)
                    S = Math.floor((S + Q + M + U + N) / 5)
                    z = 0
                    0 < t.useBiomeColor and (z = @getBiomeColor(E, D, t.useBiomeColor - 1))
                    Z or I or X or H

                    for kb of h
                      `kb = kb`
                      g = 0
                      while g < h[kb].length
                        a.d[a.o++] = 16 * @xPos + E + h[kb][g]
                        a.d[a.o++] = 0 + G + h[kb][g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h[kb][g + 2]
                        a.d[a.o++] = h[kb][g + 3]
                        a.d[a.o++] = h[kb][g + 4]
                        a.d[a.o++] = 100 * y + S
                        a.d[a.o++] = n + 0
                        a.d[a.o++] = 1
                        a.d[a.o++] = z
                        g += 5
                else if 4 == t.shapeType
                  p = t.drawLevel
                  a = B[p]
                  78 == l[r] and (t = block[A][1])
                  h = t.shape
                  if 0 < t.useBiomeColor then z = @getBiomeColor(E, D, t.useBiomeColor - 1)
                  $ = @getBiomeColor1(E, D, t.useBiomeColor - 1)
                  aa = @getBiomeColor2(E, D, t.useBiomeColor - 1)
                  W = @getBiomeColor3(E, D, t.useBiomeColor - 1)
                  k = @getBiomeColor4(E, D, t.useBiomeColor - 1)
 else (k = W = aa = $ = z = 0)
                  if Z
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                    if 4 == t.shapeType
                      g = 0
                      while g < h.front2.length
                        a.d[a.o++] = 16 * @xPos + E + h.front2[g]
                        a.d[a.o++] = 0 + G + h.front2[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.front2[g + 2]
                        a.d[a.o++] = h.front2[g + 3]
                        a.d[a.o++] = h.front2[g + 4]
                        a.d[a.o++] = 100 * y + S
                        a.d[a.o++] = n + 1
                        a.d[a.o++] = 0.8
                        a.d[a.o++] = z
                        g += 5
                    oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4)
                    Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4)
                    pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4)
                    Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4)
                    la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4)
                    Ka = Math.floor((S + e[w - 324] + e[w - 324 + 18] + e[w + 18]) / 4)
                    ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) / 4)
                    La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4)
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + h.front[g]
                    a.d[a.o++] = 0 + G + h.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * oa + la
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + h.front[g]
                    a.d[a.o++] = 0 + G + h.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * Na + Ka
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + h.front[g]
                    a.d[a.o++] = 0 + G + h.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * pa + ma
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + h.front[g]
                    a.d[a.o++] = 0 + G + h.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * oa + la
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + h.front[g]
                    a.d[a.o++] = 0 + G + h.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * pa + ma
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + h.front[g]
                    a.d[a.o++] = 0 + G + h.front[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                    a.d[a.o++] = h.front[g + 3]
                    a.d[a.o++] = h.front[g + 4]
                    a.d[a.o++] = 100 * Oa + La
                    a.d[a.o++] = n + 1
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                  if I
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                    if 4 == t.shapeType
                      g = 0
                      while g < h.back2.length
                        a.d[a.o++] = 16 * @xPos + E + h.back2[g]
                        a.d[a.o++] = 0 + G + h.back2[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.back2[g + 2]
                        a.d[a.o++] = h.back2[g + 3]
                        a.d[a.o++] = h.back2[g + 4]
                        a.d[a.o++] = 100 * R + Q
                        a.d[a.o++] = n + 2
                        a.d[a.o++] = 0.8
                        a.d[a.o++] = z
                        g += 5
                    na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4)
                    Ma = Math.floor((R + d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4)
                    qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F + 324]) / 4)
                    Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4)
                    ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4)
                    Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] + e[F + 18]) / 4)
                    sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4)
                    Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4)
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + h.back[g]
                    a.d[a.o++] = 0 + G + h.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * qa + sa
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + h.back[g]
                    a.d[a.o++] = 0 + G + h.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * na + ra
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + h.back[g]
                    a.d[a.o++] = 0 + G + h.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * Pa + Ra
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + h.back[g]
                    a.d[a.o++] = 0 + G + h.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * na + ra
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + h.back[g]
                    a.d[a.o++] = 0 + G + h.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * qa + sa
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + h.back[g]
                    a.d[a.o++] = 0 + G + h.back[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                    a.d[a.o++] = h.back[g + 3]
                    a.d[a.o++] = h.back[g + 4]
                    a.d[a.o++] = 100 * Ma + Qa
                    a.d[a.o++] = n + 2
                    a.d[a.o++] = 0.8
                    a.d[a.o++] = 0
                  if X
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                    if 4 == t.shapeType
                      g = 0
                      while g < h.right2.length
                        a.d[a.o++] = 16 * @xPos + E + h.right2[g]
                        a.d[a.o++] = 0 + G + h.right2[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.right2[g + 2]
                        a.d[a.o++] = h.right2[g + 3]
                        a.d[a.o++] = h.right2[g + 4]
                        a.d[a.o++] = 100 * K + M
                        a.d[a.o++] = n + 3
                        a.d[a.o++] = 0.55
                        a.d[a.o++] = z
                        g += 5
                    ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4)
                    Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4)
                    ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4)
                    Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4)
                    va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4)
                    Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4)
                    wa = Math.floor((M + e[u + 1] + e[u + 324 + 1] + e[u + 324]) / 4)
                    Va = Math.floor((M + e[u + 324] + e[u + 324 - 1] + e[u - 1]) / 4)
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + h.right[g]
                    a.d[a.o++] = 0 + G + h.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ua + wa
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + h.right[g]
                    a.d[a.o++] = 0 + G + h.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ta + va
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + h.right[g]
                    a.d[a.o++] = 0 + G + h.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * Ta + Va
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + h.right[g]
                    a.d[a.o++] = 0 + G + h.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ua + wa
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + h.right[g]
                    a.d[a.o++] = 0 + G + h.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * Sa + Ua
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + h.right[g]
                    a.d[a.o++] = 0 + G + h.right[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                    a.d[a.o++] = h.right[g + 3]
                    a.d[a.o++] = h.right[g + 4]
                    a.d[a.o++] = 100 * ta + va
                    a.d[a.o++] = n + 3
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                  if H
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                    if 4 == t.shapeType
                      g = 0
                      while g < h.left2.length
                        a.d[a.o++] = 16 * @xPos + E + h.left2[g]
                        a.d[a.o++] = 0 + G + h.left2[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.left2[g + 2]
                        a.d[a.o++] = h.left2[g + 3]
                        a.d[a.o++] = h.left2[g + 4]
                        a.d[a.o++] = 100 * L + U
                        a.d[a.o++] = n + 4
                        a.d[a.o++] = 0.55
                        a.d[a.o++] = z
                        g += 5
                    Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C - 324]) / 4)
                    xa = Math.floor((L + d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4)
                    Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4)
                    ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4)
                    Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4)
                    za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4)
                    Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] + e[C + 324]) / 4)
                    Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4)
                    g = 0
                    a.d[a.o++] = 16 * @xPos + E + h.left[g]
                    a.d[a.o++] = 0 + G + h.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * ya + Aa
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 5
                    a.d[a.o++] = 16 * @xPos + E + h.left[g]
                    a.d[a.o++] = 0 + G + h.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * Wa + Ya
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 10
                    a.d[a.o++] = 16 * @xPos + E + h.left[g]
                    a.d[a.o++] = 0 + G + h.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * xa + za
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 15
                    a.d[a.o++] = 16 * @xPos + E + h.left[g]
                    a.d[a.o++] = 0 + G + h.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * Xa + Za
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 20
                    a.d[a.o++] = 16 * @xPos + E + h.left[g]
                    a.d[a.o++] = 0 + G + h.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * ya + Aa
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                    g = 25
                    a.d[a.o++] = 16 * @xPos + E + h.left[g]
                    a.d[a.o++] = 0 + G + h.left[g + 1]
                    a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                    a.d[a.o++] = h.left[g + 3]
                    a.d[a.o++] = h.left[g + 4]
                    a.d[a.o++] = 100 * xa + za
                    a.d[a.o++] = n + 4
                    a.d[a.o++] = 0.55
                    a.d[a.o++] = 0
                  V and a = B[p]
                  Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4)
                  $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4)
                  Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4)
                  ab = Math.floor((T + d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4)
                  Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4)
                  bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4)
                  Ea = Math.floor((P + e[s + 1] + e[s + 18 + 1] + e[s + 18]) / 4)
                  cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ca + Ea
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = 0
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ba + Da
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = 0
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * $a + bb
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = 0
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ca + Ea
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = 0
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * ab + cb
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = 0
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ba + Da
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = 0
                  J and a = if 8 < Y and 0 == p then B[p + 1] else B[p]
                  Fa = Math.floor((Y + d[r - 1] + d[r - 18 - 1] + d[r - 18]) / 4)
                  db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4)
                  Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4)
                  eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4)
                  Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4)
                  fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4)
                  Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4)
                  gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Ga + Ia
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = W
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * db + fb
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = aa
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Fa + Ha
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = $
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Ga + Ia
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = W
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Fa + Ha
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = $
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * eb + gb
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = k
                else if 8 == t.shapeType
                  p = t.drawLevel
                  a = B[p]
                  h = t.shape
                  z = 0
                  0 < t.useBiomeColor and (z = @getBiomeColor(E, D, t.useBiomeColor - 1))
                  ea = ''
                  ea = ea + m[v]
                  ea = if q == ka then ea + m[C] else ea + 'x'
                  ea = if q == ja then ea + m[u] else ea + 'x'
                  ea = if q == ha then ea + m[w] else ea + 'x'
                  ea = if q == ia then ea + m[F] else ea + 'x'
                  zb = 0
                  Ab = Chunk.stairsData[ea]
                  undefined != Ab and h = if 3 < m[v] then block[A][9].shape else block[A][8].shape
                  zb = 1
                  if Z
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.front.length
                      a.d[a.o++] = 16 * @xPos + E + h.front[g]
                      a.d[a.o++] = 0 + G + h.front[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                      a.d[a.o++] = h.front[g + 3]
                      a.d[a.o++] = h.front[g + 4]
                      a.d[a.o++] = 100 * y + S
                      a.d[a.o++] = n + 1
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = z
                      g += 5
                  if I
                    a = if 8 < R and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.back.length
                      a.d[a.o++] = 16 * @xPos + E + h.back[g]
                      a.d[a.o++] = 0 + G + h.back[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                      a.d[a.o++] = h.back[g + 3]
                      a.d[a.o++] = h.back[g + 4]
                      a.d[a.o++] = 100 * R + Q
                      a.d[a.o++] = n + 2
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = z
                      g += 5
                  if X
                    a = if 8 < K and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.right.length
                      a.d[a.o++] = 16 * @xPos + E + h.right[g]
                      a.d[a.o++] = 0 + G + h.right[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                      a.d[a.o++] = h.right[g + 3]
                      a.d[a.o++] = h.right[g + 4]
                      a.d[a.o++] = 100 * K + M
                      a.d[a.o++] = n + 3
                      a.d[a.o++] = 0.55
                      a.d[a.o++] = z
                      g += 5
                  if H
                    a = if 8 < L and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.left.length
                      a.d[a.o++] = 16 * @xPos + E + h.left[g]
                      a.d[a.o++] = 0 + G + h.left[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                      a.d[a.o++] = h.left[g + 3]
                      a.d[a.o++] = h.left[g + 4]
                      a.d[a.o++] = 100 * L + U
                      a.d[a.o++] = n + 4
                      a.d[a.o++] = 0.55
                      a.d[a.o++] = z
                      g += 5
                  if V
                    a = B[p]
                    g = 0
                    while g < h.bottom.length
                      a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                      a.d[a.o++] = 0 + G + h.bottom[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                      a.d[a.o++] = h.bottom[g + 3]
                      a.d[a.o++] = h.bottom[g + 4]
                      a.d[a.o++] = 100 * T + P
                      a.d[a.o++] = n + 5
                      a.d[a.o++] = 0.3
                      a.d[a.o++] = z
                      g += 5
                  if J
                    a = if 8 < Y and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.top.length
                      a.d[a.o++] = 16 * @xPos + E + h.top[g]
                      a.d[a.o++] = 0 + G + h.top[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                      a.d[a.o++] = h.top[g + 3]
                      a.d[a.o++] = h.top[g + 4]
                      a.d[a.o++] = 100 * Y + N
                      a.d[a.o++] = n + 6
                      a.d[a.o++] = 1
                      a.d[a.o++] = z
                      g += 5
                  if 1 == zb
                    h = block[A][10].shape
                    hb = 0
                    ib = 0
                    3 < m[v] and (ib = -0.5)
                                        jb = 0
                    pb = 0
                    while 4 > pb
                      if 0 != Ab.charCodeAt(pb) - 48
                        hb = pb % 2 / 2
                        jb = if 1 < pb then 0.5 else 0
                        if Z
                          a = if 8 < y and 0 == p then B[p + 1] else B[p]
                          g = 0
                          while g < h.front.length
                            a.d[a.o++] = hb + 16 * @xPos + E + h.front[g]
                            a.d[a.o++] = ib + 0 + G + h.front[g + 1]
                            a.d[a.o++] = jb + 16 * @zPos + D + h.front[g + 2]
                            a.d[a.o++] = h.front[g + 3]
                            a.d[a.o++] = h.front[g + 4]
                            a.d[a.o++] = 100 * y + S
                            a.d[a.o++] = n + 1
                            a.d[a.o++] = 0.8
                            a.d[a.o++] = z
                            g += 5
                        if I
                          a = if 8 < R and 0 == p then B[p + 1] else B[p]
                          g = 0
                          while g < h.back.length
                            a.d[a.o++] = hb + 16 * @xPos + E + h.back[g]
                            a.d[a.o++] = ib + 0 + G + h.back[g + 1]
                            a.d[a.o++] = jb + 16 * @zPos + D + h.back[g + 2]
                            a.d[a.o++] = h.back[g + 3]
                            a.d[a.o++] = h.back[g + 4]
                            a.d[a.o++] = 100 * R + Q
                            a.d[a.o++] = n + 2
                            a.d[a.o++] = 0.8
                            a.d[a.o++] = z
                            g += 5
                        if X
                          a = if 8 < K and 0 == p then B[p + 1] else B[p]
                          g = 0
                          while g < h.right.length
                            a.d[a.o++] = hb + 16 * @xPos + E + h.right[g]
                            a.d[a.o++] = ib + 0 + G + h.right[g + 1]
                            a.d[a.o++] = jb + 16 * @zPos + D + h.right[g + 2]
                            a.d[a.o++] = h.right[g + 3]
                            a.d[a.o++] = h.right[g + 4]
                            a.d[a.o++] = 100 * K + M
                            a.d[a.o++] = n + 3
                            a.d[a.o++] = 0.55
                            a.d[a.o++] = z
                            g += 5
                        if H
                          a = if 8 < L and 0 == p then B[p + 1] else B[p]
                          g = 0
                          while g < h.left.length
                            a.d[a.o++] = hb + 16 * @xPos + E + h.left[g]
                            a.d[a.o++] = ib + 0 + G + h.left[g + 1]
                            a.d[a.o++] = jb + 16 * @zPos + D + h.left[g + 2]
                            a.d[a.o++] = h.left[g + 3]
                            a.d[a.o++] = h.left[g + 4]
                            a.d[a.o++] = 100 * L + U
                            a.d[a.o++] = n + 4
                            a.d[a.o++] = 0.55
                            a.d[a.o++] = z
                            g += 5
                        if V
                          a = B[p]
                          g = 0
                          while g < h.bottom.length
                            a.d[a.o++] = hb + 16 * @xPos + E + h.bottom[g]
                            a.d[a.o++] = ib + 0 + G + h.bottom[g + 1]
                            a.d[a.o++] = jb + 16 * @zPos + D + h.bottom[g + 2]
                            a.d[a.o++] = h.bottom[g + 3]
                            a.d[a.o++] = h.bottom[g + 4]
                            a.d[a.o++] = 100 * T + P
                            a.d[a.o++] = n + 5
                            a.d[a.o++] = 0.3
                            a.d[a.o++] = z
                            g += 5
                        if J
                          a = if 8 < Y and 0 == p then B[p + 1] else B[p]
                          g = 0
                          while g < h.top.length
                            a.d[a.o++] = hb + 16 * @xPos + E + h.top[g]
                            a.d[a.o++] = ib + 0 + G + h.top[g + 1]
                            a.d[a.o++] = jb + 16 * @zPos + D + h.top[g + 2]
                            a.d[a.o++] = h.top[g + 3]
                            a.d[a.o++] = h.top[g + 4]
                            a.d[a.o++] = 100 * Y + N
                            a.d[a.o++] = n + 6
                            a.d[a.o++] = 1
                            a.d[a.o++] = z
                            g += 5
                      pb++
                else if 5 == t.shapeType
                  if Z or I or X or H or J or V
                    p = t.drawLevel
                    a = B[p]
                    h = t.shape
                    z = 0
                    0 < t.useBiomeColor and (z = @getBiomeColor(E, D, t.useBiomeColor - 1))
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                                        g = 0
                    while g < h.front.length
                      if 0 == g % 30
                        if (60 == g or 120 == g) and q != ka and 1 != ka
                          g += 25
                                                    g += 5
                          continue
                        if (30 == g or 90 == g) and q != ja and 1 != ja
                          g += 25
                                                    g += 5
                          continue
                      a.d[a.o++] = 16 * @xPos + E + h.front[g]
                      a.d[a.o++] = 0 + G + h.front[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                      a.d[a.o++] = h.front[g + 3]
                      a.d[a.o++] = h.front[g + 4]
                      a.d[a.o++] = 100 * y + S
                      a.d[a.o++] = n + 1
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = z
                      g += 5
                    a = if 8 < R and 0 == p then B[p + 1] else B[p]
                                        g = 0
                    while g < h.back.length
                      if 0 == g % 30
                        if (60 == g or 120 == g) and q != ka and 1 != ka
                          g += 25
                                                    g += 5
                          continue
                        if (30 == g or 90 == g) and q != ja and 1 != ja
                          g += 25
                                                    g += 5
                          continue
                      a.d[a.o++] = 16 * @xPos + E + h.back[g]
                      a.d[a.o++] = 0 + G + h.back[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                      a.d[a.o++] = h.back[g + 3]
                      a.d[a.o++] = h.back[g + 4]
                      a.d[a.o++] = 100 * R + Q
                      a.d[a.o++] = n + 2
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = z
                      g += 5
                    a = if 8 < K and 0 == p then B[p + 1] else B[p]
                                        g = 0
                    while g < h.right.length
                      if 0 == g % 30
                        if (30 == g or 90 == g) and q != ha and 1 != ha
                          g += 25
                                                    g += 5
                          continue
                        if (60 == g or 120 == g) and q != ia and 1 != ia
                          g += 25
                                                    g += 5
                          continue
                      a.d[a.o++] = 16 * @xPos + E + h.right[g]
                      a.d[a.o++] = 0 + G + h.right[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                      a.d[a.o++] = h.right[g + 3]
                      a.d[a.o++] = h.right[g + 4]
                      a.d[a.o++] = 100 * K + M
                      a.d[a.o++] = n + 3
                      a.d[a.o++] = 0.55
                      a.d[a.o++] = z
                      g += 5
                    a = if 8 < L and 0 == p then B[p + 1] else B[p]
                                        g = 0
                    while g < h.left.length
                      if 0 == g % 30
                        if (30 == g or 90 == g) and q != ha and 1 != ha
                          g += 25
                                                    g += 5
                          continue
                        if (60 == g or 120 == g) and q != ia and 1 != ia
                          g += 25
                                                    g += 5
                          continue
                      a.d[a.o++] = 16 * @xPos + E + h.left[g]
                      a.d[a.o++] = 0 + G + h.left[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                      a.d[a.o++] = h.left[g + 3]
                      a.d[a.o++] = h.left[g + 4]
                      a.d[a.o++] = 100 * L + U
                      a.d[a.o++] = n + 4
                      a.d[a.o++] = 0.55
                      a.d[a.o++] = z
                      g += 5
                    a = B[p]
                                        g = 0
                    while g < h.bottom.length
                      if 0 == g % 30
                        if (30 == g or 150 == g) and q != ja and 1 != ja
                          g += 25
                                                    g += 5
                          continue
                        if (60 == g or 180 == g) and q != ka and 1 != ka
                          g += 25
                                                    g += 5
                          continue
                        if (90 == g or 210 == g) and q != ha and 1 != ha
                          g += 25
                                                    g += 5
                          continue
                        if (120 == g or 240 == g) and q != ia and 1 != ia
                          g += 25
                                                    g += 5
                          continue
                      a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                      a.d[a.o++] = 0 + G + h.bottom[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                      a.d[a.o++] = h.bottom[g + 3]
                      a.d[a.o++] = h.bottom[g + 4]
                      a.d[a.o++] = 100 * T + P
                      a.d[a.o++] = n + 5
                      a.d[a.o++] = 0.3
                      a.d[a.o++] = z
                      g += 5
                    a = if 8 < Y and 0 == p then B[p + 1] else B[p]
                                        g = 0
                    while g < h.top.length
                      if 0 == g % 30
                        if (30 == g or 150 == g) and q != ja and 1 != ja
                          g += 25
                                                    g += 5
                          continue
                        if (60 == g or 180 == g) and q != ka and 1 != ka
                          g += 25
                                                    g += 5
                          continue
                        if (90 == g or 210 == g) and q != ha and 1 != ha
                          g += 25
                                                    g += 5
                          continue
                        if (120 == g or 240 == g) and q != ia and 1 != ia
                          g += 25
                                                    g += 5
                          continue
                      a.d[a.o++] = 16 * @xPos + E + h.top[g]
                      a.d[a.o++] = 0 + G + h.top[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                      a.d[a.o++] = h.top[g + 3]
                      a.d[a.o++] = h.top[g + 4]
                      a.d[a.o++] = 100 * Y + N
                      a.d[a.o++] = n + 6
                      a.d[a.o++] = 1
                      a.d[a.o++] = z
                      g += 5
                else if 6 == t.shapeType
                  if p = t.drawLevel
                    a = B[p]
                    h = t.shape
                    z = 0
                    0 < t.useBiomeColor and (z = @getBiomeColor(E, D, t.useBiomeColor - 1))
                    Z or I or X or H or V or J

                    if 5 == x
                      a = if 8 < y and 0 == p then B[p + 1] else B[p]
                      g = 0
                      while g < h.front.length
                        a.d[a.o++] = 16 * @xPos + E + h.front[g]
                        a.d[a.o++] = 0 + G + h.front[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                        a.d[a.o++] = h.front[g + 3]
                        a.d[a.o++] = h.front[g + 4]
                        a.d[a.o++] = 100 * y + S
                        a.d[a.o++] = n + 1
                        a.d[a.o++] = 0.8
                        a.d[a.o++] = z
                        g += 5
                    if 4 == x
                      a = if 8 < R and 0 == p then B[p + 1] else B[p]
                      g = 0
                      while g < h.back.length
                        a.d[a.o++] = 16 * @xPos + E + h.back[g]
                        a.d[a.o++] = 0 + G + h.back[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                        a.d[a.o++] = h.back[g + 3]
                        a.d[a.o++] = h.back[g + 4]
                        a.d[a.o++] = 100 * R + Q
                        a.d[a.o++] = n + 2
                        a.d[a.o++] = 0.8
                        a.d[a.o++] = z
                        g += 5
                    if 3 == x
                      a = if 8 < K and 0 == p then B[p + 1] else B[p]
                      g = 0
                      while g < h.right.length
                        a.d[a.o++] = 16 * @xPos + E + h.right[g]
                        a.d[a.o++] = 0 + G + h.right[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                        a.d[a.o++] = h.right[g + 3]
                        a.d[a.o++] = h.right[g + 4]
                        a.d[a.o++] = 100 * K + M
                        a.d[a.o++] = n + 3
                        a.d[a.o++] = 0.55
                        a.d[a.o++] = z
                        g += 5
                    if 2 == x
                      a = if 8 < L and 0 == p then B[p + 1] else B[p]
                      g = 0
                      while g < h.left.length
                        a.d[a.o++] = 16 * @xPos + E + h.left[g]
                        a.d[a.o++] = 0 + G + h.left[g + 1]
                        a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                        a.d[a.o++] = h.left[g + 3]
                        a.d[a.o++] = h.left[g + 4]
                        a.d[a.o++] = 100 * L + U
                        a.d[a.o++] = n + 4
                        a.d[a.o++] = 0.55
                        a.d[a.o++] = z
                        g += 5
                else if 9 == t.shapeType
                  p = t.drawLevel
                  a = B[p]
                  h = t.shape
                  z = 0
                  if 0 < t.useBiomeColor then z = @getBiomeColor(E, D, t.useBiomeColor - 1)
                  $ = @getBiomeColor1(E, D, t.useBiomeColor - 1)
                  aa = @getBiomeColor2(E, D, t.useBiomeColor - 1)
                  W = @getBiomeColor3(E, D, t.useBiomeColor - 1)
                  k = @getBiomeColor4(E, D, t.useBiomeColor - 1)
 else (k = W = aa = $ = z = 0)
                  ca = 1
                  fa = 1
                  da = 1
                  ga = 1
                  if 8 != (m[v] & 8) and nb != q
                    if 0 != (m[v] & 7)
                      qb = m[v + 18] % 8
                      ka != q and (qb = 7)
                      rb = m[v - 18] % 8
                      ja != q and (rb = 7)
                      sb = m[v - 1] % 8
                      ha != q and (sb = 7)
                      tb = m[v + 1] % 8
                      ia != q and (tb = 7)
                      vb = m[v + 18 - 1] % 8
                      block[l[v + 18 - 1]].type != q and (vb = 7)
                      wb = m[v - 18 - 1] % 8
                      block[l[v - 18 - 1]].type != q and (wb = 7)
                      xb = m[v + 18 + 1] % 8
                      block[l[v + 18 + 1]].type != q and (xb = 7)
                      yb = m[v - 18 + 1] % 8
                      block[l[v - 18 + 1]].type != q and (yb = 7)
                      ca = if 0 == sb or 0 == wb or 0 == rb then 0.875 else ca - ((m[v] + sb + wb + rb) / 4 / 7)
                      fa = if 0 == rb or 0 == yb or 0 == tb then 0.875 else fa - ((m[v] + rb + yb + tb) / 4 / 7)
                      da = if 0 == tb or 0 == xb or 0 == qb then 0.875 else da - ((m[v] + tb + xb + qb) / 4 / 7)
                      ga = if 0 == qb or 0 == vb or 0 == sb then 0.875 else ga - ((m[v] + qb + vb + sb) / 4 / 7)
                      if 2.625 == ca + fa + da or 2.625 == fa + da + ga or 2.625 == da + ga + ca or 2.625 == ga + ca + fa
                        ga = da = fa = ca = 0.875
                    else
                      ga = da = fa = ca = 0.875
                    if block[l[r - 1]].type == q or block[l[r - 18 - 1]].type == q or block[l[r - 18]].type == q
                      ca = 1
                    if block[l[r - 18]].type == q or block[l[r - 18 + 1]].type == q or block[l[r + 1]].type == q
                      fa = 1
                    if block[l[r + 1]].type == q or block[l[r + 18 + 1]].type == q or block[l[r + 18]].type == q
                      da = 1
                    if block[l[r + 18]].type == q or block[l[r + 18 - 1]].type == q or block[l[r - 1]].type == q
                      ga = 1
                  Z and if 0 == block.lightSource[A] then oa = Math.floor((y + d[w - 18] + d[w - 324 - 18] + d[w - 324]) / 4)
                  Na = Math.floor((y + d[w - 324] + d[w - 324 + 18] + d[w + 18]) / 4)
                  pa = Math.floor((y + d[w + 18] + d[w + 324 + 18] + d[w + 324]) / 4)
                  Oa = Math.floor((y + d[w + 324] + d[w + 324 - 18] + d[w - 18]) / 4)
                  la = Math.floor((S + e[w - 18] + e[w - 324 - 18] + e[w - 324]) / 4)
                  Ka = Math.floor((S + e[w - 324] + e[w - 324 + 18] + e[w + 18]) / 4)
                  ma = Math.floor((S + e[w + 18] + e[w + 324 + 18] + e[w + 324]) / 4)
                  La = Math.floor((S + e[w + 324] + e[w + 324 - 18] + e[w - 18]) / 4)
 else (oa = Na = pa = Oa = la = Ka = ma = La = 15)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.front[g]
                  a.d[a.o++] = 0 + G + h.front[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                  a.d[a.o++] = h.front[g + 3]
                  a.d[a.o++] = h.front[g + 4]
                  a.d[a.o++] = 100 * oa + la
                  a.d[a.o++] = n + 1
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.front[g]
                  a.d[a.o++] = 0 + G + h.front[g + 1] * ga
                  a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                  a.d[a.o++] = h.front[g + 3]
                  a.d[a.o++] = h.front[g + 4]
                  a.d[a.o++] = 100 * Na + Ka
                  a.d[a.o++] = n + 1
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.front[g]
                  a.d[a.o++] = 0 + G + h.front[g + 1] * ga
                  a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                  a.d[a.o++] = h.front[g + 3]
                  a.d[a.o++] = h.front[g + 4]
                  a.d[a.o++] = 100 * pa + ma
                  a.d[a.o++] = n + 1
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.front[g]
                  a.d[a.o++] = 0 + G + h.front[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                  a.d[a.o++] = h.front[g + 3]
                  a.d[a.o++] = h.front[g + 4]
                  a.d[a.o++] = 100 * oa + la
                  a.d[a.o++] = n + 1
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.front[g]
                  a.d[a.o++] = 0 + G + h.front[g + 1] * ga
                  a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                  a.d[a.o++] = h.front[g + 3]
                  a.d[a.o++] = h.front[g + 4]
                  a.d[a.o++] = 100 * pa + ma
                  a.d[a.o++] = n + 1
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.front[g]
                  a.d[a.o++] = 0 + G + h.front[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                  a.d[a.o++] = h.front[g + 3]
                  a.d[a.o++] = h.front[g + 4]
                  a.d[a.o++] = 100 * Oa + La
                  a.d[a.o++] = n + 1
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  I and if 0 == block.lightSource[A] then na = Math.floor((R + d[F - 18] + d[F - 324 - 18] + d[F - 324]) / 4)
                  Ma = Math.floor((R + d[F - 324] + d[F - 324 + 18] + d[F + 18]) / 4)
                  qa = Math.floor((R + d[F + 18] + d[F + 324 + 18] + d[F + 324]) / 4)
                  Pa = Math.floor((R + d[F + 324] + d[F + 324 - 18] + d[F - 18]) / 4)
                  ra = Math.floor((Q + e[F - 18] + e[F - 324 - 18] + e[F - 324]) / 4)
                  Qa = Math.floor((Q + e[F - 324] + e[F - 324 + 18] + e[F + 18]) / 4)
                  sa = Math.floor((Q + e[F + 18] + e[F + 324 + 18] + e[F + 324]) / 4)
                  Ra = Math.floor((Q + e[F + 324] + e[F + 324 - 18] + e[F - 18]) / 4)
 else (na = Ma = qa = Pa = ra = Qa = sa = Ra = 15)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.back[g]
                  a.d[a.o++] = 0 + G + h.back[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                  a.d[a.o++] = h.back[g + 3]
                  a.d[a.o++] = h.back[g + 4]
                  a.d[a.o++] = 100 * qa + sa
                  a.d[a.o++] = n + 2
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.back[g]
                  a.d[a.o++] = 0 + G + h.back[g + 1] * fa
                  a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                  a.d[a.o++] = h.back[g + 3]
                  a.d[a.o++] = h.back[g + 4]
                  a.d[a.o++] = 100 * na + ra
                  a.d[a.o++] = n + 2
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.back[g]
                  a.d[a.o++] = 0 + G + h.back[g + 1] * fa
                  a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                  a.d[a.o++] = h.back[g + 3]
                  a.d[a.o++] = h.back[g + 4]
                  a.d[a.o++] = 100 * Pa + Ra
                  a.d[a.o++] = n + 2
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.back[g]
                  a.d[a.o++] = 0 + G + h.back[g + 1] * fa
                  a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                  a.d[a.o++] = h.back[g + 3]
                  a.d[a.o++] = h.back[g + 4]
                  a.d[a.o++] = 100 * na + ra
                  a.d[a.o++] = n + 2
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.back[g]
                  a.d[a.o++] = 0 + G + h.back[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                  a.d[a.o++] = h.back[g + 3]
                  a.d[a.o++] = h.back[g + 4]
                  a.d[a.o++] = 100 * qa + sa
                  a.d[a.o++] = n + 2
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.back[g]
                  a.d[a.o++] = 0 + G + h.back[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                  a.d[a.o++] = h.back[g + 3]
                  a.d[a.o++] = h.back[g + 4]
                  a.d[a.o++] = 100 * Ma + Qa
                  a.d[a.o++] = n + 2
                  a.d[a.o++] = 0.8
                  a.d[a.o++] = z
                  X and if 0 == block.lightSource[A] then ta = Math.floor((K + d[u - 1] + d[u - 324 - 1] + d[u - 324]) / 4)
                  Sa = Math.floor((K + d[u - 324] + d[u - 324 + 1] + d[u + 1]) / 4)
                  ua = Math.floor((K + d[u + 1] + d[u + 324 + 1] + d[u + 324]) / 4)
                  Ta = Math.floor((K + d[u + 324] + d[u + 324 - 1] + d[u - 1]) / 4)
                  va = Math.floor((M + e[u - 1] + e[u - 324 - 1] + e[u - 324]) / 4)
                  Ua = Math.floor((M + e[u - 324] + e[u - 324 + 1] + e[u + 1]) / 4)
                  wa = Math.floor((M + e[u + 1] + e[u + 324 + 1] + e[u + 324]) / 4)
                  Va = Math.floor((M + e[u + 324] + e[u + 324 - 1] + e[u - 1]) / 4)
 else (ta = Sa = ua = Ta = va = Ua = wa = Va = 15)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.right[g]
                  a.d[a.o++] = 0 + G + h.right[g + 1] * fa
                  a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                  a.d[a.o++] = h.right[g + 3]
                  a.d[a.o++] = h.right[g + 4]
                  a.d[a.o++] = 100 * ua + wa
                  a.d[a.o++] = n + 3
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.right[g]
                  a.d[a.o++] = 0 + G + h.right[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                  a.d[a.o++] = h.right[g + 3]
                  a.d[a.o++] = h.right[g + 4]
                  a.d[a.o++] = 100 * ta + va
                  a.d[a.o++] = n + 3
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.right[g]
                  a.d[a.o++] = 0 + G + h.right[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                  a.d[a.o++] = h.right[g + 3]
                  a.d[a.o++] = h.right[g + 4]
                  a.d[a.o++] = 100 * Ta + Va
                  a.d[a.o++] = n + 3
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.right[g]
                  a.d[a.o++] = 0 + G + h.right[g + 1] * fa
                  a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                  a.d[a.o++] = h.right[g + 3]
                  a.d[a.o++] = h.right[g + 4]
                  a.d[a.o++] = 100 * ua + wa
                  a.d[a.o++] = n + 3
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.right[g]
                  a.d[a.o++] = 0 + G + h.right[g + 1] * fa
                  a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                  a.d[a.o++] = h.right[g + 3]
                  a.d[a.o++] = h.right[g + 4]
                  a.d[a.o++] = 100 * Sa + Ua
                  a.d[a.o++] = n + 3
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.right[g]
                  a.d[a.o++] = 0 + G + h.right[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                  a.d[a.o++] = h.right[g + 3]
                  a.d[a.o++] = h.right[g + 4]
                  a.d[a.o++] = 100 * ta + va
                  a.d[a.o++] = n + 3
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  H and if 0 == block.lightSource[A] then Wa = Math.floor((L + d[C - 1] + d[C - 324 - 1] + d[C - 324]) / 4)
                  xa = Math.floor((L + d[C - 324] + d[C - 324 + 1] + d[C + 1]) / 4)
                  Xa = Math.floor((L + d[C + 1] + d[C + 324 + 1] + d[C + 324]) / 4)
                  ya = Math.floor((L + d[C + 324] + d[C + 324 - 1] + d[C - 1]) / 4)
                  Ya = Math.floor((U + e[C - 1] + e[C - 324 - 1] + e[C - 324]) / 4)
                  za = Math.floor((U + e[C - 324] + e[C - 324 + 1] + e[C + 1]) / 4)
                  Za = Math.floor((U + e[C + 1] + e[C + 324 + 1] + e[C + 324]) / 4)
                  Aa = Math.floor((U + e[C + 324] + e[C + 324 - 1] + e[C - 1]) / 4)
 else (Wa = xa = Xa = ya = Ya = za = Za = Aa = 15)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.left[g]
                  a.d[a.o++] = 0 + G + h.left[g + 1] * ga
                  a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                  a.d[a.o++] = h.left[g + 3]
                  a.d[a.o++] = h.left[g + 4]
                  a.d[a.o++] = 100 * ya + Aa
                  a.d[a.o++] = n + 4
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.left[g]
                  a.d[a.o++] = 0 + G + h.left[g + 1] * ga
                  a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                  a.d[a.o++] = h.left[g + 3]
                  a.d[a.o++] = h.left[g + 4]
                  a.d[a.o++] = 100 * Wa + Ya
                  a.d[a.o++] = n + 4
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.left[g]
                  a.d[a.o++] = 0 + G + h.left[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                  a.d[a.o++] = h.left[g + 3]
                  a.d[a.o++] = h.left[g + 4]
                  a.d[a.o++] = 100 * xa + za
                  a.d[a.o++] = n + 4
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.left[g]
                  a.d[a.o++] = 0 + G + h.left[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                  a.d[a.o++] = h.left[g + 3]
                  a.d[a.o++] = h.left[g + 4]
                  a.d[a.o++] = 100 * Xa + Za
                  a.d[a.o++] = n + 4
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.left[g]
                  a.d[a.o++] = 0 + G + h.left[g + 1] * ga
                  a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                  a.d[a.o++] = h.left[g + 3]
                  a.d[a.o++] = h.left[g + 4]
                  a.d[a.o++] = 100 * ya + Aa
                  a.d[a.o++] = n + 4
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.left[g]
                  a.d[a.o++] = 0 + G + h.left[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                  a.d[a.o++] = h.left[g + 3]
                  a.d[a.o++] = h.left[g + 4]
                  a.d[a.o++] = 100 * xa + za
                  a.d[a.o++] = n + 4
                  a.d[a.o++] = 0.55
                  a.d[a.o++] = z
                  V and if 0 == block.lightSource[A] then Ba = Math.floor((T + d[s - 1] + d[s - 18 - 1] + d[s - 18]) / 4)
                  $a = Math.floor((T + d[s - 18] + d[s - 18 + 1] + d[s + 1]) / 4)
                  Ca = Math.floor((T + d[s + 1] + d[s + 18 + 1] + d[s + 18]) / 4)
                  ab = Math.floor((T + d[s + 18] + d[s + 18 - 1] + d[s - 1]) / 4)
                  Da = Math.floor((P + e[s - 1] + e[s - 18 - 1] + e[s - 18]) / 4)
                  bb = Math.floor((P + e[s - 18] + e[s - 18 + 1] + e[s + 1]) / 4)
                  Ea = Math.floor((P + e[s + 1] + e[s + 18 + 1] + e[s + 18]) / 4)
                  cb = Math.floor((P + e[s + 18] + e[s + 18 - 1] + e[s - 1]) / 4)
 else (Ba = $a = Ca = ab = Da = bb = Ea = cb = 15)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ca + Ea
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = z
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ba + Da
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = z
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * $a + bb
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = z
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ca + Ea
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = z
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * ab + cb
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = z
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                  a.d[a.o++] = 0 + G + h.bottom[g + 1]
                  a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                  a.d[a.o++] = h.bottom[g + 3]
                  a.d[a.o++] = h.bottom[g + 4]
                  a.d[a.o++] = 100 * Ba + Da
                  a.d[a.o++] = n + 5
                  a.d[a.o++] = 1
                  a.d[a.o++] = z
                  J and if 0 == block.lightSource[A] then Fa = Math.floor((Y + d[r - 1] + d[r - 18 - 1] + d[r - 18]) / 4)
                  db = Math.floor((Y + d[r - 18] + d[r - 18 + 1] + d[r + 1]) / 4)
                  Ga = Math.floor((Y + d[r + 1] + d[r + 18 + 1] + d[r + 18]) / 4)
                  eb = Math.floor((Y + d[r + 18] + d[r + 18 - 1] + d[r - 1]) / 4)
                  Ha = Math.floor((N + e[r - 1] + e[r - 18 - 1] + e[r - 18]) / 4)
                  fb = Math.floor((N + e[r - 18] + e[r - 18 + 1] + e[r + 1]) / 4)
                  Ia = Math.floor((N + e[r + 1] + e[r + 18 + 1] + e[r + 18]) / 4)
                  gb = Math.floor((N + e[r + 18] + e[r + 18 - 1] + e[r - 1]) / 4)
 else (Fa = db = Ga = eb = Ha = fb = Ia = gb = 15)
                  g = 0
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Ga + Ia
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = W
                  g = 5
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1] * fa
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * db + fb
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = aa
                  g = 10
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Fa + Ha
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = $
                  g = 15
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1] * da
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Ga + Ia
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = W
                  g = 20
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1] * ca
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * Fa + Ha
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = $
                  g = 25
                  a.d[a.o++] = 16 * @xPos + E + h.top[g]
                  a.d[a.o++] = 0 + G + h.top[g + 1] * ga
                  a.d[a.o++] = 16 * @zPos + D + h.top[g + 2]
                  a.d[a.o++] = h.top[g + 3]
                  a.d[a.o++] = h.top[g + 4]
                  a.d[a.o++] = 100 * eb + gb
                  a.d[a.o++] = n + 6
                  a.d[a.o++] = 1
                  a.d[a.o++] = k
                else if 10 == t.shapeType and p = t.drawLevel
                  a = B[p]
                  h = t.shape
                  z = 0
                  0 < t.useBiomeColor and (z = @getBiomeColor(E, D, t.useBiomeColor - 1))
                  Z or I or X or H or V or J

                  if 8 == (m[v] & 8)
                    a = if 8 < y and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.front.length
                      a.d[a.o++] = 16 * @xPos + E + h.front[g]
                      a.d[a.o++] = 0 + G + h.front[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.front[g + 2]
                      a.d[a.o++] = h.front[g + 3]
                      a.d[a.o++] = h.front[g + 4]
                      a.d[a.o++] = 100 * y + S
                      a.d[a.o++] = n + 1
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = z
                      g += 5
                  if 2 == (m[v] & 2)
                    a = if 8 < R and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.back.length
                      a.d[a.o++] = 16 * @xPos + E + h.back[g]
                      a.d[a.o++] = 0 + G + h.back[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.back[g + 2]
                      a.d[a.o++] = h.back[g + 3]
                      a.d[a.o++] = h.back[g + 4]
                      a.d[a.o++] = 100 * R + Q
                      a.d[a.o++] = n + 2
                      a.d[a.o++] = 0.8
                      a.d[a.o++] = z
                      g += 5
                  if 1 == (m[v] & 1)
                    a = if 8 < K and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.right.length
                      a.d[a.o++] = 16 * @xPos + E + h.right[g]
                      a.d[a.o++] = 0 + G + h.right[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.right[g + 2]
                      a.d[a.o++] = h.right[g + 3]
                      a.d[a.o++] = h.right[g + 4]
                      a.d[a.o++] = 100 * K + M
                      a.d[a.o++] = n + 3
                      a.d[a.o++] = 0.55
                      a.d[a.o++] = z
                      g += 5
                  if 4 == (m[v] & 4)
                    a = if 8 < L and 0 == p then B[p + 1] else B[p]
                    g = 0
                    while g < h.left.length
                      a.d[a.o++] = 16 * @xPos + E + h.left[g]
                      a.d[a.o++] = 0 + G + h.left[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.left[g + 2]
                      a.d[a.o++] = h.left[g + 3]
                      a.d[a.o++] = h.left[g + 4]
                      a.d[a.o++] = 100 * L + U
                      a.d[a.o++] = n + 4
                      a.d[a.o++] = 0.55
                      a.d[a.o++] = z
                      g += 5
                  if 1 == nb or 0 == m[v]
                    a = B[p]
                    g = 0
                    while g < h.bottom.length
                      a.d[a.o++] = 16 * @xPos + E + h.bottom[g]
                      a.d[a.o++] = 0 + G + h.bottom[g + 1]
                      a.d[a.o++] = 16 * @zPos + D + h.bottom[g + 2]
                      a.d[a.o++] = h.bottom[g + 3]
                      a.d[a.o++] = h.bottom[g + 4]
                      a.d[a.o++] = 100 * T + P
                      a.d[a.o++] = n + 5
                      a.d[a.o++] = 0.3
                      a.d[a.o++] = z
                      g += 5
          E++
        D++
    G++
  undefined != @vbo and 0 == b and undefined != @vbo[0] and @vbo[0].forEach((a) ->
    gl.deleteBuffer a
    return
  )
  @ivbo[0].forEach((a) ->
    gpuMem -= a
    return
  )

  1 == b and undefined != @vbo[1] and @vbo[1].forEach((a) ->
    gl.deleteBuffer a
    return
  )
  @ivbo[1].forEach((a) ->
    gpuMem -= a
    return
  )

  if 0 == b
    @ivbo[0] = []
    @vbo[0] = []
    ba = undefined
    ba = 0
    while 4 > ba
      if 0 < B[ba].o
        Ja = new Float32Array(B[ba].d.buffer, 0, B[ba].o)
        @ivbo[0][ba] = Ja.length
        @vbo[0][ba] = gl.createBuffer()
        gpuMem += Ja.length
        gl.bindBuffer gl.ARRAY_BUFFER, @vbo[0][ba]
        gl.bufferData gl.ARRAY_BUFFER, Ja, gl.STATIC_DRAW
        Ja = null
      ba++
    @isInit = 1
  if 1 == b
    @ivbo[1] = []
    @vbo[1] = []
    ba = 0
    while 4 > ba
      0 < B[ba].o and Ja = new Float32Array(B[ba].d.buffer, 0, B[ba].o)
      @ivbo[1][ba] = Ja.length
      @vbo[1][ba] = gl.createBuffer()
      gpuMem += Ja.length
      gl.bindBuffer(gl.ARRAY_BUFFER, @vbo[1][ba])
      gl.bufferData(gl.ARRAY_BUFFER, Ja, gl.STATIC_DRAW)
      Ja = null
      ba++
    @isInit1 = 1
  !0

Chunk::getBuffer = (b) ->
  `var I`
  `var T`
  `var e`
  f = 0
  c = 0
  d = 0
  e = 0
  m = !1
  l = !1
  p = !1
  q = !1
  x = c = punkty1[0].o = 0
  A = 0
  t = 0
  a = undefined
  B = mcWorld.requestChunk(@xPos + 1, @zPos)
  undefined == B and (q = !0)
  -1 == B and (q = !0)
  if -2 == B
    return !1
  v = mcWorld.requestChunk(@xPos - 1, @zPos)
  undefined == v and (p = !0)
  -1 == v and (p = !0)
  if -2 == v
    return !1
  C = mcWorld.requestChunk(@xPos, @zPos + 1)
  undefined == C and (m = !0)
  -1 == C and (m = !0)
  if -2 == C
    return !1
  u = mcWorld.requestChunk(@xPos, @zPos - 1)
  undefined == u and (l = !0)
  -1 == u and (l = !0)
  if -2 == u
    return !1
  @cacheBiomes = new Float32Array(324)
  w = f = Math.floor(b[1] / 16)
  2 > b[1] - (16 * f) and w--
  0 > w and (w = 0)
  F = f
  13 < b[1] - (16 * f) and F++
  16 < F and (F = 16)
  while w <= F
    if undefined != @section[w]
      r = @section[w]
      s = @section[w - 1]
      n = !1
      undefined == s and (n = !0)
      L = @section[w + 1]
      K = !1
      undefined == L and (K = !0)
      Y = !0
      T = !0
      y = !0
      a = !0
      if !p
        R = v.section[w]
        undefined != R and (Y = !1)
      if !q
        U = B.section[w]
        undefined != U and (T = !1)
      if !l
        M = u.section[w]
        undefined != M and (y = !1)
      if !m
        N = C.section[w]
        undefined != N and (a = !1)
      P = b[0] - 3
      0 > P and (P = 0)
      S = b[0] + 4
      16 < S and (S = 16)
      Q = b[2] - 3
      0 > Q and (Q = 0)
      V = b[2] + 4
      16 < V and (V = 16)
      J = b[1] - (16 * w) - 3
      0 > J and (J = 0)
      Z = b[1] - (16 * w) + 3
      16 < Z and (Z = 16)
      I = undefined
      H = undefined
            I = J
      while I < Z
                f = Q
        while f < V
                    H = P
          while H < S
            d = 256 * I + 16 * f + H
            e = 324 * (I + 1) + 18 * (f + 1) + H + 1
            Chunk.cacheBlock[e] = block[r.blocks[d]].type
            c = d % 2
            Chunk.cacheData[e] = if 0 == c then r.data[d / 2] & 15 & block[r.blocks[d]].mask else r.data[d / 2 - 0.5] >> 4 & 15 & block[r.blocks[d]].mask
            H++
          @cacheBiomes[18 * (I + 1) + f + 1] = @biomes[16 * I + f]
          f++
        I++
      if n
        f = 0
        while 16 > f
                    H = 0
          while 16 > H
            e = 0 + 18 * (f + 1) + H + 1
            Chunk.cacheBlock[e] = if 0 == w then 1 else 0
            H++
          f++
      else
        f = 0
        while 16 > f
                    H = 0
          while 16 > H
            d = 3840 + 16 * f + H
            e = 0 + 18 * (f + 1) + H + 1
            Chunk.cacheBlock[e] = block[s.blocks[d]].type
            H++
          f++
      if K
        f = 0
        while 16 > f
                    H = 0
          while 16 > H
            e = 5508 + 18 * (f + 1) + H + 1
            Chunk.cacheBlock[e] = if 15 == w then 1 else 0
            H++
          f++
      else
        f = 0
        while 16 > f
                    H = 0
          while 16 > H
            d = 0 + 16 * f + H
            e = 5508 + 18 * (f + 1) + H + 1
            Chunk.cacheBlock[e] = block[L.blocks[d]].type
            H++
          f++
      if a
        I = 0
        while 16 > I
                    H = 0
          while 16 > H
            e = 324 * (I + 1) + 306 + H + 1
            Chunk.cacheBlock[e] = if m then 1 else 0
            H++
          I++
      else
        I = 0
        while 16 > I
                    H = 0
          while 16 > H
            d = 256 * I + 0 + H
            e = 324 * (I + 1) + 306 + H + 1
            Chunk.cacheBlock[e] = block[N.blocks[d]].type
            H++
          I++
      if y
        I = 0
        while 16 > I
                    H = 0
          while 16 > H
            e = 324 * (I + 1) + 0 + H + 1
            Chunk.cacheBlock[e] = if l then 1 else 0
            H++
          I++
      else
        I = 0
        while 16 > I
                    H = 0
          while 16 > H
            d = 256 * I + 240 + H
            e = 324 * (I + 1) + 0 + H + 1
            Chunk.cacheBlock[e] = block[M.blocks[d]].type
            H++
          I++
      if Y
        I = 0
        while 16 > I
                    f = 0
          while 16 > f
            e = 324 * (I + 1) + 18 * (f + 1) + 0
            Chunk.cacheBlock[e] = if p then 1 else 0
            f++
          I++
      else
        I = 0
        while 16 > I
                    f = 0
          while 16 > f
            d = 256 * I + 16 * f + 15
            e = 324 * (I + 1) + 18 * (f + 1) + 0
            Chunk.cacheBlock[e] = block[R.blocks[d]].type
            f++
          I++
      if T
        I = 0
        while 16 > I
                    f = 0
          while 16 > f
            e = 324 * (I + 1) + 18 * (f + 1) + 17
            Chunk.cacheBlock[e] = if q then 1 else 0
            f++
          I++
      else
        I = 0
        while 16 > I
                    f = 0
          while 16 > f
            d = 256 * I + 16 * f + 0
            e = 324 * (I + 1) + 18 * (f + 1) + 17
            Chunk.cacheBlock[e] = block[U.blocks[d]].type
            f++
          I++
      X = y = 0
      z = 0
      $ = 0
      aa = 0
      W = 0
      a = 0
      e = undefined
      T = undefined
      k = undefined
      I = undefined
            e = 16 * w
      T = Y = K = L = n = s = !1
      k = d = 0
      I = J
      while I < Z
                f = Q
        while f < V
                    H = P
          while H < S
            if T = Y = K = L = n = s = !1
              y = 324 * (I + 1) + 18 * (f + 1) + H + 1
              c = Chunk.cacheBlock[y]
              0 != c

              X = y + 18
              z = y - 18
              $ = y - 1
              aa = y + 1
              W = y + 324
              a = y - 324
              d = 256 * I + 16 * f + H
              J = @xPos % 5
              0 > J and (J += 5)
              A = @zPos % 5
              0 > A and (A += 5)
              J = 65536 * (e + I) + 256 * (16 * f + H) + 10 * (5 * J + A)
              if 1 == c or 2 == c or 4 == c or 6 == c
                1 != Chunk.cacheBlock[W] and (n = !0)
                1 != Chunk.cacheBlock[a] and (s = !0)
                1 != Chunk.cacheBlock[z] and (T = !0)
                1 != Chunk.cacheBlock[X] and (Y = !0)
                1 != Chunk.cacheBlock[$] and (L = !0)
                1 != Chunk.cacheBlock[aa] and (K = !0)
              else if 3 < c
                1 != Chunk.cacheBlock[W] and Chunk.cacheBlock[W] != c and (n = !0)
                1 != Chunk.cacheBlock[a] and Chunk.cacheBlock[a] != c and (s = !0)
                1 != Chunk.cacheBlock[z] and Chunk.cacheBlock[z] != c and (T = !0)
                1 != Chunk.cacheBlock[X] and Chunk.cacheBlock[X] != c and (Y = !0)
                1 != Chunk.cacheBlock[$] and Chunk.cacheBlock[$] != c and (L = !0)
                1 != Chunk.cacheBlock[aa] and Chunk.cacheBlock[aa] != c and (K = !0)
              else
                H++
                continue
              if L or K or T or Y or s or n
                if a = punkty1[0]
                  A = r.blocks[d]
                  c = d % 2
                  if 0 == c
                    x = r.data[d / 2] & 15 & block[r.blocks[d]].mask
                    k = r.add[d / 2] & 15
                  else
                    x = r.data[d / 2 - 0.5] >> 4 & 15 & block[r.blocks[d]].mask
                    k = r.add[d / 2 - 0.5] >> 4 & 15
                  t = (if undefined == block[A][x] then block[A][0] else block[A][x])
                  undefined != t.shapeType

                  if 1 == t.shapeType
                    y = c = t.shape
                    d = 0
                    1 == t.useBiomeColor and (d = @getBiomeColor(H, f, 0))
                    0 < k and (y = block[200][k - 1].shape)
                    if L
                      k = 0
                      while k < y.front.length
                        a.d[a.o++] = 16 * @xPos + H + y.front[k]
                        a.d[a.o++] = e + I + y.front[k + 1]
                        a.d[a.o++] = 16 * @zPos + f + y.front[k + 2]
                        a.d[a.o++] = c.front[k + 3]
                        a.d[a.o++] = c.front[k + 4]
                        a.d[a.o++] = 0
                        a.d[a.o++] = J + 1
                        a.d[a.o++] = 0.8
                        a.d[a.o++] = d
                        k += 5
                    if K
                      k = 0
                      while k < y.back.length
                        a.d[a.o++] = 16 * @xPos + H + y.back[k]
                        a.d[a.o++] = e + I + y.back[k + 1]
                        a.d[a.o++] = 16 * @zPos + f + y.back[k + 2]
                        a.d[a.o++] = c.back[k + 3]
                        a.d[a.o++] = c.back[k + 4]
                        a.d[a.o++] = 0
                        a.d[a.o++] = J + 2
                        a.d[a.o++] = 0.8
                        a.d[a.o++] = d
                        k += 5
                    if T
                      k = 0
                      while k < y.right.length
                        a.d[a.o++] = 16 * @xPos + H + y.right[k]
                        a.d[a.o++] = e + I + y.right[k + 1]
                        a.d[a.o++] = 16 * @zPos + f + y.right[k + 2]
                        a.d[a.o++] = c.right[k + 3]
                        a.d[a.o++] = c.right[k + 4]
                        a.d[a.o++] = 0
                        a.d[a.o++] = J + 3
                        a.d[a.o++] = 0.55
                        a.d[a.o++] = d
                        k += 5
                    if Y
                      k = 0
                      while k < y.left.length
                        a.d[a.o++] = 16 * @xPos + H + y.left[k]
                        a.d[a.o++] = e + I + y.left[k + 1]
                        a.d[a.o++] = 16 * @zPos + f + y.left[k + 2]
                        a.d[a.o++] = c.left[k + 3]
                        a.d[a.o++] = c.left[k + 4]
                        a.d[a.o++] = 0
                        a.d[a.o++] = J + 4
                        a.d[a.o++] = 0.55
                        a.d[a.o++] = d
                        k += 5
                    if s
                      k = 0
                      while k < y.bottom.length
                        a.d[a.o++] = 16 * @xPos + H + y.bottom[k]
                        a.d[a.o++] = e + I + y.bottom[k + 1]
                        a.d[a.o++] = 16 * @zPos + f + y.bottom[k + 2]
                        a.d[a.o++] = c.bottom[k + 3]
                        a.d[a.o++] = c.bottom[k + 4]
                        a.d[a.o++] = 0
                        a.d[a.o++] = J + 5
                        a.d[a.o++] = 0.3
                        a.d[a.o++] = d
                        k += 5
                    if n
                      k = 0
                      while k < y.top.length
                        a.d[a.o++] = 16 * @xPos + H + y.top[k]
                        a.d[a.o++] = e + I + y.top[k + 1]
                        a.d[a.o++] = 16 * @zPos + f + y.top[k + 2]
                        a.d[a.o++] = c.top[k + 3]
                        a.d[a.o++] = c.top[k + 4]
                        a.d[a.o++] = 0
                        a.d[a.o++] = J + 6
                        a.d[a.o++] = 1
                        a.d[a.o++] = d
                        k += 5
                  else if 2 != t.shapeType and 3 != t.shapeType
                    if 4 == t.shapeType
                      c = t.shape
                      d = @getBiomeColor(H, f, 0)
                      if L
                                                k = 0
                        while k < c.front2.length
                          a.d[a.o++] = 16 * @xPos + H + c.front2[k]
                          a.d[a.o++] = e + I + c.front2[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.front2[k + 2]
                          a.d[a.o++] = c.front2[k + 3]
                          a.d[a.o++] = c.front2[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 1
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.front.length
                          a.d[a.o++] = 16 * @xPos + H + c.front[k]
                          a.d[a.o++] = e + I + c.front[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.front[k + 2]
                          a.d[a.o++] = c.front[k + 3]
                          a.d[a.o++] = c.front[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 1
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = 0
                          k += 5
                      if K
                                                k = 0
                        while k < c.back2.length
                          a.d[a.o++] = 16 * @xPos + H + c.back2[k]
                          a.d[a.o++] = e + I + c.back2[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.back2[k + 2]
                          a.d[a.o++] = c.back2[k + 3]
                          a.d[a.o++] = c.back2[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 2
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.back.length
                          a.d[a.o++] = 16 * @xPos + H + c.back[k]
                          a.d[a.o++] = e + I + c.back[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.back[k + 2]
                          a.d[a.o++] = c.back[k + 3]
                          a.d[a.o++] = c.back[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 2
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = 0
                          k += 5
                      if T
                                                k = 0
                        while k < c.right2.length
                          a.d[a.o++] = 16 * @xPos + H + c.right2[k]
                          a.d[a.o++] = e + I + c.right2[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.right2[k + 2]
                          a.d[a.o++] = c.right2[k + 3]
                          a.d[a.o++] = c.right2[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 3
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.right.length
                          a.d[a.o++] = 16 * @xPos + H + c.right[k]
                          a.d[a.o++] = e + I + c.right[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.right[k + 2]
                          a.d[a.o++] = c.right[k + 3]
                          a.d[a.o++] = c.right[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 3
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = 0
                          k += 5
                      if Y
                                                k = 0
                        while k < c.left2.length
                          a.d[a.o++] = 16 * @xPos + H + c.left2[k]
                          a.d[a.o++] = e + I + c.left2[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.left2[k + 2]
                          a.d[a.o++] = c.left2[k + 3]
                          a.d[a.o++] = c.left2[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 4
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.left.length
                          a.d[a.o++] = 16 * @xPos + H + c.left[k]
                          a.d[a.o++] = e + I + c.left[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.left[k + 2]
                          a.d[a.o++] = c.left[k + 3]
                          a.d[a.o++] = c.left[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 4
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = 0
                          k += 5
                      if s
                        k = 0
                        while k < c.bottom.length
                          a.d[a.o++] = 16 * @xPos + H + c.bottom[k]
                          a.d[a.o++] = e + I + c.bottom[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.bottom[k + 2]
                          a.d[a.o++] = c.bottom[k + 3]
                          a.d[a.o++] = c.bottom[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 5
                          a.d[a.o++] = 0.3
                          a.d[a.o++] = 0
                          k += 5
                      if n
                        k = 0
                        while k < c.top.length
                          a.d[a.o++] = 16 * @xPos + H + c.top[k]
                          a.d[a.o++] = e + I + c.top[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.top[k + 2]
                          a.d[a.o++] = c.top[k + 3]
                          a.d[a.o++] = c.top[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 6
                          a.d[a.o++] = 1
                          a.d[a.o++] = d
                          k += 5
                    else if 8 == t.shapeType
                      c = t.shape
                      d = 0
                      1 == t.useBiomeColor and (d = @getBiomeColor(H, f, 0))
                      W = ''
                      W += Chunk.cacheData[y]
                      W = if Chunk.cacheBlock[y] == Chunk.cacheBlock[X] then W + Chunk.cacheData[X] else W + 'x'
                      W = if Chunk.cacheBlock[y] == Chunk.cacheBlock[z] then W + Chunk.cacheData[z] else W + 'x'
                      W = if Chunk.cacheBlock[y] == Chunk.cacheBlock[$] then W + Chunk.cacheData[$] else W + 'x'
                      W = if Chunk.cacheBlock[y] == Chunk.cacheBlock[aa] then W + Chunk.cacheData[aa] else W + 'x'
                      z = 0
                      X = Chunk.stairsData[W]
                      undefined != X and c = if 3 < Chunk.cacheData[y] then block[A][9].shape else block[A][8].shape
                      z = 1
                      if L
                        k = 0
                        while k < c.front.length
                          a.d[a.o++] = 16 * @xPos + H + c.front[k]
                          a.d[a.o++] = e + I + c.front[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.front[k + 2]
                          a.d[a.o++] = c.front[k + 3]
                          a.d[a.o++] = c.front[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 1
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                      if K
                        k = 0
                        while k < c.back.length
                          a.d[a.o++] = 16 * @xPos + H + c.back[k]
                          a.d[a.o++] = e + I + c.back[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.back[k + 2]
                          a.d[a.o++] = c.back[k + 3]
                          a.d[a.o++] = c.back[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 2
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                      if T
                        k = 0
                        while k < c.right.length
                          a.d[a.o++] = 16 * @xPos + H + c.right[k]
                          a.d[a.o++] = e + I + c.right[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.right[k + 2]
                          a.d[a.o++] = c.right[k + 3]
                          a.d[a.o++] = c.right[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 3
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                      if Y
                        k = 0
                        while k < c.left.length
                          a.d[a.o++] = 16 * @xPos + H + c.left[k]
                          a.d[a.o++] = e + I + c.left[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.left[k + 2]
                          a.d[a.o++] = c.left[k + 3]
                          a.d[a.o++] = c.left[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 4
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                      if s
                        k = 0
                        while k < c.bottom.length
                          a.d[a.o++] = 16 * @xPos + H + c.bottom[k]
                          a.d[a.o++] = e + I + c.bottom[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.bottom[k + 2]
                          a.d[a.o++] = c.bottom[k + 3]
                          a.d[a.o++] = c.bottom[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 5
                          a.d[a.o++] = 0.3
                          a.d[a.o++] = d
                          k += 5
                      if n
                        k = 0
                        while k < c.top.length
                          a.d[a.o++] = 16 * @xPos + H + c.top[k]
                          a.d[a.o++] = e + I + c.top[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.top[k + 2]
                          a.d[a.o++] = c.top[k + 3]
                          a.d[a.o++] = c.top[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 6
                          a.d[a.o++] = 1
                          a.d[a.o++] = d
                          k += 5
                      if 1 == z
                        c = block[A][10].shape
                        $ = z = 0
                        3 < Chunk.cacheData[y] and ($ = -0.5)
                        aa = y = 0
                        while 4 > aa
                          if 0 != X.charCodeAt(aa) - 48
                            z = aa % 2 / 2
                            y = if 1 < aa then 0.5 else 0
                            if L
                              k = 0
                              while k < c.front.length
                                a.d[a.o++] = z + 16 * @xPos + H + c.front[k]
                                a.d[a.o++] = $ + e + I + c.front[k + 1]
                                a.d[a.o++] = y + 16 * @zPos + f + c.front[k + 2]
                                a.d[a.o++] = c.front[k + 3]
                                a.d[a.o++] = c.front[k + 4]
                                a.d[a.o++] = 0
                                a.d[a.o++] = J + 1
                                a.d[a.o++] = 0.8
                                a.d[a.o++] = d
                                k += 5
                            if K
                              k = 0
                              while k < c.back.length
                                a.d[a.o++] = z + 16 * @xPos + H + c.back[k]
                                a.d[a.o++] = $ + e + I + c.back[k + 1]
                                a.d[a.o++] = y + 16 * @zPos + f + c.back[k + 2]
                                a.d[a.o++] = c.back[k + 3]
                                a.d[a.o++] = c.back[k + 4]
                                a.d[a.o++] = 0
                                a.d[a.o++] = J + 2
                                a.d[a.o++] = 0.8
                                a.d[a.o++] = d
                                k += 5
                            if T
                              k = 0
                              while k < c.right.length
                                a.d[a.o++] = z + 16 * @xPos + H + c.right[k]
                                a.d[a.o++] = $ + e + I + c.right[k + 1]
                                a.d[a.o++] = y + 16 * @zPos + f + c.right[k + 2]
                                a.d[a.o++] = c.right[k + 3]
                                a.d[a.o++] = c.right[k + 4]
                                a.d[a.o++] = 0
                                a.d[a.o++] = J + 3
                                a.d[a.o++] = 0.55
                                a.d[a.o++] = d
                                k += 5
                            if Y
                              k = 0
                              while k < c.left.length
                                a.d[a.o++] = z + 16 * @xPos + H + c.left[k]
                                a.d[a.o++] = $ + e + I + c.left[k + 1]
                                a.d[a.o++] = y + 16 * @zPos + f + c.left[k + 2]
                                a.d[a.o++] = c.left[k + 3]
                                a.d[a.o++] = c.left[k + 4]
                                a.d[a.o++] = 0
                                a.d[a.o++] = J + 4
                                a.d[a.o++] = 0.55
                                a.d[a.o++] = d
                                k += 5
                            if s
                              k = 0
                              while k < c.bottom.length
                                a.d[a.o++] = z + 16 * @xPos + H + c.bottom[k]
                                a.d[a.o++] = $ + e + I + c.bottom[k + 1]
                                a.d[a.o++] = y + 16 * @zPos + f + c.bottom[k + 2]
                                a.d[a.o++] = c.bottom[k + 3]
                                a.d[a.o++] = c.bottom[k + 4]
                                a.d[a.o++] = 0
                                a.d[a.o++] = J + 5
                                a.d[a.o++] = 0.3
                                a.d[a.o++] = d
                                k += 5
                            if n
                              k = 0
                              while k < c.top.length
                                a.d[a.o++] = z + 16 * @xPos + H + c.top[k]
                                a.d[a.o++] = $ + e + I + c.top[k + 1]
                                a.d[a.o++] = y + 16 * @zPos + f + c.top[k + 2]
                                a.d[a.o++] = c.top[k + 3]
                                a.d[a.o++] = c.top[k + 4]
                                a.d[a.o++] = 0
                                a.d[a.o++] = J + 6
                                a.d[a.o++] = 1
                                a.d[a.o++] = d
                                k += 5
                          aa++
                    else if 5 == t.shapeType
                      if L or K or T or Y or n or s
                        c = t.shape
                        d = 0
                        1 == t.useBiomeColor and (d = @getBiomeColor(H, f, 0))
                                                k = 0
                        while k < c.front.length
                          if 0 == k % 30
                            if (60 == k or 120 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[X] and 1 != Chunk.cacheBlock[X]
                              k += 25
                                                            k += 5
                              continue
                            if (30 == k or 90 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[z] and 1 != Chunk.cacheBlock[z]
                              k += 25
                                                            k += 5
                              continue
                          a.d[a.o++] = 16 * @xPos + H + c.front[k]
                          a.d[a.o++] = e + I + c.front[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.front[k + 2]
                          a.d[a.o++] = c.front[k + 3]
                          a.d[a.o++] = c.front[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 1
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.back.length
                          if 0 == k % 30
                            if (60 == k or 120 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[X] and 1 != Chunk.cacheBlock[X]
                              k += 25
                                                            k += 5
                              continue
                            if (30 == k or 90 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[z] and 1 != Chunk.cacheBlock[z]
                              k += 25
                                                            k += 5
                              continue
                          a.d[a.o++] = 16 * @xPos + H + c.back[k]
                          a.d[a.o++] = e + I + c.back[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.back[k + 2]
                          a.d[a.o++] = c.back[k + 3]
                          a.d[a.o++] = c.back[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 2
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.right.length
                          if 0 == k % 30
                            if (30 == k or 90 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[$] and 1 != Chunk.cacheBlock[$]
                              k += 25
                                                            k += 5
                              continue
                            if (60 == k or 120 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[aa] and 1 != Chunk.cacheBlock[aa]
                              k += 25
                                                            k += 5
                              continue
                          a.d[a.o++] = 16 * @xPos + H + c.right[k]
                          a.d[a.o++] = e + I + c.right[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.right[k + 2]
                          a.d[a.o++] = c.right[k + 3]
                          a.d[a.o++] = c.right[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 3
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.left.length
                          if 0 == k % 30
                            if (30 == k or 90 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[$] and 1 != Chunk.cacheBlock[$]
                              k += 25
                                                            k += 5
                              continue
                            if (60 == k or 120 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[aa] and 1 != Chunk.cacheBlock[aa]
                              k += 25
                                                            k += 5
                              continue
                          a.d[a.o++] = 16 * @xPos + H + c.left[k]
                          a.d[a.o++] = e + I + c.left[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.left[k + 2]
                          a.d[a.o++] = c.left[k + 3]
                          a.d[a.o++] = c.left[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 4
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.bottom.length
                          if 0 == k % 30
                            if (30 == k or 150 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[z] and 1 != Chunk.cacheBlock[z]
                              k += 25
                                                            k += 5
                              continue
                            if (60 == k or 180 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[X] and 1 != Chunk.cacheBlock[X]
                              k += 25
                                                            k += 5
                              continue
                            if (90 == k or 210 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[$] and 1 != Chunk.cacheBlock[$]
                              k += 25
                                                            k += 5
                              continue
                            if (120 == k or 240 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[aa] and 1 != Chunk.cacheBlock[aa]
                              k += 25
                                                            k += 5
                              continue
                          a.d[a.o++] = 16 * @xPos + H + c.bottom[k]
                          a.d[a.o++] = e + I + c.bottom[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.bottom[k + 2]
                          a.d[a.o++] = c.bottom[k + 3]
                          a.d[a.o++] = c.bottom[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 5
                          a.d[a.o++] = 0.3
                          a.d[a.o++] = d
                          k += 5
                                                k = 0
                        while k < c.top.length
                          if 0 == k % 30
                            if (30 == k or 150 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[z] and 1 != Chunk.cacheBlock[z]
                              k += 25
                                                            k += 5
                              continue
                            if (60 == k or 180 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[X] and 1 != Chunk.cacheBlock[X]
                              k += 25
                                                            k += 5
                              continue
                            if (90 == k or 210 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[$] and 1 != Chunk.cacheBlock[$]
                              k += 25
                                                            k += 5
                              continue
                            if (120 == k or 240 == k) and Chunk.cacheBlock[y] != Chunk.cacheBlock[aa] and 1 != Chunk.cacheBlock[aa]
                              k += 25
                                                            k += 5
                              continue
                          a.d[a.o++] = 16 * @xPos + H + c.top[k]
                          a.d[a.o++] = e + I + c.top[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.top[k + 2]
                          a.d[a.o++] = c.top[k + 3]
                          a.d[a.o++] = c.top[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 6
                          a.d[a.o++] = 1
                          a.d[a.o++] = d
                          k += 5
                    else if 6 == t.shapeType
                      if c = t.shape
                        d = 0
                        1 == t.useBiomeColor and (d = @getBiomeColor(H, f, 0))
                        L or K or T or Y or s or n

                        if 5 == x
                          k = 0
                          while k < c.front.length
                            a.d[a.o++] = 16 * @xPos + H + c.front[k]
                            a.d[a.o++] = e + I + c.front[k + 1]
                            a.d[a.o++] = 16 * @zPos + f + c.front[k + 2]
                            a.d[a.o++] = c.front[k + 3]
                            a.d[a.o++] = c.front[k + 4]
                            a.d[a.o++] = 0
                            a.d[a.o++] = J + 1
                            a.d[a.o++] = 0.8
                            a.d[a.o++] = d
                            k += 5
                        if 4 == x
                          k = 0
                          while k < c.back.length
                            a.d[a.o++] = 16 * @xPos + H + c.back[k]
                            a.d[a.o++] = e + I + c.back[k + 1]
                            a.d[a.o++] = 16 * @zPos + f + c.back[k + 2]
                            a.d[a.o++] = c.back[k + 3]
                            a.d[a.o++] = c.back[k + 4]
                            a.d[a.o++] = 0
                            a.d[a.o++] = J + 2
                            a.d[a.o++] = 0.8
                            a.d[a.o++] = d
                            k += 5
                        if 3 == x
                          k = 0
                          while k < c.right.length
                            a.d[a.o++] = 16 * @xPos + H + c.right[k]
                            a.d[a.o++] = e + I + c.right[k + 1]
                            a.d[a.o++] = 16 * @zPos + f + c.right[k + 2]
                            a.d[a.o++] = c.right[k + 3]
                            a.d[a.o++] = c.right[k + 4]
                            a.d[a.o++] = 0
                            a.d[a.o++] = J + 3
                            a.d[a.o++] = 0.55
                            a.d[a.o++] = d
                            k += 5
                        if 2 == x
                          k = 0
                          while k < c.left.length
                            a.d[a.o++] = 16 * @xPos + H + c.left[k]
                            a.d[a.o++] = e + I + c.left[k + 1]
                            a.d[a.o++] = 16 * @zPos + f + c.left[k + 2]
                            a.d[a.o++] = c.left[k + 3]
                            a.d[a.o++] = c.left[k + 4]
                            a.d[a.o++] = 0
                            a.d[a.o++] = J + 4
                            a.d[a.o++] = 0.55
                            a.d[a.o++] = d
                            k += 5
                    else if 9 == t.shapeType
                      c = t.shape
                      d = 0
                      1 == t.useBiomeColor and (d = @getBiomeColor(H, f, 2))
                      if L
                        k = 0
                        while k < c.front.length
                          a.d[a.o++] = 16 * @xPos + H + c.front[k]
                          a.d[a.o++] = e + I + c.front[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.front[k + 2]
                          a.d[a.o++] = c.front[k + 3]
                          a.d[a.o++] = c.front[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 1
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                      if K
                        k = 0
                        while k < c.back.length
                          a.d[a.o++] = 16 * @xPos + H + c.back[k]
                          a.d[a.o++] = e + I + c.back[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.back[k + 2]
                          a.d[a.o++] = c.back[k + 3]
                          a.d[a.o++] = c.back[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 2
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                      if T
                        k = 0
                        while k < c.right.length
                          a.d[a.o++] = 16 * @xPos + H + c.right[k]
                          a.d[a.o++] = e + I + c.right[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.right[k + 2]
                          a.d[a.o++] = c.right[k + 3]
                          a.d[a.o++] = c.right[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 3
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                      if Y
                        k = 0
                        while k < c.left.length
                          a.d[a.o++] = 16 * @xPos + H + c.left[k]
                          a.d[a.o++] = e + I + c.left[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.left[k + 2]
                          a.d[a.o++] = c.left[k + 3]
                          a.d[a.o++] = c.left[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 4
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                      if s
                        k = 0
                        while k < c.bottom.length
                          a.d[a.o++] = 16 * @xPos + H + c.bottom[k]
                          a.d[a.o++] = e + I + c.bottom[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.bottom[k + 2]
                          a.d[a.o++] = c.bottom[k + 3]
                          a.d[a.o++] = c.bottom[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 5
                          a.d[a.o++] = 0.3
                          a.d[a.o++] = d
                          k += 5
                      if n
                        k = 0
                        while k < c.top.length
                          a.d[a.o++] = 16 * @xPos + H + c.top[k]
                          a.d[a.o++] = e + I + c.top[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.top[k + 2]
                          a.d[a.o++] = c.top[k + 3]
                          a.d[a.o++] = c.top[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 6
                          a.d[a.o++] = 1
                          a.d[a.o++] = d
                          k += 5
                    else if 10 == t.shapeType and c = t.shape
                      d = 0
                      1 == t.useBiomeColor and (d = @getBiomeColor(H, f, 0))
                      L or K or T or Y or s or n

                      if 8 == (Chunk.cacheData[y] & 8)
                        k = 0
                        while k < c.front.length
                          a.d[a.o++] = 16 * @xPos + H + c.front[k]
                          a.d[a.o++] = e + I + c.front[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.front[k + 2]
                          a.d[a.o++] = c.front[k + 3]
                          a.d[a.o++] = c.front[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 1
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                      if 2 == (Chunk.cacheData[y] & 2)
                        k = 0
                        while k < c.back.length
                          a.d[a.o++] = 16 * @xPos + H + c.back[k]
                          a.d[a.o++] = e + I + c.back[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.back[k + 2]
                          a.d[a.o++] = c.back[k + 3]
                          a.d[a.o++] = c.back[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 2
                          a.d[a.o++] = 0.8
                          a.d[a.o++] = d
                          k += 5
                      if 1 == (Chunk.cacheData[y] & 1)
                        k = 0
                        while k < c.right.length
                          a.d[a.o++] = 16 * @xPos + H + c.right[k]
                          a.d[a.o++] = e + I + c.right[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.right[k + 2]
                          a.d[a.o++] = c.right[k + 3]
                          a.d[a.o++] = c.right[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 3
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                      if 4 == (Chunk.cacheData[y] & 4)
                        k = 0
                        while k < c.left.length
                          a.d[a.o++] = 16 * @xPos + H + c.left[k]
                          a.d[a.o++] = e + I + c.left[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.left[k + 2]
                          a.d[a.o++] = c.left[k + 3]
                          a.d[a.o++] = c.left[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 4
                          a.d[a.o++] = 0.55
                          a.d[a.o++] = d
                          k += 5
                      if 1 == Chunk.cacheBlock[W] or 0 == Chunk.cacheData[y]
                        k = 0
                        while k < c.bottom.length
                          a.d[a.o++] = 16 * @xPos + H + c.bottom[k]
                          a.d[a.o++] = e + I + c.bottom[k + 1]
                          a.d[a.o++] = 16 * @zPos + f + c.bottom[k + 2]
                          a.d[a.o++] = c.bottom[k + 3]
                          a.d[a.o++] = c.bottom[k + 4]
                          a.d[a.o++] = 0
                          a.d[a.o++] = J + 5
                          a.d[a.o++] = 0.3
                          a.d[a.o++] = d
                          k += 5
            H++
          f++
        I++
    w++
  if 0 < punkty1[0].o then new Float32Array(punkty1[0].d.buffer, 0, punkty1[0].o) else !1

Mob::getEye = ->
  [
    @pos[0] + @eyePos[0]
    @pos[1] + @eyePos[1]
    @pos[2] + @eyePos[2]
  ]

Mob::getPos = ->
  @pos

Mob::setPosRot = (b, f) ->
  undefined != b and @pos[0] = b[0]
  @pos[1] = b[1]
  @pos[2] = b[2]
  undefined != f and @rot[0] = f[0]
  @rot[1] = f[1]
  @rot[2] = f[2]
  return

Mob::getTarget = ->
  [
    @pos[0] + @eyePos[0] + Math.sin(@rot[0]) * Math.cos(@rot[1])
    @pos[1] + @eyePos[1] + 1 * Math.sin(@rot[1])
    @pos[2] + @eyePos[2] + Math.cos(@rot[0]) * Math.cos(@rot[1])
  ]

Mob::render = ->
  b = gluu.lineShader
  gl.useProgram b
  mat4.identity gluu.mvMatrix
  mat4.translate gluu.mvMatrix, gluu.mvMatrix, [
    @pos[0]
    @pos[1]
    @pos[2]
  ]
  gl.uniformMatrix4fv b.pMatrixUniform, !1, gluu.pMatrix
  gl.uniformMatrix4fv b.mvMatrixUniform, !1, gluu.mvMatrix
  undefined != @shape and (if undefined == @shapeVbo
    @shapeVbo = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, @shapeVbo)
    gl.bufferData(gl.ARRAY_BUFFER, @shape, gl.STATIC_DRAW)
  else
    gl.bindBuffer(gl.ARRAY_BUFFER, @shapeVbo)
    gl.vertexAttribPointer(b.vertexPositionAttribute, 3, gl.FLOAT, !1, 20, 0)
    gl.vertexAttribPointer(b.lightAttribute, 4, gl.FLOAT, !1, 20, 0)
    gl.vertexAttribPointer(b.textureCoordAttribute, 2, gl.FLOAT, !1, 20, 12)
    gl.drawArrays(gl.TRIANGLES, 0, 36)
  )
  return

Player.prototype = Mob.prototype
Player::shape = new Float32Array([
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  0.01
  0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  -0.3
  0.01
  0.3
  0
  0
  -0.3
  0.01
  -0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  -0.3
  0.01
  0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  0.3
  0.01
  -0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  0.3
  1.8
  -0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  -0.3
  1.8
  -0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  0.3
  1.8
  0.3
  0
  0
  -0.3
  1.8
  0.3
  0
  0
  0.3
  0.01
  0.3
  0
  0
])

Pointer::render = ->
  b = gluu.lineShader
  gl.useProgram b
  mat4.identity gluu.mvMatrix
  mat4.identity gluu.pMatrix
  gl.uniformMatrix4fv b.pMatrixUniform, !1, gluu.pMatrix
  gl.uniformMatrix4fv b.mvMatrixUniform, !1, gluu.mvMatrix
  if undefined == @vbol then @vbol = gl.createBuffer()
  b = new Float32Array([
    -0.03
    0
    0
    0
    0
    0.03
    0
    0
    0
    0
    0
    -0.05
    0
    0
    0
    0
    0.05
    0
    0
    0
  ])
  @vbol = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, @vbol)
  gl.bufferData(gl.ARRAY_BUFFER, b, gl.STATIC_DRAW)
 else gl.bindBuffer(gl.ARRAY_BUFFER, @vbol)
  gl.vertexAttribPointer(b.vertexPositionAttribute, 3, gl.FLOAT, !1, 20, 0)
  gl.vertexAttribPointer(b.lightAttribute, 4, gl.FLOAT, !1, 20, 0)
  gl.vertexAttribPointer(b.textureCoordAttribute, 2, gl.FLOAT, !1, 20, 12)
  gl.drawArrays(gl.LINES, 0, 4)
  return

SelectionBox::render = (b) ->
  f = gluu.lineShader
  gl.useProgram f
  mat4.perspective gluu.pMatrix, camera.fovy, gl.viewportWidth / gl.viewportHeight, 0.1, 6e3
  c = camera.getMatrix()
  mat4.multiply gluu.pMatrix, gluu.pMatrix, c
  mat4.identity gluu.mvMatrix
  mat4.translate gluu.mvMatrix, gluu.mvMatrix, [
    16 * b.chx + b.x
    b.y
    16 * b.chz + b.z
  ]
  gl.uniformMatrix4fv f.pMatrixUniform, !1, gluu.pMatrix
  gl.uniformMatrix4fv f.mvMatrixUniform, !1, gluu.mvMatrix
  if undefined == @vboBox then b = new Float32Array([
    0
    0
    0
    0
    0
    0
    1
    0
    0
    0
    0
    1
    0
    0
    0
    1
    1
    0
    0
    0
    1
    1
    0
    0
    0
    1
    0
    0
    0
    0
    1
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    0
    1
    0
    0
    0
    1
    1
    0
    0
    0
    1
    1
    0
    0
    1
    1
    1
    0
    0
    1
    1
    1
    0
    0
    1
    0
    1
    0
    0
    1
    0
    1
    0
    0
    0
    0
    1
    0
    0
    0
    0
    1
    0
    0
    0
    0
    0
    0
    0
    1
    1
    1
    0
    0
    1
    1
    0
    0
    0
    0
    1
    1
    0
    0
    0
    1
    0
    0
    0
    1
    0
    1
    0
    0
    1
    0
    0
    0
    0
  ])
  @vboBox = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, @vboBox)
  gl.bufferData(gl.ARRAY_BUFFER, b, gl.STATIC_DRAW)
 else gl.bindBuffer(gl.ARRAY_BUFFER, @vboBox)
  gl.vertexAttribPointer(f.vertexPositionAttribute, 3, gl.FLOAT, !1, 20, 0)
  gl.vertexAttribPointer(f.lightAttribute, 4, gl.FLOAT, !1, 20, 0)
  gl.vertexAttribPointer(f.textureCoordAttribute, 2, gl.FLOAT, !1, 20, 12)
  gl.drawArrays(gl.LINES, 0, 24)
  return

gl = undefined
gluu = new Gluu
glCanvas = undefined
lastTarget = !1
codeEditor = null
settings = new Settings
biomes = undefined
mcWorld = undefined
block = undefined
blockTexture = undefined
blockSelection = undefined
camera = undefined
initTexture = !1
gpuMem = 0
lastTime = 0
firstTime = 0
fps = 0
newSec = !1
sec = 0
iLag = 0
click = 0
selectE = !1
selectT = 0
selectTt = 1
textDiv = null
useBlock = {}
punkty1 = []
pointer = new Pointer
selectBox = new SelectionBox
