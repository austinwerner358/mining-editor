# Region = ->
#   @gameRoot = undefined
#   @worldName = undefined
#   @region = []
#   @localIChunk = []
#   @rchunk = []
#   @iChunk = 0
#   return

# window.mcWorld = new Region

# Region::initRegion = (b,f) ->
#   @gameRoot = b
#   @worldName = f
#   return

Region::getChunkBlock = (b, f, c, d, e) ->
  b = 1e4 * b + f
  if undefined != @rchunk[b]
    @rchunk[b].getBlock(c, d, e)
  else
    id: 0
    data: 0

Region::getBlock = (b, f, c) ->
  d = Math.floor(b / 16)
  e = Math.floor(c / 16)
  m = 1e4 * d + e
  if undefined != @rchunk[m]
    b -= 16 * d
    0 > b and (b += 16)
    c -= 16 * e
    0 > c and (c += 16)
    @rchunk[m].getBlock b, f, c
  else
    id: 0
    data: 0

Region::updateChunkBlock = (b, f, c, d, e, m, l) ->
  b = 1e4 * b + f
  if undefined != @rchunk[b]
    @rchunk[b].updateBlock c, d, e, m, l
  return

Region::updateBlock = (b, f, c, d, e) ->
  m = Math.floor(b / 16)
  l = Math.floor(c / 16)
  p = 1e4 * m + l
  undefined != @rchunk[p] and b -= 16 * m
  0 > b and (b += 16)
  c -= 16 * l
  0 > c and (c += 16)
  @rchunk[p].updateBlock(Math.floor(b), Math.floor(f), Math.floor(c), d, e)
  return

Region::setBlock = (b, f, c, d, e) ->
  m = Math.floor(b / 16)
  l = Math.floor(c / 16)
  p = 1e4 * m + l
  undefined != @rchunk[p] and b -= 16 * m
  0 > b and (b += 16)
  c -= 16 * l
  0 > c and (c += 16)
  @rchunk[p].setBlock(Math.floor(b), Math.floor(f), Math.floor(c), d, e)
  return

Region::changeChunkBlockAdd = (b, f, c, d, e) ->
  b = 1e4 * b + f
  undefined != @rchunk[b] and @rchunk[b].changeAdd(c, d, e)
  return

# Region::updateChunks = ->
#   b = (new Date).getTime()
#   f = 0
#   c = undefined
#   for c,v of @rchunk
#     undefined != @rchunk[c] and -1 != @rchunk[c] and -2 != @rchunk[c] and !0 == @rchunk[c].needsUpdate and @rchunk[c].update()
#     f++
#   c = (new Date).getTime()
#   console.log 'update chunk ' + c - b + ' ' + f
#   return

# Region::deleteBuffers = ->
#   b = (new Date).getTime()
#   f = 0
#   c = undefined
#   for c,v of @rchunk
#     undefined != @rchunk[c] and -1 != @rchunk[c] and -2 != @rchunk[c] and !0 != @rchunk[c].changed and (1 == @rchunk[c].isInit or 1 == @rchunk[c].isInit1) and @rchunk[c].timestamp + 1e4 < b and @rchunk[c].deleteBuffers()
#     @rchunk[c] = undefined
#     f++
#   c = (new Date).getTime()
#   console.log 'delete buffers ' + c - b + ' ' + f
#   return

