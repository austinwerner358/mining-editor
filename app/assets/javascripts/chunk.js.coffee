Chunk::setBlock = (b, f, c, d, e) ->
  if -1 != @isInit
    @changed = !0
    m = Math.floor(f / 16)
    l = 256 * (f - (16 * m)) + 16 * c + b
    undefined == @section[m] and @newSection(m)
    @section[m].blocks[l] = d
    p = l % 2
    if 0 == p
      @section[m].data[l / 2] = (@section[m].data[l / 2] & 240) + e
      @section[m].add[l / 2] &= 240
    else
      @section[m].data[l / 2 - 0.5] = (@section[m].data[l / 2 - 0.5] & 15) + (e << 4)
      @section[m].add[l / 2 - 0.5] &= 15
    e = 0
    if 0 == block[d].type or 2 == block[d].type or 3 == block[d].type or 4 == block[d].type
      e = @getSunLightValue(b, f + 1, c)
      d = 0
      q = undefined
      x = undefined
      q = -1
      while 1 >= q
        x = -1
        while 1 >= x
          0 != q and 0 != x or 0 > b + q or 15 < b + q or 0 > c + x or 15 < c + x or d = @getSunLightValue(b + q, f, c + x)
          d - 1 > e and (e = d - 1)
          x++
        q++
    if 0 == p then (@section[m].skyLight[l / 2] = (@section[m].skyLight[l / 2] & 240) + e) else (@section[m].skyLight[l / 2 - 0.5] = (@section[m].skyLight[l / 2 - 0.5] & 15) + (e << 4))
    @needsUpdate = !0
  return
