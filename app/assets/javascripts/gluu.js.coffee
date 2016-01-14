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

window.gluu = new Gluu

Gluu::initGL = (b) ->
  try
    window.gl = b.getContext('experimental-webgl',
      antialias: !1
      alpha: !1)
    window.gl.viewportWidth = b.width
    window.gl.viewportHeight = b.height
  catch f
  window.gl or alert('Could not initialise WebGL')
  return

Gluu::getShader = (b, f, c) ->
  d = new XMLHttpRequest
  if undefined != window.shadersCode
    f = window.shadersCode[c][f]
    if undefined == f
      return null
  else
    d.open('GET', 'shaders/' + f + '.' + c, !1)
    d.send(null)
    f = d.responseText
    if !f
      return null
  if 'fs' == c
    c = b.createShader(b.FRAGMENT_SHADER)
  else if 'vs' == c
    c = b.createShader(b.VERTEX_SHADER)
  else
    return null
  b.shaderSource c, f
  b.compileShader c
  if b.getShaderParameter(c, b.COMPILE_STATUS)
    return c
  else
    alert(b.getShaderInfoLog(c))

Gluu::initLineShader = ->
  b = @getShader(window.gl, 'line', 'fs')
  f = @getShader(window.gl, 'line', 'vs')
  @lineShader = window.gl.createProgram()
  window.gl.attachShader @lineShader, f
  window.gl.attachShader @lineShader, b
  window.gl.linkProgram @lineShader
  window.gl.getProgramParameter(@lineShader, window.gl.LINK_STATUS) or alert('Could not initialise shaders')
  window.gl.useProgram @lineShader
  @lineShader.vertexPositionAttribute = window.gl.getAttribLocation(@lineShader, 'aVertexPosition')
  window.gl.enableVertexAttribArray @lineShader.vertexPositionAttribute
  @lineShader.textureCoordAttribute = window.gl.getAttribLocation(@lineShader, 'aTextureCoord')
  window.gl.enableVertexAttribArray @lineShader.textureCoordAttribute
  @lineShader.lightAttribute = window.gl.getAttribLocation(@lineShader, 'lightValue')
  window.gl.enableVertexAttribArray @lineShader.lightAttribute
  @lineShader.pMatrixUniform = window.gl.getUniformLocation(@lineShader, 'uPMatrix')
  @lineShader.mvMatrixUniform = window.gl.getUniformLocation(@lineShader, 'uMVMatrix')
  return

Gluu::initSelectionShader = ->
  b = @getShader(window.gl, 'selection', 'fs')
  f = @getShader(window.gl, 'selection', 'vs')
  @selectionShader = window.gl.createProgram()
  window.gl.attachShader @selectionShader, f
  window.gl.attachShader @selectionShader, b
  window.gl.linkProgram @selectionShader
  window.gl.getProgramParameter(@selectionShader, window.gl.LINK_STATUS) or alert('Could not initialise shaders')
  window.gl.useProgram @selectionShader
  @selectionShader.vertexPositionAttribute = window.gl.getAttribLocation(@selectionShader, 'aVertexPosition')
  window.gl.enableVertexAttribArray @selectionShader.vertexPositionAttribute
  @selectionShader.textureCoordAttribute = window.gl.getAttribLocation(@selectionShader, 'aTextureCoord')
  window.gl.enableVertexAttribArray @selectionShader.textureCoordAttribute
  @selectionShader.lightAttribute = window.gl.getAttribLocation(@selectionShader, 'lightValue')
  window.gl.enableVertexAttribArray @selectionShader.lightAttribute
  @selectionShader.pMatrixUniform = window.gl.getUniformLocation(@selectionShader, 'uPMatrix')
  @selectionShader.mvMatrixUniform = window.gl.getUniformLocation(@selectionShader, 'uMVMatrix')
  @selectionShader.msMatrixUniform = window.gl.getUniformLocation(@selectionShader, 'uMSMatrix')
  @selectionShader.samplerUniform = window.gl.getUniformLocation(@selectionShader, 'uSampler')
  return

Gluu::initStandardShader = (b) ->
  undefined != @standardShader and window.gl.deleteProgram(@standardShader)
  f = @getShader(window.gl, b, 'fs')
  c = @getShader(window.gl, b, 'vs')
  @standardShader = window.gl.createProgram()
  window.gl.attachShader @standardShader, c
  window.gl.attachShader @standardShader, f
  window.gl.linkProgram @standardShader
  window.gl.getProgramParameter(@standardShader, window.gl.LINK_STATUS) or alert('Could not initialise shaders')
  settings.worldShader = b
  window.gl.useProgram @standardShader
  @standardShader.vertexPositionAttribute = window.gl.getAttribLocation(@standardShader, 'aVertexPosition')
  window.gl.enableVertexAttribArray @standardShader.vertexPositionAttribute
  @standardShader.textureCoordAttribute = window.gl.getAttribLocation(@standardShader, 'aTextureCoord')
  window.gl.enableVertexAttribArray @standardShader.textureCoordAttribute
  @standardShader.lightAttribute = window.gl.getAttribLocation(@standardShader, 'lightValue')
  window.gl.enableVertexAttribArray @standardShader.lightAttribute
  @standardShader.lod = window.gl.getUniformLocation(@standardShader, 'lod')
  @standardShader.sun = window.gl.getUniformLocation(@standardShader, 'sun')
  @standardShader.brightness = window.gl.getUniformLocation(@standardShader, 'brightness')
  @standardShader.skyColor = window.gl.getUniformLocation(@standardShader, 'skyColor')
  @standardShader.pMatrixUniform = window.gl.getUniformLocation(@standardShader, 'uPMatrix')
  @standardShader.mvMatrixUniform = window.gl.getUniformLocation(@standardShader, 'uMVMatrix')
  @standardShader.msMatrixUniform = window.gl.getUniformLocation(@standardShader, 'uMSMatrix')
  @standardShader.samplerUniform = window.gl.getUniformLocation(@standardShader, 'uSampler')
  return

Gluu::setMatrixUniforms = ->
  window.gl.uniformMatrix4fv @standardShader.pMatrixUniform, !1, @pMatrix
  window.gl.uniformMatrix4fv @standardShader.mvMatrixUniform, !1, @mvMatrix
  window.gl.uniformMatrix4fv @standardShader.msMatrixUniform, !1, @objStrMatrix
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
