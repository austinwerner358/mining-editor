window.Mob = (b, f, c) ->
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