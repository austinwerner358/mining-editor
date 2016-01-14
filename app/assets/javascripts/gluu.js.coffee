Gluu = ->
  @gl = @selectionShader = @lineShader = @standardShader = null
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
    @gl = b.getContext('experimental-webgl',
      antialias: !1
      alpha: !1)
    @gl.viewportWidth = b.width
    @gl.viewportHeight = b.height
  catch f
  @gl or alert('Could not initialise WebGL')
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
  b = @getShader(@gl, 'line', 'fs')
  f = @getShader(@gl, 'line', 'vs')
  @lineShader = @gl.createProgram()
  @gl.attachShader @lineShader, f
  @gl.attachShader @lineShader, b
  @gl.linkProgram @lineShader
  @gl.getProgramParameter(@lineShader, @gl.LINK_STATUS) or alert('Could not initialise shaders')
  @gl.useProgram @lineShader
  @lineShader.vertexPositionAttribute = @gl.getAttribLocation(@lineShader, 'aVertexPosition')
  @gl.enableVertexAttribArray @lineShader.vertexPositionAttribute
  @lineShader.textureCoordAttribute = @gl.getAttribLocation(@lineShader, 'aTextureCoord')
  @gl.enableVertexAttribArray @lineShader.textureCoordAttribute
  @lineShader.lightAttribute = @gl.getAttribLocation(@lineShader, 'lightValue')
  @gl.enableVertexAttribArray @lineShader.lightAttribute
  @lineShader.pMatrixUniform = @gl.getUniformLocation(@lineShader, 'uPMatrix')
  @lineShader.mvMatrixUniform = @gl.getUniformLocation(@lineShader, 'uMVMatrix')
  return

Gluu::initSelectionShader = ->
  b = @getShader(@gl, 'selection', 'fs')
  f = @getShader(@gl, 'selection', 'vs')
  @selectionShader = @gl.createProgram()
  @gl.attachShader @selectionShader, f
  @gl.attachShader @selectionShader, b
  @gl.linkProgram @selectionShader
  @gl.getProgramParameter(@selectionShader, @gl.LINK_STATUS) or alert('Could not initialise shaders')
  @gl.useProgram @selectionShader
  @selectionShader.vertexPositionAttribute = @gl.getAttribLocation(@selectionShader, 'aVertexPosition')
  @gl.enableVertexAttribArray @selectionShader.vertexPositionAttribute
  @selectionShader.textureCoordAttribute = @gl.getAttribLocation(@selectionShader, 'aTextureCoord')
  @gl.enableVertexAttribArray @selectionShader.textureCoordAttribute
  @selectionShader.lightAttribute = @gl.getAttribLocation(@selectionShader, 'lightValue')
  @gl.enableVertexAttribArray @selectionShader.lightAttribute
  @selectionShader.pMatrixUniform = @gl.getUniformLocation(@selectionShader, 'uPMatrix')
  @selectionShader.mvMatrixUniform = @gl.getUniformLocation(@selectionShader, 'uMVMatrix')
  @selectionShader.msMatrixUniform = @gl.getUniformLocation(@selectionShader, 'uMSMatrix')
  @selectionShader.samplerUniform = @gl.getUniformLocation(@selectionShader, 'uSampler')
  return

Gluu::initStandardShader = (b) ->
  undefined != @standardShader and @gl.deleteProgram(@standardShader)
  f = @getShader(@gl, b, 'fs')
  c = @getShader(@gl, b, 'vs')
  @standardShader = @gl.createProgram()
  @gl.attachShader @standardShader, c
  @gl.attachShader @standardShader, f
  @gl.linkProgram @standardShader
  @gl.getProgramParameter(@standardShader, @gl.LINK_STATUS) or alert('Could not initialise shaders')
  settings.worldShader = b
  @gl.useProgram @standardShader
  @standardShader.vertexPositionAttribute = @gl.getAttribLocation(@standardShader, 'aVertexPosition')
  @gl.enableVertexAttribArray @standardShader.vertexPositionAttribute
  @standardShader.textureCoordAttribute = @gl.getAttribLocation(@standardShader, 'aTextureCoord')
  @gl.enableVertexAttribArray @standardShader.textureCoordAttribute
  @standardShader.lightAttribute = @gl.getAttribLocation(@standardShader, 'lightValue')
  @gl.enableVertexAttribArray @standardShader.lightAttribute
  @standardShader.lod = @gl.getUniformLocation(@standardShader, 'lod')
  @standardShader.sun = @gl.getUniformLocation(@standardShader, 'sun')
  @standardShader.brightness = @gl.getUniformLocation(@standardShader, 'brightness')
  @standardShader.skyColor = @gl.getUniformLocation(@standardShader, 'skyColor')
  @standardShader.pMatrixUniform = @gl.getUniformLocation(@standardShader, 'uPMatrix')
  @standardShader.mvMatrixUniform = @gl.getUniformLocation(@standardShader, 'uMVMatrix')
  @standardShader.msMatrixUniform = @gl.getUniformLocation(@standardShader, 'uMSMatrix')
  @standardShader.samplerUniform = @gl.getUniformLocation(@standardShader, 'uSampler')
  return

Gluu::setMatrixUniforms = ->
  @gl.uniformMatrix4fv @standardShader.pMatrixUniform, !1, @pMatrix
  @gl.uniformMatrix4fv @standardShader.mvMatrixUniform, !1, @mvMatrix
  @gl.uniformMatrix4fv @standardShader.msMatrixUniform, !1, @objStrMatrix
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
