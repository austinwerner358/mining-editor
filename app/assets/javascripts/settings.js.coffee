Settings = ->

Settings::initSettings = ->
  #### Load JSON Settings ####
  jsonSettings = undefined
  jsonSettings = JSON.parse(Readfile.readTxt('config/settings.json'))
  console.log jsonSettings
  #### Get URL Parameters ####
  urlParams = {}
  # urlParams = {distanceLevel: '10-10-10', pos: '20+80+70', rot: '-5.5+0.0', skyColor: '230-248-255'}
  window.location.search.substr(1).split('&').forEach (c) ->
    urlParams[c.split('=')[0]] = c.split('=')[1]
    return
  window.location.hash.substr(1).split('&').forEach (c) ->
    urlParams[c.split('=')[0]] = c.split('=')[1]
    return
  #### Set Path To World ####
  @gameRoot = jsonSettings.gameRoot.value
  undefined != urlParams.gameRoot and jsonSettings.gameRoot.url and (@gameRoot = urlParams.gameRoot)
  #### Set World Name ####
  @worldName = $('#worldName').val()
  if !@worldName
    @worldName = jsonSettings.worldName.value
  undefined != urlParams.worldName and jsonSettings.worldName.url and (@worldName = urlParams.worldName)
  console.log('Selected World Name: ' + @worldName)
  #### Set Distance Level ####
  @distanceLevel = [
    10
    10
    10
  ]
  if undefined != jsonSettings.distanceLevel
    @distanceLevel[0] = parseInt(jsonSettings.distanceLevel.value.split('-')[0]) or @distanceLevel[0]
    @distanceLevel[1] = parseInt(jsonSettings.distanceLevel.value.split('-')[1]) or @distanceLevel[1]
    @distanceLevel[2] = parseInt(jsonSettings.distanceLevel.value.split('-')[2]) or @distanceLevel[2]
  if undefined != urlParams.distanceLevel and jsonSettings.distanceLevel.url
    @distanceLevel[0] = parseInt(urlParams.distanceLevel.split('-')[0]) or @distanceLevel[0]
    @distanceLevel[1] = parseInt(urlParams.distanceLevel.split('-')[1]) or @distanceLevel[1]
    @distanceLevel[2] = parseInt(urlParams.distanceLevel.split('-')[2]) or @distanceLevel[2]
  # 10 > @distanceLevel[0] and (@distanceLevel[0] = 10)
  @distanceLevel[1] < @distanceLevel[0] and (@distanceLevel[1] = @distanceLevel[0])
  @distanceLevel[2] < @distanceLevel[0] and (@distanceLevel[2] = @distanceLevel[0])
  100 < @distanceLevel[0] and (@distanceLevel[0] = 100)
  100 < @distanceLevel[1] and (@distanceLevel[1] = 100)
  100 < @distanceLevel[2] and (@distanceLevel[2] = 100)
  #### Set Sensitivity ####
  @sensitivity = 50
  undefined != jsonSettings.mouseSensitivity and (@sensitivity = parseInt(jsonSettings.mouseSensitivity.value))
  undefined != urlParams.mouseSensitivity and jsonSettings.mouseSensitivity.url and (@sensitivity = parseInt(urlParams.mouseSensitivity))
  10 > @sensitivity and (@sensitivity = 10)
  100 < @sensitivity and (@sensitivity = 100)
  #### Set Position ####
  @pos = [
    0
    100
    0
  ]
  dbPos = $('#dbPos').val()
  if !!dbPos
    @pos[0] = parseInt(dbPos.split('+')[0]) or @pos[0]
    @pos[1] = parseInt(dbPos.split('+')[1]) or @pos[1]
    @pos[2] = parseInt(dbPos.split('+')[2]) or @pos[2]
  else if undefined != jsonSettings.pos && !!jsonSettings.pos[@worldName]
    @pos[0] = parseFloat(jsonSettings.pos[@worldName].split('+')[0]) or @pos[0]
    @pos[1] = parseFloat(jsonSettings.pos[@worldName].split('+')[1]) or @pos[1]
    @pos[2] = parseFloat(jsonSettings.pos[@worldName].split('+')[2]) or @pos[2]
  if undefined != urlParams.pos and jsonSettings.pos.url
    @pos[0] = parseFloat(urlParams.pos.split('+')[0]) or @pos[0]
    @pos[1] = parseFloat(urlParams.pos.split('+')[1]) or @pos[1]
    @pos[2] = parseFloat(urlParams.pos.split('+')[2]) or @pos[2]
  #### Set Rotation ####
  @rot = [
    0
    0
  ]
  if undefined != jsonSettings.rot && !!jsonSettings.rot[@worldName]
    @rot[0] = parseFloat(jsonSettings.rot[@worldName].split('+')[0]) or @rot[0]
    @rot[1] = parseFloat(jsonSettings.rot[@worldName].split('+')[1]) or @rot[1]
  if undefined != urlParams.rot and jsonSettings.rot.url
    @rot[0] = parseFloat(urlParams.rot.split('+')[0]) or @rot[0]
    @rot[1] = parseFloat(urlParams.rot.split('+')[1]) or @rot[1]
  #### Set Sky Color ####
  @skyColor = new Float32Array([
    1
    1
    1
    1
  ])
  if undefined != jsonSettings.skyColor
    @skyColor[0] = parseFloat(jsonSettings.skyColor.value.split('-')[0]) / 255 or @skyColor[0]
    @skyColor[1] = parseFloat(jsonSettings.skyColor.value.split('-')[1]) / 255 or @skyColor[1]
    @skyColor[2] = parseFloat(jsonSettings.skyColor.value.split('-')[2]) / 255 or @skyColor[2]
  if undefined != urlParams.skyColor and jsonSettings.skyColor.url
    @skyColor[0] = parseFloat(urlParams.skyColor.split('-')[0]) / 255 or @skyColor[0]
    @skyColor[1] = parseFloat(urlParams.skyColor.split('-')[1]) / 255 or @skyColor[1]
    @skyColor[2] = parseFloat(urlParams.skyColor.split('-')[2]) / 255 or @skyColor[2]
  #### Set Sun Level ####
  @sun = 1
  undefined != jsonSettings.sun and (@sun = parseFloat(jsonSettings.sun.value) + 0.01 or @sun)
  undefined != urlParams.sun and jsonSettings.sun.url and (@sun = parseFloat(urlParams.sun) + 0.01 or @sun)
  1 < @sun and (@sun = 1)
  @brightness = 0.3
  undefined != jsonSettings.brightness and (@brightness = parseFloat(jsonSettings.brightness.value) + 0.01 or @brightness)
  undefined != urlParams.brightness and jsonSettings.brightness.url and (@brightness = parseFloat(urlParams.brightness) + 0.01 or @brightness)
  @loadLag = 3
  undefined != jsonSettings.loadLag and (@loadLag = parseFloat(jsonSettings.loadLag.value) or @loadLag)
  undefined != urlParams.loadLag and jsonSettings.loadLag.url and (@loadLag = parseFloat(urlParams.loadLag) or @loadLag)
  @loadSpeed = 1
  undefined != jsonSettings.loadSpeed and (@loadSpeed = parseFloat(jsonSettings.loadSpeed.value) or @loadSpeed)
  undefined != urlParams.loadSpeed and jsonSettings.loadSpeed.url and (@loadSpeed = parseFloat(urlParams.loadSpeed) or @loadSpeed)
  @worldShader = 'standard'
  undefined != jsonSettings.worldShader and (@worldShader = jsonSettings.worldShader.value or @worldShader)
  undefined != urlParams.worldShader and jsonSettings.worldShader.url and (@worldShader = urlParams.worldShader or @worldShader)
  @edit = !0
  undefined != jsonSettings.edit and (@edit = jsonSettings.edit.value)
  undefined != jsonSettings.edit and jsonSettings.edit.url and 'true' == urlParams.edit and (@edit = !0)
  'false' == urlParams.edit and (@edit = !1)
  @lightInit = !1
  undefined != jsonSettings.lightInit and (@lightInit = jsonSettings.lightInit.value)
  undefined != jsonSettings.lightInit and jsonSettings.lightInit.url and 'true' == urlParams.lightInit and (@lightInit = !0)
  'false' == urlParams.lightInit and (@lightInit = !1)
  @cameraType = jsonSettings.camera.value
  undefined != urlParams.camera and jsonSettings.camera.url and (@cameraType = urlParams.camera)
  @pointerOn = true

