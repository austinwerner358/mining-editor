window.requestAnimFrame = do ->
  window.requestAnimationFrame or window.webkitRequestAnimationFrame or window.mozRequestAnimationFrame or window.oRequestAnimationFrame or window.msRequestAnimationFrame or (tick, e) ->
    window.setTimeout tick, 1e3 / 60
    return

chronometer.tick = ->
  window.requestAnimFrame chronometer.tick
  newTime = (new Date).getTime()
  chronometer.fps = 1e3 / (newTime - chronometer.lastTime)
  pos = window.camera.getPos()
  rot = window.camera.getRot()
  if 0 < Math.floor(newTime / 100) - Math.floor(chronometer.lastTime / 100)
    h_u_d.gameStateHtml.innerHTML = 'x: ' + pos[0].toFixed(2) + '  y: ' + pos[1].toFixed(2) + '  z: ' + pos[2].toFixed(2)
    h_u_d.gameStateHtml.innerHTML += '<br/>FPS: ' + Math.floor(chronometer.fps)
    if settings.edit
      h_u_d.gameStateHtml.innerHTML += '<br/>Block: ' + window.useBlock.id + '-' + window.useBlock.data + '  : ' + (window.blockConfig[window.useBlock.id][window.useBlock.data].name or window.blockConfig[window.useBlock.id].name or window.blockConfig[window.useBlock.id][window.useBlock.data].defaultTexture or '')
    h_u_d.gameStateHtml.innerHTML += '<br/>Est. Gpu Mem: ' + Math.floor(8 * gpuMem / 1048576) + ' M'
    h_u_d.gameStateHtml.innerHTML += '<br/><a href="/controls" target="_blank">View Controls</a>'
  chronometer.newSec = !1
  chronometer.lastTime % 1e3 > newTime % 1e3 and chronometer.newSec = !0
  chronometer.sec++
  d = !1
  chronometer.lastTime % 100 > newTime % 100 and (d = !0)
  chronometer.lastTime = newTime
  window.camera.updatePosition chronometer.fps
  chronometer.iLag += window.settings.loadSpeed
  chronometer.iLag > window.settings.loadLag and (chronometer.iLag = window.settings.loadLag)
  # Update currently viewed/selected block.
  if window.settings.edit and d and (window.blockSelection = window.mcWorld.renderSelection()) and controls.selectE
    block = window.blockSelection
    controls.selectE = !1
    console.log('y: ' + block.y + ' z: ' + block.z + ' x: ' + block.x + ' chx: ' + block.chx + ' chz: ' + block.chz + ' side: ' + block.side)
    switch controls.selectT
      when 0
        window.mcWorld.updateChunkBlock block.chx, block.chz, block.x, block.y, block.z, 0, 0
      when 1
        e = 0
        m = 0
        d = 0
        chunkBlock = window.mcWorld.getChunkBlock(block.chx, block.chz, block.x, block.y, block.z)
        console.log chunkBlock.id + ' ' + chunkBlock.data
        p = !1
        undefined != window.blockConfig[chunkBlock.id][chunkBlock.data & window.blockConfig[chunkBlock.id].mask] and (if undefined != window.blockConfig[chunkBlock.id][chunkBlock.data & window.blockConfig[chunkBlock.id].mask].replace then (p = window.blockConfig[chunkBlock.id][chunkBlock.data & window.blockConfig[chunkBlock.id].mask].replace) else undefined != window.blockConfig[chunkBlock.id].replace and (p = window.blockConfig[chunkBlock.id].replace))
        if !p
          switch block.side
            when 1
              e = -1
            when 2
              e = 1
            when 3
              m = -1
            when 4
              m = 1
            when 5
              d = -1
            when 6
              d = 1
        block.x += e
        15 < block.x and block.x = 0
        block.chx++
        0 > block.x and block.x = 15
        block.chx--
        block.z += m
        15 < block.z and block.z = 0
        block.chz++
        0 > block.z and block.z = 15
        block.chz--
        0 > block.y and (block.y = 0)
        256 < block.y and (block.y = 256)
        block_id = window.useBlock.id or 1
        block_data = window.useBlock.data or 0
        window.mcWorld.updateChunkBlock block.chx, block.chz, block.x, block.y + d, block.z, block_id, block_data
      when 2
        block_id = window.useBlock.id or 1
        block_data = window.useBlock.data or 0
        window.mcWorld.updateChunkBlock block.chx, block.chz, block.x, block.y, block.z, block_id, block_data
      when 3
        window.mcWorld.changeChunkBlockAdd block.chx, block.chz, block.x, block.y, block.z
  window.mcWorld.render()
  window.settings.edit and window.selectBox.render(window.blockSelection)
  window.pointer.render() if settings.pointerOn
  window.player.render() # doesn't currently work
  chronometer.newSec and window.settings.setHashURL(pos, rot, window.camera.name)
  10 == chronometer.sec and chronometer.sec = 0
  window.mcWorld.deleteBuffers()
