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

  updatePos: (pos, rot, up) ->
    @pos = pos
    @rot = rot
    @up = up

  getEye: ->
    [
      @pos[0] + @eyePos[0]
      @pos[1] + @eyePos[1]
      @pos[2] + @eyePos[2]
    ]

  getPos: ->
    @pos

  setPosRot: (pos, rot) ->
    undefined != pos and @pos[0] = pos[0]
    @pos[1] = pos[1]
    @pos[2] = pos[2]
    undefined != rot and @rot[0] = rot[0]
    @rot[1] = rot[1]
    @rot[2] = rot[2]

  getTarget: ->
    [
      @pos[0] + @eyePos[0] + Math.sin(@rot[0]) * Math.cos(@rot[1])
      @pos[1] + @eyePos[1] + 1 * Math.sin(@rot[1])
      @pos[2] + @eyePos[2] + Math.cos(@rot[0]) * Math.cos(@rot[1])
    ]

  render: ->
    lineShader = gluu.lineShader
    gluu.gl.useProgram lineShader
    mat4.identity gluu.mvMatrix
    mat4.translate gluu.mvMatrix, gluu.mvMatrix, [
      @pos[0]
      @pos[1]
      @pos[2]
    ]
    gluu.gl.uniformMatrix4fv lineShader.pMatrixUniform, !1, gluu.pMatrix
    gluu.gl.uniformMatrix4fv lineShader.mvMatrixUniform, !1, gluu.mvMatrix
    if undefined != @shape
      if undefined == @shapeVbo
        @shapeVbo = gluu.gl.createBuffer()
        gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, @shapeVbo)
        gluu.gl.bufferData(gluu.gl.ARRAY_BUFFER, @shape, gluu.gl.STATIC_DRAW)
      else
        gluu.gl.bindBuffer(gluu.gl.ARRAY_BUFFER, @shapeVbo)
        gluu.gl.vertexAttribPointer(lineShader.vertexPositionAttribute, 3, gluu.gl.FLOAT, !1, 20, 0)
        gluu.gl.vertexAttribPointer(lineShader.lightAttribute, 4, gluu.gl.FLOAT, !1, 20, 0)
        gluu.gl.vertexAttribPointer(lineShader.textureCoordAttribute, 2, gluu.gl.FLOAT, !1, 20, 12)
        gluu.gl.drawArrays(gluu.gl.TRIANGLES, 0, 36)