# Region::render = ->
#   `var v`
#   `var f`
#   `var d`
#   `var c`
#   `var v`
#   `var c`
#   c = undefined
#   v = undefined
#   c = undefined
#   d = undefined
#   v = undefined
#   f = undefined
#   A = undefined
#   B = undefined
#   C = undefined
#   a = undefined
#   b = undefined
#   c = undefined
#   d = undefined
#   e = undefined
#   f = undefined
#   l = undefined
#   m = undefined
#   p = undefined
#   q = undefined
#   t = undefined
#   v = undefined
#   x = undefined
#   if window.initTexture
#     b = window.gluu.standardShader
#     gluu.gl.useProgram b
#     gluu.gl.viewport 0, 0, gluu.gl.viewportWidth, gluu.gl.viewportHeight
#     gluu.gl.clearColor settings.skyColor[0], settings.skyColor[1], settings.skyColor[2], 1
#     gluu.gl.clear gluu.gl.COLOR_BUFFER_BIT | gluu.gl.DEPTH_BUFFER_BIT
#     mat4.perspective window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6e3
#     f = camera.getMatrix()
#     mat4.multiply window.gluu.pMatrix, window.gluu.pMatrix, f
#     mat4.identity window.gluu.mvMatrix
#     gluu.gl.uniformMatrix4fv b.pMatrixUniform, !1, window.gluu.pMatrix
#     gluu.gl.uniformMatrix4fv b.mvMatrixUniform, !1, window.gluu.mvMatrix
#     gluu.gl.uniform1f b.lod, settings.distanceLevel[1]
#     gluu.gl.uniform1f b.sun, settings.sun
#     gluu.gl.uniform1f b.brightness, settings.brightness
#     gluu.gl.uniform4fv b.skyColor, settings.skyColor
#     c = undefined
#     d = undefined
#     f = undefined
#     e = undefined
#     m = undefined
#     l = undefined
#     p = undefined
#     q = undefined
#     x = undefined
#     A = undefined
#     B = undefined
#     c = 0
#     d = 0
#     f = 0
#     e = [
#       settings.distanceLevel[0]
#       settings.distanceLevel[1]
#       settings.distanceLevel[2]
#       settings.distanceLevel[2]
#     ]
#     m = []
#     l = 0
#     p = 0
#     q = 0
#     x = camera.getPos()
#     A = 0
#     while 4 > A
#       t = Math.floor(x[0] / 16)
#       a = Math.floor(x[2] / 16)
#       m[0] = 0
#       m[1] = 0
#       B = -1
#       while B < e[A] * e[A] * 4
#         -1 != B and (m = window.spiralLoop(B))
#         l = t + m[0]
#         p = a + m[1]
#         q = 1e4 * l + p
#         if -1 == @rchunk[q] or -2 == @rchunk[q]
#           @rchunk[q].timestamp = window.chronometer.lastTime
#         else
#           if c = x[0] - (16 * l + 8)
#             d = x[2] - (16 * p + 8)
#             f = Math.sqrt(c * c + d * d)
#             !(f > 16 * e[A])
#             if 64 < f
#               v = camera.getTarget()
#               v = [
#                 x[0] - (v[0])
#                 x[2] - (v[2])
#               ]
#               d = [
#                 -c
#                 -d
#               ]
#               c = v[0] * d[0] + v[1] * d[1]
#               C = Math.sqrt(v[0] * v[0] + v[1] * v[1])
#               v = Math.sqrt(d[0] * d[0] + d[1] * d[1])
#               c = c / (C * v)
#               if 0 < c
#                 B++
#                 continue
#               c = Math.cos(camera.fovx / 1.5) + c
#               v = Math.sqrt(2 * v * v * (1 - c))
#               if 0 < c and 16 < v
#                 B++
#                 continue
#             if undefined == @rchunk[q]
#               1 < chronometer.iLag and (chronometer.iLag -= 1)
#               @requestChunk l, p
#             else
#               @rchunk[q].timestamp = chronometer.lastTime
#               (62 <= x[1] or 160 > f) and @rchunk[q].render(A, b, 0)
#               if 62 > x[1] and 96 > f
#                 @rchunk[q].render A, b, 1
#               else
#                 64 > f and @rchunk[q].render(A, b, 1)
#         B++
#       A++
#   return

