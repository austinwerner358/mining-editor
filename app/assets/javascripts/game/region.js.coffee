# WorldRegion = ->
#   @gameRoot = undefined
#   @worldName = undefined
#   @worldRegionData = []
#   @localIChunk = []
#   @chunkData = []
#   @iChunk = 0
#   return

# window.mcWorld = new WorldRegion

# WorldRegion::initRegion = (b,f) ->
#   @gameRoot = b
#   @worldName = f
#   return

WorldRegion::getChunkBlock = (b, f, c, d, e) ->
  b = 1e4 * b + f
  if undefined != @chunkData[b]
    @chunkData[b].getBlock(c, d, e)
  else
    id: 0
    data: 0

WorldRegion::getBlock = (b, f, c) ->
  d = Math.floor(b / 16)
  e = Math.floor(c / 16)
  m = 1e4 * d + e
  if undefined != @chunkData[m]
    b -= 16 * d
    0 > b and (b += 16)
    c -= 16 * e
    0 > c and (c += 16)
    @chunkData[m].getBlock b, f, c
  else
    id: 0
    data: 0

WorldRegion::updateChunkBlock = (chunk_x, chunk_y, chunk_block_x, chunk_block_y, chunk_block_z, block_id, block_data) ->
  chunk_offset = 1e4 * chunk_x + chunk_y
  if undefined != @chunkData[chunk_offset]
    @chunkData[chunk_offset].updateBlock chunk_block_x, chunk_block_y, chunk_block_z, block_id, block_data
  return

WorldRegion::updateBlock = (player_x, player_y, player_z, block_id, block_data) ->
  # NOTE: identical to WorldRegion::setBlock, but calls a different Chunk method
  chunk_x = Math.floor(player_x / 16)
  chunk_y = Math.floor(player_z / 16)
  chunk_offset = 1e4 * chunk_x + chunk_y
  if undefined != @chunkData[chunk_offset]
    player_x -= 16 * chunk_x
    0 > player_x and (player_x += 16)
    player_z -= 16 * chunk_y
    0 > player_z and (player_z += 16)
    @chunkData[chunk_offset].updateBlock(Math.floor(player_x), Math.floor(player_y), Math.floor(player_z), block_id, block_data)
  return

WorldRegion::setBlock = (player_x, player_y, player_z, block_id, block_data) ->
  chunk_x = Math.floor(player_x / 16)
  chunk_y = Math.floor(player_z / 16)
  chunk_offset = 1e4 * chunk_x + chunk_y
  if undefined != @chunkData[chunk_offset]
    player_x -= 16 * chunk_x
    0 > player_x and (player_x += 16)
    player_z -= 16 * chunk_y
    0 > player_z and (player_z += 16)
    @chunkData[chunk_offset].setBlock(Math.floor(player_x), Math.floor(player_y), Math.floor(player_z), block_id, block_data)
  return

WorldRegion::changeChunkBlockAdd = (chunk_x, chunk_y, block_x, block_y, block_z) ->
  chunk_index = 1e4 * chunk_x + chunk_y
  undefined != @chunkData[chunk_index] and @chunkData[chunk_index].changeAdd(block_x, block_y, block_z)
  return

# WorldRegion::updateChunks = ->
#   b = (new Date).getTime()
#   f = 0
#   c = undefined
#   for c,v of @chunkData
#     undefined != @chunkData[c] and -1 != @chunkData[c] and -2 != @chunkData[c] and !0 == @chunkData[c].needsUpdate and @chunkData[c].update()
#     f++
#   c = (new Date).getTime()
#   console.log 'update chunk ' + c - b + ' ' + f
#   return

# WorldRegion::deleteBuffers = ->
#   b = (new Date).getTime()
#   f = 0
#   c = undefined
#   for c,v of @chunkData
#     undefined != @chunkData[c] and -1 != @chunkData[c] and -2 != @chunkData[c] and !0 != @chunkData[c].changed and (1 == @chunkData[c].isInit or 1 == @chunkData[c].isInit1) and @chunkData[c].timestamp + 1e4 < b and @chunkData[c].deleteBuffers()
#     @chunkData[c] = undefined
#     f++
#   c = (new Date).getTime()
#   console.log 'delete buffers ' + c - b + ' ' + f
#   return