Settings::togglePointer = ->
  document.getElementById('togglePointer').checked = @pointerOn = !@pointerOn

Settings::toggleEditMode = ->
  document.getElementById('togglePointer').checked = document.getElementById('toggleEditMode').checked = @pointerOn = @edit = !@edit

Settings::setDistanceLevel = (b) ->
  @distanceLevel = [
    b
    b
    b
  ]
  document.getElementById('setDstLvl_val').innerHTML = @distanceLevel[0]
  @getSettingsURL()

Settings::setSkyColor = (b) ->
  @skyColor[0] = b[0]
  @skyColor[1] = b[1]
  @skyColor[2] = b[2]
  @getSettingsURL()

Settings::setSun = (b) ->
  @sun = b
  document.getElementById('setSun_val').innerHTML = @sun
  @getSettingsURL()

Settings::setBrightness = (b) ->
  @brightness = b
  document.getElementById('setBrightness_val').innerHTML = @brightness
  @getSettingsURL()

Settings::getSettingsURL = ->
  b = document.location.href.split(/#/)[0]
  b = b.split(/\?/)
  f = if undefined == b[1] then [] else b[1].split(/&/)
  c = b[0] + '?'
  d = {}
  e = this
  f.forEach (b) ->
    c += '&'
    if 'sun' == b.split(RegExp('='))[0].toLowerCase()
      d.sun = !0
      c += 'sun=' + e.sun
    else
      if 'skycolor' == b.split(RegExp('='))[0].toLowerCase()
        d.skyColor = !0
        c += 'skyColor=' + Math.floor(255 * e.skyColor[0]) + '-' + Math.floor(255 * e.skyColor[1]) + '-' + Math.floor(255 * e.skyColor[2])
      else
        if 'brightness' == b.split(RegExp('='))[0].toLowerCase()
          d.brightness = !0
          c += 'brightness=' + e.brightness
        else
          if 'worldshader' == b.split(RegExp('='))[0].toLowerCase()
            d.worldshader = !0
            c += 'worldShader=' + e.worldShader
          else
            if 'distancelevel' == b.split(RegExp('='))[0].toLowerCase()
              d.distancelevel = !0
              c += 'distanceLevel=' + e.distanceLevel[0]
            else
              c += b
    return
  !0 != d.sun and (c += '&sun=' + @sun)
  !0 != d.worldshader and (c += '&worldShader=' + @worldShader)
  !0 != d.brightness and (c += '&brightness=' + @brightness)
  !0 != d.distancelevel and (c += '&distanceLevel=' + @distanceLevel[0])
  !0 != d.skyColor and (c += '&skyColor=' + Math.floor(255 * @skyColor[0]) + '-' + Math.floor(255 * @skyColor[1]) + '-' + Math.floor(255 * @skyColor[2]))
  document.getElementById('settingsURL').value = c + window.location.hash

Settings::setHashURL = (b, f, c) ->
  window.location.hash = 'pos=' + b[0].toFixed(2) + '+' + b[1].toFixed(2) + '+' + b[2].toFixed(2) + '&rot=' + f[0].toFixed(2) + '+' + f[1].toFixed(2) + '&camera=' + c

window.settings = new Settings