# Region::renderSelection = ->
#   `var f`
#   f = undefined
#   b = undefined
#   c = undefined
#   d = undefined
#   e = undefined
#   f = undefined
#   l = undefined
#   m = undefined
#   p = undefined
#   q = undefined
#   x = undefined
#   if window.initTexture
#     b = window.gluu.selectionShader
#     gluu.gl.useProgram b
#     gluu.gl.viewport 0, 0, gluu.gl.viewportWidth, gluu.gl.viewportHeight
#     gluu.gl.clearColor 0, 0, 0, 0
#     gluu.gl.clear gluu.gl.COLOR_BUFFER_BIT | gluu.gl.DEPTH_BUFFER_BIT
#     mat4.perspective window.gluu.pMatrix, camera.fovy, gluu.gl.viewportWidth / gluu.gl.viewportHeight, 0.1, 6e3
#     f = camera.getMatrix()
#     mat4.multiply window.gluu.pMatrix, window.gluu.pMatrix, f
#     mat4.identity window.gluu.mvMatrix
#     gluu.gl.uniformMatrix4fv b.pMatrixUniform, !1, window.gluu.pMatrix
#     gluu.gl.uniformMatrix4fv b.mvMatrixUniform, !1, window.gluu.mvMatrix
#     c = undefined
#     d = undefined
#     e = undefined
#     m = undefined
#     f = undefined
#     l = undefined
#     x = undefined
#     c = []
#     d = 0
#     e = 0
#     m = 0
#     f = camera.getPos()
#     l = 0
#     while 4 > l
#       p = Math.floor(f[0] / 16)
#       q = Math.floor(f[2] / 16)
#       c[0] = 0
#       c[1] = 0
#       x = -1
#       while 24 > x
#         -1 != x and (c = window.spiralLoop(x))
#         d = p + c[0]
#         e = q + c[1]
#         m = 1e4 * d + e
#         if -1 == @rchunk[m] or -2 == @rchunk[m]
#           @rchunk[m].timestamp = chronometer.lastTime
#         else
#           if undefined == @rchunk[m]
#             1 < chronometer.iLag and (chronometer.iLag -= 1)
#             @requestChunk d, e
#           else
#             @rchunk[m].timestamp = chronometer.lastTime
#             @rchunk[m].render l, b, 0
#             @rchunk[m].render l, b, 1
#         x++
#       l++
#     q = new Uint8Array(4)
#     gluu.gl.readPixels Math.floor(gluu.gl.viewportWidth / 2), Math.floor(gluu.gl.viewportHeight / 2), 1, 1, gluu.gl.RGBA, gluu.gl.UNSIGNED_BYTE, q
#     b = {}
#     b.y = q[0]
#     b.z = Math.floor(q[1] / 16)
#     b.x = q[1] - (16 * b.z)
#     p = Math.floor(q[2] / 10)
#     b.side = q[2] - (10 * p)
#     c = Math.floor(p / 5)
#     d = p - (5 * c)
#     p = Math.floor(f[0] / 16)
#     q = Math.floor(f[2] / 16)
#     f = p % 5
#     0 > f and (f += 5)
#     e = q % 5
#     0 > e and (e += 5)
#     c -= f
#     d -= e
#     2 < c and (c -= 5)
#     -2 > c and (c += 5)
#     2 < d and (d -= 5)
#     -2 > d and (d += 5)
#     b.chx = p + c
#     b.chz = q + d
#     b.rchx = c
#     b.rchz = d
#     return b
#   return

Region::testCollisions = ->
  `var p`
  `var d`
  d = undefined
  p = undefined
  b = undefined
  c = undefined
  d = undefined
  e = undefined
  f = undefined
  l = undefined
  m = undefined
  p = undefined
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
            p = p + intersection3D.shapeIntersectsShape(l, player.shape, 9, 5, b)
            d = d + p
      m++
    e++
  (new Date).getTime()
  if 0 < d
    !0
  else
    !1

Region::save = ->
  for b,v of @rchunk
    if undefined != @rchunk[b] and -1 != @rchunk[b] and -2 != @rchunk[b] and @rchunk[b].changed
      mcWorld.saveChunkToStorage(@rchunk[b].xPos, @rchunk[b].zPos)
      @rchunk[b].changed = !1
  return