# WorldRegion::render = ->
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
#         if -1 == @chunkData[q] or -2 == @chunkData[q]
#           @chunkData[q].timestamp = window.chronometer.lastTime
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
#             if undefined == @chunkData[q]
#               1 < chronometer.iLag and (chronometer.iLag -= 1)
#               @requestChunk l, p
#             else
#               @chunkData[q].timestamp = chronometer.lastTime
#               (62 <= x[1] or 160 > f) and @chunkData[q].render(A, b, 0)
#               if 62 > x[1] and 96 > f
#                 @chunkData[q].render A, b, 1
#               else
#                 64 > f and @chunkData[q].render(A, b, 1)
#         B++
#       A++
#   return

# WorldRegion::renderSelection = ->
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
#         if -1 == @chunkData[m] or -2 == @chunkData[m]
#           @chunkData[m].timestamp = chronometer.lastTime
#         else
#           if undefined == @chunkData[m]
#             1 < chronometer.iLag and (chronometer.iLag -= 1)
#             @requestChunk d, e
#           else
#             @chunkData[m].timestamp = chronometer.lastTime
#             @chunkData[m].render l, b, 0
#             @chunkData[m].render l, b, 1
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

WorldRegion::testCollisions = ->
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
        if -1 != @chunkData[l] and -2 != @chunkData[l]
          if undefined == @chunkData[l]
            return !0
          l = @chunkData[l].getBuffer([
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

WorldRegion::save = ->
  for b,v of @chunkData
    if undefined != @chunkData[b] and -1 != @chunkData[b] and -2 != @chunkData[b] and @chunkData[b].changed
      mcWorld.saveChunkToStorage(@chunkData[b].xPos, @chunkData[b].zPos)
      @chunkData[b].changed = !1
  return

# WorldRegion::saveChunkToStorage = (b, f) ->
#   `var c`
#   `var d`
#   c = 1e4 * b + f
#   if undefined != @chunkData[c] and -1 != @chunkData[c] and -2 != @chunkData[c]
#     d = @chunkData[c].getNBT()
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

# WorldRegion::getChunkFromStorage = (b, f) ->
#   c = window.localStorage.getItem(@gameRoot + ' ' + @worldName + ' ' + b + ' ' + f)
#   if undefined == c or null == c or '' == c
#     return -1
#   c = new Uint8Array(str2ab(c))
#   @loadChunk 0, c, !0

# WorldRegion::loadChunkFromStorage = (b, f, c) ->
#   d = mcWorld.getChunkFromStorage(b, f)
#   if -1 == d
#     return -1
#   if c
#     return d
#   @chunkData[1e4 * b + f] = d
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

WorldRegion::workerFromCodeBlob = (blobUrl, region_x, region_y) ->
  alert('Web workers are undefined in this browser; can not load region files.') unless typeof(Worker)
  # Create new worker with url of shared Blob code (or file reference).
  worker = new Worker(blobUrl)
  # Instead of manually assigning references to the current context and relevant region, use => to give these callbacks the current context.
  worker.onmessage = (event) =>
    @regionLoaded event
    return
  worker.onerror = (event) =>
    alert('REGION LOADING WORKER ERROR')
    console.error(event)
    @regionLoadFailure(region_x, region_y, message)
    return
  worker

WorldRegion::loadRegion = (region_x, region_y) ->
  @worldRegionData[1e3 * region_x + region_y] = {}
  @worldRegionData[1e3 * region_x + region_y].loaded = -2
  fileName = "r.#{region_x}.#{region_y}.mca"
  console.log fileName
  console.log "Using local files: #{settings.local}"
  if window.settings.local
    @loadRegionFromLocal fileName, region_x, region_y
  else
    @loadRegionFromServer fileName, region_x, region_y, @workerFromCodeBlob(@threadCodeBlobUrlForServerFile, region_x, region_y)
  return

WorldRegion::loadRegionFromLocal = (fileName, region_x, region_y) ->
  unless window.localFiles[fileName]
    @regionLoadFailure(region_x, region_y, 'local file not found')
    return
  # TODO: make sure the file reader is properly deallocated
  # TODO: implement file loading fail callback
  reader = new FileReader
  reader.onloadend = (event) =>
    if event.target.readyState == FileReader.DONE
      result = event.target.result
      console.log result
      data = new Uint8Array(result).buffer
      @regionLoaded({
        data:
          loaded: 1
          x: region_x
          y: region_y
          data: data
      })
    return
  console.log localFiles[fileName]
  reader.readAsArrayBuffer window.localFiles[fileName]
  return

WorldRegion::loadRegionFromServer = (fileName, region_x, region_y, worker) ->
  path = @gameRoot + '/' + @worldName + '/region/' + fileName
  baseURL = ''
  if -1 == @gameRoot.indexOf(':')
    baseURL = document.location.href.split(/\?|#/)[0]
    i = baseURL.indexOf('index')
    -1 != i and (baseURL = baseURL.substring(0, i))
  console.log baseURL + path
  worker.postMessage
    x: region_x
    y: region_y
    name: baseURL + path
  return

WorldRegion::regionLoadFailure = (region_x, region_y, message) ->
  # TODO: find more aspects that need to be handled if any
  console.log "REGION r.#{region_x}.#{region_y}.mca FAILED TO LOAD: #{message}"
  @worldRegionData[1e3 * region_x + region_y].loaded = -1
  return

WorldRegion::regionLoaded = (event) ->
  region_x = event.data.x
  region_y = event.data.y
  if 1 != event.data.loaded
    @regionLoadFailure(region_x, region_y, event.data.error)
  else
    buffer = new Uint8Array(event.data.data)
    if 1e3 > buffer.length
      @regionLoadFailure(region_x, region_y, "buffer too short (BUFFER length #{buffer.length})")
    else
      console.log "REGION r.#{region_x}.#{region_y}.mca LOADED"
      loadedRegion = @worldRegionData[1e3 * region_x + region_y]
      loadedRegion.regionData = buffer
      loadedRegion.loaded = 0
      # Only the chunk data (and size/length of chunk) is loaded in this method; the header (chunk offset data and timestamps) is kept in the raw buffer.
      loadedRegion.chunkPos = []
      loadedRegion.chunkLen = []
      # There are up to 4096 chunks in a region file.
      chunk_offset = 0
      # The buffer_offset is 4 times the chunk_offset because each chunk has 4 bytes of data in the first half of the header.
      buffer_offset = 0
      while 4096 > buffer_offset
        # Retrieve the position of the first byte of the chunk by finding its offset (stored in 3 bytes with big-endian format).
        loadedRegion.chunkPos[chunk_offset] = 65536 * buffer[buffer_offset] + 256 * buffer[buffer_offset + 1] + buffer[buffer_offset + 2]
        # The fourth byte at this chunk_offset holds the length of the chunk (chunk length always less than 1MiB).
        loadedRegion.chunkLen[chunk_offset] = buffer[buffer_offset + 3]
        buffer_offset += 4
        chunk_offset++
  return

WorldRegion::requestChunk = (chunk_x, chunk_y) ->
  # Input chunk coordinates (as opposed to region or player coordinates).
  chunk_index = 1e4 * chunk_x + chunk_y
  if undefined != @chunkData[chunk_index]
    return @chunkData[chunk_index]
  # If chunk has not been established as loaded from browser storage, check if it is in local storage, and potentially load it.
  if 1 != @localChunksIndex[chunk_index]
    @localChunksIndex[chunk_index] = 1
    if -1 != (local_chunk = @loadChunkFromStorage(chunk_x, chunk_y, !0))
      return @chunkData[chunk_index] = local_chunk
  region_x = Math.floor(chunk_x / 32)
  region_y = Math.floor(chunk_y / 32)
  # Check if region is undefined and if so, load region file (and set region state).
  undefined == @worldRegionData[1e3 * region_x + region_y] and @loadRegion(region_x, region_y)
  # Region load failed, so chunk load failed.
  if -1 == @worldRegionData[1e3 * region_x + region_y].loaded
    return @chunkData[chunk_index] = -1
  # Region loading and therefore chunk loading in process.
  if -2 == @worldRegionData[1e3 * region_x + region_y].loaded
    return -2
  if 0 == @worldRegionData[1e3 * region_x + region_y].loaded
    chunk_offset_x = chunk_x % 32
    0 > chunk_offset_x and (chunk_offset_x += 32)
    chunk_offset_y = chunk_y % 32
    0 > chunk_offset_y and (chunk_offset_y += 32)
    # The chunk_offset is the position (out of 4096) of the chunk in the region file.
    chunk_offset = chunk_offset_x + 32 * chunk_offset_y
    if 0 < @worldRegionData[1e3 * region_x + region_y].chunkPos[chunk_offset]
      # console.log('chunk #: ' + chunk_index + ' : ' + this.worldRegionData[1e3 * region_x + region_y].chunkPos[chunk_offset] + ' ' + this.worldRegionData[1e3 * region_x + region_y].chunkLen[chunk_offset]);
      @chunkCount++
      @chunkData[chunk_index] = WorldRegion.loadChunk(4096 * @worldRegionData[1e3 * region_x + region_y].chunkPos[chunk_offset], @worldRegionData[1e3 * region_x + region_y].regionData, !0)
      return @chunkData[chunk_index]
    @chunkData[chunk_index] = -1
  return

WorldRegion.loadChunk = (chunk_pos, data, compressed) ->
  # The data parameter can be raw region data or a chunk from storage.
  chunk_data = {}
  new_chunk = new Chunk
  chunk_data.offset = 0
  try
    if compressed
      compressed_chunk_data = new (Zlib.Inflate)(data, index: chunk_pos + 5)
      chunk_data.data = compressed_chunk_data.decompress()
    else
      chunk_data.data = data
  catch error
    console.error('Zlib failed to decompress chunk_data')
    console.error(error)
    return -1
  i = 0
  while 2e3 > i and -1 != (key_pair = NBT.nextTag(chunk_data))
    switch key_pair.name
      when 'xPos'
        new_chunk.xPos = key_pair.value
      when 'zPos'
        new_chunk.zPos = key_pair.value
      when 'HeightMap'
        new_chunk.heightMap = key_pair.data
      when 'Biomes'
        new_chunk.biomes = key_pair.data
      when 'LightPopulated'
        new_chunk.lightPopulated = key_pair.value
      when 'Sections'
        WorldRegion.readSections key_pair.length, new_chunk, chunk_data
        i++
        continue
    NBT.read9(key_pair, new_chunk, chunk_data) if 9 == key_pair.type
    i++
  new_chunk.initHeightMap() if new_chunk.heightMap == undefined
  new_chunk

WorldRegion.readSections = (key_pair_length, new_chunk, chunk_data) ->
  new_section = undefined
  key_pair = undefined
  i = undefined
  new_section = {}
  i = 0
  while i < key_pair_length and -1 != (key_pair = NBT.nextTag(chunk_data))
    0 == key_pair.type and undefined == new_section.add and (new_section.add = new Uint8Array(2048))
    new_chunk.section[new_section.y] = new_section
    new_section = {}
    i++
    switch key_pair.name
      when 'Y'
        new_section.y = key_pair.value
      when 'Blocks'
        new_section.blocks = key_pair.data
      when 'SkyLight'
        new_section.skyLight = key_pair.data
      when 'BlockLight'
        new_section.blockLight = key_pair.data
      when 'Add'
        new_section.add = key_pair.data
      when 'Data'
        new_section.data = key_pair.data
  return
