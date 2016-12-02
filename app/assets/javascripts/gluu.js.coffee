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

Gluu::initGL = (glCanvas) ->
  try
    @gl = glCanvas.getContext('experimental-webgl',
      antialias: !1
      alpha: !1)
    @gl.viewportWidth = glCanvas.width
    @gl.viewportHeight = glCanvas.height
  catch e
    console.log(e)
  @gl or alert('Could not initialise WebGL. See the help page for more information.')
  return

Gluu::getShader = (gl, shaderType, shaderClass) ->
  xmlRequest = new XMLHttpRequest
  if undefined != window.shadersCode
    shaderText = window.shadersCode[shaderClass][shaderType]
    if undefined == shaderText
      return null
  else
    xmlRequest.open('GET', 'shaders/' + shaderType + '.' + shaderClass, !1)
    xmlRequest.send(null)
    shaderText = xmlRequest.responseText
    if !shaderText
      return null
  if 'fs' == shaderClass
    newShader = gl.createShader(gl.FRAGMENT_SHADER)
  else if 'vs' == shaderClass
    newShader = gl.createShader(gl.VERTEX_SHADER)
  else
    return null
  gl.shaderSource newShader, shaderText
  gl.compileShader newShader
  if gl.getShaderParameter(newShader, gl.COMPILE_STATUS)
    return newShader
  else
    alert(gl.getShaderInfoLog(newShader))

Gluu::initLineShader = ->
  fs_lineShader = @getShader(@gl, 'line', 'fs')
  vs_lineShader = @getShader(@gl, 'line', 'vs')
  @lineShader = @gl.createProgram()
  @gl.attachShader @lineShader, vs_lineShader
  @gl.attachShader @lineShader, fs_lineShader
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
  fs_selectionShader = @getShader(@gl, 'selection', 'fs')
  vs_selectionShader = @getShader(@gl, 'selection', 'vs')
  @selectionShader = @gl.createProgram()
  @gl.attachShader @selectionShader, vs_selectionShader
  @gl.attachShader @selectionShader, fs_selectionShader
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

Gluu::initStandardShader = (shaderType) ->
  undefined != @standardShader and @gl.deleteProgram(@standardShader)
  fs_shader = @getShader(@gl, shaderType, 'fs')
  vs_shader = @getShader(@gl, shaderType, 'vs')
  @standardShader = @gl.createProgram()
  @gl.attachShader @standardShader, vs_shader
  @gl.attachShader @standardShader, fs_shader
  @gl.linkProgram @standardShader
  @gl.getProgramParameter(@standardShader, @gl.LINK_STATUS) or alert('Could not initialise shaders')
  settings.worldShader = shaderType
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
  matrix = mat4.clone(@mvMatrix)
  @mvMatrixStack.push matrix
  return

Gluu::mvPopMatrix = ->
  if 0 == @mvMatrixStack.length
    throw 'Invalid popMatrix!'
  @mvMatrix = @mvMatrixStack.pop()
  return

Gluu::degToRad = (deg) ->
  deg * Math.PI / 180

Gluu::initTextures = ->
  window.blockTexture = @gl.createTexture()
  image = new Image
  image.onload = ->
    gluu.handleTextureLoaded image, window.blockTexture
    return
  image.src = 'config/blocks.png'
  return

Gluu::handleTextureLoaded = (image2D, blockTexture) ->
  @gl.bindTexture @gl.TEXTURE_2D, blockTexture
  @gl.texImage2D @gl.TEXTURE_2D, 0, @gl.RGBA, @gl.RGBA, @gl.UNSIGNED_BYTE, image2D
  @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_MAG_FILTER, @gl.NEAREST
  @gl.texParameteri @gl.TEXTURE_2D, @gl.TEXTURE_MIN_FILTER, @gl.NEAREST
  @gl.bindTexture @gl.TEXTURE_2D, null
  window.initTexture = !0
  return
