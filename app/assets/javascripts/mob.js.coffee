class window.Mob
  constructor:() ->
    @pos = [
      0
      0
      0
    ]
    @rot = [
      0
      0
    ]
    @up = [
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

  updatePos: (b, f, c) ->
    @pos = b
    @rot = f
    @up = c

  getEye: ->
    [
      @pos[0] + @eyePos[0]
      @pos[1] + @eyePos[1]
      @pos[2] + @eyePos[2]
    ]

  getPos: ->
    @pos

  setPosRot: (b, f) ->
    undefined != b and @pos[0] = b[0]
    @pos[1] = b[1]
    @pos[2] = b[2]
    undefined != f and @rot[0] = f[0]
    @rot[1] = f[1]
    @rot[2] = f[2]

  getTarget: ->
    [
      @pos[0] + @eyePos[0] + Math.sin(@rot[0]) * Math.cos(@rot[1])
      @pos[1] + @eyePos[1] + 1 * Math.sin(@rot[1])
      @pos[2] + @eyePos[2] + Math.cos(@rot[0]) * Math.cos(@rot[1])
    ]

  render: ->
    b = gluu.lineShader
    gluu.gl.useProgram b
    mat4.identity gluu.mvMatrix
    mat4.translate gluu.mvMatrix, gluu.mvMatrix, [
      @pos[0]
      @pos[1]
      @pos[2]
    ]
    gluu.gl.uniformMatrix4fv b.pMatrixUniform, !1, gluu.pMatrix
    gluu.gl.uniformMatrix4fv b.mvMatrixUniform, !1, gluu.mvMatrix
    undefined != @shape and (if undefined == @shapeVbo
      @shapeVbo = gluu.gl.createBuffer()
      gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, @shapeVbo)
      gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, @shape, gluu.gl.STATIC_DRAW)
    else
      gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, @shapeVbo)
      gluu.gl.vertexAttribPointer(b.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 20, 0)
      gluu.gl.vertexAttribPointer(b.lightAttribute, 4, gluu.gl.FLOAT, !1, 20, 0)
      gluu.gl.vertexAttribPointer(b.textureCoordAttribute, 2, gluu.gl.FLOAT, !1, 20, 12)
      gluu.gl.drawArrays(gluu.gl.TRIANGLES, 0, 36)
    )