# Region::saveChunkToStorage = (b, f) ->
#   `var c`
#   `var d`
#   c = 1e4 * b + f
#   if undefined != @rchunk[c] and -1 != @rchunk[c] and -2 != @rchunk[c]
#     d = @rchunk[c].getNBT()
#     d = new (Zlib.Deflate)(d).compress()
#     e = new Uint8Array(d.length + 5)
#     c = d.length + 1
#     e[0] = c >> 24 & 255
#     e[1] = c >> 16 & 255
#     e[2] = c >> 8 & 255
#     e[3] = c & 255
#     e[4] = 2
#     c = 0
#     while c < d.length
#       e[c + 5] = d[c]
#       c++
#     d = ab2str(e)
#     window.localStorage.setItem @gameRoot + ' ' + @worldName + ' ' + b + ' ' + f, d
#   return

# Region::getChunkFromStorage = (b, f) ->
#   c = window.localStorage.getItem(@gameRoot + ' ' + @worldName + ' ' + b + ' ' + f)
#   if undefined == c or null == c or '' == c
#     return -1
#   c = new Uint8Array(str2ab(c))
#   @loadChunk 0, c, !0

# Region::loadChunkFromStorage = (b, f, c) ->
#   d = mcWorld.getChunkFromStorage(b, f)
#   if -1 == d
#     return -1
#   if c
#     return d
#   @rchunk[1e4 * b + f] = d
#   e = d = c = !1
#   m = !1
#   l = mcWorld.requestChunk(b + 1, f)
#   undefined == l and (m = !0)
#   -1 == l and (m = !0)
#   -2 == l and (m = !0)
#   p = mcWorld.requestChunk(b - 1, f)
#   undefined == p and (e = !0)
#   -1 == p and (e = !0)
#   -2 == p and (e = !0)
#   q = mcWorld.requestChunk(b, f + 1)
#   undefined == q and (c = !0)
#   -1 == q and (c = !0)
#   -2 == q and (c = !0)
#   b = mcWorld.requestChunk(b, f - 1)
#   undefined == b and (d = !0)
#   -1 == b and (d = !0)
#   -2 == b and (d = !0)
#   m or l.init2()
#   e or p.init2()
#   c or q.init2()
#   d or b.init2()
#   return

# Region::loadRegion = (b, f) ->
#   `var c`
#   c = undefined
#   c = undefined
#   d = undefined
#   e = undefined
#   m = undefined
#   @region[1e3 * b + f] = {}
#   @region[1e3 * b + f].loaded = -2
#   if undefined != window.threadsCode
#     c = new Blob([ threadsCode.loadRegionThread ], type: 'application/javascript')
#     c = new Worker(window.URL.createObjectURL(c))
#   else
#     c = new Worker('threads/loadRegionThread.js')
#   c.Region = this
#   c.region = @region[1e3 * b + f]

#   c.onmessage = (b) ->
#     @Region.regionLoaded b
#     return

#   c.onerror = (b) ->
#     `var e`
#     e = undefined
#     @region.loaded = -1
#     return

#   d = @gameRoot + '/' + @worldName + '/region/r.' + b + '.' + f + '.mca'
#   e = ''
#   if -1 == @gameRoot.indexOf(':')
#     e = document.location.href.split(/\?|#/)[0]
#     m = e.indexOf('index')
#     -1 != m and (e = e.substring(0, m))
#   console.log e + d
#   c.postMessage
#     x: b
#     y: f
#     name: e + d
#   return

# Region::regionLoaded = (b) ->
#   f = b.data.x
#   c = b.data.y
#   if 1 != b.data.loaded
#     f = @region[1e3 * f + c]
#     f.loaded = -1
#   else
#     b = new Uint8Array(b.data.data)
#     if 1e3 > b.length
#       f = @region[1e3 * f + c]
#       f.loaded = -1
#     else
#       f = @region[1e3 * f + c]
#       f.regionData = b
#       f.loaded = 0
#       f.chunkPos = []
#       f.chunkLen = []
#       d = undefined
#       d = c = 0
#       while 4096 > c
#         f.chunkPos[d] = 65536 * b[c] + 256 * b[c + 1] + b[c + 2]
#         f.chunkLen[d] = b[c + 3]
#         c += 4
#         d++
#   return

