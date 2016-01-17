Settings = ->

Settings::initSettings = ->
  rawSettings = undefined
  # urlParams = {distanceLevel: '10-10-10', pos: '20+80+70', rot: '-5.5+0.0', skyColor: '230-248-255'}
  urlParams = {}
  window.location.search.substr(1).split('&').forEach (c) ->
    urlParams[c.split('=')[0]] = c.split('=')[1]
    return
  window.location.hash.substr(1).split('&').forEach (c) ->
    urlParams[c.split('=')[0]] = c.split('=')[1]
    return
  rawSettings = JSON.parse(Readfile.readTxt('config/settings.json'))
  console.log rawSettings
  @gameRoot = rawSettings.gameroot.value
  undefined != urlParams.gameroot and rawSettings.gameroot.url and (@gameRoot = urlParams.gameroot)
  @worldName = $('#worldName').val()
  if !@worldName
    console.log('Selected World Name:' + @worldName)
    @worldName = rawSettings.worldname.value
  undefined != urlParams.worldname and rawSettings.worldname.url and (@worldName = urlParams.worldname)
  @distanceLevel = [
    10
    10
    10
  ]
  undefined != rawSettings.distanceLevel and (@distanceLevel[0] = parseInt(rawSettings.distanceLevel.value.split('-')[0]) or @distanceLevel[0])
  @distanceLevel[1] = parseInt(rawSettings.distanceLevel.value.split('-')[1]) or @distanceLevel[1]
  @distanceLevel[2] = parseInt(rawSettings.distanceLevel.value.split('-')[2]) or @distanceLevel[2]
  if undefined != urlParams.distanceLevel and rawSettings.distanceLevel.url and (@distanceLevel[0] = parseInt(urlParams.distanceLevel.split('-')[0]) or @distanceLevel[0])
    @distanceLevel[1] = parseInt(urlParams.distanceLevel.split('-')[1]) or @distanceLevel[1]
    @distanceLevel[2] = parseInt(urlParams.distanceLevel.split('-')[2]) or @distanceLevel[2]
  10 > @distanceLevel[0] and (@distanceLevel[0] = 10)
  @distanceLevel[1] < @distanceLevel[0] and (@distanceLevel[1] = @distanceLevel[0])
  @distanceLevel[2] < @distanceLevel[0] and (@distanceLevel[2] = @distanceLevel[0])
  100 < @distanceLevel[0] and (@distanceLevel[0] = 100)
  100 < @distanceLevel[1] and (@distanceLevel[1] = 100)
  100 < @distanceLevel[2] and (@distanceLevel[2] = 100)
  @sensitivity = 50
  undefined != rawSettings.mouseSensitivity and (@sensitivity = parseInt(rawSettings.mouseSensitivity.value))
  undefined != urlParams.mouseSensitivity and rawSettings.mouseSensitivity.url and (@sensitivity = parseInt(urlParams.mouseSensitivity))
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
  undefined != rawSettings.pos and (@pos[0] = parseFloat(rawSettings.pos.value.split('+')[0]) or @pos[0])
  @pos[1] = parseFloat(rawSettings.pos.value.split('+')[1]) or @pos[1]
  @pos[2] = parseFloat(rawSettings.pos.value.split('+')[2]) or @pos[2]
  if undefined != urlParams.pos and rawSettings.pos.url and (@pos[0] = parseFloat(urlParams.pos.split('+')[0]) or @pos[0])
    @pos[1] = parseFloat(urlParams.pos.split('+')[1]) or @pos[1]
    @pos[2] = parseFloat(urlParams.pos.split('+')[2]) or @pos[2]
  undefined != rawSettings.rot and (@rot[0] = parseFloat(rawSettings.rot.value.split('+')[0]) or @rot[0])
  @rot[1] = parseFloat(rawSettings.rot.value.split('+')[1]) or @rot[1]
  if undefined != urlParams.rot and rawSettings.rot.url and (@rot[0] = parseFloat(urlParams.rot.split('+')[0]) or @rot[0])
    @rot[1] = parseFloat(urlParams.rot.split('+')[1]) or @rot[1]
  @skyColor = new Float32Array([
    1
    1
    1
    1
  ])
  undefined != rawSettings.skyColor and (@skyColor[0] = parseFloat(rawSettings.skyColor.value.split('-')[0]) / 255 or @skyColor[0])
  @skyColor[1] = parseFloat(rawSettings.skyColor.value.split('-')[1]) / 255 or @skyColor[1]
  @skyColor[2] = parseFloat(rawSettings.skyColor.value.split('-')[2]) / 255 or @skyColor[2]
  if undefined != urlParams.skyColor and rawSettings.skyColor.url and (@skyColor[0] = parseFloat(urlParams.skyColor.split('-')[0]) / 255 or @skyColor[0])
    @skyColor[1] = parseFloat(urlParams.skyColor.split('-')[1]) / 255 or @skyColor[1]
    @skyColor[2] = parseFloat(urlParams.skyColor.split('-')[2]) / 255 or @skyColor[2]
  @sun = 1
  undefined != rawSettings.sun and (@sun = parseFloat(rawSettings.sun.value) + 0.01 or @sun)
  undefined != urlParams.sun and rawSettings.sun.url and (@sun = parseFloat(urlParams.sun) + 0.01 or @sun)
  1 < @sun and (@sun = 1)
  @brightness = 0.3
  undefined != rawSettings.brightness and (@brightness = parseFloat(rawSettings.brightness.value) + 0.01 or @brightness)
  undefined != urlParams.brightness and rawSettings.brightness.url and (@brightness = parseFloat(urlParams.brightness) + 0.01 or @brightness)
  @loadLag = 3
  undefined != rawSettings.loadLag and (@loadLag = parseFloat(rawSettings.loadLag.value) or @loadLag)
  undefined != urlParams.loadLag and rawSettings.loadLag.url and (@loadLag = parseFloat(urlParams.loadLag) or @loadLag)
  @loadSpeed = 1
  undefined != rawSettings.loadSpeed and (@loadSpeed = parseFloat(rawSettings.loadSpeed.value) or @loadSpeed)
  undefined != urlParams.loadSpeed and rawSettings.loadSpeed.url and (@loadSpeed = parseFloat(urlParams.loadSpeed) or @loadSpeed)
  @worldShader = 'standard'
  undefined != rawSettings.worldShader and (@worldShader = rawSettings.worldShader.value or @worldShader)
  undefined != urlParams.worldShader and rawSettings.worldShader.url and (@worldShader = urlParams.worldShader or @worldShader)
  @edit = !0
  undefined != rawSettings.edit and (@edit = rawSettings.edit.value)
  undefined != rawSettings.edit and rawSettings.edit.url and 'true' == urlParams.edit and (@edit = !0)
  'false' == urlParams.edit and (@edit = !1)
  @lightInit = !1
  undefined != rawSettings.lightInit and (@lightInit = rawSettings.lightInit.value)
  undefined != rawSettings.lightInit and rawSettings.lightInit.url and 'true' == urlParams.lightInit and (@lightInit = !0)
  'false' == urlParams.lightInit and (@lightInit = !1)
  @cameraType = rawSettings.camera.value
  undefined != urlParams.camera and rawSettings.camera.url and (@cameraType = urlParams.camera)
  return

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
  return

Settings::setHashURL = (b, f, c) ->
  window.location.hash = 'pos=' + b[0].toFixed(2) + '+' + b[1].toFixed(2) + '+' + b[2].toFixed(2) + '&rot=' + f[0].toFixed(2) + '+' + f[1].toFixed(2) + '&camera=' + c
  return

window.settings = new Settings
