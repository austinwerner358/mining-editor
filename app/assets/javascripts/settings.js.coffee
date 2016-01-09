Settings = ->
  b = undefined
  f = undefined
  b = undefined
  f = undefined
  b = {distanceLevel: '10-10-10', pos: '20+80+70', rot: '-5.5+0.0', skyColor: '230-248-255'}
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
  undefined != f.distanceLevel and (@distanceLevel[0] = parseInt(f.distanceLevel.value.split('-')[0]) or @distanceLevel[0])
  @distanceLevel[1] = parseInt(f.distanceLevel.value.split('-')[1]) or @distanceLevel[1]
  @distanceLevel[2] = parseInt(f.distanceLevel.value.split('-')[2]) or @distanceLevel[2]
  undefined != b.distanceLevel and f.distanceLevel.url and (@distanceLevel[0] = parseInt(b.distanceLevel.split('-')[0]) or @distanceLevel[0])
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
  undefined != f.pos and (@pos[0] = parseFloat(f.pos.value.split('+')[0]) or @pos[0])
  @pos[1] = parseFloat(f.pos.value.split('+')[1]) or @pos[1]
  @pos[2] = parseFloat(f.pos.value.split('+')[2]) or @pos[2]
  undefined != b.pos and f.pos.url and (@pos[0] = parseFloat(b.pos.split('+')[0]) or @pos[0])
  @pos[1] = parseFloat(b.pos.split('+')[1]) or @pos[1]
  @pos[2] = parseFloat(b.pos.split('+')[2]) or @pos[2]
  undefined != f.rot and (@rot[0] = parseFloat(f.rot.value.split('+')[0]) or @rot[0])
  @rot[1] = parseFloat(f.rot.value.split('+')[1]) or @rot[1]
  undefined != b.rot and f.rot.url and (@rot[0] = parseFloat(b.rot.split('+')[0]) or @rot[0])
  @rot[1] = parseFloat(b.rot.split('+')[1]) or @rot[1]
  @skyColor = new Float32Array([
    1
    1
    1
    1
  ])
  undefined != f.skyColor and (@skyColor[0] = parseFloat(f.skyColor.value.split('-')[0]) / 255 or @skyColor[0])
  @skyColor[1] = parseFloat(f.skyColor.value.split('-')[1]) / 255 or @skyColor[1]
  @skyColor[2] = parseFloat(f.skyColor.value.split('-')[2]) / 255 or @skyColor[2]
  undefined != b.skyColor and f.skyColor.url and (@skyColor[0] = parseFloat(b.skyColor.split('-')[0]) / 255 or @skyColor[0])
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
  b = undefined
  c = undefined
  d = undefined
  e = undefined
  f = undefined
  b = undefined
  c = undefined
  d = undefined
  e = undefined
  f = undefined
  b = document.location.href.split(/#/)[0]
  b = b.split(/\?/)
  f = undefined
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