# Region::loadRegionFile = (b, f) ->
#   try
#     c = Readfile.readRAW(f)
#   catch d
#     console.log 'nie ma pliku'
#     return
#   b.regionData = c
#   b.loaded = 0
#   b.chunkPos = []
#   b.chunkLen = []
#   e = undefined
#   m = undefined
#   e = 0
#   m = 0
#   while 4096 > e
#     b.chunkPos[m] = 65536 * c[e] + 256 * c[e + 1] + c[e + 2]
#     b.chunkLen[m] = c[e + 3]
#     e += 4
#     m++
#   return

# Region::requestChunk = (b, f) ->
#   `var d`
#   d = undefined
#   c = undefined
#   d = undefined
#   e = undefined
#   l = undefined
#   m = undefined
#   c = 1e4 * b + f
#   if undefined != @rchunk[c]
#     return @rchunk[c]
#   if 1 != @localIChunk[c]
#     d = -1
#     @localIChunk[c] = 1
#     if -1 != (d = @loadChunkFromStorage(b, f, !0))
#       return @rchunk[c] = d
#   d = Math.floor(b / 32)
#   e = Math.floor(f / 32)
#   undefined == @region[1e3 * d + e] and @loadRegion(d, e)
#   if -1 == @region[1e3 * d + e].loaded
#     return @rchunk[c] = -1
#   if -2 == @region[1e3 * d + e].loaded
#     return -2
#   if 0 == @region[1e3 * d + e].loaded
#     m = b % 32
#     0 > m and (m += 32)
#     l = f % 32
#     0 > l and (l += 32)
#     m += 32 * l
#     if 0 < @region[1e3 * d + e].chunkPos[m]
#       console.log 'chunk ' + c + ' : ' + @region[1e3 * d + e].chunkPos[m] + ' ' + @region[1e3 * d + e].chunkLen[m]
#       @iChunk++
#       @rchunk[c] = @loadChunk(4096 * @region[1e3 * d + e].chunkPos[m], @region[1e3 * d + e].regionData, !0)
#       return @rchunk[c]
#     @rchunk[c] = -1
#   return

# Region::loadChunk = (b, f, c) ->
#   d = {}
#   e = new Chunk
#   d.offset = 0
#   try
#     if c
#       m = new (Zlib.Inflate)(f, index: b + 5)
#       d.data = m.decompress()
#     else
#       d.data = f
#   catch l
#     console.log('fail')
#     return -1
#   f = 0
#   while 2e3 > f and -1 != (b = window.NBT.nextTag(d))
#     switch b.name
#       when 'xPos'
#         e.xPos = b.value
#       when 'zPos'
#         e.zPos = b.value
#       when 'HeightMap'
#         e.heightMap = b.data
#       when 'Biomes'
#         e.biomes = b.data
#       when 'LightPopulated'
#         e.lightPopulated = b.value
#       when 'Sections'
#         @readSections b, e, d
#         f++
#         continue
#     9 == b.type and window.NBT.read9(b, e, d)
#     f++
#   undefined == e.heightMap and e.initHeightMap()
#   e

# Region::readSections = (b, f, c) ->
#   d = undefined
#   e = undefined
#   m = undefined
#   d = {}
#   m = 0
#   while m < b.length and -1 != (e = window.NBT.nextTag(c))
#     0 == e.type and undefined == d.add and (d.add = new Uint8Array(2048))
#     f.section[d.y] = d
#     d = {}
#     m++
#     switch e.name
#       when 'Y'
#         d.y = e.value
#       when 'Blocks'
#         d.blocks = e.data
#       when 'SkyLight'
#         d.skyLight = e.data
#       when 'BlockLight'
#         d.blockLight = e.data
#       when 'Add'
#         d.add = e.data
#       when 'Data'
#         d.data = e.data
#   return
